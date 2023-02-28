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

import { useContext, useState, useEffect } from "react";
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

  return (
    <Flex gap='4' alignItems='center' flexWrap='no-wrap'>
      {location === "rightbar" && (
        <>
          <Avatar name={user.name} src={user.profileImage}/>
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
          <Avatar name={user.name} src={user.profileImage} as={NavLink} to={user.username} />
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
          <Avatar name={user.name} src={user.profileImage}/>
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
        <>
          <Avatar name={user.name} src={user.profileImage}/>
          {isLargerThan1024 && (
            <Box as={NavLink} to={user.username}>
              <Heading size='sm' align='left'>
                {user.name}
              </Heading>
              <Text color='gray.500' align='left'>
                @{user.username}
              </Text>
            </Box>
          )}
        </>
      )}
      {location === "closefriend" && (
        <>
          <Avatar name={user.name} src={user.profileImage}/>
          <Box>
            <Heading size='sm' align='left'>
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
            onChange={() => {
              isCloseFriend ^ isChecked
                ? removeCloseFriend()
                : addCloseFriend();
              setIsCloseFriend(!isCloseFriend);
            }}
          />
        </>
      )}
    </Flex>
  );
};

export default Profile;
