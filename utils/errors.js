import { maxCounterNameLength } from '~/config.json'

const errorsEs = {
  defaultError: 'Ha ocurrido un error',
  NAME_TOO_LONG: `No mas de ${maxCounterNameLength} caracteres`,
  NAME_REQUIRED: 'Ingrese un nombre',
  MAX_COUNTERS: 'Ya no puede agregar mas contadores',
}

export const getErrorMessage = (code, lang = 'es') => {
  if (lang === 'es') {
    return errorsEs[code] || errorsEs.defaultError
  }

  return errorsEs.defaultError
}
