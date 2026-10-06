import { CalEntityBase } from '../CalEntityBase';
import type { CalSDK } from '../CalSDK';
import type { Control } from '../types';
import type { Calendar, CalendarLoadMatch, CalendarListMatch, CalendarCreateData } from '../CalTypes';
declare class CalendarEntity extends CalEntityBase<Calendar> {
    constructor(client: CalSDK, entopts: any);
    make(this: CalendarEntity): CalendarEntity;
    load(this: any, reqmatch?: CalendarLoadMatch, ctrl?: Control): Promise<CalendarEntity>;
    list(this: any, reqmatch?: CalendarListMatch, ctrl?: Control): Promise<CalendarEntity[]>;
    create(this: any, reqdata?: CalendarCreateData, ctrl?: Control): Promise<CalendarEntity>;
}
export { CalendarEntity };
