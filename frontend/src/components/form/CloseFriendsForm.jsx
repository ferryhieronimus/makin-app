import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Box,
} from "@chakra-ui/react";
import Profile from "../profileCard/Profile";
import UserServices from "../../services/UserServices";
import { useState, useEffect, useContext } from "react";
import { PostContext } from "../../App";

import InfiniteScroll from "react-infinite-scroll-component";

const CloseFriends = ({ isOpen, onClose }) => {
  const [users, setUsers] = useState([]);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState("");

  const { currentUser } = useContext(PostContext);

  useEffect(() => {
    UserServices.getUser(limit, search).then((user) => setUsers(user));
  }, [limit, search]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent borderRadius={"3xl"}>
        <ModalHeader>Your Close Friends</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            onChange={({ target }) => setSearch(target.value)}
            placeholder={"Search for..."}
            borderRadius={"3xl"}
          />
          <Box maxH={"20rem"} overflow={"auto"} mt={4} id='scrollableDiv'>
            <InfiniteScroll
              dataLength={users.length}
              next={() => setLimit(limit + 3)}
              hasMore={true}
              scrollableTarget='scrollableDiv'
            >
              {users.map(
                (user) =>
                  user.id !== currentUser.id && (
                    <Box
                      mx='4'
                      mb='2'
                      p='4'
                      borderRadius='3xl'
                      cursor='pointer'
                      _hover={{
                        bg: "gray.100",
                      }}
                      key={user.id}
                      maxW={"100%"}
                    >
                      <Profile
                        user={user}
                        location={"closefriend"}
                        key={user.id}
                        isChecked={currentUser.closeFriends.includes(user.id)}
                        maxW={"100%"}
                      />
                    </Box>
                  )
              )}
            </InfiniteScroll>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme='purple'
            mx={"auto"}
            onClick={() => {
              onClose();
              window.location.reload();
            }}
            borderRadius={"2xl"}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CloseFriends;
