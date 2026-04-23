import React from 'react';
import { render } from '@testing-library/react';
import { ArchDiagram } from '../HUDComponents';

describe('ArchDiagram', () => {
  it('renders the header correctly', () => {
    const { getByText } = render(<ArchDiagram />);
    expect(getByText('TOPOLOGY_X')).toBeInTheDocument();
  });

  it('renders all node labels correctly', () => {
    const { getByText } = render(<ArchDiagram />);
    expect(getByText('PRIME')).toBeInTheDocument();
    expect(getByText('AUTH')).toBeInTheDocument();
    expect(getByText('DATA')).toBeInTheDocument();
    expect(getByText('SHIELD')).toBeInTheDocument();
    expect(getByText('LINK')).toBeInTheDocument();
  });

  it('renders correct number of connection paths', () => {
    const { container } = render(<ArchDiagram />);
    // motion.path elements are rendered as path elements in the DOM
    const paths = container.querySelectorAll('path');
    expect(paths.length).toBe(4);
  });

  it('renders correct number of node circles with proper sizing', () => {
    const { container } = render(<ArchDiagram />);
    const circles = container.querySelectorAll('circle');
    expect(circles.length).toBe(5);

    // PRIME is core, others are sub
    const coreCircles = Array.from(circles).filter(c => c.getAttribute('r') === '12');
    const subCircles = Array.from(circles).filter(c => c.getAttribute('r') === '8');

    expect(coreCircles.length).toBe(1);
    expect(subCircles.length).toBe(4);
  });
});
