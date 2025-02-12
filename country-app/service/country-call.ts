import axios from 'axios';
import { CountryItems } from './types';

const API_BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
const token = process.env.EXPO_PUBLIC_API_TOKEN;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: token ? { Authorization: `Bearer ${token}` } : {},
});

export const CountryService = {
  async getAllCountries(): Promise<CountryItems[]> {
    try {
      const response = await apiClient.get('/countries');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching countries:', error);
      return [];
    }
  },

  async getSingleCountry(name: string): Promise<CountryItems | null> {
    try {
      const response = await apiClient.get(`/countries/${name}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching country:', error);
      return null;
    }
  },
};