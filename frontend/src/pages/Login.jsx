import { Heading, Stack, Text } from "@chakra-ui/react";
import LoginForm from "../components/form/LoginForm";

const Login = () => {
  return (
    <Stack
      spacing={4}
      mx={"auto"}
      maxW={"xs"}
      px={8}
      pb='0'
      h={"100vh"}
      justifyContent='center'
    >
      <Heading fontSize={"3xl"} textAlign={"left"}>
        Welcome back!
      </Heading>

      <Text fontSize={"md"} textAlign={"left"} color={"gray.500"}>
        Please enter your details.
      </Text>

      <LoginForm />
    </Stack>
  );
};

export default Login;
