// React Router
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Events from "./pages/EventsPage";
import RootLayout from "./layouts/RootLayout";
import HomePage from "./pages/HomePage";
import EventFormPage from "./pages/EventFormPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "events", element: <Events /> },
      { path: "events/new", element: <EventFormPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
