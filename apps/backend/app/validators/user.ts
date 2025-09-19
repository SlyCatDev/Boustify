// import vine from '@vinejs/vine'

/**
 * Validateur pour la mise à jour du profil utilisateur
 */
// export const updateProfileValidator = vine.compile(
//   vine.object({
//     full_name: vine.string().minLength(3).maxLength(64).optional(),
//     email: vine
//       .string()
//       .email()
//       .unique(async (query, field, options) => {
//         const user = await query
//           .from('users')
//           .where('email', field)
//           .whereNot('id', options.currentUser?.id)
//           .first()
//         return !user
//       })
//       .optional(),
//     current_password: vine.string().requiredWhen((data) => 'new_password' in data),
//     new_password: vine.string().minLength(12).maxLength(32).optional(),
//   })
// )
