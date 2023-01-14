import Quagga from 'quagga';
import { useEffect, useRef, useState } from 'react';

import { useErrorToast, useSuccessToast } from '@/hooks';
import { axiosClient } from '@/lib/axios';

export const useScannerPageHook = () => {
  const [scanning, setScanning] = useState(false);
  const [isbn, setIsbn] = useState('');
  const [status, setStatus] = useState(false);
  const scannerRef = useRef(null);

  const errorToast = useErrorToast();
  const successToast = useSuccessToast();

  useEffect(() => {
    status && registerBookToNotion(isbn);
  }, [status]);

  const onStart = () => {
    const config = {
      decoder: {
        readers: [
          {
            config: {},
            format: 'ean_reader',
            multiple: false,
          },
        ],
      },
      inputStream: {
        name: 'Live',
        singleChannel: false,
        size: 500,
        target: '#preview',
        type: 'LiveStream',
      },
      locate: true,
      locator: {
        halfSample: true,
        patchSize: 'medium',
      },
      numOfWorker: navigator.hardwareConcurrency || 4,
      src: null,
    };

    Quagga.init(config, function (err) {
      if (err) {
        console.log(err);
        return;
      }
      Quagga.start();
    });
  };

  Quagga.onDetected((result) => {
    if (!result) return;

    const init = result.codeResult.code.substr(0, 3);
    if (init === '978' && status === false) {
      Quagga.stop();
      setIsbn(result.codeResult.code);
      setStatus(true);
    }
  });

  const registerBookToNotion = async (isbn) => {
    const param = {
      isbn: isbn,
    };

    axiosClient
      .get('register-book-with-notion', {
        params: param,
      })
      .then((res) => {
        successToast(res.data);
      })
      .catch((e) => {
        errorToast(e.response.data);
      });
  };

  return { isbn, onStart, scannerRef, scanning, setIsbn, setScanning };
};
