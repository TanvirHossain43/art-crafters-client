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
import MyClasses from "../Pages/DashBoard/Instructor/MyClasses/MyClasses";
import Payment from "../Pages/DashBoard/Payment/Payment";
import PaymentHistory from "../Pages/DashBoard/Payment/PaymentHistory";
import ManageClasses from "../Pages/DashBoard/Admin/ManageClasses/ManageClasses";
import MyEnroolClasses from "../Pages/DashBoard/MyEnroolClasses/MyEnroolClasses";
import PrivateRoute from "./PrivateRoute";

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
        element:<PrivateRoute><DashBoard></DashBoard></PrivateRoute>,
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
            },
            {
                path:'myclasses',
                element:<MyClasses></MyClasses>
            },
            {
                path:'payment/:id',
                element:<Payment></Payment>,
                loader:({params})=>fetch(`https://art-crafters-server.vercel.app/selectedClass/${params.id}`)
            },
            {
                path:'paymentHistory',
                element:<PaymentHistory></PaymentHistory>
            },
            {
                path:'manageClasses',
                element:<ManageClasses></ManageClasses>
            },
            {
                path:'enroolClasses',
                element:<MyEnroolClasses></MyEnroolClasses>
            }
        ]

    },
    {
        path: '*',
        element: <Error></Error>
    }
])