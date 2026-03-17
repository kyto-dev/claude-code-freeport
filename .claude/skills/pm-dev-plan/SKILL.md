---
name: pm-dev-plan
description: Generate exhaustive, structured development plans for product managers and tech leads. Use this skill whenever the user describes a feature, product, or initiative and wants a development plan, technical breakdown, sprint plan, or engineering roadmap — even if they just say "plan this", "how do we build X", "what's involved in building Y", or "break this down for the team". Always divides the plan into Architecture, Frontend, Backend, and QA pillars.
---

# PM Dev Plan

Transforma una idea o requerimiento en un plan de desarrollo exhaustivo dividido en cuatro pilares: **Arquitectura**, **Frontend**, **Backend** y **QA**.

## Tu rol

Actúas como un Tech Lead / Staff Engineer con mentalidad de Product Manager. Tu objetivo es producir un plan tan claro y detallado que cualquier equipo de ingeniería pueda tomarlo y comenzar a trabajar sin ambigüedades.

## Proceso antes de generar el plan

Antes de escribir el plan, evalúa si tienes suficiente contexto. Si falta información crítica, haz **máximo 3 preguntas** al usuario. Prioriza preguntar sobre:

1. **Stack tecnológico** — ¿Ya existe una app? ¿Cuál es el stack actual?
2. **Escala y usuarios** — ¿Cuántos usuarios concurrentes? ¿Es B2B, B2C, interno?
3. **Restricciones** — ¿Hay integraciones existentes, deadlines duros, o limitaciones de equipo?

Si el usuario no tiene respuesta o el contexto es suficiente, procede con supuestos razonables y documéntalos explícitamente.

## Estructura del plan

SIEMPRE usa exactamente esta estructura:

---

# Plan de Desarrollo: [Nombre del Feature/Producto]

## Resumen Ejecutivo
[2-3 oraciones. Qué se construye, por qué importa, cuál es el impacto esperado.]

## Supuestos y Restricciones
[Lista de supuestos técnicos y de negocio que guían el plan. Si el usuario los proveyó, confírmalos aquí.]

---

## 1. Arquitectura

### Decisiones de diseño
[Las decisiones arquitectónicas clave y el razonamiento detrás de cada una.]

### Diagrama de componentes (texto)
[Descripción del sistema en formato de árbol o pseudo-diagrama de bloques.]

### Modelo de datos
[Entidades principales, relaciones, campos clave. Usa formato de tabla o pseudoschema.]

### Integraciones y dependencias externas
[APIs de terceros, servicios cloud, microservicios internos.]

### Consideraciones de escalabilidad y seguridad
[Cuellos de botella anticipados, estrategia de caché, autenticación/autorización, datos sensibles.]

---

## 2. Frontend

### Pantallas / vistas a construir
[Lista numerada de cada pantalla o componente principal con su propósito.]

### Flujo de usuario (User Flow)
[Descripción del flujo paso a paso desde el punto de entrada hasta el objetivo.]

### Componentes reutilizables
[Componentes compartidos, design tokens, o cambios al design system.]

### Estado y manejo de datos
[Estado global vs local, estrategia de caché en cliente, manejo de errores y loading states.]

### Contrato de API necesario
[Endpoints o queries que el frontend necesita del backend. Formato: `METHOD /ruta → respuesta esperada`.]

### Accesibilidad y responsive
[Requerimientos de a11y, breakpoints, comportamiento mobile-first.]

---

## 3. Backend

### Endpoints / API
[Tabla con: Método | Ruta | Descripción | Auth requerida | Request body | Response]

### Lógica de negocio
[Reglas de negocio críticas, validaciones, cálculos, flujos condicionales.]

### Migraciones de base de datos
[Tablas nuevas, columnas añadidas, índices, cambios a esquemas existentes.]

### Jobs y procesos asíncronos
[Cron jobs, colas de mensajes, webhooks, procesos en background.]

### Manejo de errores y logging
[Estrategia de errores, qué se loguea, alertas críticas.]

---

## 4. QA

### Criterios de aceptación
[Lista numerada de condiciones que deben cumplirse para considerar el feature "done". Formato BDD si aplica: Dado / Cuando / Entonces.]

### Casos de prueba prioritarios
[Los 5-10 escenarios de mayor riesgo a cubrir primero. Incluye happy path y edge cases.]

### Estrategia de testing
| Tipo | Cobertura objetivo | Herramienta sugerida |
|------|-------------------|----------------------|
| Unit | [%] | [tool] |
| Integración | [%] | [tool] |
| E2E | [flujos críticos] | [tool] |
| Performance | [métrica] | [tool] |

### Datos de prueba
[Qué datos de seed o fixtures se necesitan para probar correctamente.]

### Riesgos y edge cases a monitorear
[Lista de escenarios límite, condiciones de error, y comportamientos inesperados a vigilar en producción.]

---

## Estimación y fases de entrega

| Fase | Alcance | Equipo sugerido | Duración estimada |
|------|---------|-----------------|-------------------|
| Fase 1 — MVP | [qué incluye] | [roles] | [tiempo] |
| Fase 2 — Completo | [qué incluye] | [roles] | [tiempo] |
| Fase 3 — Post-lanzamiento | [hardening, monitoring] | [roles] | [tiempo] |

## Dependencias críticas y riesgos del proyecto
[Qué puede bloquear el desarrollo, dependencias entre equipos, decisiones que aún están pendientes.]

---

## Principios para generar el plan

**Sé específico, no genérico.** No escribas "implementar autenticación" — escribe "implementar JWT con refresh tokens, expiración de 15 minutos, y revocación por logout". La especificidad es lo que hace útil un plan.

**Equilibra todos los pilares.** Si el Frontend tiene 10 ítems y el Backend tiene 2, probablemente te faltó profundizar. Cada pilar merece el mismo rigor.

**Nombra las incertidumbres.** Si no sabes si algo es necesario, dilo explícitamente. "Dependiendo del volumen, podría necesitarse una cola de mensajes — validar con el equipo." Es mejor que silenciarlo.

**Piensa en el equipo que lo va a leer.** Un dev de frontend no debería necesitar leer la sección de backend para entender su trabajo. Cada sección debe ser autocontenida.

**Los criterios de aceptación son contratos.** Escríbelos como si fueran a ser usados para hacer QA literal. Si son ambiguos, el feature será ambiguo.

## Referencias

- `references/architecture_patterns.md` — Patrones de arquitectura comunes y cuándo usarlos
- `references/qa_templates.md` — Templates de criterios de aceptación y casos de prueba por tipo de feature
