import React from 'react';
import { render, screen } from '@testing-library/react';
import { ScreenReaderAnnouncement } from '../screenReaderAnnouncement';

describe('ScreenReaderAnnouncement', () => {
  it('renders with correct accessibility attributes', () => {
    render(<ScreenReaderAnnouncement message="Test announcement" />);
    
    const announcement = screen.getByText('Test announcement');
    expect(announcement).toHaveAttribute('aria-live', 'polite');
    expect(announcement).toHaveAttribute('aria-atomic', 'true');
  });

  it('renders with assertive priority', () => {
    render(<ScreenReaderAnnouncement message="Urgent announcement" priority="assertive" />);
    
    const announcement = screen.getByText('Urgent announcement');
    expect(announcement).toHaveAttribute('aria-live', 'assertive');
  });

  it('renders with polite priority by default', () => {
    render(<ScreenReaderAnnouncement message="Test announcement" />);
    
    const announcement = screen.getByText('Test announcement');
    expect(announcement).toHaveAttribute('aria-live', 'polite');
  });

  it('displays the message text', () => {
    const message = 'This is a test announcement';
    render(<ScreenReaderAnnouncement message={message} />);
    
    const announcement = screen.getByText(message);
    expect(announcement).toHaveTextContent(message);
  });

  it('updates message when prop changes', () => {
    const { rerender } = render(<ScreenReaderAnnouncement message="Initial message" />);
    
    let announcement = screen.getByText('Initial message');
    expect(announcement).toHaveTextContent('Initial message');
    
    rerender(<ScreenReaderAnnouncement message="Updated message" />);
    
    announcement = screen.getByText('Updated message');
    expect(announcement).toHaveTextContent('Updated message');
  });

  it('has correct styling for screen reader only', () => {
    render(<ScreenReaderAnnouncement message="Test announcement" />);
    
    const announcement = screen.getByText('Test announcement');
    expect(announcement).toHaveStyle({
      position: 'absolute',
      left: '-10000px',
      width: '1px',
      height: '1px',
      overflow: 'hidden',
    });
  });

  it('handles empty message', () => {
    render(<ScreenReaderAnnouncement message="" />);
    
    // Empty message should still render the div
    const containers = screen.getAllByRole('generic');
    expect(containers.length).toBeGreaterThan(0);
  });

  it('handles long messages', () => {
    const longMessage = 'This is a very long announcement that contains multiple sentences and should be properly announced by screen readers to provide comprehensive information to users who rely on assistive technologies.';
    render(<ScreenReaderAnnouncement message={longMessage} />);
    
    const announcement = screen.getByText(longMessage);
    expect(announcement).toHaveTextContent(longMessage);
  });

  it('handles special characters in message', () => {
    const specialMessage = 'Message with special chars: @#$%^&*()_+-=[]{}|;:,.<>?';
    render(<ScreenReaderAnnouncement message={specialMessage} />);
    
    const announcement = screen.getByText(specialMessage);
    expect(announcement).toHaveTextContent(specialMessage);
  });

  it('handles HTML entities in message', () => {
    const htmlMessage = 'Message with <HTML> entities & symbols';
    render(<ScreenReaderAnnouncement message={htmlMessage} />);
    
    const announcement = screen.getByText(htmlMessage);
    expect(announcement).toHaveTextContent(htmlMessage);
  });
});