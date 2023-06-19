import React from "react";
import ReactDOM from 'react-dom/client';
import {ChakraProvider} from "@chakra-ui/react";
import {extendTheme} from "@chakra-ui/react";
import {AuthProvider} from "./context/AuthContext";
import {GoogleOAuthProvider} from "@react-oauth/google";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import Social from "./pages/Social";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Profile from "./pages/Profile";

const theme = extendTheme({

  styles: {
    global: {
      "html, body": {
        height: "100vh",
        backgroundColor: "gray.700",
      },
    },
  },
})

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>,
    loader: HomePage,
  },
  {
    path: "/Dashboard",
    element: <Dashboard/>,
    loader: Dashboard,
  },
  {
    path: "/Social",
    element: <Social/>,
    loader: Social,
  },
  {
    path: "/Profile",
    element: <Profile/>,
    loader: Profile,
  },
]);


const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement).render(
  <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
    <React.StrictMode>
      <AuthProvider>
        <ChakraProvider theme={theme}>
          <RouterProvider router={router}/>
        </ChakraProvider>
      </AuthProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);


