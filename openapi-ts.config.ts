import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  client: '@hey-api/client-axios',
  input: 'openapi/task-tracker-openapi-spec.json',
  output: {
    lint: 'eslint',
    path: 'src/gen/client',
  },
  services: {
    asClass: true,
    filter: '^\\w+ /((?!actuator).).*$',
  },
  schemas: false,
});
