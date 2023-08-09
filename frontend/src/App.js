import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import EditProfile from "./pages/EditProfile";
import RootLayout from "./layouts/RootLayout";
import { ProtectedLogin, RedirectToHome } from "./components/utils/Redirector";
import { extendTheme } from "@chakra-ui/react";
import { useState, useEffect, createContext } from "react";
import UserServices from "./services/UserServices";
import PostService from "./services/PostServices";
import Cookies from "js-cookie";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route
        path='/'
        element={
          <ProtectedLogin>
            <Home />
          </ProtectedLogin>
        }
      />
      <Route
        path=':username'
        element={
          <ProtectedLogin>
            <About />
          </ProtectedLogin>
        }
      />
      <Route
        path='login'
        element={
          <RedirectToHome>
            <Login />
          </RedirectToHome>
        }
      />
      <Route
        path='signup'
        element={
          <RedirectToHome>
            <SignUp />
          </RedirectToHome>
        }
      />
      <Route
        path='edit/:username'
        element={
          <ProtectedLogin>
            <EditProfile />
          </ProtectedLogin>
        }
      />
    </Route>
  )
);

const theme = extendTheme({
  colors: {
    makin: {
      100: "#e2e2f0",
    },
  },
});

export const PostContext = createContext();

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(10);
  const value = {
    posts,
    setPosts,
    limit,
    setLimit,
    currentUser,
  };

  useEffect(() => {
    const loggedUserJSON = Cookies.get("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      UserServices.getUserByUsername(user.username).then((returnedUser) => {
        setCurrentUser(returnedUser);
      });
      UserServices.setToken(user.token);
      PostService.setToken(user.token);
    } else {
      setCurrentUser(undefined);
    }
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <PostContext.Provider value={value}>
        <RouterProvider router={router} />
      </PostContext.Provider>
    </ChakraProvider>
  );
};

export default App;
