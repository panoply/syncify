/* eslint-disable no-use-before-define */

/** Represents an error in the input of a mutation.
 */
export type DisplayableError = {
  /** The path to the input field that caused the error. */
  field?: any;
  /** The error message. */
  message: string;
};

/** Returns information about pagination in a connection, in accordance with the
 * [Relay specification](https://relay.dev/graphql/connections.htm#sec-undefined.PageInfo).
 * For more information, please read our [GraphQL Pagination Usage Guide](https://shopify.dev/api/usage/pagination-graphql).
 */
export type PageInfo = {
  /** The cursor corresponding to the last node in edges. */
  endCursor?: any;
  /** Whether there are more pages to fetch following the current page. */
  hasNextPage: boolean;
  /** Whether there are any pages prior to the current page. */
  hasPreviousPage: boolean;
  /** The cursor corresponding to the first node in edges. */
  startCursor?: any;
};

/** Represents an error in the input of a mutation.
 */
export type UserError = DisplayableError & {
  /** The path to the input field that caused the error. */
  field?: any;
  /** The error message. */
  message: string;
};

/** An object with an ID field to support global identification, in accordance with the
 * [Relay specification](https://relay.dev/graphql/objectidentification.htm#sec-Node-Interface).
 * This interface is used by the [node](https://shopify.dev/api/admin-graphql/unstable/queries/node)
 * and [nodes](https://shopify.dev/api/admin-graphql/unstable/queries/nodes) queries.
 */
export type Node = {
  /** A globally-unique ID. */
  id: string;
};

/** The shop's online store channel.
 */
export type OnlineStore = {
  /** Storefront password information. */
  passwordProtection: OnlineStorePasswordProtection;
};

/** A theme for display on the storefront.
 */
export type OnlineStoreTheme = HasPublishedTranslations &
  Node & {
    /** The date and time when the theme was created. */
    createdAt: string;
    /** The files in the theme. */
    files?: any;
    /** A globally-unique ID. */
    id: string;
    /** The name of the theme, set by the merchant. */
    name: string;
    /** The prefix of the theme. */
    prefix: string;
    /** Whether the theme is processing. */
    processing: boolean;
    /** Whether the theme processing failed. */
    processingFailed: boolean;
    /** The role of the theme. */
    role: any;
    /** The theme store ID. */
    themeStoreId?: any;
    /** The published translations associated with the resource. */
    translations: Array<Translation>;
    /** The date and time when the theme was last updated. */
    updatedAt: string;
  };

/** An auto-generated type for paginating through multiple OnlineStoreThemes.
 */
export type OnlineStoreThemeConnection = {
  /** The connection between the node and its parent. Each edge contains a minimum of the edge's cursor and the node. */
  edges: Array<OnlineStoreThemeEdge>;
  /** A list of nodes that are contained in OnlineStoreThemeEdge. You can fetch data about an individual node, or you can follow the edges to fetch data about a collection of related nodes. At each node, you specify the fields that you want to retrieve. */
  nodes: Array<OnlineStoreTheme>;
  /** An object that’s used to retrieve [cursor information](https://shopify.dev/api/usage/pagination-graphql) about the current page. */
  pageInfo: PageInfo;
};

/** An auto-generated type which holds one OnlineStoreTheme and a cursor during pagination.
 */
export type OnlineStoreThemeEdge = {
  /** The position of each node in an array, used in [pagination](https://shopify.dev/api/usage/pagination-graphql). */
  cursor: string;
  /** The item at the end of OnlineStoreThemeEdge. */
  node: OnlineStoreTheme;
};

/** Represents a theme file.
 */
export type OnlineStoreThemeFile = {
  /** The body of the theme file. */
  body: OnlineStoreThemeFileBody;
  /** The md5 digest of the theme file for data integrity. */
  checksumMd5?: any;
  /** The content type of the theme file. */
  contentType: string;
  /** The date and time when the theme file was created. */
  createdAt: string;
  /** The unique identifier of the theme file. */
  filename: string;
  /** The size of the theme file in bytes. */
  size: string;
  /** The date and time when the theme file was last updated. */
  updatedAt: string;
};

/** Represents the body of a theme file.
 */
export type OnlineStoreThemeFileBody =
  | OnlineStoreThemeFileBodyBase64
  | OnlineStoreThemeFileBodyText
  | OnlineStoreThemeFileBodyUrl;

/** Represents the body of a theme file.
 */
export type OnlineStoreThemeFileBodyText = {
  /** The body of the theme file. */
  content: string;
};

/** An auto-generated type for paginating through multiple OnlineStoreThemeFiles.
 */
export type OnlineStoreThemeFileConnection = {
  /** The connection between the node and its parent. Each edge contains a minimum of the edge's cursor and the node. */
  edges: Array<OnlineStoreThemeFileEdge>;
  /** A list of nodes that are contained in OnlineStoreThemeFileEdge. You can fetch data about an individual node, or you can follow the edges to fetch data about a collection of related nodes. At each node, you specify the fields that you want to retrieve. */
  nodes: Array<OnlineStoreThemeFile>;
  /** An object that’s used to retrieve [cursor information](https://shopify.dev/api/usage/pagination-graphql) about the current page. */
  pageInfo: PageInfo;
  /** List of errors that occurred during the request. */
  userErrors: Array<OnlineStoreThemeFileReadResult>;
};

/** An auto-generated type which holds one OnlineStoreThemeFile and a cursor during pagination.
 */
export type OnlineStoreThemeFileEdge = {
  /** The position of each node in an array, used in [pagination](https://shopify.dev/api/usage/pagination-graphql). */
  cursor: string;
  /** The item at the end of OnlineStoreThemeFileEdge. */
  node: OnlineStoreThemeFile;
};

/** Represents the result of a copy, delete, or write operation performed on a theme file.
 */
export type OnlineStoreThemeFileOperationResult = {
  /** Unique identifier of the theme file. */
  filename: string;
};

/** Represents the result of a read operation performed on a theme asset.
 */
export type OnlineStoreThemeFileReadResult = {
  /** Type that indicates the result of the operation. */
  code: any;
  /** Unique identifier associated with the operation and the theme file. */
  filename: string;
};

/** The input fields for the file to create or update.
 */
export type OnlineStoreThemeFilesUpsertFileInput = {
  /** The body of the theme file. */
  body: OnlineStoreThemeFileBodyInput;
  /** The filename of the theme file. */
  filename: string;
};

/** User errors for theme file operations.
 */
export type OnlineStoreThemeFilesUserErrors = DisplayableError & {
  /** The error code. */
  code?: any;
  /** The path to the input field that caused the error. */
  field?: any;
  /** The filename of the theme file. */
  filename?: any;
  /** The error message. */
  message: string;
};

/** The input fields for Theme attributes to update.
 */
export type OnlineStoreThemeInput = {
  /** The new name of the theme. */
  name?: any;
};

/** Return type for `themeCreate` mutation.
 */
export type MutationThemeCreate = {
  themeCreate: {
    /** The theme that was created. */
    theme?: any;
    /** The list of errors that occurred from executing the mutation. */
    userErrors: Array<ThemeCreateUserError>;
  };
};

/** An error that occurs during the execution of `ThemeCreate`.
 */
export type ThemeCreateUserError = DisplayableError & {
  /** The error code. */
  code?: any;
  /** The path to the input field that caused the error. */
  field?: any;
  /** The error message. */
  message: string;
};

/** Return type for `themeFilesDelete` mutation.
 */
export type MutationThemeFilesDelete = {
  themeFilesDelete: {
    /** The resulting theme files. */
    deletedThemeFiles?: any;
    /** The list of errors that occurred from executing the mutation. */
    userErrors: Array<OnlineStoreThemeFilesUserErrors>;
  };
};

/** An error that occurs during the execution of `ThemeDelete`.
 */
export type ThemeDeleteUserError = DisplayableError & {
  /** The error code. */
  code?: any;
  /** The path to the input field that caused the error. */
  field?: any;
  /** The error message. */
  message: string;
};

/** Return type for `themeFilesUpsert` mutation.
 */
export type MutationThemeFilesUpsert = {
  themeFilesUpsert: {
    /** The theme files write job triggered by the mutation. */
    job?: any;
    /** The resulting theme files. */
    upsertedThemeFiles?: any;
    /** The list of errors that occurred from executing the mutation. */
    userErrors: Array<OnlineStoreThemeFilesUserErrors>;
  };
};

/** Return type for `themeFilesCopy` mutation.
 */
export type MutationThemeFilesCopy = {
  themeFilesCopy: {
    /** The resulting theme files. */
    copiedThemeFiles?: any;
    /** The list of errors that occurred from executing the mutation. */
    userErrors: Array<OnlineStoreThemeFilesUserErrors>;
  };
};

/** Return type for `themePublish` mutation.
 */
export type MutationThemePublish = {
  themePublish: {
    /** The theme that was published. */
    theme?: any;
    /** The list of errors that occurred from executing the mutation. */
    userErrors: Array<ThemePublishUserError>;
  };
};

/** An error that occurs during the execution of `ThemePublish`.
 */
export type ThemePublishUserError = DisplayableError & {
  /** The error code. */
  code?: any;
  /** The path to the input field that caused the error. */
  field?: any;
  /** The error message. */
  message: string;
};

/** The permission required to access a Shopify Admin API or Storefront API resource for a shop. Merchants grant access scopes that are requested by applications.
 */
export type AccessScope = {
  /** A description of the actions that the access scope allows an app to perform. */
  description: string;
  /** A readable string that represents the access scope. The string usually follows the format `{action}_{resource}`. `{action}` is `read` or `write`, and `{resource}` is the resource that the action can be performed on. `{action}` and `{resource}` are separated by an underscore. For example, `read_orders` or `write_products`. */
  handle: string;
};

/** Represents an installed application on a shop.
 */
export type AppInstallation = HasMetafields &
  Node & {
    /** The access scopes granted to the application by a merchant during installation. */
    accessScopes: Array<AccessScope>;
    /** The active application subscriptions billed to the shop on a recurring basis. */
    activeSubscriptions: Array<AppSubscription>;
    /** All subscriptions created for a shop. */
    allSubscriptions: AppSubscriptionConnection;
    /** Application which is installed. */
    app: App;
    /**
     * Channel associated with the installed application.
     * @deprecated Use `publication` instead.
     */
    channel?: any;
    /** Credits that can be used towards future app purchases. */
    credits: AppCreditConnection;
    /** A globally-unique ID. */
    id: string;
    /** The URL to launch the application. */
    launchUrl: string;
    /**
     * A [custom field](https://shopify.dev/docs/apps/build/custom-data),
     * including its `namespace` and `key`, that's associated with a Shopify resource
     * for the purposes of adding and storing additional information.
     */
    metafield?: any;
    /**
     * A list of [custom fields](https://shopify.dev/docs/apps/build/custom-data)
     * that a merchant associates with a Shopify resource.
     */
    metafields: MetafieldConnection;
    /** One-time purchases to a shop. */
    oneTimePurchases: AppPurchaseOneTimeConnection;
    /** The publication associated with the installed application. */
    publication?: any;
    /** The records that track the externally-captured revenue for the app. The records are used for revenue attribution purposes. */
    revenueAttributionRecords: AppRevenueAttributionRecordConnection;
    /**
     * Subscriptions charge to a shop on a recurring basis.
     * @deprecated Use `activeSubscriptions` instead.
     */
    subscriptions: Array<AppSubscription>;
    /** The URL to uninstall the application. */
    uninstallUrl?: any;
  };

/** Storefront password information.
 */
export type OnlineStorePasswordProtection = {
  /** Whether the storefront password is enabled. */
  enabled: boolean;
};

/** Published translations associated with the resource.
 */
export type HasPublishedTranslations = {
  /** The published translations associated with the resource. */
  translations: Array<Translation>;
};

/** Translation of a field of a resource.
 */
export type Translation = {
  /** On the resource that this translation belongs to, the reference to the value being translated. */
  key: string;
  /** ISO code of the translation locale. */
  locale: string;
  /** The market that the translation is specific to. Null value means the translation is available in all markets. */
  market?: any;
  /** Whether the original content has changed since this translation was updated. */
  outdated: boolean;
  /** The date and time when the translation was updated. */
  updatedAt?: any;
  /** Translation value. */
  value?: any;
};

/** Represents the base64 encoded body of a theme file.
 */
export type OnlineStoreThemeFileBodyBase64 = {
  /** The body of the theme file, base64 encoded. */
  contentBase64: string;
};

/** Represents the url of the body of a theme file.
 */
export type OnlineStoreThemeFileBodyUrl = {
  /** The short lived url for the body of the theme file. */
  url: string;
};

/** The input fields for the theme file body.
 */
export type OnlineStoreThemeFileBodyInput = {
  /** The input type of the theme file body. */
  type: any;
  /** The body of the theme file. */
  value: string;
};

/** A job corresponds to some long running task that the client should poll for status.
 */
export type Job = {
  /** This indicates if the job is still queued or has been run. */
  done: boolean;
  /** A globally-unique ID that's returned when running an asynchronous mutation. */
  id: string;
  /** This field will only resolve once the job is done. Can be used to ask for object(s) that have been changed by the job. */
  query?: any;
};

/** Represents information about the metafields associated to the specified resource.
 */
export type HasMetafields = {
  /**
   * A [custom field](https://shopify.dev/docs/apps/build/custom-data),
   * including its `namespace` and `key`, that's associated with a Shopify resource
   * for the purposes of adding and storing additional information.
   */
  metafield?: any;
  /**
   * A list of [custom fields](https://shopify.dev/docs/apps/build/custom-data)
   * that a merchant associates with a Shopify resource.
   */
  metafields: MetafieldConnection;
};

/** Provides users access to services and/or features for a duration of time.
 */
export type AppSubscription = Node & {
  /** The date and time when the app subscription was created. */
  createdAt: string;
  /** The date and time when the current app subscription period ends. Returns `null` if the subscription isn't active. */
  currentPeriodEnd?: any;
  /** A globally-unique ID. */
  id: string;
  /** The plans attached to the app subscription. */
  lineItems: Array<any>;
  /** The name of the app subscription. */
  name: string;
  /** The URL that the merchant is redirected to after approving the app subscription. */
  returnUrl: string;
  /** The status of the app subscription. */
  status: any;
  /** Specifies whether the app subscription is a test transaction. */
  test: boolean;
  /** The number of free trial days, starting at the subscription's creation date, by which billing is delayed. */
  trialDays: number;
};

/** An auto-generated type for paginating through multiple AppSubscriptions.
 */
export type AppSubscriptionConnection = {
  /** The connection between the node and its parent. Each edge contains a minimum of the edge's cursor and the node. */
  edges: Array<any>;
  /** A list of nodes that are contained in AppSubscriptionEdge. You can fetch data about an individual node, or you can follow the edges to fetch data about a collection of related nodes. At each node, you specify the fields that you want to retrieve. */
  nodes: Array<AppSubscription>;
  /** An object that’s used to retrieve [cursor information](https://shopify.dev/api/usage/pagination-graphql) about the current page. */
  pageInfo: PageInfo;
};

/** A Shopify application.
 */
export type App = Node & {
  /** A unique application API identifier. */
  apiKey: string;
  /** App store page URL of the app. */
  appStoreAppUrl?: any;
  /** App store page URL of the developer who created the app. */
  appStoreDeveloperUrl?: any;
  /** All requestable access scopes available to the app. */
  availableAccessScopes: Array<AccessScope>;
  /** Banner image for the app. */
  banner: any;
  /** Description of the app. */
  description?: any;
  /** The name of the app developer. */
  developerName?: any;
  /** The type of app developer. */
  developerType: any;
  /**
   * Website of the developer who created the app.
   * @deprecated Use `appStoreDeveloperUrl` instead.
   */
  developerUrl: string;
  /** Whether the app uses the Embedded App SDK. */
  embedded: boolean;
  /** Requirements that must be met before the app can be installed. */
  failedRequirements: Array<any>;
  /** A list of app features that are shown in the Shopify App Store listing. */
  features: Array<string>;
  /** Feedback from this app about the store. */
  feedback?: any;
  /** Handle of the app. */
  handle?: any;
  /** Icon that represents the app. */
  icon: any;
  /** A globally-unique ID. */
  id: string;
  /** Webpage where you can install the app. */
  installUrl?: any;
  /**
   * Corresponding AppInstallation for this shop and App.
   * Returns null if the App is not installed.
   */
  installation?: any;
  /** Whether the app is the [post purchase](https://shopify.dev/apps/checkout/post-purchase) app in use. */
  isPostPurchaseAppInUse: boolean;
  /**
   * Webpage that the app starts in.
   * @deprecated Use AppInstallation.launchUrl instead
   */
  launchUrl: string;
  /**
   * Menu items for the app, which also appear as submenu items in left navigation sidebar in the Shopify admin.
   * @deprecated Use AppInstallation.navigationItems instead
   */
  navigationItems: Array<any>;
  /** The optional scopes requested by the app. Lists the optional access scopes the app has declared in its configuration. These scopes are optionally requested by the app after installation. */
  optionalAccessScopes: Array<AccessScope>;
  /** Whether the app was previously installed on the current shop. */
  previouslyInstalled: boolean;
  /** Detailed information about the app pricing. */
  pricingDetails?: any;
  /** Summary of the app pricing details. */
  pricingDetailsSummary: string;
  /** Link to app privacy policy. */
  privacyPolicyUrl?: any;
  /** The public category for the app. */
  publicCategory: any;
  /** Whether the app is published to the Shopify App Store. */
  published: boolean;
  /** The access scopes requested by the app. Lists the access scopes the app has declared in its configuration. Merchant must grant approval to these scopes for the app to be installed. */
  requestedAccessScopes: Array<AccessScope>;
  /** Screenshots of the app. */
  screenshots: Array<any>;
  /** Whether the app was developed by Shopify. */
  shopifyDeveloped: boolean;
  /** Name of the app. */
  title: string;
  /**
   * Message that appears when the app is uninstalled. For example:
   * By removing this app, you will no longer be able to publish products to MySocialSite or view this app in your Shopify admin. You can re-enable this channel at any time.
   */
  uninstallMessage: string;
  /**
   * Webpage where you can uninstall the app.
   * @deprecated Use AppInstallation.uninstallUrl instead
   */
  uninstallUrl?: any;
  /** The webhook API version for the app. */
  webhookApiVersion: string;
};

/** A channel represents an app where you sell a group of products and collections.
 * A channel can be a platform or marketplace such as Facebook or Pinterest, an online store, or POS.
 */
export type Channel = Node & {
  /** The underlying app used by the channel. */
  app: App;
  /** The collection publications for the list of collections published to the channel. */
  collectionPublicationsV3: any;
  /** The list of collections published to the channel. */
  collections: any;
  /**
   * The unique identifier for the channel.
   * @deprecated Use `id` instead.
   */
  handle: string;
  /** Whether the collection is available to the channel. */
  hasCollection: boolean;
  /** A globally-unique ID. */
  id: string;
  /** The name of the channel. */
  name: string;
  /**
   * The menu items for the channel, which also appear as submenu items in the left navigation sidebar in the Shopify admin.
   * @deprecated Use [AppInstallation.navigationItems](
   *           https://shopify.dev/api/admin-graphql/current/objects/AppInstallation#field-appinstallation-navigationitems) instead.
   */
  navigationItems: Array<any>;
  /**
   * Home page for the channel.
   * @deprecated Use [AppInstallation.launchUrl](
   *           https://shopify.dev/api/admin-graphql/current/objects/AppInstallation#field-appinstallation-launchurl) instead.
   */
  overviewPath?: any;
  /**
   * The product publications for the products published to the channel.
   * @deprecated Use `productPublicationsV3` instead.
   */
  productPublications: any;
  /** The product publications for the list of products published to the channel. */
  productPublicationsV3: any;
  /** The list of products published to the channel. */
  products: any;
  /** The count of products published to the channel. Limited to a maximum of 10000. */
  productsCount?: any;
  /** Whether the channel supports future publishing. */
  supportsFuturePublishing: boolean;
};

/** An auto-generated type for paginating through multiple AppCredits.
 */
export type AppCreditConnection = {
  /** The connection between the node and its parent. Each edge contains a minimum of the edge's cursor and the node. */
  edges: Array<any>;
  /** A list of nodes that are contained in AppCreditEdge. You can fetch data about an individual node, or you can follow the edges to fetch data about a collection of related nodes. At each node, you specify the fields that you want to retrieve. */
  nodes: Array<any>;
  /** An object that’s used to retrieve [cursor information](https://shopify.dev/api/usage/pagination-graphql) about the current page. */
  pageInfo: PageInfo;
};

/** Metafields enable you to attach additional information to a Shopify resource, such as a [Product](https://shopify.dev/api/admin-graphql/latest/objects/product) or a [Collection](https://shopify.dev/api/admin-graphql/latest/objects/collection).
 * For more information about where you can attach metafields refer to [HasMetafields](https://shopify.dev/api/admin/graphql/reference/common-objects/HasMetafields).
 * Some examples of the data that metafields enable you to store are specifications, size charts, downloadable documents, release dates, images, or part numbers.
 * Metafields are identified by an owner resource, namespace, and key. and store a value along with type information for that value.
 */
export type Metafield = Node & {
  /** The data stored in the resource, represented as a digest. */
  compareDigest: string;
  /** The date and time when the metafield was created. */
  createdAt: string;
  /** The metafield definition that the metafield belongs to, if any. */
  definition?: any;
  /** The description of the metafield. */
  description?: any;
  /** A globally-unique ID. */
  id: string;
  /** The data stored in the metafield in JSON format. */
  jsonValue: Record<string, any>;
  /** The unique identifier for the metafield within its namespace. */
  key: string;
  /** The ID of the corresponding resource in the REST Admin API. */
  legacyResourceId: string;
  /** The container for a group of metafields that the metafield is associated with. */
  namespace: string;
  /** The resource that the metafield is attached to. */
  owner: HasMetafields;
  /** The type of resource that the metafield is attached to. */
  ownerType: any;
  /** Returns a reference object if the metafield definition's type is a resource reference. */
  reference?: any;
  /** A list of reference objects if the metafield's type is a resource reference list. */
  references?: any;
  /**
   * The type of data that is stored in the metafield.
   * Refer to the list of [supported types](https://shopify.dev/apps/metafields/types).
   */
  type: string;
  /** The date and time when the metafield was updated. */
  updatedAt: string;
  /** The data stored in the metafield. Always stored as a string, regardless of the metafield's type. */
  value: string;
};

/** An auto-generated type for paginating through multiple Metafields.
 */
export type MetafieldConnection = {
  /** The connection between the node and its parent. Each edge contains a minimum of the edge's cursor and the node. */
  edges: Array<any>;
  /** A list of nodes that are contained in MetafieldEdge. You can fetch data about an individual node, or you can follow the edges to fetch data about a collection of related nodes. At each node, you specify the fields that you want to retrieve. */
  nodes: Array<Metafield>;
  /** An object that’s used to retrieve [cursor information](https://shopify.dev/api/usage/pagination-graphql) about the current page. */
  pageInfo: PageInfo;
};

/** An auto-generated type for paginating through multiple AppPurchaseOneTimes.
 */
export type AppPurchaseOneTimeConnection = {
  /** The connection between the node and its parent. Each edge contains a minimum of the edge's cursor and the node. */
  edges: Array<any>;
  /** A list of nodes that are contained in AppPurchaseOneTimeEdge. You can fetch data about an individual node, or you can follow the edges to fetch data about a collection of related nodes. At each node, you specify the fields that you want to retrieve. */
  nodes: Array<any>;
  /** An object that’s used to retrieve [cursor information](https://shopify.dev/api/usage/pagination-graphql) about the current page. */
  pageInfo: PageInfo;
};

/** A publication is a group of products and collections that is published to an app.
 */
export type Publication = Node & {
  /**
   * The app associated with the publication.
   * @deprecated Use [AppCatalog.apps](https://shopify.dev/api/admin-graphql/unstable/objects/AppCatalog#connection-appcatalog-apps) instead.
   */
  app: App;
  /** Whether new products are automatically published to this publication. */
  autoPublish: boolean;
  /** The catalog associated with the publication. */
  catalog?: any;
  /** The collection publications for the list of collections published to the publication. */
  collectionPublicationsV3: any;
  /** The list of collections published to the publication. */
  collections: any;
  /** Whether the collection is available to the publication. */
  hasCollection: boolean;
  /** A globally-unique ID. */
  id: string;
  /**
   * Name of the publication.
   * @deprecated Use [Catalog.title](https://shopify.dev/api/admin-graphql/unstable/interfaces/Catalog#field-catalog-title) instead.
   */
  name: string;
  /** A background operation associated with this publication. */
  operation?: any;
  /** The product publications for the list of products published to the publication. */
  productPublicationsV3: any;
  /** The list of products published to the publication. */
  products: any;
  /** Whether the publication supports future publishing. */
  supportsFuturePublishing: boolean;
};

/** An auto-generated type for paginating through multiple AppRevenueAttributionRecords.
 */
export type AppRevenueAttributionRecordConnection = {
  /** The connection between the node and its parent. Each edge contains a minimum of the edge's cursor and the node. */
  edges: Array<any>;
  /** A list of nodes that are contained in AppRevenueAttributionRecordEdge. You can fetch data about an individual node, or you can follow the edges to fetch data about a collection of related nodes. At each node, you specify the fields that you want to retrieve. */
  nodes: Array<any>;
  /** An object that’s used to retrieve [cursor information](https://shopify.dev/api/usage/pagination-graphql) about the current page. */
  pageInfo: PageInfo;
};

/** List of abandoned checkouts. Includes checkouts that were recovered after being abandoned.
 */
export type QueryAbandonedCheckouts = {
  abandonedCheckouts: any;
};

/** Returns the count of abandoned checkouts for the given shop. Limited to a maximum of 10000.
 */
export type QueryAbandonedCheckoutsCount = {
  abandonedCheckoutsCount: any;
};

/** Returns an abandonment by ID.
 */
export type QueryAbandonment = {
  abandonment: any;
};

/** Returns an Abandonment by the Abandoned Checkout ID.
 */
export type QueryAbandonmentByAbandonedCheckoutId = {
  abandonmentByAbandonedCheckoutId: any;
};

/** Lookup an App by ID or return the currently authenticated App.
 */
export type QueryApp = {
  app: App;
};

/** Fetches app by handle.
 * Returns null if the app doesn't exist.
 */
export type QueryAppByHandle = {
  appByHandle: App;
};

/** Fetches an app by its client ID.
 * Returns null if the app doesn't exist.
 */
export type QueryAppByKey = {
  appByKey: App;
};

/** An app discount type.
 */
export type QueryAppDiscountType = {
  appDiscountType: any;
};

/** A list of app discount types installed by apps.
 */
export type QueryAppDiscountTypes = {
  appDiscountTypes: Array<any>;
};

/** Lookup an AppInstallation by ID or return the AppInstallation for the currently authenticated App.
 */
export type QueryAppInstallation = {
  appInstallation: AppInstallation;
};

/** A list of app installations. To use this query, you need to contact [Shopify Support](https://partners.shopify.com/current/support/) to grant your custom app the `read_apps` access scope. Public apps can't be granted this access scope.
 */
export type QueryAppInstallations = {
  appInstallations: any;
};

/** Returns an Article resource by ID.
 */
export type QueryArticle = {
  article: any;
};

/** List of all article tags.
 */
export type QueryArticleTags = {
  articleTags: Array<string>;
};

/** List of the shop's articles.
 */
export type QueryArticles = {
  articles: any;
};

/** The paginated list of fulfillment orders assigned to the shop locations owned by the app.
 *
 * Assigned fulfillment orders are fulfillment orders that are set to be fulfilled from locations
 * managed by
 * [fulfillment services](https://shopify.dev/api/admin-graphql/latest/objects/FulfillmentService)
 * that are registered by the app.
 * One app (api_client) can host multiple fulfillment services on a shop.
 * Each fulfillment service manages a dedicated location on a shop.
 * Assigned fulfillment orders can have associated
 * [fulfillment requests](https://shopify.dev/api/admin-graphql/latest/enums/FulfillmentOrderRequestStatus),
 * or might currently not be requested to be fulfilled.
 *
 * The app must have the `read_assigned_fulfillment_orders`
 * [access scope](https://shopify.dev/docs/api/usage/access-scopes)
 * to be able to retrieve the fulfillment orders assigned to its locations.
 *
 * All assigned fulfillment orders (except those with the `CLOSED` status) will be returned by default.
 * Perform filtering with the `assignmentStatus` argument
 * to receive only fulfillment orders that have been requested to be fulfilled.
 */
export type QueryAssignedFulfillmentOrders = {
  assignedFulfillmentOrders: any;
};

/** Returns an automatic discount resource by ID.
 * @deprecated Use `automaticDiscountNode` instead.
 */
export type QueryAutomaticDiscount = {
  automaticDiscount: any;
};

/** Returns an automatic discount resource by ID.
 */
export type QueryAutomaticDiscountNode = {
  automaticDiscountNode: any;
};

/** Returns a list of [automatic discounts](https://help.shopify.com/manual/discounts/discount-types#automatic-discounts).
 */
export type QueryAutomaticDiscountNodes = {
  automaticDiscountNodes: any;
};

/** List of the shop's automatic discount saved searches.
 */
export type QueryAutomaticDiscountSavedSearches = {
  automaticDiscountSavedSearches: any;
};

/** List of automatic discounts.
 * @deprecated Use `automaticDiscountNodes` instead.
 */
export type QueryAutomaticDiscounts = {
  automaticDiscounts: any;
};

/** Returns a list of activated carrier services and associated shop locations that support them.
 */
export type QueryAvailableCarrierServices = {
  availableCarrierServices: Array<any>;
};

/** A list of available locales.
 */
export type QueryAvailableLocales = {
  availableLocales: Array<any>;
};

/** Returns a Blog resource by ID.
 */
export type QueryBlog = {
  blog: any;
};

/** List of the shop's blogs.
 */
export type QueryBlogs = {
  blogs: any;
};

/** Count of blogs.
 */
export type QueryBlogsCount = {
  blogsCount: any;
};

/** Returns a list of Business Entities associated with the shop.
 */
export type QueryBusinessEntities = {
  businessEntities: Array<any>;
};

/** Returns a Business Entity by ID.
 */
export type QueryBusinessEntity = {
  businessEntity: any;
};

/** Returns a `DeliveryCarrierService` object by ID.
 */
export type QueryCarrierService = {
  carrierService: any;
};

/** Retrieve a list of CarrierServices.
 */
export type QueryCarrierServices = {
  carrierServices: any;
};

/** List of Cart transform objects owned by the current API client.
 */
export type QueryCartTransforms = {
  cartTransforms: any;
};

/** Lookup a cash tracking session by ID.
 */
export type QueryCashTrackingSession = {
  cashTrackingSession: any;
};

/** Returns a shop's cash tracking sessions for locations with a POS Pro subscription.
 *
 * Tip: To query for cash tracking sessions in bulk, you can
 * [perform a bulk operation](https://shopify.dev/docs/api/usage/bulk-operations/queries).
 */
export type QueryCashTrackingSessions = {
  cashTrackingSessions: any;
};

/** Returns a Catalog resource by ID.
 */
export type QueryCatalog = {
  catalog: any;
};

/** Returns the most recent catalog operations for the shop.
 */
export type QueryCatalogOperations = {
  catalogOperations: Array<any>;
};

/** The catalogs belonging to the shop.
 */
export type QueryCatalogs = {
  catalogs: any;
};

/** The count of catalogs belonging to the shop. Limited to a maximum of 10000.
 */
export type QueryCatalogsCount = {
  catalogsCount: any;
};

/** Lookup a channel by ID.
 * @deprecated Use `publication` instead.
 */
export type QueryChannel = {
  channel: Channel;
};

/** List of the active sales channels.
 * @deprecated Use `publications` instead.
 */
export type QueryChannels = {
  channels: any;
};

/** Returns the visual customizations for checkout for a given checkout profile.
 *
 * To learn more about updating checkout branding settings, refer to the
 * [checkoutBrandingUpsert](https://shopify.dev/api/admin-graphql/unstable/mutations/checkoutBrandingUpsert)
 * mutation and the checkout branding [tutorial](https://shopify.dev/docs/apps/checkout/styling).
 */
export type QueryCheckoutBranding = {
  checkoutBranding: any;
};

/** A checkout profile on a shop.
 */
export type QueryCheckoutProfile = {
  checkoutProfile: any;
};

/** List of checkout profiles on a shop.
 */
export type QueryCheckoutProfiles = {
  checkoutProfiles: any;
};

/** Returns a [code discount](https://help.shopify.com/manual/discounts/discount-types#discount-codes) resource by ID.
 */
export type QueryCodeDiscountNode = {
  codeDiscountNode: any;
};

/** Returns a code discount identified by its discount code.
 */
export type QueryCodeDiscountNodeByCode = {
  codeDiscountNodeByCode: any;
};

/** Returns a list of [code-based discounts](https://help.shopify.com/manual/discounts/discount-types#discount-codes).
 */
export type QueryCodeDiscountNodes = {
  codeDiscountNodes: any;
};

/** List of the shop's code discount saved searches.
 */
export type QueryCodeDiscountSavedSearches = {
  codeDiscountSavedSearches: any;
};

/** Returns a Collection resource by ID.
 */
export type QueryCollection = {
  collection: any;
};

/** Return a collection by its handle.
 * @deprecated Use `collectionByIdentifier` instead.
 */
export type QueryCollectionByHandle = {
  collectionByHandle: any;
};

/** Lists all rules that can be used to create smart collections.
 */
export type QueryCollectionRulesConditions = {
  collectionRulesConditions: Array<any>;
};

/** Returns a list of the shop's collection saved searches.
 */
export type QueryCollectionSavedSearches = {
  collectionSavedSearches: any;
};

/** Returns a list of collections.
 */
export type QueryCollections = {
  collections: any;
};

/** Count of collections. Limited to a maximum of 10000.
 */
export type QueryCollectionsCount = {
  collectionsCount: any;
};

/** Returns a Comment resource by ID.
 */
export type QueryComment = {
  comment: any;
};

/** List of the shop's comments.
 */
export type QueryComments = {
  comments: any;
};

/** Returns the list of companies in the shop.
 */
export type QueryCompanies = {
  companies: any;
};

/** The number of companies for a shop.
 */
export type QueryCompaniesCount = {
  companiesCount: any;
};

/** Returns a `Company` object by ID.
 */
export type QueryCompany = {
  company: any;
};

/** Returns a `CompanyContact` object by ID.
 */
export type QueryCompanyContact = {
  companyContact: any;
};

/** Returns a `CompanyContactRole` object by ID.
 */
export type QueryCompanyContactRole = {
  companyContactRole: any;
};

/** Returns a `CompanyLocation` object by ID.
 */
export type QueryCompanyLocation = {
  companyLocation: any;
};

/** Returns the list of company locations in the shop.
 */
export type QueryCompanyLocations = {
  companyLocations: any;
};

/** Return the AppInstallation for the currently authenticated App.
 */
export type QueryCurrentAppInstallation = {
  currentAppInstallation: AppInstallation;
};

/** Returns the current app's most recent BulkOperation. Apps can run one bulk query and one bulk mutation operation at a time, by shop.
 */
export type QueryCurrentBulkOperation = {
  currentBulkOperation: any;
};

/** The staff member making the API request.
 */
export type QueryCurrentStaffMember = {
  currentStaffMember: any;
};

/** Returns a Customer resource by ID.
 */
export type QueryCustomer = {
  customer: any;
};

/** Returns a customer account page.
 */
export type QueryCustomerAccountPage = {
  customerAccountPage: any;
};

/** List of the shop's customer account pages.
 */
export type QueryCustomerAccountPages = {
  customerAccountPages: any;
};

/** Return a customer by an identifier.
 */
export type QueryCustomerByIdentifier = {
  customerByIdentifier: any;
};

/** Returns the status of a customer merge request job.
 */
export type QueryCustomerMergeJobStatus = {
  customerMergeJobStatus: any;
};

/** Returns a preview of a customer merge request.
 */
export type QueryCustomerMergePreview = {
  customerMergePreview: any;
};

/** Returns a CustomerPaymentMethod resource by its ID.
 */
export type QueryCustomerPaymentMethod = {
  customerPaymentMethod: any;
};

/** List of the shop's customer saved searches.
 */
export type QueryCustomerSavedSearches = {
  customerSavedSearches: any;
};

/** The list of members, such as customers, that's associated with an individual segment.
 * The maximum page size is 1000.
 */
export type QueryCustomerSegmentMembers = {
  customerSegmentMembers: any;
};

/** Returns a segment members query resource by ID.
 */
export type QueryCustomerSegmentMembersQuery = {
  customerSegmentMembersQuery: any;
};

/** Whether a member, which is a customer, belongs to a segment.
 */
export type QueryCustomerSegmentMembership = {
  customerSegmentMembership: any;
};

/** Returns a list of customers.
 */
export type QueryCustomers = {
  customers: any;
};

/** The number of customers.
 */
export type QueryCustomersCount = {
  customersCount: any;
};

/** The paginated list of deletion events.
 * @deprecated Use `events` instead.
 */
export type QueryDeletionEvents = {
  deletionEvents: any;
};

/** The delivery customization.
 */
export type QueryDeliveryCustomization = {
  deliveryCustomization: any;
};

/** The delivery customizations.
 */
export type QueryDeliveryCustomizations = {
  deliveryCustomizations: any;
};

/** Returns a Delivery Profile resource by ID.
 */
export type QueryDeliveryProfile = {
  deliveryProfile: any;
};

/** Returns a list of saved delivery profiles.
 */
export type QueryDeliveryProfiles = {
  deliveryProfiles: any;
};

/** Returns delivery promise participants.
 */
export type QueryDeliveryPromiseParticipants = {
  deliveryPromiseParticipants: any;
};

/** Lookup a delivery promise provider.
 */
export type QueryDeliveryPromiseProvider = {
  deliveryPromiseProvider: any;
};

/** Represents the delivery promise settings for a shop.
 */
export type QueryDeliveryPromiseSettings = {
  deliveryPromiseSettings: any;
};

/** Returns the shop-wide shipping settings.
 */
export type QueryDeliverySettings = {
  deliverySettings: any;
};

/** The total number of discount codes for the shop.
 */
export type QueryDiscountCodesCount = {
  discountCodesCount: any;
};

/** Returns a discount resource by ID.
 */
export type QueryDiscountNode = {
  discountNode: any;
};

/** Returns a list of discounts.
 */
export type QueryDiscountNodes = {
  discountNodes: any;
};

/** The total number of discounts for the shop. Limited to a maximum of 10000.
 */
export type QueryDiscountNodesCount = {
  discountNodesCount: any;
};

/** Returns a bulk code creation resource by ID.
 */
export type QueryDiscountRedeemCodeBulkCreation = {
  discountRedeemCodeBulkCreation: any;
};

/** List of the shop's redeemed discount code saved searches.
 */
export type QueryDiscountRedeemCodeSavedSearches = {
  discountRedeemCodeSavedSearches: any;
};

/** Returns dispute details based on ID.
 */
export type QueryDispute = {
  dispute: any;
};

/** Returns dispute evidence details based on ID.
 */
export type QueryDisputeEvidence = {
  disputeEvidence: any;
};

/** All disputes related to the Shop.
 */
export type QueryDisputes = {
  disputes: any;
};

/** Lookup a Domain by ID.
 */
export type QueryDomain = {
  domain: any;
};

/** Returns a DraftOrder resource by ID.
 */
export type QueryDraftOrder = {
  draftOrder: any;
};

/** List of the shop's draft order saved searches.
 */
export type QueryDraftOrderSavedSearches = {
  draftOrderSavedSearches: any;
};

/** Returns a DraftOrderTag resource by ID.
 */
export type QueryDraftOrderTag = {
  draftOrderTag: any;
};

/** List of saved draft orders.
 */
export type QueryDraftOrders = {
  draftOrders: any;
};

/** Get a single event by its id.
 */
export type QueryEvent = {
  event: any;
};

/** The paginated list of events associated with the store.
 */
export type QueryEvents = {
  events: any;
};

/** Count of events. Limited to a maximum of 10000.
 */
export type QueryEventsCount = {
  eventsCount: any;
};

/** A list of the shop's file saved searches.
 */
export type QueryFileSavedSearches = {
  fileSavedSearches: any;
};

/** Returns a paginated list of files that have been uploaded to Shopify.
 */
export type QueryFiles = {
  files: any;
};

/** Returns a Fulfillment resource by ID.
 */
export type QueryFulfillment = {
  fulfillment: any;
};

/** The fulfillment constraint rules that belong to a shop.
 */
export type QueryFulfillmentConstraintRules = {
  fulfillmentConstraintRules: Array<any>;
};

/** Returns a Fulfillment order resource by ID.
 */
export type QueryFulfillmentOrder = {
  fulfillmentOrder: any;
};

/** The paginated list of all fulfillment orders.
 * The returned fulfillment orders are filtered according to the
 * [fulfillment order access scopes](https://shopify.dev/api/admin-graphql/latest/objects/fulfillmentorder#api-access-scopes)
 * granted to the app.
 *
 * Use this query to retrieve fulfillment orders assigned to merchant-managed locations,
 * third-party fulfillment service locations, or all kinds of locations together.
 *
 * For fetching only the fulfillment orders assigned to the app's locations, use the
 * [assignedFulfillmentOrders](https://shopify.dev/api/admin-graphql/2024-07/objects/queryroot#connection-assignedfulfillmentorders)
 * connection.
 */
export type QueryFulfillmentOrders = {
  fulfillmentOrders: any;
};

/** Returns a FulfillmentService resource by ID.
 */
export type QueryFulfillmentService = {
  fulfillmentService: any;
};

/** Returns a gift card resource by ID.
 */
export type QueryGiftCard = {
  giftCard: any;
};

/** Returns a list of gift cards.
 */
export type QueryGiftCards = {
  giftCards: any;
};

/** The total number of gift cards issued for the shop. Limited to a maximum of 10000.
 */
export type QueryGiftCardsCount = {
  giftCardsCount: any;
};

/** Returns an
 * [InventoryItem](https://shopify.dev/docs/api/admin-graphql/latest/objects/InventoryItem)
 * object by ID.
 */
export type QueryInventoryItem = {
  inventoryItem: any;
};

/** Returns a list of inventory items.
 */
export type QueryInventoryItems = {
  inventoryItems: any;
};

/** Returns an
 * [InventoryLevel](https://shopify.dev/docs/api/admin-graphql/latest/objects/InventoryLevel)
 * object by ID.
 */
export type QueryInventoryLevel = {
  inventoryLevel: any;
};

/** General inventory properties for the shop.
 */
export type QueryInventoryProperties = {
  inventoryProperties: any;
};

/** Returns a Job resource by ID. Used to check the status of internal jobs and any applicable changes.
 */
export type QueryJob = {
  job: Job;
};

/** Returns an inventory Location resource by ID.
 */
export type QueryLocation = {
  location: any;
};

/** Returns a list of active inventory locations.
 */
export type QueryLocations = {
  locations: any;
};

/** Returns a list of all origin locations available for a delivery profile.
 * @deprecated Use `locationsAvailableForDeliveryProfilesConnection` instead.
 */
export type QueryLocationsAvailableForDeliveryProfiles = {
  locationsAvailableForDeliveryProfiles: Array<any>;
};

/** Returns a list of all origin locations available for a delivery profile.
 */
export type QueryLocationsAvailableForDeliveryProfilesConnection = {
  locationsAvailableForDeliveryProfilesConnection: any;
};

/** Returns the count of locations for the given shop. Limited to a maximum of 10000.
 */
export type QueryLocationsCount = {
  locationsCount: any;
};

/** Returns a list of fulfillment orders that are on hold.
 */
export type QueryManualHoldsFulfillmentOrders = {
  manualHoldsFulfillmentOrders: any;
};

/** Returns a market resource by ID.
 */
export type QueryMarket = {
  market: any;
};

/** Returns the applicable market for a customer based on where they are in the world.
 */
export type QueryMarketByGeography = {
  marketByGeography: any;
};

/** A resource that can have localized values for different markets.
 */
export type QueryMarketLocalizableResource = {
  marketLocalizableResource: any;
};

/** Resources that can have localized values for different markets.
 */
export type QueryMarketLocalizableResources = {
  marketLocalizableResources: any;
};

/** Resources that can have localized values for different markets.
 */
export type QueryMarketLocalizableResourcesByIds = {
  marketLocalizableResourcesByIds: any;
};

/** A list of marketing activities associated with the marketing app.
 */
export type QueryMarketingActivities = {
  marketingActivities: any;
};

/** Returns a MarketingActivity resource by ID.
 */
export type QueryMarketingActivity = {
  marketingActivity: any;
};

/** Returns a MarketingEvent resource by ID.
 */
export type QueryMarketingEvent = {
  marketingEvent: any;
};

/** A list of marketing events associated with the marketing app.
 */
export type QueryMarketingEvents = {
  marketingEvents: any;
};

/** The markets configured for the shop.
 */
export type QueryMarkets = {
  markets: any;
};

/** Returns a Menu resource by ID.
 */
export type QueryMenu = {
  menu: any;
};

/** The shop's menus.
 */
export type QueryMenus = {
  menus: any;
};

/** Returns a metafield definition by identifier.
 */
export type QueryMetafieldDefinition = {
  metafieldDefinition: any;
};

/** Each metafield definition has a type, which defines the type of information that it can store.
 * This type is enforced across every instance of the resource that owns the metafield definition.
 *
 * Refer to the [list of supported metafield types](https://shopify.dev/apps/metafields/types).
 */
export type QueryMetafieldDefinitionTypes = {
  metafieldDefinitionTypes: Array<any>;
};

/** Returns a list of metafield definitions.
 */
export type QueryMetafieldDefinitions = {
  metafieldDefinitions: any;
};

/** Retrieves a metaobject by ID.
 */
export type QueryMetaobject = {
  metaobject: any;
};

/** Retrieves a metaobject by handle.
 */
export type QueryMetaobjectByHandle = {
  metaobjectByHandle: any;
};

/** Retrieves a metaobject definition by ID.
 */
export type QueryMetaobjectDefinition = {
  metaobjectDefinition: any;
};

/** Finds a metaobject definition by type.
 */
export type QueryMetaobjectDefinitionByType = {
  metaobjectDefinitionByType: any;
};

/** All metaobject definitions.
 */
export type QueryMetaobjectDefinitions = {
  metaobjectDefinitions: any;
};

/** All metaobjects for the shop.
 */
export type QueryMetaobjects = {
  metaobjects: any;
};

/** Return a mobile platform application by its ID.
 */
export type QueryMobilePlatformApplication = {
  mobilePlatformApplication: any;
};

/** List the mobile platform applications.
 */
export type QueryMobilePlatformApplications = {
  mobilePlatformApplications: any;
};

/** Returns a specific node (any object that implements the
 * [Node](https://shopify.dev/api/admin-graphql/latest/interfaces/Node)
 * interface) by ID, in accordance with the
 * [Relay specification](https://relay.dev/docs/guides/graphql-server-specification/#object-identification).
 * This field is commonly used for refetching an object.
 */
export type QueryNode = {
  node: Node;
};

/** Returns the list of nodes (any objects that implement the
 * [Node](https://shopify.dev/api/admin-graphql/latest/interfaces/Node)
 * interface) with the given IDs, in accordance with the
 * [Relay specification](https://relay.dev/docs/guides/graphql-server-specification/#object-identification).
 */
export type QueryNodes = {
  nodes: Array<any>;
};

/** The shop's online store channel.
 */
export type QueryOnlineStore = {
  onlineStore: OnlineStore;
};

/** Returns an Order resource by ID.
 */
export type QueryOrder = {
  order: any;
};

/** Returns a payment status by payment reference ID. Used to check the status of a deferred payment.
 */
export type QueryOrderPaymentStatus = {
  orderPaymentStatus: any;
};

/** List of the shop's order saved searches.
 */
export type QueryOrderSavedSearches = {
  orderSavedSearches: any;
};

/** Returns a list of orders placed in the store.
 */
export type QueryOrders = {
  orders: any;
};

/** Returns the count of orders for the given shop. Limited to a maximum of 10000.
 */
export type QueryOrdersCount = {
  ordersCount: any;
};

/** Returns a Page resource by ID.
 */
export type QueryPage = {
  page: any;
};

/** List of the shop's pages.
 */
export type QueryPages = {
  pages: any;
};

/** Count of pages.
 */
export type QueryPagesCount = {
  pagesCount: any;
};

/** The payment customization.
 */
export type QueryPaymentCustomization = {
  paymentCustomization: any;
};

/** The payment customizations.
 */
export type QueryPaymentCustomizations = {
  paymentCustomizations: any;
};

/** The list of payment terms templates eligible for all shops and users.
 */
export type QueryPaymentTermsTemplates = {
  paymentTermsTemplates: Array<any>;
};

/** The number of pendings orders. Limited to a maximum of 10000.
 */
export type QueryPendingOrdersCount = {
  pendingOrdersCount: any;
};

/** Returns a price list resource by ID.
 */
export type QueryPriceList = {
  priceList: any;
};

/** All price lists for a shop.
 */
export type QueryPriceLists = {
  priceLists: any;
};

/** The primary market of the shop.
 * @deprecated Use `backupRegion` instead.
 */
export type QueryPrimaryMarket = {
  primaryMarket: any;
};

/** Returns a Product resource by ID.
 */
export type QueryProduct = {
  product: any;
};

/** Return a product by its handle.
 * @deprecated Use `productByIdentifier` instead.
 */
export type QueryProductByHandle = {
  productByHandle: any;
};

/** Return a product by an identifier.
 */
export type QueryProductByIdentifier = {
  productByIdentifier: any;
};

/** Returns the product duplicate job.
 */
export type QueryProductDuplicateJob = {
  productDuplicateJob: any;
};

/** Returns a ProductFeed resource by ID.
 */
export type QueryProductFeed = {
  productFeed: any;
};

/** The product feeds for the shop.
 */
export type QueryProductFeeds = {
  productFeeds: any;
};

/** Returns a ProductOperation resource by ID.
 *
 * This can be used to query the
 * [ProductSetOperation](https://shopify.dev/api/admin-graphql/current/objects/ProductSetOperation), using
 * the ID that was returned
 * [when the product was created or updated](https://shopify.dev/api/admin/migrate/new-product-model/sync-data#create-a-product-with-variants-and-options-asynchronously)
 * by the
 * [ProductSet](https://shopify.dev/api/admin-graphql/current/mutations/productSet) mutation.
 *
 * The `status` field indicates whether the operation is `CREATED`, `ACTIVE`, or `COMPLETE`.
 *
 * The `product` field provides the details of the created or updated product.
 *
 * For the
 * [ProductSetOperation](https://shopify.dev/api/admin-graphql/current/objects/ProductSetOperation), the
 * `userErrors` field provides mutation errors that occurred during the operation.
 */
export type QueryProductOperation = {
  productOperation: any;
};

/** Returns the product resource feedback for the currently authenticated app.
 */
export type QueryProductResourceFeedback = {
  productResourceFeedback: any;
};

/** Returns a list of the shop's product saved searches.
 */
export type QueryProductSavedSearches = {
  productSavedSearches: any;
};

/** A list of tags that have been added to products.
 * The maximum page size is 5000.
 */
export type QueryProductTags = {
  productTags: any;
};

/** The list of types added to products.
 * The maximum page size is 1000.
 */
export type QueryProductTypes = {
  productTypes: any;
};

/** Returns a ProductVariant resource by ID.
 */
export type QueryProductVariant = {
  productVariant: any;
};

/** Returns a list of product variants.
 */
export type QueryProductVariants = {
  productVariants: any;
};

/** Count of product variants.
 */
export type QueryProductVariantsCount = {
  productVariantsCount: any;
};

/** The list of vendors added to products.
 * The maximum page size is 1000.
 */
export type QueryProductVendors = {
  productVendors: any;
};

/** Returns a list of products.
 */
export type QueryProducts = {
  products: any;
};

/** Count of products.
 */
export type QueryProductsCount = {
  productsCount: any;
};

/** The list of publicly-accessible Admin API versions, including supported versions, the release candidate, and unstable versions.
 */
export type QueryPublicApiVersions = {
  publicApiVersions: Array<any>;
};

/** Lookup a publication by ID.
 */
export type QueryPublication = {
  publication: Publication;
};

/** List of publications.
 */
export type QueryPublications = {
  publications: any;
};

/** Count of publications.
 */
export type QueryPublicationsCount = {
  publicationsCount: any;
};

/** Returns a count of published products by publication ID.
 */
export type QueryPublishedProductsCount = {
  publishedProductsCount: any;
};

/** Returns a Refund resource by ID.
 */
export type QueryRefund = {
  refund: any;
};

/** Returns a Return resource by ID.
 */
export type QueryReturn = {
  return: any;
};

/** The calculated monetary value to be exchanged due to the return.
 */
export type QueryReturnCalculate = {
  returnCalculate: any;
};

/** Lookup a returnable fulfillment by ID.
 */
export type QueryReturnableFulfillment = {
  returnableFulfillment: any;
};

/** List of returnable fulfillments.
 */
export type QueryReturnableFulfillments = {
  returnableFulfillments: any;
};

/** Lookup a reverse delivery by ID.
 */
export type QueryReverseDelivery = {
  reverseDelivery: any;
};

/** Lookup a reverse fulfillment order by ID.
 */
export type QueryReverseFulfillmentOrder = {
  reverseFulfillmentOrder: any;
};

/** <div class="note"><h4>Theme app extensions</h4>
 *   <p>Your app might not pass App Store review if it uses script tags instead of theme app extensions. All new apps, and apps that integrate with Online Store 2.0 themes, should use theme app extensions, such as app blocks or app embed blocks. Script tags are an alternative you can use with only vintage themes. <a href="/apps/online-store#what-integration-method-should-i-use" target="_blank">Learn more</a>.</p></div>
 *
 * <div class="note"><h4>Script tag deprecation</h4>
 *   <p>Script tags will be sunset for the <b>Order status</b> page on August 28, 2025. <a href="https://www.shopify.com/plus/upgrading-to-checkout-extensibility">Upgrade to Checkout Extensibility</a> before this date. <a href="/docs/api/liquid/objects#script">Shopify Scripts</a> will continue to work alongside Checkout Extensibility until August 28, 2025.</p></div>
 *
 *
 * Lookup a script tag resource by ID.
 */
export type QueryScriptTag = {
  scriptTag: any;
};

/** <div class="note"><h4>Theme app extensions</h4>
 *   <p>Your app might not pass App Store review if it uses script tags instead of theme app extensions. All new apps, and apps that integrate with Online Store 2.0 themes, should use theme app extensions, such as app blocks or app embed blocks. Script tags are an alternative you can use with only vintage themes. <a href="/apps/online-store#what-integration-method-should-i-use" target="_blank">Learn more</a>.</p></div>
 *
 * <div class="note"><h4>Script tag deprecation</h4>
 *   <p>Script tags will be sunset for the <b>Order status</b> page on August 28, 2025. <a href="https://www.shopify.com/plus/upgrading-to-checkout-extensibility">Upgrade to Checkout Extensibility</a> before this date. <a href="/docs/api/liquid/objects#script">Shopify Scripts</a> will continue to work alongside Checkout Extensibility until August 28, 2025.</p></div>
 *
 *
 * A list of script tags.
 */
export type QueryScriptTags = {
  scriptTags: any;
};

/** The Customer Segment.
 */
export type QuerySegment = {
  segment: any;
};

/** A list of filter suggestions associated with a segment. A segment is a group of members (commonly customers) that meet specific criteria.
 */
export type QuerySegmentFilterSuggestions = {
  segmentFilterSuggestions: any;
};

/** A list of filters.
 */
export type QuerySegmentFilters = {
  segmentFilters: any;
};

/** A list of a shop's segment migrations.
 */
export type QuerySegmentMigrations = {
  segmentMigrations: any;
};

/** The list of suggested values corresponding to a particular filter for a segment. A segment is a group of members, such as customers, that meet specific criteria.
 */
export type QuerySegmentValueSuggestions = {
  segmentValueSuggestions: any;
};

/** A list of a shop's segments.
 */
export type QuerySegments = {
  segments: any;
};

/** The number of segments for a shop.
 */
export type QuerySegmentsCount = {
  segmentsCount: any;
};

/** Returns a Selling Plan Group resource by ID.
 */
export type QuerySellingPlanGroup = {
  sellingPlanGroup: any;
};

/** List Selling Plan Groups.
 */
export type QuerySellingPlanGroups = {
  sellingPlanGroups: any;
};

/** The server pixel configured by the app.
 */
export type QueryServerPixel = {
  serverPixel: any;
};

/** Returns the Shop resource corresponding to the access token used in the request. The Shop resource contains
 * business and store management settings for the shop.
 */
export type QueryShop = {
  shop: any;
};

/** The shop's billing preferences.
 */
export type QueryShopBillingPreferences = {
  shopBillingPreferences: any;
};

/** A list of locales available on a shop.
 */
export type QueryShopLocales = {
  shopLocales: Array<any>;
};

/** Returns a Shopify Function by its ID.
 * [Functions](https://shopify.dev/apps/build/functions)
 * enable you to customize Shopify's backend logic at defined parts of the commerce loop.
 */
export type QueryShopifyFunction = {
  shopifyFunction: any;
};

/** Returns the Shopify Functions owned by the querying API client installed on the shop.
 */
export type QueryShopifyFunctions = {
  shopifyFunctions: any;
};

/** Shopify Payments account information, including balances and payouts.
 */
export type QueryShopifyPaymentsAccount = {
  shopifyPaymentsAccount: any;
};

/** The StaffMember resource, by ID.
 */
export type QueryStaffMember = {
  staffMember: any;
};

/** The shop staff members.
 */
export type QueryStaffMembers = {
  staffMembers: any;
};

/** Standard metafield definitions are intended for specific, common use cases. Their namespace and keys reflect these use cases and are reserved.
 *
 * Refer to all available [`Standard Metafield Definition Templates`](https://shopify.dev/api/admin-graphql/latest/objects/StandardMetafieldDefinitionTemplate).
 */
export type QueryStandardMetafieldDefinitionTemplates = {
  standardMetafieldDefinitionTemplates: any;
};

/** Returns a store credit account resource by ID.
 */
export type QueryStoreCreditAccount = {
  storeCreditAccount: any;
};

/** Returns a SubscriptionBillingAttempt by ID.
 */
export type QuerySubscriptionBillingAttempt = {
  subscriptionBillingAttempt: any;
};

/** Returns subscription billing attempts on a store.
 */
export type QuerySubscriptionBillingAttempts = {
  subscriptionBillingAttempts: any;
};

/** Returns a subscription billing cycle found either by cycle index or date.
 */
export type QuerySubscriptionBillingCycle = {
  subscriptionBillingCycle: any;
};

/** Retrieves the results of the asynchronous job for the subscription billing cycle bulk action based on the specified job ID.
 * This query can be used to obtain the billing cycles that match the criteria defined in the subscriptionBillingCycleBulkSearch and subscriptionBillingCycleBulkCharge mutations.
 */
export type QuerySubscriptionBillingCycleBulkResults = {
  subscriptionBillingCycleBulkResults: any;
};

/** Returns subscription billing cycles for a contract ID.
 */
export type QuerySubscriptionBillingCycles = {
  subscriptionBillingCycles: any;
};

/** Returns a Subscription Contract resource by ID.
 */
export type QuerySubscriptionContract = {
  subscriptionContract: any;
};

/** List Subscription Contracts.
 */
export type QuerySubscriptionContracts = {
  subscriptionContracts: any;
};

/** Returns a Subscription Draft resource by ID.
 */
export type QuerySubscriptionDraft = {
  subscriptionDraft: any;
};

/** The Taxonomy resource lets you access the categories, attributes and values of the loaded taxonomy tree.
 */
export type QueryTaxonomy = {
  taxonomy: any;
};

/** Returns a list of TenderTransactions associated with the shop.
 */
export type QueryTenderTransactions = {
  tenderTransactions: any;
};

/** Returns a particular theme for the shop.
 */
export type QueryTheme = {
  theme: OnlineStoreTheme;
};

/** Returns a paginated list of themes for the shop.
 */
export type QueryThemes = {
  themes: OnlineStoreThemeConnection;
};

/** A resource that can have localized values for different languages.
 */
export type QueryTranslatableResource = {
  translatableResource: any;
};

/** Resources that can have localized values for different languages.
 */
export type QueryTranslatableResources = {
  translatableResources: any;
};

/** Resources that can have localized values for different languages.
 */
export type QueryTranslatableResourcesByIds = {
  translatableResourcesByIds: any;
};

/** Returns a redirect resource by ID.
 */
export type QueryUrlRedirect = {
  urlRedirect: any;
};

/** Returns a redirect import resource by ID.
 */
export type QueryUrlRedirectImport = {
  urlRedirectImport: any;
};

/** A list of the shop's URL redirect saved searches.
 */
export type QueryUrlRedirectSavedSearches = {
  urlRedirectSavedSearches: any;
};

/** A list of redirects for a shop.
 */
export type QueryUrlRedirects = {
  urlRedirects: any;
};

/** Count of redirects. Limited to a maximum of 10000.
 */
export type QueryUrlRedirectsCount = {
  urlRedirectsCount: any;
};

/** Validation available on the shop.
 */
export type QueryValidation = {
  validation: any;
};

/** Validations available on the shop.
 */
export type QueryValidations = {
  validations: any;
};

/** Returns a
 * [web pixel](https://shopify.dev/docs/apps/build/marketing-analytics/build-web-pixels)
 * by ID.
 */
export type QueryWebPixel = {
  webPixel: any;
};

/** Returns a webhook subscription by ID.
 *
 * Building an app? If you only use app-specific webhooks, you won't need this. App-specific webhook subscriptions specified in your `shopify.app.toml` may be easier. They are automatically kept up to date by Shopify & require less maintenance. Please read [About managing webhook subscriptions](https://shopify.dev/docs/apps/build/webhooks/subscribe).
 */
export type QueryWebhookSubscription = {
  webhookSubscription: any;
};

/** Returns a list of webhook subscriptions.
 *
 * Building an app? If you only use app-specific webhooks, you won't need this. App-specific webhook subscriptions specified in your `shopify.app.toml` may be easier. They are automatically kept up to date by Shopify & require less maintenance. Please read [About managing webhook subscriptions](https://shopify.dev/docs/apps/build/webhooks/subscribe).
 */
export type QueryWebhookSubscriptions = {
  webhookSubscriptions: any;
};

/** The count of webhook subscriptions.
 *
 * Building an app? If you only use app-specific webhooks, you won't need this. App-specific webhook subscriptions specified in your `shopify.app.toml` may be easier. They are automatically kept up to date by Shopify & require less maintenance. Please read [About managing webhook subscriptions](https://shopify.dev/docs/apps/build/webhooks/subscribe). Limited to a maximum of 10000.
 */
export type QueryWebhookSubscriptionsCount = {
  webhookSubscriptionsCount: any;
};
