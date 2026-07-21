import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 512, height: 512 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#2563eb',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '128px',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="312"
          height="312"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.3L5 10 3 8"/>
          <path d="M3 10h18l-1.423 7.828A2 2 0 0 1 17.608 19H6.392a2 2 0 0 1-1.969-1.172L3 10z"/>
          <path d="M7 14h.01"/>
          <path d="M17 14h.01"/>
        </svg>
      </div>
    ),
    { ...size }
  )
}
