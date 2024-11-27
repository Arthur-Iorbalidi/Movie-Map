import BurgerMenuButton from '@src/components/ui/BurgerMenuButton/BurgerMenuButton';
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

describe('BurgerMenuButton Component', () => {
  it('matches snapshot when burger menu is closed', () => {
    const mockHandleOpenBurgerMenu = vi.fn();
    const { asFragment } = render(
      <BurgerMenuButton
        isBurgerMenuOpened={false}
        handleOpenBurgerMenu={mockHandleOpenBurgerMenu}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('matches snapshot when burger menu is open', () => {
    const mockHandleOpenBurgerMenu = vi.fn();
    const { asFragment } = render(
      <BurgerMenuButton
        isBurgerMenuOpened={true}
        handleOpenBurgerMenu={mockHandleOpenBurgerMenu}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
