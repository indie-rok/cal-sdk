import { CalEntityBase } from '../CalEntityBase';
import type { CalSDK } from '../CalSDK';
import type { Control } from '../types';
import type { Schedule, ScheduleLoadMatch, ScheduleListMatch, ScheduleCreateData, ScheduleUpdateData, ScheduleRemoveMatch } from '../CalTypes';
declare class ScheduleEntity extends CalEntityBase<Schedule> {
    constructor(client: CalSDK, entopts: any);
    make(this: ScheduleEntity): ScheduleEntity;
    load(this: any, reqmatch?: ScheduleLoadMatch, ctrl?: Control): Promise<ScheduleEntity>;
    list(this: any, reqmatch?: ScheduleListMatch, ctrl?: Control): Promise<ScheduleEntity[]>;
    create(this: any, reqdata?: ScheduleCreateData, ctrl?: Control): Promise<ScheduleEntity>;
    update(this: any, reqdata?: ScheduleUpdateData, ctrl?: Control): Promise<ScheduleEntity>;
    remove(this: any, reqmatch?: ScheduleRemoveMatch, ctrl?: Control): Promise<ScheduleEntity>;
}
export { ScheduleEntity };
