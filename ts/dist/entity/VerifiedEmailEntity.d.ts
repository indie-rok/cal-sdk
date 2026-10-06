import { CalEntityBase } from '../CalEntityBase';
import type { CalSDK } from '../CalSDK';
import type { Control } from '../types';
import type { VerifiedEmail, VerifiedEmailLoadMatch, VerifiedEmailListMatch, VerifiedEmailCreateData } from '../CalTypes';
declare class VerifiedEmailEntity extends CalEntityBase<VerifiedEmail> {
    constructor(client: CalSDK, entopts: any);
    make(this: VerifiedEmailEntity): VerifiedEmailEntity;
    load(this: any, reqmatch?: VerifiedEmailLoadMatch, ctrl?: Control): Promise<VerifiedEmailEntity>;
    list(this: any, reqmatch?: VerifiedEmailListMatch, ctrl?: Control): Promise<VerifiedEmailEntity[]>;
    create(this: any, reqdata?: VerifiedEmailCreateData, ctrl?: Control): Promise<VerifiedEmailEntity>;
}
export { VerifiedEmailEntity };
