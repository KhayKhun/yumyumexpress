import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import FoodsPage from "./pages/foods.tsx";
import ResturantsPage from "./pages/resturants.tsx";
import SingleResturant from "./components/resturants/SingleResturant.tsx";
import ProfilePage from "./pages/profile.tsx";

const MarginGap = () => <div className="mb-[60px]" />;
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "foods",
    element: <FoodsPage/>,
  },
  {
    path: "profile",
    element: <ProfilePage/>,
  },
  {
    path : "resturants",
    element : <ResturantsPage/>
  },
  {
    path : "resturants/:resturantSlug",
    element : <SingleResturant/>
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MarginGap/>
    <RouterProvider router={router} />
  </React.StrictMode>
);

