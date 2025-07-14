import { useReducer } from "react";
import { BookingFormContext, bookingFormReducer, initialState } from "./bookingFormReducer";

export function BookingFormProvider({ children }) {
  const [state, dispatch] = useReducer(bookingFormReducer, initialState);

  return (
    <BookingFormContext.Provider value={{ state, dispatch }}>
      {children}
    </BookingFormContext.Provider>
  );
}
