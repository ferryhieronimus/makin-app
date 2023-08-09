import { Heading, Stack, Text } from "@chakra-ui/react";
import SignUpForm from "../components/form/SignUpForm";

const SignUp = () => {
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
        Create Account
      </Heading>

      <Text fontSize={"md"} textAlign={"left"} color={"gray.500"}>
        Please enter your details.
      </Text>

      <SignUpForm />
    </Stack>
  );
};

export default SignUp;
