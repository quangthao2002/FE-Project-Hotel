import React, { useEffect, useState } from "react";
import { cancelBooking, getAllBookings } from "../utils/ApiFunction";
import Header from "../common/Header";
import { BookingTable } from "./BookingsTable";
import Spinner from "react-spinner-material";

export const Bookings = () => {
  const [bookingInfo, setBookingInfo] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setTimeout(() => {
      getAllBookings()
        .then((data) => {
          setBookingInfo(data);
          setIsLoading(false);
        })
        .catch((error) => {
          setErrorMessage(error.message);
          setIsLoading(false);
        });
    }, [1000]);
  }, []);

  const handleBookingCancellation = async (bookingId) => {
    try {
      await cancelBooking(bookingId);
      const data = await getAllBookings();
      setBookingInfo(data);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  return (
    <section  style={{ backgroundColor: "whitesmoke" }}>
      <Header title={"Existing Bookings"} />
      {errorMessage && <div className="text-danger">{errorMessage}</div>}
      {isLoading ? (
           <div>
           <Spinner size={120} spinnerColor={"gray"} spinnerWidth={2} visible={true}  />
         </div>
      ) : (
        <BookingTable
          bookingInfo={bookingInfo}
          handleBookingsCancellation={handleBookingCancellation}
        />
      )}
    </section>
  );
};
