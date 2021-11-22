import { Option } from "types/option"

// Actions
const TEXT = "search/TEXT"
const LIMITED = "search/LIMITED"
const TYPE = "search/TYPE"
const BOOL = "search/BOOL"

// Reducer
const initialState: Option = {
  cardName: "",
  idolName: "",
  limited: { none: true, monthly: true, blanc: true, noir: true },
  type: { cute: true, cool: true, passion: true },
  showName: true,
  awaken: true,
}
type actionType = { type: string; key: string; value: string | boolean }

export default function reducer(state = initialState, action: actionType) {
  switch (action.type) {
    case TEXT:
      return {
        ...state,
        [action.key]: action.value,
      }
    case LIMITED:
      return {
        ...state,
        limited: {
          ...state.limited,
          [action.key]: action.value,
        },
      }
    case TYPE:
      return {
        ...state,
        type: {
          ...state.type,
          [action.key]: action.value,
        },
      }
    case BOOL:
      return {
        ...state,
        [action.key]: action.value,
      }
    default:
      return state
  }
}

// Action Creators
export function updateText(e: HTMLInputElement) {
  return { type: TEXT, key: e.id, value: e.value }
}

export function updateLimited(e: HTMLInputElement) {
  return { type: LIMITED, key: e.id, value: e.checked }
}

export function updateType(e: HTMLInputElement) {
  return { type: TYPE, key: e.id, value: e.checked }
}

export function updateBool(e: HTMLInputElement) {
  return { type: BOOL, key: e.id, value: e.checked }
}
