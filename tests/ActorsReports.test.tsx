import ActorsReports from '@src/components/ActorsReports/ActorsReports';
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@src/utils/Reports', () => ({
  downloadFavoriteActorsReportPDF: vi.fn(),
  downloadFavoriteActorsReportDocx: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

describe('ActorsReports Component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<ActorsReports />);
    expect(asFragment()).toMatchSnapshot();
  });
});
