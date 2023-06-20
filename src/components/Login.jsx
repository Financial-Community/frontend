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
import { useLoginWithMail, useSignUpWithEmail} from "../context/AuthContext";


function Login() {
  const { loginWithMail, loginWithGooglePopup} = useLoginWithMail();
  const { signUpWithEmail } = useSignUpWithEmail();

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

  async function handleLoginEmail(data) {
    try {
      await loginWithMail({email: data.email, password: data.password})
      reset();
      onClose();
    } catch (error) {
      setError("email", {
        type: 'serverError',
        message: 'Username or Password is incorrect',
      });
      setError("password", {
        type: 'serverError',
        message: 'Username or Password is incorrect',
      });
    }

  }

  async function handleLoginPopup() {
    try {
      await loginWithGooglePopup()
    } catch (error) {
      throw new Error(error.message)
    }
  }

  const handleRegister = handleSubmit(async (data) => {
    try {
      await signUpWithEmail(data.email, data.password);
      onClose();
    } catch (error) {
      if (error.message.includes('password')) {
        setError("password", {
          type: 'serverError',
          message: error.message,
        });
      } else {
        setError("email", {
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
        <ModalContent backgroundColor={"gray.600"}>
          <ModalHeader>Sign In</ModalHeader>
          <ModalCloseButton/>
          <form onSubmit={handleSubmit(handleLoginEmail)}>
            <ModalBody>
              <Flex flexDirection="column" gap={5}>
                <FormControl isInvalid={errors.email}>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    bg={"white"}
                    border={'1px solid '}
                    borderColor={'#554739'}
                    {...register('email', {required: 'This field is required.'})}
                    type={'text'}
                  />
                  <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
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
              <Button
                size={['xs', 'sm']}
                onClick={handleLoginPopup}
                colorScheme="blue"
                mt={3}
              >
                Login with Google
              </Button>
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