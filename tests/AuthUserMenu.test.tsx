import { configureStore } from '@reduxjs/toolkit';
import AuthUserMenu from '@src/components/AuthUserMenu/AuthUserMenu';
import { userReducer } from '@src/store/slices/userSlice';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

const mockStore = configureStore({
  reducer: {
    user: userReducer,
  },
});

describe('AuthUserMenu Component', () => {
  const toggleAuthUserMenu = vi.fn();

  it('matches snapshot when menu is open', () => {
    const { asFragment } = render(
      <Provider store={mockStore}>
        <Router>
          <AuthUserMenu
            toggleAuthUserMenu={toggleAuthUserMenu}
            isAuthUserMenuOpened={true}
          />
        </Router>
      </Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches snapshot when menu is closed', () => {
    const { asFragment } = render(
      <Provider store={mockStore}>
        <Router>
          <AuthUserMenu
            toggleAuthUserMenu={toggleAuthUserMenu}
            isAuthUserMenuOpened={false}
          />
        </Router>
      </Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('calls toggleAuthUserMenu when a link is clicked', () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <AuthUserMenu
            toggleAuthUserMenu={toggleAuthUserMenu}
            isAuthUserMenuOpened={true}
          />
        </Router>
      </Provider>,
    );

    const accountLink = screen.getByText('Account');
    fireEvent.click(accountLink);
    expect(toggleAuthUserMenu).toHaveBeenCalledTimes(1);

    const favoritesLink = screen.getByText('Favorites');
    fireEvent.click(favoritesLink);
    expect(toggleAuthUserMenu).toHaveBeenCalledTimes(2);
  });
});
