import {Box, Flex, Text} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {UserProfileModal} from "../UserProfile";
import {getAllUsers} from "../../context/UserContext";

export function Post() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const usersData = await getAllUsers();
      setUsers(usersData);
    };
    fetchData();
  }, []);

  return (
    <>
      {
        users.map((user) => (
          <>
            <Box p={4}
                 m={3}
                 borderRadius={'10px'}
                 boxShadow={'rgba(0, 0, 0, 0.35) 0px 5px 15px'}
                 fontSize={"19px"} textAlign={"center"} color={"white"}>
            <Flex >
              <UserProfileModal user={user.data()}/>
            </Flex>
            <Box >
              <Text>if image image here</Text>
              <Text>text here</Text>
            </Box>
            </Box>
          </>
        ))}
    </>
  )
}