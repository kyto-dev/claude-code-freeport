'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    // Supabase auth logic goes here
    setTimeout(() => setLoading(false), 1000)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'var(--surface-2)',
    border: '1px solid var(--border)',
    borderRadius: 8,
    padding: '10px 13px',
    color: 'var(--text)',
    fontFamily: 'Inter, sans-serif',
    fontSize: 13.5,
    outline: 'none',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: 10.5,
    letterSpacing: '1.6px',
    textTransform: 'uppercase',
    color: 'var(--text-2)',
    marginBottom: 5,
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
              background: 'var(--accent)',
              transform: 'rotate(45deg)',
              borderRadius: 3,
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
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
          fontFamily: 'Inter, sans-serif',
          fontSize: 22,
          fontWeight: 700,
          marginBottom: 6,
          textAlign: 'center',
        }}
      >
        Crear cuenta
      </h1>
      <p
        style={{
          fontSize: 13,
          color: 'var(--text-2)',
          textAlign: 'center',
          marginBottom: 28,
        }}
      >
        Comienza a controlar tus finanzas
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
        <div>
          <label htmlFor="name" style={labelStyle}>
            Nombre
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre"
            required
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
            onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
          />
        </div>

        <div>
          <label htmlFor="email" style={labelStyle}>
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@correo.com"
            required
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
            onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
          />
        </div>

        <div>
          <label htmlFor="password" style={labelStyle}>
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mínimo 8 caracteres"
            minLength={8}
            required
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
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
            background: loading ? 'var(--surface-3)' : 'var(--accent)',
            color: '#ffffff',
            border: 'none',
            padding: '11px 26px',
            borderRadius: 8,
            fontFamily: 'Inter, sans-serif',
            fontSize: 13.5,
            fontWeight: 500,
            cursor: loading ? 'not-allowed' : 'pointer',
            marginTop: 4,
            transition: 'all 0.15s',
          }}
        >
          {loading ? 'Creando cuenta…' : 'Crear cuenta'}
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
        ¿Ya tienes cuenta?{' '}
        <Link
          href="/login"
          style={{ color: 'var(--accent)', textDecoration: 'none' }}
        >
          Iniciar sesión
        </Link>
      </p>
    </div>
  )
}
