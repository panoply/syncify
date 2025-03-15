export const OnlineStoreThemeFileReadResult = (code: string) => ({
  BAD_REQUEST: 'Operation was malformed or invalid.',
  CONFLICT: 'Operation faced a conflict with the current state of the file.',
  ERROR: 'Operation encountered an error.',
  NOT_FOUND: 'Operation file could not be found.',
  SUCCESS: 'Operation was successful.',
  TIMEOUT: 'Operation timed out.',
  UNPROCESSABLE_ENTITY: 'Operation could not be processed due to issues with input data.',
  _: null
}[code || '__UNKNOWN__']);

export const OnlineStoreThemeFilesUserErrors = (code: string) => ({
  ACCESS_DENIED: 'Access denied.',
  DUPLICATE_FILE_INPUT: 'There are files with the same filename.',
  ERROR: 'Error.',
  FILE_VALIDATION_ERROR: 'The file is invalid.',
  LESS_THAN_OR_EQUAL_TO: 'The input value should be less than or equal to the maximum value allowed.',
  NOT_FOUND: 'The record with the ID used as the input value couldn\'t be found.',
  THEME_FILES_CONFLICT: 'There are theme files with conflicts.',
  THEME_LIMITED_PLAN: 'This action is not available on your current plan. Please upgrade to access theme editing features.',
  _: null

}[code || '_']);

export const ThemePublishUserError = (code: string) => ({
  CANNOT_PUBLISH_THEME_DURING_INSTALL: 'Theme publishing is not available during install.',
  NOT_FOUND: 'The record with the ID used as the input value couldn\'t be found.',
  _: null
}[code || '_']);
