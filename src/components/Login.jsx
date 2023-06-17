import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  MenuItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from "@chakra-ui/react";
import {useForm} from 'react-hook-form';
import {login, signUp} from "../services/AuthService";


function Login() {
  const {
    register,
    handleSubmit,
    setError,
    formState: {errors},
    reset,
  } = useForm({
    defaultValues: {
      serverError: '',
    },
  });

  const {isOpen, onOpen, onClose} = useDisclosure();

  const handleLogin = async (data) => {
    try {
      await login(data.username, data.password);
      onClose();
    } catch (error){
    setError("username", {
      type: 'serverError',
      message: 'Username or Password is incorrect',
    });
      setError("password", {
        type: 'serverError',
        message: 'Username or Password is incorrect',
      });
  }
};

const handleRegister = handleSubmit(async (data) => {
  try {
    await signUp(data.username, data.password);
    onClose();
  } catch (error) {
    if (error.message.includes('password')) {
      setError("password", {
        type: 'serverError',
        message: error.message,
      });
    } else {
      setError("username", {
        type: 'serverError',
        message: error.message,
      });
    }
  }
});

return (
  <>
    <MenuItem bg="gray.600" color={'black'} onClick={onOpen}>
      Login
    </MenuItem>
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay/>
      <ModalContent backgroundColor={"gray.500"}>
        <ModalHeader>Sign In</ModalHeader>
        <ModalCloseButton/>
        <form onSubmit={handleSubmit(handleLogin)}>
          <ModalBody>
            <Flex flexDirection="column" gap={5}>
              <FormControl isInvalid={errors.username}>
                <FormLabel>Email address</FormLabel>
                <Input
                  bg={"white"}
                  border={'1px solid '}
                  borderColor={'#554739'}
                  {...register('username', {required: 'This field is required.'})}
                  type={'text'}
                />
                <FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.password}>
                <FormLabel>Password</FormLabel>
                <Input
                  bg={"white"}
                  border={'1px solid '}
                  borderColor={'#554739'}
                  {...register('password', {required: 'This field is required.'})}
                  type={'password'}
                />
                <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
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
                onClick={handleRegister}
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
