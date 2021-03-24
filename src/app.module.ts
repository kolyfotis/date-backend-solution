import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatesModule } from './dates/dates.module';

@Module({
  imports: [DatesModule, MongooseModule.forRoot(
    'mongodb+srv://temp:xtL8AwHrqUThViTu@cluster0.ylei1.mongodb.net/date-test?retryWrites=true&w=majority'
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
