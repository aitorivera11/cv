// schemaTypes/siteSettings.ts
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Configuració del Lloc',
  type: 'document',
  fields: [
    defineField({
      name: 'nom',
      title: 'El teu Nom',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titol',
      title: 'El teu Títol Professional',
      type: 'localizedString', // <-- CANVI
    }),
    defineField({
      name: 'resumSidebar',
      title: 'Resum per a la Barra Lateral',
      type: 'localizedText', // <-- CANVI
    }),
    defineField({
      name: 'descripcioSobreMi',
      title: 'Sobre mi',
      description: 'Aquest és el text principal que apareixerà a la secció "Sobre mi" de la pàgina.',
      type: 'localizedBlockContent',  
    }),
    defineField({
      name: 'foto',
      title: 'La teva Foto Professional',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'cvPdf',
      title: 'Arxiu del CV en PDF',
      type: 'file',
      options: {accept: '.pdf'},
    }),
    defineField({name: 'linkedinUrl', title: 'URL de LinkedIn', type: 'url'}),
    defineField({name: 'githubUrl', title: 'URL de GitHub', type: 'url'}),
    defineField({name: 'email', title: 'Correu Electrònic', type: 'string'}),
  ],
})