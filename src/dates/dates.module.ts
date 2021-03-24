import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { DatesController } from './dates.controller';
import { DatesService } from "./dates.service";
import { MyDateSchema } from './date.model';

@Module({
    imports: [MongooseModule.forFeature([{
        name: 'MyDate',
        schema: MyDateSchema
    }])],
    controllers: [DatesController],
    providers: [DatesService],
})
export class DatesModule { }