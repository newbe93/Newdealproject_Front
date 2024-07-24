import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "@pages/home/Home";
import DetailLayout from "@router/DetailLayout";
import Signup from "@pages/signup/Signup";
import Login from "@pages/login/Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        // errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Home /> },
        ],
    },
    {
        path: "/",
        element: <DetailLayout />,
        children: [
            { path: "signup", element: <Signup /> },
            // 로그인, 비밀번호 재설정 등 다른 인증 관련 라우트...
            { path: "login", element: <Login /> },
        ],
    },
    
])

export default router;