import {
  Box,
  Button,
  Center,
  Heading,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';

import { Scanner } from '@/components/model/Scanner';

export const ScannerContent = ({
  isbn,
  isbnCheck,
  scannerRef,
  scanning,
  setCertification,
  setScanning,
}) => {
  return (
    <Center>
      <Stack alignItems="center" mt="3rem">
        <Heading>バーコードリーダ</Heading>
        <Input
          type="password"
          onChange={(e) => setCertification(e.target.value)}
        />
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
