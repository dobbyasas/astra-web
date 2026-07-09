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
              x1="11"
              x2="53"
              y1="57"
              y2="7"
            >
              <stop stopColor="#E5362F" />
              <stop offset="0.55" stopColor="#FF7A32" />
              <stop offset="1" stopColor="#E8B85C" />
            </linearGradient>
          </defs>
          <rect width="64" height="64" rx="14" fill="#0B0C10" />
          <path
            fill="url(#astra-mark-gradient)"
            d="M32 6 57 58H43.6l-4.2-10.2H23.8L19.6 58H7L32 6Zm0 17.4-6.7 16.2h10.3L32 30.8l-3.4 8.8h9.7L32 23.4Z"
          />
          <path fill="#0B0C10" d="m26.6 39.6 4.9-12.2 4.9 12.2h-9.8Z" />
          <path
            fill="#FFD17B"
            d="M20.7 43.7h25.1l-3.3 7.7H24l-3.3-7.7Z"
            opacity="0.95"
          />
        </svg>
      </span>
      {compact ? null : <span>Astra</span>}
    </Link>
  )
}
