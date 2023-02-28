import { useToast } from "@chakra-ui/react";

const CustomToast = () => {
  const toast = useToast();

  const accountCreatedToast = () => {
    toast({
      title: "Account created",
      description: "Your account has been created.",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  };

  const accountUpdatedToast = () => {
    toast({
      title: "Account updated",
      description: "Your account has been updated.",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  };

  const expiredSessionToast = () => {
    toast({
      title: "Session Expired",
      description: "Your session has expired. Please log in again.",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  };

  const createPostToast = () => {
    toast({
      title: "Post Created",
      description: "Your post was created.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const updatePostToast = () => {
    toast({
      title: "Post Updated",
      description: "Your post was updated.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const deletePostToast = () => {
    toast({
      title: "Post Deleted",
      description: "Your post was deleted.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return {
    accountCreatedToast,
    expiredSessionToast,
    updatePostToast,
    createPostToast,
    deletePostToast,
    accountUpdatedToast,
  };
};

export default CustomToast;
