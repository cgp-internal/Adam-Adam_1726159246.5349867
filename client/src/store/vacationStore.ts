import { useState, useEffect } from 'react';
import Axios from 'axios';

interface Vacation {
  id: number;
  title: string;
  description: string;
}

const useVacationStore = () => {
  const [vacations, setVacations] = useState<Vacation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVacations = async () => {
      try {
        const response = await Axios.get('http://localhost:3001/api/vacations');
        setVacations(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchVacations();
  }, []);

  const getAllVacations = async (): Promise<Vacation[]> => {
    try {
      const response = await Axios.get('http://localhost:3001/api/vacations');
      return response.data;
    } catch (err) {
      return [];
    }
  };

  const getVacationById = async (id: number): Promise<Vacation | null> => {
    try {
      const response = await Axios.get(`http://localhost:3001/api/vacations/${id}`);
      return response.data;
    } catch (err) {
      return null;
    }
  };

  const addVacation = async (vacation: Vacation): Promise<number> => {
    try {
      const response = await Axios.post('http://localhost:3001/api/vacations', vacation);
      return response.data.id;
    } catch (err) {
      return -1;
    }
  };

  const editVacation = async (vacation: Vacation): Promise<void> => {
    try {
      await Axios.put(`http://localhost:3001/api/vacations/${vacation.id}`, vacation);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteVacation = async (id: number): Promise<void> => {
    try {
      await Axios.delete(`http://localhost:3001/api/vacations/${id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return {
    vacations,
    loading,
    error,
    getAllVacations,
    getVacationById,
    addVacation,
    editVacation,
    deleteVacation,
  };
};

export default useVacationStore;