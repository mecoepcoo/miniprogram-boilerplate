import { getEnv } from '../utils/singleton';
import { genApiRoot, genTraceUrl } from './configGenarator';

const env = getEnv();

export default {
  env: env,
  caller: '',
  appId: '',
  prdVer: '1.0.0',

  apiRoot: genApiRoot(env),
  traceUrl: genTraceUrl(env)
};
