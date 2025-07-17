// schemaTypes/habilitat.ts
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'habilitat',
  title: 'Habilitat',
  type: 'document',
  fields: [
    defineField({name: 'nom', title: 'Nom de l\'habilitat', type: 'localizedString'}), // <-- CANVI
    defineField({
      name: 'categoria',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [
          {title: 'Tècnica', value: 'tecnica'},
          {title: 'Competència Clau', value: 'clau'},
        ],
        layout: 'radio',
      },
    }),
  ],
})