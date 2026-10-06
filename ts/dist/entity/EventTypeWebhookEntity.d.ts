import { CalEntityBase } from '../CalEntityBase';
import type { CalSDK } from '../CalSDK';
import type { Control } from '../types';
import type { EventTypeWebhook, EventTypeWebhookLoadMatch, EventTypeWebhookListMatch, EventTypeWebhookCreateData, EventTypeWebhookUpdateData, EventTypeWebhookRemoveMatch } from '../CalTypes';
declare class EventTypeWebhookEntity extends CalEntityBase<EventTypeWebhook> {
    constructor(client: CalSDK, entopts: any);
    make(this: EventTypeWebhookEntity): EventTypeWebhookEntity;
    load(this: any, reqmatch?: EventTypeWebhookLoadMatch, ctrl?: Control): Promise<EventTypeWebhookEntity>;
    list(this: any, reqmatch?: EventTypeWebhookListMatch, ctrl?: Control): Promise<EventTypeWebhookEntity[]>;
    create(this: any, reqdata?: EventTypeWebhookCreateData, ctrl?: Control): Promise<EventTypeWebhookEntity>;
    update(this: any, reqdata?: EventTypeWebhookUpdateData, ctrl?: Control): Promise<EventTypeWebhookEntity>;
    remove(this: any, reqmatch?: EventTypeWebhookRemoveMatch, ctrl?: Control): Promise<EventTypeWebhookEntity>;
}
export { EventTypeWebhookEntity };
