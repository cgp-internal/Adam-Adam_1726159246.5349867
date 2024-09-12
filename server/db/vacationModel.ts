import sqlite3 from 'sqlite3';

interface Vacation {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  startDate: Date;
  endDate: Date;
}

class VacationModel {
  private db: sqlite3.Database;

  constructor(dbPath: string) {
    this.db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error(err);
      } else {
        this.createTableIfNotExists();
      }
    });
  }

  private createTableIfNotExists(): void {
    const query = `
      CREATE TABLE IF NOT EXISTS vacations (
        id INTEGER PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        price REAL NOT NULL,
        location TEXT NOT NULL,
        startDate DATE NOT NULL,
        endDate DATE NOT NULL
      );
    `;
    this.db.run(query, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }

  async getAllVacations(): Promise<Vacation[]> {
    const query = 'SELECT * FROM vacations';
    return new Promise((resolve, reject) => {
      this.db.all(query, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  async getVacationById(id: number): Promise<Vacation | null> {
    const query = 'SELECT * FROM vacations WHERE id = ?';
    return new Promise((resolve, reject) => {
      this.db.get(query, id, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  async addVacation(vacation: Vacation): Promise<number> {
    const query = `
      INSERT INTO vacations (title, description, price, location, startDate, endDate)
      VALUES (?, ?, ?, ?, ?, ?);
    `;
    return new Promise((resolve, reject) => {
      this.db.run(query, vacation.title, vacation.description, vacation.price, vacation.location, vacation.startDate, vacation.endDate, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(this.db.lastID);
        }
      });
    });
  }

  async editVacation(vacation: Vacation): Promise<void> {
    const query = `
      UPDATE vacations SET title = ?, description = ?, price = ?, location = ?, startDate = ?, endDate = ?
      WHERE id = ?;
    `;
    return new Promise((resolve, reject) => {
      this.db.run(query, vacation.title, vacation.description, vacation.price, vacation.location, vacation.startDate, vacation.endDate, vacation.id, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  async deleteVacation(id: number): Promise<void> {
    const query = 'DELETE FROM vacations WHERE id = ?';
    return new Promise((resolve, reject) => {
      this.db.run(query, id, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

export { VacationModel };