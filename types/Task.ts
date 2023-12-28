import { IProject } from './Project';

export interface ITasksList {
    items: ITask[],
    total?: number
}

export interface ITask {
    id?:string;
    name: string;
    description?: string;
    dueDate?: Date | string;
    priority?: PRIORITY;
    reminders?: IReminders; // not available in free version
    label?: string | LABELS;
    location?: Location; // not available in free version
    project?: IProject;
}

export interface IReminders {
    name:  string;
}

export enum PRIORITY {
    HIGH = 'Priority 1',
    MEDIUM = 'Priority 2',
    LOW = 'Priority 3',
    LOWEST = 'Priority 4',
    UNKNOWN = 'Unknown'
}

export enum LABELS {
    HOME = 'home',
    WORK = 'work',
    OTHER = 'other',
}




