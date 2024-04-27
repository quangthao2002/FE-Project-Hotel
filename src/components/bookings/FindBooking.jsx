import React, { useState } from "react";
import {
  cancelBooking,
  getBookingByConfirmationCode,
} from "../utils/ApiFunction";
import moment from "moment";

export const FindBooking = () => {
  const [confirmationCode, setConfirmationCode] = useState("");
  const [error, setError] = useState("");
  const[successMessage, setSuccessMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [bookingInfo, setBookingInfo] = useState({
    id: "",
    room: {
      id: "",
      roomType: "",
    },
    bookingConfirmationCode: "",
    checkInDate: "",
    checkOutDate: "",
    guestName: "",
    guestEmail: "",
    numOfAdults: "",
    numOfChildren: "",
    totalNumOfGuests: "",
  });
  const clearBookingInfo = {
    id: "",
    room: {
      id: "",
      roomType: "",
    },
    bookingConfirmationCode: "",
    checkInDate: "",
    checkOutDate: "",
    guestName: "",
    guestEmail: "",
    numOfAdults: "",
    numOfChildren: "",
    totalNumOfGuests: "",
  };

  const handleInputChange = (e) => {
    setConfirmationCode(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await getBookingByConfirmationCode(confirmationCode);
      setBookingInfo(data);
      setIsLoading(false);
    } catch (error) {
      setBookingInfo(clearBookingInfo);
      if (error.message & (error.message.status === 404)) {
        setError(error.response);
      } else {
        setError(error.message);
      }
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleBookingCancelation = async (bookingId) => {
    try {
      await cancelBooking(bookingInfo.id);
      setIsDeleted(true);
      setSuccessMessage("Your booking has been canceled")
      setBookingInfo(clearBookingInfo);
      setConfirmationCode("");
      setError("");
    } catch (error) {
      setError(error.message);
    }
    setTimeout(() => {
      setIsDeleted(false);
      setSuccessMessage("")
    }, 2000);
  };

  return (
    <>
      <div className="container mt-5 d-flex flex-column  justify-content-center align-items-center">
        <h2>Find My Booking</h2>
        <form onSubmit={handleFormSubmit} className="col-md-6 mt-2">
          <div className="input-group mb-3">
            <input
              className="form-control"
              id="confirmationCode"
              name="confirmationCode"
              value={confirmationCode}
              onChange={handleInputChange}
              placeholder="Enter your confirmation code"
            />
            <button className="btn btn-dark ml-2 input-group-text">
              Find booking
            </button>
          </div>
        </form>

        {isLoading ? (
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Finding booking...</span>
          </div>
        ) : (
          <div>
            {error && <div className="alert alert-danger">{error}</div>} 
            {bookingInfo.id && (
              <div className="mb-5">
                <h3>Booking Information</h3>
                <p>
                  <strong>Room number:</strong> {bookingInfo.room.id}
                </p>
                <p>
                  <strong>Booking ConfirmCode</strong>{" "}
                  {bookingInfo.bookingConfirmationCode}
                </p>
                <p>
                <strong>Room type:</strong> {bookingInfo.room.roomType}
                </p>
                <p>
                  <strong>Check-in Date:</strong> 
                  {moment(bookingInfo.checkInDate).format("MMM Do, YYYY")} 
                </p>
                <p>
                  <strong>Check-out Date:</strong> 
                  {moment(bookingInfo.checkOutDate).format("MMM Do, YYYY")}
                </p>
                <p>
                  <strong>Full Name:</strong> {bookingInfo.guestName}
                </p>
                <p>
                  <strong>Email Address:</strong> {bookingInfo.guestEmail}
                </p>
                <p>
                  <strong>Adults:</strong> {bookingInfo.numOfAdults}
                </p>
                <p>
                  <strong>Children:</strong> {bookingInfo.numOfChildren}
                </p>
                <p>
                  <strong>Total Number of Guests:</strong>{" "}
                  {bookingInfo.totalNumOfGuests}
                </p>
                {!isDeleted && ( // nếu isDeleted là true => huy roi, thì !isDeleted sẽ là false. Ngược lại, nếu isDeleted là false => chua huy thì !isDeleted sẽ là true.
                  <button
                    className="btn btn-dark"
                    onClick={()=>handleBookingCancelation(bookingInfo.id)}
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            )}
            {isDeleted && (
              <div className="alert alert-success mt-3" role="alert">
                {successMessage}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};
