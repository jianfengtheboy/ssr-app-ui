export function getMenuItemClass(active: boolean, isSelected: boolean) {
  if (isSelected) {
    return 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
  }

  return active
    ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100'
    : 'text-gray-700 dark:text-gray-300'
}
