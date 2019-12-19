import React from 'react';
import { render, cleanup } from 'react-testing-library';
import Golfpage from './golf-page.component';

const webId = 'https://example.com/#me';
const match = {
  params: {
    gameId:
      'aHR0cHM6Ly9leG1hcGxlLmNvbS9wdWJsaWMvZGVtb2Vycm9ycy9nYW1lL3RpY3RhY3RvZS8xNTYzMzk0NzExNDU3LnR0bA=='
  }
};

describe('GolfPage', () => {
  afterEach(cleanup);

  const { getByTestId, container } = render(<Golfpage {...{ webId, match }} />);

  test('should render Golf component', () => {
    expect(getByTestId('game')).not.toBe(null);
  });

  test('renders without crashing', () => {
    expect(container).toBeTruthy();
  });
});
