import { MantineProvider } from "@mantine/core";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Page404 from "./pages/404";
import Page500 from "./pages/500";
import App from "./pages/App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/404",
    element: <Page404 />,
  },
  {
    path: "/500",
    element: <Page500 />,
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
