import PaginationItem from '@src/components/PaginationItem/PaginationItem';
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

describe('PaginationItem Component', () => {
  const handleChangePageMock = vi.fn();

  it('matches snapshot when page is active', () => {
    const { asFragment } = render(
      <PaginationItem
        page={3}
        gap={0}
        handleChangePageCallback={handleChangePageMock}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches snapshot when page is not active', () => {
    const { asFragment } = render(
      <PaginationItem
        page={4}
        gap={1}
        handleChangePageCallback={handleChangePageMock}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
