// src/components/Message.test.tsx
import Message from '@src/components/ui/Message/Message';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Message Component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Message message="Hello, world!" />);

    expect(asFragment()).toMatchSnapshot();
  });
});
