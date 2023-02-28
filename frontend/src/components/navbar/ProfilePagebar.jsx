import { Box, VStack, Avatar, Text, Heading } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import UserServices from "../../services/UserServices";
import CustomToast from "../utils/CustomToast";

const ProfilePageHeader = ({ username, mx }) => {
  const [user, setUser] = useState(null);
  const profileUsers = user;
  const { expiredSessionToast } = CustomToast();
  const tokenExpiredError = "token expired";
  
  useEffect(() => {
    UserServices.getUserByUsername(username)
      .then((user) => setUser(user))
      .catch((error) => {
        if (error.response.data.error === tokenExpiredError) {
          expiredSessionToast();
        }
      });
  }, [username, expiredSessionToast]);

  return (
    <Box
      borderRadius={"0 0 3rem 3rem"}
      bg={"white"}
      mx={mx}
      p={8}
      boxShadow='0 4px 12px 0 rgba(0, 0, 0, 0.075)'
    >
      <VStack spacing={6}>
        <Avatar
          bg='makin.100'
          name={profileUsers && profileUsers.name}
          src={profileUsers && profileUsers.profileImage}
          size={"2xl"}
          cursor='pointer'
          userSelect={'none'}
        />
        <Box maxW={'100%'}>
          <Heading as='h3' size='lg' isTruncated>
            {profileUsers && profileUsers.name}
          </Heading>
          <Text color='gray.500'>@{username}</Text>
        </Box>
        <Text color='gray.500'>{profileUsers && profileUsers.bio}</Text>
      </VStack>
    </Box>
  );
};

export default ProfilePageHeader;
