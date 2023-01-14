import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_HOST,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 3000,
});
