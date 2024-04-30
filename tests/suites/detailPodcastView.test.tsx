import React from 'react';
import { render } from '@testing-library/react';
import App from "@bank/App"

describe('Podcast List', () => {
  it('Renders correctly podcast detail correctly', async () => {
    render(
      <App />
    );

  });
});