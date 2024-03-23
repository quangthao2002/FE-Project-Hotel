import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import RoomFilter from "../common/RoomFilter";
import RoomPaginator from "../common/RoomPaginator";
import { deleteRoomById, getAllRooms } from "../utils/ApiFunction";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const ExistingRoom = () => {
  const [rooms, setRooms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchRooms = async function () {
    setIsLoading(true);
    try {
      const result = await getAllRooms();
      setRooms(result);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  useEffect(() => {
    fetchRooms();
  }, []);

  useEffect(() => {
    if (selectedRoomType === "") {
      setFilteredRooms(rooms);
    } else {
      const filtered = rooms.filter(
        (room) => room.roomType === selectedRoomType
      );
      setFilteredRooms(filtered);
    }
    setCurrentPage(1);
  }, [rooms, selectedRoomType]);

  const handlePaginationClick = (pageNumber) => {
      setCurrentPage(pageNumber);
  };

  const handleDeleteRoomById = async (roomId) => {
    try {
      const result = await deleteRoomById(roomId);
      if (result === "") {
        console.log("deleteRoomByIdSuccess");
        setSuccessMessage(`Room with id ${roomId} deleted successfully`);
        fetchRooms();
      } else {
        console.error("error deleting room");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
  };

  const caculateTotalPages = (filteredRoms = [], roomsPerPage, rooms) => {
    const totalRooms =
      filteredRoms && filteredRoms.length > 0
        ? filteredRoms.length
        : rooms.length;
    return Math.ceil(totalRooms / roomsPerPage);
  };
  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);
  return (
    <>
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {isLoading ? (
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading existing rooms</span>
        </div>
      ) : (
        <>
          <section className="mt-5 mb-5 container">
            <div className="d-flex justify-content-between mb-4 mt-5">
              <h2>Existing rooms</h2>
            </div>
            <Row>
              <Col md={6} className="mb-3 mb-md-0">
                <RoomFilter data={rooms} setFilteredData={setFilteredRooms} />
              </Col>
              <Col md={6} className="d-flex justify-content-end">
                <Link to={"/add-room"}>
                  <button className="btn btn-dark btn-m">Add new room</button>
                </Link>
              </Col>
            </Row>
            <table className="table table-bordered table-hover">
              <thead>
                <tr className="text-center">
                  <th>ID</th>
                  <th>Room Type</th>
                  <th>Room Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentRooms.map((room) => (
                  <tr key={room.id} className="text-center">
                    <td>{room.id}</td>
                    <td>{room.roomType}</td>
                    <td>{room.roomPrice}</td>
                    <td>
                      <Link to={`/edit-room/${room.id}`}>
                        <span className="m-2 btn btn-dark">
                          <FaEye />
                        </span>
                        <span className="btn btn-dark">
                          <FaEdit />
                        </span>
                      </Link>
                      <button
                        className="m-2 btn btn-dark btn-m"
                        onClick={() => handleDeleteRoomById(room.id)}
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <RoomPaginator
              currentPage={currentPage}
              totalPages={caculateTotalPages(
                filteredRooms,
                roomsPerPage,
                rooms
              )}
              onPageChange={handlePaginationClick}
            />
          </section>
        </>
      )}
    </>
  );
};

export default ExistingRoom;
