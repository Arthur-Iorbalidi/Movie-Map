import Item, { Appearance } from '@src/components/Item/Item';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

describe('Item Component', () => {
  it('matches snapshot for vertical appearance', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Item
          id={1}
          title="Item Title"
          isActive={true}
          navigateTo="/item/1"
          appearance={Appearance.vertical}
        />
      </MemoryRouter>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('matches snapshot for horizontal appearance', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Item
          id={1}
          title="Item Title"
          isActive={true}
          navigateTo="/item/1"
          appearance={Appearance.horizontal}
        />
      </MemoryRouter>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders item with image and details correctly', () => {
    render(
      <MemoryRouter>
        <Item
          id={1}
          title="Item Title"
          subtitle="Item Subtitle"
          caption="Item Caption"
          image="test.jpg"
          isActive={true}
          navigateTo="/item/1"
        />
      </MemoryRouter>,
    );

    expect(screen.getByAltText('item')).toHaveAttribute('src', 'test.jpg');
    expect(screen.getByText('Item Title')).toBeInTheDocument();
    expect(screen.getByText('Item Subtitle')).toBeInTheDocument();
    expect(screen.getByText('Item Caption')).toBeInTheDocument();
  });

  it('calls handleBtnClickCallback when favorite button is clicked', () => {
    const handleBtnClickMock = vi.fn();
    render(
      <MemoryRouter>
        <Item
          id={1}
          title="Item Title"
          isActive={true}
          navigateTo="/item/1"
          handleBtnClickCallback={handleBtnClickMock}
        />
      </MemoryRouter>,
    );

    const favoriteButton = screen.getByRole('button');
    fireEvent.click(favoriteButton);

    expect(handleBtnClickMock).toHaveBeenCalledWith(1);
  });
});
