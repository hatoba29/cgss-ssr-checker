import { createStore } from "redux"
import { useSelector, TypedUseSelectorHook } from "react-redux"
import reducer from "./search"
import { Option } from "types/option"

export default function configureStore() {
  const store = createStore(reducer)

  return store
}

export const useAppSelector: TypedUseSelectorHook<Option> = useSelector
