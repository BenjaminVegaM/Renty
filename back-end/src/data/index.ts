import 'reflect-metadata';

import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.SQLITE3_DB_PATH ?? 'db.sqlite',
  synchronize: true,
  logging: false,
  entities: ['src/data/entity/**/*.ts'],
  migrations: [],
  subscribers: ['src/data/subscribers/**/*.ts'],
});

export default AppDataSource;
