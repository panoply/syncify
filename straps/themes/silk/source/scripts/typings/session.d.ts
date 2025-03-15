export interface Customer {
  /**
   * Version reference used to flush the session. Used
   * when the session model changes and a hard reset is
   * required. The version number should always increase
   */
  version?: number;
  /**
   * Amount of times customer has visited webshop
   */
  visitCount?: number;
  /**
   * Time of Last visit
   */
  lastVisit?: number;
  /**
   * When storage expires
   */
  expires?: number;
  /**
   * Tracking Consent (Cookies/GDRP)
   */
  trackingConsent?: boolean;
  /**
   * Customers Email address
   */
  emailAddress?: string | null
  /**
   * Gift Card Code
   */
  giftCard?: string | null;
  /**
   * Discount Code
   */
  discountCode?: string | null;
  /**
   * The Language ISO
   */
  languageCode: Uppercase<string>;
  /**
   * The Language Name
   */
  languageName: string;
  /**
   * The native language name, eg: `Svenska`, `German`
   */
  languageEndonym: string;
  /**
   * The Currency Code
   */
  currencyCode: Uppercase<string>;
  /**
   * The Currency Symbol
   */
  currencySymbol: string;
  /**
   * The Country Code
   */
  countryCode: string;
  /**
   * The Country Name in English
   */
  countryName: string;
  /**
   * Unit reference,
   */
  unitSystem: 'METRIC_SYSTEM' | 'IMPERIAL_SYSTEM',
}
