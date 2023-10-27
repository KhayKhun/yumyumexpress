import { create } from "zustand";

export const useSellerStore = create((set) => ({
    seller : null,
    setSeller: (payload : any) => set({ seller: payload })
}));
