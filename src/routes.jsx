import NoteDetail from "./components/NoteDetail";
import NoteList from "./components/NoteList";
import Home from "./pages/Home";

export const routerConfig = [
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
];
