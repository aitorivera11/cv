import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Entrada del Blog',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Títol',
      type: 'localizedString', 
      validation: Rule => Rule.required()
    }),
    defineField({
    name: 'slug',
    title: 'Slug',
    type: 'slug',
    options: { maxLength: 96 },
    validation: Rule => Rule.required()
    }) ,
    defineField({
      name: 'excerpt',
      title: 'Resum',
      type: 'localizedText', 
    }),
    defineField({
      name: 'coverImage',
      title: 'Imatge de portada',
      type: 'image',
      options: { hotspot: true }
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }]
    }),
    defineField({
      name: 'tags',
      title: 'Etiquetes',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }]
    }),
    defineField({
      name: 'content',
      title: 'Contingut',
      type: 'localizedBlockContent' 
    }),
    defineField({
      name: 'publishedAt',
      title: 'Data de publicació',
      type: 'datetime',
      initialValue: new Date().toISOString()
    }),
    defineField({
      name: 'relatedPosts',
      title: 'Articles relacionats',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'post' }] }]
    })
  ],
  preview: {
    select: {
      title: 'title.ca', 
      media: 'coverImage'
    }
  }
})
