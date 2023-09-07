import { RouteProps } from "react-router";
import { MainPage } from "src/pages/MainPage";
import { MessagePage } from "src/pages/MessagePage";
import { NotFoundPage } from "src/pages/NotFoundPage";
import { SignInPage } from "src/pages/SignInPage/ui/SignInPage";

export enum AppRoutes {
  MAIN = "MAIN",
  MESSAGES = "MESSAGES",
  NOT_FOUND="NOT_FOUND"
}
export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.MESSAGES]: "/messages",
  [AppRoutes.NOT_FOUND]: "*",
};

export const routeConfigPrivate: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePath.MAIN,
    element: <MainPage />,
  },[AppRoutes.MESSAGES]: {
    path: RoutePath.MESSAGES,
    element: <MessagePage />,
  },[AppRoutes.NOT_FOUND]: {
    path: RoutePath.NOT_FOUND,
    element: <NotFoundPage />,
  },
};

export const routeConfigPublic = {
  [AppRoutes.MAIN]: {
    path: RoutePath.MAIN,
    element: <SignInPage />,
  },
 
};