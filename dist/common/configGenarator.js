export function genApiRoot(env = 'prod') {
  let apiRoot = '';
  switch (env) {
    case 'dev':
      apiRoot = 'https://dev-api.tianzhen.tech';
      break;
    case 'test':
      apiRoot = 'https://test-api.tianzhen.tech';
      break;
    default:
      apiRoot = 'https://api.tianzhen.tech';
  }
  return apiRoot;
}

export function genTraceUrl(env = 'prod') {
  let apiUrl = '';
  switch (env) {
    case 'dev': 
    case 'test':
      apiUrl = 'https://dev-log.tianzhen.tech';
      break;
    default:
      apiUrl = 'https://log.tianzhen.tech';
  }
  return apiUrl;
}