import { Button, Center, Heading, Stack, Text } from '@chakra-ui/react';

export const ScannerContent = ({
  isbn,
  onStart,
  scannerRef,
  scanning,
  setScanning,
}) => {
  return (
    <Center>
      <Stack alignItems="center">
        <Heading>バーコードリーダ</Heading>
        {/* <Button onClick={() => setScanning(!scanning)}> */}
        <Button w="50%" onClick={onStart}>
          {scanning ? 'Stop' : 'Start'}
        </Button>
        <Text>{isbn}</Text>
        <div
          id="preview"
          ref={scannerRef}
          // style={{ border: '3px solid red', position: 'relative' }}
          style={{ position: 'relative' }}
        >
          {/* <canvas
            className="drawingBuffer"
            height="180"
            style={{
              // border: '3px solid green',
              // left: '0px',
              height: '50%',
              position: 'absolute',
              top: '0px',
              width: '50%',
            }}
            width="340"
          /> */}
        </div>
        {/* <div id="preview"></div> */}
      </Stack>
    </Center>
  );
};
