import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { reducer } from "./slice"

export const store = configureStore({ reducer })

type OptionState = ReturnType<typeof store.getState>
export const useOptionSelector: TypedUseSelectorHook<OptionState> = useSelector
export const useOptionDispatch = () => useDispatch<typeof store.dispatch>()
