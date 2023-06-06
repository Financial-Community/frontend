import React from 'react';
import { Box, Flex, Spacer, Link, Heading } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <Box bg="gray.200" px={4} py={2}>
      <Flex alignItems="center" maxW="1200px" mx="auto">
        <Heading as="h1" size="md">
          My App
        </Heading>
        <Spacer />
        <Link as={NavLink} to="/" exact activeClassName="active" mr={4}>
          Home
        </Link>
        <Link as={NavLink} to="/Dashboard" activeClassName="active" mr={4}>
          Dashboard
        </Link>
        <Link as={NavLink} to="/Social" activeClassName="active">
          Social
        </Link>
      </Flex>
    </Box>
  );
}

export default Navbar;
