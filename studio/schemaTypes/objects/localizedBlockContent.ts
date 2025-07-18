import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'localizedBlockContent',
  title: 'Contingut enriquit traduïble',
  type: 'object',
  fieldsets: [
    {
      name: 'translations',
      title: 'Traduccions',
      options: { collapsible: true },
    },
  ],
  fields: [
    defineField({
      name: 'ca',
      title: 'Català',
      type: 'blockContent',  
      fieldset: 'translations',
    }),
    defineField({
      name: 'es',
      title: 'Castellà',
      type: 'blockContent',  
      fieldset: 'translations',
    }),
    defineField({
      name: 'en',
      title: 'Anglès',
      type: 'blockContent',  
      fieldset: 'translations',
    }),
  ],
})
