import DirectorsReports from '@src/components/DirectorsReports/DirectorsReports';
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@src/utils/Reports', () => ({
  downloadFavoriteDirectorsReportPDF: vi.fn(),
  downloadFavoriteDirectorsReportDocx: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

describe('DirectorsReports Component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<DirectorsReports />);
    expect(asFragment()).toMatchSnapshot();
  });
});
