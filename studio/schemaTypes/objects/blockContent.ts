// schemaTypes/blockContent.ts
import { defineType } from 'sanity'

export default defineType({
  name: 'blockContent',
  title: 'Contingut amb format',
  type: 'array',
  of: [
    {
      type: 'block',
    },
    {
      type: 'image',
      options: { hotspot: true },
    },
  ],
})
