import { CalEntityBase } from '../CalEntityBase';
import type { CalSDK } from '../CalSDK';
import type { Control } from '../types';
import type { Stripe, StripeLoadMatch } from '../CalTypes';
declare class StripeEntity extends CalEntityBase<Stripe> {
    constructor(client: CalSDK, entopts: any);
    make(this: StripeEntity): StripeEntity;
    load(this: any, reqmatch?: StripeLoadMatch, ctrl?: Control): Promise<StripeEntity>;
}
export { StripeEntity };
