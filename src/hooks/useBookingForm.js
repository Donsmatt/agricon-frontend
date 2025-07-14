import { useContext } from "react";
import { BookingFormContext } from "../context/bookingFormReducer";

export function useBookingForm() {
  const context = useContext(BookingFormContext);
  if (!context) {
    throw new Error("useBookingForm must be used within BookingFormProvider");
  }
  return context;
}
