import Footer from '@src/components/Footer/Footer';
import { appName } from '@src/constants/applicationInfo';
import authorInfo from '@src/constants/authorInfo';
import images from '@src/constants/images';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Footer Component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Footer />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders app name correctly', () => {
    render(<Footer />);
    const appNameElement = screen.getByText(appName);
    expect(appNameElement).toBeInTheDocument();
  });

  it('renders author info correctly', () => {
    render(<Footer />);
    const authorElement = screen.getByText(authorInfo.name);
    expect(authorElement).toBeInTheDocument();
  });

  it('renders GitHub and LinkedIn links', () => {
    render(<Footer />);
    const githubLink = screen.getByAltText('github link');
    const linkedInLink = screen.getByAltText('linkedin link');

    expect(githubLink).toHaveAttribute('src', images.githubLogo);
    expect(linkedInLink).toHaveAttribute('src', images.linkedlnLogo);
  });
});
