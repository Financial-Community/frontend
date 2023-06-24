import {Box, Flex, Image, Text} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {getUser} from "../../context/UserContext";
import axios from "axios";
import {UserProfileModal} from "../UserProfile";


function Content({userId}) {
  const [user, setUser] = useState([]);
  const [post, setPost] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const usersData = await getUser(userId);
      console.log(usersData)
      setUser(usersData);
    };

    //await axios.get(`https://content-ep7jv6cjka-ey.a.run.app/content?userId=${userId}`);
    const fetchPostData = async () => {
      const postData = fetch(`https://content-ep7jv6cjka-ey.a.run.app/content?userId=${userId}`)
      setPost(postData.data);
    }


    fetchUserData();
    fetchPostData();
  }, [userId]);

  if (user.data !== undefined) {
    return (
      post.map((p) => (
          <Box key={p.timeStamp}>
            <UserProfileModal user={user?.data}/>
            <Image src={p.gcsLink} alt={"post"} w={"100%"}/>
            <Text>{p.caption}</Text>
          </Box>
        )
      )
    );
  } else {
    return <div>Loading...</div>;
  }
}

export function Post({users}) {

  return (
    <>
      <Box
        p={4}
        m={3}
        borderRadius={'10px'}
        boxShadow={'rgba(0, 0, 0, 0.35) 0px 5px 15px'}
        fontSize={"19px"} textAlign={"center"} color={"white"}>
        <Flex>
        </Flex>
        {
          users.map((user) => (
            <Content user={user}/>
          ))
        }

      </Box>
    </>
  )
}

//<UserProfileModal user={user.data}/>