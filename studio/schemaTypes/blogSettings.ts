import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'blogSettings',
  title: 'Configuració del Blog',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Títol del blog',
      type: 'localizedString'
    }),
    defineField({
      name: 'description',
      title: 'Descripció',
      type: 'localizedText'
    }),
    defineField({
      name: 'defaultCover',
      title: 'Imatge per defecte',
      type: 'image',
      options: { hotspot: true }
    }),
    defineField({
      name: 'seoKeywords',
      title: 'Paraules clau SEO',
      type: 'array',
      of: [{ type: 'string' }]
    })
  ],
  preview: {
    select: { title: 'title.ca' }
  }
})
