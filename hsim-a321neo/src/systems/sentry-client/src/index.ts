import { FbwAircraftSentryClient } from './FbwAircraftSentryClient';

declare const process: any;

new FbwAircraftSentryClient().onInstrumentLoaded({
    dsn: process.env.SENTRY_DSN,
    buildInfoFilePrefix: 'A21NHS',
    root: false,
    enableTracing: false,
});
