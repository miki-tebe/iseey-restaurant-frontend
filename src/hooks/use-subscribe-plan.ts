import { create } from "zustand";

type SubscribePlanState = {
  plan?: string;
  priceId?: string;
  isOpen: boolean;
  onOpen: (plan: string, priceId: string) => void;
  onClose: () => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

export const useSubscribePlan = create<SubscribePlanState>((set) => ({
  plan: undefined,
  priceId: undefined,
  isOpen: false,
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
  onOpen: (plan: string, priceId: string) =>
    set({ isOpen: true, plan, priceId }),
  onClose: () => set({ isOpen: false, plan: undefined, priceId: undefined }),
}));
