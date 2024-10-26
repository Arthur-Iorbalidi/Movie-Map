const defaultSearchValues = {
  movies: {
    search: '',
    sort: '',
    sortBy: '',
    page: 1,
    limit: 6,
  },
  actors: {
    search: '',
    sort: '',
    sortBy: '',
    page: 1,
    limit: 6,
  },
  directors: {
    search: '',
    sort: '',
    sortBy: '',
    page: 1,
    limit: 6,
  },
};
const debounceInterval = 500;

export default defaultSearchValues;
export { debounceInterval };
