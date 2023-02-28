import {
  Alert,
  AlertIcon,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Link,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link as NavLink } from "react-router-dom";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import LoginService from "../../services/LoginServices";
import Cookies from "js-cookie";

const LoginForm = () => {
  const [isError, setIsError] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      setIsClicked(true);
      const user = await LoginService.login({
        username,
        password,
      });
      Cookies.set("loggedUser", JSON.stringify(user));
      window.location.reload();
    } catch (exception) {
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, "4000");
      setIsClicked(false);
    }
  };

  return (
    <FormControl isInvalid={isError}>
      <form onSubmit={handleLogin}>
        <FormLabel mt='4'>Username</FormLabel>
        <Input
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          id='username'
        />

        <FormLabel mt='4'>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <InputRightElement>
            <IconButton
              variant='ghost'
              icon={show ? <IoEyeOffOutline /> : <IoEyeOutline />}
              onClick={handleClick}
            />
          </InputRightElement>
        </InputGroup>

        {isError && (
          <Alert status='error' my={4}>
            <AlertIcon />
            The username or password is incorrect.
          </Alert>
        )}

        <Button
          colorScheme='purple'
          isLoading={isClicked}
          type='submit'
          my={8}
          w={"100%"}
        >
          Sign in
        </Button>

        <Text fontSize={"md"} textAlign={"center"} color={"gray.500"}>
          Don't have an account?{" "}
          <Link as={NavLink} to='/signup' color={"purple.500"}>
            <Text as='b'>Sign up</Text>
          </Link>
        </Text>
      </form>
    </FormControl>
  );
};

export default LoginForm;
