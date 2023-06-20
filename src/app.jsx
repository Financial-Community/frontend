import {ChakraProvider, extendTheme} from "@chakra-ui/react";
import {RouterProvider} from "react-router-dom";
import {router} from "./routes";

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

export default function App(){
  return(
    <ChakraProvider theme={theme}>
      <RouterProvider router={router}/>
    </ChakraProvider>
  );
}