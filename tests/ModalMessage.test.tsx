import ModalMessage from '@src/components/ModalMessage/ModalMessage';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('ModalMessage Component', () => {
  it('matches snapshot for success appearance', () => {
    const { asFragment } = render(
      <ModalMessage text="Success message" appearence="success" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches snapshot for error appearance', () => {
    const { asFragment } = render(
      <ModalMessage text="Error message" appearence="error" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches snapshot for normal appearance', () => {
    const { asFragment } = render(
      <ModalMessage text="Normal message" appearence="normal" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches snapshot for default appearance (normal)', () => {
    const { asFragment } = render(
      <ModalMessage text="Default normal message" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches snapshot with custom className', () => {
    const { asFragment } = render(
      <ModalMessage
        text="Message with custom class"
        className="custom-class"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
