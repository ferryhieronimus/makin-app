import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Textarea,
  Spacer,
  CircularProgress,
} from "@chakra-ui/react";
import { useState, useContext } from "react";
import { PostContext } from "../../App";
import PostService from "../../services/PostServices";
import CustomToast from "../utils/CustomToast";
import Cookies from "js-cookie";

const Create = ({ isOpen, onClose }) => {
  const [newPost, setNewPost] = useState("");
  const { posts, setPosts } = useContext(PostContext);
  const [isCloseFriend, setIsCloseFriend] = useState(false);
  const { expiredSessionToast, createPostToast } = CustomToast();

  const handleLogOut = () => {
    Cookies.remove("loggedUser");
    window.location.reload();
  };

  const handleOnClick = () => {
    addPost({ content: newPost, isCloseFriend: isCloseFriend });
    setNewPost("");
    onClose();
  };

  const prepend = (oldArray, value) => {
    var newArray = oldArray.slice();
    newArray.unshift(value);
    return newArray;
  };

  const addPost = (postObject) => {
    PostService.createPost(postObject)
      .then((returnedPost) => {
        setPosts(prepend(posts, returnedPost));
        createPostToast();
      })
      .catch((error) => {
        setTimeout(() => {
          handleLogOut();
        }, "2000");
        expiredSessionToast();
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent borderRadius={"3xl"}>
        <ModalHeader>Create Post</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Textarea
            value={newPost}
            onChange={(event) => setNewPost(event.target.value)}
            whiteSpace={"pre-wrap"}
            minH={"14rem"}
          />
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme={isCloseFriend ? "purple" : "gray"}
            color={isCloseFriend ? "white" : "black"}
            borderRadius='3rem'
            onClick={() => {
              setIsCloseFriend(!isCloseFriend);
            }}
          >
            {isCloseFriend ? "Close Friend" : "Public"}
          </Button>
          <Spacer />
          <CircularProgress
            size={"2rem"}
            value={newPost.length / 4}
            color={"purple.500"}
          />
          <Button
            isDisabled={!newPost || newPost.length > 400}
            colorScheme='purple'
            ml={3}
            onClick={handleOnClick}
          >
            Send
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Create;
