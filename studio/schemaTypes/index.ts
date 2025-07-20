// schemaTypes/index.ts 
import siteSettings from './siteSettings'
import experiencia from './experiencia'
import formacio from './formacio'
import habilitat from './habilitat'

// Importem els nous objectes que hem creat
import localizedString from './objects/localizedString'
import localizedText from './objects/localizedText'
import localizedBlockContent from './objects/localizedBlockContent'
import blockContent from './objects/blockContent'

// Blog
import post from './blog/post'
import category from './blog/category'
import tag from './blog/tag'
import blogSettings from './blog/blogSettings'  

export const schemaTypes = [
  // Documents
  siteSettings,
  experiencia,
  formacio,
  habilitat,
  // Objectes reutilitzables
  blockContent,
  localizedString,
  localizedText,
  localizedBlockContent,
  // Blog
  post,
  category,
  tag,
  blogSettings
]