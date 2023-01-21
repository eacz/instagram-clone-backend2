import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';

@Injectable()
export class DatesService {
  formatHourToZero(date: Date) {
    dayjs.extend(utc);
    return dayjs(date).utcOffset(0).startOf('date').toDate();
  }

  addOne(date: Date, prop: dayjs.ManipulateType, amount: number) {
    return dayjs(date).add(amount, prop).toDate();
  }
}
