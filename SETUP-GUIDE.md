# Quick Setup Guide - Tours and Travel Management System

## 🚀 Quick Start (5 Minutes Setup)

### Prerequisites Check
- ✅ Java 17+ installed
- ✅ Node.js 16+ installed  
- ✅ MySQL 8.0+ installed and running

### Step 1: Database Setup
1. **Start MySQL service**
2. **Create database** (run in MySQL):
   ```sql
   CREATE DATABASE tours_travel_db;
   ```
3. **Optional**: Run the provided `database-setup.sql` for sample data

### Step 2: Start Backend
1. **Double-click** `start-backend.bat` 
   OR
2. **Manual start**:
   ```bash
   cd backend
   mvn clean install
   mvn spring-boot:run
   ```
3. **Verify**: Backend runs on `http://localhost:8080`
4. **Check API docs**: `http://localhost:8080/swagger-ui.html`

### Step 3: Start Frontend
1. **Double-click** `start-frontend.bat`
   OR
2. **Manual start**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
3. **Access app**: `http://localhost:3000`

## 🔑 Default Login Credentials

### Admin
- **Email**: admin@tours.com
- **Password**: admin123
- **Role**: Admin

### Sample Tour Guide (if using sample data)
- **Email**: rohit@tours.com  
- **Password**: guide123
- **Role**: Tour Guide

### Sample Customer (if using sample data)
- **Email**: sachin@email.com
- **Password**: customer123
- **Role**: Customer

## 📋 First Time Setup Workflow

### 1. Admin Setup (Login as admin first)
- ✅ Add locations (Mumbai, Delhi, Kerala, etc.)
- ✅ Add transport types (Bus, Train, Flight)
- ✅ Add lodge types (Hotel, Villa, Bungalow)
- ✅ Register tour guides

### 2. Tour Guide Setup
- ✅ Login as tour guide
- ✅ Add tours with complete details
- ✅ Set pricing and availability

### 3. Customer Experience
- ✅ Register as customer
- ✅ Browse and search tours
- ✅ Book tours
- ✅ View booking history

## 🛠️ Troubleshooting

### Backend Issues
- **Port 8080 busy**: Change port in `application.properties`
- **Database connection**: Check MySQL is running and credentials
- **Build fails**: Ensure Java 17+ is installed

### Frontend Issues  
- **Port 3000 busy**: Use `npm run dev -- --port 3001`
- **Dependencies**: Run `npm cache clean --force` then `npm install`
- **API calls fail**: Ensure backend is running on port 8080

### Database Issues
- **Connection refused**: Start MySQL service
- **Database not found**: Create `tours_travel_db` database
- **Permission denied**: Check MySQL user permissions

## 🎯 Key Features to Test

### Admin Dashboard
- ✅ Location management
- ✅ Transport management  
- ✅ Lodge management
- ✅ Tour guide registration
- ✅ View all bookings
- ✅ View all customers

### Tour Guide Dashboard
- ✅ Add new tours
- ✅ View my tours
- ✅ View tour bookings
- ✅ Manage tour details

### Customer Dashboard
- ✅ Browse tours
- ✅ Search tours
- ✅ Book tours
- ✅ View booking history
- ✅ View tour details

## 📱 Application URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080
- **API Documentation**: http://localhost:8080/swagger-ui.html
- **Database**: localhost:3306/tours_travel_db

## 🔧 Configuration Files

### Backend Configuration
- `backend/src/main/resources/application.properties`
- Database URL, credentials, JPA settings

### Frontend Configuration  
- `frontend/src/services/api.ts`
- API base URL configuration

## 📞 Support

If you encounter any issues:
1. Check the main `README.md` for detailed troubleshooting
2. Verify all prerequisites are installed
3. Check console logs for error messages
4. Ensure all services are running on correct ports

---

**🎉 Congratulations! Your Tours and Travel Management System is ready to use!**