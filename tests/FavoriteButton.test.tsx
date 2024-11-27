// src/components/FavoriteButton.test.tsx
import FavoriteButton from '@src/components/ui/FavoriteButton/FavoriteButton';
import images from '@src/constants/images';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

describe('FavoriteButton Component', () => {
  it('renders correctly when not in favorites', () => {
    const mockOnClick = vi.fn();
    render(<FavoriteButton isInFavorites={false} onClick={mockOnClick} />);

    const img = screen.getByAltText('add to favorites');
    expect(img).toHaveAttribute('src', images.favoriteBookmark);

    const button = screen.getByRole('button');
    expect(button).not.toHaveClass('in_favorites');
  });
});
