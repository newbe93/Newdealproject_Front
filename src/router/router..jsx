import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "@pages/home/Home";
import DetailLayout from "@router/DetailLayout";
import Signup from "@pages/signup/Signup";
import Login from "@pages/login/Login";
import Chat from "@pages/chat/Chat";
import MessageContainer from "@components/messages/MessageContainer";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        // errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Home /> },
            {
                element: <DetailLayout />,
                children: [
                    { path: "signup", element: <Signup /> },
                    { path: "login", element: <Login /> },
                    { path: "chat", element: <Chat /> },
                    { path: "chat/:chatRoomId", element: <MessageContainer /> },
                ],
            },
        ],
    },
]);

export default router;