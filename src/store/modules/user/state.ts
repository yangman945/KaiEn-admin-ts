import { getToken, getRefreshToken } from '@/utils/cookies'

export interface UserState {
  token: string
  refreshToken: string
}

export const state: UserState = {
  token: getToken() || '',
  refreshToken: getRefreshToken() || '',
}
