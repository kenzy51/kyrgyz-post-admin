import { RouteProps } from "react-router";
import { MainPage } from "src/pages/MainPage";
import { SignInPage } from "src/pages/SignInPage/ui/SignInPage";

export enum AppRoutes {
  MAIN = "MAIN",
 
}
export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/",
};

export const routeConfigPrivate: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePath.MAIN,
    element: <MainPage />,
  },
};

export const routeConfigPublic = {
  [AppRoutes.MAIN]: {
    path: RoutePath.MAIN,
    element: <SignInPage />,
  },
 
};