// React Router
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Events from "./pages/EventsPage";
import RootLayout from "./layouts/RootLayout";
import HomePage from "./pages/HomePage";
import EventFormPage from "./pages/EventFormPage";

import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "./api/events.js";

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
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
