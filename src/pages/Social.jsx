import React, {useEffect, useState} from 'react';
import {Box, Heading, HStack, VStack, Text} from "@chakra-ui/react";
import {SearchBar} from "../components/Content/SearchBar";
import {getAllUsers} from "../context/UserContext";
import {UserProfileModal} from "../components/UserProfile";
import {Post} from "../components/Content/Post";
import {useAuth} from "../context/AuthContext";

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
  const {user} = useAuth();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const usersData = await getAllUsers();
      setUsers(usersData);
    };
    fetchData();
  }, []);

  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = filteredUsers => {
    setSearchResults(filteredUsers);
  };
  console.log(user?.following)

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

        <Heading>Benutzer Suche</Heading>
        <SearchBar users={users} onSearch={handleSearch}/>
        <HStack>
          {searchResults.map(user => (
            <Box m={2}>
              <UserProfileModal user={user.data()}/>
            </Box>
          ))}
        </HStack>
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

        <Heading>Benutzer Vorschläge</Heading>
        {DisplayUserAvatar()}
      </Box>
      <Box
        p={4}
        pl={20}
        pr={20}
        m={3}
        borderRadius={'10px'}
        boxShadow={'rgba(0, 0, 0, 0.35) 0px 5px 15px'}
        fontSize={"19px"} textAlign={"center"} color={"white"}
        justifyContent={"center"}>
        <Heading m={5}>Posts von Abonnierten Benutzern</Heading>

        {
          user?.following[0] !== null ?
            user?.following.map((user) => (
              <>
                <Post userId={user} showProfile={true}/>
              </>
            )) :
            <Text>Keine Posts vorhanden</Text>
        }

      </Box>
    </>
  );
}

export default Social;
