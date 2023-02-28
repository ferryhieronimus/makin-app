import { Flex, Icon, Text } from "@chakra-ui/react";
import {
  FaUserEdit,
  FaHome,
  FaPaperPlane,
  FaStar,
  FaUser,
  FaPowerOff,
} from "react-icons/fa";
import { useDisclosure } from "@chakra-ui/react";
import Profile from "../profileCard/Profile";
import Create from "../form/CreateForm";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useMediaQuery,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import CloseFriends from "../form/CloseFriendsForm";
import { PostContext } from "../../App";

import { useContext } from "react";
import Cookies from 'js-cookie'

const Bottombar = () => {
  const { currentUser } = useContext(PostContext);

  return (
    <Flex
      pos='fixed'
      w='100vw'
      boxShadow='0 4px 12px 0 rgba(0, 0, 0, 0.075)'
      flexDir='row'
      bg='white'
      left={"0"}
      bottom={"0"}
      justifyContent={"space-around"}
      alignItems={"center"}
    >
      <BottombarContent content={"Home"} icon={FaHome} path={"/"} />
      <BottombarContent
        content={"Profile"}
        icon={FaUser}
        path={currentUser.username}
      />
      <BottombarContent
        content={"Create"}
        icon={FaPaperPlane}
        isCreate={true}
      />
      <BottombarContent
        content={"Close Friends"}
        icon={FaStar}
        isCloseFriend={true}
      />
      <BottombarProfile
      />
    </Flex>
  );
};

const BottombarContent = ({ icon, content, isCreate, path, isCloseFriend }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenCloseFriend,
    onOpen: onOpenCloseFriend,
    onClose: onCloseCloseFriend,
  } = useDisclosure();
  const [isLargerThan1024] = useMediaQuery("(min-width: 1024px)");

  return (
    <NavLink to={path}>
      <Flex
        bg={isCreate && "purple.500"}
        color={isCreate && "white"}
        alignItems='center'
        p='4'
        borderRadius='3xl'
        cursor='pointer'
        _hover={
          !isCreate && {
            bg: "gray.100",
          }
        }
        onClick={isCreate ? onOpen : isCloseFriend ? onOpenCloseFriend : null}
      >
        {icon && <Icon fontSize='16' as={icon} />}
        <Create onClose={onClose} isOpen={isOpen} />
        <CloseFriends onClose={onCloseCloseFriend} isOpen={isOpenCloseFriend} />
        {isLargerThan1024 ? content : null}
      </Flex>
    </NavLink>
  );
};

const BottombarProfile = () => {
  const handleLogOut = () => {
    Cookies.remove("loggedUser");
    window.location.reload();
  };

  const { currentUser } = useContext(PostContext);

  return (
    <Menu>
      <MenuButton
        p='2'
        borderRadius='3xl'
        role='group'
        cursor='pointer'
        _hover={{
          bg: "gray.100",
        }}
      >
        <Profile user={currentUser} location={"leftbar"} />
      </MenuButton>
      <MenuList minW={"20px"}>
        <MenuItem as={NavLink} to={`edit/${currentUser.username}`}>
          <Icon mr='4' fontSize='16' as={FaUserEdit} />
          Edit Profile
        </MenuItem>
        <MenuDivider />
        <MenuItem alignItems={"center"} onClick={handleLogOut}>
          <Icon mr='4' fontSize='16' as={FaPowerOff} color='red' />
          <Text color={"red"}>Log out</Text>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default Bottombar;
