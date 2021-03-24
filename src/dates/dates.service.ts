import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { MyDate } from './date.model';

@Injectable()
export class DatesService {

    constructor(
        @InjectModel('MyDate') private readonly productModel: Model<MyDate>
    ) { }

    async insertDate(
        day: number,
        month: number,
        year: number,
        hour: number,
        minute: number,
        userName: string,
    ) {
        const newDate = new this.productModel({
            day,
            month,
            year,
            hour,
            minute,
            userName,
        });
        const result = await newDate.save();

        return result.id as string;
    }

    async getDates() {
        const dates = await this.productModel.find().exec();
        console.log(dates);
        return dates.map((theDate) => ({
            id: theDate.id,
            day: theDate.day,
            month: theDate.month,
            year: theDate.year,
            hour: theDate.hour,
            minute: theDate.minute,
            userName: theDate.userName,
        }));
    }

    async getSingleDate(dateId: string) {
        const theDate = await this.findDate(dateId);
        return {
            id: theDate.id,
            day: theDate.day,
            month: theDate.month,
            year: theDate.year,
            hour: theDate.hour,
            minute: theDate.minute,
            userName: theDate.userName,
        };
    }

    async updateDate(
        dateId: string,
        day: number,
        month: number,
        year: number,
        hour: number,
        minute: number,
        userName: string,
    ) {
        const updatedDate = await this.findDate(dateId);

        if (day) {
            updatedDate.day = day;
        }
        if (month) {
            updatedDate.month = month;
        }
        if (year) {
            updatedDate.year = year;
        }
        if (hour) {
            updatedDate.hour = hour;
        }
        if (minute) {
            updatedDate.minute = minute;
        }
        if (userName) {
            updatedDate.userName = userName;
        }
        updatedDate.save();
    }

    async deleteDate(dateId: string) {
        const result = await this.productModel.deleteOne({ _id: dateId }).exec();
        if (result.n === 0) {
            throw new NotFoundException('Could not find date.');
        }
    }

    private async findDate(id: string): Promise<MyDate> {
        let theDate;
        try {
            theDate = await this.productModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException('Could not find date');
        }
        if (!theDate) {
            throw new NotFoundException('Could not find date');
        }
        return theDate;
    }
}