import { useEffect, useRef } from 'react'

type Props = {
  message: string
  priority?: 'polite' | 'assertive'
}

export function ScreenReaderAnnouncement({ message, priority = 'polite' }: Props) {
  const announcementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (message && announcementRef.current) {
      announcementRef.current.textContent = message
    }
  }, [message])

  return (
    <div
      ref={announcementRef}
      aria-live={priority}
      aria-atomic="true"
      style={{
        position: 'absolute',
        left: '-10000px',
        width: '1px',
        height: '1px',
        overflow: 'hidden',
      }}
    />
  )
}
