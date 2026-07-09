import { Link } from 'react-router-dom'

type AstraLogoProps = {
  compact?: boolean
}

export function AstraLogo({ compact = false }: AstraLogoProps) {
  return (
    <Link className="brand" to="/" aria-label="Astra home">
      <span className="brand-mark" aria-hidden="true">
        A
      </span>
      {compact ? null : <span>Astra</span>}
    </Link>
  )
}
