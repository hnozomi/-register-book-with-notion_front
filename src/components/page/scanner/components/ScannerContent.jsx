import { Box, Button, Center, Heading, Stack, Text } from '@chakra-ui/react';

import { Scanner } from '@/components/model/Scanner';

export const ScannerContent = ({
  isbn,
  isbnCheck,
  scannerRef,
  scanning,
  setScanning,
}) => {
  return (
    <Center>
      <Stack alignItems="center">
        <Heading>バーコードリーダ</Heading>
        <Button w="50%" onClick={() => setScanning(!scanning)}>
          {scanning ? 'Stop' : 'Start'}
        </Button>
        <Text>{isbn}</Text>
        <Box ref={scannerRef} style={{ position: 'relative' }}>
          {scanning ? (
            <Scanner isbnCheck={isbnCheck} scannerRef={scannerRef} />
          ) : null}
        </Box>
      </Stack>
    </Center>
  );
};
