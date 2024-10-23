interface IMovie {
  id: number;
  tittle: string;
  description?: string;
  creationDate: string;
  genre: string;
  logoUrl?: string;
  budget: number;
  // actors?: IActor[];
  // directors?: IDirector[];
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
  movies?: IMovie[];
  actors?: IActor[];
  directors?: IDirector[];
}

export type { IActor, IDirector, IMovie, IUser };
