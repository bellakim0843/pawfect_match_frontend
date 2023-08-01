import { createBrowserRouter } from "react-router-dom";

import Root from "./components/Root";

import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import SitterDetail from "./routes/SitterDetail";
import UploadSitter from "./routes/UploadSitter";
import UploadOwner from "./routes/UploadOwner";
import UploadPhotos from "./routes/UploadPhotos";
import Sitter from "./components/Sitter";
import { getSitter } from "./api";
import SitterEdit from "./routes/SitterEdit";
import MyBooking from "./routes/MyBooking";
import SitterBookings from "./routes/SitterBookings";
import OwnerDetail from "./routes/OwnerDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "mybooking",
        element: <MyBooking />,
      },
      {
        path: "sitters/upload",
        element: <UploadSitter />,
      },
      {
        path: "sitters/:sitterPk",
        element: <SitterDetail />,
      },
      {
        path: "sitters/:sitterPk/bookings",
        element: <SitterBookings />,
      },
      {
        path: "sitters/:sitterPk/edit",
        element: <SitterEdit />,
      },
      {
        path: "sitters/:sitterPk/photos",
        element: <UploadPhotos />,
      },
      {
        path: "owners/:ownerPk",
        element: <OwnerDetail />,
      },
      {
        path: "owners/upload",
        element: <UploadOwner />,
      },
    ],
  },
]);

export default router;
