import { createBrowserRouter } from "react-router-dom";
import Root from "@router/Root";
import Home from "@pages/home/Home";
import DetailLayout from "@router/DetailLayout";
import Signup from "@pages/signup/Signup";
import Login from "@pages/login/Login";
import Chat from "@pages/chat/Chat";
import MessageContainer from "@components/messages/MessageContainer";
import Friend from "@pages/friend/Friend";
import Location from "@pages/location/Location";

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
                    { path : "friend", element : <Friend />},
                    { path: "chat", element: <Chat /> },
                    { path: "chat/:chatRoomId", element: <MessageContainer /> },
                    { path : "location", element : <Location/>}
                ],
            },
        ],
    },
]);

export default router;