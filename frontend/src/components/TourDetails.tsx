import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { tourAPI, bookingAPI } from '../services/api';
import type { Tour, User } from '../types';

interface TourDetailsProps {
  user: User | null;
}

const TourDetails = ({ user }: TourDetailsProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingTickets, setBookingTickets] = useState(1);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchTour(parseInt(id));
    }
  }, [id]);

  const fetchTour = async (tourId: number) => {
    try {
      const response = await tourAPI.getTourById(tourId);
      setTour(response.data.data);
    } catch (error) {
      console.error('Error fetching tour:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookTour = async () => {
    if (!user) {
      alert('Please login as a customer to book a tour');
      navigate('/login');
      return;
    }

    if (user.role !== 'CUSTOMER') {
      alert('Only customers can book tours');
      return;
    }

    if (!tour) return;

    setBookingLoading(true);
    try {
      const response = await bookingAPI.bookTour(tour.id, user.id, bookingTickets);
      if (response.data.success) {
        alert('Tour booked successfully!');
        navigate('/customer');
      }
    } catch (error: any) {
      alert(error.response?.data?.message || 'Booking failed');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return <div className="container mt-4"><div className="text-center">Loading...</div></div>;
  }

  if (!tour) {
    return <div className="container mt-4"><div className="text-center">Tour not found</div></div>;
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8">
          <div className="card">
            {tour.tourImage && (
              <img src={tour.tourImage} className="card-img-top" alt={tour.name} style={{height: '300px', objectFit: 'cover'}} />
            )}
            <div className="card-body">
              <h2 className="card-title">{tour.name}</h2>
              <p className="card-text">{tour.description}</p>
              
              <div className="row mb-3">
                <div className="col-md-6">
                  <strong>From:</strong> {tour.fromLocation.name}
                </div>
                <div className="col-md-6">
                  <strong>To:</strong> {tour.toLocation.name}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <strong>Tour Guide:</strong> {tour.tourGuide.name}
                </div>
                <div className="col-md-6">
                  <strong>Total Days:</strong> {tour.totalDays}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <strong>Start Date:</strong> {new Date(tour.startDate).toLocaleDateString()}
                </div>
                <div className="col-md-6">
                  <strong>End Date:</strong> {new Date(tour.endDate).toLocaleDateString()}
                </div>
              </div>

              <div className="mb-3">
                <h5>Transport Details</h5>
                <p><strong>Mode:</strong> {tour.transport.name}</p>
                <p><strong>Vehicle Registration:</strong> {tour.vehicleRegistration}</p>
                <p>{tour.transportDescription}</p>
              </div>

              <div className="mb-3">
                <h5>Accommodation</h5>
                <p><strong>Lodge Type:</strong> {tour.lodge.type}</p>
                <p><strong>Lodge Name:</strong> {tour.lodgeName}</p>
                <p><strong>Address:</strong> {tour.lodgingAddress}</p>
              </div>

              {tour.activities && (
                <div className="mb-3">
                  <h5>Activities</h5>
                  <p>{tour.activities}</p>
                </div>
              )}

              {tour.meals && (
                <div className="mb-3">
                  <h5>Meals</h5>
                  <p>{tour.meals}</p>
                </div>
              )}

              {tour.specialNote && (
                <div className="mb-3">
                  <h5>Special Note</h5>
                  <p>{tour.specialNote}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Booking Information</h5>
              <p className="text-success fs-4">
                <strong>₹{tour.ticketPrice}</strong> per person
              </p>
              <p className="text-info">
                <strong>Available Tickets:</strong> {tour.availableTickets}
              </p>
              <p className="text-muted">
                <strong>Total Tickets:</strong> {tour.totalTickets}
              </p>

              {tour.availableTickets > 0 && (
                <div className="mb-3">
                  <label className="form-label">Number of Tickets</label>
                  <select
                    className="form-select"
                    value={bookingTickets}
                    onChange={(e) => setBookingTickets(parseInt(e.target.value))}
                  >
                    {Array.from({ length: Math.min(tour.availableTickets, 10) }, (_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="mb-3">
                <strong>Total Amount: ₹{tour.ticketPrice * bookingTickets}</strong>
              </div>

              {tour.availableTickets > 0 ? (
                <button
                  className="btn btn-primary w-100"
                  onClick={handleBookTour}
                  disabled={bookingLoading}
                >
                  {bookingLoading ? 'Booking...' : 'Book Tour'}
                </button>
              ) : (
                <button className="btn btn-secondary w-100" disabled>
                  Sold Out
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetails;