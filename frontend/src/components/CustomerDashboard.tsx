import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { User, Booking } from '../types';
import { bookingAPI } from '../services/api';

interface CustomerDashboardProps {
  user: User | null;
}

const CustomerDashboard = ({ user }: CustomerDashboardProps) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role === 'CUSTOMER') {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      const response = await bookingAPI.getBookingsByCustomer(user!.id);
      setBookings(response.data.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user || user.role !== 'CUSTOMER') {
    return <div className="container mt-4"><div className="alert alert-danger">Access denied. Customer only.</div></div>;
  }

  if (loading) {
    return <div className="container mt-4"><div className="text-center">Loading...</div></div>;
  }

  return (
    <div className="container mt-4">
      <h2>Customer Dashboard</h2>
      <p>Welcome, {user.name}!</p>

      <div className="row mb-4">
        <div className="col-md-12">
          <Link to="/" className="btn btn-primary">Browse Tours</Link>
        </div>
      </div>

      <h4>My Bookings</h4>
      {bookings.length === 0 ? (
        <div className="alert alert-info">
          You haven't booked any tours yet. <Link to="/">Browse tours</Link> to make your first booking!
        </div>
      ) : (
        <div className="row">
          {bookings.map((booking) => (
            <div key={booking.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card">
                {booking.tour.tourImage && (
                  <img 
                    src={booking.tour.tourImage} 
                    className="card-img-top" 
                    alt={booking.tour.name}
                    style={{height: '200px', objectFit: 'cover'}}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{booking.tour.name}</h5>
                  <p className="card-text">{booking.tour.description}</p>
                  
                  <div className="mb-2">
                    <strong>Booking ID:</strong> {booking.bookingId}
                  </div>
                  
                  <div className="mb-2">
                    <strong>From:</strong> {booking.tour.fromLocation.name} 
                    <strong> To:</strong> {booking.tour.toLocation.name}
                  </div>
                  
                  <div className="mb-2">
                    <strong>Tour Guide:</strong> {booking.tour.tourGuide.name}
                  </div>
                  
                  <div className="mb-2">
                    <strong>Tickets:</strong> {booking.ticketsBooked}
                  </div>
                  
                  <div className="mb-2">
                    <strong>Total Amount:</strong> ₹{booking.totalAmount}
                  </div>
                  
                  <div className="mb-2">
                    <strong>Booking Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}
                  </div>
                  
                  <div className="mb-2">
                    <strong>Tour Dates:</strong> {new Date(booking.tour.startDate).toLocaleDateString()} - {new Date(booking.tour.endDate).toLocaleDateString()}
                  </div>
                  
                  <div className="mb-3">
                    <span className={`badge ${booking.status === 'CONFIRMED' ? 'bg-success' : booking.status === 'CANCELLED' ? 'bg-danger' : 'bg-warning'}`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
                
                <div className="card-footer">
                  <Link to={`/tour/${booking.tour.id}`} className="btn btn-outline-primary btn-sm">
                    View Tour Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-5">
        <h5>Booking Summary</h5>
        <div className="row">
          <div className="col-md-3">
            <div className="card text-center">
              <div className="card-body">
                <h3 className="text-primary">{bookings.length}</h3>
                <p>Total Bookings</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center">
              <div className="card-body">
                <h3 className="text-success">{bookings.filter(b => b.status === 'CONFIRMED').length}</h3>
                <p>Confirmed</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center">
              <div className="card-body">
                <h3 className="text-warning">{bookings.filter(b => b.status === 'PENDING').length}</h3>
                <p>Pending</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center">
              <div className="card-body">
                <h3 className="text-info">₹{bookings.reduce((sum, b) => sum + b.totalAmount, 0)}</h3>
                <p>Total Spent</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;