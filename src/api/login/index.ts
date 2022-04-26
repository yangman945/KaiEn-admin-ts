import api from '../index'
export function login(data) {
    return api({
      url: '/token/get',
      method: 'post',
      data
    });
}