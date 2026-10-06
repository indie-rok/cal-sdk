import { CalEntityBase } from '../CalEntityBase';
import type { CalSDK } from '../CalSDK';
import type { Control } from '../types';
import type { OauthToken, OauthTokenCreateData } from '../CalTypes';
declare class OauthTokenEntity extends CalEntityBase<OauthToken> {
    constructor(client: CalSDK, entopts: any);
    make(this: OauthTokenEntity): OauthTokenEntity;
    create(this: any, reqdata?: OauthTokenCreateData, ctrl?: Control): Promise<OauthTokenEntity>;
}
export { OauthTokenEntity };
