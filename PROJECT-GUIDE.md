# 🌍 Tours & Travel Management System - Complete Guide

## 🏗️ Project Architecture

### **Backend (Spring Boot - Port 8081)**
```
├── Controllers (REST APIs)
├── Services (Business Logic)  
├── Repositories (Database Access)
├── Entities (Database Tables)
├── Security (Authentication)
└── H2 Database (In-Memory)
```

### **Frontend (React - Port 5175)**
```
├── Components (UI Pages)
├── Services (API Calls)
├── Types (TypeScript Interfaces)
└── Routing (Navigation)
```

## 🔄 How the System Works

### **1. User Authentication Flow**
```
User Login → Backend Validates → Returns User Data → Frontend Stores → Role-Based Access
```

### **2. Data Flow**
```
Frontend Form → API Call → Backend Controller → Service Layer → Repository → Database
Database → Repository → Service → Controller → API Response → Frontend Update
```

### **3. Three User Roles**

#### **🔧 ADMIN (admin@tours.com / admin123)**
- **Purpose**: System management and setup
- **Capabilities**:
  - Add/manage locations (Mumbai, Delhi, Kerala)
  - Add/manage transport types (Bus, Train, Flight)
  - Add/manage lodge types (Hotel, Villa, Resort)
  - Register tour guides
  - View all bookings and customers
  - System oversight

#### **👨‍🏫 TOUR GUIDE**
- **Purpose**: Create and manage tours
- **Capabilities**:
  - Add new tours with complete details
  - Set pricing and availability
  - Manage tour bookings
  - View customer bookings for their tours
  - Update tour information

#### **🧳 CUSTOMER**
- **Purpose**: Browse and book tours
- **Capabilities**:
  - Browse all available tours
  - Search tours by name/location
  - View detailed tour information
  - Book tours with ticket selection
  - View booking history and status
  - Manage personal bookings

## 📋 Step-by-Step Testing Guide

### **Phase 1: Admin Setup (CRITICAL - Do This First!)**
1. **Login as Admin**: 
   - Email: `admin@tours.com`
   - Password: `admin123`
   - Role: `Admin`

2. **Add Locations** (Required for tours):
   ```
   - Mumbai (Financial capital of India)
   - Delhi (Capital city with rich history)
   - Kerala (God's own country)
   - Goa (Beach destination)
   - Rajasthan (Land of kings)
   ```

3. **Add Transport Types**:
   ```
   - Bus (Road transport)
   - Train (Railway connectivity)
   - Flight (Air travel)
   - Car (Private transport)
   ```

4. **Add Lodge Types**:
   ```
   - Hotel (Standard accommodation)
   - Villa (Private villa stays)
   - Resort (Full-service resorts)
   - Bungalow (Cozy accommodations)
   ```

5. **Register Tour Guides**:
   ```
   Name: John Traveller
   Email: john@tours.com
   Password: guide123
   Phone: 9876543210
   Address: Mumbai, India
   ```

### **Phase 2: Tour Guide Operations**
1. **Login as Tour Guide**:
   - Use the credentials you created in admin panel

2. **Add Tours** (Create 2-3 tours):
   ```
   Tour 1:
   - Name: "Mumbai to Goa Beach Tour"
   - From: Mumbai → To: Goa
   - Transport: Bus
   - Lodge: Resort
   - Price: ₹15,000
   - Duration: 3 days
   - Tickets: 20
   
   Tour 2:
   - Name: "Delhi Heritage Tour"
   - From: Delhi → To: Rajasthan
   - Transport: Train
   - Lodge: Hotel
   - Price: ₹12,000
   - Duration: 4 days
   - Tickets: 15
   ```

3. **View Tour Bookings**: Check customer bookings

### **Phase 3: Customer Experience**
1. **Register New Customer**:
   ```
   Name: Sarah Customer
   Email: sarah@email.com
   Password: customer123
   Phone: 8765432109
   Address: Pune, India
   ```

2. **Browse Tours**: View all available tours

3. **Search Tours**: Test search functionality

4. **Book Tours**: 
   - Select a tour
   - Choose number of tickets
   - Complete booking
   - View confirmation

5. **View Dashboard**: Check booking history

## 🔧 Troubleshooting Common Issues

### **"Error adding location" Fix**
1. **Check Backend**: Ensure running on port 8081
2. **Check Console**: Open browser dev tools (F12)
3. **CORS Issue**: Restart backend after CORS fix
4. **API URL**: Verify frontend points to correct backend port

### **Backend Not Starting**
- **Port Issue**: Change to different port in `application.properties`
- **Database**: Using H2 in-memory (no MySQL needed)
- **Dependencies**: Let IntelliJ download automatically

### **Frontend Not Loading**
- **Port**: Frontend runs on 5175 (or available port)
- **Dependencies**: Run `npm install` if needed
- **Cache**: Clear browser cache

## 🌐 Important URLs

- **Frontend**: http://localhost:5175
- **Backend API**: http://localhost:8081
- **API Documentation**: http://localhost:8081/swagger-ui.html
- **Database Console**: http://localhost:8081/h2-console
  - JDBC URL: `jdbc:h2:mem:testdb`
  - Username: `sa`
  - Password: (empty)

## 📊 Database Tables Created Automatically

1. **users** - Admin, Tour Guides, Customers
2. **locations** - Tour destinations
3. **transports** - Transport types
4. **lodges** - Accommodation types
5. **tours** - Tour packages
6. **bookings** - Customer bookings

## 🎯 Success Indicators

✅ **Admin can add locations, transports, lodges**
✅ **Tour guides can create and manage tours**
✅ **Customers can browse, search, and book tours**
✅ **All roles can login with proper access control**
✅ **Data persists during session (H2 in-memory)**
✅ **UI is responsive and attractive**

## 🚀 Project Features Implemented

- **Authentication & Authorization**
- **Role-based Access Control**
- **CRUD Operations for all entities**
- **Search and Filter functionality**
- **Booking system with ticket management**
- **Responsive UI with modern design**
- **RESTful API architecture**
- **Database relationships and constraints**
- **Error handling and validation**
- **Swagger API documentation**

**The system is a complete end-to-end tour management platform with all major functionalities working!**