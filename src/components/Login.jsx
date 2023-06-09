import {
  Box,
  Button,
  Flex, FormControl, FormLabel, Input,
  MenuItem,
  Modal,
  ModalBody, ModalCloseButton, ModalContent,
  ModalFooter, ModalHeader,
  ModalOverlay,
  useDisclosure
} from "@chakra-ui/react";
import { useForm } from 'react-hook-form';


function Login() {
  const {
    register,
    //handleSubmit,
    //setError,
    reset,
    //formState: { errors },
  } = useForm({
    defaultValues: {
      serverError: '',
    },
  });

  const { isOpen , onOpen , onClose } = useDisclosure();

  return (
    <>
      <MenuItem bg="gray.500" color={'black'} onClick={onOpen}>
        Login
      </MenuItem>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent backgroundColor={"gray.500"}>
          <ModalHeader>Sign In</ModalHeader>
          <ModalCloseButton />
          <form /*onSubmit={}*/>
            <ModalBody>
              <Flex flexDirection="column" gap={5}>
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input
                    bg={"white"}
                    border={'1px solid '}
                    borderColor={'#554739'}
                    {...register('username', { required: 'This field is required.' })}
                    type={'text'}
                  />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input
                    bg={"white"}
                    border={'1px solid '}
                    borderColor={'#554739'}
                    {...register('password', { required: 'This field is required.' })}
                    type={'password'}
                />
                </FormControl>

              </Flex>
            </ModalBody>
            <ModalFooter justifyContent="space-between">
              <Box>
                <Button
                  size={['xs', 'sm']}
                  type="submit"
                  colorScheme="blue"
                  mr={3}
                >
                  Sign in
                </Button>

                <Button
                  size={['xs', 'sm']}
                  //onClick={}
                  colorScheme="blue"
                  mr={3}
                >
                  Register
                </Button>
              </Box>
              <Button
                size={['xs', 'sm']}
                onClick={() => {
                  reset();
                  onClose();
                }}
              >
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Login;