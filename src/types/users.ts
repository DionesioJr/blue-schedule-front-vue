export interface UserUpdateDto {
  name?: string
  photo?: string
}

export interface ChangePasswordDto {
  currentPassword: string
  newPassword: string
  confirmNewPassword: string
}

export interface UserProfile {
  id: string
  name: string
  email: string
  photo?: string
  createdAt: string
  updatedAt: string
}
