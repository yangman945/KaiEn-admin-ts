import api from '../index'
import qs from 'qs'
export function loginRequest(data) {
    return api({
      url: '/token/get',
      method: 'post',
      data:qs.stringify(data)
    });
}