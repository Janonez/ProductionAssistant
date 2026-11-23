// The bridge does not advertise per-operation capabilities yet.
const CURRENT_VERSION_OPERATIONS = {
  'production.saveBindings': false,
} as const

export function isOperationAvailable(operation: keyof typeof CURRENT_VERSION_OPERATIONS): boolean {
  return CURRENT_VERSION_OPERATIONS[operation]
}
