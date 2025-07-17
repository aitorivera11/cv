// schemaTypes/formacio.ts
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'formacio',
  title: 'Formació Acadèmica',
  type: 'document',
  fields: [
    defineField({name: 'titulacio', title: 'Titulació', type: 'localizedString'}), // <-- CANVI
    defineField({name: 'centre', title: 'Centre d\'Estudis', type: 'string'}),
    defineField({name: 'dates', title: 'Dates', type: 'string'}),
    defineField({name: 'ordre', title: 'Ordre de Visualització', type: 'number'}),
  ],
   orderings: [
    {
      title: 'Ordre de Visualització',
      name: 'ordreAsc',
      by: [{field: 'ordre', direction: 'asc'}],
    },
  ],
})