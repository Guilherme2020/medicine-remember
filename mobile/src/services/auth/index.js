import api from '../api';
import { login } from '../storage';

const UserService = {

  login: async (params) => {

    const response = await api.post('/login', params);
    // console.warn('response',response);

    let user = response.data;
    login(user);
  }

}

export default UserService;
