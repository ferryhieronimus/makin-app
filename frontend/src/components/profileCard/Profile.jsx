import {
  Flex,
  Avatar,
  Box,
  Heading,
  Text,
  useMediaQuery,
  Checkbox,
  Spacer,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { PostContext } from "../../App";

import { useContext, useState } from "react";
import UserServices from "../../services/UserServices";

const Profile = ({ user, location, isChecked }) => {
  const [isLargerThan1024] = useMediaQuery("(min-width: 1024px)");

  const [isCloseFriend, setIsCloseFriend] = useState(false);
  const { currentUser } = useContext(PostContext);

  const addCloseFriend = () => {
    UserServices.addCloseFriend(currentUser.id, { closeFriend: user.id });
  };

  const removeCloseFriend = () => {
    UserServices.removeCloseFriend(currentUser.id, { closeFriend: user.id });
  };

  const handleClickCloseFriend = () => {
    isCloseFriend ^ isChecked
      ? removeCloseFriend()
      : addCloseFriend();
    setIsCloseFriend(!isCloseFriend);
  } 

  return (
    <Flex gap='4' alignItems='center' flexWrap='no-wrap' maxW={'100%'} className={'adkucaldcnakdjcnaldjcnaldjcnlajdnclajdcnladj'}>
      {location === "rightbar" && (
        <>
          <Avatar
            name={user.name}
            src={user.profileImage}
            userSelect={"none"}
          />
          <Box>
            <Heading size='sm' align='left' isTruncated maxW={"9rem"}>
              {user.name}
            </Heading>
            <Text color='gray.500' align='left'>
              @{user.username}
            </Text>
          </Box>
        </>
      )}
      {location === "post" && (
        <>
          <Avatar
            name={user.name}
            src={user.profileImage}
            as={NavLink}
            to={user.username}
            userSelect={"none"}
          />
          <Box as={NavLink} to={user.username}>
            <Heading size='sm' align='left'>
              {user.name}
            </Heading>
            <Text color='gray.500' align='left'>
              @{user.username}
            </Text>
          </Box>
        </>
      )}
      {location === "about" && (
        <>
          <Avatar
            name={user.name}
            src={user.profileImage}
            userSelect={"none"}
          />
          <Box>
            <Heading size='sm' align='left'>
              {user.name}
            </Heading>
            <Text color='gray.500' align='left'>
              @{user.username}
            </Text>
          </Box>
        </>
      )}
      {location === "leftbar" && (
        <Flex gap={4} maxW={"70%"}>
          <Avatar
            name={user.name}
            src={user.profileImage}
            userSelect={"none"}
          />
          {isLargerThan1024 && (
            <Box as={NavLink} to={user.username} maxW={"100%"}>
              <Heading size='sm' align='left' isTruncated>
                {user.name}
              </Heading>
              <Text color='gray.500' align='left' isTruncated>
                @{user.username}
              </Text>
            </Box>
          )}
        </Flex>
      )}
      {location === "closefriend" && (
        <>
          <Avatar
            name={user.name}
            src={user.profileImage}
            userSelect={"none"}
          />
          <Box maxW={'60%'} onClick={handleClickCloseFriend}>
            <Heading size='sm' align='left' isTruncated>
              {user.name}
            </Heading>
            <Text color='gray.500' align='left'>
              @{user.username}
            </Text>
          </Box>
          <Spacer />
          <Checkbox
            size='lg'
            colorScheme='purple'
            isChecked={isCloseFriend ^ isChecked}
            onChange={handleClickCloseFriend}
          />
        </>
      )}
    </Flex>
  );
};

export default Profile;
