import api from '../index'
import qs from 'qs'
export function login(data) {
    return api({
      url: '/token/get',
      method: 'post',
      data:qs.stringify(data)
    });
}