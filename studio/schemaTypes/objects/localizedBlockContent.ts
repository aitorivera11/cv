// schemas/objects/localizedBlockContent.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'localizedBlockContent',
  title: 'Contingut enriquit traduïble',
  type: 'object',
  fieldsets: [
    {
      name: 'translations',
      title: 'Traduccions',
      options: {collapsible: true},
    },
  ],
  fields: [
    defineField({
      name: 'ca',
      title: 'Català',
      type: 'array',
      of: [{type: 'block'}],
      fieldset: 'translations',
    }),
    defineField({
      name: 'es',
      title: 'Castellà',
      type: 'array',
      of: [{type: 'block'}],
      fieldset: 'translations',
    }),
    defineField({
      name: 'en',
      title: 'Anglès',
      type: 'array',
      of: [{type: 'block'}],
      fieldset: 'translations',
    }),
  ],
})
