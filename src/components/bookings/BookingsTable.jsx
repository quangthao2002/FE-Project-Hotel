import { parseISO } from "date-fns";
import React, { useEffect, useState } from "react";
import DataSlider from "../common/DateSlider";
import ErrorBoundary from "../exeception/ErrorBoundary";

export const BookingTable = ({ bookingInfo, handleBookingsCancellation }) => {
  const [filteredBookings, setFilteredBookings] = useState(bookingInfo);
console.log(bookingInfo);
  const filterBookings = (startDate, endDate) => {
    let filtered = bookingInfo;
    if (startDate && endDate) {
      filtered = bookingInfo.filter((booking) => {
        const bookingStartDate = parseISO(booking.checkInDate);
        const bookingEndDate = parseISO(booking.checkOutDate);
        return (
          bookingStartDate >= startDate &&
          bookingEndDate <= endDate &&
          bookingEndDate > startDate
        );
      });
    }
    setFilteredBookings(filtered);
  };
  useEffect(() => {
    setFilteredBookings(bookingInfo);
  }, [bookingInfo]);

  return (
    <section className="p-4">
        <DataSlider
          onDateChange={filterBookings}
          onFilterChange={filterBookings}
        />
      <table className="table table-bordered table-hover shadow ">
      <thead  >
					<tr >
						<th >S/N</th>
						<th>Booking ID</th>
						<th>Room ID</th>
						<th>Room Type</th>
						<th >Check-In</th>
						<th>Check-Out Date</th>
						<th>Guest Name</th>
						<th>Guest Email</th>
						<th>Adults</th>
						<th>Children</th>
						<th>Total Guest</th>
						<th>Confirmation Code</th>
						<th colSpan={2}>Actions</th>
					</tr>
        </thead>
        <tbody className="text-center">
          {filteredBookings.map((booking, index) => (
            <tr key={booking.id}>
             <td>{index + 1}</td>
							<td>{booking.id}</td>
							<td>{booking.room.id}</td>
							<td>{booking.room.roomType}</td>
							<td>{booking.checkInDate}</td>
							<td>{booking.checkOutDate}</td>
							<td>{booking.guestName}</td>
							<td>{booking.guestEmail}</td>
							<td>{booking.numOfAdults}</td>
							<td>{booking.numOfChildren}</td>
							<td>{booking.totalNumOfGuests}</td>
							<td>{booking.bookingConfirmationCode}</td>
              <td>
                <button
                  className="btn btn-dark btn-sm"
                  onClick={() => handleBookingsCancellation(booking.id)}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {filteredBookings.length === 0 && (
        <p className="text-center mt-4">No bookings found for the selected</p>
      )}
    </section>
  );
};
