import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { tourAPI } from '../services/api';
import SimpleYouTubeBackground from './SimpleYouTubeBackground';
import type { Tour } from '../types';

const Home = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const response = await tourAPI.getAllTours();
      setTours(response.data.data);
    } catch (error) {
      console.error('Error fetching tours:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await tourAPI.searchTours(searchQuery);
      setTours(response.data.data);
    } catch (error) {
      console.error('Error searching tours:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container mt-4"><div className="text-center">Loading...</div></div>;
  }

  return (
    <div className="w-100">
      {/* Hero Section with Video Background */}
      <div className="hero-section position-relative">
        <SimpleYouTubeBackground videoId="ilY3WAUTXaE" opacity={0.4} />
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <h1 className="hero-title text-white">Welcome to Tours & Travel</h1>
          <p className="hero-subtitle text-white">Discover amazing destinations and book your perfect tour</p>
        </div>
      </div>
      
      <div className="container">

        {/* Search Section */}
        <div className="search-section">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control form-control-custom"
                  placeholder="🔍 Search tours by name or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="btn btn-primary-custom" onClick={handleSearch}>
                  Search Tours
                </button>
              </div>
            </div>
          </div>
        </div>

      {/* Tours Section */}
      <div className="row">
        {tours.length === 0 ? (
          <div className="col-12 text-center">
            <p>No tours available at the moment.</p>
          </div>
        ) : (
          tours.map((tour) => (
            <div key={tour.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card card-custom h-100">
                {tour.tourImage ? (
                  <img src={tour.tourImage} className="card-img-top" alt={tour.name} />
                ) : (
                  <div className="card-img-top d-flex align-items-center justify-content-center" style={{height: '250px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white'}}>
                    <i className="fas fa-map-marked-alt fa-3x"></i>
                  </div>
                )}
                <div className="card-body">
                  <h5 className="card-title text-primary">{tour.name}</h5>
                  <p className="card-text text-muted">{tour.description}</p>
                  <div className="mb-2">
                    <span className="badge bg-info me-2">📍 {tour.fromLocation.name} → {tour.toLocation.name}</span>
                  </div>
                  <div className="mb-2">
                    <small className="text-muted">👨‍🏫 Guide: {tour.tourGuide.name}</small>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="price-tag-enhanced">₹{tour.ticketPrice}</span>
                    <small className="availability-tag">🎫 {tour.availableTickets} available</small>
                  </div>
                </div>
                <div className="card-footer bg-transparent">
                  <Link to={`/tour/${tour.id}`} className="btn btn-primary-custom w-100">
                    🔍 View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
        </div>

        {/* About Us Section with Video Background */}
        <div className="about-section-light position-relative mt-5 py-5">
          <SimpleYouTubeBackground videoId="PeWHfTTs7kQ" opacity={0.15} />
          <div className="light-overlay"></div>
          <div className="container position-relative" style={{ zIndex: 3 }}>
            <div className="row justify-content-center mb-5">
              <div className="col-lg-8 text-center">
                <h2 className="section-title-dark mb-4">About Our Travel Experience</h2>
                <p className="section-text-dark lead">
                  We are passionate about creating unforgettable travel experiences. 
                  Our expert guides and carefully curated tours ensure you discover 
                  the most beautiful destinations with comfort and safety.
                </p>
              </div>
            </div>
            
            {/* Developers Section */}
            <div className="developers-section">
              <h3 className="section-title-dark text-center mb-5">Meet Our Developers</h3>
              <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4 mb-4">
                  <div className="developer-card-enhanced">
                    <div className="developer-photo">
                      <img src="https://i.ibb.co/DD5kcxG0/image.png" alt="Krishna Tolani" className="developer-img" />
                    </div>
                    <div className="developer-info">
                      <h4 className="developer-name">Krishna Tolani</h4>
                      <p className="developer-role">Role - Full Stack Developer</p>
                      <p className="developer-batch">Super 30 Batch</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4 mb-4">
                  <div className="developer-card-enhanced">
                    <div className="developer-photo">
                      <img src="https://i.ibb.co/GSvNHHn/image.png" alt="Sujal Samadiya" className="developer-img" />
                    </div>
                    <div className="developer-info">
                      <h4 className="developer-name">Sujal Samadiya</h4>
                      <p className="developer-role">Role - Full Stack Developer</p>
                      <p className="developer-batch">Super 30 Batch</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;