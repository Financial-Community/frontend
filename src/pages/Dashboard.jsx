import React from 'react';
import {Box, Text} from "@chakra-ui/react";

function Dashboard() {
  return (
    <>
      <Box
        p={4}
        m={3}
        borderRadius={'10px'}
        boxShadow={'rgba(0, 0, 0, 0.35) 0px 5px 15px'}
        fontSize={"19px"} textAlign={"center"} color={"white"}>
        <Text fontSize={"22px"} >TreeMap Block</Text>
      </Box>
      <Box
        p={4}
        m={3}
        borderRadius={'10px'}
        boxShadow={'rgba(0, 0, 0, 0.35) 0px 5px 15px'}
        fontSize={"19px"} textAlign={"center"} color={"white"}>
        <Text fontSize={"22px"} >News Block</Text>
      </Box>
    </>
  );
}

export default Dashboard;
