import { CalEntityBase } from '../CalEntityBase';
import type { CalSDK } from '../CalSDK';
import type { Control } from '../types';
import type { ManagedUser, ManagedUserLoadMatch, ManagedUserListMatch, ManagedUserCreateData, ManagedUserUpdateData, ManagedUserRemoveMatch } from '../CalTypes';
declare class ManagedUserEntity extends CalEntityBase<ManagedUser> {
    constructor(client: CalSDK, entopts: any);
    make(this: ManagedUserEntity): ManagedUserEntity;
    load(this: any, reqmatch?: ManagedUserLoadMatch, ctrl?: Control): Promise<ManagedUserEntity>;
    list(this: any, reqmatch?: ManagedUserListMatch, ctrl?: Control): Promise<ManagedUserEntity[]>;
    create(this: any, reqdata?: ManagedUserCreateData, ctrl?: Control): Promise<ManagedUserEntity>;
    update(this: any, reqdata?: ManagedUserUpdateData, ctrl?: Control): Promise<ManagedUserEntity>;
    remove(this: any, reqmatch?: ManagedUserRemoveMatch, ctrl?: Control): Promise<ManagedUserEntity>;
}
export { ManagedUserEntity };
