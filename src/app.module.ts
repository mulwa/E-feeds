import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompanyModule } from './company/company.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedCategoryModule } from './feed-category/feed-category.module';
import { FeedProductModule } from './feed-product/feed-product.module';
import { ConfigModule,ConfigService } from '@nestjs/config';

@Module({
  imports: [CompanyModule,
     ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: configService.get<string>('NODE_ENV') !== 'production', // disable in prod
      }),
    }),
    FeedCategoryModule,
    FeedProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
