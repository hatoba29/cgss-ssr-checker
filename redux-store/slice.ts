import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Option } from "types/option"

type PayloadState = [string, string | boolean]

const initialState: Option = {
  cardName: "",
  idolName: "",
  limited: { none: true, monthly: true, blanc: true, noir: true },
  type: { cute: true, cool: true, passion: true },
  showName: true,
  awaken: true,
}

const optionSlice = createSlice({
  name: "option",
  initialState,
  reducers: {
    setTextBool: (
      state,
      { payload: [key, value] }: PayloadAction<PayloadState>
    ) => {
      state[key] = value
    },
    setLimited: (
      state,
      { payload: [key, value] }: PayloadAction<PayloadState>
    ) => {
      state.limited[key] = value
    },
    setType: (
      state,
      { payload: [key, value] }: PayloadAction<PayloadState>
    ) => {
      state.type[key] = value
    },
  },
})

export const { reducer } = optionSlice
export const { setLimited, setTextBool, setType } = optionSlice.actions
