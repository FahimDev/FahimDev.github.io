import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import RootLayout from "./layouts/root";
import Home from "./pages/home";
import ProjectView from "./pages/project-view";
import Blogs from "./pages/blogs";
import Projects from "./pages/projects";
import Speakings from "./pages/speakings";
import SpeakingView from "./pages/speaking-view";

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <RootLayout />,
            children: [
                {
                    path: "/",
                    element: <Home />,
                },
                {
                    path: "/blogs",
                    element: <Blogs />,
                },
                {
                    path: "/projects",
                    element: <Projects />,
                },
                {
                    path: "/projects/:slug",
                    element: <ProjectView />,
                },
                {
                    path: "/speaking",
                    element: <Speakings />,
                },
                {
                    path: "/speaking/:slug",
                    element: <SpeakingView />,
                },
            ],
        },
    ],
    {
        basename: import.meta.env.BASE_URL,
    }
);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
