import Pagination from '@src/components/Pagination/Pagination';
import { IPagination } from '@src/types/serverAPITypes';
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

describe('Pagination Component', () => {
  const handleChangePageMock = vi.fn();

  const mockPagination: IPagination = {
    current_page: 3,
    total_pages: 10,
    total: 0,
    limit: 0,
  };

  it('matches snapshot when pagination is rendered', () => {
    const { asFragment } = render(
      <Pagination
        pagination={mockPagination}
        handleChangePage={handleChangePageMock}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
