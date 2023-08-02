import Books from "../pages/books";
import Issues from "../pages/issues";
import AddIssue from "../pages/addIssue";
import Interviews from "../pages/interviews";
import IssueDetail from "../pages/issueDetail";
import SearchPage from "../pages/searchPage";

import { useRoutes, Navigate } from "react-router-dom";
import Personnal from "../pages/personnal";

export default function Router() {
  let element = useRoutes([
    {
      path: "/",
      element: <Navigate replace to="/issues" />,
    },
    {
      path: "/issues",
      element: <Issues />,
    },
    {
      path: "/searchPage",
      element: <SearchPage />,
    },
    {
      path: "/books",
      element: <Books />,
    },
    {
      path: "/addIssue",
      element: <AddIssue />,
    },
    {
      path: "/issueDetail/:id",
      element: <IssueDetail />,
    },
    {
      path: "/personal",
      element: <Personnal />,
    },
    { path: "/interviews", element: <Interviews /> },
  ]);

  return element;
}
