import React, { useState, useEffect } from 'react';
import VacationDetail from './VacationDetail';
import useVacationStore from '../store/vacationStore';

interface Props {}

const VacationList: React.FC<Props> = () => {
  const { vacations, loading, error, getAllVacations } = useVacationStore();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const fetchVacations = async () => {
      await getAllVacations();
    };
    fetchVacations();
  }, [getAllVacations]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Vacation Listings</h1>
      <ul>
        {vacations.map((vacation) => (
          <li key={vacation.id}>
            <h2>{vacation.title}</h2>
            <p>{vacation.description}</p>
            {authorized && <VacationDetail id={vacation.id} />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VacationList;