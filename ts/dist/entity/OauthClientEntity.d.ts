import { CalEntityBase } from '../CalEntityBase';
import type { CalSDK } from '../CalSDK';
import type { Control } from '../types';
import type { OauthClient, OauthClientLoadMatch, OauthClientListMatch, OauthClientCreateData, OauthClientUpdateData, OauthClientRemoveMatch } from '../CalTypes';
declare class OauthClientEntity extends CalEntityBase<OauthClient> {
    constructor(client: CalSDK, entopts: any);
    make(this: OauthClientEntity): OauthClientEntity;
    load(this: any, reqmatch?: OauthClientLoadMatch, ctrl?: Control): Promise<OauthClientEntity>;
    list(this: any, reqmatch?: OauthClientListMatch, ctrl?: Control): Promise<OauthClientEntity[]>;
    create(this: any, reqdata?: OauthClientCreateData, ctrl?: Control): Promise<OauthClientEntity>;
    update(this: any, reqdata?: OauthClientUpdateData, ctrl?: Control): Promise<OauthClientEntity>;
    remove(this: any, reqmatch?: OauthClientRemoveMatch, ctrl?: Control): Promise<OauthClientEntity>;
}
export { OauthClientEntity };
