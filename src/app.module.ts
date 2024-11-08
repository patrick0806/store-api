import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import env from '@config/env';
import { databaseOptions } from '@config/typeorm';
import { JWTAuthGuard, RolesGuard } from '@shared/guards';

import { AuthModule } from '@modules/auth/auth.module';
import { HealthModule } from '@modules/health/health.module';
import { CustomerModule } from '@modules/customer/customer.module';
import { ProductModule } from '@modules/product/product.module';
import { OrderModule } from '@modules/order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [env],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({ ...databaseOptions }),
    HealthModule,
    AuthModule,
    CustomerModule,
    ProductModule,
    RouterModule.register([
      {
        path: 'health',
        module: HealthModule,
      },
      {
        path: 'auth',
        module: AuthModule,
      },
      {
        path: 'customers',
        module: CustomerModule,
      },
      {
        path: 'orders',
        module: OrderModule
      },
      {
        path: 'products',
        module: ProductModule
      }
    ]),
  ],
  controllers: [],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: JWTAuthGuard,
    },
    {
      provide: 'APP_GUARD',
      useClass: RolesGuard,
    },
  ],
})
export class AppModule { }
