import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

// Mock the page components to isolate App logic
vi.mock('./pages/Overview', () => ({
  default: () => <div data-testid="page-overview">Overview Page</div>
}));
vi.mock('./pages/CommandCenter', () => ({
  default: () => <div data-testid="page-command">Command Center Page</div>
}));
vi.mock('./pages/SecurityWarRoom', () => ({
  default: () => <div data-testid="page-security">Security War Room Page</div>
}));
vi.mock('./pages/Infrastructure', () => ({
  default: () => <div data-testid="page-infrastructure">Infrastructure Page</div>
}));
vi.mock('./pages/IntelligenceLayer', () => ({
  default: () => <div data-testid="page-intelligence">Intelligence Layer Page</div>
}));

// Mock other components
vi.mock('./components/SystemOverlay', () => ({
  default: () => <div data-testid="system-overlay">System Overlay</div>
}));
vi.mock('./components/Atmosphere', () => ({
  default: () => <div data-testid="atmosphere">Atmosphere</div>
}));

// Mock lucide-react icons used in navigation
vi.mock('lucide-react', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    LayoutDashboard: () => <div data-testid="icon-overview">LayoutDashboard</div>,
    Terminal: () => <div data-testid="icon-command">Terminal</div>,
    ShieldAlert: () => <div data-testid="icon-security">ShieldAlert</div>,
    Server: () => <div data-testid="icon-infrastructure">Server</div>,
    Cpu: () => <div data-testid="icon-intelligence">Cpu</div>,
    Search: () => <div>Search</div>,
    Settings: () => <div>Settings</div>,
    Bell: () => <div>Bell</div>,
    Clock: () => <div>Clock</div>,
    Layers: () => <div>Layers</div>,
  };
});

describe('App Navigation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders Overview page by default', () => {
    render(<App />);
    expect(screen.getByTestId('page-overview')).toBeInTheDocument();
  });

  it('navigates to Command Center when its nav button is clicked', async () => {
    render(<App />);
    // Initial state is overview
    expect(screen.getByTestId('page-overview')).toBeInTheDocument();

    const commandButton = screen.getByTestId('icon-command').closest('button');
    fireEvent.click(commandButton);

    await waitFor(() => {
      expect(screen.getByTestId('page-command')).toBeInTheDocument();
    });
    // Overview should be removed
    expect(screen.queryByTestId('page-overview')).not.toBeInTheDocument();
  });

  it('navigates to Security War Room when its nav button is clicked', async () => {
    render(<App />);

    const securityButton = screen.getByTestId('icon-security').closest('button');
    fireEvent.click(securityButton);

    await waitFor(() => {
      expect(screen.getByTestId('page-security')).toBeInTheDocument();
    });
  });

  it('navigates to Infrastructure when its nav button is clicked', async () => {
    render(<App />);

    const infrastructureButton = screen.getByTestId('icon-infrastructure').closest('button');
    fireEvent.click(infrastructureButton);

    await waitFor(() => {
      expect(screen.getByTestId('page-infrastructure')).toBeInTheDocument();
    });
  });

  it('navigates to Intelligence Layer when its nav button is clicked', async () => {
    render(<App />);

    const intelligenceButton = screen.getByTestId('icon-intelligence').closest('button');
    fireEvent.click(intelligenceButton);

    await waitFor(() => {
      expect(screen.getByTestId('page-intelligence')).toBeInTheDocument();
    });
  });
});
