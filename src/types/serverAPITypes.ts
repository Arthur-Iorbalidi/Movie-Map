interface IMovie {
  id: number;
  tittle: string;
  description?: string;
  creationDate: string;
  genre: string;
  logoUrl?: string;
  budget: number;
  actors?: IActor[];
  directors?: IDirector[];
}

interface IActor {
  id: number;
  name: string;
  surname: string;
  description?: string;
  height?: string;
  birthday: string;
  dateOfDeath?: null;
  imgUrl?: string;
  placeOfBirth: string;
  movies?: IMovie[];
}

interface IDirector {
  id: number;
  name: string;
  surname: string;
  description?: string;
  birthday: string;
  dateOfDeath?: null;
  imgUrl?: string;
  placeOfBirth: string;
  movies?: IMovie[];
}

interface IUser {
  id: number;
  username: string;
  email: string;
  movies: Array<{ id: number }>;
  actors: Array<{ id: number }>;
  directors: Array<{ id: number }>;
}

interface ICreateUserDto {
  name: string;
  surname: string;
  email: string;
  password: string;
}

interface ILoginUserDto {
  email: string;
  password: string;
}

interface IAuthUserResponse {
  user: IUser;
  token: string;
}

interface ICheckUserResponse {
  isAuthorized: boolean;
  user: IUser | undefined;
}

interface IErrorResponse {
  response: {
    data: {
      statusCode: number;
      message: string;
    };
  };
}

export type {
  IActor,
  IAuthUserResponse,
  ICheckUserResponse,
  ICreateUserDto,
  IDirector,
  IErrorResponse,
  ILoginUserDto,
  IMovie,
  IUser,
};
