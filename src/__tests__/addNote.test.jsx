import { configureStore } from "@reduxjs/toolkit";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { Provider } from "react-redux";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { vi } from "vitest";
import { routerConfig } from "../routes";
import noteReducer from "../store/noteSlice";

vi.mock("axios"); // 'axios' 모듈 mocking 선언

// Helper 함수
const getNoteById = (store, id) =>
  store.getState().notes.find((note) => note.id === id);

/* eslint-disable no-undef */
describe("노트 추가 및 편집 기능", () => {
  it("새로운 노트 추가, noteDetail 라우터 이동, 사이드바 링크 추가", async () => {
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

    await userEvent.click(screen.getByRole("button", { name: "노트 추가" }));

    const noteId = store.getState().notes[0].id;
    await waitFor(() => {
      expect(router.state.location.pathname).toBe(`/notes/${noteId}`);
    });

    const noteTitle = store.getState().notes[0].title;
    const link = screen.getByRole("link", { name: noteTitle });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", `/notes/${noteId}`);

    const titleEl = screen.getByLabelText("제목");
    const contentEl = screen.getByPlaceholderText("내용 입력");
    await userEvent.clear(titleEl);
    await userEvent.type(titleEl, "Test Title");
    await userEvent.clear(contentEl);
    await userEvent.type(contentEl, "Test Content");
    expect(getNoteById(store, noteId).title).toBe("Test Title");
    expect(getNoteById(store, noteId).content).toBe("Test Content");

    const mockResponse = {
      data: {
        choices: [
          {
            message: {
              content: "요약된 내용...",
            },
          },
        ],
      },
    };
    axios.post.mockResolvedValueOnce(mockResponse); // axios.post() 호출 시, 한번 만 mockResponse 데이터 async로 반환

    await userEvent.click(screen.getByRole("button", { name: "요약" }));
    expect(getNoteById(store, noteId).summary).toBe("요약된 내용...");
  });
});
