// schemaTypes/index.ts 
import siteSettings from './siteSettings'
import experiencia from './experiencia'
import formacio from './formacio'
import habilitat from './habilitat'

// Importem els nous objectes que hem creat
import localizedString from './objects/localizedString'
import localizedText from './objects/localizedText'
import localizedBlockContent from './objects/localizedBlockContent'

export const schemaTypes = [
  // Documents
  siteSettings,
  experiencia,
  formacio,
  habilitat,
  // Objectes reutilitzables
  localizedString,
  localizedText,
  localizedBlockContent,
]