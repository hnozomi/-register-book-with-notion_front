import { useToast } from '@chakra-ui/react';

export const useSuccessToast = () => {
  const chakraToast = useToast();

  const toast = (title, description) => {
    chakraToast({
      description: description,
      duration: 2000,
      isClosable: true,
      position: 'top',
      status: 'success',
      title: title,
    });
  };

  return toast;
};
