import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { SqliteModule } from './db/sqlite.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    AuthModule,
    ProfilesModule,
    UsersModule,
    SqliteModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
