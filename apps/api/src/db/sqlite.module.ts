import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from '../users/users.entity';
import { Product } from '../products/products.entity';
import * as bcrypt from 'bcrypt';
import path from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      // database: 'db.sqlite', // Path to your SQLite database - it will be created in the root folder of your project
      database: path.join(__dirname, 'db.sqlite'), // Use path.join to create absolute path
      entities: [User, Product],
      synchronize: true, // Use with caution in production,

      migrationsRun: true,
    }),
  ],
})
export class SqliteModule {
  constructor(private dataSource: DataSource) {
    this.seedDatabase();
  }

  async seedDatabase() {
    await this.seedUsers();
    await this.seedProducts();
  }

  async seedUsers() {
    const userRepository = this.dataSource.getRepository(User);
    const count = await userRepository.count();
    if (count > 0) {
      return;
    }

    const password = await bcrypt.hash('123456', 10);

    await userRepository.save([
      {
        username: 'test',
        password: password,
        fullName: 'Test User',
        email: 'test@example.com',
      },
      {
        username: 'demo',
        password: password,
        fullName: 'Demo User',
        email: 'demo@example.com',
      },
    ]);
    console.log('Users seeded successfully.');
  }

  async seedProducts() {
    const productRepository = this.dataSource.getRepository(Product);
    const count = await productRepository.count();
    if (count > 0) {
      return;
    }
    await productRepository.save([
      {
        name: 'Laptop',
        description: 'High-performance laptop',
        price: 1200.0,
      },
      {
        name: 'Smartphone',
        description: 'Latest model smartphone',
        price: 800.0,
      },
      {
        name: 'Headphones',
        description: 'Noise-cancelling headphones',
        price: 150.0,
      },
    ]);
    console.log('Products seeded successfully.');
  }
}
