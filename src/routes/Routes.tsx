import { Home } from "../pages/Home";
import { SignIn } from "../pages/SignIn"
import { useRoutes } from "react-router-dom"
import { SignUp } from "../pages/SignUp";

const Routes = () => {
  return useRoutes([
    {
      path: '/',
      element: <SignIn />
    },
    {
      path: '/home',
      element: <Home />
    },
    {
      path: '/signup',
      element: <SignUp />
    }
  ])
}

export default Routes;