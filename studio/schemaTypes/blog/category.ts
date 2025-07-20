import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Categoria',
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
    }),
    defineField({
      name: 'description',
      title: 'Descripció',
      type: 'localizedText'
    })
  ],
  preview: {
    select: { title: 'title.ca' }
  }
})
