import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Overview from './Overview';

vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');

  const validProps = (props) => {
    const {
      initial, animate, exit, transition, whileHover, whileTap, whileInView,
      viewport, variants, custom, layoutId, layout, ...rest
    } = props;
    return rest;
  };

  return {
    ...actual,
    motion: {
      ...actual.motion,
      div: React.forwardRef((props, ref) => <div ref={ref} {...validProps(props)} />),
      path: React.forwardRef((props, ref) => <path ref={ref} {...validProps(props)} />),
      circle: React.forwardRef((props, ref) => <circle ref={ref} {...validProps(props)} />),
    },
  };
});

describe('Overview component', () => {
  it('renders without crashing and displays the correct layout sections', () => {
    render(<Overview />);

    // Test that the key metrics are rendered (SlimCards)
    expect(screen.getByText('GROSS_CAPITAL')).toBeInTheDocument();
    expect(screen.getByText('$12.8M')).toBeInTheDocument();

    expect(screen.getByText('UPLINK_RATE')).toBeInTheDocument();
    expect(screen.getByText('2.4gbps')).toBeInTheDocument();

    expect(screen.getByText('SHIELD_OPS')).toBeInTheDocument();
    expect(screen.getByText('SECURE')).toBeInTheDocument();

    expect(screen.getByText('GRID_COMPUTE')).toBeInTheDocument();
    expect(screen.getByText('18.2%')).toBeInTheDocument();

    // Test that other layout components and labels are correctly integrated
    expect(screen.getByText('INTEGRITY')).toBeInTheDocument();
    expect(screen.getByText('LATENCY')).toBeInTheDocument();
    expect(screen.getByText('0.4ms')).toBeInTheDocument();
    expect(screen.getByText('JITTER')).toBeInTheDocument();
    expect(screen.getByText('NOMINAL')).toBeInTheDocument();

    expect(screen.getByText('DATA_STREAM')).toBeInTheDocument();
    expect(screen.getByText('SEC_CORE_v8')).toBeInTheDocument();
    expect(screen.getByText('12%')).toBeInTheDocument();
    expect(screen.getByText('AI_AGENT_PROX')).toBeInTheDocument();
    expect(screen.getByText('64%')).toBeInTheDocument();
    expect(screen.getByText('VAULT_SYNC')).toBeInTheDocument();
    expect(screen.getByText('OK')).toBeInTheDocument();

    // Test the bottom grid components
    expect(screen.getByText('STORE_ARRAY')).toBeInTheDocument();
    expect(screen.getByText('3.2 / 10PB')).toBeInTheDocument();

    expect(screen.getByText('SOVEREIGNTY_INDEX')).toBeInTheDocument();

    expect(screen.getByText('SHIELD_STATUS')).toBeInTheDocument();
    expect(screen.getByText('MAX_GUARD_v8')).toBeInTheDocument();
  });
});
