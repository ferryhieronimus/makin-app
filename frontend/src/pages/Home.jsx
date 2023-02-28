import { useEffect, useContext } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import { PostContext } from "../App";

import Post from "../components/postCard/Post";
import PostService from "../services/PostServices";
import { useMediaQuery } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";
import CustomToast from "../components/utils/CustomToast";
import Cookies from "js-cookie";

const Home = () => {
  const { posts, setPosts } = useContext(PostContext);
  const { limit, setLimit } = useContext(PostContext);
  const { currentUser } = useContext(PostContext);

  const [isLargerThan624] = useMediaQuery("(min-width: 624px)");

  const { expiredSessionToast } = CustomToast();
  const tokenExpiredError = "token expired";

  const handleLogOut = () => {
    Cookies.remove('loggedUser')
    window.location.reload();
  };

  const resultValidator = (post) => {
    return post.isCloseFriend &&
      post.user.id !== (currentUser && currentUser.id) &&
      !post.user.closeFriends.includes(currentUser.id) ? null : (
      <Post key={post.id} post={post} location='post' />
    );
  };

  useEffect(() => {
    if (currentUser !== undefined) {
      PostService.getPost(limit)
        .then((initialPosts) => {
          setPosts(initialPosts);
        })
        .catch((error) => {
          if (error.response.data.error === tokenExpiredError) {
            setTimeout(() => {
              handleLogOut();
            }, "2000");
            expiredSessionToast()
          }
        });
    } else {
      PostService.getPostForAnonymous().then((initialPosts) => {
        setPosts(initialPosts);
      });
    }
  }, [limit, setPosts]);

  return (
    <Grid
      templateColumns='minmax(1.2rem, 1fr) minmax(25ch, 57ch) minmax(1.2rem, 1fr)'
      gap={isLargerThan624 ? 6 : 0}
    >
      <GridItem colStart={2} colEnd={3}>
        <InfiniteScroll
          dataLength={posts.length}
          next={() => setLimit(limit + 5)}
          hasMore={true}
          loader={null}
        >
          {posts.map((post) => resultValidator(post))}
        </InfiniteScroll>
      </GridItem>
    </Grid>
  );
};

export default Home;
