import { useToast } from '@chakra-ui/react';

export const useErrorToast = () => {
  const chakraToast = useToast();

  const toast = (title, description) => {
    chakraToast({
      description: description,
      duration: 2000,
      isClosable: true,
      position: 'top',
      status: 'error',
      title: title,
    });
  };

  return toast;
};
