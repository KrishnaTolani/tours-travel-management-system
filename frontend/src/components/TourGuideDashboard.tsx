import { useState, useEffect } from 'react';
import type { User, Tour, Location, Transport, Lodge, Booking } from '../types';
import { tourAPI, locationAPI, transportAPI, lodgeAPI, bookingAPI } from '../services/api';

interface TourGuideDashboardProps {
  user: User | null;
}

const TourGuideDashboard = ({ user }: TourGuideDashboardProps) => {
  const [activeTab, setActiveTab] = useState('tours');
  const [tours, setTours] = useState<Tour[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [transports, setTransports] = useState<Transport[]>([]);
  const [lodges, setLodges] = useState<Lodge[]>([]);
  
  const [tourForm, setTourForm] = useState({
    name: '',
    description: '',
    fromLocationId: '',
    toLocationId: '',
    transportId: '',
    lodgeId: '',
    lodgeName: '',
    lodgingAddress: '',
    transportDescription: '',
    vehicleRegistration: '',
    totalDays: 1,
    availableTickets: 1,
    totalTickets: 1,
    ticketPrice: 0,
    startDate: '',
    endDate: '',
    tourImage: '',
    specialNote: '',
    activities: '',
    meals: ''
  });

  useEffect(() => {
    if (user?.role === 'TOUR_GUIDE') {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      const [toursRes, bookingsRes, locRes, transRes, lodgeRes] = await Promise.all([
        tourAPI.getToursByGuide(user!.id),
        bookingAPI.getBookingsByGuide(user!.id),
        locationAPI.getAllLocations(),
        transportAPI.getAllTransports(),
        lodgeAPI.getAllLodges()
      ]);

      setTours(toursRes.data.data);
      setBookings(bookingsRes.data.data);
      setLocations(locRes.data.data);
      setTransports(transRes.data.data);
      setLodges(lodgeRes.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAddTour = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const tourData = {
        ...tourForm,
        fromLocation: { id: parseInt(tourForm.fromLocationId) },
        toLocation: { id: parseInt(tourForm.toLocationId) },
        transport: { id: parseInt(tourForm.transportId) },
        lodge: { id: parseInt(tourForm.lodgeId) },
        tourGuide: { id: user!.id },
        startDate: new Date(tourForm.startDate).toISOString(),
        endDate: new Date(tourForm.endDate).toISOString()
      };

      await tourAPI.addTour(tourData);
      
      // Reset form
      setTourForm({
        name: '',
        description: '',
        fromLocationId: '',
        toLocationId: '',
        transportId: '',
        lodgeId: '',
        lodgeName: '',
        lodgingAddress: '',
        transportDescription: '',
        vehicleRegistration: '',
        totalDays: 1,
        availableTickets: 1,
        totalTickets: 1,
        ticketPrice: 0,
        startDate: '',
        endDate: '',
        tourImage: '',
        specialNote: '',
        activities: '',
        meals: ''
      });
      
      fetchData();
      alert('Tour added successfully');
    } catch (error) {
      alert('Error adding tour');
    }
  };

  if (!user || user.role !== 'TOUR_GUIDE') {
    return <div className="container mt-4"><div className="alert alert-danger">Access denied. Tour Guide only.</div></div>;
  }

  return (
    <div className="container mt-4">
      <h2>Tour Guide Dashboard</h2>
      
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'tours' ? 'active' : ''}`} onClick={() => setActiveTab('tours')}>
            My Tours
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'add-tour' ? 'active' : ''}`} onClick={() => setActiveTab('add-tour')}>
            Add Tour
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'bookings' ? 'active' : ''}`} onClick={() => setActiveTab('bookings')}>
            My Bookings
          </button>
        </li>
      </ul>

      {activeTab === 'tours' && (
        <div>
          <h4>My Tours</h4>
          <div className="row">
            {tours.map((tour) => (
              <div key={tour.id} className="col-md-6 col-lg-4 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{tour.name}</h5>
                    <p className="card-text">{tour.description}</p>
                    <p><strong>From:</strong> {tour.fromLocation.name} <strong>To:</strong> {tour.toLocation.name}</p>
                    <p><strong>Price:</strong> ₹{tour.ticketPrice}</p>
                    <p><strong>Available:</strong> {tour.availableTickets}/{tour.totalTickets}</p>
                    <span className={`badge ${tour.status === 'ACTIVE' ? 'bg-success' : 'bg-secondary'}`}>
                      {tour.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'add-tour' && (
        <div>
          <h4>Add New Tour</h4>
          <form onSubmit={handleAddTour}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Tour Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={tourForm.name}
                  onChange={(e) => setTourForm({...tourForm, name: e.target.value})}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Total Days</label>
                <input
                  type="number"
                  className="form-control"
                  value={tourForm.totalDays}
                  onChange={(e) => setTourForm({...tourForm, totalDays: parseInt(e.target.value)})}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                value={tourForm.description}
                onChange={(e) => setTourForm({...tourForm, description: e.target.value})}
                required
              />
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">From Location</label>
                <select
                  className="form-select"
                  value={tourForm.fromLocationId}
                  onChange={(e) => setTourForm({...tourForm, fromLocationId: e.target.value})}
                  required
                >
                  <option value="">Select Location</option>
                  {locations.map((location) => (
                    <option key={location.id} value={location.id}>{location.name}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">To Location</label>
                <select
                  className="form-select"
                  value={tourForm.toLocationId}
                  onChange={(e) => setTourForm({...tourForm, toLocationId: e.target.value})}
                  required
                >
                  <option value="">Select Location</option>
                  {locations.map((location) => (
                    <option key={location.id} value={location.id}>{location.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Transport</label>
                <select
                  className="form-select"
                  value={tourForm.transportId}
                  onChange={(e) => setTourForm({...tourForm, transportId: e.target.value})}
                  required
                >
                  <option value="">Select Transport</option>
                  {transports.map((transport) => (
                    <option key={transport.id} value={transport.id}>{transport.name}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Vehicle Registration</label>
                <input
                  type="text"
                  className="form-control"
                  value={tourForm.vehicleRegistration}
                  onChange={(e) => setTourForm({...tourForm, vehicleRegistration: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Transport Description</label>
              <textarea
                className="form-control"
                value={tourForm.transportDescription}
                onChange={(e) => setTourForm({...tourForm, transportDescription: e.target.value})}
              />
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Lodge Type</label>
                <select
                  className="form-select"
                  value={tourForm.lodgeId}
                  onChange={(e) => setTourForm({...tourForm, lodgeId: e.target.value})}
                  required
                >
                  <option value="">Select Lodge Type</option>
                  {lodges.map((lodge) => (
                    <option key={lodge.id} value={lodge.id}>{lodge.type}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Lodge Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={tourForm.lodgeName}
                  onChange={(e) => setTourForm({...tourForm, lodgeName: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Lodging Address</label>
              <input
                type="text"
                className="form-control"
                value={tourForm.lodgingAddress}
                onChange={(e) => setTourForm({...tourForm, lodgingAddress: e.target.value})}
                required
              />
            </div>

            <div className="row mb-3">
              <div className="col-md-4">
                <label className="form-label">Total Tickets</label>
                <input
                  type="number"
                  className="form-control"
                  value={tourForm.totalTickets}
                  onChange={(e) => setTourForm({...tourForm, totalTickets: parseInt(e.target.value), availableTickets: parseInt(e.target.value)})}
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Ticket Price (₹)</label>
                <input
                  type="number"
                  className="form-control"
                  value={tourForm.ticketPrice}
                  onChange={(e) => setTourForm({...tourForm, ticketPrice: parseFloat(e.target.value)})}
                  required
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Start Date</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  value={tourForm.startDate}
                  onChange={(e) => setTourForm({...tourForm, startDate: e.target.value})}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">End Date</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  value={tourForm.endDate}
                  onChange={(e) => setTourForm({...tourForm, endDate: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Tour Image URL</label>
              <input
                type="url"
                className="form-control"
                value={tourForm.tourImage}
                onChange={(e) => setTourForm({...tourForm, tourImage: e.target.value})}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Activities</label>
              <textarea
                className="form-control"
                value={tourForm.activities}
                onChange={(e) => setTourForm({...tourForm, activities: e.target.value})}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Meals</label>
              <textarea
                className="form-control"
                value={tourForm.meals}
                onChange={(e) => setTourForm({...tourForm, meals: e.target.value})}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Special Note</label>
              <textarea
                className="form-control"
                value={tourForm.specialNote}
                onChange={(e) => setTourForm({...tourForm, specialNote: e.target.value})}
              />
            </div>

            <button type="submit" className="btn btn-primary">Add Tour</button>
          </form>
        </div>
      )}

      {activeTab === 'bookings' && (
        <div>
          <h4>My Tour Bookings</h4>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Tour</th>
                  <th>Customer</th>
                  <th>Tickets</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.bookingId}</td>
                    <td>{booking.tour.name}</td>
                    <td>{booking.customer.name}</td>
                    <td>{booking.ticketsBooked}</td>
                    <td>₹{booking.totalAmount}</td>
                    <td>
                      <span className={`badge ${booking.status === 'CONFIRMED' ? 'bg-success' : 'bg-warning'}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default TourGuideDashboard;