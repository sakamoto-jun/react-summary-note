import { format } from "date-fns";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchData } from "../api";
import { deleteNote, updateNote } from "../store/noteSlice";

const NoteDetail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const note = useSelector((state) =>
    state.notes.find((note) => note.id === params.id)
  );
  const dispatch = useDispatch();

  const handleChangeTitle = (e) => {
    dispatch(
      updateNote({
        ...note,
        title: e.target.value,
      })
    );
  };
  const handleChangeContent = (e) => {
    dispatch(
      updateNote({
        ...note,
        content: e.target.value,
      })
    );
  };
  const handleDelete = () => {
    dispatch(deleteNote(params.id));
    navigate("/");
  };
  const handleSubmit = async () => {
    if (!note.content) {
      alert("내용을 입력해주세요.");
      return;
    }

    setIsLoading(true);
    try {
      const data = await fetchData(note.content);
      dispatch(
        updateNote({
          ...note,
          summary: data.choices[0].message.content,
        })
      );
    } catch (error) {
      const message =
        error?.response?.data?.error?.message ||
        error?.message ||
        error?.toString?.() ||
        "요약 요청 실패!";

      alert(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-zinc-900 rounded-lg">
      <div className="flex justify-between items-center">
        <div className="grow">
          <time className="block text-zinc-400 text-sm mb-2">
            {format(new Date(note.time), "yyyy-MM-dd HH:mm")}
          </time>
          <input
            type="text"
            className="px-1 bg-transparent text-2xl font-bold focus:outline-none focus:outline-gray-300"
            value={note.title}
            onChange={handleChangeTitle}
          />
        </div>
        <div>
          <button
            className="px-4 py-2 rounded bg-rose-600 hover:bg-rose-500 transition-colors"
            onClick={handleDelete}
          >
            삭제
          </button>
        </div>
      </div>
      <section className="flex mt-4">
        <div className="flex-1 p-4 mr-4 bg-zinc-800 rounded-xl">
          <h2 className="mb-2 text-lg font-semibold">메모</h2>
          <textarea
            className="block w-full h-64 p-2 mb-2 rounded bg-zinc-700 resize-none focus:outline-none focus:ring-2 focus:ring-gray-300"
            value={note.content}
            onChange={handleChangeContent}
          ></textarea>
          <button
            className="px-4 py-2 rounded bg-sky-600 hover:bg-sky-500 transition-colors"
            onClick={handleSubmit}
          >
            요약
          </button>
        </div>
        <div className="flex-1 p-4 bg-zinc-800 rounded-xl">
          <h3 className="mb-2 text-lg font-semibold">요약 결과</h3>
          <div className="h-64 p-2 rounded bg-zinc-700 text-zinc-300 overflow-y-auto">
            {isLoading ? "요약 내용 기다리는중..." : note.summary}
          </div>
        </div>
      </section>
    </div>
  );
};

export default NoteDetail;
