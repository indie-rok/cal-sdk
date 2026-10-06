import { CalEntityBase } from '../CalEntityBase';
import type { CalSDK } from '../CalSDK';
import type { Control } from '../types';
import type { Conferencing, ConferencingLoadMatch, ConferencingListMatch, ConferencingCreateData, ConferencingRemoveMatch } from '../CalTypes';
declare class ConferencingEntity extends CalEntityBase<Conferencing> {
    constructor(client: CalSDK, entopts: any);
    make(this: ConferencingEntity): ConferencingEntity;
    load(this: any, reqmatch?: ConferencingLoadMatch, ctrl?: Control): Promise<ConferencingEntity>;
    list(this: any, reqmatch?: ConferencingListMatch, ctrl?: Control): Promise<ConferencingEntity[]>;
    create(this: any, reqdata?: ConferencingCreateData, ctrl?: Control): Promise<ConferencingEntity>;
    remove(this: any, reqmatch?: ConferencingRemoveMatch, ctrl?: Control): Promise<ConferencingEntity>;
}
export { ConferencingEntity };
