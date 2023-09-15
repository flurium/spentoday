import { error } from "@sveltejs/kit"

export function serverError() {
  return error(500, {
    message: "На жаль, ми не можемо встановити з'єднання з сервером."
  })
}
export function jsonError() {
  return error(500, { message: "Наразі ми не можемо обробити дані." })
}
