import {Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {getUser} from "../../context/UserContext";
import axios from "axios";
import {UserProfileModal} from "../UserProfile";


export function Post(props) {
  const {userId, showProfile, deleteAble = false} = props;

  const [user, setUser] = useState([]);
  const [post, setPost] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (showProfile) {
          await getUser(userId)
            .then((response) => {
              setUser(response);
            }).catch((error) => {
              console.log(error);
            });
        }
        await axios.get(`https://content-ep7jv6cjka-ey.a.run.app/content?userId=${userId}`)
          .then((response) => {
            setPost(response.data.posts);
          }).catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [showProfile, userId]);


  function handleDeletePost(id) {
    axios.delete(`https://content-ep7jv6cjka-ey.a.run.app/content`, {
      data: {
        "postId": id
      }
    }).then(r => {
      console.log(r);
      window.location.reload();
    }).catch(e => {
      console.log(e);
      }
    )
  }

  return (
    post.map((p) => (
        <Box key={p.timeStamp}
             m={"auto"}
             p={4}
             mb={10}
             height={"90%"}
             w={"70%"}
             border={'1px solid #e2e8f0'}
             borderRadius={'10px'}
             boxShadow={'rgba(0, 0, 0, 0.35) 0px 5px 15px'}
             justifyContent={"center"}
        >
          {
            showProfile ? (
              <Flex ml={5} justifyContent={"start"}>
              <UserProfileModal user={user}/>
              </Flex>
            ) : (
              <></>
            )
          }
          {
            p.gcsLink ?
              <Image m={"auto"} mt={3} mb={3} src={p.gcsLink} alt={"post"} maxW={"65%"} maxH={"90%"}/>
              : <></>
          }

          <Text>{p.caption}</Text>
          {
            deleteAble ? (
              <Button
                m={2}
                onClick={() => {
                  handleDeletePost(p.postId);
                }}
              >Delete</Button>
            ) : (
              <></>
            )
          }
        </Box>
      )
    )
  );
}

//<UserProfileModal user={user.data}/>