import api from '../index'
export function login(data) {
    return api({
      url: '/login',
      method: 'post',
      data
    });
}