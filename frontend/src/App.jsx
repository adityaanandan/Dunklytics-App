import { useState } from 'react'
import MainLayout from './layouts/MainLayout';

import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import StatsPage from './pages/StatsPage';

import React from 'react'
import { Route, createBrowserRouter, createRoutesFromElements, Router, RouterProvider} from 'react-router-dom'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path = "/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path = "stats" element={<StatsPage />} />
      <Route path = "*" element = {<NotFoundPage /> } />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router = {router} />;

}

export default App
