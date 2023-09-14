import { RouteProps } from "react-router";
import CreateMessagePage from "src/pages/CreateMessage";
import { MainPage } from "src/pages/MainPage";
import { MessagePage } from "src/pages/MessagePage";
import { NotFoundPage } from "src/pages/NotFoundPage";
import { ProcessedMessagesPage } from "src/pages/OperatedMessages";
import { SignInPage } from "src/pages/SignInPage/ui/SignInPage";

export enum AppRoutes {
  MAIN = "MAIN",
  MESSAGES = "MESSAGES",
  NOT_FOUND = "NOT_FOUND",
  PROCESSED_MESSAGES = "PROCESSED_MESSAGES",
  CREAETE_MESSAGE = "CREATE_MESSAGE",
}
export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.MESSAGES]: "/messages",
  [AppRoutes.PROCESSED_MESSAGES]: "/processed",
  [AppRoutes.CREAETE_MESSAGE]: "/createMessage",
  [AppRoutes.NOT_FOUND]: "*",
};

export const routeConfigPrivate: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePath.MAIN,
    element: <MainPage />,
  },
  [AppRoutes.MESSAGES]: {
    path: RoutePath.MESSAGES,
    element: <MessagePage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.NOT_FOUND,
    element: <NotFoundPage />,
  },
  [AppRoutes.PROCESSED_MESSAGES]: {
    path: RoutePath.PROCESSED_MESSAGES,
    element: <ProcessedMessagesPage />,
  },
  [AppRoutes.CREAETE_MESSAGE]: {
    path: RoutePath.CREATE_MESSAGE,
    element: <CreateMessagePage />,
  },
};

export const routeConfigPublic = {
  [AppRoutes.MAIN]: {
    path: RoutePath.MAIN,
    element: <SignInPage />,
  },
};
