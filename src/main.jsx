import { StrictMode } from 'react'
import { createBrowserRouter, RouterProvider  } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import Workflow from './components/Workflow.jsx'
import {store } from "./Redux/store.js"
import { Provider } from 'react-redux'
import App from './App.jsx'
import './index.css'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/board",
    element: <Workflow/>
  },
  {
    path: "*",
    element: <h1 style={{ textAlign: "center", marginTop: "50px" }}> 404 - Page Not Found </h1>
  },
])

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  // </StrictMode>
)