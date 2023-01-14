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

  const isbnCheck = (result) => {
    if (!result) return;

    const init = result.codeResult.code.substr(0, 3);
    if (init === '978' && status === false) {
      Quagga.stop();
      setIsbn(result.codeResult.code);
      setStatus(true);
      setScanning(false);
    }
  };

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
      })
      .finally(() => {
        setIsbn('');
        setStatus(false);
      });
  };

  return {
    isbn,
    isbnCheck,
    scannerRef,
    scanning,
    setScanning,
  };
};
