import * as React from "react";
import ReactDOM from 'react-dom/client';
import HomePage from "./pages/HomePage";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Social from "./pages/Social";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    loader: HomePage,
  },
  {
    path: "/Dashboard",
    element: <Dashboard />,
    loader: Dashboard,
  },
  {
    path: "/Social",
    element: <Social />,
    loader: Social,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
  );


