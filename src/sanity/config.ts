import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { apiVersion, dataset, projectId } from './env'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema: {
    types: [], // Your schema types will go here
  },
  plugins: [
    structureTool(),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
}) 