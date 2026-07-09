import { Link } from 'react-router-dom'

type AstraLogoProps = {
  compact?: boolean
}

export function AstraLogo({ compact = false }: AstraLogoProps) {
  return (
    <Link className="brand" to="/" aria-label="Astra home">
      <span className="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 64 64" role="img">
          <defs>
            <linearGradient
              id="astra-mark-gradient"
              x1="14"
              x2="50"
              y1="56"
              y2="8"
            >
              <stop stopColor="#E5362F" />
              <stop offset="0.55" stopColor="#FF7A32" />
              <stop offset="1" stopColor="#E8B85C" />
            </linearGradient>
            <linearGradient
              id="astra-orbit-gradient"
              x1="11"
              x2="55"
              y1="46"
              y2="18"
            >
              <stop stopColor="#E5362F" stopOpacity="0.1" />
              <stop offset="0.55" stopColor="#FF7A32" stopOpacity="0.95" />
              <stop offset="1" stopColor="#FFD17B" stopOpacity="0.18" />
            </linearGradient>
          </defs>
          <path
            d="M11.5 42.7c9.4 6.6 28.9 4.9 39-3.4"
            fill="none"
            stroke="url(#astra-orbit-gradient)"
            strokeLinecap="round"
            strokeWidth="3"
          />
          <path
            d="M16 55 32 9l16 46M23.6 34.2h16.8"
            fill="none"
            stroke="url(#astra-mark-gradient)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="6"
          />
          <path d="m32 9 3.1 8.8h-6.2L32 9Z" fill="#FFD17B" opacity="0.95" />
          <circle cx="51" cy="18" r="3" fill="#FFD17B" />
        </svg>
      </span>
      {compact ? null : <span>Astra</span>}
    </Link>
  )
}
