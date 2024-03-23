import React, { useEffect, useState } from "react";
import { getRoomById, updateRoomById } from "../utils/ApiFunction";
import { Link, useParams } from "react-router-dom";
import RoomTypeSelector from "../common/RoomTypeSelector";

const EditRom = () => {
  const [room, setRoom] = useState({
    photo: "",
    roomType: "",
    roomPrice: "",
  });
  const [photoPreview, setPhotoPreview] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { roomId } = useParams(); // get roomId from url

  useEffect(() => {
    const fetchRoom = async () => {
      const roomData = await getRoomById(roomId);
      setRoom(roomData);
      setPhotoPreview(roomData.photo);
    };
    fetchRoom();
  }, [roomId]);

  const handleRoomInputChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === "roomPrice") {
      if (!isNaN(value)) {
        // if value is a number
        value = parseInt(value);
      } else {
        // if value is not a number}}
        value = ""; // set value to empty string
      }
    }
    setRoom({ ...room, [name]: value }); // set value sau khi thay doi voi name tuong ung
  };

  const handleImageChange = (e) => {
    const selectImage = e.target.files[0]; // get file from input [0] is first file
    setRoom({ ...room, photo: selectImage }); // set photo bang file vua chon
    setPhotoPreview(URL.createObjectURL(selectImage)); // set photoPreview bang url cua file vua chon
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateRoomById(roomId, room);
      console.log(response.status)
      if (response.status === 200) {
        setSuccessMessage("Update room successfully");
        console.log("updateRoom successfully")
        const updateRoomData = await getRoomById(roomId); // get room sau khi update
        setRoom(updateRoomData);
        setPhotoPreview(updateRoomData.photo);
        setErrorMessage("");
      } else {
        setErrorMessage("Error updating room");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <section className="container, mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <h2 className="mt-3 mt-2">Update room</h2>
            {successMessage && (
              <div className="alert alert-success">{successMessage}</div>
            )}
            {errorMessage && (
              <div className="alert alert-danger">{errorMessage}</div>
            )}{" "}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="roomType" className="form-label">
                  Room Type
                </label>
                <div>
                  <RoomTypeSelector
                    handleRoomInputChange={handleRoomInputChange}
                    newRoom={room}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="roomPrice" className="form-label">
                  Room Price
                </label>
                <input
                  type="number"
                  className="form-control"
                  required
                  id="roomPrice"
                  name="roomPrice"
                  value={room.roomPrice}
                  onChange={handleRoomInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="roomPhoto" className="form-label">
                  Room Photo
                </label>

                <input
                  type="file"
                  id="roomPhoto"
                  name="roomPhoto"
                  className="form-control"
                  onChange={handleImageChange}
                />
                {photoPreview && (
                  <img
                    src={`data:image/jpg;base64,${photoPreview}`} // 
                    alt="preview"
                    className="img-fluid mt-3"
                    style={{ maxWidth: "400px", maxHeight: "400px" }}
                  />
                )}
              </div>
              <div className="d-grid d-md-flex mt-2">
                <Link to={"/existing-rooms"} className="btn btn-primary ml-5">
                  Back to Rooms </Link>
                <button type="submit" className="btn btn-outline-primary ml-3">
                  Edit Room
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditRom;
