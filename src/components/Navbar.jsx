import React from 'react';
import {
  Box,
  Flex,
  Spacer,
  Link,
  Heading,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  Avatar, Button
} from '@chakra-ui/react';
import {NavLink} from 'react-router-dom';
import Login from "./Login";
import {useAuth} from "../context/AuthContext";

const NAV_LINKS = [
  {name: 'Home', path: '/', needsAuth: false},
  {name: 'Dashboard', path: '/dashboard', needsAuth: true},
  {name: 'Social', path: '/social', needsAuth: true},

]

function Navbar() {
  const {isAuthenticated, logout} = useAuth();//  const {user, isAuthenticated, logout} = useAuth();
  return (
    <>
      <Box bg="gray.800" px={4} py={3}>
        <Flex alignItems="center">
          <Heading color={"white"} as="h1" size="xl" fontWeight="extrabold">
            FinComm
          </Heading>
          <Spacer></Spacer>
          {NAV_LINKS.map((link) => {
            if (link.needsAuth && !isAuthenticated) {
              return null;
            }
            return (
              <Link as={NavLink}
                    id={link.name}
                    to={link.path}
                    bg="gray.600" h="10%"
                    width="10%"
                    color={"white"}
                    textAlign="center"
                    p={2} fontWeight="bold"
                    shadow={"lg"}
                    _hover={{
                      bg: 'gray.500',
                    }}
                    borderRadius={'5px'}
                    exact activeClassName="active"
                    mr={4}>
                {link.name}
              </Link>
            );
          })}
          <Spacer></Spacer>
          <Menu>
            <MenuButton
              as={Button}
              rounded={'full'}
              variant={'link'}
              cursor={'pointer'}
              minW={0}>
              <Avatar
                size={'sm'}
                src={
                  'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/800px-Question_mark_%28black%29.svg.png'
                }
              />
            </MenuButton>
            <MenuList bg="gray.500">
              {(isAuthenticated ? (
                <>
                  <MenuItem bg="gray.500" color={'black'} as={NavLink} to="/profile">Profile</MenuItem>
                  <MenuItem bg="gray.500" color={'black'} as={NavLink} to="/" onClick={() => {
                    logout()
                  }}> Logout </MenuItem>
                </>
              ) : (
                <MenuItem borderRadius={'5px'} bg="gray.500" color={'black'}>
                  <Login/>
                </MenuItem>
              ))
              }
            </MenuList>
          </Menu>
        </Flex>
      </Box>
    </>
  );
}

export default Navbar;
