import { CalEntityBase } from '../CalEntityBase';
import type { CalSDK } from '../CalSDK';
import type { Control } from '../types';
import type { Slot, SlotLoadMatch } from '../CalTypes';
declare class SlotEntity extends CalEntityBase<Slot> {
    constructor(client: CalSDK, entopts: any);
    make(this: SlotEntity): SlotEntity;
    load(this: any, reqmatch?: SlotLoadMatch, ctrl?: Control): Promise<SlotEntity>;
}
export { SlotEntity };
