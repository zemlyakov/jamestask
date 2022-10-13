import { createContext } from "react";
import { Car } from "./models";

export type Data = {
  cars: Car[];
};

const DataContext = createContext<Data | null>(null);
export default DataContext;
