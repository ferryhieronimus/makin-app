import { useEffect, useContext } from "react";
import {
  VStack,
  Box,
  Grid,
  GridItem,
  Heading,
  Icon,
  useMediaQuery,
} from "@chakra-ui/react";
import Post from "../components/postCard/Post";
import PostService from "../services/PostServices";
import ProfilePageHeader from "../components/navbar/ProfilePagebar";
import { useParams } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { PostContext } from "../App";
import CustomToast from "../components/utils/CustomToast";
import Cookies from "js-cookie";

const About = () => {
  const { posts, setPosts, currentUser } = useContext(PostContext);
  const { username } = useParams();
  const [isLargerThan624] = useMediaQuery("(min-width: 624px)");

  const thisUserPosts = posts.filter((post) => post.user.username === username);

  const { expiredSessionToast } = CustomToast();
  const tokenExpiredError = "token expired";

  const handleLogOut = () => {
    Cookies.remove("loggedUser");
    window.location.reload();
  };

  const resultValidator = (post) => {
    return post.isCloseFriend &&
      post.user.id !== currentUser.id &&
      !post.user.closeFriends.includes(currentUser.id) ? null : (
      <Post key={post.id} post={post} location='about' />
    );
  };

  useEffect(() => {
    PostService.getAllPost()
      .then((initialPosts) => {
        setPosts(initialPosts);
      })
      .catch((error) => {
        if (error.response.data.error === tokenExpiredError) {
          setTimeout(() => {
            handleLogOut();
          }, "2000");
          expiredSessionToast();
        }
      });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [setPosts]);

  return (
    <Grid
      templateColumns='minmax(1.2rem, 1fr) minmax(25ch, 57ch) minmax(1.2rem, 1fr)'
      gap={isLargerThan624 ? 6 : 0}
    >
      {isLargerThan624 && (
        <GridItem colStart={1} colEnd={4}>
          <ProfilePageHeader username={username} mx={"24"} />
        </GridItem>
      )}

      {!isLargerThan624 && (
        <GridItem colStart={2} colEnd={3}>
          <ProfilePageHeader username={username} mx={"0"} />
        </GridItem>
      )}

      <GridItem colStart={2} colEnd={3}>
        {thisUserPosts.length !== 0 &&
          thisUserPosts.map((post) => resultValidator(post))}
        {thisUserPosts.length === 0 && (
          <VStack gap={6}>
            <Box my={"2rem"}></Box>
            <Icon as={IoSearchOutline} boxSize={12} color={"gray.500"} />
            <Box>
              <Heading size={"lg"} color={"gray.500"}>
                Oops, nothing here!
              </Heading>
            </Box>
          </VStack>
        )}
      </GridItem>
    </Grid>
  );
};

export default About;
