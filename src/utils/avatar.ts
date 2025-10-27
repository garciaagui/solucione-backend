export const generateAvatarUrl = (email: string): string => {
  return `https://api.dicebear.com/9.x/thumbs/svg?seed=${email}`
}
