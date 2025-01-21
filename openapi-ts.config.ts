import { defineConfig, defaultPlugins } from '@hey-api/openapi-ts';

export default defineConfig({
  client: '@hey-api/client-axios',
  input: {
    exclude: '^(#/components/schemas/Link|#/paths/actuator.*)$',
    path: 'openapi/task-tracker-openapi-spec.json',
  },
  output: {
    lint: 'eslint',
    format: 'prettier',
    path: 'src/gen/client',
  },
  plugins: [
    ...defaultPlugins,
    {
      asClass: true,
      auth: false,
      name: '@hey-api/sdk',
    },
  ],
});
