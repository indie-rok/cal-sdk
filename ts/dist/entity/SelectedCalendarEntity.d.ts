import { CalEntityBase } from '../CalEntityBase';
import type { CalSDK } from '../CalSDK';
import type { Control } from '../types';
import type { SelectedCalendar, SelectedCalendarCreateData, SelectedCalendarRemoveMatch } from '../CalTypes';
declare class SelectedCalendarEntity extends CalEntityBase<SelectedCalendar> {
    constructor(client: CalSDK, entopts: any);
    make(this: SelectedCalendarEntity): SelectedCalendarEntity;
    create(this: any, reqdata?: SelectedCalendarCreateData, ctrl?: Control): Promise<SelectedCalendarEntity>;
    remove(this: any, reqmatch?: SelectedCalendarRemoveMatch, ctrl?: Control): Promise<SelectedCalendarEntity>;
}
export { SelectedCalendarEntity };
