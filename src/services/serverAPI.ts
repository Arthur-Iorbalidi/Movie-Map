import {
  IActor,
  IAuthUserResponse,
  ICheckUserResponse,
  ICreateUserDto,
  IDirector,
  IErrorResponse,
  ILoginUserDto,
  IMovie,
} from '@src/types/serverAPITypes';
import axios from 'axios';

import storageAPI from './storageAPI';

class ServerAPI {
  private baseUrl = 'http://localhost:5000/api';

  private api = axios.create({
    baseURL: this.baseUrl,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  async register(
    userDto: ICreateUserDto,
    successCallback?: (value: IAuthUserResponse) => void,
    errorCallback?: (message?: string) => void,
  ) {
    try {
      const response = await this.api.post('auth/registration', {
        name: userDto.name,
        surname: userDto.surname,
        email: userDto.email,
        password: userDto.password,
      });

      successCallback?.(response.data);
    } catch (error) {
      if ((error as IErrorResponse).response) {
        errorCallback?.((error as IErrorResponse).response.data.message);
      } else {
        errorCallback?.('Error');
      }
    }
  }

  async login(
    userDto: ILoginUserDto,
    successCallback?: (value: IAuthUserResponse) => void,
    errorCallback?: (message?: string) => void,
  ) {
    try {
      const response = await this.api.post('auth/login', {
        email: userDto.email,
        password: userDto.password,
      });

      successCallback?.(response.data);
    } catch (error) {
      if ((error as IErrorResponse).response) {
        errorCallback?.((error as IErrorResponse).response.data.message);
      } else {
        errorCallback?.('Error');
      }
    }
  }

  async checkUser(callback?: (response: ICheckUserResponse) => void) {
    try {
      const token = this.getToken();

      const response = await this.api.get('auth/check', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      callback?.({ isAuthorized: true, user: response.data });
    } catch {
      callback?.({ isAuthorized: false, user: undefined });
    }
  }

  logout() {
    storageAPI.remove('token');
  }

  async getMovies(): Promise<IMovie[]> {
    const response = await this.api.get('movies');

    return response.data;
  }

  async getMovie(id: number): Promise<IMovie> {
    const response = await this.api.get(`movies/${id}`);

    return response.data;
  }

  async getActors(): Promise<IActor[]> {
    const response = await this.api.get('actors');

    return response.data;
  }

  async getActor(id: number): Promise<IActor> {
    const response = await this.api.get(`actors/${id}`);

    return response.data;
  }

  async getDirectors(): Promise<IDirector[]> {
    const response = await this.api.get('directors');

    return response.data;
  }

  async getDirector(id: number): Promise<IDirector> {
    const response = await this.api.get(`directors/${id}`);

    return response.data;
  }

  getToken() {
    return storageAPI.get('token');
  }

  setToken(token: string) {
    storageAPI.set('token', token);
  }
}

const serverAPI = new ServerAPI();
export default serverAPI;
