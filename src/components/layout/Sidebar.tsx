'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const MONTH_NAMES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
]

// SVG icon components
function IconDashboard() {
  return (
    <svg
      width="17" height="17" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.6"
      style={{ flexShrink: 0, opacity: 0.9 }}
    >
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  )
}

function IconCategories() {
  return (
    <svg
      width="17" height="17" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.6"
      style={{ flexShrink: 0, opacity: 0.9 }}
    >
      <path d="M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM16 17h-2v-2h2v-2h2v2h2v2h-2v2h-2v-2z" />
    </svg>
  )
}

function IconTrends() {
  return (
    <svg
      width="17" height="17" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.6"
      style={{ flexShrink: 0, opacity: 0.9 }}
    >
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  )
}

function IconUpload() {
  return (
    <svg
      width="17" height="17" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.6"
      style={{ flexShrink: 0, opacity: 0.9 }}
    >
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
    </svg>
  )
}

interface NavItem {
  href: string
  label: string
  icon: React.ReactNode
  badge?: string
}

const NAV_ITEMS: NavItem[] = [
  { href: '/dashboard', label: 'Resumen', icon: <IconDashboard /> },
  { href: '/categories', label: 'Categorías', icon: <IconCategories /> },
  { href: '/trends', label: 'Tendencias', icon: <IconTrends /> },
  { href: '/upload', label: 'Subir Factura', icon: <IconUpload />, badge: 'Nuevo' },
]

export function Sidebar() {
  const pathname = usePathname()
  const now = new Date()
  const [monthIdx, setMonthIdx] = useState(now.getMonth())
  const [year, setYear] = useState(now.getFullYear())

  function prevMonth() {
    if (monthIdx === 0) {
      setMonthIdx(11)
      setYear((y) => y - 1)
    } else {
      setMonthIdx((m) => m - 1)
    }
  }

  function nextMonth() {
    if (monthIdx === 11) {
      setMonthIdx(0)
      setYear((y) => y + 1)
    } else {
      setMonthIdx((m) => m + 1)
    }
  }

  return (
    <aside
      style={{
        width: 224,
        minHeight: '100vh',
        background: 'var(--surface)',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: '32px 24px 28px',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 2,
          }}
        >
          <div
            style={{
              width: 22,
              height: 22,
              background: 'var(--accent)',
              transform: 'rotate(45deg)',
              borderRadius: 3,
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: '-0.3px',
            }}
          >
            Freeport
          </span>
        </div>
        <div
          style={{
            fontSize: 10.5,
            color: 'var(--text-3)',
            letterSpacing: 2,
            textTransform: 'uppercase',
            paddingLeft: 32,
          }}
        >
          Finanzas personales
        </div>
      </div>

      {/* Navigation */}
      <nav
        style={{
          padding: '20px 12px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {/* Principal section */}
        <div
          style={{
            padding: '16px 12px 6px',
            fontSize: 10,
            letterSpacing: '1.8px',
            textTransform: 'uppercase',
            color: 'var(--text-3)',
          }}
        >
          Principal
        </div>

        {NAV_ITEMS.slice(0, 3).map((item) => (
          <NavLink key={item.href} item={item} active={pathname === item.href} />
        ))}

        {/* Acciones section */}
        <div
          style={{
            padding: '16px 12px 6px',
            fontSize: 10,
            letterSpacing: '1.8px',
            textTransform: 'uppercase',
            color: 'var(--text-3)',
            marginTop: 8,
          }}
        >
          Acciones
        </div>

        {NAV_ITEMS.slice(3).map((item) => (
          <NavLink key={item.href} item={item} active={pathname === item.href} />
        ))}
      </nav>

      {/* Month picker */}
      <div
        style={{
          padding: '16px 24px 24px',
          borderTop: '1px solid var(--border)',
        }}
      >
        <div
          style={{
            fontSize: 10,
            letterSpacing: '1.8px',
            textTransform: 'uppercase',
            color: 'var(--text-3)',
            marginBottom: 10,
          }}
        >
          Período activo
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <button
            onClick={prevMonth}
            aria-label="Mes anterior"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-3)',
              cursor: 'pointer',
              fontSize: 18,
              lineHeight: 1,
              padding: '2px 4px',
              transition: 'color 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-3)')}
          >
            ‹
          </button>
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            {MONTH_NAMES[monthIdx]} {year}
          </span>
          <button
            onClick={nextMonth}
            aria-label="Mes siguiente"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-3)',
              cursor: 'pointer',
              fontSize: 18,
              lineHeight: 1,
              padding: '2px 4px',
              transition: 'color 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-3)')}
          >
            ›
          </button>
        </div>
      </div>
    </aside>
  )
}

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  return (
    <Link
      href={item.href}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '10px 12px',
        borderRadius: 9,
        color: active ? 'var(--accent)' : 'var(--text-2)',
        background: active ? 'var(--accent-dim)' : 'transparent',
        fontSize: 13.5,
        textDecoration: 'none',
        transition: 'all 0.15s',
        userSelect: 'none',
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.background = 'var(--surface-2)'
          e.currentTarget.style.color = 'var(--text)'
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.background = 'transparent'
          e.currentTarget.style.color = 'var(--text-2)'
        }
      }}
    >
      {item.icon}
      {item.label}
      {item.badge != null && (
        <span
          style={{
            marginLeft: 'auto',
            background: 'var(--accent)',
            color: '#ffffff',
            fontSize: 10,
            fontWeight: 600,
            padding: '1px 6px',
            borderRadius: 10,
          }}
        >
          {item.badge}
        </span>
      )}
    </Link>
  )
}
