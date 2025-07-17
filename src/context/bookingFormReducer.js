import { createContext } from "react";

export const BookingFormContext = createContext();

const farmerStored = localStorage.getItem("farmerProfile");
const farmerObject = farmerStored ? JSON.parse(farmerStored) : null;

export const initialState = {
  facilityId: localStorage.getItem("facilityId") || "",
  farmerId: farmerObject?.id || "2",
  amount: localStorage.getItem("pricePerDay") || "",
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
