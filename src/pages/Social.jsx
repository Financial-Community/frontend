import React, {useEffect, useState} from 'react';
import { Box, HStack, Text, VStack} from "@chakra-ui/react";
import {SearchBar} from "../components/SearchBar";
import {getAllUsers} from "../context/UserContext";
import {UserProfileModal} from "../components/UserProfile";

function Content(data) {

}

function DisplayUserAvatar() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const usersData = await getAllUsers();
      setUsers(usersData);
    };
    fetchData();
  }, []);


  return (
    <Box overflowX="scroll" w="100%">
      <HStack spacing={4}>
      {
        users.map((user) => (
          <VStack spacing={2}>
            <UserProfileModal user={user.data()}/>
          </VStack>
      ))}
      </HStack>
    </Box>
  );
}

function Social() {
  const {data: posts} = true;

  return (
    <>
      <Box
        p={4}
        pl={20}
        pr={20}
        m={3}
        borderRadius={'10px'}
        boxShadow={'rgba(0, 0, 0, 0.35) 0px 5px 15px'}
        fontSize={"19px"} textAlign={"center"} color={"white"}>

        <Text fontSize={"22px"}>Benutzer Suche</Text>
        <SearchBar/>
        <Content posts={posts}/>
      </Box>
      <Box
        p={4}
        pl={20}
        pr={20}
        m={3}
        borderRadius={'10px'}
        boxShadow={'rgba(0, 0, 0, 0.35) 0px 5px 15px'}
        fontSize={"19px"} textAlign={"center"} color={"white"}>

        <Text fontSize={"22px"}>Benutzer Vorschläge</Text>
        {DisplayUserAvatar()}
      </Box>
      <Box
        p={4}
        pl={20}
        pr={20}
        m={3}
        borderRadius={'10px'}
        boxShadow={'rgba(0, 0, 0, 0.35) 0px 5px 15px'}
        fontSize={"19px"} textAlign={"center"} color={"white"}>

        <Text textAlign={"left"}>UserName, clickable with link to profile</Text>
        <Text>if image image here</Text>
        <Text>text here</Text>

      </Box>
    </>
  );
}

export default Social;
