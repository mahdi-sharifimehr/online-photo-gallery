import React from 'react';
import renderer from 'react-test-renderer';
import Home from '../src/screens/Home';

jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
  useSelector: () => jest.fn()
}));

test('InitialScreen Snapshot Test', () => {
  const tree = renderer.create(<Home />).toJSON();
  expect(tree).toMatchSnapshot();
});