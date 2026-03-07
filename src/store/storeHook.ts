import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import type { RootState, AppDispatch } from "./index";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const Selector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppSelector = <K extends keyof RootState>(
  name: K,
): RootState[K] => {
  return Selector((state) => state[name]);
};
