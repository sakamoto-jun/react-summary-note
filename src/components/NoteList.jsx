import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const NoteList = () => {
  const notes = useSelector((state) => state.notes);

  return (
    <div className="max-w-[1030px] p-4 mx-auto rounded-lg bg-zinc-900">
      <div className="flex justify-end space-x-4 mb-4">
        <button className="bg-zinc-800 py-2 px-4 rounded-full">최근</button>
        <button className="bg-zinc-800 py-2 px-4 rounded-full">이름 순</button>
      </div>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <Link
              to={`/notes/${note.id}`}
              className="flex items-center justify-between bg-zinc-800 hover:bg-zinc-700 p-4 rounded-lg mb-2"
            >
              <div>
                <h3 className="text-lg font-semibold">{note.title}</h3>
                <p className="text-sm text-zinc-400">
                  {note.content.slice(0, 100)}
                </p>
              </div>
              <div>
                <time className="text-sm text-zinc-400">{note.time}</time>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteList;
