// Arrencada del servidor dins Docker.
// Node com a PID 1 ignora SIGTERM si no hi ha handler, i `docker stop` espera
// tot el timeout (30 s) abans de matar el procés. Aquest handler fa que s'aturi a l'instant.
for (const signal of ['SIGTERM', 'SIGINT']) {
  process.on(signal, () => process.exit(0));
}

await import('./dist/server/entry.mjs');
