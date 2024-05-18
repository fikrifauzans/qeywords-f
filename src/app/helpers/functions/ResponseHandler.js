import { getContentValue } from './RichTextService';
import toaster, { TOASTER_ERROR } from './Toaster';

export const INT_MESSAGE = 'Value must be a number';
export const STRING_MESSAGE = 'Value must be a valid string';
export const BOOLEAN_MESSAGE = 'Value must be a valid boolean';
export const DATE_MESSAGE = 'Value must be a valid date';
export const DATETIME_MESSAGE = 'Value must be a valid datetime';
export const TIME_MESSAGE = 'Value must be a valid time';
export const FLOAT_MESSAGE = 'Value must be a valid float';
export const FILES_MESSAGE = 'Value must be a valid files';

// Function to parse value to integers
export const RESPONSE_INT = (value) => {
  try {
    const intValue = parseInt(value, 10);

    if (isNaN(intValue)) {
      toaster(TOASTER_ERROR, INT_MESSAGE);
      return null; // or handle the error in some way
    }

    return intValue;
  } catch (e) {
    toaster(TOASTER_ERROR, INT_MESSAGE);
    return null; // or handle the error in some way
  }
};

// Function to parse value to floats
export const RESPONSE_FLOAT = (value) => {
  try {
    const floatValue = parseFloat(value);

    if (isNaN(floatValue)) {
      toaster(TOASTER_ERROR, FLOAT_MESSAGE);
      return null; // or handle the error in some way
    }

    return floatValue;
  } catch (e) {
    toaster(TOASTER_ERROR, FLOAT_MESSAGE);
    return null; // or handle the error in some way
  }
};

// Function to parse value to strings
export const RESPONSE_STRING = (value) => {
  try {
    const stringValue = String(value);

    if (stringValue.trim() === '') {
      toaster(TOASTER_ERROR, STRING_MESSAGE);
      return null; // or handle the error in some way
    }

    return stringValue;
  } catch (e) {
    toaster(TOASTER_ERROR, STRING_MESSAGE);
    return null; // or handle the error in some way
  }
};

// Function to parse value to booleans
export const RESPONSE_BOOLEAN = (value) => {
  try {
    const booleanValue = Boolean(value);

    if (isNaN(booleanValue)) {
      toaster(TOASTER_ERROR, BOOLEAN_MESSAGE);
      return null; // or handle the error in some way
    }

    return booleanValue;
  } catch (e) {
    toaster(TOASTER_ERROR, BOOLEAN_MESSAGE);
    return null; // or handle the error in some way
  }
};

// Function to parse value to dates
export const RESPONSE_DATE = (dateString) => {
  // Split the date string into year, month, and day
  var dateArray = dateString.split('-');

  // Create a new Date object
  // Note: Months are zero-indexed in JavaScript, so we subtract 1 from the month
  var dateObject = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);

  return dateObject;
};

export const RESPONSE_DATETIME = (datetimeString) => {
  // Split the datetime string into date and time parts
  var [datePart, timePart] = datetimeString.split(' ');
  // Split the date into year, month, and day
  var [year, month, day] = datePart.split('-');
  // Split the time into hours, minutes, and seconds
  var [hours, minutes, seconds] = timePart.split(':');
  // Create a new Date object
  // Note: Months are zero-indexed in JavaScript, so we subtract 1 from the month
  var datetimeObject = new Date(year, month - 1, day, hours, minutes, seconds);

  return datetimeObject;
};

export const RESPONSE_TIME = (timeString) => {
  // Create a default date (e.g., 1970-01-01) to combine with the time
  var defaultDate = new Date(1970, 0, 1);

  // Split the time string into hours, minutes, and seconds
  var [hours, minutes, seconds] = timeString.split(':');

  // Set the time on the default date
  defaultDate.setHours(hours, minutes, seconds);

  return defaultDate;
};

export const RESPONSE_TEXT_RICH = (value) => {
  return getContentValue(value);
};

export const RESPONSE_FILES = (imageUrls, fileType = 'image/*') => {
  return imageUrls.map((imageUrl) => {
    const fileName = imageUrl.split('/').pop(); // Extract the file name from the URL
    const file = new File([], fileName, { type: fileType });
    return {
      file,
      preview: imageUrl,
      isUploading: false // Set isUploading to false for existing files
    };
  });
};

export const RESPONSE_FILE = (value) => {
  if (value != null) {
    const val = JSON.parse(value);
    const finalValue = { ...val };

    return finalValue;
  } else return value;
};
export const RESPONSE_SERVERSIDE = (value) => {
  return value
};
export const RESPONSE_MAP = (value) => {

  return (value)
};
