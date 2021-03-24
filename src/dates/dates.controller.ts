import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";

import { DatesService } from './dates.service';

@Controller('dates')
export class DatesController {
    constructor(private readonly datesService: DatesService) { }

    @Post()
    async addDate(
        @Body('day') day: number,
        @Body('month') month: number,
        @Body('year') year: number,
        @Body('hour') hour: number,
        @Body('minute') minute: number,
        @Body('userName') userName: string
    ) {
        const generatedId = await this.datesService.insertDate(
            day,
            month,
            year,
            hour,
            minute,
            userName,
        );
        return { id: generatedId }
    }

    @Get()
    async getAllDates() {
        const dates = await this.datesService.getDates();
        return dates;
    }

    @Get(':id')
    getDate(@Param('id') dateId: string) {
        return this.datesService.getSingleDate(dateId);
    }

    @Patch(':id')
    async updateDate(
        @Param('id') dateId: string,
        @Body('day') day: number,
        @Body('month') month: number,
        @Body('year') year: number,
        @Body('hour') hour: number,
        @Body('minute') minute: number,
        @Body('user-name') userName: string
    ) {
        await this.datesService.updateDate(
            dateId,
            day,
            month,
            year,
            hour,
            minute,
            userName,
        )
        return null;
    }

    @Delete(':id')
    async removeDate(@Param('id') dateId: string) {
        await this.datesService.deleteDate(dateId);
        return null;
    }
}