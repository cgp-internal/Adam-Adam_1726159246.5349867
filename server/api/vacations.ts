import express, { Express, Request, Response } from 'express';
import { VacationModel } from '../db/vacationModel';

const router = express.Router();
const vacationModel = new VacationModel('vacations.db');

router.get('/vacations', async (req: Request, res: Response) => {
  try {
    const vacations = await vacationModel.getAllVacations();
    res.json(vacations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to retrieve vacations' });
  }
});

router.get('/vacations/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const vacation = await vacationModel.getVacationById(id);
    if (!vacation) {
      res.status(404).json({ message: 'Vacation not found' });
    } else {
      res.json(vacation);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to retrieve vacation' });
  }
});

router.post('/vacations', async (req: Request, res: Response) => {
  try {
    const vacation = req.body;
    const id = await vacationModel.addVacation(vacation);
    res.json({ id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create vacation' });
  }
});

router.put('/vacations/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const vacation = req.body;
    await vacationModel.editVacation({ ...vacation, id });
    res.json({ message: 'Vacation updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update vacation' });
  }
});

router.delete('/vacations/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await vacationModel.deleteVacation(id);
    res.json({ message: 'Vacation deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete vacation' });
  }
});

export { router as vacationsRouter };
export async function getVacations(): Promise<any[]> {
  try {
    const vacations = await vacationModel.getAllVacations();
    return vacations;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function getVacation(id: number): Promise<any | null> {
  try {
    const vacation = await vacationModel.getVacationById(id);
    return vacation;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function createVacation(vacation: any): Promise<number> {
  try {
    const id = await vacationModel.addVacation(vacation);
    return id;
  } catch (err) {
    console.error(err);
    return -1;
  }
}

export async function updateVacation(vacation: any): Promise<void> {
  try {
    await vacationModel.editVacation(vacation);
  } catch (err) {
    console.error(err);
  }
}

export async function deleteVacation(id: number): Promise<void> {
  try {
    await vacationModel.deleteVacation(id);
  } catch (err) {
    console.error(err);
  }
}