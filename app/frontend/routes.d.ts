/**
 * File generated by js-routes RubyVariables.GEM_VERSION
 * Based on Rails RubyVariables.RAILS_VERSION routes of RubyVariables.APP_CLASS
 */
declare type Optional<T> = {
    [P in keyof T]?: T[P] | null;
};
declare type BaseRouteParameter = string | boolean | Date | number;
declare type MethodRouteParameter = BaseRouteParameter | (() => BaseRouteParameter);
declare type ModelRouteParameter = {
    id: MethodRouteParameter;
} | {
    to_param: MethodRouteParameter;
} | {
    toParam: MethodRouteParameter;
};
declare type RequiredRouteParameter = BaseRouteParameter | ModelRouteParameter;
declare type OptionalRouteParameter = undefined | null | RequiredRouteParameter;
declare type QueryRouteParameter = OptionalRouteParameter | QueryRouteParameter[] | {
    [k: string]: QueryRouteParameter;
};
declare type RouteParameters = Record<string, QueryRouteParameter>;
declare type Serializable = Record<string, unknown>;
declare type Serializer = (value: Serializable) => string;
declare type RouteHelperExtras = {
    requiredParams(): string[];
    toString(): string;
};
declare type RequiredParameters<T extends number> = T extends 1 ? [RequiredRouteParameter] : T extends 2 ? [RequiredRouteParameter, RequiredRouteParameter] : T extends 3 ? [RequiredRouteParameter, RequiredRouteParameter, RequiredRouteParameter] : T extends 4 ? [
    RequiredRouteParameter,
    RequiredRouteParameter,
    RequiredRouteParameter,
    RequiredRouteParameter
] : RequiredRouteParameter[];
declare type RouteHelperOptions<T extends string> = RouteOptions & Optional<Record<T, OptionalRouteParameter>>;
declare type RouteHelper<T extends number = number, U extends string = string> = ((...args: [...RequiredParameters<T>, RouteHelperOptions<U>]) => string) & RouteHelperExtras;
declare type RouteHelpers = Record<string, RouteHelper>;
declare type Configuration = {
    prefix: string;
    default_url_options: RouteParameters;
    special_options_key: string;
    serializer: Serializer;
};
interface RouterExposedMethods {
    config(): Configuration;
    configure(arg: Partial<Configuration>): Configuration;
    serialize: Serializer;
}
declare type KeywordUrlOptions = Optional<{
    host: string;
    protocol: string;
    subdomain: string;
    port: string | number;
    anchor: string;
    trailing_slash: boolean;
}>;
declare type RouteOptions = KeywordUrlOptions & RouteParameters;
declare type PartsTable = Record<string, {
    r?: boolean;
    d?: OptionalRouteParameter;
}>;
declare type ModuleType = "CJS" | "AMD" | "UMD" | "ESM" | "DTS" | "NIL";
declare const RubyVariables: {
    PREFIX: string;
    DEPRECATED_GLOBBING_BEHAVIOR: boolean;
    SPECIAL_OPTIONS_KEY: string;
    DEFAULT_URL_OPTIONS: RouteParameters;
    SERIALIZER: Serializer;
    NAMESPACE: string;
    ROUTES_OBJECT: RouteHelpers;
    MODULE_TYPE: ModuleType;
    WRAPPER: <T>(callback: T) => T;
};
declare const define: undefined | (((arg: unknown[], callback: () => unknown) => void) & {
    amd?: unknown;
});
declare const module: {
    exports: any;
} | undefined;
export const configure: RouterExposedMethods['configure'];

export const config: RouterExposedMethods['config'];

export const serialize: RouterExposedMethods['serialize'];

/**
 * Generates rails route to
 * /accounts/password(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const account_password_path: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /accounts(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const account_registration_path: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /accounts/sign_in(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const account_session_path: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const authenticated_account_root_path: ((
  options?: {} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /accounts/cancel(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const cancel_account_registration_path: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /accounts/sign_out(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const destroy_account_session_path: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /accounts/password/edit(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const edit_account_password_path: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /accounts/edit(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const edit_account_registration_path: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /rails/conductor/action_mailbox/inbound_emails/:id/edit(.:format)
 * @param {any} id
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const edit_rails_conductor_inbound_email_path: ((
  id: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /feeds/:id(.:format)
 * @param {any} id
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const feed_path: ((
  id: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /feeds(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const feeds_path: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /items(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const items_path: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /accounts/password/new(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const new_account_password_path: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /accounts/sign_up(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const new_account_registration_path: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /accounts/sign_in(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const new_account_session_path: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /rails/conductor/action_mailbox/inbound_emails/new(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const new_rails_conductor_inbound_email_path: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /rails/conductor/action_mailbox/inbound_emails/sources/new(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const new_rails_conductor_inbound_email_source_path: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /rails/active_storage/representations/redirect/:signed_blob_id/:variation_key/*filename(.:format)
 * @param {any} signed_blob_id
 * @param {any} variation_key
 * @param {any} filename
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const rails_blob_representation_path: ((
  signed_blob_id: RequiredRouteParameter,
  variation_key: RequiredRouteParameter,
  filename: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /rails/active_storage/representations/proxy/:signed_blob_id/:variation_key/*filename(.:format)
 * @param {any} signed_blob_id
 * @param {any} variation_key
 * @param {any} filename
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const rails_blob_representation_proxy_path: ((
  signed_blob_id: RequiredRouteParameter,
  variation_key: RequiredRouteParameter,
  filename: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /rails/conductor/action_mailbox/inbound_emails/:id(.:format)
 * @param {any} id
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const rails_conductor_inbound_email_path: ((
  id: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /rails/conductor/action_mailbox/:inbound_email_id/incinerate(.:format)
 * @param {any} inbound_email_id
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const rails_conductor_inbound_email_incinerate_path: ((
  inbound_email_id: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /rails/conductor/action_mailbox/:inbound_email_id/reroute(.:format)
 * @param {any} inbound_email_id
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const rails_conductor_inbound_email_reroute_path: ((
  inbound_email_id: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /rails/conductor/action_mailbox/inbound_emails/sources(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const rails_conductor_inbound_email_sources_path: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /rails/conductor/action_mailbox/inbound_emails(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const rails_conductor_inbound_emails_path: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /rails/active_storage/direct_uploads(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const rails_direct_uploads_path: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /rails/active_storage/disk/:encoded_key/*filename(.:format)
 * @param {any} encoded_key
 * @param {any} filename
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const rails_disk_service_path: ((
  encoded_key: RequiredRouteParameter,
  filename: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /rails/info(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const rails_info_path: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /rails/info/properties(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const rails_info_properties_path: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /rails/info/routes(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const rails_info_routes_path: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /rails/mailers(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const rails_mailers_path: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /rails/action_mailbox/mailgun/inbound_emails/mime(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const rails_mailgun_inbound_emails_path: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /rails/action_mailbox/mandrill/inbound_emails(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const rails_mandrill_inbound_emails_path: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /rails/action_mailbox/mandrill/inbound_emails(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const rails_mandrill_inbound_health_check_path: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /rails/action_mailbox/postmark/inbound_emails(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const rails_postmark_inbound_emails_path: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /rails/action_mailbox/relay/inbound_emails(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const rails_relay_inbound_emails_path: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /rails/action_mailbox/sendgrid/inbound_emails(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const rails_sendgrid_inbound_emails_path: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /rails/active_storage/blobs/redirect/:signed_id/*filename(.:format)
 * @param {any} signed_id
 * @param {any} filename
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const rails_service_blob_path: ((
  signed_id: RequiredRouteParameter,
  filename: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /rails/active_storage/blobs/proxy/:signed_id/*filename(.:format)
 * @param {any} signed_id
 * @param {any} filename
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const rails_service_blob_proxy_path: ((
  signed_id: RequiredRouteParameter,
  filename: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /feeds/:id/refresh(.:format)
 * @param {any} id
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const refresh_feed_path: ((
  id: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const root_path: ((
  options?: {} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /rails/active_storage/disk/:encoded_token(.:format)
 * @param {any} encoded_token
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const update_rails_disk_service_path: ((
  encoded_token: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

// By some reason this line prevents all types in a file
// from being automatically exported
export {};
