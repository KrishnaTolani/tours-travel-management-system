# 🌍 Tours & Travel Management System

A complete full-stack web application for managing tours, bookings, and travel experiences with YouTube video backgrounds, email notifications, and modern UI design.

## 🚀 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **React Router DOM** for navigation
- **Bootstrap 5** for responsive design
- **Axios** for API communication
- **YouTube Integration** for background videos

### Backend
- **Spring Boot 3.3.0** (Java 17)
- **Spring Security** with JWT authentication
- **Spring Data JPA** for database operations
- **Spring Mail** for email notifications
- **H2 Database** (file-based, persistent)
- **Swagger/OpenAPI** for API documentation
- **Maven** for dependency management

### DevOps & Deployment
- **Docker** containerization
- **Volume mounting** for data persistence

## 🎯 Features

### Core Functionality
- ✅ **User Management** - Registration, Login, Role-based access (Admin, Tour Guide, Customer)
- ✅ **Tour Management** - CRUD operations for tours with locations, guides, and pricing
- ✅ **Booking System** - Tour reservations with ticket management
- ✅ **Location Management** - From/To destinations
- ✅ **Transport & Lodge** - Accommodation and travel options
- ✅ **Admin Dashboard** - Complete system management
- ✅ **Tour Guide Dashboard** - Guide-specific operations
- ✅ **Customer Dashboard** - User booking history

### UI/UX Features
- ✅ **YouTube Video Backgrounds** - Immersive landing page experience
- ✅ **Responsive Design** - Mobile-first approach with Bootstrap
- ✅ **Modern Animations** - Smooth transitions and hover effects
- ✅ **Developer Section** - Meet the team showcase
- ✅ **Enhanced Price Display** - Better visibility and styling
- ✅ **Interactive Cards** - Hover effects and animations

### Email Notifications
- ✅ **Tour Guide Welcome Email** - Login credentials sent when registered by admin
- ✅ **Booking Confirmation Email** - Detailed booking information sent to customers
- ✅ **Gmail SMTP Integration** - Professional email delivery

## 🛠️ Quick Start

### Prerequisites
- **Docker Desktop** installed and running
- **Git** for version control

### 🐳 Docker Deployment (Recommended)

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd tours-and-travels
```

2. **Configure Email (Optional)**
Edit `backend/src/main/resources/application.properties`:
```properties
spring.mail.username=your-email@gmail.com
spring.mail.password=your-gmail-app-password
```

3. **Build and Run**
```bash
# Build backend
cd backend
.\mvnw.cmd clean package -DskipTests
cd ..

# Build frontend
cd frontend
npm install
npm run build
cd ..

# Run with Docker
docker run -d --name tours-app -p 8081:8081 -p 5174:5174 -v "%cd%\data:/app/data" -v "%cd%\backend\target:/app/backend" -v "%cd%\frontend\dist:/app/frontend" openjdk:17-jdk-slim bash -c "apt-get update && apt-get install -y python3 && cd /app/frontend && python3 -m http.server 5174 & cd /app/backend && java -jar *.jar"
```

### 📱 Access Points
- **Frontend**: http://localhost:5174
- **Backend API**: http://localhost:8081
- **H2 Database Console**: http://localhost:8081/h2-console
- **API Documentation**: http://localhost:8081/swagger-ui.html

### 🗄️ Database Access
- **JDBC URL**: `jdbc:h2:file:./data/tours_travel_db`
- **Username**: `sa`
- **Password**: (empty)

## 🔄 Development Workflow

### Making Changes
1. **Edit Code** - Make your changes to frontend/backend
2. **Rebuild Applications**
```bash
cd backend && .\mvnw.cmd clean package -DskipTests && cd ..
cd frontend && npm run build && cd ..
```
3. **Restart Container**
```bash
docker stop tours-app && docker rm tours-app
docker run -d --name tours-app -p 8081:8081 -p 5174:5174 -v "%cd%\data:/app/data" -v "%cd%\backend\target:/app/backend" -v "%cd%\frontend\dist:/app/frontend" openjdk:17-jdk-slim bash -c "apt-get update && apt-get install -y python3 && cd /app/frontend && python3 -m http.server 5174 & cd /app/backend && java -jar *.jar"
```

### Useful Commands
```bash
# View container logs
docker logs -f tours-app

# Stop application
docker stop tours-app && docker rm tours-app

# Check container status
docker ps
```

## 🔐 User Roles & Access

### Admin
- **Login**: admin@tours.com / (check H2 console for password)
- **Access**: Complete system management, user creation, tour management

### Tour Guide
- **Registration**: Created by admin, receives email with credentials
- **Access**: Manage assigned tours, view bookings

### Customer
- **Registration**: Self-registration available
- **Access**: Browse tours, make bookings, view booking history

## 📊 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Tours
- `GET /api/tours/all` - Get all active tours
- `POST /api/tours/add` - Add new tour (Admin)
- `GET /api/tours/{id}` - Get tour details

### Bookings
- `POST /api/bookings/book` - Book a tour
- `GET /api/bookings/customer/{id}` - Get customer bookings

### Users
- `GET /api/users/guides` - Get all tour guides
- `GET /api/users/customers` - Get all customers

## 🎨 UI Components

### Video Backgrounds
- **Landing Page Hero**: YouTube video with overlay
- **About Section**: YouTube video with light overlay for better text readability

### Enhanced Features
- **Price Tags**: Red gradient with white borders for better visibility
- **Developer Cards**: Hover animations and professional styling
- **Navigation**: Modern glass-morphism design
- **Responsive Layout**: Mobile-first Bootstrap implementation

## 👥 Development Team

### Developers
- **Krishna Tolani** - Full Stack Developer (Super 30 Batch)
- **Sujal Samadiya** - Full Stack Developer (Super 30 Batch)

## 📁 Project Structure
```
tours-and-travels/
├── backend/                 # Spring Boot application
│   ├── src/main/java/      # Java source code
│   ├── src/main/resources/ # Configuration files
│   └── pom.xml             # Maven dependencies
├── frontend/               # React TypeScript application
│   ├── src/components/     # React components
│   ├── src/services/       # API services
│   └── package.json        # NPM dependencies
├── data/                   # H2 database files
├── docker-compose.yml      # Docker orchestration
├── Dockerfile             # Container configuration
└── README.md              # This file
```

## 🔧 Configuration Files

### Email Setup (Gmail)
1. Enable 2-factor authentication on Gmail
2. Generate App Password for "Mail"
3. Update `application.properties` with your credentials

### Database Configuration
- **Type**: H2 (File-based, persistent)
- **Location**: `./data/tours_travel_db`
- **Auto-creates tables**: Yes (via JPA)

## 🚀 Deployment Notes

### Docker Benefits
- **Single Command Deployment**: Everything runs in one container
- **Data Persistence**: Database survives container restarts
- **Port Mapping**: Frontend (5174) and Backend (8081)
- **Volume Mounting**: Code and data persistence

### Production Considerations
- Update email credentials for production
- Configure proper CORS origins
- Use external database for production
- Set up proper logging and monitoring

## 📝 License

This project is developed for educational purposes as part of the Super 30 Batch program.

---

**🌟 Happy Traveling! 🚀**