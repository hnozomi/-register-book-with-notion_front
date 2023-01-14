import Quagga from 'quagga';
import { useLayoutEffect } from 'react';

const defaultConstraints = {
  height: 480,
  width: 640,
};

export const Scanner = ({ isbnCheck, scannerRef }) => {
  const config = {
    decoder: {
      readers: [
        {
          config: {},
          format: 'ean_reader',
        },
      ],
    },
    inputStream: {
      constraints: defaultConstraints,
      name: 'Live',
      singleChannel: false,
      size: 640,
      // ここのサイズによって読み取れたり読み取れなかったり
      target: scannerRef.current,
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

  const handleProcessed = (result) => {
    const drawingCtx = Quagga.canvas.ctx.overlay;
    const drawingCanvas = Quagga.canvas.dom.overlay;
    drawingCtx.font = '24px Arial';
    drawingCtx.fillStyle = 'green';

    if (result) {
      if (result.boxes) {
        drawingCtx.clearRect(
          0,
          0,
          parseInt(drawingCanvas.getAttribute('width')),
          parseInt(drawingCanvas.getAttribute('height')),
        );
        result.boxes
          .filter((box) => box !== result.box)
          .forEach((box) => {
            Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
              color: 'purple',
              lineWidth: 2,
            });
          });
      }
      if (result.box) {
        Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
          color: 'blue',
          lineWidth: 2,
        });
      }
      if (result.codeResult && result.codeResult.code) {
        drawingCtx.font = '24px Arial';
        drawingCtx.fillText(result.codeResult.code, 10, 20);
      }
    }
  };

  useLayoutEffect(() => {
    Quagga.init(config, function (err) {
      if (err) {
        Quagga.onProcessed(handleProcessed);
        console.log(err);
        return;
      }
      if (scannerRef && scannerRef.current) {
        Quagga.start();
      }
    });

    Quagga.onDetected(isbnCheck);

    return () => {
      Quagga.offDetected();
      Quagga.offProcessed(handleProcessed);
      Quagga.stop();
    };
  }, [scannerRef, isbnCheck]);
  return null;
};
