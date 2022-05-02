import { cleanup, render } from '@testing-library/react';
import WidgetsGrid from './index';

const mockWidgetsList = jest.fn();
const mockSaveCurrentLayout = jest.fn();

jest.mock('modules/Shared/contexts', () => ({
  useWidgets: () => ({
    widgetsList: mockWidgetsList(),
    saveCurrentLayout: mockSaveCurrentLayout(),
  }),
}));

beforeEach(() => {
  mockWidgetsList.mockImplementation(() => [
    {
      options: {
        lg: {
          i: 'testComponent',
          x: 0,
          y: 0,
          w: 6,
          h: 2,
        },
      },
      builder: () => <div>Test</div>,
    },
  ]);
  mockSaveCurrentLayout.mockImplementation(() => {});
});

afterEach(cleanup);

afterAll(() => {
  jest.unmock('modules/Shared/contexts');
});

describe('WidgetsGrid', () => {
  it('should render the component', () => {
    const { container } = render(<WidgetsGrid />);

    expect(container);
  });

  it('should render a layout containing widgets if there are widgets', () => {
    const { container } = render(<WidgetsGrid />);

    expect(container.firstChild).toHaveClass('react-grid-layout');
  });

  it('should render an empty container if there is no widget', () => {
    mockWidgetsList.mockImplementation(() => []);
    const { container } = render(<WidgetsGrid />);

    expect(container.children.length).toBe(0);
  });
});
