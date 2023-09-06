import { RouteProps } from "react-router";
import { MainPage } from "src/pages/MainPage";
import { MessagePage } from "src/pages/MessagePage";
import { SignInPage } from "src/pages/SignInPage/ui/SignInPage";

export enum AppRoutes {
  MAIN = "MAIN",
  MESSAGES = "MESSAGES",
 
}
export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.MESSAGES]: "/messages",
};

export const routeConfigPrivate: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePath.MAIN,
    element: <MainPage />,
  },[AppRoutes.MESSAGES]: {
    path: RoutePath.MESSAGES,
    element: <MessagePage />,
  },
};

export const routeConfigPublic = {
  [AppRoutes.MAIN]: {
    path: RoutePath.MAIN,
    element: <SignInPage />,
  },
 
};