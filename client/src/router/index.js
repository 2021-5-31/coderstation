import React from 'react'
import { useRoutes } from 'react-router-dom'
import Issue from '../pages/Issue'
import Books from '../pages/Books'
import Interviews from '../pages/Interviews'

function Router() {
  return useRoutes([
    { path: "/", element: <Issue /> },
    { path: "books", element: <Books /> },
    { path: "interviews", element: <Interviews /> }
  ]);
}

export default Router