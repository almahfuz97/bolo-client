import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Comments from "../pages/Comments/Comments";
import Home from "../pages/Home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
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
                loader: () => fetch('https://bolo-server.vercel.app/posts')
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/services',
                element: <JwtVerify><Services /></JwtVerify>
            },
            {
                path: '/comments/:id',
                element: <Comments />,
                loader: ({ params }) => fetch(`https://bolo-server.vercel.app/comments/${params.id}`)
            },
            {
                path: '*',
                element: <div>Not Found</div>
            }
        ]
    }
])