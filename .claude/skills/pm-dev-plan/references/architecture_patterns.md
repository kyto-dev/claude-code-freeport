# Patrones de Arquitectura — Referencia

Usa esta guía para seleccionar el patrón correcto según el contexto del feature. Cuando apliques un patrón, explica brevemente en el plan *por qué* ese patrón y no otro.

---

## Cuándo usar cada patrón

### Monolito modular
**Usar cuando:** MVP, equipo pequeño (<8 devs), dominio no está bien definido aún.
**Evitar cuando:** Necesitas escalar partes independientemente, equipos grandes con ownership separado.
**Tradeoff clave:** Velocidad de desarrollo vs. flexibilidad futura.

### Microservicios
**Usar cuando:** Dominios bien delimitados, equipos independientes, necesidad de escalar componentes por separado.
**Evitar cuando:** Equipo pequeño, dominio nuevo, no hay infraestructura de observabilidad.
**Tradeoff clave:** Autonomía vs. complejidad operacional.

### Event-driven / CQRS
**Usar cuando:** Alta concurrencia, auditoría requerida, procesamiento asíncrono importante, múltiples consumidores del mismo evento.
**Evitar cuando:** Flujos simples CRUD, equipo sin experiencia en colas.
**Tradeoff clave:** Resiliencia y desacoplamiento vs. complejidad de debugging.

### BFF (Backend for Frontend)
**Usar cuando:** Múltiples clientes (web, mobile, third-party) con necesidades de datos diferentes.
**Evitar cuando:** Un solo cliente, API simple.
**Tradeoff clave:** Experiencia de cliente optimizada vs. duplicación de lógica.

### API Gateway + servicios internos
**Usar cuando:** Múltiples microservicios que el cliente no debería conocer directamente.
**Tradeoff clave:** Punto único de entrada (fácil de securizar/rate-limit) vs. single point of failure.

---

## Decisiones de datos

### Cuándo agregar caché (Redis/Memcached)
- Datos que se leen frecuentemente y cambian poco (catálogos, configuraciones, perfiles)
- Sesiones de usuario
- Rate limiting
- Resultados de queries costosas

### Cuándo usar colas (SQS, RabbitMQ, Kafka)
- Procesamiento que puede fallar y necesita retry
- Notificaciones y emails
- Tareas lentas que no deben bloquear el request
- Comunicación entre servicios que deben estar desacoplados

### Cuándo pensar en sharding / particionado
- Tablas que crecerán >50M registros
- Queries que filtran siempre por una misma dimensión (tenant_id, region, fecha)

### Índices — regla práctica
Indexar columnas que aparecen en: `WHERE`, `JOIN ON`, `ORDER BY`. No sobre-indexar: cada índice cuesta en escrituras.

---

## Seguridad — checklist por tipo de feature

### Features con datos de usuario
- [ ] PII encriptado en reposo
- [ ] Logs no contienen datos sensibles
- [ ] GDPR/privacidad: ¿el usuario puede exportar/eliminar sus datos?

### Features con pagos
- [ ] Nunca almacenar PAN (número de tarjeta) — delegar a Stripe/Braintree
- [ ] Webhooks verificados con signature
- [ ] Idempotency keys en transacciones

### Features con uploads de archivos
- [ ] Validar tipo MIME server-side (no solo extensión)
- [ ] Límite de tamaño
- [ ] Escaneo de malware si archivos son públicos
- [ ] Almacenar en S3/GCS, nunca en servidor de aplicación

### Features con autenticación nueva
- [ ] Rate limiting en login/signup
- [ ] Tokens cortos + refresh tokens
- [ ] Invalidación de sesiones activas
- [ ] 2FA si el feature maneja datos sensibles

---

## Estimación de complejidad

| Nivel | Características | Referencia de tiempo (1 dev senior) |
|-------|----------------|--------------------------------------|
| XS | CRUD simple, 1 tabla, sin integraciones | 1-2 días |
| S | 2-3 endpoints, lógica simple, 1 integración | 3-5 días |
| M | Flujo completo con estados, múltiples entidades, auth | 1-2 semanas |
| L | Nuevo dominio, integraciones externas críticas, migraciones complejas | 3-6 semanas |
| XL | Nuevo sistema, rediseño de arquitectura, múltiples equipos | 2+ meses |

Multiplica por 1.5-2x para equipos junior o dominios desconocidos.
