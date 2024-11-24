import { create } from "zustand";

type PurchaseTableStandState = {
  priceId?: string;
  product_id?: string;
  quantity?: number;
  unit_amount?: number;
  isOpen: boolean;
  onOpen: (
    priceId: string,
    product_id: string,
    quantity: number,
    unit_amount: number
  ) => void;
  onClose: () => void;
};

export const usePurchaseTableStand = create<PurchaseTableStandState>((set) => ({
  product_id: undefined,
  priceId: undefined,
  quantity: undefined,
  unit_amount: undefined,
  description: "",
  isOpen: false,
  onOpen: (
    priceId: string,
    product_id: string,
    quantity: number,
    unit_amount: number
  ) =>
    set({
      priceId,
      product_id,
      quantity,
      unit_amount,
      isOpen: true,
    }),
  onClose: () =>
    set({
      isOpen: false,
      product_id: undefined,
      priceId: undefined,
      quantity: undefined,
      unit_amount: undefined,
    }),
}));
