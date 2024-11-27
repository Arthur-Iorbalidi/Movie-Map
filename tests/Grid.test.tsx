import Grid, { LayoutType } from '@src/components/Grid/Grid';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Grid Component', () => {
  it('matches snapshot when loading is true', () => {
    const { asFragment } = render(
      <Grid isLoading={true} layoutType={LayoutType.threeColumns}>
        <div>Child 1</div>
        <div>Child 2</div>
      </Grid>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('matches snapshot when loading is false', () => {
    const { asFragment } = render(
      <Grid
        isLoading={false}
        layoutType={LayoutType.twoColumns}
        message="No data available"
      >
        <div>Child 1</div>
        <div>Child 2</div>
      </Grid>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the loader when isLoading is true', () => {
    render(
      <Grid isLoading={true} layoutType={LayoutType.twoColumns}>
        <div>Child 1</div>
        <div>Child 2</div>
      </Grid>,
    );

    expect(screen.getByRole('img', { name: /loader/i })).toBeInTheDocument();
  });

  it('renders the message when message prop is provided', () => {
    const message = 'No data available';
    render(
      <Grid
        isLoading={false}
        layoutType={LayoutType.threeColumns}
        message={message}
      >
        <div>Child 1</div>
        <div>Child 2</div>
      </Grid>,
    );

    expect(screen.getByText(message)).toBeInTheDocument();
  });
});
