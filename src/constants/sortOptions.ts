const sortOptions = {
  movies: [
    {
      tittle: 'None',
      value: {
        sortBy: '',
        sortOrder: '',
      },
    },
    {
      tittle: 'Tittle ASC',
      value: {
        sortBy: 'tittle',
        sortOrder: 'ASC',
      },
    },
    {
      tittle: 'Tittle DESC',
      value: {
        sortBy: 'tittle',
        sortOrder: 'DESC',
      },
    },
    {
      tittle: 'Creation date ASC',
      value: {
        sortBy: 'creationDate',
        sortOrder: 'ASC',
      },
    },
    {
      tittle: 'Creation date DESC',
      value: {
        sortBy: 'creationDate',
        sortOrder: 'DESC',
      },
    },
    {
      tittle: 'Budget ASC',
      value: {
        sortBy: 'budget',
        sortOrder: 'ASC',
      },
    },
    {
      tittle: 'Budget DESC',
      value: {
        sortBy: 'budget',
        sortOrder: 'DESC',
      },
    },
  ],
  actors: [
    {
      tittle: 'None',
      value: {
        sortBy: '',
        sortOrder: '',
      },
    },
    {
      tittle: 'Name ASC',
      value: {
        sortBy: 'name',
        sortOrder: 'ASC',
      },
    },
    {
      tittle: 'Name DESC',
      value: {
        sortBy: 'name',
        sortOrder: 'DESC',
      },
    },
    {
      tittle: 'Birthday ASC',
      value: {
        sortBy: 'birthday',
        sortOrder: 'ASC',
      },
    },
    {
      tittle: 'Birthday DESC',
      value: {
        sortBy: 'birthday',
        sortOrder: 'DESC',
      },
    },
    {
      tittle: 'Height ASC',
      value: {
        sortBy: 'height',
        sortOrder: 'ASC',
      },
    },
    {
      tittle: 'Height DESC',
      value: {
        sortBy: 'height',
        sortOrder: 'DESC',
      },
    },
  ],
  directors: [
    {
      tittle: 'None',
      value: {
        sortBy: '',
        sortOrder: '',
      },
    },
    {
      tittle: 'Name ASC',
      value: {
        sortBy: 'name',
        sortOrder: 'ASC',
      },
    },
    {
      tittle: 'Name DESC',
      value: {
        sortBy: 'name',
        sortOrder: 'DESC',
      },
    },
    {
      tittle: 'Birthday ASC',
      value: {
        sortBy: 'birthday',
        sortOrder: 'ASC',
      },
    },
    {
      tittle: 'Birthday DESC',
      value: {
        sortBy: 'birthday',
        sortOrder: 'DESC',
      },
    },
  ],
};

interface ISortOption {
  tittle: string;
  value: {
    sortBy: string;
    sortOrder: string;
  };
}

export type { ISortOption };
export default sortOptions;
