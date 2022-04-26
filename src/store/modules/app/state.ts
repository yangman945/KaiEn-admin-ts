import { getSidebarStatus, getSize,getTheme } from '@/utils/cookies'
import { getLocale } from '@/i18n'


export interface AppState {
  sidebar: {
    opened: boolean
    withoutAnimation: boolean
  }
  language: string
  size: string,
  theme:string
}

export const state: AppState = {
  sidebar: {
    opened: getSidebarStatus() !== 'closed',
    withoutAnimation: false
  },
  language: getLocale(),
  size: getSize() || 'medium',
  theme:getTheme() || 'light'
}
