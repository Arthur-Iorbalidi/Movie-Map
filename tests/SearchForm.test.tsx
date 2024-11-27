import SearchForm from '@src/components/SearchForm/SearchForm';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

describe('SearchForm Component', () => {
  const handleChangeQueryMock = vi.fn();
  const currentSearchValue = 'test query';

  it('matches snapshot', () => {
    const { asFragment } = render(
      <Router>
        <SearchForm
          handleChangeQuery={handleChangeQueryMock}
          currentSearchValue={currentSearchValue}
        />
      </Router>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
