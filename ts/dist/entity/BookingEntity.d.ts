import { CalEntityBase } from '../CalEntityBase';
import type { CalSDK } from '../CalSDK';
import type { Control } from '../types';
import type { Booking, BookingLoadMatch, BookingListMatch, BookingCreateData, BookingUpdateData } from '../CalTypes';
declare class BookingEntity extends CalEntityBase<Booking> {
    constructor(client: CalSDK, entopts: any);
    make(this: BookingEntity): BookingEntity;
    load(this: any, reqmatch?: BookingLoadMatch, ctrl?: Control): Promise<BookingEntity>;
    list(this: any, reqmatch?: BookingListMatch, ctrl?: Control): Promise<BookingEntity[]>;
    create(this: any, reqdata?: BookingCreateData, ctrl?: Control): Promise<BookingEntity>;
    update(this: any, reqdata?: BookingUpdateData, ctrl?: Control): Promise<BookingEntity>;
}
export { BookingEntity };
