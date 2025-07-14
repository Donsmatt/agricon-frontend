import { createContext } from "react";

export const BookingFormContext = createContext();

export const initialState = {
  facilityId: "",
  farmerId: "",
  amount: "",
  startDate: null,
  endDate: null,
  errors: [],
};

export function bookingFormReducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "SET_ERRORS":
      return {
        ...state,
        errors: action.errors,
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}
