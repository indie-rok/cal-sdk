export interface ApiKey {
    apiKey: string;
    apiKeyDaysValid?: number;
    apiKeyNeverExpires?: boolean;
}
export interface ApiKeyCreateData {
    apiKey: string;
    apiKeyDaysValid?: number;
    apiKeyNeverExpires?: boolean;
}
export interface Attendee {
    absent: boolean;
    displayEmail: string;
    email: string;
    id: number;
    language?: string;
    name: string;
    phoneNumber?: string;
    timeZone: string;
}
export interface AttendeeLoadMatch {
    booking_id: string;
    id: number;
}
export interface AttendeeListMatch {
    booking_id: string;
}
export interface AttendeeCreateData {
    booking_id: string;
    absent: boolean;
    displayEmail: string;
    email: string;
    id: number;
    language?: string;
    name: string;
    phoneNumber?: string;
    timeZone: string;
}
export interface AttendeeRemoveMatch {
    booking_id: string;
    id: number;
}
export interface Booking {
    data: any;
    error?: Record<string, any>;
    id?: string;
    pagination: Record<string, any>;
    status: string;
}
export interface BookingLoadMatch {
    id: string;
    $action?: string;
    [action: string]: any;
}
export interface BookingListMatch {
    after_created_at?: string;
    after_start?: string;
    after_updated_at?: string;
    attendee_email?: string;
    attendee_name?: string;
    before_created_at?: string;
    before_end?: string;
    before_updated_at?: string;
    booking_uid?: string;
    event_type_id?: string;
    skip?: number;
    sort_created?: string;
    sort_end?: string;
    sort_start?: string;
    sort_updated_at?: string;
    status?: any[];
    take?: number;
    team_id?: string;
    teams_id?: string;
    $action?: string;
    [action: string]: any;
}
export interface BookingCreateData {
    data: any;
    error?: Record<string, any>;
    id?: string;
    pagination: Record<string, any>;
    status: string;
    $action?: string;
    [action: string]: any;
}
export interface BookingUpdateData {
    id: string;
    data?: any;
    error?: Record<string, any>;
    pagination?: Record<string, any>;
    status?: string;
    $action?: string;
    [action: string]: any;
}
export interface Calendar {
    connectedCalendars: any[];
    destinationCalendar: Record<string, any>;
    id?: string;
}
export interface CalendarLoadMatch {
    connectedCalendars?: any[];
    destinationCalendar?: Record<string, any>;
    id: string;
    $action?: string;
    [action: string]: any;
}
export interface CalendarListMatch {
    credential_id: number;
    date_from?: string;
    date_to?: string;
    external_id: string;
    logged_in_users_tz?: string;
    time_zone?: string;
    $action?: string;
    [action: string]: any;
}
export interface CalendarCreateData {
    id: string;
    connectedCalendars: any[];
    destinationCalendar: Record<string, any>;
    $action?: string;
    [action: string]: any;
}
export interface CalendarEvent {
    attendees?: any[];
    calendarEventOwner?: any;
    description?: string;
    end: Record<string, any>;
    hosts?: any[];
    id: string;
    locations?: any[];
    source: string;
    start: Record<string, any>;
    status?: string;
    title: string;
}
export interface CalendarEventLoadMatch {
    calendar_provider: string;
    id: string;
    $action?: string;
    [action: string]: any;
}
export interface CalendarEventListMatch {
    calendar_provider: string;
    calendar_id?: string;
    from: string;
    time_zone?: string;
    to: string;
    $action?: string;
    [action: string]: any;
}
export interface CalendarEventCreateData {
    calendar_provider: string;
    attendees?: any[];
    calendarEventOwner?: any;
    description?: string;
    end: Record<string, any>;
    hosts?: any[];
    id: string;
    locations?: any[];
    source: string;
    start: Record<string, any>;
    status?: string;
    title: string;
    $action?: string;
    [action: string]: any;
}
export interface CalendarEventUpdateData {
    calendar_provider: string;
    id: string;
    attendees?: any[];
    calendarEventOwner?: any;
    description?: string;
    end?: Record<string, any>;
    hosts?: any[];
    locations?: any[];
    source?: string;
    start?: Record<string, any>;
    status?: string;
    title?: string;
    $action?: string;
    [action: string]: any;
}
export interface CalendarEventRemoveMatch {
    calendar_provider: string;
    id: string;
    $action?: string;
    [action: string]: any;
}
export interface Conferencing {
    id: number;
    invalid?: boolean;
    type: string;
    userId: number;
}
export interface ConferencingLoadMatch {
    id: number;
    invalid?: boolean;
    type?: string;
    userId?: number;
    $action?: string;
    [action: string]: any;
}
export interface ConferencingListMatch {
    id?: number;
    invalid?: boolean;
    type?: string;
    userId?: number;
}
export interface ConferencingCreateData {
    app: string;
    id: number;
    invalid?: boolean;
    type: string;
    userId: number;
    $action?: string;
    [action: string]: any;
}
export interface ConferencingRemoveMatch {
    app: string;
    $action?: string;
    [action: string]: any;
}
export interface DestinationCalendar {
    credentialId: number;
    delegationCredentialId?: string;
    externalId: string;
    integration: string;
    userId: number;
}
export interface DestinationCalendarUpdateData {
    credentialId?: number;
    delegationCredentialId?: string;
    externalId?: string;
    integration?: string;
    userId?: number;
}
export interface EventType {
    afterEventBuffer?: number;
    allowReschedulingCancelledBookings?: boolean;
    allowReschedulingPastBookings?: boolean;
    beforeEventBuffer?: number;
    bookerActiveBookingsLimit?: any;
    bookerLayouts?: any;
    bookingFields?: any[];
    bookingLimitsCount?: any;
    bookingLimitsDuration?: any;
    bookingRequiresAuthentication?: boolean;
    bookingUrl: string;
    bookingWindow?: any;
    calVideoSettings?: any;
    color: Record<string, any>;
    confirmationPolicy?: any;
    currency: string;
    customName?: string;
    description?: string;
    destinationCalendar: Record<string, any>;
    disableCancelling?: any;
    disableGuests?: boolean;
    disableRescheduling?: any;
    forwardParamsSuccessRedirect: Record<string, any>;
    hidden?: boolean;
    hideCalendarEventDetails?: boolean;
    hideCalendarNotes?: boolean;
    hideOrganizerEmail?: boolean;
    id: number;
    interfaceLanguage?: string;
    isInstantEvent: boolean;
    lengthInMinutes: number;
    lengthInMinutesOptions?: any[];
    locations?: any[];
    lockTimeZoneToggleOnBookingPage?: boolean;
    metadata: Record<string, any>;
    minimumBookingNotice?: number;
    offsetStart?: number;
    onlyShowFirstAvailableSlot?: boolean;
    ownerId: number;
    price: number;
    recurrence?: any;
    requiresBookerEmailVerification?: boolean;
    scheduleId?: number;
    seats?: any;
    seatsPerTimeSlot?: Record<string, any>;
    seatsShowAvailabilityCount?: boolean;
    showOptimizedSlots?: boolean;
    slotInterval?: number;
    slug: string;
    successRedirectUrl?: string;
    title: string;
    useDestinationCalendarEmail?: boolean;
    users: any[];
}
export interface EventTypeLoadMatch {
    id: string;
}
export interface EventTypeListMatch {
    event_slug?: string;
    org_id?: number;
    org_slug?: string;
    sort_created_at?: string;
    username?: string;
}
export interface EventTypeCreateData {
    afterEventBuffer?: number;
    allowReschedulingCancelledBookings?: boolean;
    allowReschedulingPastBookings?: boolean;
    beforeEventBuffer?: number;
    bookerActiveBookingsLimit?: any;
    bookerLayouts?: any;
    bookingFields?: any[];
    bookingLimitsCount?: any;
    bookingLimitsDuration?: any;
    bookingRequiresAuthentication?: boolean;
    bookingUrl: string;
    bookingWindow?: any;
    calVideoSettings?: any;
    color: Record<string, any>;
    confirmationPolicy?: any;
    currency: string;
    customName?: string;
    description?: string;
    destinationCalendar: Record<string, any>;
    disableCancelling?: any;
    disableGuests?: boolean;
    disableRescheduling?: any;
    forwardParamsSuccessRedirect: Record<string, any>;
    hidden?: boolean;
    hideCalendarEventDetails?: boolean;
    hideCalendarNotes?: boolean;
    hideOrganizerEmail?: boolean;
    id: number;
    interfaceLanguage?: string;
    isInstantEvent: boolean;
    lengthInMinutes: number;
    lengthInMinutesOptions?: any[];
    locations?: any[];
    lockTimeZoneToggleOnBookingPage?: boolean;
    metadata: Record<string, any>;
    minimumBookingNotice?: number;
    offsetStart?: number;
    onlyShowFirstAvailableSlot?: boolean;
    ownerId: number;
    price: number;
    recurrence?: any;
    requiresBookerEmailVerification?: boolean;
    scheduleId?: number;
    seats?: any;
    seatsPerTimeSlot?: Record<string, any>;
    seatsShowAvailabilityCount?: boolean;
    showOptimizedSlots?: boolean;
    slotInterval?: number;
    slug: string;
    successRedirectUrl?: string;
    title: string;
    useDestinationCalendarEmail?: boolean;
    users: any[];
}
export interface EventTypeUpdateData {
    id: number;
    afterEventBuffer?: number;
    allowReschedulingCancelledBookings?: boolean;
    allowReschedulingPastBookings?: boolean;
    beforeEventBuffer?: number;
    bookerActiveBookingsLimit?: any;
    bookerLayouts?: any;
    bookingFields?: any[];
    bookingLimitsCount?: any;
    bookingLimitsDuration?: any;
    bookingRequiresAuthentication?: boolean;
    bookingUrl?: string;
    bookingWindow?: any;
    calVideoSettings?: any;
    color?: Record<string, any>;
    confirmationPolicy?: any;
    currency?: string;
    customName?: string;
    description?: string;
    destinationCalendar?: Record<string, any>;
    disableCancelling?: any;
    disableGuests?: boolean;
    disableRescheduling?: any;
    forwardParamsSuccessRedirect?: Record<string, any>;
    hidden?: boolean;
    hideCalendarEventDetails?: boolean;
    hideCalendarNotes?: boolean;
    hideOrganizerEmail?: boolean;
    interfaceLanguage?: string;
    isInstantEvent?: boolean;
    lengthInMinutes?: number;
    lengthInMinutesOptions?: any[];
    locations?: any[];
    lockTimeZoneToggleOnBookingPage?: boolean;
    metadata?: Record<string, any>;
    minimumBookingNotice?: number;
    offsetStart?: number;
    onlyShowFirstAvailableSlot?: boolean;
    ownerId?: number;
    price?: number;
    recurrence?: any;
    requiresBookerEmailVerification?: boolean;
    scheduleId?: number;
    seats?: any;
    seatsPerTimeSlot?: Record<string, any>;
    seatsShowAvailabilityCount?: boolean;
    showOptimizedSlots?: boolean;
    slotInterval?: number;
    slug?: string;
    successRedirectUrl?: string;
    title?: string;
    useDestinationCalendarEmail?: boolean;
    users?: any[];
}
export interface EventTypeRemoveMatch {
    id: number;
}
export interface EventTypeWebhook {
    active: boolean;
    eventTypeId: number;
    id: number;
    payloadTemplate: string;
    secret?: string;
    subscriberUrl: string;
    triggers: any[];
    version?: string;
}
export interface EventTypeWebhookLoadMatch {
    event_type_id: number;
    id: string;
}
export interface EventTypeWebhookListMatch {
    event_type_id: number;
    skip?: number;
    take?: number;
}
export interface EventTypeWebhookCreateData {
    event_type_id: number;
    active: boolean;
    eventTypeId: number;
    id: number;
    payloadTemplate: string;
    secret?: string;
    subscriberUrl: string;
    triggers: any[];
    version?: string;
}
export interface EventTypeWebhookUpdateData {
    event_type_id: number;
    id: string;
    active?: boolean;
    eventTypeId?: number;
    payloadTemplate?: string;
    secret?: string;
    subscriberUrl?: string;
    triggers?: any[];
    version?: string;
}
export interface EventTypeWebhookRemoveMatch {
    event_type_id: number;
    id?: string;
}
export interface ManagedUser {
    avatarUrl?: string;
    bio: string;
    createdDate: string;
    defaultScheduleId: number;
    email: string;
    id: number;
    locale?: string;
    metadata?: Record<string, any>;
    name: string;
    timeFormat: number;
    timeZone: string;
    username: string;
    weekStart: string;
}
export interface ManagedUserLoadMatch {
    id: number;
    oauth_client_id: string;
}
export interface ManagedUserListMatch {
    oauth_client_id: string;
    email?: any[];
    limit?: number;
    offset?: number;
}
export interface ManagedUserCreateData {
    oauth_client_id: string;
    avatarUrl?: string;
    bio: string;
    createdDate: string;
    defaultScheduleId: number;
    email: string;
    id: number;
    locale?: string;
    metadata?: Record<string, any>;
    name: string;
    timeFormat: number;
    timeZone: string;
    username: string;
    weekStart: string;
}
export interface ManagedUserUpdateData {
    id: number;
    oauth_client_id: string;
    avatarUrl?: string;
    bio?: string;
    createdDate?: string;
    defaultScheduleId?: number;
    email?: string;
    locale?: string;
    metadata?: Record<string, any>;
    name?: string;
    timeFormat?: number;
    timeZone?: string;
    username?: string;
    weekStart?: string;
}
export interface ManagedUserRemoveMatch {
    id: number;
    oauth_client_id: string;
}
export interface Me {
    avatarUrl: string;
    bio: string;
    defaultScheduleId: number;
    email: string;
    id: number;
    locale?: string;
    metadata?: Record<string, any>;
    name: string;
    organization: Record<string, any>;
    organizationId: number;
    timeFormat: number;
    timeZone: string;
    username: string;
    weekStart: string;
}
export interface MeLoadMatch {
    avatarUrl?: string;
    bio?: string;
    defaultScheduleId?: number;
    email?: string;
    id: number;
    locale?: string;
    metadata?: Record<string, any>;
    name?: string;
    organization?: Record<string, any>;
    organizationId?: number;
    timeFormat?: number;
    timeZone?: string;
    username?: string;
    weekStart?: string;
}
export interface MeUpdateData {
    avatarUrl?: string;
    bio?: string;
    defaultScheduleId?: number;
    email?: string;
    id?: number;
    locale?: string;
    metadata?: Record<string, any>;
    name?: string;
    organization?: Record<string, any>;
    organizationId?: number;
    timeFormat?: number;
    timeZone?: string;
    username?: string;
    weekStart?: string;
}
export interface OauthClient {
    areCalendarEventsEnabled: boolean;
    areDefaultEventTypesEnabled: boolean;
    areEmailsEnabled: boolean;
    bookingCancelRedirectUri?: string;
    bookingRedirectUri?: string;
    bookingRescheduleRedirectUri?: string;
    createdAt: string;
    id: string;
    logo?: Record<string, any>;
    name: string;
    organizationId: number;
    permissions: any[];
    redirectUris: any[];
    secret: string;
}
export interface OauthClientLoadMatch {
    id: string;
    $action?: string;
    [action: string]: any;
}
export interface OauthClientListMatch {
    areCalendarEventsEnabled?: boolean;
    areDefaultEventTypesEnabled?: boolean;
    areEmailsEnabled?: boolean;
    bookingCancelRedirectUri?: string;
    bookingRedirectUri?: string;
    bookingRescheduleRedirectUri?: string;
    createdAt?: string;
    id?: string;
    logo?: Record<string, any>;
    name?: string;
    organizationId?: number;
    permissions?: any[];
    redirectUris?: any[];
    secret?: string;
}
export interface OauthClientCreateData {
    areCalendarEventsEnabled: boolean;
    areDefaultEventTypesEnabled: boolean;
    areEmailsEnabled: boolean;
    bookingCancelRedirectUri?: string;
    bookingRedirectUri?: string;
    bookingRescheduleRedirectUri?: string;
    createdAt: string;
    id: string;
    logo?: Record<string, any>;
    name: string;
    organizationId: number;
    permissions: any[];
    redirectUris: any[];
    secret: string;
}
export interface OauthClientUpdateData {
    id: string;
    areCalendarEventsEnabled?: boolean;
    areDefaultEventTypesEnabled?: boolean;
    areEmailsEnabled?: boolean;
    bookingCancelRedirectUri?: string;
    bookingRedirectUri?: string;
    bookingRescheduleRedirectUri?: string;
    createdAt?: string;
    logo?: Record<string, any>;
    name?: string;
    organizationId?: number;
    permissions?: any[];
    redirectUris?: any[];
    secret?: string;
}
export interface OauthClientRemoveMatch {
    id: string;
}
export interface OauthClientWebhook {
    active: boolean;
    id: number;
    oAuthClientId: string;
    payloadTemplate: string;
    secret?: string;
    subscriberUrl: string;
    triggers: any[];
    version?: string;
}
export interface OauthClientWebhookLoadMatch {
    id: string;
    oauth_client_id: string;
}
export interface OauthClientWebhookListMatch {
    oauth_client_id: string;
    skip?: number;
    take?: number;
}
export interface OauthClientWebhookCreateData {
    oauth_client_id: string;
    active: boolean;
    id: number;
    oAuthClientId: string;
    payloadTemplate: string;
    secret?: string;
    subscriberUrl: string;
    triggers: any[];
    version?: string;
}
export interface OauthClientWebhookUpdateData {
    id: string;
    oauth_client_id: string;
    active?: boolean;
    oAuthClientId?: string;
    payloadTemplate?: string;
    secret?: string;
    subscriberUrl?: string;
    triggers?: any[];
    version?: string;
}
export interface OauthClientWebhookRemoveMatch {
    id?: string;
    oauth_client_id: string;
}
export interface OauthToken {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    token_type: string;
}
export interface OauthTokenCreateData {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    token_type: string;
    $action?: string;
    [action: string]: any;
}
export interface PrivateLink {
    data: any[];
    expiresAt?: string;
    id?: string;
    maxUsageCount?: number;
    status: string;
}
export interface PrivateLinkListMatch {
    event_type_id: number;
}
export interface PrivateLinkCreateData {
    event_type_id: number;
    data: any[];
    expiresAt?: string;
    id?: string;
    maxUsageCount?: number;
    status: string;
}
export interface PrivateLinkUpdateData {
    event_type_id: number;
    id: string;
    data?: any[];
    expiresAt?: string;
    maxUsageCount?: number;
    status?: string;
}
export interface PrivateLinkRemoveMatch {
    event_type_id: number;
    id: string;
}
export interface Schedule {
    availability?: any[];
    data: any;
    error?: Record<string, any>;
    id: number;
    isDefault: boolean;
    name: string;
    overrides?: any[];
    ownerId: number;
    status: string;
    timeZone: string;
}
export interface ScheduleLoadMatch {
    id: number;
    $action?: string;
    [action: string]: any;
}
export interface ScheduleListMatch {
    availability?: any[];
    data?: any;
    error?: Record<string, any>;
    id?: number;
    isDefault?: boolean;
    name?: string;
    overrides?: any[];
    ownerId?: number;
    status?: string;
    timeZone?: string;
}
export interface ScheduleCreateData {
    availability?: any[];
    data: any;
    error?: Record<string, any>;
    id: number;
    isDefault: boolean;
    name: string;
    overrides?: any[];
    ownerId: number;
    status: string;
    timeZone: string;
}
export interface ScheduleUpdateData {
    id: string;
    availability?: any[];
    data?: any;
    error?: Record<string, any>;
    isDefault?: boolean;
    name?: string;
    overrides?: any[];
    ownerId?: number;
    status?: string;
    timeZone?: string;
}
export interface ScheduleRemoveMatch {
    id: number;
}
export interface SelectedCalendar {
    credentialId: number;
    delegationCredentialId?: string;
    externalId: string;
    integration: string;
}
export interface SelectedCalendarCreateData {
    credentialId: number;
    delegationCredentialId?: string;
    externalId: string;
    integration: string;
}
export interface SelectedCalendarRemoveMatch {
    credential_id: string;
    delegation_credential_id?: string;
    external_id: string;
    integration: string;
}
export interface Slot {
}
export interface SlotLoadMatch {
    booking_uid_to_reschedule?: string;
    duration?: number;
    end: string;
    event_type_id?: number;
    event_type_slug?: string;
    format?: string;
    organization_slug?: string;
    start: string;
    team_slug?: string;
    time_zone?: string;
    username?: string;
}
export interface SlotReservation {
    eventTypeId: number;
    id?: string;
    reservationDuration?: number;
    reservationUid: string;
    reservationUntil: string;
    slotDuration?: number;
    slotEnd: string;
    slotStart: string;
}
export interface SlotReservationLoadMatch {
    id: string;
}
export interface SlotReservationCreateData {
    eventTypeId: number;
    id?: string;
    reservationDuration?: number;
    reservationUid: string;
    reservationUntil: string;
    slotDuration?: number;
    slotEnd: string;
    slotStart: string;
}
export interface SlotReservationUpdateData {
    id: string;
    eventTypeId?: number;
    reservationDuration?: number;
    reservationUid?: string;
    reservationUntil?: string;
    slotDuration?: number;
    slotEnd?: string;
    slotStart?: string;
}
export interface SlotReservationRemoveMatch {
    id: string;
}
export interface Stripe {
    authUrl: string;
    url: string;
}
export interface StripeLoadMatch {
    code: string;
    state: string;
    $action?: string;
    [action: string]: any;
}
export interface VerifiedEmail {
    email: string;
    id: number;
    userId: number;
}
export interface VerifiedEmailLoadMatch {
    id: number;
}
export interface VerifiedEmailListMatch {
    skip?: number;
    take?: number;
}
export interface VerifiedEmailCreateData {
    email: string;
    id: number;
    userId: number;
    $action?: string;
    [action: string]: any;
}
export interface VerifiedPhone {
    id: number;
    phoneNumber: string;
    userId: number;
}
export interface VerifiedPhoneLoadMatch {
    id: number;
}
export interface VerifiedPhoneListMatch {
    skip?: number;
    take?: number;
}
export interface VerifiedPhoneCreateData {
    id: number;
    phoneNumber: string;
    userId: number;
    $action?: string;
    [action: string]: any;
}
export interface Webhook {
    active: boolean;
    id: number;
    payloadTemplate: string;
    secret?: string;
    subscriberUrl: string;
    triggers: any[];
    userId: number;
    version?: string;
}
export interface WebhookLoadMatch {
    id: string;
}
export interface WebhookListMatch {
    skip?: number;
    take?: number;
}
export interface WebhookCreateData {
    active: boolean;
    id: number;
    payloadTemplate: string;
    secret?: string;
    subscriberUrl: string;
    triggers: any[];
    userId: number;
    version?: string;
}
export interface WebhookUpdateData {
    id: string;
    active?: boolean;
    payloadTemplate?: string;
    secret?: string;
    subscriberUrl?: string;
    triggers?: any[];
    userId?: number;
    version?: string;
}
export interface WebhookRemoveMatch {
    id: string;
}
