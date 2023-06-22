import {
  Button, Heading,
  Input,
  Modal, ModalBody, ModalCloseButton,
  ModalContent, ModalFooter,
  ModalHeader,
  ModalOverlay, Spacer,
  Text,
  useDisclosure, useToast
} from "@chakra-ui/react";
import React from "react";
import {useForm} from "react-hook-form";
import axios from "axios";
import {useAuth} from "../../context/AuthContext";

export function DeleteStock(){
  const {isOpen, onClose, onOpen} = useDisclosure()
  const toast = useToast();
  const {user} = useAuth();
  const { register, handleSubmit, reset } = useForm();

  function useDeleteStock(data) {
    axios.delete("https://depot-ij6sqfx7va-uc.a.run.app/depot", {
      data: {
        "userId": user.id,
        "stockTicker": data.stockTicker,
      }
    }).then((response) => {
      console.log(response);
      toast({
        title: "Stock deleted.",
        description: "We've deleted the stock for you.",
        position: "bottom-right",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
      reset();
      onClose();
    }).catch((error) => {
      toast({
        title: "Error while deleting stock.",
        description: "We've not deleted the stock for you.",
        position: "bottom-right",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
      throw new Error(error.message());
    });
    reset();
  }


  return (
    <>
      <Button onClick={onOpen}>
        Delete Stock
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <form onSubmit={handleSubmit(useDeleteStock)}>
          <ModalOverlay/>
          <ModalContent backgroundColor={"gray.600"}>
            <ModalHeader>
              <Heading color={"white"}>Add Stock</Heading>
            </ModalHeader>
            <ModalCloseButton/>
            <ModalBody>
              <Text mt='8px'>Stock Ticker</Text>
              <Input required={true} name={"stockTicker"} placeholder={"Stock Ticker"} {...register("stockTicker")}/>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} type={"submit"}>
                Delete
              </Button>
              <Spacer/>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  )
}
