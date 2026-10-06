import { CalEntityBase } from '../CalEntityBase';
import type { CalSDK } from '../CalSDK';
import type { Control } from '../types';
import type { DestinationCalendar, DestinationCalendarUpdateData } from '../CalTypes';
declare class DestinationCalendarEntity extends CalEntityBase<DestinationCalendar> {
    constructor(client: CalSDK, entopts: any);
    make(this: DestinationCalendarEntity): DestinationCalendarEntity;
    update(this: any, reqdata?: DestinationCalendarUpdateData, ctrl?: Control): Promise<DestinationCalendarEntity>;
}
export { DestinationCalendarEntity };
