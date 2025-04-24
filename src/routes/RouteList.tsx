import { IRoute } from "./Route";
import { SignIn } from "../pages/SignIn";
import { Home } from "../pages/Home";
import { SignUp } from "../pages/SignUp";

const RouteList: IRoute[] = [
  {
    isPrivate: false,
    requiredPermissions: [],
    path: "/login",
    element: <SignIn />,
  },
  {
    isPrivate: true,
    requiredPermissions: [],
    path: "/home",
    element: <Home />,
  },
  {
    isPrivate: false,
    requiredPermissions: [],
    path: "/signup",
    element: <SignUp />,
  },
]

export default RouteList;