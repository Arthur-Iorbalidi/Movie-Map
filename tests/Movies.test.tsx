import Movies from '@src/pages/Movies/Movies';
import serverAPI from '@src/services/serverAPI';
import { store } from '@src/store/store';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

describe('Movies Component', () => {
  it('matches snapshot when movies are loaded', () => {
    const mockMovies = {
      data: [
        {
          id: 1,
          title: 'Movie 1',
          genre: 'Action',
          creationDate: '2021-01-01',
          image: 'image_url_1',
          budget: 10000000,
        },
        {
          id: 2,
          title: 'Movie 2',
          genre: 'Comedy',
          creationDate: '2022-01-01',
          image: 'image_url_2',
          budget: 5000000,
        },
      ],
      pagination: {
        current_page: 1,
        total_pages: 10,
        total: 20,
        limit: 2,
      },
    };

    vi.spyOn(serverAPI, 'getMovies').mockResolvedValue(mockMovies);

    const { asFragment } = render(
      <Provider store={store}>
        <Router>
          <Movies />
        </Router>
      </Provider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('matches snapshot when no movies are loaded', () => {
    const mockEmptyMovies = {
      data: [],
      pagination: {
        current_page: 1,
        total_pages: 1,
        total: 0,
        limit: 1,
      },
    };

    vi.spyOn(serverAPI, 'getMovies').mockResolvedValue(mockEmptyMovies);

    const { asFragment } = render(
      <Provider store={store}>
        <Router>
          <Movies />
        </Router>
      </Provider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
