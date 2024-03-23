import React, { useEffect } from "react";
import { useState } from "react";
import { getAllRooms } from "../utils/ApiFunction";
import { Link } from "react-router-dom";
import { Card, Col, Container, Row, Carousel } from "react-bootstrap";

const RoomCarousel = () => {
  const [rooms, setRooms] = useState([
    { id: "", roomType: "", roomPrice: "", photo: "" },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    getAllRooms()
      .then((data) => {
        setRooms(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error);
      });
  }, []);

  if (isLoading) {
    return <div className="mt-5">Loading rooms.... </div>;
  }
  if (errorMessage) {
    return <div className="text-bg-danger my-5">Error: {errorMessage}</div>;
  }
  return (
    <section className="bg-light mb-5 mt-5 shadow">
      <Link
        to={"/browse-all-rooms"}
        className="hotel-color text-center text-decoration-none m-3"
      >
        Browse all rooms
      </Link>

      <Container>
        <Carousel
          interval={4000}
          indicators={true}
          nextIcon={
            <span aria-hidden="true" className="carousel-control-next-icon" />
          }
          prevIcon={
            <span aria-hidden="true" className="carousel-control-prev-icon" />
          }
        >
          {[...Array(Math.ceil(rooms.length / 4))].map((_, index) => (
            <Carousel.Item key={index}>
              <Row>
                {rooms.slice(index * 4, index * 4 + 4).map((room) => (
                  <Col key={room.id} className="mb-4" xs={12} md={6} lg={3}>
                    <Card>
                      <Link to={`/book-room/${room.id}`}>
                        <Card.Img
                          variant="top"
                          src={`data:image/png;base64,${room.photo}`}
                          alt="Room photo"
                          className="w-100"
                          style={{ height: "200px" }}
                        />
                      </Link>
                      <Card.Body>
                        <Card.Title className="hotel-color">
                          {room.roomType}
                        </Card.Title>
                        <Card.Title className="room-price">
                          {room.roomPrice}/night
                        </Card.Title>
                        <div className="flex-shrink-0 mt-3">
                          <Link
                            to={`/book-room/${room.id}`}
                            className="btn btn-hotel btn-sm"
                          >
                            Book Now
                          </Link>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </section>
  );
};

export default RoomCarousel;
