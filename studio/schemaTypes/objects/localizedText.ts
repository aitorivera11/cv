// schemas/objects/localizedText.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'localizedText',
  title: 'Text llarg traduïble',
  type: 'object',
  fieldsets: [{name: 'translations', title: 'Traduccions', options: {collapsible: true}}],
  fields: [
    defineField({name: 'ca', title: 'Català', type: 'text', rows: 3, fieldset: 'translations'}),
    defineField({name: 'es', title: 'Castellà', type: 'text', rows: 3, fieldset: 'translations'}),
    defineField({name: 'en', title: 'Anglès', type: 'text', rows: 3, fieldset: 'translations'}),
  ],
})