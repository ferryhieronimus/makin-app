import {
  FaUserEdit,
  FaHome,
  FaPaperPlane,
  FaStar,
  FaUser,
  FaPowerOff,
} from "react-icons/fa";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useMediaQuery,
  Flex,
  Icon,
  Text,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { PostContext } from "../../App";
import { useContext } from "react";
import Profile from "../profileCard/Profile";
import Create from "../form/CreateForm";
import CloseFriends from "../form/CloseFriendsForm";
import Cookies from "js-cookie";

const Leftbar = () => {
  const [isLargerThan1024] = useMediaQuery("(min-width: 1024px)");
  const { currentUser } = useContext(PostContext);
  return (
    <Flex
      pos='fixed'
      w={isLargerThan1024 ? "15rem" : "80px"}
      boxShadow='0 4px 12px 0 rgba(0, 0, 0, 0.2)'
      borderRadius={"0 3rem 3rem 0"}
      py='2'
      h='100vh'
      flexDir='column'
      bg='white'
    >
      <Title title={isLargerThan1024 ? "makin" : ""} />
      <LeftbarContent content={"Home"} icon={FaHome} path={"/"} />
      <LeftbarContent
        content={"Profile"}
        icon={FaUser}
        path={currentUser.username}
      />
      <LeftbarContent
        content={"Close Friends"}
        icon={FaStar}
        isCloseFriend={true}
      />
      <LeftbarContent content={"Create"} icon={FaPaperPlane} isCreate={true} />
      <Spacer />
      <LeftbarProfile />
    </Flex>
  );
};

const LeftbarContent = ({ icon, content, isCreate, isCloseFriend, path }) => {
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
        mx='4'
        my='1'
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
        {icon && <Icon mr='4' fontSize='16' as={icon} />}
        <Create onClose={onClose} isOpen={isOpen} />
        <CloseFriends onClose={onCloseCloseFriend} isOpen={isOpenCloseFriend} />
        {isLargerThan1024 ? content : null}
      </Flex>
    </NavLink>
  );
};

const Title = ({ title }) => {
  return (
    <Flex alignItems='center' mx='4' p='8'>
      <Text fontSize='2xl' fontFamily='monospace' fontWeight='bold'>
        {title}
      </Text>
    </Flex>
  );
};

const LeftbarProfile = () => {
  const { currentUser } = useContext(PostContext);

  const handleLogOut = () => {
    Cookies.remove("loggedUser");
    window.location.reload();
  };

  const [isLargerThan1024] = useMediaQuery("(min-width: 1024px)");

  return (
    <Menu>
      <MenuButton
        mx={isLargerThan1024 ? "4" : "0"}
        mb='2'
        p='4'
        borderRadius='3xl'
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

export default Leftbar;
