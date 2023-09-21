import { create } from "zustand";

const watchListStore = create((set, getState) => ({
  movies: {},
  moviesUpdate: (id, movie) => {
    const currentMovies = getState().movies;

    if (currentMovies.hasOwnProperty(id)) {
      delete currentMovies[id];
      set({ movies: currentMovies });
    } else {
      const updatedMovies = { ...currentMovies, [id]: movie };
      set({ movies: updatedMovies });
    }
  },
}));

export default watchListStore;
