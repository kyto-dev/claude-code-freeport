# Templates de QA — Referencia

Usa estos templates para poblar la sección de QA del plan según el tipo de feature.

---

## Template de criterios de aceptación (BDD)

```
Dado [contexto inicial / estado del sistema]
Cuando [el usuario hace X / ocurre el evento Y]
Entonces [resultado esperado observable]
  Y [condición adicional si aplica]
```

**Ejemplo — feature de login:**
```
Dado que el usuario tiene una cuenta activa
Cuando ingresa email y contraseña correctos
Entonces es redirigido al dashboard
  Y se crea una sesión válida por 15 minutos

Dado que el usuario ingresa una contraseña incorrecta 3 veces
Cuando intenta hacer login por cuarta vez
Entonces su cuenta es bloqueada por 15 minutos
  Y recibe un email de notificación
```

---

## Casos de prueba por tipo de feature

### CRUD / Formularios
- [ ] Happy path: crear con datos válidos
- [ ] Validación de campos requeridos (vacíos)
- [ ] Validación de formato (email, teléfono, fecha)
- [ ] Límites de longitud (min/max caracteres)
- [ ] Duplicados: ¿qué pasa si ya existe?
- [ ] Editar: ¿los cambios persisten correctamente?
- [ ] Eliminar: ¿se eliminan las entidades relacionadas? ¿o soft delete?
- [ ] Permisos: ¿un usuario puede ver/editar datos de otro?

### Autenticación / Autorización
- [ ] Login exitoso con credenciales válidas
- [ ] Login fallido con credenciales incorrectas
- [ ] Sesión expirada: redirige a login
- [ ] Acceso a ruta protegida sin autenticación
- [ ] Acceso a recurso de otro usuario (IDOR)
- [ ] Refresh token: obtiene nuevo access token
- [ ] Logout: invalidar sesión activa
- [ ] Rate limiting: bloqueo tras N intentos fallidos

### Pagos / Transacciones
- [ ] Pago exitoso con tarjeta válida
- [ ] Pago rechazado (fondos insuficientes, tarjeta expirada)
- [ ] Doble submit (idempotencia)
- [ ] Timeout durante el pago: ¿se cobra? ¿se revierte?
- [ ] Webhook recibido: ¿se actualiza el estado correctamente?
- [ ] Reembolso parcial y total
- [ ] Divisa y formateo correcto

### Búsqueda y filtros
- [ ] Búsqueda con término exacto
- [ ] Búsqueda parcial / fuzzy
- [ ] Sin resultados: muestra mensaje apropiado
- [ ] Caracteres especiales en la búsqueda (SQL injection, XSS)
- [ ] Filtros combinados
- [ ] Paginación: página 1, página N, última página
- [ ] Ordenamiento ascendente y descendente
- [ ] Performance con dataset grande (>100k registros)

### Notificaciones / Emails
- [ ] Trigger correcto: se envía cuando debe
- [ ] No se envía cuando no debe (ej: usuario desactivó notificaciones)
- [ ] Contenido correcto: datos del usuario, links, fechas
- [ ] Links funcionan y no expiran prematuramente
- [ ] No duplicados: no se envía dos veces el mismo evento
- [ ] Manejo de bounce / email inválido

### Uploads de archivos
- [ ] Upload de archivo válido y dentro del límite de tamaño
- [ ] Archivo demasiado grande: error claro
- [ ] Tipo de archivo no permitido: error claro
- [ ] Archivo corrupto
- [ ] Upload concurrente del mismo archivo
- [ ] El archivo es accesible después del upload
- [ ] Eliminar archivo: ya no es accesible

### Integraciones con terceros
- [ ] Happy path: integración responde correctamente
- [ ] Timeout / servicio externo caído: fallback graceful
- [ ] Respuesta inesperada / schema cambiado
- [ ] Rate limit del proveedor alcanzado
- [ ] Credenciales expiradas / inválidas
- [ ] Datos en ambos sistemas son consistentes

---

## Estrategia de testing por madurez del equipo

### Equipo pequeño / MVP (priorizar valor)
1. E2E de los 3-5 flujos críticos (login, checkout, acción principal)
2. Unit tests de lógica de negocio compleja
3. Smoke tests en cada deploy

### Equipo mediano (coverage real)
1. Unit tests: >70% de servicios y utilidades
2. Integration tests: todos los endpoints de API
3. E2E: flujos críticos + flujos de error principales
4. Contract tests si hay múltiples consumidores de la API

### Equipo maduro (calidad como cultura)
1. TDD en lógica de negocio
2. Mutation testing para validar calidad de tests
3. Performance tests en pipelines de CI
4. Chaos engineering para resiliencia

---

## Métricas de calidad a definir antes de lanzar

| Métrica | Pregunta | Umbral sugerido |
|---------|----------|-----------------|
| Error rate | % de requests que fallan | <0.1% en producción |
| P95 latency | 95% de requests responden en | <500ms API, <2s páginas |
| Crash-free rate | % de sesiones sin crash (mobile) | >99.5% |
| Test coverage | % de líneas cubiertas por tests | >70% en código de negocio |
| Time to detect | Cuánto tarda en detectarse un bug en prod | <15 min con alertas |

---

## Definición de Done — checklist estándar

Antes de considerar un feature listo para producción:

- [ ] Criterios de aceptación verificados por QA
- [ ] Code review aprobado por ≥1 peer
- [ ] Tests escritos y pasando en CI
- [ ] Sin errores en linter / static analysis
- [ ] Feature flag configurado si aplica
- [ ] Documentación de API actualizada
- [ ] Migraciones de DB probadas en staging
- [ ] Monitoring y alertas configuradas
- [ ] Rollback plan definido
