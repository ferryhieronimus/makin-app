import { VStack, Box, Grid, GridItem } from "@chakra-ui/react";
import EditProfileForm from "../components/form/EditProfileForm";
import { useMediaQuery } from "@chakra-ui/react";
import { useContext } from "react";
import { PostContext } from "../App";

const EditProfile = () => {
  const { currentUser } = useContext(PostContext);
  const [isLargerThan624] = useMediaQuery("(min-width: 624px)");
  window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <Grid
      templateColumns='minmax(1.2rem, 1fr) minmax(25ch, 57ch) minmax(1.2rem, 1fr)'
      gap={isLargerThan624 ? 6 : 0}
    >
      <GridItem
        colStart={isLargerThan624 ? 1 : 2}
        colEnd={isLargerThan624 ? 4 : 3}
      >
        <Box
          borderRadius={"0 0 3rem 3rem"}
          bg={"white"}
          mx={isLargerThan624 ? 24 : 0}
          p={8}
          boxShadow='0 4px 12px 0 rgba(0, 0, 0, 0.075)'
        >
          <VStack spacing={6}>
            <EditProfileForm user={currentUser} />
          </VStack>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default EditProfile;
