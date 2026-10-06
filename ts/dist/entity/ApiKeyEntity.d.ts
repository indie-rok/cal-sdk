import { CalEntityBase } from '../CalEntityBase';
import type { CalSDK } from '../CalSDK';
import type { Control } from '../types';
import type { ApiKey, ApiKeyCreateData } from '../CalTypes';
declare class ApiKeyEntity extends CalEntityBase<ApiKey> {
    constructor(client: CalSDK, entopts: any);
    make(this: ApiKeyEntity): ApiKeyEntity;
    create(this: any, reqdata?: ApiKeyCreateData, ctrl?: Control): Promise<ApiKeyEntity>;
}
export { ApiKeyEntity };
