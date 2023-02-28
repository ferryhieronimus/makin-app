import { Box, Flex, Text, Spacer } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Profile from "../profileCard/Profile";
import UserServices from "../../services/UserServices";
import CustomToast from "../utils/CustomToast";

const Rightbar = () => {
  const [users, setUsers] = useState([]);
  const { expiredSessionToast } = CustomToast();
  const tokenExpiredError = "token expired";

  useEffect(() => {
    UserServices.getUser("", "")
      .then((user) => setUsers(user))
      .catch((error) => {
        if (error.response.data.error === tokenExpiredError) {
          expiredSessionToast();
        }
      });
  }, [expiredSessionToast]);

  return (
    <Flex
      pos='fixed'
      w='20rem'
      my='12'
      py='2'
      maxH={"90vh"}
      boxShadow='0 4px 12px 0 rgba(0, 0, 0, 0.075)'
      flexDir='column'
      borderRadius={"3rem 0 0 3rem"}
      bg='white'
    >
      <Title title={"Suggestions for you"} />
      <Spacer />
      {users.slice(-5).map((user) => (
        <SidebarProfile user={user && user} key={user && user.id} />
      ))}
    </Flex>
  );
};

const Title = ({ title }) => {
  return (
    <Flex alignItems='center' mx='4' p='8'>
      <Text fontSize='xl' color={"gray.700"} fontWeight='bold' align={"right"}>
        {title}
      </Text>
    </Flex>
  );
};

const SidebarProfile = ({ user }) => {
  return (
    <Box
      as={NavLink}
      to={user.username}
      mx='4'
      mb='2'
      p='4'
      borderRadius='3xl'
      role='group'
      cursor='pointer'
      _hover={{
        bg: "gray.100",
      }}
    >
      <Profile user={user && user} location={"rightbar"} />
    </Box>
  );
};

export default Rightbar;
