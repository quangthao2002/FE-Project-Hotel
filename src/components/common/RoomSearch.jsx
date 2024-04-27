import moment from "moment";
import React, { useState } from "react";
import { getAvailableRooms } from "../utils/ApiFunction";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import RoomTypeSelector from "./RoomTypeSelector";
import RoomSearchResult  from "./RoomSearchResult";

 const RoomSearch = () => {
  const [searchQuery, setSearchQuery] = useState({
    checkInDate: "",
    checkOutDate: "",
    roomType: "",
  });
  const [errorMessages, setErrorMessages] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [availableRooms, setAvailableRooms] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    const checkInDate = moment(searchQuery.checkInDate);
    const checkOutDate = moment(searchQuery.checkOutDate);
    if (!checkInDate.isValid() || !checkOutDate.isValid()) {
      setErrorMessages("Invalid date");
      return;
    }
    if (checkInDate.isSameOrAfter(checkOutDate)) {
      setErrorMessages("Check out date must be after check in date");
      return;
    }
    setIsLoading(true);
    getAvailableRooms(
      searchQuery.checkInDate,
      searchQuery.checkOutDate,
      searchQuery.roomType
    )
      .then((rs) => {
        setAvailableRooms(rs.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      })
      .catch((error) => {
        setErrorMessages(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
      
  };

  const handleInputChange = (e) => {
   
    const { name, value } = e.target;
    setSearchQuery({...searchQuery,[name]: value})
    const checkInDate = moment(searchQuery.checkInDate);
    const checkOutDate = moment(searchQuery.checkOutDate);
    if (checkInDate.isValid() && checkOutDate.isValid()) {
      setErrorMessages("");
    }
  };
  const handleClearSearch = () => {
    setSearchQuery({
      checkInDate: "",
      checkOutDate: "",
      roomType: "",
    });
    setAvailableRooms([]);
  };

  return (
    <>
      <Container className="mt-5 mb-5 py-5 shadow">
        <Form onSubmit={handleSearch}>
          <Row className="justify-content-center">
            <Col xs={12} md={3}>
              <Form.Group controlId="checkInDate">
                <Form.Label>Check In Date</Form.Label>
                <Form.Control
                  type="date"
                  name="checkInDate"
                  value={searchQuery.checkInDate}
                  onChange={handleInputChange}
                  min={moment().format("YYYY-MM-DD")}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={3}>
              <Form.Group controlId="checkOutDate">
                <Form.Label>Check Out Date</Form.Label>
                <Form.Control
                  type="date"
                  name="checkOutDate"
                  value={searchQuery.checkOutDate}
                  onChange={handleInputChange}
                  min={moment().format("YYYY-MM-DD")}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={3}>
              <Form.Group controlId="roomType">
                <Form.Label>Room Type</Form.Label>
                <div className="d-flex">
                  <RoomTypeSelector
                    handleRoomInputChange={handleInputChange}
                    newRoom={searchQuery}
                  />
                  <Button variant="secondary" type="submit" >
                    Search
                  </Button>
                </div>
              </Form.Group>
            </Col>
          </Row>
        </Form>
        {isLoading ? (
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : availableRooms ? ( // availableRooms xem phai truthy hay falsy : mang rong la truthy
          <RoomSearchResult
            results={availableRooms}
            onClearSearch={handleClearSearch}
          />
        ) : (
          <div className="text-center">
            <p>No available rooms</p>
          </div>
        )}
        {errorMessages && (
          <div className="alert alert-danger mt-3">{errorMessages}</div>
        )}
      </Container>
    </>
  );
};
export default RoomSearch;
