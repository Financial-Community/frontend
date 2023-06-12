import React from 'react';
import Navbar from "../components/Navbar";
import {Box, Text} from "@chakra-ui/react";
import {SearchBar} from "../components/SearchBar";

function Content(data) {

}

function Social() {
  const { data:posts } = true;

  return (
    <>
      <Navbar></Navbar>
      <Box
        p={4}
        pl={20}
        pr={20}
        m={3}
        borderRadius={'10px'}
        boxShadow={'rgba(0, 0, 0, 0.35) 0px 5px 15px'}
        fontSize={"19px"} textAlign={"center"} color={"white"}>

        <Text fontSize={"22px"} >Benutzer Suche</Text>
        <SearchBar />
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

        <Text fontSize={"22px"} >Benutzer Vorschläge</Text>
        <Text>for user in users get profile pics, make them button to modal for userprofile</Text>
      </Box>
      <Box
        p={4}
        pl={20}
        pr={20}
        m={3}
        borderRadius={'10px'}
        boxShadow={'rgba(0, 0, 0, 0.35) 0px 5px 15px'}
        fontSize={"19px"} textAlign={"center"} color={"white"}>

        <Text textAlign={"left"} >UserName, clickable with link to profile</Text>
        <Text>if image image here</Text>
        <Text>text here</Text>

      </Box>
    </>
  );
}

export default Social;
