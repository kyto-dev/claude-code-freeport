'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    // Supabase auth logic goes here
    setTimeout(() => setLoading(false), 1000)
  }

  return (
    <div
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 14,
        padding: 40,
        width: 380,
      }}
    >
      {/* Logo */}
      <div style={{ marginBottom: 32, textAlign: 'center' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            marginBottom: 4,
          }}
        >
          <div
            style={{
              width: 22,
              height: 22,
              background: 'var(--gold)',
              transform: 'rotate(45deg)',
              borderRadius: 3,
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 22,
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
          }}
        >
          Finanzas personales
        </div>
      </div>

      <h1
        style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 22,
          fontWeight: 700,
          marginBottom: 6,
          textAlign: 'center',
        }}
      >
        Bienvenido de vuelta
      </h1>
      <p
        style={{
          fontSize: 13,
          color: 'var(--text-2)',
          textAlign: 'center',
          marginBottom: 28,
        }}
      >
        Inicia sesión para continuar
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
        <div>
          <label
            htmlFor="email"
            style={{
              display: 'block',
              fontSize: 10.5,
              letterSpacing: '1.6px',
              textTransform: 'uppercase',
              color: 'var(--text-2)',
              marginBottom: 5,
            }}
          >
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@correo.com"
            required
            style={{
              width: '100%',
              background: 'var(--surface-2)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              padding: '10px 13px',
              color: 'var(--text)',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 13.5,
              outline: 'none',
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--gold)')}
            onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
          />
        </div>

        <div>
          <label
            htmlFor="password"
            style={{
              display: 'block',
              fontSize: 10.5,
              letterSpacing: '1.6px',
              textTransform: 'uppercase',
              color: 'var(--text-2)',
              marginBottom: 5,
            }}
          >
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            style={{
              width: '100%',
              background: 'var(--surface-2)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              padding: '10px 13px',
              color: 'var(--text)',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 13.5,
              outline: 'none',
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--gold)')}
            onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            background: loading ? 'var(--surface-3)' : 'var(--gold)',
            color: '#0c0b0a',
            border: 'none',
            padding: '11px 26px',
            borderRadius: 8,
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 13.5,
            fontWeight: 500,
            cursor: loading ? 'not-allowed' : 'pointer',
            marginTop: 4,
            transition: 'all 0.15s',
          }}
        >
          {loading ? 'Iniciando sesión…' : 'Iniciar sesión'}
        </button>
      </form>

      <p
        style={{
          fontSize: 13,
          color: 'var(--text-2)',
          textAlign: 'center',
          marginTop: 22,
        }}
      >
        ¿No tienes cuenta?{' '}
        <Link
          href="/register"
          style={{ color: 'var(--gold)', textDecoration: 'none' }}
        >
          Crear cuenta
        </Link>
      </p>
    </div>
  )
}
