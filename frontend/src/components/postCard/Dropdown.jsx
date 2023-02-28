import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  IconButton,
  Button,
  Stack,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Textarea,
  CircularProgress,
} from "@chakra-ui/react";

import { BsThreeDots } from "react-icons/bs";
import { RiDeleteBin7Fill, RiPencilFill } from "react-icons/ri";
import { useDisclosure } from "@chakra-ui/react";
import { useEffect, useRef } from "react";

export default function Dropdown({
  onClick,
  updateContent,
  content,
  newPost,
  setNewPost,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();

  const cancelRef = useRef();

  useEffect(() => {
    setNewPost(content);
  }, [setNewPost, content]);

  return (
    <Popover placement='bottom' isLazy closeOnBlur={!isOpen && !isOpenEdit}>
      <PopoverTrigger>
        <IconButton
          aria-label='More server options'
          icon={<BsThreeDots />}
          variant='ghost'
          w='fit-content'
        />
      </PopoverTrigger>
      <PopoverContent w='fit-content' _focus={{ boxShadow: "none" }}>
        <PopoverArrow />
        <PopoverBody>
          <Stack>
            <Button
              w='150px'
              variant='ghost'
              rightIcon={<RiPencilFill />}
              justifyContent='space-between'
              fontWeight='normal'
              fontSize='sm'
              onClick={onOpenEdit}
            >
              Edit
            </Button>

            <Modal isOpen={isOpenEdit} onClose={onCloseEdit} isCentered>
              <ModalOverlay />
              <ModalContent borderRadius={"3xl"}>
                <ModalHeader>Edit Post</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Textarea
                    value={newPost}
                    onChange={(event) => setNewPost(event.target.value)}
                    whiteSpace={"pre-wrap"}
                    minH={"14rem"}
                  />
                </ModalBody>

                <ModalFooter>
                  <CircularProgress
                    size={"2rem"}
                    value={newPost.length / 4}
                    color={"purple.500"}
                  />
                  <Button
                    isDisabled={!newPost || newPost.length > 400}
                    colorScheme='purple'
                    ml={3}
                    onClick={() => {
                      updateContent();
                      onCloseEdit();
                    }}
                  >
                    Send
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

            <Button
              w='150px'
              variant='ghost'
              rightIcon={<RiDeleteBin7Fill />}
              justifyContent='space-between'
              fontWeight='normal'
              colorScheme='red'
              fontSize='sm'
              onClick={onOpen}
            >
              Delete
            </Button>

            <AlertDialog
              motionPreset='scale'
              leastDestructiveRef={cancelRef}
              onClose={onClose}
              isOpen={isOpen}
              isCentered
            >
              <AlertDialogOverlay />

              <AlertDialogContent borderRadius={"3xl"}>
                <AlertDialogHeader>Delete Post?</AlertDialogHeader>
                <AlertDialogCloseButton />
                <AlertDialogBody>
                  This can't be undone and it will be removed from your profile
                  and the timeline.
                </AlertDialogBody>
                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose}>
                    No
                  </Button>
                  <Button colorScheme='red' ml={3} onClick={onClick}>
                    Yes
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
