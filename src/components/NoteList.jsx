import { format } from "date-fns";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Empty from "./Empty";

const NoteList = () => {
  const [sortOrder, setSortOrder] = useState("latest");
  const notes = useSelector((state) => state.notes);

  const sortedNotes = [...notes].sort((a, b) => {
    if (sortOrder === "latest") {
      return b.time - a.time;
    } else if (sortOrder === "name") {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  return (
    <div className="max-w-[1030px] p-4 mx-auto rounded-lg bg-zinc-900">
      <div className="flex justify-end space-x-4 mb-4">
        <button
          className={[
            "bg-zinc-800 py-2 px-4 rounded-full hover:text-white",
            sortOrder === "latest" ? "text-white" : "text-zinc-500",
          ].join(" ")}
          onClick={() => setSortOrder("latest")}
        >
          최근
        </button>
        <button
          className={[
            "bg-zinc-800 py-2 px-4 rounded-full hover:text-white",
            sortOrder === "name" ? "text-white" : "text-zinc-500",
          ].join(" ")}
          onClick={() => setSortOrder("name")}
        >
          이름 순
        </button>
      </div>
      {sortedNotes.length ? (
        <ul>
          {sortedNotes.map((note) => (
            <li key={note.id}>
              <Link
                to={`/notes/${note.id}`}
                className="flex items-center justify-between gap-[14px] bg-zinc-800 hover:bg-zinc-700 p-4 rounded-lg mb-2"
              >
                <div>
                  <h3
                    data-testid="note-title"
                    className="text-lg font-semibold"
                  >
                    {note.title}
                  </h3>
                  <p className="text-sm text-zinc-400">
                    {note.content.length > 100
                      ? note.content.slice(0, 100) + "..."
                      : note.content}
                  </p>
                </div>
                <div>
                  <time className="text-sm text-zinc-400">
                    {format(new Date(note.time), "yyyy-MM-dd HH:mm")}
                  </time>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default NoteList;
