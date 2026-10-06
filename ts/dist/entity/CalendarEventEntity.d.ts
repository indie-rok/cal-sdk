import { CalEntityBase } from '../CalEntityBase';
import type { CalSDK } from '../CalSDK';
import type { Control } from '../types';
import type { CalendarEvent, CalendarEventLoadMatch, CalendarEventListMatch, CalendarEventCreateData, CalendarEventUpdateData, CalendarEventRemoveMatch } from '../CalTypes';
declare class CalendarEventEntity extends CalEntityBase<CalendarEvent> {
    constructor(client: CalSDK, entopts: any);
    make(this: CalendarEventEntity): CalendarEventEntity;
    load(this: any, reqmatch?: CalendarEventLoadMatch, ctrl?: Control): Promise<CalendarEventEntity>;
    list(this: any, reqmatch?: CalendarEventListMatch, ctrl?: Control): Promise<CalendarEventEntity[]>;
    create(this: any, reqdata?: CalendarEventCreateData, ctrl?: Control): Promise<CalendarEventEntity>;
    update(this: any, reqdata?: CalendarEventUpdateData, ctrl?: Control): Promise<CalendarEventEntity>;
    remove(this: any, reqmatch?: CalendarEventRemoveMatch, ctrl?: Control): Promise<CalendarEventEntity>;
}
export { CalendarEventEntity };
