import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/login/Login";
import Services from "../pages/services/Services";
import JwtVerify from "./JwtVerify";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Home />,
                loader: () => fetch('http://localhost:5000/posts')
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/services',
                element: <JwtVerify><Services /></JwtVerify>
            },
        ]
    }
])