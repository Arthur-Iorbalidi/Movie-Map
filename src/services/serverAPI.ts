import { IActor, IDirector, IMovie } from '@src/types/serverAPITypes';
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
}

const serverAPI = new ServerAPI();
export default serverAPI;
