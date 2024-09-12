import React from 'react';
import useVacationStore from '../store/vacationStore';

interface Props {
  id: number;
}

const VacationDetail: React.FC<Props> = ({ id }) => {
  const { getVacationById } = useVacationStore();
  const [vacation, setVacation] = React.useState<Vacation | null>(null);

  React.useEffect(() => {
    const fetchVacation = async () => {
      const vacation = await getVacationById(id);
      setVacation(vacation);
    };
    fetchVacation();
  }, [id, getVacationById]);

  if (!vacation) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{vacation.title}</h1>
      <p>{vacation.description}</p>
    </div>
  );
};

export default VacationDetail;