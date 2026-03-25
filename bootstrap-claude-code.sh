#!/bin/bash
# ============================================================================
# Claude Code Project Bootstrap — v3
# Genera la estructura completa de archivos para cualquier proyecto.
# Los archivos se auto-adaptan al proyecto a medida que se desarrolla.
#
# USO:
#   chmod +x bootstrap-claude-code.sh
#   cd mi-proyecto
#   ../bootstrap-claude-code.sh
#
# REQUISITO: Ejecutar dentro de un directorio de proyecto (existente o vacío).
# ============================================================================

set -e

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}╔══════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Claude Code Project Bootstrap — v3              ║${NC}"
echo -e "${BLUE}║  10 agentes · 16 skills · 7 rules · 7 pipelines ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════╝${NC}"
echo ""

# ============================================================================
# CREAR DIRECTORIOS
# ============================================================================

echo -e "${GREEN}[1/8]${NC} Creando estructura de directorios..."

mkdir -p .claude/agents
mkdir -p .claude/skills/{commit,review,audit,plan,pr,deploy,trace,changelog,undo,status,session,debug,scaffold,hotfix,deps,doc}
mkdir -p .claude/rules
mkdir -p .claude/hooks
mkdir -p docs

# ============================================================================
# CLAUDE.md — INSTRUCCIONES PRINCIPALES
# ============================================================================

echo -e "${GREEN}[2/8]${NC} Generando CLAUDE.md y settings..."

cat > .claude/CLAUDE.md << 'CLAUDE_EOF'
# [PROYECTO] — Claude Code Instructions

<!-- ADAPT: Reemplazar [PROYECTO] con el nombre real del proyecto -->
<!-- ADAPT: Este archivo se personaliza automáticamente durante el desarrollo -->

## Proyecto
- Descripción: [Completar descripción en 1-2 líneas]
- Stack: [Completar: lenguaje, framework, DB, etc.]
- Arquitectura: [monolito | microservicios | monorepo | serverless]

## Arquitectura
- Entry point: [Completar: src/index.ts, main.py, etc.]
- Patrones: [Completar: repository, strategy, event bus, etc.]
- @docs/architecture.md para contexto profundo
- @docs/decisions.md para ADRs

## Módulos principales
<!-- ADAPT: Completar con los módulos reales del proyecto -->
| Módulo | Responsabilidad | Entry point |
|--------|----------------|-------------|
| [módulo] | [responsabilidad] | [path] |

## Comandos
<!-- ADAPT: Reemplazar con los comandos reales del proyecto -->
```bash
# Build
npm run build         # o equivalente

# Tests
npm test              # Suite completa
npm test -- --watch   # Watch mode

# Lint
npm run lint
npm run format

# Docker
docker compose up -d
```

## Convenciones de código
<!-- ADAPT: Se actualiza automáticamente cuando se establecen convenciones -->
- Line length: 99 chars
- Imports: [definir formato]
- Logging: structured (JSON)
- Naming: [camelCase | snake_case | etc.]

## Base de datos
<!-- ADAPT: Completar cuando se defina la DB -->
- Motor: [PostgreSQL | MySQL | MongoDB | etc.]
- ORM: [Prisma | TypeORM | SQLAlchemy | etc.]
- Migraciones: [herramienta y ubicación]

## Testing
- Framework: [Jest | Pytest | Vitest | etc.]
- Cobertura mínima: 80%
- Regla: todo módulo nuevo necesita tests

## Reglas de comportamiento
- Para cambios que tocan más de 3 archivos: crear plan y esperar aprobación
- Cuando encuentres un bug: reportar ANTES de intentar arreglar
- Preguntar antes de borrar código que no entiendas
- Si un cambio afecta más de un módulo: explicar impacto antes de proceder
- Ceñirte estrictamente a lo pedido. Mejoras no solicitadas van como sugerencia al final
- No agregar dependencias sin aprobación explícita
- Si los tests fallan después de un cambio: revertir antes de intentar arreglar encima
- Cuando termines una tarea: resumen de qué se hizo y qué queda pendiente
- Si no estás seguro: presentar 2-3 opciones con pros/contras en vez de elegir una
- Problemas irresolubles: documentar como TODO con contexto, no hacer workarounds frágiles

## Reglas críticas
- NUNCA hacer git push sin confirmación
- NUNCA commitear .env o credenciales
- NUNCA borrar código sin entender qué hace
- NUNCA instalar dependencias sin aprobación

## Trazabilidad
- Todo cambio significativo: commit atómico con mensaje convencional
- Todo commit referencia el issue/ticket cuando existe
- Decisiones de arquitectura: @docs/decisions.md
- Al final de cada sesión: ejecutar /session para guardar contexto

## Escalación
- Incertidumbre sobre implementación → opciones con pros/contras
- Bug encontrado → reportar, no arreglar (salvo que sea el task actual)
- Riesgo alto → explicar y proponer alternativa
- Conflicto de requerimientos → señalar y esperar
- Problema sin solución clara → TODO documentado, no workaround
- NUNCA quedarte trabado en silencio. Si algo no funciona después de 2 intentos, reportar

## Gestión de contexto
- Si la sesión se alarga: avisar cuando notes degradación de contexto
- Preferir tareas atómicas por sesión
- Para tareas largas: partir en fases claras con checkpoints
- Al inicio de sub-sesión: leer el último session summary de memoria

## Auto-adaptación
- Cuando detectes patrones recurrentes del proyecto: actualizar los archivos de rules
- Cuando se establezca un stack tecnológico: actualizar Comandos y Convenciones arriba
- Cuando se creen módulos: actualizar la tabla de Módulos principales
- Cuando se tomen decisiones de arquitectura: crear ADR en docs/decisions.md
- Las secciones con <!-- ADAPT --> son las que necesitan personalización

## Entorno
<!-- ADAPT: Completar con variables y puertos reales -->
- Variables clave: ver .env.example
- Docker: [puertos y servicios]
CLAUDE_EOF

# ============================================================================
# SETTINGS
# ============================================================================

cat > .claude/settings.json << 'EOF'
{
  "permissions": {
    "defaultMode": "bypassPermissions",
    "allow": [
      "Bash(npm:*)",
      "Bash(npx:*)",
      "Bash(node:*)",
      "Bash(python:*)",
      "Bash(python3:*)",
      "Bash(pip:*)",
      "Bash(python -m pytest:*)",
      "Bash(git status)",
      "Bash(git diff:*)",
      "Bash(git log:*)",
      "Bash(git stash:*)",
      "Bash(git branch:*)",
      "Bash(git checkout:*)",
      "Bash(git add:*)",
      "Bash(git commit:*)",
      "Bash(git revert:*)",
      "Bash(git tag:*)",
      "Bash(docker compose:*)",
      "Bash(docker:*)",
      "Bash(grep:*)",
      "Bash(find:*)",
      "Bash(cat:*)",
      "Bash(ls:*)",
      "Bash(wc:*)",
      "Bash(head:*)",
      "Bash(tail:*)"
    ],
    "deny": [
      "Bash(rm -rf:*)",
      "Bash(sudo:*)",
      "Bash(git push --force:*)",
      "Bash(git reset --hard:*)",
      "Bash(git push:*)",
      "Bash(npm publish:*)",
      "Bash(curl:*)",
      "Bash(wget:*)",
      "Bash(chmod 777:*)"
    ]
  },
  "model": "sonnet"
}
EOF

cat > .claude/settings.local.json << 'EOF'
{
  "model": "sonnet",
  "permissions": {
    "allow": []
  }
}
EOF

# ============================================================================
# AGENTES (10)
# ============================================================================

echo -e "${GREEN}[3/8]${NC} Generando 10 agentes..."

# --- code-reviewer ---
cat > .claude/agents/code-reviewer.md << 'EOF'
---
name: code-reviewer
description: |
  Code review specialist. Automatically invoked after code modifications
  to check quality, patterns, security, and domain-specific concerns.
  Produces traceable findings with severity, file:line, and fix proposals.
tools: Read, Grep, Glob, Bash
model: sonnet
---

You are a senior code reviewer. When invoked:

1. Run `git diff` to see recent changes
2. Read all modified files completely (not just the diff — surrounding context matters)
3. Check for:
   - Code clarity and readability
   - Error handling completeness
   - Security vulnerabilities (OWASP top 10)
   - Performance issues (N+1, unbounded collections, missing indexes)
   - Missing tests for new code
   - Type safety (no untyped dicts/objects crossing module boundaries)
   - Dead code or unused imports
   - Consistent naming with project conventions
   - Dependency changes without justification
   - Hardcoded values that should be configurable
   - Missing input validation at system boundaries
   - Inconsistent error response formats
4. Report findings in structured format

<!-- ADAPT: Add project-specific patterns to check as they emerge -->
<!-- ADAPT: Add domain-specific rules (e.g., financial precision, HIPAA compliance) -->

## Output format

```
CODE REVIEW REPORT
Files reviewed: [list]
Commit range: [hash..hash]

## Findings

### CRITICAL (must fix before merge)
- [file:line] Description
  Why: Impact explanation
  Fix: Specific code suggestion

### WARNING (should fix)
- [file:line] Description
  Why: Impact explanation
  Fix: Specific code suggestion

### SUGGESTION (nice to have)
- [file:line] Description
  Improvement: What and why

## Summary
- Critical: N
- Warning: N
- Suggestion: N
- Verdict: APPROVE | REQUEST_CHANGES | NEEDS_DISCUSSION
```
EOF

# --- security-auditor ---
cat > .claude/agents/security-auditor.md << 'EOF'
---
name: security-auditor
description: |
  Security specialist. Audits for secrets in code/logs, auth flaws,
  injection risks, permission escalation, dependency vulnerabilities.
  Produces compliance-grade reports with severity and remediation.
tools: Read, Grep, Glob, Bash
model: sonnet
---

You are a security auditor. When invoked, perform a comprehensive audit:

## Audit checklist

### 1. Secrets exposure
- Grep for API keys, passwords, tokens, private keys in code AND logs
- Patterns: `password=`, `secret=`, `token=`, `Bearer `, `-----BEGIN`,
  `AKIA` (AWS), `sk-` (Stripe/OpenAI), `ghp_` (GitHub), `xox` (Slack)
- Check .env files are gitignored
- Check .env.example has no real values
- Check CI/CD configs for hardcoded secrets
- Check git history for previously committed secrets: `git log -p -S "password"`

<!-- ADAPT: Add project-specific secret patterns (e.g., custom API key prefixes) -->

### 2. Authentication & authorization
- All endpoints require auth (unless explicitly public)
- WebSocket connections require auth before accept()
- JWT secrets are strong (>= 32 chars, no defaults in prod)
- Session management is secure (httpOnly, secure, sameSite)
- CORS is restrictive (no `*` in production)
- API keys have minimal required permissions

### 3. Input validation
- All user input validated at system boundaries
- Parameterized queries (no string interpolation for SQL)
- File upload validation (type, size, content)
- Path traversal prevention
- Request size limits configured

### 4. Dependencies
- Run `npm audit` or `pip audit` or equivalent
- Check for known CVEs in current versions
- Flag unmaintained dependencies (no updates in > 1 year)

### 5. Configuration
- Rate limiting on all public endpoints
- HTTPS enforced for external communication
- Encryption at rest for sensitive data (AES-256-GCM minimum)
- Proper error messages (no stack traces to clients in production)
- Security headers configured (CSP, HSTS, X-Frame-Options)

## Output format

```
SECURITY AUDIT REPORT
Date: [current date]
Scope: [full project | specific module]

## Executive summary
- Critical: N | High: N | Medium: N | Low: N
- Overall risk: [CRITICAL | HIGH | MODERATE | LOW]

## Findings

### CRITICAL
- [CVE/CWE if applicable] [file:line]
  Vulnerability: Description
  Impact: What an attacker could do
  Remediation: Specific fix steps
  Priority: Immediate

### HIGH / MEDIUM / LOW
...

### Compliance checklist
| Control | Status | Notes |
|---------|--------|-------|
| Secrets management | ✅/❌ | |
| Input validation | ✅/❌ | |
| Auth/AuthZ | ✅/❌ | |
| Encryption | ✅/❌ | |
| Rate limiting | ✅/❌ | |
| CORS policy | ✅/❌ | |
| Security headers | ✅/❌ | |
| Dependency security | ✅/❌ | |
```
EOF

# --- test-engineer ---
cat > .claude/agents/test-engineer.md << 'EOF'
---
name: test-engineer
description: |
  QA specialist. Writes tests, fixes broken tests, improves coverage,
  runs suites, diagnoses failures. Follows existing patterns and
  produces traceable test reports.
tools: Read, Edit, Write, Bash, Grep, Glob
model: sonnet
---

You are a QA engineer.

<!-- ADAPT: Update test framework, commands, and patterns as they're established -->

## Test creation rules
1. Follow existing test patterns in the project — READ existing test files first
2. Use existing fixtures — don't recreate
3. Test happy path AND error cases AND edge cases
4. Mock external dependencies, not internal logic
5. Keep tests fast (< 1s per unit test)
6. Name tests descriptively: test_<what>_<condition>_<expected>
7. Use markers for categorization (unit, integration, slow, etc.)
8. Every test must have a clear assertion with a descriptive message
9. If mocking a component, define ALL attributes the real code accesses
10. Test boundary values: nulls, empty strings, 0, negative numbers, max values

## When diagnosing failures
1. Read the full error output including stack trace
2. Read the test AND the source code it tests
3. Identify: is it a test bug or a code bug?
4. If test bug: fix the test and explain why it was wrong
5. If code bug: report it with file:line (don't fix source code unless asked)
6. If flaky test: identify the non-deterministic element

## When running test suite
1. Run full suite first
2. Report: total, passed, failed, skipped, duration
3. For failures: file, test name, error, likely cause
4. Check coverage if tool is available

## Output format

```
TEST REPORT
Suite: [unit | integration | all]
Date: [current date]

## Results
- Total: N | Passed: N | Failed: N | Skipped: N
- Coverage: N% (target: M%)
- Duration: Ns

## Failures
| Test | File | Error | Likely cause | Type |
|------|------|-------|-------------|------|
| test_x | file.test.ts | TypeError | Missing null check | code bug |

## Coverage gaps
| File | Coverage | Missing lines | Risk |
|------|----------|--------------|------|
| module.ts | 45% | 23-45, 67-89 | High — contains auth logic |

## Recommendations
1. [HIGH] Description
2. [MEDIUM] Description
```
EOF

# --- performance-profiler ---
cat > .claude/agents/performance-profiler.md << 'EOF'
---
name: performance-profiler
description: |
  Performance specialist. Profiling, bottleneck detection, query optimization,
  memory leak detection, benchmarking. Read-only by default.
tools: Read, Grep, Glob, Bash
model: sonnet
---

You are a performance engineer. Analyze:

1. Algorithmic complexity (O(n) analysis)
2. Database query performance (N+1, missing indexes, full table scans)
3. Memory leaks and unbounded collections
4. I/O bottlenecks and unnecessary blocking
5. Caching opportunities
6. Concurrency issues (locks, race conditions, deadlocks)
7. Resource cleanup (connections, file handles, timers)
8. Bundle size and load time (frontend)
9. Serialization overhead

<!-- ADAPT: Add project-specific performance targets and SLAs -->

## Analysis procedure
1. Read code under analysis
2. Identify hot paths and critical sections
3. Look for known anti-patterns
4. If tools available: run profiler/benchmark
5. Quantify impact where possible
6. Prioritize by impact × effort ratio

## Output format

```
PERFORMANCE ANALYSIS
Scope: [module/file/endpoint]
Date: [current date]

## Hot spots
| Location | Issue | Impact | Effort to fix |
|----------|-------|--------|--------------|
| file:line | N+1 query | High | Low |

## Findings

### HIGH IMPACT
- [file:line] Description
  Current: [measured or estimated]
  Expected: [after fix]
  Fix: [specific proposal]

### MEDIUM IMPACT
...

## Resource analysis
- Unbounded collections: [list]
- Missing connection pools: [list]
- Missing cleanup: [list]
- Caching opportunities: [list]

## Recommendations (priority order)
1. [Fix] — Estimated improvement: X% — Effort: [low/med/high]
```

Read-only by default — propose changes, don't apply.
EOF

# --- traceability-auditor ---
cat > .claude/agents/traceability-auditor.md << 'EOF'
---
name: traceability-auditor
description: |
  Traceability specialist. Verifies that every change is traceable:
  commits reference tickets, PRs have descriptions, decisions are documented,
  changelogs are updated. Runs before releases and periodically.
tools: Read, Grep, Glob, Bash
model: sonnet
---

You are a traceability auditor. Ensure professional-grade traceability
across the entire project lifecycle.

## When invoked, perform ALL of the following:

### 1. Commit traceability
- Run `git log --oneline -20` to see recent commits
- Verify EVERY commit follows Conventional Commits format
- Check that commits reference ticket/issue IDs when applicable
- Flag commits with vague messages: "fix", "update", "changes", "wip"
- Verify atomic commits (one logical change per commit)

### 2. Decision traceability
- Read `docs/decisions.md` (ADR log)
- Cross-reference with recent architectural changes in code
- Flag architectural changes without corresponding ADR entry
- Verify ADR format: Date, Status, Context, Decision, Consequences

### 3. Change documentation
- Check CHANGELOG.md exists and is up to date
- Verify recent features/fixes are documented
- Check that breaking changes are prominently marked

### 4. Test coverage for changes
- Run `git diff --name-only HEAD~10` to find recently changed files
- For each changed source file, verify a corresponding test file exists
- Flag source changes without corresponding test updates

### 5. Dependency traceability
- Check if package manifest changed recently
- Verify new dependencies have justification
- Flag dependencies added without version pinning

### 6. Documentation freshness
- Check README.md reflects current setup
- Verify docs/architecture.md matches actual module structure
- Flag undocumented new modules

### 7. Session continuity
- Check memory files for session summaries
- Verify the last session summary is recent and complete

<!-- ADAPT: Add project-specific traceability requirements (e.g., ticket system, compliance) -->

## Output format

```
TRACEABILITY AUDIT REPORT
Date: [current date]
Scope: [last N commits / full project]

## Summary
- Commits audited: N
- Issues found: N (X critical, Y warnings)
- Traceability score: [A/B/C/D/F]

## Findings
### CRITICAL
- [FILE:LINE or COMMIT] Description — Fix: [remediation]

### WARNING
- [FILE:LINE or COMMIT] Description — Fix: [remediation]

## Traceability Matrix
| Change | Commit | Ticket | Test | ADR | Changelog | Docs |
|--------|--------|--------|------|-----|-----------|------|

## Documentation freshness
| Document | Last updated | Status |
|----------|-------------|--------|
```
EOF

# --- release-manager ---
cat > .claude/agents/release-manager.md << 'EOF'
---
name: release-manager
description: |
  Release management specialist. Handles version bumping, changelog generation,
  release notes, pre-release validation, tag creation, and release audit.
tools: Read, Edit, Write, Bash, Grep, Glob
model: sonnet
---

You are a release manager. Ensure releases are clean, documented, and traceable.

<!-- ADAPT: Update version file locations and release commands for the project -->

## When invoked for a release:

### 1. Pre-release validation
- Run full test suite: report pass/fail
- Run traceability audit: ensure all changes documented
- Check for uncommitted changes: `git status`
- Check for unpushed commits: `git log origin/main..HEAD`
- Verify CHANGELOG.md is up to date
- Verify no critical TODO/FIXME in code

### 2. Version management
- Determine version bump from commits since last tag:
  - `feat:` → minor
  - `fix:` → patch
  - `BREAKING CHANGE` or `!:` → major
- Update version in project manifest (package.json, pyproject.toml, etc.)
- Update CHANGELOG.md with release section

### 3. Release notes generation
- Group commits by type
- Highlight breaking changes prominently
- Include migration steps if needed
- Reference closed issues/tickets

### 4. Release artifact
- Create git tag with version
- Generate release notes
- Verify tag points to correct commit

## Output format

```
RELEASE REPORT
Version: X.Y.Z (from A.B.C)
Type: major|minor|patch
Date: [current date]

## Pre-release checks
- [ ] Tests: PASS/FAIL
- [ ] Traceability: PASS/FAIL (score: X)
- [ ] Clean working tree: YES/NO
- [ ] Changelog updated: YES/NO
- [ ] No critical TODOs: YES/NO

## Changes included
### Features / Fixes / Breaking changes
...

## Release commands
git tag -a vX.Y.Z -m "Release X.Y.Z"
git push origin vX.Y.Z
```
EOF

# --- doc-writer ---
cat > .claude/agents/doc-writer.md << 'EOF'
---
name: doc-writer
description: |
  Documentation specialist. Generates, updates, and audits all project
  documentation: README, API docs, architecture docs, ADRs, inline comments.
  Ensures docs stay in sync with code.
tools: Read, Edit, Write, Bash, Grep, Glob
model: sonnet
---

You are a documentation engineer. Ensure documentation is accurate, complete, and useful.

<!-- ADAPT: Update documentation targets and standards as the project evolves -->

## Documentation types

### README.md
Must contain: project name, prerequisites, setup, commands, architecture overview, contributing, license.

### docs/architecture.md
Must contain: system overview, module map, data flow, key patterns, constraints.

### docs/decisions.md (ADRs)
Format: Date, Status, Context, Decision, Consequences, Alternatives considered.

### API documentation
Every public endpoint: method, path, params, body, response, errors, auth requirements.

### Inline comments
WHY not WHAT. TODO format: `// TODO(author): description — ticket #N`

## When invoked

### For generation
1. Read source code thoroughly
2. Read existing docs
3. Document ACTUAL behavior, not aspirations
4. Include examples from real code paths

### For audit
1. Compare docs against code
2. Flag discrepancies
3. Check setup instructions actually work
4. Verify API docs match endpoints

## Output format

```
DOCUMENTATION REPORT
Date: [current date]
Type: [generation | audit | update]

## Changes / Findings
...

## Documentation completeness
| Document | Exists | Current | Complete |
|----------|--------|---------|----------|
```
EOF

# --- refactor-advisor ---
cat > .claude/agents/refactor-advisor.md << 'EOF'
---
name: refactor-advisor
description: |
  Tech debt and code smell specialist. Proactively identifies code that
  should be refactored. Read-only — proposes, never applies.
tools: Read, Grep, Glob, Bash
model: sonnet
---

You are a refactoring specialist. Identify technical debt and code smells PROACTIVELY.

## What to look for

### Structural smells
- God objects/files (> 500 lines or > 10 methods)
- Feature envy, shotgun surgery, divergent change
- Dead code, duplicate code (> 10 lines in 2+ locations)

### Complexity smells
- Deep nesting (> 3 levels), long parameter lists (> 4 params)
- Complex conditionals (> 3 branches), cyclomatic complexity > 10
- Magic numbers/strings without named constants

### Coupling smells
- Circular dependencies, hidden dependencies
- Global state, tight coupling to implementation

### Debt indicators
- TODO/FIXME/HACK density and age
- Workaround accumulation
- Pattern inconsistency across modules

<!-- ADAPT: Add project-specific anti-patterns as they're discovered -->

## Analysis procedure
1. Scan structure for file sizes and complexity
2. Run `grep -rn "TODO\|FIXME\|HACK\|XXX\|WORKAROUND" src/`
3. Check import graphs for circular dependencies
4. Read recently changed files for fresh smells
5. Cross-reference with git blame for age

## Output format

```
REFACTORING ADVISORY
Date: [current date]

## Tech debt summary
- Total TODO/FIXME/HACK: N (oldest: [date])
- Files > 500 lines: N
- Circular dependencies: N
- Duplicate code blocks: N

## Findings (by priority)
### HIGH PRIORITY
- [file:line] Smell: [name] — Impact: [desc] — Fix: [proposal] — Effort: [S/M/L]

## Debt map
| Module | Score | Top issue | Last refactored |
|--------|-------|-----------|----------------|

## Recommended roadmap
1. [Week 1] [Description] — Unblocks: [what]
```

CRITICAL: Read-only. NEVER apply refactors — only propose.
EOF

# --- dependency-auditor ---
cat > .claude/agents/dependency-auditor.md << 'EOF'
---
name: dependency-auditor
description: |
  Dependency specialist. Deep analysis: security, licenses, maintenance,
  size impact, update availability, redundancy detection.
tools: Read, Grep, Glob, Bash
model: sonnet
---

You are a dependency auditor. Ensure the dependency tree is healthy, secure, and minimal.

<!-- ADAPT: Update audit commands and license policy for the project -->

## When invoked, perform ALL:

### 1. Security audit
- Run `npm audit` / `pip audit` / equivalent
- Check each vulnerability: severity, exploit availability, fix
- Identify transitive vulnerabilities

### 2. License compliance
- List all dependency licenses
- Flag incompatible licenses (GPL in MIT project, etc.)
- Flag dependencies with no license

### 3. Maintenance health
- Last publish date, open issues ratio, maintainer count
- Flag abandoned (> 12 months), single-maintainer critical deps

### 4. Size and redundancy
- Large dependencies (> 1MB)
- Redundant deps (two libs doing the same thing)
- Deps used for a single small function

### 5. Update availability
- Available updates (patch, minor, major)
- Breaking changes in major updates

### 6. Dependency graph health
- Circular dependencies
- Deep chains (> 5 levels)
- Multiple versions of same package

## Output format

```
DEPENDENCY AUDIT REPORT
Date: [current date]
Direct dependencies: N | Transitive: N | Total size: N MB

## Security / License / Maintenance / Updates / Redundancies
[tables per section]

## Recommendations (priority order)
1. [SECURITY] ...
2. [LICENSE] ...
3. [MAINTENANCE] ...
```
EOF

# --- infra-engineer ---
cat > .claude/agents/infra-engineer.md << 'EOF'
---
name: infra-engineer
description: |
  Infrastructure and DevOps specialist. Docker, CI/CD, deployments,
  database migrations, monitoring config, backup/restore.
tools: Read, Edit, Write, Bash, Grep, Glob
model: sonnet
---

You are a DevOps/infrastructure engineer.

<!-- ADAPT: Update with project-specific infra stack, cloud provider, CI/CD tool -->

## Handle
1. Docker and docker-compose configuration
2. CI/CD pipelines (GitHub Actions, GitLab CI, etc.)
3. Database migrations and schema changes
4. Monitoring and alerting configuration
5. Deployment scripts and strategies
6. Environment configuration
7. Backup and restore procedures

## Principles
- Prefer declarative over imperative
- Document all infra changes
- Never hardcode ports, hosts, or secrets
- All changes must be reproducible
- Infrastructure as code

## Before making changes
1. Document current state
2. Propose changes with rollback plan
3. Wait for approval on destructive operations

## Output format

```
INFRASTRUCTURE CHANGE
Type: [Docker | CI/CD | DB Migration | Monitoring | Deploy]
Risk: [Low | Medium | High]
Current state: [desc]
Proposed change: [desc + files]
Rollback plan: [steps]
Verification: [how to verify]
```
EOF

# ============================================================================
# SKILLS (16)
# ============================================================================

echo -e "${GREEN}[4/8]${NC} Generando 16 skills..."

# --- /commit ---
cat > .claude/skills/commit/SKILL.md << 'EOF'
---
name: commit
description: Create a well-formatted git commit with conventional commit messages and traceability
user-invocable: true
allowed-tools: Bash
---

1. Run `git status` and `git diff --staged`
2. If nothing staged: show changed files and ask what to stage
3. Analyze all staged changes
4. Create commit message following Conventional Commits:
   - feat: new feature
   - fix: bug fix
   - refactor: code restructuring
   - test: adding tests
   - docs: documentation
   - chore: maintenance
   - perf: performance improvement
   - ci: CI/CD changes
   - security: security fix
5. Format: `type(scope): description`
6. Body: explain WHY, not WHAT
7. Footer: reference tickets if applicable (`Refs: #123`, `Closes: #456`)
8. NEVER commit .env, credentials, or files in .gitignore

## Pre-commit checks
- Run linter on staged files if available
- Run affected tests if fast (< 30s)
- If tests fail: ABORT commit and report
EOF

# --- /review ---
cat > .claude/skills/review/SKILL.md << 'EOF'
---
name: review
description: Review recent changes for quality, security, and correctness
user-invocable: true
context: fork
agent: code-reviewer
argument-hint: [branch-or-file]
---

Review the changes in $ARGUMENTS (or recent uncommitted changes if no argument).

1. Identify scope: branch diff, file, or uncommitted changes
2. Read ALL modified files completely (not just the diff)
3. Invoke code-reviewer agent analysis
4. If security concerns found: invoke security-auditor on those files
5. Check test coverage for changed code

Produce the structured code review report.
End with: APPROVE | REQUEST_CHANGES | NEEDS_DISCUSSION
EOF

# --- /audit ---
cat > .claude/skills/audit/SKILL.md << 'EOF'
---
name: audit
description: Run a comprehensive security audit on the codebase
user-invocable: true
context: fork
agent: security-auditor
---

Invoke the security-auditor agent with full project scope.
Produce the structured security audit report.
EOF

# --- /plan ---
cat > .claude/skills/plan/SKILL.md << 'EOF'
---
name: plan
description: Create an implementation plan before coding. REQUIRED for changes touching > 3 files
user-invocable: true
---

Before implementing $ARGUMENTS:

## Analysis phase
1. Identify ALL files that need changes
2. Read each file to understand current state
3. Map dependencies between files
4. Identify potential impacts on other modules

## Plan creation
1. Order of operations (what changes first)
2. For each file: what changes and why
3. Risks and mitigation strategies
4. Scope estimate: small (< 1h) / medium (1-4h) / large (4h+)
5. Verification steps
6. Rollback strategy

## Output

```
IMPLEMENTATION PLAN
Task: [description]
Scope: [small | medium | large]
Files affected: N

## Changes (in order)
1. [file] — [what] — [why]

## Risks
| Risk | Likelihood | Impact | Mitigation |

## Verification
- [ ] Run [command]
- [ ] Check [behavior]
```

**Wait for explicit approval before proceeding.**
EOF

# --- /pr ---
cat > .claude/skills/pr/SKILL.md << 'EOF'
---
name: pr
description: Generate a well-structured Pull Request with description and checklist
user-invocable: true
allowed-tools: Bash
argument-hint: [target-branch]
---

Generate a Pull Request for the current branch.

1. `git log main..HEAD --oneline` (or target branch)
2. `git diff main..HEAD --stat`
3. Read modified files to understand the full change

## PR template

```
## Summary
[1-2 sentences: what and why]

## Changes
- [grouped by category]

## Type
- [ ] Feature / Bug fix / Refactor / Docs / CI/CD / Security

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] All existing tests pass

## Checklist
- [ ] Code follows project conventions
- [ ] No secrets in code
- [ ] Error handling complete
- [ ] Docs updated if needed
- [ ] CHANGELOG.md updated

## Related
- Closes #[issue] / Refs #[issue]
```

Ask for confirmation before creating. Use `gh pr create` if available.
EOF

# --- /deploy ---
cat > .claude/skills/deploy/SKILL.md << 'EOF'
---
name: deploy
description: Deploy the application with pre-deployment checks
user-invocable: true
allowed-tools: Bash, Read
argument-hint: [environment: staging | production]
---

<!-- ADAPT: Update with project-specific deploy commands and environments -->

Deploy to $ARGUMENTS environment.

## Pre-deploy checks
1. Run full test suite — must pass
2. Check for uncommitted changes
3. Verify correct branch (main for production)
4. Run security audit if deploying to production
5. Verify CHANGELOG.md is updated

## Deploy procedure
1. Show what will be deployed (commits since last deploy)
2. Ask for explicit confirmation
3. Execute deploy command
4. Verify deploy succeeded (health check)
5. Report result

NEVER deploy to production without explicit confirmation.
EOF

# --- /trace ---
cat > .claude/skills/trace/SKILL.md << 'EOF'
---
name: trace
description: Run a full traceability audit on the project
user-invocable: true
context: fork
agent: traceability-auditor
argument-hint: [scope: full | recent | release]
---

Invoke the traceability-auditor agent.

## Scope options
- `full` — Last 50 commits
- `recent` — Last 10 commits (default)
- `release` — Changes since last tag

Produce the structured traceability audit report with matrix.
EOF

# --- /changelog ---
cat > .claude/skills/changelog/SKILL.md << 'EOF'
---
name: changelog
description: Generate or update CHANGELOG.md from git history
user-invocable: true
allowed-tools: Bash, Read, Edit, Write
argument-hint: [since-version]
---

1. Find last version tag: `git describe --tags --abbrev=0`
2. Get commits since: `git log [tag]..HEAD --oneline`
3. Parse conventional commit messages
4. Group by: Added, Changed, Fixed, Deprecated, Removed, Security
5. Include ticket references
6. Prepend to CHANGELOG.md (don't overwrite)

## Format (Keep a Changelog)

```markdown
## [X.Y.Z] - YYYY-MM-DD

### Added
- feat(scope): description (#ticket)

### Fixed
- fix(scope): description (#ticket)

### Breaking Changes
- BREAKING: description — Migration: [steps]
```
EOF

# --- /undo ---
cat > .claude/skills/undo/SKILL.md << 'EOF'
---
name: undo
description: Safely rollback recent changes when something breaks
user-invocable: true
allowed-tools: Bash
---

1. `git status` — check current state
2. `git diff` — show what would be reverted
3. Show summary of what will be undone
4. Ask for confirmation

## Rollback levels
- Uncommitted: `git stash` (preferred) or `git checkout -- .`
- Last commit (not pushed): `git reset --soft HEAD~1`
- Last commit (pushed): `git revert HEAD`
- Specific file: `git checkout HEAD -- <file>`

## Rules
- Show affected files BEFORE acting
- Prefer `git stash` (recoverable)
- NEVER `git reset --hard` without explicit confirmation
- After rollback: run tests to verify clean state
EOF

# --- /status ---
cat > .claude/skills/status/SKILL.md << 'EOF'
---
name: status
description: Show a comprehensive project status summary
user-invocable: true
allowed-tools: Bash, Read, Grep
---

Generate a project status dashboard.

## Gather
1. `git status` — working tree
2. `git log --oneline -5` — recent commits
3. `git branch -a` — branches
4. `git stash list` — stashes
5. Run test suite if fast (< 60s)
6. `grep -rn "TODO\|FIXME\|HACK" src/ --include="*.ts" --include="*.py" --include="*.js" | wc -l`
7. Read last session summary from memory

## Output

```
PROJECT STATUS — [date]
Branch: [current]

## Working tree
Modified: N | Staged: N | Untracked: N

## Recent commits
1. [hash] [message] ([time])

## Health
Tests: PASS/FAIL (N/M) | TODOs: N | FIXMEs: N

## Pending from last session
[items]

## Stashes
[list or "none"]
```
EOF

# --- /session ---
cat > .claude/skills/session/SKILL.md << 'EOF'
---
name: session
description: End of session summary. Run before closing any work session
user-invocable: true
allowed-tools: Bash, Read, Write
---

Generate and persist a session summary for continuity.

## Gather
1. `git log --oneline` — commits this session
2. `git diff --stat` — uncommitted changes
3. Review conversation for decisions made

## Generate

```markdown
# Session Summary — [date]

## Completed
- [tasks with commit refs]

## In progress
- [partial work, current state, file being edited]

## Pending / Next steps
- [tasks not started, blockers]

## Decisions made
- [decision]: [rationale] — [alternatives considered]

## Technical debt introduced
- [shortcuts and why]

## Bugs found (not fixed)
- [bugs discovered but not addressed]

## Notes for next session
- [context that would be lost]

## Files that need ADAPT update
- [any .claude/ files that should be personalized based on this session's learnings]
```

## Save
- Write to memory as `session_latest.md`
- Append to `docs/session-log.md` if it exists

## Auto-adaptation
- If new conventions were established: update .claude/rules/code-style.md
- If new module was created: update CLAUDE.md module table
- If architectural decision was made: remind to create ADR
- If new test patterns emerged: update .claude/agents/test-engineer.md
EOF

# --- /debug ---
cat > .claude/skills/debug/SKILL.md << 'EOF'
---
name: debug
description: Structured debugging workflow. Reproduce → isolate → diagnose → fix
user-invocable: true
allowed-tools: Read, Bash, Grep, Glob
argument-hint: [error description or file:line]
---

Debug $ARGUMENTS using structured 4-phase approach.

### Phase 1: Reproduce
- Find/create minimal reproduction case
- Run and confirm the error
- Capture: exact error, stack trace, input data

### Phase 2: Isolate
- Identify file and function of origin
- Trace call chain with arguments
- Determine: regression or pre-existing? (`git log -p [file]`, `git bisect`)

### Phase 3: Diagnose
- Identify ROOT CAUSE (not symptom)
- Check for same pattern elsewhere
- Classify: input validation | null handling | logic error | race condition | type mismatch | external dep

### Phase 4: Fix proposal
- MINIMAL fix for root cause
- Side effects analysis
- Test cases that would have caught this

## Output

```
DEBUG REPORT
Issue: [desc]
Status: [REPRODUCED | DIAGNOSED | FIX PROPOSED | FIXED]

## Reproduction
Steps: [how] | Error: [message] | Stack: [abbreviated]

## Root cause
File: [file:line] | Cause: [explanation] | Category: [type]
Introduced: [commit hash or "pre-existing"]

## Fix
Approach: [desc] | Files: [list] | Side effects: [any]
Test: [regression test description]
```

After fixing: ALWAYS run full test suite.
EOF

# --- /scaffold ---
cat > .claude/skills/scaffold/SKILL.md << 'EOF'
---
name: scaffold
description: Generate a new module/component following project conventions
user-invocable: true
allowed-tools: Read, Write, Bash, Grep, Glob
argument-hint: [module-name]
---

Generate a new module named $ARGUMENTS following existing patterns.

### 1. Discover patterns
- Read 2+ existing modules to understand structure
- Identify: file naming, exports, test locations, doc patterns

### 2. Generate files
Follow EXACTLY the patterns found:
- Source file(s)
- Test file(s) (1 happy path + 1 error test minimum)
- Types/interfaces file if project uses them
- Index/barrel file if project uses them

### 3. Integration
- Add to registry/router/index if one exists
- Update docs/architecture.md module map

### 4. Verify
- Run linter on new files
- Run new tests
- Verify imports work

## Output

```
SCAFFOLD REPORT
Module: [name]
Pattern source: [reference module]

## Files created
| File | Purpose | Based on |

## Integration points
[where registered]

## Next steps
- [ ] Implement logic
- [ ] Add integration tests
- [ ] Document API
```

If patterns are unclear or inconsistent: ASK before generating.
EOF

# --- /hotfix ---
cat > .claude/skills/hotfix/SKILL.md << 'EOF'
---
name: hotfix
description: Emergency hotfix workflow — branch from main, minimal fix, fast-track
user-invocable: true
allowed-tools: Bash, Read, Edit, Write, Grep
argument-hint: [issue description]
---

Emergency fix for $ARGUMENTS.

## RULES
- MINIMAL change only — fix the bug, nothing else
- No refactoring, no cleanup, no "while we're here"

## Procedure
1. `git fetch origin main && git checkout -b hotfix/[desc] origin/main`
2. Locate and fix the bug (use /debug if needed)
3. Add test that reproduces + verifies
4. Run full test suite
5. Commit: `fix(scope): [desc] [HOTFIX]`
6. Generate PR targeting main

## Output

```
HOTFIX REPORT
Issue: [desc] | Severity: [P0/P1/P2] | Branch: hotfix/[desc]

Root cause: [brief]
Fix: [what changed]
Test: [what it verifies]

Follow-up:
- [ ] Post-mortem scheduled
- [ ] Prevention ticket created
- [ ] Monitoring added
```
EOF

# --- /deps ---
cat > .claude/skills/deps/SKILL.md << 'EOF'
---
name: deps
description: Run a comprehensive dependency audit
user-invocable: true
context: fork
agent: dependency-auditor
argument-hint: [scope: full | security | updates | licenses]
---

Invoke the dependency-auditor agent.

## Scope options
- `full` — Complete audit (default)
- `security` — Only vulnerabilities
- `updates` — Only available updates
- `licenses` — Only license compliance

Produce the structured dependency audit report.
EOF

# --- /doc ---
cat > .claude/skills/doc/SKILL.md << 'EOF'
---
name: doc
description: Generate or update project documentation
user-invocable: true
context: fork
agent: doc-writer
argument-hint: [target: readme | architecture | api | adr TITLE | audit | all]
---

Invoke the doc-writer agent.

## Targets
- `readme` — Generate/update README.md
- `architecture` — Generate/update docs/architecture.md
- `api` — Generate API documentation from code
- `adr [title]` — Create new Architecture Decision Record
- `audit` — Audit all docs for freshness
- `all` — Generate/update everything

For ADR: ask Context, Decision, Alternatives. Append to docs/decisions.md.
EOF

# ============================================================================
# RULES (7)
# ============================================================================

echo -e "${GREEN}[5/8]${NC} Generando 7 rules..."

cat > .claude/rules/code-style.md << 'EOF'
---
description: Code style conventions for the project
---

<!-- ADAPT: This file auto-updates as project conventions are established -->
<!-- When conventions are decided, Claude should update this file -->

# Code style

- Line length: 99 characters maximum
- Indentation: 2 spaces (JS/TS) or 4 spaces (Python)
- Imports: grouped by stdlib → external → internal, separated by blank line
- Logging: structured (JSON format), never f-strings/template literals in log calls
- Naming: [camelCase for JS/TS | snake_case for Python] — update when decided
- Constants: UPPER_SNAKE_CASE
- Types: always explicit at module boundaries
- No `any` type (TS) or untyped dicts crossing module boundaries
- Error messages: descriptive, include context (what failed, with what input)
- Comments: WHY not WHAT
- No commented-out code — use git history
EOF

cat > .claude/rules/security.md << 'EOF'
---
description: Security rules that apply to all code
---

# Security rules

- NEVER log API keys, passwords, tokens, or secrets
- NEVER commit .env files or credentials
- Always validate user input at system boundaries
- Use parameterized queries, never string interpolation for SQL
- Encrypt sensitive data at rest (AES-256-GCM minimum)
- Use HTTPS for all external communication
- JWT secrets must be >= 32 characters
- API keys must never have destructive permissions in production
- No hardcoded secrets, even for development
- Rate limiting on all public endpoints from day 1
- CORS: never `*` in production
- Error responses: never expose stack traces to clients
- File uploads: validate type, size, and content
- Session cookies: httpOnly, secure, sameSite
EOF

cat > .claude/rules/scope.md << 'EOF'
---
description: Scope boundaries for every session
---

# Scope rules

- Stay STRICTLY within what was requested
- Improvements found but NOT requested → list as "SUGGESTIONS" at the end, don't implement
- Before multi-file changes (> 3 files): present plan and wait for approval
- If scope grows during session: pause and confirm new scope
- When encountering a bug unrelated to current task: report it, don't fix it
- Never refactor code that isn't part of the current task
- If unsure about scope: ask, don't assume
- Before starting: confirm the scope ("Voy a hacer X, Y, Z. ¿Correcto?")
EOF

cat > .claude/rules/dependencies.md << 'EOF'
---
description: Rules for managing project dependencies
---

# Dependency rules

- NEVER add a new dependency without explicit approval
- Before proposing: check if existing code/deps solve the problem
- All dependencies must be version-pinned (exact, not ranges)
- When proposing, provide: name, purpose, license, maintenance status, size, alternatives
- Run security audit after any dependency change
- Dev dependencies in devDependencies, not dependencies
- Lockfiles (package-lock.json, poetry.lock, etc.) always committed to git
- Justification for new dependency must be in the commit message
EOF

cat > .claude/rules/traceability.md << 'EOF'
---
description: Traceability rules for professional-grade audit trails
---

# Traceability rules

- Every commit follows Conventional Commits format
- Every commit closing/addressing a ticket includes the reference in footer
- Architectural decisions documented in docs/decisions.md (ADR format)
- Breaking changes documented in CHANGELOG.md AND commit message
- New modules require description in docs/architecture.md
- Session summaries generated at end of every work session (/session)
- New dependencies require justification in commit message
- Security fixes reference CVE/CWE when applicable
- Performance changes include before/after metrics
EOF

cat > .claude/rules/documentation.md << 'EOF'
---
description: Rules for maintaining project documentation
---

# Documentation rules

- README.md must always reflect current setup instructions
- When adding a new module: update docs/architecture.md module map
- When making an architectural decision: add ADR to docs/decisions.md
- Inline comments explain WHY, not WHAT
- TODO format: `// TODO(author): description — ticket #N`
- No commented-out code — use git history
- API endpoints must be documented (method, path, auth, params, response)
- When changing behavior: update docs in the same commit
- Dead docs are worse than no docs — delete docs for removed features
EOF

cat > .claude/rules/testing.md << 'EOF'
---
description: Testing rules and conventions
---

<!-- ADAPT: Update test framework, commands, and coverage targets -->

# Testing rules

- Every new module must have tests — no exceptions
- Test happy path AND error cases AND edge cases
- Unit tests must be fast (< 1s each)
- Name format: test_<what>_<condition>_<expected>
- Mock external dependencies, not internal logic
- If mocking: define ALL attributes the real code accesses
- After implementing any feature: run full test suite
- Tests must pass BEFORE commit
- If tests fail after a change: revert first, then diagnose
- Never mark a task complete with broken tests
- Coverage target: 80% minimum for new code
EOF

# ============================================================================
# HOOKS (2)
# ============================================================================

echo -e "${GREEN}[6/8]${NC} Generando hooks..."

cat > .claude/hooks/protect-files.sh << 'HOOKEOF'
#!/bin/bash
INPUT=$(cat)
FILE=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

# Block edits to sensitive files
if [[ "$FILE" == *".env"* ]] || \
   [[ "$FILE" == *".git/"* ]] || \
   [[ "$FILE" == *"credentials"* ]] || \
   [[ "$FILE" == *"secret"* ]] || \
   [[ "$FILE" == *".pem"* ]] || \
   [[ "$FILE" == *".key"* ]]; then
  echo "BLOCKED: Cannot edit protected file: $FILE" >&2
  exit 2
fi
exit 0
HOOKEOF
chmod +x .claude/hooks/protect-files.sh

cat > .claude/hooks/validate-edit.sh << 'HOOKEOF'
#!/bin/bash
INPUT=$(cat)
FILE=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

# Log gate triggers for audit trail
if [[ "$FILE" == *"migration"* ]] || [[ "$FILE" == *"schema"* ]]; then
  echo "⚠️ GATE: Editing migration/schema file. Ensure migration:status was checked." >&2
  echo "$(date -Iseconds) GATE migration-edit $FILE" >> .claude/hooks/audit.log 2>/dev/null || true
fi
exit 0
HOOKEOF
chmod +x .claude/hooks/validate-edit.sh

# ============================================================================
# DOCS
# ============================================================================

echo -e "${GREEN}[7/8]${NC} Generando docs y archivos raíz..."

cat > docs/architecture.md << 'EOF'
# Architecture

<!-- ADAPT: This document is updated as the project architecture takes shape -->
<!-- Claude should update this file when modules are added or patterns change -->

## System overview

```
[Diagrama de alto nivel — completar cuando la arquitectura se defina]
```

## Module map

| Módulo | Responsabilidad | Entry point | Depende de |
|--------|----------------|-------------|-----------|
| <!-- ADAPT: Add modules as they're created --> | | | |

## Data flow

[Describir cómo fluyen los datos desde la entrada hasta la salida]

## Patterns in use

<!-- ADAPT: Document patterns as they're adopted -->
- [Pattern]: used in [where] — because [why]

## Key constraints

<!-- ADAPT: Document constraints as they're discovered -->
- [Constraint]: [reason]
EOF

cat > docs/decisions.md << 'EOF'
# Architecture Decision Records

<!-- New ADRs are appended here. Use /doc adr [title] to create one. -->
<!-- Format: sequential numbering, most recent at bottom -->

## ADR-001: Project initialization with Claude Code scaffolding
- **Date**: [today]
- **Status**: Accepted
- **Context**: Need a consistent, traceable project structure from day 0
- **Decision**: Use Claude Code bootstrap with 10 agents, 16 skills, 7 rules
- **Consequences**: Professional-grade traceability from first commit. Files auto-adapt as project evolves.
- **Alternatives**: Manual setup (slower, inconsistent), other scaffolding tools (less integrated with Claude)
EOF

cat > docs/api-patterns.md << 'EOF'
# API Patterns

<!-- ADAPT: Document API patterns as they're established -->

## Error response format

```json
{
  "error": "ERROR_CODE",
  "message": "Human-readable description",
  "code": 400,
  "trace_id": "uuid"
}
```

## Authentication

<!-- ADAPT: Document auth mechanism when implemented -->

## Pagination

<!-- ADAPT: Document pagination pattern when implemented -->

## Rate limiting

<!-- ADAPT: Document rate limits when configured -->
EOF

# ============================================================================
# ROOT FILES
# ============================================================================

cat > CHANGELOG.md << 'EOF'
# Changelog

All notable changes to this project will be documented in this file.
Format based on [Keep a Changelog](https://keepachangelog.com/).

## [Unreleased]

### Added
- Initial project scaffolding with Claude Code bootstrap v3
EOF

cat > .env.example << 'EOF'
# ============================================================================
# Environment Variables — Copy to .env and fill in real values
# ============================================================================

# Application
NODE_ENV=development
PORT=3000
LOG_LEVEL=debug

# Database
# DB_HOST=localhost
# DB_PORT=5432
# DB_NAME=mydb
# DB_USER=
# DB_PASSWORD=

# Authentication
# JWT_SECRET=          # >= 32 chars, REQUIRED in production
# JWT_EXPIRES_IN=24h

# External services
# API_KEY=
# REDIS_URL=redis://localhost:6379
EOF

cat > .mcp.json << 'EOF'
{
  "mcpServers": {
  }
}
EOF

# Only create .gitignore if it doesn't exist (don't overwrite)
if [ ! -f .gitignore ]; then
cat > .gitignore << 'EOF'
# Environment
.env
.env.local
.env.production

# Claude Code
.claude/settings.local.json
.claude/hooks/audit.log

# Dependencies
node_modules/
__pycache__/
*.pyc
.venv/
venv/

# Build
dist/
build/
*.egg-info/

# IDE
.vscode/
.idea/
*.swp
*.swo
.DS_Store

# Logs
*.log
logs/

# Coverage
coverage/
.coverage
htmlcov/
EOF
fi

# ============================================================================
# FINAL REPORT
# ============================================================================

echo -e "${GREEN}[8/8]${NC} Bootstrap completo!"
echo ""

# Count files
AGENT_COUNT=$(ls -1 .claude/agents/*.md 2>/dev/null | wc -l)
SKILL_COUNT=$(find .claude/skills -name "SKILL.md" 2>/dev/null | wc -l)
RULE_COUNT=$(ls -1 .claude/rules/*.md 2>/dev/null | wc -l)
HOOK_COUNT=$(ls -1 .claude/hooks/*.sh 2>/dev/null | wc -l)

echo -e "${BLUE}════════════════════════════════════════════════${NC}"
echo -e "  Archivos generados:"
echo -e "  ${GREEN}✓${NC} ${AGENT_COUNT} agentes      (.claude/agents/)"
echo -e "  ${GREEN}✓${NC} ${SKILL_COUNT} skills       (.claude/skills/*/SKILL.md)"
echo -e "  ${GREEN}✓${NC} ${RULE_COUNT} rules        (.claude/rules/)"
echo -e "  ${GREEN}✓${NC} ${HOOK_COUNT} hooks        (.claude/hooks/)"
echo -e "  ${GREEN}✓${NC} 1 CLAUDE.md   (.claude/CLAUDE.md)"
echo -e "  ${GREEN}✓${NC} 1 settings    (.claude/settings.json)"
echo -e "  ${GREEN}✓${NC} 3 docs        (docs/)"
echo -e "  ${GREEN}✓${NC} 4 root files  (.env.example, .gitignore, CHANGELOG.md, .mcp.json)"
echo -e "${BLUE}════════════════════════════════════════════════${NC}"
echo ""
echo -e "${YELLOW}PRÓXIMOS PASOS:${NC}"
echo -e "  1. Abrir ${GREEN}.claude/CLAUDE.md${NC} y completar las secciones con <!-- ADAPT -->"
echo -e "  2. Personalizar ${GREEN}.claude/settings.local.json${NC} (modelo preferido)"
echo -e "  3. Configurar MCP servers en ${GREEN}.mcp.json${NC} si usás GitHub/DB/etc."
echo -e "  4. Hacer el primer commit: ${GREEN}git add -A && git commit -m 'chore: initial project bootstrap'${NC}"
echo -e "  5. Iniciar Claude Code y correr ${GREEN}/status${NC} para verificar"
echo ""
echo -e "${YELLOW}AUTO-ADAPTACIÓN:${NC}"
echo -e "  Los archivos con <!-- ADAPT --> se personalizan durante el desarrollo."
echo -e "  Al final de cada sesión, correr ${GREEN}/session${NC} para persistir contexto."
echo -e "  El skill /session detecta qué archivos necesitan actualización."
echo ""
echo -e "  ${BLUE}¡Listo para codear!${NC}"
