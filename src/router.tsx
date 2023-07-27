import { createBrowserRouter } from "react-router-dom";

import Root from "./components/Root";

import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import SitterDetail from "./routes/SitterDetail";
import UploadSitter from "./routes/UploadSitter";
import UploadPhotos from "./routes/UploadPhotos";
import Sitter from "./components/Sitter";
import { getSitter } from "./api";
import SitterEdit from "./routes/SitterEdit";

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
        path: "sitters/upload",
        element: <UploadSitter />,
      },
      {
        path: "sitters/:sitterPk",
        element: <SitterDetail />,
      },
      {
        path: "sitters/:sitterPk/edit",
        element: <SitterEdit />,
      },
      {
        path: "sitters/:sitterPk/photos",
        element: <UploadPhotos />,
      },
    ],
  },
]);

export default router;
