import "../../styles/BookingSummaryModal.css";
import Button from "../../components/infrastructure/ui/Button";
import { assets } from "../../assets/assets";
import { useBookingForm } from "../../hooks/useBookingForm";
import useFetch from "../../hooks/useFetch";

const BookingSummaryModal = () => {
  const { state, dispatch } = useBookingForm();
  const { loading, error, data, post } = useFetch(
    "https://agricon-express-backend.onrender.com/api/v1/bookings/",
    ""
  );

  const handlePayment = async () => {
    const payload = {
      facilityId: Number(state.facilityId),
      farmerId: Number(state.farmerId),
      startDate: state.startDate?.toISOString(),
      endDate: state.endDate?.toISOString(),
      amount: Number(state.amount),
    };

    await post(payload);
    dispatch({ type: "RESET" });
  };

  const user = { name: "John" };

  const bookings = [
    {
      img: "",
      imgAlt: "Booking",
      title: "Facility Booking",
      quantity: 1,
      unit: "session",
      amount: state.amount || "0",
    },
  ];

  return (
    <div className="bookingSummary">
      <div className="bookingSummaryHeader">
        <img src={assets.agriconLogo} alt="Agricon Logo" />
        <h3 className="bookingSummaryHeading">Booking Summary</h3>
      </div>

      <div className="bookingSummaryBody">
        <h4 className="bookingSummaryBodyHeading">Hello {user.name}</h4>
        <p>Below is your booking summary, confirm and continue to payment.</p>

        <div className="bookingSummaryTable">
          <div className="tableContent">
            <p>Order date</p>
            <span className="bold">
              {state.startDate?.toLocaleDateString() || "N/A"}
            </span>
            <p className="accent">14:00 (WAT)</p>
          </div>
          <div className="tableContent">
            <p>Shipping address</p>
            <span className="bold">15b Dolor Ave.</span>
            <p className="accent">Lagos, NGA.</p>
          </div>
          <div className="tableContent">
            <p>Payment method</p>
            <span className="bold">N/A</span>
          </div>
          <div className="tableContent">
            <p>Order number</p>
            <span className="bold">N/A</span>
          </div>
        </div>

        <div className="bookingSummaryBookings">
          {bookings.map((booking, index) => (
            <div className="bookingWrapper" key={index}>
              <img src={booking.img} alt={booking.imgAlt} />
              <div>
                <h4>{booking.title}</h4>
                <p>
                  Quantity: <span className="bold">{booking.quantity}</span>{" "}
                  {booking.unit}
                </p>
                <span className="bold">₦{booking.amount}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bookingSummaryTotal">
          <img src={assets.pending} alt="Pending Logo" />
          <div>
            <div>
              <p>Sub-total</p>
              <span className="bold">₦{state.amount || "0"}</span>
            </div>
            <div>
              <p>Shipping fee</p>
              <span className="bold">₦0</span>
            </div>
            <div>
              <p>Discount</p>
              <span className="bold">₦0</span>
            </div>
            <div className="total">
              <p>Total</p>
              <span className="bold">₦{state.amount || "0"}</span>
            </div>
          </div>
        </div>

        {error && <p className="text-red-600">❌ {error}</p>}
        {data && <p className="text-green-600">✅ Payment Successful</p>}
        {loading && <p className="text-blue-600">Processing payment...</p>}
      </div>

      <div className="buttonContainer">
        <Button onClick={handlePayment} disabled={loading}>
          {loading ? "Processing..." : "Continue to Payment"}
        </Button>
        <Button type="button">Cancel</Button>
      </div>
    </div>
  );
};

export default BookingSummaryModal;
