import {createBrowserRouter} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import Social from "./pages/Social";
import Profile from "./pages/Profile";
import React from "react";
import Layout from "./components/Layout";

export const ROOT = "/";
export const PROTECTED = "/protected";
export const DASHBOARD = "/protected/dashboard";
export const PROFILE = "/protected/profile";
export const SOCIAL = "/protected/social";


export const router = createBrowserRouter([
  {path: ROOT, element:<HomePage/>},
  {path: PROTECTED, element: <Layout/>, children:[
      {path: DASHBOARD, element:<Dashboard/>},
      {path: PROFILE, element:<Profile/>},
      {path: SOCIAL, element:<Social/>}
    ]}
])

