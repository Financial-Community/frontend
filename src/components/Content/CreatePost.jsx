import {
  Button, Input,
  Modal, ModalBody,
  ModalCloseButton,
  ModalContent, ModalFooter,
  ModalHeader,
  ModalOverlay, Spacer,
  Text, Textarea,
  useDisclosure
} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import axios from "axios";
import {useAuth} from "../../context/AuthContext";

export function CreatePost() {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const {user} = useAuth();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm()


  function handlePost(data) {
    console.log(data)
    const formData = new FormData();
    formData.append('userId', user.id);
    formData.append('text', data.caption);
    formData.append('file', data.file[0]);

    axios.post("https://content-ep7jv6cjka-ey.a.run.app/content", formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        window.location.reload();
        return response.data;
      }).catch((error) => {
        throw new Error(error);
    }).finally(() => {
      reset();
      onClose();
    });

  }

  return (
    <>
      <Button onClick={onOpen} m={3}>
        Create Post
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <form onSubmit={handleSubmit(handlePost)}>
          <ModalOverlay/>
          <ModalContent backgroundColor={"gray.600"}>
            <ModalHeader>
              <Text color={"white"}>Create Post</Text>
            </ModalHeader>
            <ModalCloseButton/>
            <ModalBody>

              <Text mb='8px' color={"white"}>Caption:</Text>
              <Textarea
                placeholder='Write your caption here'
                size='sm'
                mb={5}
                {...register("caption")}
              />
              <Text mt={5} mb='8px' color={"white"}>Image/Video:</Text>
              <Input
                _hover={{cursor: "pointer"}}
                name={"file"}
                type="file"
                multiple
                sx={{
                  "::file-selector-button": {
                    height: 10,
                    padding: 0,
                    mr: 4,
                    background: "none",
                    border: "none",
                    fontWeight: "bold",
                  },
                }}
                {...register("file")}
              />

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