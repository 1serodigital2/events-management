// React Router
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Events from "./pages/EventsPage";
import RootLayout from "./layouts/RootLayout";
import HomePage from "./pages/HomePage";
import AddEventPage from "./pages/AddEventPage";
import EventDetailPage from "./pages/EventDetailPage";

import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "./api/events.js";
import EditEvent from "./pages/EditEventPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "events", element: <Events /> },
      { path: "events/:id", element: <EventDetailPage /> },
      { path: "events/new", element: <AddEventPage /> },
      { path: "events/:id/edit", element: <EditEvent /> },
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
