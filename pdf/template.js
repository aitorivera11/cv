// pdf/template.js
export function cvTemplate(data, fotoUrl, lang = "ca") {
  const {
    nom,
    titol,
    resumSidebar, 
    experiencies = [],
    formacions = [],
    habilitatsTecniques = [],
    habilitatsClau = [],
    email,
  } = data;

  const labels = {
    ca: {
      contact: "Contacte",
      techSkills: "Habilitats tècniques",
      keySkills: "Habilitats clau",
      experience: "Experiència professional",
      education: "Formació",
      languages: {
        title : "Idiomes",
        ca: "Català",
        es: "Castellà",
        en: "Anglès", 
        native: "Nadiu",
        basic: "Bàsic"
      }
    },
    es: {
      contact: "Contacto",
      techSkills: "Habilidades técnicas",
      keySkills: "Competencias clave",
      experience: "Experiencia profesional",
      education: "Formación",
      languages: {
        title : "Idiomas",
        ca: "Catalán",
        es: "Castellano",
        en: "Inglés", 
        native: "Nativo",
        basic: "Básico"
      }
    },
    en: {
      contact: "Contact",
      techSkills: "Technical skills",
      keySkills: "Key skills",
      experience: "Professional experience",
      education: "Education",
      languages: {
        title : "Languages",  
        ca: "Catalan",
        es: "Spanish",
        en: "English", 
        native: "Native",
        basic: "Basic"
      }
    }
  };

  const t = labels[lang] || labels.ca;

  const telefon = "625947211";
  const web = "aitorivera.com";

  return `
  <html>
  <head>
    <meta charset="UTF-8" />
    <style>
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet">

      * {
        box-sizing: border-box;
      }

      body {
        font-family: 'Space Grotesk', sans-serif;
        margin: 0;
        padding: 0;
        background: #ffffff; /* fora el gris que feia l'efecte raro */
        color: #1f2937; /* slate-800 */
      }

      .page {
        position: relative;
        max-width: 860px;
        margin: 0 auto;
        background: #ffffff;
        display: grid;
        grid-template-columns: 32% 68%;
        gap: 24px;
        padding: 26px 32px 52px;
        height: auto;
      }

      .page::before {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        height: 4px;
        background: linear-gradient(90deg, #4f46e5, #8b5cf6);
      }

      .page::after {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 4px;
        background: linear-gradient(90deg, #4f46e5, #8b5cf6);
      }

      h1 {
        margin: 0;
        font-size: 22px;
        letter-spacing: -0.5px;
        font-weight: 800;
        color: #111827;
      }

      h2 {
        font-size: 12px;
        margin: 18px 0 8px;
        font-weight: 700;
        color: #4f46e5; /* Indigo 600 */
        letter-spacing: .08em;
        text-transform: uppercase;
      }

      .sidebar {
        padding-right: 18px;
        border-right: 1px solid #e5e7eb;
      }

      .header-block {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }

      .photo {
        width: 110px;
        height: 110px;
        border-radius: 9999px;
        object-fit: cover;
        margin-bottom: 10px;
        border: 3px solid #4f46e5;
        box-shadow: 0 6px 16px rgba(79, 70, 229, 0.25);
      }

      .role {
        font-size: 13px;
        color: #4b5563;
        margin-top: 4px;
      }

      .summary {
        font-size: 13px;
        color: #374151;
        line-height: 1.45;
        margin-top: 10px;
      }

      .contact-line {
        font-size: 12px;
        color: #374151;
        line-height: 1.4;
      }

      .contact-line + .contact-line {
        margin-top: 2px;
      }

      .skills-pills {
        margin-top: 4px;
      }

      .skill-pill {
        display: inline-block;
        background: #eef2ff; /* indigo-100 */
        color: #3730a3;      /* indigo-800 */
        border-radius: 9999px;
        padding: 2px 8px;
        font-size: 11px;
        margin: 0 4px 4px 0;
        white-space: nowrap;
      }

      .main {
        padding-left: 4px;
        font-size: 12px;
      }

      .experience {
        margin-bottom: 14px;
      }

      .experience-title {
        font-weight: 600;
        font-size: 13px;
        color: #111827;
      }

      .experience-company {
        font-size: 12px;
        color: #4b5563;
      }

      .experience-dates {
        font-size: 11px;
        color: #9ca3af;
        margin-top: 2px;
        margin-bottom: 4px;
      }

      .experience-desc {
        font-size: 12px;
        color: #374151;
        line-height: 1.4;
        margin-bottom: 3px;
      }

      .tech-stack {
        font-size: 11px;
        color: #4b5563;
      }

      .formation {
        margin-bottom: 8px;
      }

      .formation-title {
        font-weight: 600;
        font-size: 12px;
        color: #111827;
      }

      .formation-centre {
        font-size: 12px;
        color: #4b5563;
      }

      .formation-dates {
        font-size: 11px;
        color: #9ca3af;
      }

      .contact-block {
        display: flex;
        flex-direction: column;
        gap: 2px;
        font-size: 12px;
        line-height: 1.4;
      }

      .lang-level {
        font-size: 11px;
        color: #4b5563;
        margin-bottom: 2px;
      }

      .lang-name {
        font-weight: 600;
        font-size: 12px;
        color: #111827;
      }


    </style>
  </head>

  <body>
    <div class="page">
      <!-- COL 1: SIDEBAR -->
      <div class="sidebar">
        <div class="header-block">
          ${fotoUrl ? `<img class="photo" src="${fotoUrl}" alt="${nom}" />` : ``}
          <h1>${nom}</h1>
          <div class="role">${titol}</div>
          <p class="summary">${resumSidebar}</p>
        </div>

        <div class="contact-block">
          <span>${email}</span>
          <span>${telefon}</span>
          <span>${web}</span>
        </div>

        <div>
          <h2>${t.techSkills}</h2>
          <div class="skills-pills">
            ${habilitatsTecniques
              .map((h) => `<span class="skill-pill">${h.nom}</span>`)
              .join("")}
          </div>
        </div>

        <div>
          <h2>${t.keySkills}</h2>
          <div class="skills-pills">
            ${habilitatsClau
              .map((h) => `<span class="skill-pill">${h.nom}</span>`)
              .join("")}
          </div>
        </div>
        <div>
          <h2>${t.languages.title}</h2>
          <div class="lang-level">
            <div><span class="lang-name">${t.languages.ca}</span> ${t.languages.native}</div>
            <div><span class="lang-name">${t.languages.es}</span> ${t.languages.native}</div>
            <div><span class="lang-name">${t.languages.en}</span> ${t.languages.basic}</div>
          </div>
        </div>

      </div>

      <!-- COL 2: CONTINGUT PRINCIPAL -->
      <div class="main">
        <h2>${t.experience}</h2>
        ${experiencies
          .map(
            (e) => `
            <div class="experience">
              <div class="experience-title">${e.titol}</div>
              <div class="experience-company">${e.empresa}</div>
              <div class="experience-dates">${e.dates || ""}</div>
              ${
                e.descripcio
                  ? `<div class="experience-desc">${e.descripcio}</div>`
                  : ""
              }
              ${
                e.tecnologies?.length
                  ? `<div class="tech-stack">${e.tecnologies.join(" • ")}</div>`
                  : ""
              }
            </div>
          `
          )
          .join("")}

        <h2>${t.education}</h2>
        ${formacions
          .map(
            (f) => `
            <div class="formation">
              <div class="formation-title">${f.titulacio}</div>
              <div class="formation-centre">${f.centre}</div>
              <div class="formation-dates">${f.dates || ""}</div>
            </div>
          `
          )
          .join("")}
      </div>


    </div>
  </body>
  </html>
  `;
}
