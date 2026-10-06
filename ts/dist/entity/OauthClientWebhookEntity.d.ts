import { CalEntityBase } from '../CalEntityBase';
import type { CalSDK } from '../CalSDK';
import type { Control } from '../types';
import type { OauthClientWebhook, OauthClientWebhookLoadMatch, OauthClientWebhookListMatch, OauthClientWebhookCreateData, OauthClientWebhookUpdateData, OauthClientWebhookRemoveMatch } from '../CalTypes';
declare class OauthClientWebhookEntity extends CalEntityBase<OauthClientWebhook> {
    constructor(client: CalSDK, entopts: any);
    make(this: OauthClientWebhookEntity): OauthClientWebhookEntity;
    load(this: any, reqmatch?: OauthClientWebhookLoadMatch, ctrl?: Control): Promise<OauthClientWebhookEntity>;
    list(this: any, reqmatch?: OauthClientWebhookListMatch, ctrl?: Control): Promise<OauthClientWebhookEntity[]>;
    create(this: any, reqdata?: OauthClientWebhookCreateData, ctrl?: Control): Promise<OauthClientWebhookEntity>;
    update(this: any, reqdata?: OauthClientWebhookUpdateData, ctrl?: Control): Promise<OauthClientWebhookEntity>;
    remove(this: any, reqmatch?: OauthClientWebhookRemoveMatch, ctrl?: Control): Promise<OauthClientWebhookEntity>;
}
export { OauthClientWebhookEntity };
