import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { addNote } from "../store/noteSlice";

export const useAddNote = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addNewNote = () => {
    const id = uuidv4();
    const newNote = {
      time: Date.now(),
      id,
      title: "New Note",
      content: "",
      summary: "",
    };

    dispatch(addNote(newNote));
    navigate(`/notes/${id}`);
  };

  return addNewNote;
};
