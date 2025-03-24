import _ from 'lodash'

export const loginUrl = (): string =>
  _(window.location.href)
    .split('/')
    .thru((arr: string[]) => {
      arr[arr.length - 1] = 'login'
      return arr
    })
    .join('/')
