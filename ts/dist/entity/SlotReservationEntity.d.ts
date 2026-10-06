import { CalEntityBase } from '../CalEntityBase';
import type { CalSDK } from '../CalSDK';
import type { Control } from '../types';
import type { SlotReservation, SlotReservationLoadMatch, SlotReservationCreateData, SlotReservationUpdateData, SlotReservationRemoveMatch } from '../CalTypes';
declare class SlotReservationEntity extends CalEntityBase<SlotReservation> {
    constructor(client: CalSDK, entopts: any);
    make(this: SlotReservationEntity): SlotReservationEntity;
    load(this: any, reqmatch?: SlotReservationLoadMatch, ctrl?: Control): Promise<SlotReservationEntity>;
    create(this: any, reqdata?: SlotReservationCreateData, ctrl?: Control): Promise<SlotReservationEntity>;
    update(this: any, reqdata?: SlotReservationUpdateData, ctrl?: Control): Promise<SlotReservationEntity>;
    remove(this: any, reqmatch?: SlotReservationRemoveMatch, ctrl?: Control): Promise<SlotReservationEntity>;
}
export { SlotReservationEntity };
