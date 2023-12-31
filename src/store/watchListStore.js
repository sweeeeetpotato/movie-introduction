import { create } from "zustand";
import { persist } from "zustand/middleware";

const watchListStore = create(
  persist(
    (set, getState) => ({
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
      moviesAllRemove: () => set({ movies: {} }),
    }),
    {
      name: "myWatchList",
    }
  )
);

export default watchListStore;
