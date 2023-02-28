import { useEffect, useContext } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import { PostContext } from "../App";
import Post from "../components/postCard/Post";
import PostService from "../services/PostServices";
import { useMediaQuery } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";

const LoginHome = () => {
  const { posts, setPosts } = useContext(PostContext);
  const { limit, setLimit } = useContext(PostContext);

  const [isLargerThan624] = useMediaQuery("(min-width: 624px)");

  const resultValidator = (post) => {
    return ( !post.isCloseFriend &&
      <Post key={post.id} post={post} location='post' />
    );
  };

  useEffect(() => {
    PostService.getPost(limit).then((initialPosts) => {
      setPosts(initialPosts);
    });
  }, [limit, setPosts]);

  return (
    <Grid
      backgroundColor='makin.100'
      templateColumns='minmax(1.2rem, 1fr) minmax(25ch, 57ch) minmax(1.2rem, 1fr)'
      gap={isLargerThan624 ? 6 : 0}
    >
      <GridItem colStart={2} colEnd={3} className={"grid-item"}>
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

export default LoginHome;
