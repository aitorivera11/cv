import * as Sentry from '@sentry/astro';

Sentry.init({
  dsn: process.env.SENTRY_DSN, 
  tracesSampleRate: 1.0,
});