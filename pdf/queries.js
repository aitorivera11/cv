// pdf/queries.js
export function getCVQuery(lang = "ca") {
  return `*[_type == "siteSettings"][0]{
    nom,
    foto,
    "fotoUrl": foto.asset->url,
    "cvPdf": cvPdf.asset->url,
    linkedinUrl,
    githubUrl,
    email,

    "titol": titol.${lang},
    "resumSidebar": resumSidebar.${lang},
    "descripcioSobreMi": descripcioSobreMi.${lang},

    "experiencies": *[_type == "experiencia"] | order(ordre asc) {
      empresa,
      dates,
      tecnologies,
      "titol": titol.${lang},
      "descripcio": descripcio.${lang}
    },

    "formacions": *[_type == "formacio"] | order(ordre asc) {
      centre,
      dates,
      "titulacio": titulacio.${lang}
    },

    "habilitatsTecniques": *[_type == "habilitat" && categoria == "tecnica"] | order(nom asc) {
      "nom": nom.${lang}
    },

    "habilitatsClau": *[_type == "habilitat" && categoria == "clau"] | order(nom asc) {
      "nom": nom.${lang}
    }
  }`;
}
