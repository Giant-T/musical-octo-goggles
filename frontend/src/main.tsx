import { MantineProvider } from "@mantine/core";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Page404 from "./pages/404";
import Activation from "./pages/Activation";
import Intrusions from "./pages/Intrusions";
import App from "./pages/App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/intrusions",
    element: <Intrusions />,
  },
  {
    path: "/404",
    element: <Page404 />,
  },
  {
    path: "/activation",
    element: <Activation />
  },
  {
    path: "*",
    loader: () => {
      return redirect("/404");
    },
  },
]);

let mode: 'light' | 'dark' = 'light';

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  mode = 'dark';
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: mode
      }}
    >
      <RouterProvider router={router} />
    </MantineProvider>
  </React.StrictMode>
);
