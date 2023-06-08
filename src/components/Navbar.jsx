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
//import {useAuth} from "../services/Auth";

const NAV_LINKS = [
  {name: 'Home', path: '/', needsAuth: false},
  {name: 'Dashboard', path: '/dashboard', needsAuth: false},
  {name: 'Social', path: '/social', needsAuth: false},

]

function Navbar() {
  let isAuthenticated = false;
  //const {user, isAuthenticated, logout} = useAuth();
  return (
    <>
      <Box bg="gray.400" px={4} py={3}>
        <Flex alignItems="center">
          <Heading as="h1" size="xl" fontWeight="extrabold">
            FinComm
          </Heading>
          <Spacer></Spacer>
          {NAV_LINKS.map((link) => {
            if (link.needsAuth && !isAuthenticated) {
              return null;
            }
            return (
              <Link as={NavLink}
                    to={link.path}
                    bg="gray.500" h="10%"
                    width="10%"
                    textAlign="center"
                    p={2} fontWeight="bold"
                    shadow={"lg"}
                    _hover={{
                      bg: 'gray.300',
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
            <MenuList>
              <MenuItem bg="gray.500" color={'black'} as={NavLink} to="/profile">Profile</MenuItem>
              <MenuItem>
                {(isAuthenticated ? (
                  <>
                    (//Logout)
                  </>
                ) : (
                  <Login />
                ))
              }
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Box>
    </>
  );
}

export default Navbar;
