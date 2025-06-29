import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useAddNote } from "../hooks/useAddNote";

const Sidebar = () => {
  const notes = useSelector((state) => state.notes);

  const handleClick = useAddNote();

  return (
    <div className="flex-shrink-0 w-[230px] p-4">
      <h1 className="text-2xl font-bold mb-4">Summary Note</h1>
      <button
        className="bg-zinc-600 hover:bg-zinc-500 w-full py-2 px-4 rounded"
        onClick={handleClick}
      >
        노트 추가
      </button>
      <div className="mt-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-sky-500 font-semibold"
              : "text-zinc-400 hover:text-white"
          }
        >
          Home
        </NavLink>
        <ul className="mt-4">
          {notes.map((note) => (
            <li key={note.id} className="my-1">
              <NavLink
                to={`/notes/${note.id}`}
                className={({ isActive }) =>
                  isActive
                    ? "text-sky-500 font-semibold underline"
                    : "text-zinc-400 hover:text-white"
                }
              >
                {note.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
