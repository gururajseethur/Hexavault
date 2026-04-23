import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Atmosphere from './Atmosphere';

describe('Atmosphere Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => setTimeout(cb, 16));
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation((id) => clearTimeout(id));
    vi.spyOn(window, 'addEventListener');
    vi.spyOn(window, 'removeEventListener');
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('renders without crashing', () => {
    const { container } = render(<Atmosphere />);
    expect(container.firstChild).toBeInTheDocument();
    expect(container.querySelector('canvas')).toBeInTheDocument();
  });

  it('initializes canvas context and sets correct dimensions', () => {
    const originalWidth = window.innerWidth;
    const originalHeight = window.innerHeight;

    // Set a predictable size
    window.innerWidth = 800;
    window.innerHeight = 600;

    const { container } = render(<Atmosphere />);
    const canvas = container.querySelector('canvas');

    expect(canvas.width).toBe(800);
    expect(canvas.height).toBe(600);

    const context = canvas.getContext('2d');
    expect(context).not.toBeNull();

    // Restore window dimensions
    window.innerWidth = originalWidth;
    window.innerHeight = originalHeight;
  });

  it('adds and removes resize event listener', () => {
    const { unmount } = render(<Atmosphere />);

    expect(window.addEventListener).toHaveBeenCalledWith('resize', expect.any(Function));

    unmount();

    expect(window.removeEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
  });

  it('updates canvas dimensions on window resize', () => {
    render(<Atmosphere />);
    const resizeHandler = window.addEventListener.mock.calls.find(call => call[0] === 'resize')[1];

    window.innerWidth = 1024;
    window.innerHeight = 768;

    resizeHandler();

    const canvas = document.querySelector('canvas');
    expect(canvas.width).toBe(1024);
    expect(canvas.height).toBe(768);
  });

  it('starts and stops the animation loop', () => {
    const { unmount } = render(<Atmosphere />);

    // requestAnimationFrame should be called to start loop
    expect(window.requestAnimationFrame).toHaveBeenCalled();

    unmount();

    // cancelAnimationFrame should be called when unmounted
    expect(window.cancelAnimationFrame).toHaveBeenCalled();
  });

  it('renders the atmospheric overlay elements', () => {
    const { container } = render(<Atmosphere />);
    expect(container.querySelector('.radar-sweep')).toBeInTheDocument();
    expect(container.querySelector('.signal-sweep')).toBeInTheDocument();
    expect(container.querySelector('.scanline-overlay')).toBeInTheDocument();
  });
});
