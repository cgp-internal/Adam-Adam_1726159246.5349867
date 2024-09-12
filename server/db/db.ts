```typescript
import sqlite3 from 'sqlite3';

let db: sqlite3.Database;

const dbConnection = (): sqlite3.Database => {
  if (!db) {
    db = new sqlite3.Database('database.sqlite', (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log('Connected to the SQLite database.');
      }
    });
  }
  return db;
};

export { dbConnection };
```