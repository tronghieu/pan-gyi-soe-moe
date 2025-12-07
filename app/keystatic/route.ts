import { makeRouteHandler } from '@keystatic/next/route-handler';
import keystaticConfig from '../../keystatic/keystatic.config';

export const { GET, POST } = makeRouteHandler({
  config: keystaticConfig,
});