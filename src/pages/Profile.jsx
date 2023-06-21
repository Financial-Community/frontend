import React, {useState} from 'react';
import {Box, Button, Heading, Input, Text} from "@chakra-ui/react";
import {useAuth} from "../context/AuthContext";
import {useChangeUsername} from "../context/UserContext";

function Profile() {
  const {changeUsername} = useChangeUsername();
  const {user} = useAuth();
  const [name, setName] = useState("");

  async function handleChangeUsername(){
    await changeUsername( user.id ,name);
  }
  const handleUserName = event => {
    setName(event.target.value);
  };

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
        <Heading >Profil-Verwaltung</Heading>

        <Input onChange={handleUserName} id="name" name="name" value={name} placeholder={"Username"} size={"ml"} maxWidth={200}/> {" "}
        <Button onClick={handleChangeUsername}>Change Username</Button>
      </Box>
    </div>
  );
}

export default Profile;
