import concurrently from 'concurrently';

concurrently([
  {
    cwd: './packages/backend',
    name: 'API',
    command: 'npm:start:dev',
    prefixColor: 'green',
  },
  {
    cwd: './packages/frontend',
    name: 'WEB',
    command: 'npm:start:dev',
    prefixColor: 'yellow',
  },
])
