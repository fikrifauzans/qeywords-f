import { setContentValue } from './RichTextService';
import toaster, { TOASTER_ERROR } from './Toaster';

export const INT_MESSAGE = 'Value must be a number';
export const STRING_MESSAGE = 'Value must be a valid string';
export const BOOLEAN_MESSAGE = 'Value must be a valid boolean';
export const DATE_MESSAGE = 'Value must be a valid date';
export const DATETIME_MESSAGE = 'Value must be a valid datetime';
export const TIME_MESSAGE = 'Value must be a valid time';
export const FLOAT_MESSAGE = 'Value must be a valid float';
export const TEXT_RICH_MESSAGE = 'Value must be a valid text rich';
export const FORM_DATA_MESSAGE = 'Value must be a valid form data';
export const FILES_MESSAGE = 'Value must be a valid file/files data';

// Function to parse value to integers
export const PAYLOAD_INT = (value) => {
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
export const PAYLOAD_FLOAT = (value) => {
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
export const PAYLOAD_STRING = (value) => {
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
// Function to parse value to strings
export const PAYLOAD_SERVERSIDE = (val, key) => {
  try {
    return val[key]
  } catch (e) {
    toaster(TOASTER_ERROR, STRING_MESSAGE);
    return null; // or handle the error in some way
  }
};

// Function to parse value to booleans
export const PAYLOAD_BOOLEAN = (value) => {
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
export const PAYLOAD_DATE = (value) => {
  try {
    const dateValue = new Date(value);

    if (isNaN(dateValue.getTime())) {
      toaster(TOASTER_ERROR, DATE_MESSAGE);
      return null; // or handle the error in some way
    }

    const formattedDate = `${dateValue.getFullYear()}-${(dateValue.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${dateValue.getDate().toString().padStart(2, '0')}`;
    return formattedDate;
  } catch (e) {
    toaster(TOASTER_ERROR, DATE_MESSAGE);
    return null; // or handle the error in some way
  }
};

// Function to parse value to datetimes
export const PAYLOAD_DATETIME = (value) => {
  try {
    const datetimeValue = new Date(value);

    if (isNaN(datetimeValue.getTime())) {
      toaster(TOASTER_ERROR, DATETIME_MESSAGE);
      return null; // or handle the error in some way
    }

    const formattedDatetime = `${datetimeValue.getFullYear()}-${(datetimeValue.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${datetimeValue.getDate().toString().padStart(2, '0')}T${datetimeValue
        .getHours()
        .toString()
        .padStart(2, '0')}:${datetimeValue.getMinutes().toString().padStart(2, '0')}:${datetimeValue
          .getSeconds()
          .toString()
          .padStart(2, '0')}`;
    return formattedDatetime;
  } catch (e) {
    toaster(TOASTER_ERROR, DATETIME_MESSAGE);
    return null; // or handle the error in some way
  }
};

// Function to parse value to times
export const PAYLOAD_TIME = (value) => {
  try {
    const timeValue = new Date(value);

    if (isNaN(timeValue.getTime())) {
      toaster(TOASTER_ERROR, TIME_MESSAGE);
      return null; // or handle the error in some way
    }

    const formattedTime = `${timeValue.getHours().toString().padStart(2, '0')}:${timeValue
      .getMinutes()
      .toString()
      .padStart(2, '0')}:${timeValue.getSeconds().toString().padStart(2, '0')}`;
    return formattedTime;
  } catch (e) {
    toaster(TOASTER_ERROR, TIME_MESSAGE);
    return null; // or handle the error in some way
  }
};

// Function to parse value to text rich
export const PAYLOAD_TEXT_RICH = (value) => {
  try {
    return setContentValue(value);
  } catch (e) {
    toaster(TOASTER_ERROR, TEXT_RICH_MESSAGE);
    return null; // or handle the error in some way
  }
};

// Function to parse json to form data
export const PAYLOAD_FORM_DATA = (values) => {
  try {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      // Check if it's a File object, and append it directly
      if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, value);
      }
    });
    return formData;
  } catch (e) {
    toaster(TOASTER_ERROR, FORM_DATA_MESSAGE);
    return null; // or handle the error in some way
  }
};

// Function to parse json to form data
export const PAYLOAD_FILE = (values) => {
  try {
    return values;
  } catch (e) {
    toaster(TOASTER_ERROR, FORM_DATA_MESSAGE);
    return null; // or handle the error in some way
  }
};

// Function to parse json to form data
export const PAYLOAD_MAP = (values) => {
  try {
    return values;
  } catch (e) {
    toaster(TOASTER_ERROR, FORM_DATA_MESSAGE);
    return null; // or handle the error in some way
  }
};

// Function to parse file/files to json
export const PAYLOAD_FILES = (files) => {
  try {
    // Helper function to convert a single file to base64
    const getBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = (error) => reject(error);
      });
    };

    // Helper function to parse a single file
    const parseFile = (file) => {
      const { name, type, size } = file;
      const extension = name.split('.').pop();
      const uuid = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;

      return getBase64(file).then((base64) => ({
        uuid,
        name,
        extension,
        type,
        size,
        base64
      }));
    };

    // Check if files is an array or a single object
    if (Array.isArray(files)) {
      // If it's an array, map over the files and parse each one
      return Promise.all(files.map(parseFile));
    } else {
      // If it's a single object, parse it directly
      return parseFile(files);
    }
  } catch (e) {
    toaster(TOASTER_ERROR, FILES_MESSAGE);
    return null; // or handle the error in some way
  }
};
