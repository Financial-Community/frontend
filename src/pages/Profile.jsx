import React from 'react';
import {Box, Text} from "@chakra-ui/react";

function Profile() {
  return (
    <div>
      <Box
        p={4}
        pl={20}
        pr={20}
        m={3}
        borderRadius={'10px'}
        boxShadow={'rgba(0, 0, 0, 0.35) 0px 5px 15px'}
        fontSize={"19px"} textAlign={"center"} color={"white"}>

        <Text fontSize={"22"} >Depot-Verwaltung</Text>
      </Box>
      <Box
        p={4}
        pl={20}
        pr={20}
        m={3}
        borderRadius={'10px'}
        boxShadow={'rgba(0, 0, 0, 0.35) 0px 5px 15px'}
        fontSize={"19px"} textAlign={"center"} color={"white"}>

        <Text fontSize={"22"} >Content-Verwaltung</Text>
      </Box>
      <Box
        p={4}
        pl={20}
        pr={20}
        m={3}
        borderRadius={'10px'}
        boxShadow={'rgba(0, 0, 0, 0.35) 0px 5px 15px'}
        fontSize={"19px"} textAlign={"center"} color={"white"}>

        <Text fontSize={"22"} >Profil-Verwaltung</Text>
      </Box>
    </div>
  );
}

export default Profile;
