import { createAPIRouteHandler } from '@keystatic/next/api-handler';
import keystaticConfig from '../../keystatic/keystatic.config';

const handler = createAPIRouteHandler({
  config: keystaticConfig,
});

export { handler as GET, handler as POST };