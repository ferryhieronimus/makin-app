import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Flex, Text, IconButton, Spacer, Icon } from "@chakra-ui/react";
import { useContext, useState } from "react";
import Dropdown from "./Dropdown";
import Profile from "../profileCard/Profile";
import Moment from "react-moment";
import { PostContext } from "../../App";
import { MdStars } from "react-icons/md";
import CustomToast from "../utils/CustomToast";
import PostService from "../../services/PostServices";
import Cookies from "js-cookie";

const Post = ({ post, location }) => {
  const { posts, setPosts, currentUser } = useContext(PostContext);
  const [newPost, setNewPost] = useState("");
  const { expiredSessionToast, updatePostToast, deletePostToast } =
    CustomToast();

  const handleDelete = (event) => {
    deletePost(post.id);
  };

  const handleUpdate = (event) => {
    updatePost(post.id, { content: newPost });
  };

  const handleLogOut = () => {
    Cookies.remove("loggedUser");
    window.location.reload();
  };

  const deletePost = (id) => {
    PostService.deletePost(id)
      .then(() => {
        setPosts(posts.filter((post) => post.id !== id));
      })
      .then(() => deletePostToast())
      .catch((error) => {
        setTimeout(() => {
          handleLogOut();
        }, "2000");
        expiredSessionToast();
      });
  };

  const updatePost = (id, newObject) => {
    PostService.updatePost(id, newObject)
      .then((returnedPost) => {
        const oldPost = posts.find((post) => post.id === id);
        const changedPost = {
          ...oldPost,
          content: returnedPost.content,
          updatedAt: returnedPost.updatedAt,
        };
        setPosts(posts.map((post) => (post.id !== id ? post : changedPost)));
      })
      .then(() => updatePostToast())
      .catch((error) => {
        setTimeout(() => {
          handleLogOut();
        }, "2000");
        expiredSessionToast();
      });
  };

  return (
    <Card
      m={5}
      borderRadius='3xl'
      boxShadow={post.isCloseFriend && "0 0 12px #9F7AEA"}
    >
      <CardHeader>
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Profile user={post.user} location={location} />

          {currentUser !== undefined && post.user.id === currentUser.id ? (
            <IconButton
              as={"div"}
              variant='ghost'
              colorScheme='gray'
              icon={
                <Dropdown
                  onClick={handleDelete}
                  updateContent={handleUpdate}
                  content={post.content}
                  newPost={newPost}
                  setNewPost={setNewPost}
                />
              }
            />
          ) : null}
        </Flex>
      </CardHeader>

      <CardBody py={0}>
        <Text align='left' whiteSpace={"pre-wrap"}>
          {post.content}
        </Text>
      </CardBody>

      <CardFooter alignItems={"center"}>
        {post.isCloseFriend && <Icon as={MdStars} color={"purple.500"}></Icon>}
        <Spacer />
        {post.createdAt === post.updatedAt && (
          <Text align='right' color='gray.500' fontSize='sm'>
            <Moment format='MMM D YYYY, HH:mm'>{post.createdAt}</Moment>
          </Text>
        )}
        {post.createdAt !== post.updatedAt && (
          <Text align='right' color='gray.500' fontSize='sm'>
            Last edited{" "}
            <Moment format='MMM D YYYY, HH:mm'>{post.updatedAt}</Moment>
          </Text>
        )}
      </CardFooter>
    </Card>
  );
};

export default Post;
