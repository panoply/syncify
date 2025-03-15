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

/** A checkout that was abandoned by the customer.
 */
export type AbandonedCheckout = Navigable &
  Node & {
    /** The URL for the buyer to recover their checkout. */
    abandonedCheckoutUrl: string;
    /**
     * The billing address provided by the buyer.
     * Null if the user did not provide a billing address.
     */
    billingAddress?: any;
    /**
     * The date and time when the buyer completed the checkout.
     * Null if the checkout has not been completed.
     */
    completedAt?: any;
    /** The date and time when the checkout was created. */
    createdAt: string;
    /** A list of extra information that has been added to the checkout. */
    customAttributes: Array<Attribute>;
    /**
     * The customer who created this checkout.
     * May be null if the checkout was created from a draft order or via an app.
     */
    customer?: any;
    /** A default [cursor](https://shopify.dev/api/usage/pagination-graphql) that returns the single next record, sorted ascending by ID. */
    defaultCursor: string;
    /** The discount codes entered by the buyer at checkout. */
    discountCodes: Array<string>;
    /** A globally-unique ID. */
    id: string;
    /** A list of the line items in this checkout. */
    lineItems: AbandonedCheckoutLineItemConnection;
    /**
     * The number of products in the checkout.
     * @deprecated Use [AbandonedCheckoutLineItem.quantity](https://shopify.dev/api/admin-graphql/unstable/objects/AbandonedCheckoutLineItem#field-quantity) instead.
     */
    lineItemsQuantity: number;
    /** Unique merchant-facing identifier for the checkout. */
    name: string;
    /** A merchant-facing note added to the checkout. Not visible to the buyer. */
    note: string;
    /**
     * The shipping address to where the line items will be shipped.
     * Null if the user did not provide a shipping address.
     */
    shippingAddress?: any;
    /** The sum of all items in the checkout, including discounts but excluding shipping, taxes and tips. */
    subtotalPriceSet: MoneyBag;
    /** Individual taxes charged on the checkout. */
    taxLines: Array<TaxLine>;
    /** Whether taxes are included in line item and shipping line prices. */
    taxesIncluded: boolean;
    /** The total amount of discounts to be applied. */
    totalDiscountSet: MoneyBag;
    /** The total duties applied to the checkout. */
    totalDutiesSet?: any;
    /** The sum of the prices of all line items in the checkout. */
    totalLineItemsPriceSet: MoneyBag;
    /** The sum of all items in the checkout, including discounts, shipping, taxes, and tips. */
    totalPriceSet: MoneyBag;
    /** The total tax applied to the checkout. */
    totalTaxSet?: any;
    /** The date and time when the checkout was most recently updated. */
    updatedAt: string;
  };

/** An auto-generated type for paginating through multiple AbandonedCheckouts.
 */
export type AbandonedCheckoutConnection = {
  /** The connection between the node and its parent. Each edge contains a minimum of the edge's cursor and the node. */
  edges: Array<AbandonedCheckoutEdge>;
  /** A list of nodes that are contained in AbandonedCheckoutEdge. You can fetch data about an individual node, or you can follow the edges to fetch data about a collection of related nodes. At each node, you specify the fields that you want to retrieve. */
  nodes: Array<AbandonedCheckout>;
  /** An object that’s used to retrieve [cursor information](https://shopify.dev/api/usage/pagination-graphql) about the current page. */
  pageInfo: PageInfo;
};

/** A default cursor that you can use in queries to paginate your results. Each edge in a connection can
 * return a cursor, which is a reference to the edge's position in the connection. You can use an edge's cursor as
 * the starting point to retrieve the nodes before or after it in a connection.
 *
 * To learn more about using cursor-based pagination, refer to
 * [Paginating results with GraphQL](https://shopify.dev/api/usage/pagination-graphql).
 */
export type Navigable = {
  /** A default [cursor](https://shopify.dev/api/usage/pagination-graphql) that returns the single next record, sorted ascending by ID. */
  defaultCursor: string;
};

/** Represents a customer mailing address.
 *
 * For example, a customer's default address and an order's billing address are both mailling addresses.
 */
export type MailingAddress = Node & {
  /** The first line of the address. Typically the street address or PO Box number. */
  address1?: any;
  /** The second line of the address. Typically the number of the apartment, suite, or unit. */
  address2?: any;
  /** The name of the city, district, village, or town. */
  city?: any;
  /** The name of the customer's company or organization. */
  company?: any;
  /** Whether the address corresponds to recognized latitude and longitude values. */
  coordinatesValidated: boolean;
  /** The name of the country. */
  country?: any;
  /**
   * The two-letter code for the country of the address.
   *
   * For example, US.
   * @deprecated Use `countryCodeV2` instead.
   */
  countryCode?: any;
  /**
   * The two-letter code for the country of the address.
   *
   * For example, US.
   */
  countryCodeV2?: any;
  /** The first name of the customer. */
  firstName?: any;
  /** A formatted version of the address, customized by the provided arguments. */
  formatted: Array<string>;
  /** A comma-separated list of the values for city, province, and country. */
  formattedArea?: any;
  /** A globally-unique ID. */
  id: string;
  /** The last name of the customer. */
  lastName?: any;
  /** The latitude coordinate of the customer address. */
  latitude?: any;
  /** The longitude coordinate of the customer address. */
  longitude?: any;
  /** The full name of the customer, based on firstName and lastName. */
  name?: any;
  /** A unique phone number for the customer. */
  phone?: any;
  /** The region of the address, such as the province, state, or district. */
  province?: any;
  /**
   * The alphanumeric code for the region.
   *
   * For example, ON.
   */
  provinceCode?: any;
  /** The time zone of the address. */
  timeZone?: any;
  /**
   * The validation status that is leveraged by the address validation feature in the Shopify Admin.
   * See ["Validating addresses in your Shopify admin"](https://help.shopify.com/manual/fulfillment/managing-orders/validating-order-address) for more details.
   */
  validationResultSummary?: any;
  /** The zip or postal code of the address. */
  zip?: any;
};

/** Represents a generic custom attribute, such as whether an order is a customer's first.
 */
export type Attribute = {
  /** The key or name of the attribute. For example, `"customersFirstOrder"`. */
  key: string;
  /** The value of the attribute. For example, `"true"`. */
  value?: any;
};

/** Represents information about a customer of the shop, such as the customer's contact details, their order
 * history, and whether they've agreed to receive marketing material by email.
 *
 **Caution:** Only use this data if it's required for your app's functionality. Shopify will restrict [access to scopes](https://shopify.dev/api/usage/access-scopes) for apps that don't have a legitimate use for the associated data.
 */
export type Customer = Node & {
  /** A list of addresses associated with the customer. */
  addresses: Array<MailingAddress>;
  /** The addresses associated with the customer. */
  addressesV2: any;
  /** The total amount that the customer has spent on orders in their lifetime. */
  amountSpent: any;
  /**
   * Whether the merchant can delete the customer from their store.
   *
   * A customer can be deleted from a store only if they haven't yet made an order. After a customer makes an
   * order, they can't be deleted from a store.
   */
  canDelete: boolean;
  /** A list of the customer's company contact profiles. */
  companyContactProfiles: Array<any>;
  /** The date and time when the customer was added to the store. */
  createdAt: string;
  /** Whether the customer has opted out of having their data sold. */
  dataSaleOptOut: boolean;
  /** The default address associated with the customer. */
  defaultAddress?: any;
  /**
   * The full name of the customer, based on the values for first_name and last_name. If the first_name and
   * last_name are not available, then this falls back to the customer's email address, and if that is not available, the customer's phone number.
   */
  displayName: string;
  /**
   * The customer's email address.
   * @deprecated Use `defaultEmailAddress.emailAddress` instead.
   */
  email?: any;
  /**
   * The current email marketing state for the customer.
   * If the customer doesn't have an email address, then this property is `null`.
   * @deprecated Use `defaultEmailAddress.marketingState`, `defaultEmailAddress.marketingOptInLevel`, `defaultEmailAddress.marketingUpdatedAt`, and `defaultEmailAddress.sourceLocation` instead.
   */
  emailMarketingConsent?: any;
  /** A list of events associated with the customer. */
  events: any;
  /** The customer's first name. */
  firstName?: any;
  /**
   * Whether the merchant has added timeline comments about the customer on the customer's page.
   * @deprecated To query for comments on the timeline, use the events connection and a `query` argument containing `verb:comment`, or look for a `CommentEvent` in the `__typename` of events.
   */
  hasTimelineComment: boolean;
  /** A globally-unique ID. */
  id: string;
  /** The image associated with the customer. */
  image: any;
  /** The customer's last name. */
  lastName?: any;
  /** The customer's last order. */
  lastOrder?: any;
  /** The ID of the corresponding resource in the REST Admin API. */
  legacyResourceId: string;
  /**
   * The amount of time since the customer was first added to the store.
   *
   * Example: 'about 12 years'.
   */
  lifetimeDuration: string;
  /** The customer's locale. */
  locale: string;
  /** The market that includes the customer’s default address. */
  market?: any;
  /** Whether the customer can be merged with another customer. */
  mergeable: any;
  /**
   * A [custom field](https://shopify.dev/docs/apps/build/custom-data),
   * including its `namespace` and `key`, that's associated with a Shopify resource
   * for the purposes of adding and storing additional information.
   */
  metafield?: any;
  /**
   * List of metafield definitions.
   * @deprecated This field will be removed in a future version. Use the root `metafieldDefinitions` field instead.
   */
  metafieldDefinitions: any;
  /**
   * A list of [custom fields](https://shopify.dev/docs/apps/build/custom-data)
   * that a merchant associates with a Shopify resource.
   */
  metafields: any;
  /** A unique identifier for the customer that's used with Multipass login. */
  multipassIdentifier?: any;
  /** A note about the customer. */
  note?: any;
  /** The number of orders that the customer has made at the store in their lifetime. */
  numberOfOrders: string;
  /** A list of the customer's orders. */
  orders: any;
  /** A list of the customer's payment methods. */
  paymentMethods: any;
  /** The customer's phone number. */
  phone?: any;
  /** Possible subscriber states of a customer defined by their subscription contracts. */
  productSubscriberStatus: any;
  /**
   * The current SMS marketing state for the customer's phone number.
   *
   * If the customer does not have a phone number, then this property is `null`.
   */
  smsMarketingConsent?: any;
  /**
   * The state of the customer's account with the shop.
   *
   * Please note that this only meaningful when Classic Customer Accounts is active.
   */
  state: any;
  /** The statistics for a given customer. */
  statistics: any;
  /**
   * Returns a list of store credit accounts that belong to the owner resource.
   * A store credit account owner can hold multiple accounts each with a different currency.
   */
  storeCreditAccounts: any;
  /** A list of the customer's subscription contracts. */
  subscriptionContracts: any;
  /** A comma separated list of tags that have been added to the customer. */
  tags: Array<string>;
  /** Whether the customer is exempt from being charged taxes on their orders. */
  taxExempt: boolean;
  /** The list of tax exemptions applied to the customer. */
  taxExemptions: Array<any>;
  /**
   * The URL to unsubscribe the customer from the mailing list.
   * @deprecated Use `defaultEmailAddress.marketingUnsubscribeUrl` instead.
   */
  unsubscribeUrl: string;
  /** The date and time when the customer was last updated. */
  updatedAt: string;
  /**
   * Whether the email address is formatted correctly.
   *
   * Returns `true` when the email is formatted correctly and
   * belongs to an existing domain. This doesn't guarantee that
   * the email address actually exists.
   * @deprecated Use `defaultEmailAddress.validFormat` instead.
   */
  validEmailAddress: boolean;
  /** Whether the customer has verified their email address. Defaults to `true` if the customer is created through the Shopify admin or API. */
  verifiedEmail: boolean;
};

/** An auto-generated type for paginating through multiple AbandonedCheckoutLineItems.
 */
export type AbandonedCheckoutLineItemConnection = {
  /** The connection between the node and its parent. Each edge contains a minimum of the edge's cursor and the node. */
  edges: Array<any>;
  /** A list of nodes that are contained in AbandonedCheckoutLineItemEdge. You can fetch data about an individual node, or you can follow the edges to fetch data about a collection of related nodes. At each node, you specify the fields that you want to retrieve. */
  nodes: Array<any>;
  /** An object that’s used to retrieve [cursor information](https://shopify.dev/api/usage/pagination-graphql) about the current page. */
  pageInfo: PageInfo;
};

/** A collection of monetary values in their respective currencies. Typically used in the context of multi-currency pricing and transactions,
 * when an amount in the shop's currency is converted to the customer's currency of choice (the presentment currency).
 */
export type MoneyBag = {
  /** Amount in presentment currency. */
  presentmentMoney: any;
  /** Amount in shop currency. */
  shopMoney: any;
};

/** Represents a single tax applied to the associated line item.
 */
export type TaxLine = {
  /** Whether the channel that submitted the tax line is liable for remitting. A value of null indicates unknown liability for this tax line. */
  channelLiable?: any;
  /**
   * The amount of tax, in shop currency, after discounts and before returns.
   * @deprecated Use `priceSet` instead.
   */
  price: string;
  /** The amount of tax, in shop and presentment currencies, after discounts and before returns. */
  priceSet: MoneyBag;
  /** The proportion of the line item price that the tax represents as a decimal. */
  rate?: any;
  /** The proportion of the line item price that the tax represents as a percentage. */
  ratePercentage?: any;
  /** The source of the tax. */
  source?: any;
  /** The name of the tax. */
  title: string;
};

/** An auto-generated type which holds one AbandonedCheckout and a cursor during pagination.
 */
export type AbandonedCheckoutEdge = {
  /** The position of each node in an array, used in [pagination](https://shopify.dev/api/usage/pagination-graphql). */
  cursor: string;
  /** The item at the end of AbandonedCheckoutEdge. */
  node: AbandonedCheckout;
};

/** List of abandoned checkouts. Includes checkouts that were recovered after being abandoned.
 */
export type QueryAbandonedCheckouts = {
  abandonedCheckouts: AbandonedCheckoutConnection;
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
  app: any;
};

/** Fetches app by handle.
 * Returns null if the app doesn't exist.
 */
export type QueryAppByHandle = {
  appByHandle: any;
};

/** Fetches an app by its client ID.
 * Returns null if the app doesn't exist.
 */
export type QueryAppByKey = {
  appByKey: any;
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
  appInstallation: any;
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
  channel: any;
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
  currentAppInstallation: any;
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
  customer: Customer;
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
  customerByIdentifier: Customer;
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
  job: any;
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
  onlineStore: any;
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
  publication: any;
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
  theme: any;
};

/** Returns a paginated list of themes for the shop.
 */
export type QueryThemes = {
  themes: any;
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
