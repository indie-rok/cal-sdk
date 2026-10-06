import { CalEntityBase } from '../CalEntityBase';
import type { CalSDK } from '../CalSDK';
import type { Control } from '../types';
import type { Me, MeLoadMatch, MeUpdateData } from '../CalTypes';
declare class MeEntity extends CalEntityBase<Me> {
    constructor(client: CalSDK, entopts: any);
    make(this: MeEntity): MeEntity;
    load(this: any, reqmatch?: MeLoadMatch, ctrl?: Control): Promise<MeEntity>;
    update(this: any, reqdata?: MeUpdateData, ctrl?: Control): Promise<MeEntity>;
}
export { MeEntity };
