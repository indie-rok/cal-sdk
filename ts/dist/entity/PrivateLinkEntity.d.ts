import { CalEntityBase } from '../CalEntityBase';
import type { CalSDK } from '../CalSDK';
import type { Control } from '../types';
import type { PrivateLink, PrivateLinkListMatch, PrivateLinkCreateData, PrivateLinkUpdateData, PrivateLinkRemoveMatch } from '../CalTypes';
declare class PrivateLinkEntity extends CalEntityBase<PrivateLink> {
    constructor(client: CalSDK, entopts: any);
    make(this: PrivateLinkEntity): PrivateLinkEntity;
    list(this: any, reqmatch?: PrivateLinkListMatch, ctrl?: Control): Promise<PrivateLinkEntity[]>;
    create(this: any, reqdata?: PrivateLinkCreateData, ctrl?: Control): Promise<PrivateLinkEntity>;
    update(this: any, reqdata?: PrivateLinkUpdateData, ctrl?: Control): Promise<PrivateLinkEntity>;
    remove(this: any, reqmatch?: PrivateLinkRemoveMatch, ctrl?: Control): Promise<PrivateLinkEntity>;
}
export { PrivateLinkEntity };
