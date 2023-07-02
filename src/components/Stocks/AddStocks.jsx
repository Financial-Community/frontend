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

export function AddStocks(){
  const {isOpen, onClose, onOpen} = useDisclosure()
  const toast = useToast();
  const {user} = useAuth();
  const { register, handleSubmit, reset } = useForm();

  function useAddStock(data) {
    axios.post("https://depot-ij6sqfx7va-uc.a.run.app/depot", {
      "userId": user.id,
      "userName": user.username,
      "stockName": data.stockName,
      "stockTicker": data.stockTicker,
      "dateBuy": data.dateBuy,
      "priceCurrent": data.price,
      "priceBuy": data.price,
      "amountCurrent": data.amount,
      "amountBuy": data.amount,
    }).then((response) => {
      toast({
        title: "Stock added.",
        description: response.data.message,
        position: "bottom-right",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
      reset();
      onClose();
    }).catch((error) => {
      toast({
        title: "Error while adding stock.",
        description: error.message,
        position: "bottom-right",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    });
  }


  return (
    <>
      <Button onClick={onOpen}>
        Add Stock
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <form onSubmit={handleSubmit(useAddStock)}>
          <ModalOverlay/>
          <ModalContent backgroundColor={"gray.600"}>
            <ModalHeader>
              <Heading color={"white"}>Add Stock</Heading>
            </ModalHeader>
            <ModalCloseButton/>
            <ModalBody>
              <Text>Stock Name</Text>
              <Input required={true} name={"stockName"} placeholder={"Stock Name"} {...register("stockName")}/>
              <Text mt='8px'>Stock Ticker</Text>
              <Input required={true} name={"stockTicker"} placeholder={"Stock Ticker"} {...register("stockTicker")}/>
              <Text mt='8px'>Date Buy</Text>
              <Input required={true} type={"date"} name={"dateBuy"} placeholder={"Date Buy"} {...register("dateBuy")}/>
              <Text mt='8px'>Price</Text>
              <Input required={true} type={"number"} name={"price"} placeholder={"Price Current"} {...register("price")}/>
              <Text mt='8px'>Amount</Text>
              <Input required={true} ype={"number"} step={".01"} name={"amount"} placeholder={"Amount Current"} {...register("amount")}/>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} type={"submit"}>
                Post
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
