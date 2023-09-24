import { create } from "zustand";

const modalStore = create((set, getState) => ({
  modalName: "",
  openModal: false,
  modalNameUpdate: (name) => set({ modalName: name }),
  openModalUpdate: () =>
    set({
      modal: !getState().openModal(),
    }),
}));

export default modalStore;
