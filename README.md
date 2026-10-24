# ◈ REVELACIONES 27 · Orden TI

> **"La tecnología avanza y nosotros avanzamos con ella."**

Sitio web de la comunidad ◈ **REVELACIONES 27 · Orden TI**: un círculo de aprendizaje de tecnología que cubre 12 áreas de formación, de las bases a la aplicación real.

- **Educación progresiva**: absoluto → básico → intermedio → avanzado
- **Práctica activa**: diagnóstico, laboratorios y proyectos con evidencia verificable
- **Exclusiva por invitación**: el acceso al círculo es interno; los materiales de estudio son públicos

---

## Áreas cubiertas (12)

Cada área tiene su propia página en [`areas/`](areas/):

1. Integración de las TI
2. Mantenimiento y reparación de equipos de cómputo
3. Diseño e instalación/configuración de redes
4. Matemática informática
5. Aplicaciones en internet
6. Ofimática
7. Lógica de programación
8. Modelamiento de datos
9. Herramientas de desarrollo de software
10. Desarrollo de entornos web
11. Comportamiento ético
12. Pensamiento crítico en resolución de problemas empresariales

## 🛠️ Tecnologías

Sitio **100% estático**, sin frameworks ni dependencias externas (funciona offline):

| Capa | Con qué |
|---|---|
| Estructura | HTML5 semántico |
| Estilo | CSS3 — tema oscuro + neón, tarjetas flexbox centradas |
| Comportamiento | JavaScript vanilla — partículas en `<canvas>`, efecto typing, contadores animados, menú responsive |

## 📂 Estructura del sitio

```
.
├── index.html              # Portada (resumen de áreas y estado del grupo)
├── areas.html              # Índice de las 12 áreas
├── proyectos.html          # Panel de proyectos (estado vacío honesto: grupo recién iniciado)
├── comunidad.html          # Cómo funciona y principios de la Orden
├── areas/                  # 12 páginas de detalle (una por área)
├── css/estilos.css         # Todo el estilo del sitio
└── js/app.js               # Partículas, typing, contadores y menú
```

## ▶️ Cómo verlo

- **Local**: abrir `index.html` en cualquier navegador. No requiere servidor ni instalación.
- **Online**: al publicar con GitHub Pages queda disponible en
  `https://<usuario>.github.io/<repo>/`

## 🚀 Publicar con GitHub Pages

1. `Settings` → `Pages`
2. Source: `Deploy from a branch`
3. Branch: `main` · carpeta: `/ (root)`
4. Guardar y esperar un minuto. Listo.

## 🤝 Contribuir (integrantes de la Orden)

1. Clonar el repositorio y crear una rama por mejora (`git switch -c mi-mejora`)
2. Commits cortos y claros: qué cambió y por qué
3. Cero secretos, claves o datos personales en el código o en commits
4. Todo cambio se prueba en el navegador antes de proponer

## 📜 Licencia y uso

Material educativo de la comunidad ◈ REVELACIONES 27 · Orden TI. Reutilizable con crédito.
