import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NoteDetail from "./components/NoteDetail";
import NoteList from "./components/NoteList";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        index: true,
        element: <NoteList />,
      },
      {
        path: "notes/:id",
        element: <NoteDetail />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
