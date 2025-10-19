# Tours and Travel Management System

A comprehensive web application for managing tours and travel bookings built with Spring Boot (Backend) and React TypeScript (Frontend).

## Features

### User Roles
- **Admin**: Manage locations, transports, lodges, tour guides, view all bookings and customers
- **Tour Guide**: Add and manage tours, view bookings for their tours
- **Customer**: Browse tours, book tours, view booking history

### Core Functionalities
- User authentication and authorization
- Tour search and filtering
- Tour booking with payment simulation
- Location, transport, and lodge management
- Comprehensive dashboard for each user role
- Responsive design with Bootstrap

## Technology Stack

### Backend
- Spring Boot 3.3.0
- Spring Data JPA
- Spring Security
- MySQL Database
- Maven
- Swagger/OpenAPI

### Frontend
- React 18
- TypeScript
- React Router
- Axios
- Bootstrap 5
- Vite

## Prerequisites

Before running this application, make sure you have the following installed:

1. **Java 17 or higher**
2. **Node.js 16 or higher**
3. **MySQL 8.0 or higher**
4. **Maven 3.6 or higher**

## Database Setup

1. **Install MySQL** and start the MySQL service

2. **Create Database** (Optional - application will create it automatically):
   ```sql
   CREATE DATABASE tours_travel_db;
   ```

3. **Update Database Configuration** (if needed):
   Edit `backend/src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/tours_travel_db?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true
   spring.datasource.username=root
   spring.datasource.password=root
   ```

## Installation and Setup

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies and run**:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

   The backend will start on `http://localhost:8080`

3. **Verify backend is running**:
   - Visit `http://localhost:8080/swagger-ui.html` for API documentation
   - Default admin credentials: `admin@tours.com` / `admin123`

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

   The frontend will start on `http://localhost:3000`

## Usage

### Default Admin Account
- **Email**: admin@tours.com
- **Password**: admin123
- **Role**: Admin

### Getting Started

1. **Access the application** at `http://localhost:3000`

2. **Admin Setup** (Login as admin first):
   - Add locations (e.g., Mumbai, Delhi, Kerala)
   - Add transport types (e.g., Bus, Train, Flight)
   - Add lodge types (e.g., Hotel, Villa, Bungalow)
   - Register tour guides

3. **Tour Guide** (Login as tour guide):
   - Add tours with complete details
   - Manage tour bookings

4. **Customer** (Register as customer):
   - Browse and search tours
   - Book tours
   - View booking history

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Tours
- `GET /api/tours/all` - Get all active tours
- `GET /api/tours/search?query={query}` - Search tours
- `GET /api/tours/{id}` - Get tour by ID
- `POST /api/tours/add` - Add new tour (Tour Guide only)

### Bookings
- `POST /api/bookings/book` - Book a tour
- `GET /api/bookings/all` - Get all bookings (Admin only)
- `GET /api/bookings/customer/{id}` - Get customer bookings
- `GET /api/bookings/guide/{id}` - Get tour guide bookings

### Admin APIs
- `GET/POST/PUT/DELETE /api/locations/**` - Location management
- `GET/POST/PUT/DELETE /api/transports/**` - Transport management
- `GET/POST/PUT/DELETE /api/lodges/**` - Lodge management
- `GET /api/users/**` - User management

## Project Structure

```
tours-and-travels/
├── backend/
│   ├── src/main/java/com/tours/
│   │   ├── controller/          # REST Controllers
│   │   ├── service/             # Business Logic
│   │   ├── repository/          # Data Access Layer
│   │   ├── entity/              # JPA Entities
│   │   ├── dto/                 # Data Transfer Objects
│   │   └── config/              # Configuration Classes
│   └── src/main/resources/
│       └── application.properties
├── frontend/
│   ├── src/
│   │   ├── components/          # React Components
│   │   ├── services/            # API Services
│   │   ├── types.ts             # TypeScript Interfaces
│   │   └── App.tsx              # Main App Component
│   └── package.json
└── README.md
```

## Troubleshooting

### Common Issues

1. **Database Connection Error**:
   - Ensure MySQL is running
   - Check database credentials in `application.properties`
   - Verify database exists or enable auto-creation

2. **Port Already in Use**:
   - Backend (8080): Change `server.port` in `application.properties`
   - Frontend (3000): Use `npm run dev -- --port 3001`

3. **CORS Issues**:
   - Ensure backend CORS configuration allows frontend origin
   - Check `SecurityConfig.java` for CORS settings

4. **Build Errors**:
   - Ensure Java 17+ and Node.js 16+ are installed
   - Clear Maven cache: `mvn clean`
   - Clear npm cache: `npm cache clean --force`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.