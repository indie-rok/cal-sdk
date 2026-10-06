import { CalEntityBase } from '../CalEntityBase';
import type { CalSDK } from '../CalSDK';
import type { Control } from '../types';
import type { Attendee, AttendeeLoadMatch, AttendeeListMatch, AttendeeCreateData, AttendeeRemoveMatch } from '../CalTypes';
declare class AttendeeEntity extends CalEntityBase<Attendee> {
    constructor(client: CalSDK, entopts: any);
    make(this: AttendeeEntity): AttendeeEntity;
    load(this: any, reqmatch?: AttendeeLoadMatch, ctrl?: Control): Promise<AttendeeEntity>;
    list(this: any, reqmatch?: AttendeeListMatch, ctrl?: Control): Promise<AttendeeEntity[]>;
    create(this: any, reqdata?: AttendeeCreateData, ctrl?: Control): Promise<AttendeeEntity>;
    remove(this: any, reqmatch?: AttendeeRemoveMatch, ctrl?: Control): Promise<AttendeeEntity>;
}
export { AttendeeEntity };
