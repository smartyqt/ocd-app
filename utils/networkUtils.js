/**
 * Utility functions for network operations
 */

/**
 * Wraps a promise with timeout and retry logic
 * @param {Promise} promise - The promise to wrap
 * @param {Object} options - Configuration options
 * @param {number} [options.timeout=10000] - Timeout in milliseconds
 * @param {number} [options.maxRetries=3] - Maximum number of retry attempts
 * @returns {Promise} - Wrapped promise with timeout and retry logic
 */
export const withTimeoutAndRetry = (promise, { timeout = 10000, maxRetries = 3 } = {}) => {
  return new Promise((resolve, reject) => {
    let retryCount = 0;
    let timeoutId;

    const attempt = () => {
      // Clear any existing timeout
      if (timeoutId) clearTimeout(timeoutId);

      // Set up timeout
      timeoutId = setTimeout(() => {
        if (retryCount < maxRetries) {
          retryCount++;
          attempt();
        } else {
          reject(new Error('Request timed out'));
        }
      }, timeout);

      // Execute the promise
      promise()
        .then((result) => {
          clearTimeout(timeoutId);
          resolve(result);
        })
        .catch((error) => {
          clearTimeout(timeoutId);
          if (retryCount < maxRetries) {
            retryCount++;
            attempt();
          } else {
            reject(error);
          }
        });
    };

    attempt();
  });
};

/**
 * Checks internet connectivity
 * @returns {Promise<boolean>} - Resolves to true if online, false otherwise
 */
export const checkInternetConnection = async () => {
  try {
    const response = await fetch('https://www.google.com', { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    return false;
  }
};

/**
 * Gets platform-specific timeout value
 * @returns {number} - Timeout value in milliseconds
 */
export const getPlatformTimeout = () => {
  // You can add platform-specific logic here if needed
  return 15000; // 15 seconds default
};
