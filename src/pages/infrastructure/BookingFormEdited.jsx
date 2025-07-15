import "../../styles/BookingSummaryModal.css";
import { useState } from "react";
import Button from "../../components/infrastructure/ui/Button";
import CalendarPicker from "../../components/infrastructure/ui/CalendarPicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { useBookingForm } from "../../hooks/useBookingForm";
import BookingSummaryModal from "./BookingSummaryModal";

const labelCn =
  "placeholder:text-[#667185] placeholder:font-medium font-medium text-xl";
const inputCn =
  "border border-gray-400 rounded-lg text-gray-700 w-full max-w-[529px] p-4 py-3.5 focus:border-2 focus:border-[#02402D]";

export default function BookingFormEdited() {
  const { state, dispatch } = useBookingForm();
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = [];
    if (!state.facilityId) errors.push("Facility ID is required");
    if (!state.farmerId) errors.push("Farmer ID is required");
    if (!state.amount) errors.push("Amount is required");
    if (!state.startDate || !state.endDate)
      errors.push("Start and End dates are required");
    if (state.startDate && state.endDate && state.endDate <= state.startDate)
      errors.push("End date must be after start date");

    if (errors.length > 0) {
      dispatch({ type: "SET_ERRORS", errors });
      return;
    }

    dispatch({ type: "SET_ERRORS", errors: [] });
    setShowModal(true);
  };

  return (
    <>
      <div className="grid xl:grid-cols-2 gap-12">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-16">
          <h1 className="mb-12 font-semibold text-[2rem]">
            New Booking Edited
          </h1>

          <div className="flex flex-col gap-4">
            <label htmlFor="facilityId" className={labelCn}>
              Facility ID *
            </label>
            <input
              id="facilityId"
              type="number"
              placeholder="Enter facility ID"
              className={inputCn}
              value={state.facilityId}
              onChange={(e) =>
                dispatch({
                  type: "SET_FIELD",
                  field: "facilityId",
                  value: e.target.value,
                })
              }
              required
            />
          </div>

          <div className="flex flex-col gap-4">
            <label htmlFor="farmerId" className={labelCn}>
              Farmer ID *
            </label>
            <input
              id="farmerId"
              type="number"
              placeholder="Enter farmer ID"
              className={inputCn}
              value={state.farmerId}
              onChange={(e) =>
                dispatch({
                  type: "SET_FIELD",
                  field: "farmerId",
                  value: e.target.value,
                })
              }
              required
            />
          </div>

          <div className="flex flex-col gap-4">
            <label htmlFor="startDate" className={labelCn}>
              Start Date *
            </label>
            <DatePicker
              selected={state.startDate}
              onChange={(date) =>
                dispatch({ type: "SET_FIELD", field: "startDate", value: date })
              }
              dateFormat="yyyy-MM-dd"
              placeholderText="YYYY-MM-DD"
              className={inputCn}
            />
          </div>
          <input
            type="hidden"
            name="startDate"
            value={state.startDate ? format(state.startDate, "yyyy-MM-dd") : ""}
          />

          <div className="flex flex-col gap-4">
            <label htmlFor="endDate" className={labelCn}>
              End Date *
            </label>
            <DatePicker
              selected={state.endDate}
              onChange={(date) =>
                dispatch({ type: "SET_FIELD", field: "endDate", value: date })
              }
              dateFormat="yyyy-MM-dd"
              placeholderText="YYYY-MM-DD"
              className={inputCn}
            />
          </div>
          <input
            type="hidden"
            name="endDate"
            value={state.endDate ? format(state.endDate, "yyyy-MM-dd") : ""}
          />

          <div className="flex flex-col gap-4">
            <label htmlFor="amount" className={labelCn}>
              Amount *
            </label>
            <input
              id="amount"
              type="number"
              placeholder="Enter amount"
              className={inputCn}
              value={state.amount}
              onChange={(e) =>
                dispatch({
                  type: "SET_FIELD",
                  field: "amount",
                  value: e.target.value,
                })
              }
              required
            />
          </div>

          {state.errors.length > 0 && (
            <ul className="text-red-600 text-sm space-y-1">
              {state.errors.map((err, index) => (
                <li key={index}>• {err}</li>
              ))}
            </ul>
          )}

          <Button
            type="submit"
            className="flex justify-center items-center py-2.5 bg-[#02402D] hover:bg-[#03553F] transition-colors duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-[#047D58] text-white w-full max-w-[529px] rounded-sm"
          >
            Confirm Booking
          </Button>
        </form>

        <CalendarPicker />
      </div>
      {showModal && (
        <div className="bookingSummaryBackdrop">
          <BookingSummaryModal closeModal={() => setShowModal(false)} />
        </div>
      )}
    </>
  );
}
