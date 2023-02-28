import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link as NavLink, useNavigate } from "react-router-dom";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import SignUpService from "../../services/SignUpService";
import CustomToast from "../utils/CustomToast";

const SignUpForm = () => {
  const [isUsernameError, setIsUsernameError] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const { accountCreatedToast } = CustomToast();

  const handleClick = () => setShow(!show);

  const nameTooLong = "Names can be no more than 60 characters long";
  const usernameError = "This username is already taken";
  const usernameInvalid = "This username contains illegal character";
  const usernameTooLong = "Usernames can be no more than 15 characters long";
  const passwordError = "Password must be at least 8 characters long";
  const isPasswordError = password.length < 8 && password.length !== 0;
  const isUsernameTooLong = username.length > 15;
  const isNameTooLong = name.length > 60;

  const isUsernameInvalid = (val) => {
    const usernameRegex = /^$|^[a-z0-9_.]+$/;
    return !usernameRegex.test(val);
  };

  const navigate = useNavigate();
  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      setIsClicked(true);
      await SignUpService.signup({
        username,
        password,
        name,
      });
      accountCreatedToast();
      navigate("/login");
    } catch (exception) {
      if (exception.response.data.error === usernameError) {
        setIsUsernameError(true);
        setTimeout(() => {
          setIsUsernameError(false);
        }, "4000");
      }
      setIsClicked(false);
    }
  };

  return (
    <form onSubmit={handleSignUp}>
      <FormControl isRequired isInvalid={isNameTooLong}>
        <FormLabel mt='4'>Full Name</FormLabel>
        <Input value={name} onChange={({ target }) => setName(target.value)} />
        {isNameTooLong && <FormErrorMessage>{nameTooLong}</FormErrorMessage>}
      </FormControl>

      <FormControl
        isInvalid={
          isUsernameError || isUsernameInvalid(username) || isUsernameTooLong
        }
        isRequired
      >
        <FormLabel mt='4'>Username</FormLabel>
        <Input
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          id='username'
        />
        {isUsernameError && (
          <FormErrorMessage>{usernameError}</FormErrorMessage>
        )}
        {isUsernameTooLong && (
          <FormErrorMessage>{usernameTooLong}</FormErrorMessage>
        )}
        {isUsernameInvalid(username) && (
          <FormErrorMessage>{usernameInvalid}</FormErrorMessage>
        )}
      </FormControl>

      <FormControl isInvalid={isPasswordError} isRequired>
        <FormLabel mt='4'>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            id='password'
          />
          <InputRightElement>
            <IconButton
              variant='ghost'
              icon={show ? <IoEyeOffOutline /> : <IoEyeOutline />}
              onClick={handleClick}
            />
          </InputRightElement>
        </InputGroup>
        {isPasswordError && (
          <FormErrorMessage>{passwordError}</FormErrorMessage>
        )}
      </FormControl>

      <Button
        colorScheme='purple'
        isDisabled={
          isPasswordError ||
          isUsernameTooLong ||
          isNameTooLong ||
          isUsernameInvalid
        }
        isLoading={isClicked}
        type='submit'
        my={8}
        w={"100%"}
      >
        Sign up
      </Button>

      <Text fontSize={"md"} textAlign={"center"} color={"gray.500"}>
        Already have an account?{" "}
        <Link as={NavLink} to='/login' color={"purple.500"}>
          <Text as='b'>Log in</Text>
        </Link>
      </Text>
    </form>
  );
};

export default SignUpForm;
