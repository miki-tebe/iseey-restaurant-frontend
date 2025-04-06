import { countries, Country } from "@/lib/countries-data";
import { create } from "zustand";

type Store = {
  countryCode: Country;
  updateCountryCode: (country: Country) => void;
};

export const useStore = create<Store>()((set) => ({
  countryCode: countries[0],
  updateCountryCode: (country: Country) => set(() => ({countryCode: country})),
}));
