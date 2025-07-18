import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './studio/schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'cv_aitor',

  projectId: 'l4g6ncle',
  dataset: 'production',

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
})
