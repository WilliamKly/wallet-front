import {
  RouteProps,
} from "react-router-dom";

export type IRoute = RouteProps & {
  isPrivate: boolean;
  requiredPermissions: string[];
  menuName?: string;
  menuIcon?: any;
};
