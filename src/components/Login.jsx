import { MenuItem, useDisclosure} from "@chakra-ui/react";

function Login() {
  const { /*isOpen , */onOpen/* , onClose*/ } = useDisclosure();
  return (
    <>
      <MenuItem bg="gray.500" color={'black'} size="lg" onClick={onOpen}>
        Login
      </MenuItem>
    </>
  );
}

export default Login;