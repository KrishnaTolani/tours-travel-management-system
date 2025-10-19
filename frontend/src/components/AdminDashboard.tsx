import { useState, useEffect } from 'react';
import type { User, Location, Transport, Lodge, Booking } from '../types';
import { locationAPI, transportAPI, lodgeAPI, authAPI, bookingAPI, userAPI } from '../services/api';

interface AdminDashboardProps {
  user: User | null;
}

const AdminDashboard = ({ user }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState('locations');
  const [locations, setLocations] = useState<Location[]>([]);
  const [transports, setTransports] = useState<Transport[]>([]);
  const [lodges, setLodges] = useState<Lodge[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [customers, setCustomers] = useState<User[]>([]);
  const [tourGuides, setTourGuides] = useState<User[]>([]);

  // Form states
  const [locationForm, setLocationForm] = useState({ name: '', description: '' });
  const [transportForm, setTransportForm] = useState({ name: '', description: '' });
  const [lodgeForm, setLodgeForm] = useState({ type: '', description: '' });
  const [guideForm, setGuideForm] = useState({ name: '', email: '', password: '', phone: '', address: '' });

  useEffect(() => {
    if (user?.role === 'ADMIN') {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      const [locRes, transRes, lodgeRes, bookRes, custRes, guideRes] = await Promise.all([
        locationAPI.getAllLocations(),
        transportAPI.getAllTransports(),
        lodgeAPI.getAllLodges(),
        bookingAPI.getAllBookings(),
        userAPI.getAllCustomers(),
        userAPI.getAllTourGuides()
      ]);

      setLocations(locRes.data.data);
      setTransports(transRes.data.data);
      setLodges(lodgeRes.data.data);
      setBookings(bookRes.data.data);
      setCustomers(custRes.data.data);
      setTourGuides(guideRes.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAddLocation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await locationAPI.addLocation(locationForm);
      console.log('Location added:', response.data);
      setLocationForm({ name: '', description: '' });
      fetchData();
      alert('Location added successfully');
    } catch (error: any) {
      console.error('Error adding location:', error);
      alert('Error adding location: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleAddTransport = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await transportAPI.addTransport(transportForm);
      setTransportForm({ name: '', description: '' });
      fetchData();
      alert('Transport added successfully');
    } catch (error) {
      alert('Error adding transport');
    }
  };

  const handleAddLodge = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await lodgeAPI.addLodge(lodgeForm);
      setLodgeForm({ type: '', description: '' });
      fetchData();
      alert('Lodge added successfully');
    } catch (error) {
      alert('Error adding lodge');
    }
  };

  const handleAddTourGuide = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authAPI.register({ ...guideForm, role: 'TOUR_GUIDE' });
      setGuideForm({ name: '', email: '', password: '', phone: '', address: '' });
      fetchData();
      alert('Tour guide registered successfully');
    } catch (error) {
      alert('Error registering tour guide');
    }
  };

  const handleDeleteLocation = async (id: number) => {
    if (window.confirm('Are you sure?')) {
      try {
        await locationAPI.deleteLocation(id);
        fetchData();
        alert('Location deleted successfully');
      } catch (error) {
        alert('Error deleting location');
      }
    }
  };

  if (!user || user.role !== 'ADMIN') {
    return <div className="container mt-4"><div className="alert alert-danger">Access denied. Admin only.</div></div>;
  }

  return (
    <div className="container mt-4">
      <h2>Admin Dashboard</h2>
      
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'locations' ? 'active' : ''}`} onClick={() => setActiveTab('locations')}>
            Locations
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'transports' ? 'active' : ''}`} onClick={() => setActiveTab('transports')}>
            Transports
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'lodges' ? 'active' : ''}`} onClick={() => setActiveTab('lodges')}>
            Lodges
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'guides' ? 'active' : ''}`} onClick={() => setActiveTab('guides')}>
            Tour Guides
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'bookings' ? 'active' : ''}`} onClick={() => setActiveTab('bookings')}>
            Bookings
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'customers' ? 'active' : ''}`} onClick={() => setActiveTab('customers')}>
            Customers
          </button>
        </li>
      </ul>

      {activeTab === 'locations' && (
        <div>
          <h4>Manage Locations</h4>
          <form onSubmit={handleAddLocation} className="mb-4">
            <div className="row">
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Location name"
                  value={locationForm.name}
                  onChange={(e) => setLocationForm({...locationForm, name: e.target.value})}
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Description"
                  value={locationForm.description}
                  onChange={(e) => setLocationForm({...locationForm, description: e.target.value})}
                />
              </div>
              <div className="col-md-2">
                <button type="submit" className="btn btn-primary">Add</button>
              </div>
            </div>
          </form>
          
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {locations.map((location) => (
                  <tr key={location.id}>
                    <td>{location.name}</td>
                    <td>{location.description}</td>
                    <td>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDeleteLocation(location.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'transports' && (
        <div>
          <h4>Manage Transports</h4>
          <form onSubmit={handleAddTransport} className="mb-4">
            <div className="row">
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Transport name"
                  value={transportForm.name}
                  onChange={(e) => setTransportForm({...transportForm, name: e.target.value})}
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Description"
                  value={transportForm.description}
                  onChange={(e) => setTransportForm({...transportForm, description: e.target.value})}
                />
              </div>
              <div className="col-md-2">
                <button type="submit" className="btn btn-primary">Add</button>
              </div>
            </div>
          </form>
          
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {transports.map((transport) => (
                  <tr key={transport.id}>
                    <td>{transport.name}</td>
                    <td>{transport.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'lodges' && (
        <div>
          <h4>Manage Lodges</h4>
          <form onSubmit={handleAddLodge} className="mb-4">
            <div className="row">
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Lodge type"
                  value={lodgeForm.type}
                  onChange={(e) => setLodgeForm({...lodgeForm, type: e.target.value})}
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Description"
                  value={lodgeForm.description}
                  onChange={(e) => setLodgeForm({...lodgeForm, description: e.target.value})}
                />
              </div>
              <div className="col-md-2">
                <button type="submit" className="btn btn-primary">Add</button>
              </div>
            </div>
          </form>
          
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {lodges.map((lodge) => (
                  <tr key={lodge.id}>
                    <td>{lodge.type}</td>
                    <td>{lodge.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'guides' && (
        <div>
          <h4>Register Tour Guide</h4>
          <form onSubmit={handleAddTourGuide} className="mb-4">
            <div className="row mb-3">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  value={guideForm.name}
                  onChange={(e) => setGuideForm({...guideForm, name: e.target.value})}
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={guideForm.email}
                  onChange={(e) => setGuideForm({...guideForm, email: e.target.value})}
                  required
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={guideForm.password}
                  onChange={(e) => setGuideForm({...guideForm, password: e.target.value})}
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Phone"
                  value={guideForm.phone}
                  onChange={(e) => setGuideForm({...guideForm, phone: e.target.value})}
                  required
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Address"
                  value={guideForm.address}
                  onChange={(e) => setGuideForm({...guideForm, address: e.target.value})}
                  required
                />
              </div>
              <div className="col-md-2">
                <button type="submit" className="btn btn-primary">Register</button>
              </div>
            </div>
          </form>
          
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {tourGuides.map((guide) => (
                  <tr key={guide.id}>
                    <td>{guide.name}</td>
                    <td>{guide.email}</td>
                    <td>{guide.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'bookings' && (
        <div>
          <h4>All Bookings</h4>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Tour</th>
                  <th>Customer</th>
                  <th>Guide</th>
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
                    <td>{booking.tour.tourGuide.name}</td>
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

      {activeTab === 'customers' && (
        <div>
          <h4>All Customers</h4>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.address}</td>
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

export default AdminDashboard;