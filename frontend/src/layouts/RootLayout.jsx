import { Outlet } from "react-router-dom";
import { Grid, GridItem, Spinner, Flex } from "@chakra-ui/react";
import { useContext } from "react";
import Leftbar from "../components/navbar/Leftbar";
import Rightbar from "../components/navbar/Rightbar";
import LoginHome from "../pages/LoginHome";
import Bottombar from "../components/navbar/Bottombar";
import Div100vh from "react-div-100vh";
import { useMediaQuery } from "@chakra-ui/react";
import { PostContext } from "../App";

const RootLayout = () => {
  const { currentUser } = useContext(PostContext);

  const [isLargerThan1024] = useMediaQuery("(min-width: 1024px)");
  const [isLargerThan902] = useMediaQuery("(min-width: 902px)");
  const [isLargerThan624] = useMediaQuery("(min-width: 624px)");

  if (currentUser === null) {
    return (
      <Flex justifyContent={"center"} alignItems={"center"} minH={"100vh"}>
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='makin.100'
          color='purple.500'
          size='xl'
        />
      </Flex>
    );
  }

  if (currentUser) {
    return (
      <Div100vh>
        <Grid
          templateColumns={
            isLargerThan1024
              ? "15rem 1fr 20rem"
              : isLargerThan902
              ? "80px 1fr 240px"
              : isLargerThan624
              ? "80px 1fr"
              : "1fr"
          }
          bg='makin.100'
        >
          {isLargerThan624 && (
            <GridItem>
              <Leftbar></Leftbar>
            </GridItem>
          )}
          <GridItem
            overflow={"auto"}
            minH={"100vh"}
            mb={!isLargerThan624 && "4rem"}
          >
            <Outlet />
            {!isLargerThan624 && <Bottombar></Bottombar>}
          </GridItem>
          {(isLargerThan1024 || isLargerThan902) && (
            <GridItem>
              <Rightbar></Rightbar>
            </GridItem>
          )}
        </Grid>
      </Div100vh>
    );
  } else {
    return (
      <Div100vh>
        <Grid
          templateColumns={
            isLargerThan902
              ? "2fr 3fr"
              : "minmax(1.2rem, 1fr) minmax(25ch, 57ch) minmax(1.2rem, 1fr)"
          }
          h={"100vh"}
          bg='makin.100'
        >
          <GridItem
            borderRadius={isLargerThan902 ? "0 3rem 3rem 0" : "0"}
            bg={"white"}
            colStart={isLargerThan902 ? 1 : 2}
            colEnd={isLargerThan902 ? 1 : 3}
          >
            <Outlet />
          </GridItem>
          {isLargerThan902 && (
            <GridItem overflow={"auto"}>
              <LoginHome />
            </GridItem>
          )}
        </Grid>
      </Div100vh>
    );
  }
};

export default RootLayout;
