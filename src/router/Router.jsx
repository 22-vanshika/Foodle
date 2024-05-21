import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Menu from "../pages/shop/Menu";
import UpdateProfile from "../pages/dashboard/UpdateProfile";
import PrivateRouter from "../PrivateRouter/PrivateRouter";
import CartPage from "../pages/shop/CartPage";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/dashboard/admin/Dashboard";
import User from "../pages/dashboard/admin/User";
import AddMenu from "../pages/dashboard/admin/AddMenu";
import ManageItems from "../pages/dashboard/admin/ManageItems";
import UpdateMenu from "../pages/dashboard/admin/UpdateMenu";
import Payment from "../pages/shop/Payment";
import Order from "../pages/dashboard/admin/Order";
import ManageBookings from "../pages/dashboard/admin/ManageBookings";
import UpdateOrder from "../pages/dashboard/admin/UpdateOrder";
import About from "../pages/shop/About";
import Offers from "../pages/shop/Offers";




const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
      {
        path: "/offers",
        element: <Offers />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path:"/cart-page",
        element: <CartPage/>
      },
      {
        path: "/update-profile",
        element: <UpdateProfile/>
      },
      {
        path:"/order",
        element:<Order/>
      },
      {
        path:"/process-checkout",
        element:<Payment/>
      }
    ],
  },
  {
    path:'dashboard',
    element: 
      <DashboardLayout/>,
    
    children:[
      {
        path:'',
        element:<Dashboard/>
      },
      {
        path:'user',
        element: <User/>
      },
      {
        path:'add-menu',
        element: <AddMenu/>
      },
      {
        path:'manage-bookings',
        element:<ManageBookings/>
      },
      {
        path:'manage-items',
        element: <ManageItems/>
      },
      {
        path:'update-menu/:id',
        element:<UpdateMenu/>,
        loader: ({params}) => fetch(`https://foodle-backend.onrender.com/menu/${params.id}`)
      },
      {
        path:'update-order/:id',
        element:<UpdateOrder/>,
        loader: ({params}) => fetch(`https://foodle-backend.onrender.com/payments/${params.id}`)
      }

    ]
  }
]);

export default router;

