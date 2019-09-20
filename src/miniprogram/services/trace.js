import { http } from '../utils/http/http';
import config from '../common/config';

const api = {
  traceUrl: config.traceUrl
};

export function sendTraceLog(logObject = {}) {
  return http.get(api.traceUrl, logObject);
}
