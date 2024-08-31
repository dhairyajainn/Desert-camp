import { useEffect, useState } from "react";
import "./Book.css";
import HotelData from "../../data/HotelData";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useSelector, useDispatch } from "react-redux";
import {
  decrementQuantity,
  setCheckOutDate,
} from "../../redux/availabilitySlice";
import { useNavigate } from "react-router-dom";

function Book() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const availability = useSelector((state) => state.availability.availability);
  const checkOutDate = useSelector((state) => state.availability.checkOutDate);
  const user = useSelector((state) => state.auth.user);

  const room = HotelData.find((room) => room.id === parseInt(1));
  const today = new Date().toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState(today);
  const [availabilityMessage, setAvailabilityMessage] = useState("");
  const [guestCount, setGuestCount] = useState(1);
  const [roomQuantity, setRoomQuantity] = useState(room.quantity);
  const [selectedRooms, setSelectedRooms] = useState(1);
  const [initialQuantity] = useState(room.quantity);
  const [totalPrice, setTotalPrice] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckOutDateChange = (e) => {
    const newCheckOutDate = e.target.value;
    if (new Date(newCheckOutDate) <= new Date(selectedDate)) {
      setErrorMessage("Check-out date must be after the check-in date.");
      return;
    }
    setErrorMessage("");
    dispatch(setCheckOutDate(newCheckOutDate));
  };

  useEffect(() => {
    handleDateChange({ target: { value: today } });
  }, []);

  const calculateTotalPrice = () => {
    const checkInDate = new Date(selectedDate);
    const checkOut = new Date(checkOutDate);
    const timeDifference = checkOut - checkInDate;
    const days =
      timeDifference > 0
        ? Math.ceil(timeDifference / (1000 * 60 * 60 * 24))
        : 0;

    const price = days * room.pricePerNight * selectedRooms;
    setTotalPrice(price);
  };

  if (!room) {
    return (
      <div className="container my-5">
        <div className="alert alert-danger text-center" role="alert">
          Room not found
        </div>
      </div>
    );
  }

  const handleDateChange = async (event) => {
    const date = event.target.value;
    setSelectedDate(date);
    setIsLoading(true);

    const formattedDate = new Date(date).toISOString().split("T")[0];
    const roomAvailability = availability[room.id]?.[formattedDate];

    setRoomQuantity(initialQuantity);

    if (roomAvailability !== undefined) {
      setAvailabilityMessage(
        roomAvailability ? "Available" : "Room not available"
      );
    } else {
      const initialAvailability = room.availability.find(
        (day) => day.date === formattedDate
      );
      if (initialAvailability) {
        setAvailabilityMessage(
          initialAvailability.available ? "Available" : "Room not available"
        );
      } else {
        setAvailabilityMessage("No data available for this date");
      }
    }
    calculateTotalPrice();
    setIsLoading(false);
  };

  const handleBooking = (e) => {
    e.preventDefault();
  
    if (!selectedDate || !checkOutDate) {
      setErrorMessage("Please select both check-in and check-out dates.");
      return;
    }
  
    if (new Date(checkOutDate) <= new Date(selectedDate)) {
      setErrorMessage("Check-out date must be after the check-in date.");
      return;
    }
  
    if (availabilityMessage === "Available" && selectedRooms <= roomQuantity) {
      const formattedDate = new Date(selectedDate).toISOString().split("T")[0];
  
      setRoomQuantity(roomQuantity - selectedRooms);
      dispatch(decrementQuantity({ roomId: room.id, date: formattedDate, quantity: selectedRooms }));
  
      if (roomQuantity - selectedRooms <= 0) {
        setAvailabilityMessage("Room not available");
      }
  
      navigate('/confirmation', { state: { room, selectedDate, checkOutDate, totalPrice, selectedRooms } });
    }
  };
  

  const redirectToLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  useEffect(() => {
    if (selectedDate && checkOutDate) {
      calculateTotalPrice();
    }
  }, [selectedDate, checkOutDate, selectedRooms]);

  return (
    <>
      <div className="booking">
        <div className="bookingfilter">
          <div className="book-1">
            <h3>
              Book Now <div className="headingline"></div>
            </h3>
            <h4>{room.name}</h4>
            <img src={room.image} alt={room.name} />
            <h4>Description</h4>
            <p>{room.description}</p>
          </div>

          <form action="">
            <div className="mb-4">
              <h5>Available Rooms: {roomQuantity}</h5>
            </div>
            <label htmlFor="">Check in:</label>
            <input
              type="date"
              className="form-control"
              min={today}
              value={selectedDate}
              onChange={handleDateChange}
            />

            <label htmlFor="">Check Out:</label>
            <input
              type="date"
              className="form-control"
              min={today}
              value={checkOutDate}
              onChange={handleCheckOutDateChange}
            />
            {errorMessage && (
              <div className="mt-3">
                <p className="text-danger">{errorMessage}</p>
              </div>
            )}
            {isLoading ? (
              <div className="loading-indicator mt-3">
                <p>Loading room availability...</p>
              </div>
            ) : (
              selectedDate && (
                <div className="mt-3">
                  <h5>Availability Status:</h5>
                  <p
                    className={`font-weight-bold ${
                      availabilityMessage === "Available"
                        ? "text-success"
                        : "text-danger"
                    }`}
                  >
                    {availabilityMessage}
                  </p>
                </div>
              )
            )}

            <label htmlFor="">Select Number of Rooms:</label>
            <select
              className="form-select"
              value={selectedRooms}
              onChange={(e) => {
                const newSelectedRooms = parseInt(e.target.value);
                setSelectedRooms(newSelectedRooms);
                dispatch(setSelectedRooms(newSelectedRooms));
              }}
            >
              {[...Array(roomQuantity).keys()].map((_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1} Room{index + 1 > 1 ? "s" : ""}
                </option>
              ))}
            </select>

            <label htmlFor="">Select Number of Guests:</label>
            <select
              className="form-select"
              value={guestCount}
              onChange={(e) => {
                const newGuestCount = parseInt(e.target.value);
                setGuestCount(newGuestCount);
                dispatch(setGuestCount(newGuestCount));
              }}
            >
              {[...Array(room.maxOccupancy).keys()].map((_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1} Guest{index + 1 > 1 ? "s" : ""}
                </option>
              ))}
            </select>

            <div className="mt-3">
              <h4>Total Price: ${totalPrice.toFixed(2)}</h4>
            </div>

            {user ? (
              <button
                type="submit"
                className="btn btn-primary mt-4"
                onClick={handleBooking}
              >
                Book Now
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary mt-4"
                onClick={redirectToLogin}
              >
                Login to Book
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default Book;
