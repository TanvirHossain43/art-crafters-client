import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Instructors from "../Pages/Instructors/Instructors";
import Classes from "../Pages/Classes/Classes";
import DashBoard from "../Layout/DashBoard/DashBoard";
import Error from "../Pages/Error/Error";
import MySelectedClasses from "../Pages/DashBoard/MySelectedClasses/MySelectedClasses";
import AllUsers from "../Pages/DashBoard/AllUsers/AllUsers";
import AddClass from "../Pages/DashBoard/Instructor/AddClass/AddClass";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'register',
                element: <Register></Register>
            },
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'instructors',
                element: <Instructors></Instructors>
            },
            {
                path: 'classes',
                element: <Classes></Classes>
            },

        ],


    },
    {

        path: 'dashboard',
        element: <DashBoard></DashBoard>,
        children: [
            {
                path: 'myselectedclasses',
                element: <MySelectedClasses></MySelectedClasses>
            },
            {
                path:'allusers',
                element:<AllUsers></AllUsers>
            },
            {
                path:'addclass',
                element:<AddClass></AddClass>
            }
        ]

    },
    {
        path: '*',
        element: <Error></Error>
    }
])