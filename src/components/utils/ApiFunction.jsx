import axios from "axios";

export const api = axios.create({
  // axios instance
  baseURL: "http://localhost:8080", // api base url
});
// Add new room to the database
export async function addRoom(photo, roomType, roomPrice) {
  const formData = new FormData();
  formData.append("photo", photo);
  formData.append("roomType", roomType);
  formData.append("roomPrice", roomPrice);
  const response = await api.post("/rooms/add/new-room", formData);
  if (response.status === 200) {
    return true;
  } else {
    return false;
  }
}
// Get rooms types from the database
export async function getRoomTypes() {
  try {
    const response = await api.get("/rooms/room-types");
    return response.data;
  } catch (error) {
    throw new Error("error fetching room types");
  }
}
//  get all rooms from the database
export async function getAllRooms() {
  try {
    const response = await api.get("/rooms/all-rooms");
    return response.data;
  } catch (error) {
    throw new Error("error fetching room types");
  }
}

// delete a room
export async function deleteRoomById(roomId) {
  try {
    const result = await api.delete(`/rooms/delete/room/${roomId}`);
    return result.data;
  } catch (error) {
    throw new Error("error deleting room " + error.message);
  }
}
// get RoomById
export async function getRoomById(roomId) {
  try {
    const result = await api.get(`/rooms/room/${roomId}`);
    return result.data;
  } catch (error) {
    throw new Error("error getting room " + error.message);
  }
}
// update room by id
export async function updateRoomById(roomId, roomData) {
  const formData = new FormData();
  formData.append("roomType", roomData.roomType);
  formData.append("roomPrice", roomData.roomPrice);
  formData.append("photo", roomData.photo);
  try {
    const result = await api.put(`/rooms/update/room/${roomId}`, formData);
    return result;
  } catch (error) {
    throw new Error("error updating room " + error.message);
  }
}

export async function bookRoom(roomId, booking) {
  try {
    const response = await api.post(
      `/bookings/room/${roomId}/booking`,
      booking
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error(`Error booking room : ${error.message}`);
    }
  }
}
export async function getAllBookings() {
  try {
    const response = await api.get("/bookings/all-bookings");
    return response.data;
  } catch (error) {
    throw new Error("Error getting bookings " + error.message);
  }
}
export async function getBookingByConfirmationCode(confirmationCode) {
  try {
    const result = await api.get(`/bookings/confirmation/${confirmationCode}`);
    return result.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error("Error find booking " + error.message);
    }
  }
}

export async function cancelBooking(bookingId) {
  try {
    const response = await api.delete(`/bookings/booking/${bookingId}/delete`);
    return response.data;
  } catch (error) {
    throw new Error("Error canceling booking " + error.message);
  }
}
// get available rooms
export async function getAvailableRooms(checkInDate, checkOutDate, roomType) {
  try {
    const result = await api.get(
      `/rooms/available-rooms?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`
    );
    return result;
  } catch (error) {
    throw new Error("Error getting available rooms " + error.message);
  }
}

