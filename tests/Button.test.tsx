import Button from '@src/components/ui/Button/Button';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

describe('Button Component', () => {
  it('matches snapshot with default appearance', () => {
    const { asFragment } = render(<Button value="Click Me" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches snapshot with danger appearance', () => {
    const { asFragment } = render(
      <Button value="Delete" appearence="danger" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches snapshot with custom className', () => {
    const { asFragment } = render(
      <Button value="Custom Button" className="custom-class" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches snapshot with submit type', () => {
    const { asFragment } = render(<Button value="Submit" type="submit" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches snapshot with reset type', () => {
    const { asFragment } = render(<Button value="Reset" type="reset" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('calls onClick when clicked', () => {
    const mockOnClick = vi.fn();
    render(<Button value="Click Me" onClick={mockOnClick} />);
    screen.getByText('Click Me').click();
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
