import httpClient from "@/shared/api/httpClient.js";

const API_PREFIX = '/api/asns';
// const API_PREFIX = '/api/receiving-service/asns';

/**
 * @param {Object} params
 * @param {number} [params.page=0]
 * @param {number} [params.size=10]
 * @param {string} [params.sort]          - например, 'arrivalTimeline.expected,desc'
 * @param {string} [params.status]        - EXPECTED | ARRIVED | CLOSED | CANCELLED
 * @param {string} [params.vendor]        - имя поставщика
 * @param {string} [params.fromDate]      - ISO-дата
 * @param {string} [params.toDate]        - ISO-дата
 */

export const fetchAsns = async ({page = 0, size = 10, sort, status, vendor, fromDate, toDate} = {}) => {
  const { data} = httpClient.get(`${API_PREFIX}/search`, {
    params: { // параметры url
      page,
      size,
      ...(sort && { sort }),
      ...(status && { status }),
      ...(vendor && { vendor }),
      ...(fromDate && { fromDate: fromDate }),
      ...(toDate && { toDate: toDate }),
    }
  });
  return data;
}