import { configureStore } from "@reduxjs/toolkit";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { routerConfig } from "../routes";
import noteReducer, { addNote } from "../store/noteSlice";

/* eslint-disable no-undef */
describe("노트 정렬", () => {
  it("버튼 클릭 후 정렬", async () => {
    const store = configureStore({
      reducer: {
        notes: noteReducer,
      },
    });
    const router = createMemoryRouter(routerConfig, {
      initialEntries: ["/"],
    });

    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );

    const notes = [
      {
        id: 1,
        title: "2 Title",
        content: "Content 1",
        time: new Date(2025, 6, 28).getTime(),
      },
      {
        id: 2,
        title: "1 Title",
        content: "Content 2",
        time: new Date(2025, 6, 25).getTime(),
      },
      {
        id: 3,
        title: "3 Title",
        content: "Content 3",
        time: new Date(2025, 7, 1).getTime(),
      },
    ];
    await act(async () => {
      notes.forEach((note) => store.dispatch(addNote(note)));
    }); // Redux 상태를 변경하는 코드라서 act()로 감싸줘서 리렌더가 생길 것이라고 명시해줘야됨

    await userEvent.click(screen.getByRole("button", { name: "최근" }));
    await waitFor(() => {
      const titles = screen
        .getAllByTestId("note-title")
        .map((el) => el.textContent);
      expect(titles).toEqual(["3 Title", "2 Title", "1 Title"]);
    });

    await userEvent.click(screen.getByRole("button", { name: "이름 순" }));
    await waitFor(() => {
      const titles = screen
        .getAllByTestId("note-title")
        .map((el) => el.textContent);
      expect(titles).toEqual(["1 Title", "2 Title", "3 Title"]);
    });
  });
});
