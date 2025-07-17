// schemas/objects/localizedString.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'localizedString',
  title: 'Cadena de text traduïble',
  type: 'object',
  fieldsets: [{name: 'translations', title: 'Traduccions', options: {collapsible: true}}],
  fields: [
    defineField({name: 'ca', title: 'Català', type: 'string', fieldset: 'translations'}),
    defineField({name: 'es', title: 'Castellà', type: 'string', fieldset: 'translations'}),
    defineField({name: 'en', title: 'Anglès', type: 'string', fieldset: 'translations'}),
  ],
})