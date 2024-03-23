import "./App.css";
import AddRom from "./components/room/AddRom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import ExistingRoom from "./components/room/ExistingRoom";
import Home from "./components/home/Home";
import EditRom from "./components/room/EditRom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import RoomListing from "./components/room/RoomListing";
import Admin from "./components/admin/Admin";
import CheckOut from "./components/bookings/CheckOut";
import BookingSuccess from "./components/bookings/BookingSuccess";
import { Bookings } from "./components/bookings/Bookings";
import { FindBooking } from "./components/bookings/FindBooking";

function App() {
  return (
    <>
      <main>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-room" element={<AddRom />} />
            <Route path="/edit-room/:roomId" element={<EditRom />} />
            <Route path="/existing-rooms" element={<ExistingRoom />} />
            <Route path="/browse-all-rooms" element={<RoomListing />} />
            <Route path="/book-room/:roomId" element={<CheckOut />} />
            <Route path="/admin" element={<Admin/>} />
            <Route path="/booking-success" element={<BookingSuccess/>} />
            <Route path="/existing-bookings" element={<Bookings/>} />
            <Route path="/find-booking" element={<FindBooking/>} />
          </Routes>
        </Router>
        <Footer />
      </main>
    </>
  );
}

export default App;
