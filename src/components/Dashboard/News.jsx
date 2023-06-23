import {Box, Flex, Heading, Image, Text} from "@chakra-ui/react";
import {Link} from "react-router-dom";

export function News({url, image, headline, text}) {
  return (
    <Box
      key={headline}
      as={Link}
      to={url}
      p={4}
      m={"auto"}
      mb={10}
      height={"90%"}
      w={"90%"}
      border={'1px solid #e2e8f0'}
      borderRadius={'10px'}
      boxShadow={'rgba(0, 0, 0, 0.35) 0px 5px 15px'}
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
    >
      <Heading mb={3} fontSize={"25px"} textAlign={"center"}>{headline}</Heading>
      {
        image != null ? (
        <Flex mt={3} mb={3} mr={5} flexDir={"row"} align={"center"} ml={"auto"}>
          <Image m={"auto"} src={image} maxH={"300px"} maxW={"50%"}/>
          <Text m={3} fontSize={"16px"} w={"50%"}>{text}</Text>
        </Flex>
        ) : (
          <Text fontSize={"16px"} align={"center"} mt={"5%"}>{text}</Text>
        )
    }
</Box>
)
}

/*
<Box
      key={headline}
      as={Link}
      to={url}
      p={4}
      m={"auto"}
      mb={10}
      maxW={"80%"}
      border={'1px solid #e2e8f0'}
      borderRadius={'10px'}
      boxShadow={'rgba(0, 0, 0, 0.35) 0px 5px 15px'}
      display={'flex'}
      flexDirection={'row'}
      alignItems={'center'}
    >

      <Image mb={3} ml={"auto"}  src={image} maxH={"300px"} maxW={"50%"}/>
      <Flex  mr={5} width={"50%"} flexDir={"column"} justifyContent={"flex-end"} ml={"auto"}>
        <Heading mb={3} fontSize={"25px"} textAlign={"center"}>{headline}</Heading>
        <Text fontSize={"16px"}>{text}</Text>
      </Flex>
    </Box>
 */