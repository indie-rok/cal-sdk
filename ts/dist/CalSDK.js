"use strict";
// Cal Ts SDK
Object.defineProperty(exports, "__esModule", { value: true });
exports.SDK = exports.CalSDK = exports.CalEntityBase = exports.BaseFeature = exports.config = exports.stdutil = void 0;
const ApiKeyEntity_1 = require("./entity/ApiKeyEntity");
const AttendeeEntity_1 = require("./entity/AttendeeEntity");
const BookingEntity_1 = require("./entity/BookingEntity");
const CalendarEntity_1 = require("./entity/CalendarEntity");
const CalendarEventEntity_1 = require("./entity/CalendarEventEntity");
const ConferencingEntity_1 = require("./entity/ConferencingEntity");
const DestinationCalendarEntity_1 = require("./entity/DestinationCalendarEntity");
const EventTypeEntity_1 = require("./entity/EventTypeEntity");
const EventTypeWebhookEntity_1 = require("./entity/EventTypeWebhookEntity");
const ManagedUserEntity_1 = require("./entity/ManagedUserEntity");
const MeEntity_1 = require("./entity/MeEntity");
const OauthClientEntity_1 = require("./entity/OauthClientEntity");
const OauthClientWebhookEntity_1 = require("./entity/OauthClientWebhookEntity");
const OauthTokenEntity_1 = require("./entity/OauthTokenEntity");
const PrivateLinkEntity_1 = require("./entity/PrivateLinkEntity");
const ScheduleEntity_1 = require("./entity/ScheduleEntity");
const SelectedCalendarEntity_1 = require("./entity/SelectedCalendarEntity");
const SlotEntity_1 = require("./entity/SlotEntity");
const SlotReservationEntity_1 = require("./entity/SlotReservationEntity");
const StripeEntity_1 = require("./entity/StripeEntity");
const VerifiedEmailEntity_1 = require("./entity/VerifiedEmailEntity");
const VerifiedPhoneEntity_1 = require("./entity/VerifiedPhoneEntity");
const WebhookEntity_1 = require("./entity/WebhookEntity");
const node_util_1 = require("node:util");
const Config_1 = require("./Config");
Object.defineProperty(exports, "config", { enumerable: true, get: function () { return Config_1.config; } });
const CalEntityBase_1 = require("./CalEntityBase");
Object.defineProperty(exports, "CalEntityBase", { enumerable: true, get: function () { return CalEntityBase_1.CalEntityBase; } });
const Utility_1 = require("./utility/Utility");
const ResultBodyUtility_1 = require("./utility/ResultBodyUtility");
const MakeRequestUtility_1 = require("./utility/MakeRequestUtility");
const PrepareMethodUtility_1 = require("./utility/PrepareMethodUtility");
const BaseFeature_1 = require("./feature/base/BaseFeature");
Object.defineProperty(exports, "BaseFeature", { enumerable: true, get: function () { return BaseFeature_1.BaseFeature; } });
const stdutil = new Utility_1.Utility();
exports.stdutil = stdutil;
class CalSDK {
    _mode = 'live';
    _options;
    _utility = new Utility_1.Utility();
    _features;
    _rootctx;
    constructor(options) {
        this._rootctx = this._utility.makeContext({
            client: this,
            utility: this._utility,
            config: Config_1.config,
            options,
            shared: new WeakMap()
        });
        this._options = this._utility.makeOptions(this._rootctx);
        for (const key of ['_options', '_rootctx', '_features']) {
            Object.defineProperty(this, key, {
                value: this[key], enumerable: false, writable: true, configurable: true
            });
        }
        const struct = this._utility.struct;
        const getpath = struct.getpath;
        if (true === getpath(this._options.feature, 'test.active')) {
            this._mode = 'test';
        }
        this._rootctx.options = this._options;
        this._features = [];
        const featureAdd = this._utility.featureAdd;
        const featureInit = this._utility.featureInit;
        // Add features in the resolved order (makeOptions puts an explicit
        // array order first, else defaults to test-first). Ordering matters:
        // the `test` feature installs the base mock transport and the transport
        // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is current,
        // so `test` must be added before them to sit at the base of the chain.
        const extend = this._options.extend || [];
        const featureorder = getpath(this._options, '__derived__.featureorder') || [];
        for (const fname of featureorder) {
            const fopts = this._options.feature[fname] || {};
            if (fopts.active) {
                // An active name with no generated class is legal when an
                // extend-supplied instance carries that name (station's adopt
                // path): the instance is added below, positioned by its own
                // __after__ entry, so skip it here rather than fail construction.
                if (!this._rootctx.config.hasFeature(fname) &&
                    extend.some((f) => fname === f.name)) {
                    continue;
                }
                featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname));
            }
        }
        for (let f of extend) {
            featureAdd(this._rootctx, f);
        }
        for (let f of this._features) {
            featureInit(this._rootctx, f);
        }
        const featureHook = this._utility.featureHook;
        featureHook(this._rootctx, 'PostConstruct');
    }
    options() {
        return this._utility.struct.clone(this._options);
    }
    utility() {
        return this._utility.struct.clone(this._utility);
    }
    async prepare(fetchargs) {
        const utility = this._utility;
        const struct = utility.struct;
        const clone = struct.clone;
        const { makeContext, makeFetchDef, prepareHeaders, prepareAuth, } = utility;
        fetchargs = fetchargs || {};
        let ctx = makeContext({
            opname: 'prepare',
            ctrl: fetchargs.ctrl || {},
        }, this._rootctx);
        const options = this._options;
        const method = String(fetchargs.method || 'GET').toUpperCase();
        if (!(0, PrepareMethodUtility_1.allowed)(options.allow.method, method)) {
            return ctx.error('spec_method_allow', 'Method "' + method +
                '" not allowed by SDK option allow.method value: "' + options.allow.method + '"');
        }
        const spec = {
            base: options.base,
            prefix: options.prefix,
            suffix: options.suffix,
            path: fetchargs.path || '',
            method,
            params: fetchargs.params || {},
            query: fetchargs.query || {},
            headers: prepareHeaders(ctx),
            body: fetchargs.body,
            step: 'start',
        };
        ctx.spec = spec;
        if (fetchargs.headers) {
            const uheaders = fetchargs.headers;
            for (let key in uheaders) {
                spec.headers[key] = uheaders[key];
            }
        }
        const authResult = prepareAuth(ctx);
        if (authResult instanceof Error) {
            return authResult;
        }
        return makeFetchDef(ctx);
    }
    // Raw endpoint access is operator-controllable, like every entity op.
    // Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
    // either one reaches the same endpoint.
    async direct(fetchargs) {
        if (!(0, PrepareMethodUtility_1.allowed)(this._options.allow.op, 'direct')) {
            return {
                ok: false,
                err: new Error('CalSDK: direct: operation not allowed by' +
                    ' SDK option allow.op value: "' + this._options.allow.op + '"'),
            };
        }
        return this._rawRequest(fetchargs);
    }
    // Ungated request path shared by direct() and graphql(), each of which
    // checks its own allow.op token first. Private, rather than a flag on
    // fetchargs: a caller-supplied marker would let anyone opt straight back
    // out of the gate by passing it.
    async _rawRequest(fetchargs) {
        const utility = this._utility;
        const fetcher = utility.fetcher;
        const makeContext = utility.makeContext;
        const fetchdef = await this.prepare(fetchargs);
        if (fetchdef instanceof Error) {
            return { ok: false, err: utility.clean(this._rootctx, fetchdef) };
        }
        let ctx = makeContext({
            opname: 'direct',
            ctrl: (fetchargs || {}).ctrl || {},
        }, this._rootctx);
        try {
            if (true === fetchdef.signal?.aborted) {
                throw fetchdef.signal.reason;
            }
            const fetched = await fetcher(ctx, fetchdef.url, fetchdef);
            if (null == fetched) {
                return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') };
            }
            else if (fetched instanceof Error) {
                return { ok: false, err: utility.clean(ctx, (0, MakeRequestUtility_1.abortError)(ctx, fetched)) };
            }
            const status = fetched.status;
            // No body responses (204 No Content, 304 Not Modified) and explicit
            // zero content-length must skip JSON parsing — fetched.json() would
            // throw `Unexpected end of JSON input` on an empty body.
            const headers = fetched.headers;
            const contentLength = headers && 'function' === typeof headers.get
                ? headers.get('content-length')
                : (headers || {})['content-length'];
            const noBody = 204 === status || 304 === status || '0' === String(contentLength);
            let json = undefined;
            let err = undefined;
            if (!noBody) {
                let text = undefined;
                try {
                    const raw = fetched;
                    if ('function' === typeof raw.text) {
                        text = await raw.text();
                        json = '' === text.trim() ? undefined : JSON.parse(text);
                    }
                    else {
                        json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json;
                    }
                }
                catch (parseErr) {
                    if ('SyntaxError' !== parseErr?.name) {
                        throw parseErr;
                    }
                    err = (0, ResultBodyUtility_1.unreadableBody)(ctx, {
                        status, headers, text: text ?? parseErr.text, sent: fetchdef.headers,
                        failed: 200 <= status && status < 300 ? undefined :
                            ctx.error('request_status', 'request: ' + status + ': ' + fetched.statusText),
                    });
                }
            }
            return {
                ok: null == err && status >= 200 && status < 300,
                status,
                headers: fetched.headers,
                data: json,
                ...(null == err ? {} : { err: utility.clean(ctx, err) }),
            };
        }
        catch (err) {
            return { ok: false, err: utility.clean(ctx, (0, MakeRequestUtility_1.abortError)(ctx, err)) };
        }
    }
    async graphql(query, variables, ctrl) {
        const options = this._options;
        if (!(0, PrepareMethodUtility_1.allowed)(options.allow.op, 'graphql')) {
            return {
                ok: false,
                err: new Error('CalSDK: graphql: operation not allowed by' +
                    ' SDK option allow.op value: "' + options.allow.op + '"'),
            };
        }
        const res = await this._rawRequest({
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: { query, variables: variables || {} },
            ctrl,
        });
        // Errors are read BEFORE any status check: a GraphQL parse or validation
        // failure comes back as HTTP 400 carrying the standard { errors: [...] }
        // body, and the raw path represents a non-2xx as { ok: false } with no
        // err — so returning early on status would discard the server's own
        // diagnostics, which are the only useful part of that response.
        const errors = null == res.data ? undefined : res.data.errors;
        if (null != errors && Array.isArray(errors) && 0 < errors.length) {
            const first = errors[0] || {};
            const err = new Error('CalSDK: graphql: ' +
                (first.message || 'graphql error'));
            err.graphql = errors;
            return { ok: false, status: res.status, headers: res.headers, err, data: res.data };
        }
        return res;
    }
    // Entity access: `client.ApiKey().list()` / `client.ApiKey().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiKey(entopts) {
        const self = this;
        return new ApiKeyEntity_1.ApiKeyEntity(self, entopts);
    }
    // Entity access: `client.Attendee().list()` / `client.Attendee().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Attendee(entopts) {
        const self = this;
        return new AttendeeEntity_1.AttendeeEntity(self, entopts);
    }
    // Entity access: `client.Booking().list()` / `client.Booking().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Booking(entopts) {
        const self = this;
        return new BookingEntity_1.BookingEntity(self, entopts);
    }
    // Entity access: `client.Calendar().list()` / `client.Calendar().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Calendar(entopts) {
        const self = this;
        return new CalendarEntity_1.CalendarEntity(self, entopts);
    }
    // Entity access: `client.CalendarEvent().list()` / `client.CalendarEvent().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    CalendarEvent(entopts) {
        const self = this;
        return new CalendarEventEntity_1.CalendarEventEntity(self, entopts);
    }
    // Entity access: `client.Conferencing().list()` / `client.Conferencing().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Conferencing(entopts) {
        const self = this;
        return new ConferencingEntity_1.ConferencingEntity(self, entopts);
    }
    // Entity access: `client.DestinationCalendar().list()` / `client.DestinationCalendar().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DestinationCalendar(entopts) {
        const self = this;
        return new DestinationCalendarEntity_1.DestinationCalendarEntity(self, entopts);
    }
    // Entity access: `client.EventType().list()` / `client.EventType().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    EventType(entopts) {
        const self = this;
        return new EventTypeEntity_1.EventTypeEntity(self, entopts);
    }
    // Entity access: `client.EventTypeWebhook().list()` / `client.EventTypeWebhook().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    EventTypeWebhook(entopts) {
        const self = this;
        return new EventTypeWebhookEntity_1.EventTypeWebhookEntity(self, entopts);
    }
    // Entity access: `client.ManagedUser().list()` / `client.ManagedUser().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ManagedUser(entopts) {
        const self = this;
        return new ManagedUserEntity_1.ManagedUserEntity(self, entopts);
    }
    // Entity access: `client.Me().list()` / `client.Me().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Me(entopts) {
        const self = this;
        return new MeEntity_1.MeEntity(self, entopts);
    }
    // Entity access: `client.OauthClient().list()` / `client.OauthClient().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    OauthClient(entopts) {
        const self = this;
        return new OauthClientEntity_1.OauthClientEntity(self, entopts);
    }
    // Entity access: `client.OauthClientWebhook().list()` / `client.OauthClientWebhook().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    OauthClientWebhook(entopts) {
        const self = this;
        return new OauthClientWebhookEntity_1.OauthClientWebhookEntity(self, entopts);
    }
    // Entity access: `client.OauthToken().list()` / `client.OauthToken().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    OauthToken(entopts) {
        const self = this;
        return new OauthTokenEntity_1.OauthTokenEntity(self, entopts);
    }
    // Entity access: `client.PrivateLink().list()` / `client.PrivateLink().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PrivateLink(entopts) {
        const self = this;
        return new PrivateLinkEntity_1.PrivateLinkEntity(self, entopts);
    }
    // Entity access: `client.Schedule().list()` / `client.Schedule().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Schedule(entopts) {
        const self = this;
        return new ScheduleEntity_1.ScheduleEntity(self, entopts);
    }
    // Entity access: `client.SelectedCalendar().list()` / `client.SelectedCalendar().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SelectedCalendar(entopts) {
        const self = this;
        return new SelectedCalendarEntity_1.SelectedCalendarEntity(self, entopts);
    }
    // Entity access: `client.Slot().list()` / `client.Slot().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Slot(entopts) {
        const self = this;
        return new SlotEntity_1.SlotEntity(self, entopts);
    }
    // Entity access: `client.SlotReservation().list()` / `client.SlotReservation().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SlotReservation(entopts) {
        const self = this;
        return new SlotReservationEntity_1.SlotReservationEntity(self, entopts);
    }
    // Entity access: `client.Stripe().list()` / `client.Stripe().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Stripe(entopts) {
        const self = this;
        return new StripeEntity_1.StripeEntity(self, entopts);
    }
    // Entity access: `client.VerifiedEmail().list()` / `client.VerifiedEmail().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    VerifiedEmail(entopts) {
        const self = this;
        return new VerifiedEmailEntity_1.VerifiedEmailEntity(self, entopts);
    }
    // Entity access: `client.VerifiedPhone().list()` / `client.VerifiedPhone().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    VerifiedPhone(entopts) {
        const self = this;
        return new VerifiedPhoneEntity_1.VerifiedPhoneEntity(self, entopts);
    }
    // Entity access: `client.Webhook().list()` / `client.Webhook().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Webhook(entopts) {
        const self = this;
        return new WebhookEntity_1.WebhookEntity(self, entopts);
    }
    static test(testoptsarg, sdkoptsarg) {
        const struct = stdutil.struct;
        const setpath = struct.setpath;
        const getdef = struct.getdef;
        const clone = struct.clone;
        const setprop = struct.setprop;
        const sdkopts = getdef(clone(sdkoptsarg), {});
        const testopts = getdef(clone(testoptsarg), {});
        setprop(testopts, 'active', true);
        setpath(sdkopts, 'feature.test', testopts);
        const testsdk = new CalSDK(sdkopts);
        testsdk._mode = 'test';
        return testsdk;
    }
    tester(testopts, sdkopts) {
        return CalSDK.test(testopts, sdkopts);
    }
    toJSON() {
        return { name: 'Cal' };
    }
    toString() {
        return 'Cal ' + this._utility.struct.jsonify(this.toJSON());
    }
    [node_util_1.inspect.custom]() {
        return this.toString();
    }
}
exports.CalSDK = CalSDK;
const SDK = CalSDK;
exports.SDK = SDK;
//# sourceMappingURL=CalSDK.js.map