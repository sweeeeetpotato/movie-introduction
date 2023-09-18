import { create } from "zustand";

const movieListStore = create((set, getState) => ({
  movieSort: "정렬 기준",
  movieSortList: {
    "연도순(default)": ["year", "desc"],
    인기순: ["like_count", "desc"],
    평점순: ["rating", "desc"],
    "제목순(오름차순)": ["title", "asc"],
    "제목순(내림차순)": ["title", "desc"],
  },
  movieCount: "페이지당 항목수",
  movieCountList: {
    "20개(default)": 20,
    "30개": 30,
    "40개": 40,
    "50개": 50,
  },
  movieApiProps: ["year", "desc", "20"],
  API_URL: () =>
    `https://yts.mx/api/v2/list_movies.json?minimum_rating=7&sort_by=${
      getState().movieApiProps[0]
    }&order_by=${getState().movieApiProps[1]}&limit=${
      getState().movieApiProps[2]
    }&page=`,
  movieSortUpdate: (name) => set({ movieSort: name }),
  movieCountUpdate: (name) => set({ movieCount: name }),
  movieApiPropsUpdate: (sort, count) =>
    set({ movieApiProps: [...sort, count] }),
}));

export default movieListStore;
