import Fastify from 'fastify';
import cors from '@fastify/cors';
import cookie from '@fastify/cookie';
import helmet from '@fastify/helmet';
import compress from '@fastify/compress';
import rateLimit from '@fastify/rate-limit';
import sensible from '@fastify/sensible';
import etag from '@fastify/etag';
import underPressure from '@fastify/under-pressure';
import csrf from '@fastify/csrf-protection';
import { env } from '../../main/config/env';

export const app = Fastify({
  logger: env.NODE_ENV !== 'production',
  trustProxy: true, // importante se usar proxy / nginx / cloudflare
});

export async function registerPlugins() {
  await app.register(helmet, {
    contentSecurityPolicy: false, // evita quebra no front
  });

  await app.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute',
  });

  await app.register(csrf);

  await app.register(cookie, {
    secret: env.COOKIE_SECRET,
    hook: 'onRequest',
  });

  await app.register(compress, {
    global: true,
    encodings: ['gzip', 'deflate', 'br'],
  });

  await app.register(etag);

  await app.register(underPressure, {
    maxEventLoopDelay: 1000,
    maxHeapUsedBytes: 1024 * 1024 * 1024, // 1GB
    maxRssBytes: 1024 * 1024 * 1024,
  });

  await app.register(sensible);

  await app.register(cors, {
    origin: env.NODE_ENV === 'production' ? ['https://domain.com'] : true,
    credentials: true,
  });
}
