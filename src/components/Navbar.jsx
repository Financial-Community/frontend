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
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <>
    <Box bg="gray.300" px={4} py={3}>
      <Flex alignItems="center" >
        <Heading as="h1" size="md">
          FinComm
        </Heading>
        <Spacer></Spacer>
        <Link as={NavLink} to="/" exact activeClassName="active" mr={4}>
          Home
        </Link>
        <Link as={NavLink} to="/Dashboard" activeClassName="active" mr={4}>
          Dashboard
        </Link>
        <Link as={NavLink} to="/Social" activeClassName="active">
          Social
        </Link>
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
            <MenuItem as={NavLink} to="/Profile">Profile</MenuItem>
            <MenuItem>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
    </>
  );
}

export default Navbar;
