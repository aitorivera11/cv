// El segment `[...locale]` de les rutes pot ser buit (català), 'es' o 'en'.
// Qualsevol altra cosa (p. ex. /fr o /es/foo) ha de donar 404.
export function isValidLocaleParam(param: string | undefined): boolean {
  return param === undefined || param === 'es' || param === 'en';
}
