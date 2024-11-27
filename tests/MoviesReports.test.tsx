import MoviesReports from '@src/components/MoviesReports/MoviesReports';
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@src/utils/Reports', () => ({
  downloadFavoriteMoviesReportPDF: vi.fn(),
  downloadFavoriteMoviesReportDocx: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

describe('MoviesReports Component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<MoviesReports />);
    expect(asFragment()).toMatchSnapshot();
  });
});
