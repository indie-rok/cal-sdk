import { CalEntityBase } from '../CalEntityBase';
import type { CalSDK } from '../CalSDK';
import type { Control } from '../types';
import type { EventType, EventTypeLoadMatch, EventTypeListMatch, EventTypeCreateData, EventTypeUpdateData, EventTypeRemoveMatch } from '../CalTypes';
declare class EventTypeEntity extends CalEntityBase<EventType> {
    constructor(client: CalSDK, entopts: any);
    make(this: EventTypeEntity): EventTypeEntity;
    load(this: any, reqmatch?: EventTypeLoadMatch, ctrl?: Control): Promise<EventTypeEntity>;
    list(this: any, reqmatch?: EventTypeListMatch, ctrl?: Control): Promise<EventTypeEntity[]>;
    create(this: any, reqdata?: EventTypeCreateData, ctrl?: Control): Promise<EventTypeEntity>;
    update(this: any, reqdata?: EventTypeUpdateData, ctrl?: Control): Promise<EventTypeEntity>;
    remove(this: any, reqmatch?: EventTypeRemoveMatch, ctrl?: Control): Promise<EventTypeEntity>;
}
export { EventTypeEntity };
