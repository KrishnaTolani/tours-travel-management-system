export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: 'ADMIN' | 'TOUR_GUIDE' | 'CUSTOMER';
  createdAt: string;
}

export interface Location {
  id: number;
  name: string;
  description: string;
}

export interface Transport {
  id: number;
  name: string;
  description: string;
}

export interface Lodge {
  id: number;
  type: string;
  description: string;
}

export interface Tour {
  id: number;
  name: string;
  description: string;
  fromLocation: Location;
  toLocation: Location;
  tourGuide: User;
  transport: Transport;
  lodge: Lodge;
  lodgeName: string;
  lodgingAddress: string;
  transportDescription: string;
  vehicleRegistration: string;
  totalDays: number;
  availableTickets: number;
  totalTickets: number;
  ticketPrice: number;
  startDate: string;
  endDate: string;
  tourImage: string;
  specialNote: string;
  activities: string;
  meals: string;
  createdAt: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface Booking {
  id: number;
  tour: Tour;
  customer: User;
  ticketsBooked: number;
  totalAmount: number;
  status: 'CONFIRMED' | 'CANCELLED' | 'PENDING';
  bookingDate: string;
  bookingId: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}