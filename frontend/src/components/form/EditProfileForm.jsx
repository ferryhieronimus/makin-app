import {
  Icon,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Textarea,
  Avatar,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Spacer,
  Tooltip,
} from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import UserServices from "../../services/UserServices";
import CustomToast from "../utils/CustomToast";
import { FaTrash, FaPlus } from "react-icons/fa";
import Cookies from "js-cookie";

const EditProfileForm = ({ user, context }) => {
  const [isUsernameError, setIsUsernameError] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isRemoveClicked, setIsRemoveClicked] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");
  const [editImage, setEditImage] = useState("");
  const [file, setFile] = useState(false);
  const hiddenFileInput = useRef(null);

  const { accountUpdatedToast, expiredSessionToast } = CustomToast();

  const usernameError = "This username is already taken";

  const handleLogOut = () => {
    Cookies.remove("loggedUser");
    window.location.reload();
  };

  const handleUpdateProfile = (event) => {
    setIsClicked(true);
    event.preventDefault();
    const newObject = {
      username,
      name,
      bio,
    };
    const id = user.id;
    UserServices.updateUser(id, newObject)
      .then(() => {
        accountUpdatedToast();
        setTimeout(() => {
          window.location.reload();
        }, "1000");
      })
      .catch((error) => {
        if (error.response.data.error === usernameError) {
          setIsUsernameError(true);
          setTimeout(() => {
            setIsUsernameError(false);
          }, "2000");
        } else {
          setTimeout(() => {
            handleLogOut();
          }, "2000");
          expiredSessionToast();
        }
        setIsClicked(false);
      });
  };

  const handleUpdateProfilePicture = (event) => {
    event.preventDefault();
    setIsClicked(true);
    let formData = new FormData();
    formData.append("image", file);
    const id = user.id;

    UserServices.updateProfileImage(id, formData)
      .then(() => {
        accountUpdatedToast();
        setTimeout(() => {
          window.location.reload();
        }, "2000");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setUsername((user && user.username) || "");
    setName((user && user.name) || "");
    setBio((user && user.bio) || "");
    setImage((user && user.profileImage) || "");
  }, [setUsername, setName, setBio, setImage, user]);

  const handleDeleteProfilePicture = (event) => {
    event.preventDefault();
    setIsRemoveClicked(true);
    const id = user.id;
    UserServices.deleteProfileImage(id)
      .then(() => {
        accountUpdatedToast();
        setTimeout(() => {
          window.location.reload();
        }, "2000");
      })
      .catch((error) => {});
  };

  const handleChange = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      setEditImage(undefined);
      return;
    }
    setFile(event.target.files[0]);
  };

  useEffect(() => {
    if (!file) {
      setEditImage(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setEditImage(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  return (
    <>
      <Tooltip hasArrow label='Change Picture'>
        <Avatar name={name} src={image} size={"2xl"} onClick={onOpen} />
      </Tooltip>

      <form onSubmit={handleUpdateProfile}>
        <FormControl isRequired>
          <FormLabel mt='4'>Full Name</FormLabel>
          <Input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </FormControl>
        <FormControl isInvalid={isUsernameError} isRequired>
          <FormLabel mt='4'>Username</FormLabel>
          <Input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            id='username'
          />
          {isUsernameError && (
            <FormErrorMessage>{usernameError}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl>
          <FormLabel mt='4'>Bio</FormLabel>
          <Textarea
            value={bio}
            onChange={({ target }) => setBio(target.value)}
            id='bio'
          />
        </FormControl>
        <Button
          colorScheme='purple'
          isLoading={isClicked}
          type='submit'
          my={8}
          w={"50%"}
          borderRadius={"2xl"}
        >
          Save
        </Button>
      </form>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent borderRadius={"3xl"}>
          <ModalHeader>Change Profile Photo</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleUpdateProfilePicture}>
            <ModalBody>
              <FormControl>
                <Avatar
                  icon={<FaPlus fontSize='1.5rem' />}
                  src={editImage}
                  size={"2xl"}
                  onClick={() => hiddenFileInput.current.click()}
                />
                <input
                  type='file'
                  name='image'
                  onChange={handleChange}
                  style={{ display: "none" }}
                  ref={hiddenFileInput}
                  accept="image/*"
                />
              </FormControl>
            </ModalBody>
            <ModalFooter justifyContent={"center"}>
              <Button
                onClick={handleDeleteProfilePicture}
                color={"red.500"}
                borderRadius={"2xl"}
                isLoading={isRemoveClicked}
              >
                <Icon as={FaTrash} />
              </Button>
              <Spacer />
              <Button
                isDisabled={!file}
                type='submit'
                borderRadius={"2xl"}
                colorScheme='purple'
                isLoading={isClicked}
              >
                Upload
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditProfileForm;
