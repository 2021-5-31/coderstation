import React from 'react'
import { useRoutes } from 'react-router-dom'
import Issue from '../pages/Issue'
import Books from '../pages/Books'
import Interviews from '../pages/Interviews'
import AddIssue from '../pages/AddIssue'
import IssueDetail from '../pages/IssueDetail'

function Router() {
  return useRoutes([
    { path: "/", element: <Issue /> },
    { path: "books", element: <Books /> },
    { path: "interviews", element: <Interviews /> },
    { path: "add-issue", element: <AddIssue /> },
    { path: "issue/detail/:id", element: <IssueDetail /> }
  ]);
}

export default Router