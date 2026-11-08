import axios from "axios";
import { baseUrls } from "../config/routes";
import { requestHeaders } from "../mapping/apiMapping";

export const baseApi = axios.create({
  baseURL: baseUrls.app,
  headers: requestHeaders,
  timeout: 10_000,
  // Let the tests assert error responses, including 403 and 404.
  validateStatus: () => true,
});
