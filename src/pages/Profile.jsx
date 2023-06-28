import React, {useEffect, useState} from 'react';
import {Box, Button, Heading, Input, Text} from "@chakra-ui/react";
import {useAuth} from "../context/AuthContext";
import {useChangeUsername} from "../context/UserContext";
import {CreatePost} from "../components/Content/CreatePost";
import {useForm} from "react-hook-form";
import {AddStocks} from "../components/Stocks/AddStocks";
import {DeleteStock} from "../components/Stocks/DeleteStock";
import {EditStock} from "../components/Stocks/EditStock";
import {Post} from "../components/Content/Post";


function Profile() {
  const {changeUsername} = useChangeUsername();
  const {user, isLoading} = useAuth();
  const {register, handleSubmit, reset} = useForm();

  const [username , setUsername] = useState("");

  useEffect(() => {
    if (!isLoading){
      setUsername(user.username);
    }
  }, [isLoading, user?.username]);

  async function handleChangeUsername(data) {
    await changeUsername(user.id, data?.name);
    setUsername(data?.name);
    reset();
  }

  if (!isLoading) {
    return (
      <div>
        <Box
          p={4}
          pl={20}
          pr={20}
          m={3}
          borderRadius={'10px'}
          boxShadow={'rgba(0, 0, 0, 0.35) 0px 5px 15px'}
          fontSize={"19px"} color={"white"}>

          <Heading textAlign={"center"}>Depot-Verwaltung</Heading>
          <AddStocks/>
          {'    '}
          <DeleteStock/>
          {'    '}
          <EditStock/>
        </Box>
        <Box
          p={4}
          pl={20}
          pr={20}
          m={3}
          borderRadius={'10px'}
          boxShadow={'rgba(0, 0, 0, 0.35) 0px 5px 15px'}
          fontSize={"19px"} color={"white"}>

          <Heading textAlign={"center"}>Content-Verwaltung</Heading>
          <CreatePost/>
          {user.id && <Post userId={user.id} showProfile={false} deleteAble={true}/>}
        </Box>
        <Box
          p={4}
          pl={20}
          pr={20}
          m={3}
          borderRadius={'10px'}
          boxShadow={'rgba(0, 0, 0, 0.35) 0px 5px 15px'}
          fontSize={"19px"} color={"white"}>
          <Heading textAlign={"center"}>Profil-Verwaltung</Heading>
          <Text fontSize={"22"}>Username: {username}</Text>
          <form onSubmit={handleSubmit(handleChangeUsername)}>
            <Input
              id="name"
              name="name"
              placeholder={"Username"}
              size={"ml"}
              maxWidth={200}
              {...register("name")}
            /> {" "}
            <Button type={"submit"}>Change Username</Button>
          </form>
        </Box>
      </div>
    );
  }
}

export default Profile;
