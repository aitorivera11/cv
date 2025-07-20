import sanityClient from '@sanity/client'

// Configura el client amb les teves credencials
const client = sanityClient({
  projectId: 'l4g6ncle', // 👉 posa el teu
  dataset: 'production',
  apiVersion: '2025-07-20',
  token: 'skMPpEi45tNKqsDXJlgGvyUQKCgz24nZuoNIKYLc45B1aYT22F1irj2O99HOUcBnQvul2g69hyj4v7fE0f44wVQRT30eEg98w2uUkOmNeWHqfcNJLbBIlQ2J8Zndzw5UCFZcGn6NO3Y1kNma6LAW3mbdxYt7oGK4AHzaBZUgb8IvHt5joar7',
  useCdn: false
})

// ✅ Traduccions
const title = {
  ca: '🚀 Com he construït aitorivera.com amb Astro, Sanity i Vercel: aprenentatges d’un desenvolupador Django',
  es: '🚀 Cómo construí aitorivera.com con Astro, Sanity y Vercel: aprendizajes de un desarrollador Django',
  en: '🚀 How I built aitorivera.com with Astro, Sanity and Vercel: learnings from a Django developer'
}

const excerpt = {
  ca: 'Com he creat aitorivera.com amb Astro, Sanity i Vercel. Per què vaig triar aquest stack modern, com funciona per dins i quins reptes he après.',
  es: 'Cómo creé aitorivera.com con Astro, Sanity y Vercel. Por qué elegí este stack moderno, cómo funciona por dentro y qué retos he aprendido.',
  en: 'How I built aitorivera.com with Astro, Sanity and Vercel. Why I chose this modern stack, how it works under the hood and what I learned.'
}

// ✅ Contingut principal en català (només un bloc curt, després l’editarem des del Studio)
const contentCa = [
  {
    _type: 'block',
    children: [
      {
        _type: 'span',
        text: `Durant anys he estat desenvolupador Django, centrat sobretot en el backend, fent modelatge de dades, APIs REST i gestionant processos complexos...`
      }
    ]
  }
]

// ✅ Categories i tags
const category = {
  _id: 'category_dev',
  _type: 'category',
  title: {
    ca: 'Desenvolupament Web',
    es: 'Desarrollo Web',
    en: 'Web Development'
  },
  slug: { _type: 'slug', current: 'desenvolupament-web' }
}

const tagAstro = {
  _id: 'tag_astro',
  _type: 'tag',
  title: { ca: 'Astro', es: 'Astro', en: 'Astro' },
  slug: { _type: 'slug', current: 'astro' }
}

const tagSanity = {
  _id: 'tag_sanity',
  _type: 'tag',
  title: { ca: 'Sanity', es: 'Sanity', en: 'Sanity' },
  slug: { _type: 'slug', current: 'sanity' }
}

// ✅ Blog settings (només una vegada)
const blogSettings = {
  _id: 'blogSettings',
  _type: 'blogSettings',
  title: {
    ca: 'Blog',
    es: 'Blog',
    en: 'Blog'
  },
  description: {
    ca: 'Articles sobre desenvolupament web, Astro, Sanity i experiències personals.',
    es: 'Artículos sobre desarrollo web, Astro, Sanity y experiencias personales.',
    en: 'Articles about web development, Astro, Sanity and personal experiences.'
  }
}

// ✅ El post amb relacions a categories i tags
const post = {
  _type: 'post',
  title,
  slug: { _type: 'slug', current: 'com-he-construit-aitorivera-amb-astro-sanity-i-vercel' },
  excerpt,
  content: {
    ca: contentCa
  },
  publishedAt: new Date().toISOString(),
  categories: [{ _type: 'reference', _ref: category._id }],
  tags: [
    { _type: 'reference', _ref: tagAstro._id },
    { _type: 'reference', _ref: tagSanity._id }
  ]
}

// ✅ Funció principal
async function run() {
  try {
    console.log('➡️ Creant categories i tags...')
    await client.createOrReplace(category)
    await client.createOrReplace(tagAstro)
    await client.createOrReplace(tagSanity)

    console.log('➡️ Configurant blogSettings...')
    await client.createOrReplace(blogSettings)

    console.log('➡️ Creant post de prova...')
    const createdPost = await client.create(post)

    console.log('✅ Post creat:', createdPost._id)
  } catch (err) {
    console.error('❌ Error:', err.message)
  }
}

run()