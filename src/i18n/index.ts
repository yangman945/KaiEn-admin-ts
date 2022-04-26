// import {createI18n} from 'vue-i18n'
// import enLocale from './en'
// import zhLocale from './zh-cn'
// const messages ={
//     en:{...enLocale},
//     zh:{...zhLocale}
// }
// export const getCurrentLanguage = () => {
//     const UAlang = navigator.language
//     const langCode = UAlang.indexOf('zh') !== -1 ? 'zh' : 'en'
//     localStorage.setItem('lang',langCode)
//     return langCode
//   }

//   const i18n = createI18n({
//       legacy:false,
//       globalInjection:true,
//       locale:getCurrentLanguage() || 'zh',
//       messages: messages
//   })
// export default i18n


import { createI18n } from 'vue-i18n' // import from runtime only

import { getLanguage } from '@/utils/cookies'

// User defined lang
import enLocale from './en'
import zhLocale from './zh-cn'

const messages = {
  en: {
    ...enLocale
  },
  'zh-cn': {
    ...zhLocale
  }
}

export const getLocale = () => {
  const cookieLanguage = getLanguage()
  if (cookieLanguage) {
    return cookieLanguage
  }
  const language = navigator.language.toLowerCase()
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale
    }
  }

  // Default language is english
  return 'zh'
}

const i18n = createI18n({
  locale: getLocale(),
  messages: messages
})

export default i18n
