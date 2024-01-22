import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import Order from "./pages/Order";
import Payment from "./pages/Payment";
import TicketResult from "./pages/TicketResult";
import Profile from "./pages/Profile";
import OrderHistory from "./pages/OrderHistory";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Private from "./components/Private";
import AddMovie from "./pages/AddMovie";
import Dashboard from "./pages/Dashboard";
import EditMovie from "./pages/EditMovie";
import ListMovie from "./pages/ListMovie";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Private>
        <Home />
      </Private>
    ),
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/register",
    element: (
        <Register />
    ),
  },
  {
    path: "/movie/:id",
    element: (
      <Private>
        <MovieDetail />
      </Private>
    ),
  },
  {
    path: "/order",
    element: (
      <Private>
        <Order />
      </Private>
    ),
  },
  {
    path: "/order/payment",
    element: (
      <Private>
        <Payment />
      </Private>
    ),
  },
  {
    path: "/order/ticketresult",
    element: (
      <Private>
        <TicketResult />
      </Private>
    ),
  },
  {
    path: "/profile",
    element: (
      <Private>
        <Profile />
      </Private>
    ),
  },
  {
    path: "/order/orderhistory",
    element: (
      <Private>
        <OrderHistory />
      </Private>
    ),
  },
  {
    path: "/admin/addmovie",
    element: (
      <Private>
        <AddMovie />
      </Private>
    ),
  },
  {
    path: "/admin/dashboard",
    element: (
      <Private>
        <Dashboard />
      </Private>
    ),
  },
  {
    path: "/admin/editmovie/:id",
    element: (
      <Private>
        <EditMovie />
      </Private>
    ),
  },
  {
    path: "/admin/movie",
    element: (
      <Private>
        <ListMovie />
      </Private>
    ),
  }
]);

export default router;
