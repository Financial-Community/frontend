import {
  Avatar,
  Box, Button, Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent, ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure, Text, Spacer
} from "@chakra-ui/react";
import {useAuth} from "../context/AuthContext";
import {useFollowingForUser} from "../context/UserContext";

export function UserProfileModal({user: currentUser}) {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const { followUser, unfollowUser } = useFollowingForUser();
  const {user} = useAuth();

  async function handleUnfollowUser() {
    await unfollowUser(user.id, currentUser.id)
  }

  async function handleFollowUser() {
    await followUser(user.id, currentUser.id)
  }

  function Follow() {
    if (user.following.map((uid) => uid === currentUser.id).includes(true)) {
      return (
        <Button mr={3} bg={"red"} onClick={handleUnfollowUser}>
          Unfollow
        </Button>
      );
    } else {
      return (
        <Button mr={3} bg={"green.400"} onClick={handleFollowUser}>
          Follow
        </Button>
      );
    }
  }

  return (
    <>
      <Box
        w="100%"
        textAlign="center"
        key={currentUser.name}
      >
        <Avatar name={currentUser.username} src={currentUser.avatar} onClick={onOpen} cursor="pointer"/>
        <Text>{currentUser.username}</Text>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>
            <Avatar src={currentUser.avatar} name={currentUser.username}/>
            <Text width={100}>{currentUser.username + "  "}</Text>

          </ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
            <Flex>

              <Box>
                <Text>Hier könnte ihr content sein!</Text>
              </Box>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Follow/>
            <Spacer/>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}