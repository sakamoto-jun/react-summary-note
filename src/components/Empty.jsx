import { useAddNote } from "../hooks/useAddNote";

const Empty = () => {
  const handleClick = useAddNote();

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-zinc-800 rounded-lg">
      <div className="text-6xl mb-4">
        <span>📝</span>
      </div>
      <p className="text-xl mb-4">노트를 추가 해보세요.</p>
      <button
        className="py-2 px-4 bg-zinc-600 hover:bg-zinc-500 rounded"
        onClick={handleClick}
      >
        노트 작성
      </button>
    </div>
  );
};

export default Empty;
