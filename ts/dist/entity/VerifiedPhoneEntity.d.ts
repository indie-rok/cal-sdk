import { CalEntityBase } from '../CalEntityBase';
import type { CalSDK } from '../CalSDK';
import type { Control } from '../types';
import type { VerifiedPhone, VerifiedPhoneLoadMatch, VerifiedPhoneListMatch, VerifiedPhoneCreateData } from '../CalTypes';
declare class VerifiedPhoneEntity extends CalEntityBase<VerifiedPhone> {
    constructor(client: CalSDK, entopts: any);
    make(this: VerifiedPhoneEntity): VerifiedPhoneEntity;
    load(this: any, reqmatch?: VerifiedPhoneLoadMatch, ctrl?: Control): Promise<VerifiedPhoneEntity>;
    list(this: any, reqmatch?: VerifiedPhoneListMatch, ctrl?: Control): Promise<VerifiedPhoneEntity[]>;
    create(this: any, reqdata?: VerifiedPhoneCreateData, ctrl?: Control): Promise<VerifiedPhoneEntity>;
}
export { VerifiedPhoneEntity };
