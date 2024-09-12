import sqlite3, { Database } from 'sqlite3';

class UserModel {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
    this.createTable();
  }

  private createTable(): void {
    this.db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);
  }

  public async createUser(username: string, email: string, password: string): Promise<void> {
    await this.db.run(`
      INSERT INTO users (username, email, password)
      VALUES (?, ?, ?);
    `, username, email, password);
  }

  public async getUserByUsername(username: string): Promise<any> {
    return await this.db.get(`
      SELECT * FROM users
      WHERE username = ?;
    `, username);
  }

  public async getUserByEmail(email: string): Promise<any> {
    return await this.db.get(`
      SELECT * FROM users
      WHERE email = ?;
    `, email);
  }

  public async getUserById(id: number): Promise<any> {
    return await this.db.get(`
      SELECT * FROM users
      WHERE id = ?;
    `, id);
  }
}

export { UserModel };