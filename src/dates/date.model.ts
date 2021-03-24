import * as mongoose from 'mongoose';

export const MyDateSchema = new mongoose.Schema({
    day: { type: Number, required: true},
    month: { type: Number, required: true},
    year: { type: Number, required: true},
    hour: { type: Number, required: true},
    minute: { type: Number, required: true},
    userName: { type: String, required: true},
})

export interface MyDate extends mongoose.Document {
        id: string;
        day: number;
        month: number;
        year: number;
        hour: number;
        minute: number;
        userName: string;
}