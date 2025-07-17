// schemaTypes/experiencia.ts
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'experiencia',
  title: 'Experiència Professional',
  type: 'document',
  fields: [
    defineField({name: 'titol', title: 'Títol del Càrrec', type: 'localizedString', validation: (Rule) => Rule.required()}), // <-- CANVI
    defineField({name: 'empresa', title: 'Empresa', type: 'string'}),
    defineField({name: 'dates', title: 'Dates', type: 'string'}),
    defineField({
      name: 'descripcio',
      title: 'Descripció / Assoliments',
      type: 'localizedText', 
    }),
    defineField({
      name: 'tecnologies',
      title: 'Tecnologies Clau',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'ordre',
      title: 'Ordre de Visualització',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Ordre de Visualització',
      name: 'ordreAsc',
      by: [{field: 'ordre', direction: 'asc'}],
    },
  ],
})