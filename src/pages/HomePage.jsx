import React from 'react';
import {Box, Container, Flex, Image, Spacer, Text} from "@chakra-ui/react";
import logo from '../assets/logo-black.png'
import people from '../assets/connected_peopel.jpg'
import stock from '../assets/stocks_on_phone.jpeg'
import Navbar from "../components/Navbar";

function Item({ textColor, headerText, bodyText, image, reverse = false }) {
  return (
    <Flex
      h={'22vh'}
      borderRadius={'10px'}
      boxShadow={'rgba(0, 0, 0, 0.35) 0px 5px 15px'}
      flexDirection={reverse ? 'row-reverse' : 'row'}
      mt={3}
    >
      <Flex padding={5} justifyContent={'center'} flexDirection="column">
        <Text fontSize="xx-large" textDecor="underline" color={textColor}>
          {headerText}
        </Text>
        <br />
        <Text fontSize="large" color={textColor}>
          {bodyText}
        </Text>
      </Flex>
      <Spacer />
      <Image src={image} height="100%" p={1} borderRadius={"10px"}/>
    </Flex>
  );
}

function HomePage() {
  return (
    <>
      <Navbar/>
      <Container maxW="container.xl"
                 minH={'100vh'}
                 maxH={'100vh'}>
        <Box
          p={4}
          mt={3}
          borderRadius={'10px'}
          boxShadow={'rgba(0, 0, 0, 0.35) 0px 5px 15px'}
          fontSize={"19px"} textAlign={"center"} color={"white"}>
          <Text fontSize={"22px"} >The best place to connect with like minded
            Investors!</Text>
          <br/>
          <Text>Was ist FinComm?</Text>
          <Text>FinComm ist ein Ort an dem Aktien Investoren sich zusammen finden und austauschen können.</Text>
        </Box>
        <Image borderRadius={"10px"} m={"auto"} mt={4} width={"80%"} src={logo}></Image>
        <Item
          textColor={'white'}
          headerText={'Connect with people!'}
          bodyText={'Learn from eachother!'}
          image={people}
        />
        <Item
          textColor={'white'}
          headerText={'Share your passion!'}
          bodyText={'Share content that is important to you!'}
          image={stock}
          reverse={true}
        />
      </Container>
    </>
  );
}

export default HomePage;
