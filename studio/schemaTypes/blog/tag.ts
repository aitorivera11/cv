import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'tag',
  title: 'Etiqueta',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nom',
      type: 'localizedString'
    }),
    defineField({
    name: 'slug',
    title: 'Slug',
    type: 'slug',
    options: { maxLength: 96 },
    validation: Rule => Rule.required()
    })
  ],
  preview: {
    select: { title: 'title.ca' }
  }
})
