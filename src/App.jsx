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
import Login from "./components/auth/Login";
import Registration from "./components/auth/Registration";
import Profile from "./components/auth/Profile";
import AuthProvider from "./components/auth/AuthProvider";
import { Toaster } from "react-hot-toast";
import RequireAuth from "./components/auth/RequireAuth";

function App() {
  return (
    <>
      <AuthProvider>
        <main>
          <Router>
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add-room" element={<AddRom />} />
              <Route path="/edit-room/:roomId" element={<EditRom />} />
              <Route path="/existing-rooms" element={<ExistingRoom />} />
              <Route path="/browse-all-rooms" element={<RoomListing />} />
              <Route path="/book-room/:roomId" element={
                <RequireAuth>
                  <CheckOut />
                </RequireAuth>
              } />
              <Route path="/admin" element={<Admin />} />
              <Route path="/booking-success" element={<BookingSuccess />} />
              <Route path="/existing-bookings" element={<Bookings />} />
              <Route path="/find-booking" element={<FindBooking />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Router>
          <Footer />
        </main>
      </AuthProvider>
      <Toaster/>
    </>
  );
}

export default App;
