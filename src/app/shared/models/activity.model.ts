import { Week } from './week.model';

export class Activity {
	constructor(
    public id: number, 
    public category: number,
    public date: number,
    public distance: number,
    public time: number,
    public week_id: Week,
    public type: number
	) {}
}