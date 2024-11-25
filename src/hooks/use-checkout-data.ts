import { create } from "zustand";

export interface DataEntry {
  hour: string;
  guests: number;
}

interface DataStore {
  data: DataEntry[];
  setData: (newData: DataEntry[]) => void; // Set the entire dataset
  getData: () => DataEntry[];
  resetData: () => void; // Reset to initial default state
}

const initialData: DataEntry[] = [
  { hour: "0", guests: 0 },
  { hour: "1", guests: 0 },
  { hour: "2", guests: 0 },
  { hour: "3", guests: 0 },
  { hour: "4", guests: 0 },
  { hour: "5", guests: 0 },
  { hour: "6", guests: 0 },
  { hour: "7", guests: 0 },
  { hour: "8", guests: 0 },
  { hour: "9", guests: 0 },
  { hour: "10", guests: 0 },
  { hour: "11", guests: 1 },
  { hour: "12", guests: 100 },
  { hour: "13", guests: 0 },
  { hour: "14", guests: 0 },
  { hour: "15", guests: 0 },
  { hour: "16", guests: 0 },
  { hour: "17", guests: 0 },
  { hour: "18", guests: 0 },
  { hour: "19", guests: 0 },
  { hour: "20", guests: 0 },
  { hour: "21", guests: 0 },
  { hour: "22", guests: 0 },
  { hour: "23", guests: 0 },
];

const useDataStore = create<DataStore>((set, get) => ({
  data: initialData, // Default initial state
  setData: (newData: DataEntry[]) => set({ data: newData }), // Overwrite the entire data array
  getData: () => get().data, // Getter to retrieve the data
  resetData: () => set({ data: initialData }), // Reset data to default
}));

export default useDataStore;
