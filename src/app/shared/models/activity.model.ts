import { Week } from './week.model';

export class Activity {
	constructor(
    public id: number, 
    public category: number,
    public comment: string,
    public date: number,
    public distance: number,
    public planned: number,
    public status: number,
    public time: number,
    public type: number
	) {}
}