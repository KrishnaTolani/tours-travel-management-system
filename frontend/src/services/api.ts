import axios from 'axios';
import type { User, Tour, Location, Transport, Lodge, Booking, ApiResponse } from '../types';

const API_BASE_URL = 'http://localhost:8081/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth APIs
export const authAPI = {
  login: (email: string, password: string, role: string) =>
    api.post<ApiResponse<User>>('/auth/login', { email, password, role }),
  
  register: (userData: Omit<User, 'id' | 'createdAt'> & { password: string }) =>
    api.post<ApiResponse<User>>('/auth/register', userData),
};

// Tour APIs
export const tourAPI = {
  getAllTours: () => api.get<ApiResponse<Tour[]>>('/tours/all'),
  getTourById: (id: number) => api.get<ApiResponse<Tour>>(`/tours/${id}`),
  searchTours: (query: string) => api.get<ApiResponse<Tour[]>>(`/tours/search?query=${query}`),
  addTour: (tourData: any) => api.post<ApiResponse<Tour>>('/tours/add', tourData),
  getToursByGuide: (guideId: number) => api.get<ApiResponse<Tour[]>>(`/tours/guide/${guideId}`),
};

// Location APIs
export const locationAPI = {
  getAllLocations: () => api.get<ApiResponse<Location[]>>('/locations/all'),
  addLocation: (location: Omit<Location, 'id'>) => api.post<ApiResponse<Location>>('/locations/add', location),
  updateLocation: (id: number, location: Omit<Location, 'id'>) => api.put<ApiResponse<Location>>(`/locations/update/${id}`, location),
  deleteLocation: (id: number) => api.delete<ApiResponse<void>>(`/locations/delete/${id}`),
};

// Transport APIs
export const transportAPI = {
  getAllTransports: () => api.get<ApiResponse<Transport[]>>('/transports/all'),
  addTransport: (transport: Omit<Transport, 'id'>) => api.post<ApiResponse<Transport>>('/transports/add', transport),
  updateTransport: (id: number, transport: Omit<Transport, 'id'>) => api.put<ApiResponse<Transport>>(`/transports/update/${id}`, transport),
  deleteTransport: (id: number) => api.delete<ApiResponse<void>>(`/transports/delete/${id}`),
};

// Lodge APIs
export const lodgeAPI = {
  getAllLodges: () => api.get<ApiResponse<Lodge[]>>('/lodges/all'),
  addLodge: (lodge: Omit<Lodge, 'id'>) => api.post<ApiResponse<Lodge>>('/lodges/add', lodge),
  updateLodge: (id: number, lodge: Omit<Lodge, 'id'>) => api.put<ApiResponse<Lodge>>(`/lodges/update/${id}`, lodge),
  deleteLodge: (id: number) => api.delete<ApiResponse<void>>(`/lodges/delete/${id}`),
};

// Booking APIs
export const bookingAPI = {
  bookTour: (tourId: number, customerId: number, tickets: number) =>
    api.post<ApiResponse<Booking>>(`/bookings/book?tourId=${tourId}&customerId=${customerId}&tickets=${tickets}`),
  getAllBookings: () => api.get<ApiResponse<Booking[]>>('/bookings/all'),
  getBookingsByCustomer: (customerId: number) => api.get<ApiResponse<Booking[]>>(`/bookings/customer/${customerId}`),
  getBookingsByGuide: (guideId: number) => api.get<ApiResponse<Booking[]>>(`/bookings/guide/${guideId}`),
};

// User APIs
export const userAPI = {
  getAllUsers: () => api.get<ApiResponse<User[]>>('/users/all'),
  getAllCustomers: () => api.get<ApiResponse<User[]>>('/users/customers'),
  getAllTourGuides: () => api.get<ApiResponse<User[]>>('/users/guides'),
};