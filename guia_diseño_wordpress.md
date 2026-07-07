# Guía de Configuración y Diseño: Web Ficotur (SEJ-717) en WordPress

Esta guía contiene los recursos técnicos, códigos de color y bloques de WordPress listos para construir y diseñar la web de Ficotur en el servidor de la UCO.

---

## 1. Identidad Gráfica y Paleta de Colores de Ficotur

Analizando los archivos de logotipo (`FICOTUR 2026.png` y `final.jpg`), hemos extraído los colores corporativos exactos para configurar en la **Paleta Global de Colores** del tema (Kadence o GeneratePress) en **Apariencia > Personalizar > Colores**:

*   **Color Ficotur Principal (Verde Turquesa)**: `#2A8F6C` (Representa sostenibilidad, turismo y desarrollo).
*   **Color Ficotur Secundario (Verde Turquesa Claro)**: `#41B38A` (Para efectos hover y elementos decorativos).
*   **Color Institucional UCO (Azul Marino)**: `#003B7C` (Aporta rigor académico, estabilidad, contabilidad y finanzas).
*   **Color de Acento UCO (Dorado)**: `#C5A059` (Para botones principales y llamadas a la acción).
*   **Gris de Texto Principal**: `#1E293B` (Gris pizarra oscuro, óptimo para la lectura bajo normas WCAG).
*   **Fondo Neutro Claro**: `#F8FAFC` o `#FFFFFF` (Para zonas de lectura limpia y fondos de bloque).

---

## 2. CSS Personalizado para la Web
Copia y pega este código en **Apariencia > Personalizar > CSS Adicional** para estilizar elementos globales del sitio web:

```css
/* Paleta de variables CSS Ficotur */
:root {
    --ficotur-green: #2A8F6C;
    --ficotur-green-light: #41B38A;
    --uco-blue: #003B7C;
    --uco-gold: #C5A059;
    --text-dark: #1E293B;
    --bg-light: #F8FAFC;
    --transition-smooth: all 0.3s ease-in-out;
}

/* Efectos visuales para tarjetas de proyectos e investigadores */
.ficotur-card {
    background-color: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 24px;
    transition: var(--transition-smooth);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
}

.ficotur-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    border-color: var(--ficotur-green-light);
}

/* Botón corporativo personalizado */
.wp-block-button__link.ficotur-btn-primary {
    background-color: var(--uco-blue) !important;
    color: #ffffff !important;
    border-radius: 4px !important;
    transition: var(--transition-smooth) !important;
    border: 2px solid transparent !important;
}

.wp-block-button__link.ficotur-btn-primary:hover {
    background-color: var(--ficotur-green) !important;
    border-color: var(--ficotur-green-light) !important;
}

/* Estilización del foco de accesibilidad para teclado */
a:focus, button:focus, .wp-block-button__link:focus {
    outline: 3px solid var(--uco-gold) !important;
    outline-offset: 2px !important;
}
```

---

## 3. Código Gutenberg para Copiar y Pegar en la Portada (Inicio)
Para crear una estructura de bloques limpia para la página de inicio, sigue estos pasos:
1. En WordPress, ve a **Páginas > Añadir nueva**.
2. Ponle de título **Inicio**.
3. Haz clic en el botón de los tres puntos de la esquina superior derecha y selecciona **Editor de código**.
4. Borra todo lo que haya y pega el siguiente código:

```html
<!-- wp:cover {"url":"","dimRatio":50,"overlayColor":"theme-palette-primary","minHeight":550,"minHeightUnit":"px","contentPosition":"middle","align":"full"} -->
<div class="wp-block-cover alignfull" style="min-height:550px"><span aria-hidden="true" class="wp-block-cover__background has-theme-palette-primary-background-color has-background-dim-50 has-background-dim"></span><div class="wp-block-cover__inner-container"><!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group"><!-- wp:heading {"textAlign":"center","level":1,"style":{"spacing":{"margin":{"bottom":"20px"}},"typography":{"fontSize":"3.2rem"}}} -->
<h1 class="wp-block-heading text-align-center" style="margin-bottom:20px;font-size:3.2rem"><strong>Grupo de Investigación FICOTUR (SEJ-717)</strong></h1>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"1.4rem"}}} -->
<p class="has-text-align-center" style="font-size:1.4rem">Contabilidad, Finanzas y Gestión Turística — Universidad de Córdoba</p>
<!-- /wp:paragraph -->

<!-- wp:buttons {"align":"center","style":{"spacing":{"margin":{"top":"30px"}}}} -->
<div class="wp-block-buttons aligncenter" style="margin-top:30px"><!-- wp:button {"className":"ficotur-btn-primary"} -->
<div class="wp-block-button ficotur-btn-primary"><a class="wp-block-button__link wp-element-button">Nuestros Proyectos</a></div>
<!-- /wp:button -->

<!-- wp:button {"className":"is-style-outline"} -->
<div class="wp-block-button is-style-outline"><a class="wp-block-button__link wp-element-button">Conocer al Equipo</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div>
<!-- /wp:group --></div></div>
<!-- /wp:cover -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"80px","bottom":"80px"}}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group" style="padding-top:80px;padding-bottom:80px"><!-- wp:heading {"textAlign":"center","level":2} -->
<h2 class="wp-block-heading text-align-center"><strong>Transferencia y Rigor Científico</strong></h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"1.1rem"}}} -->
<p class="has-text-align-center" style="font-size:1.1rem">Desarrollamos soluciones y análisis empíricos aplicados al sector turístico, la gestión financiera y la contabilidad empresarial.</p>
<!-- /wp:paragraph -->

<!-- wp:columns {"style":{"spacing":{"margin":{"top":"60px"}}}} -->
<div class="wp-block-columns" style="margin-top:60px"><!-- wp:column {"className":"ficotur-card"} -->
<div class="wp-block-column ficotur-card"><!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading"><strong>+15 Investigadores</strong></h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Un equipo multidisciplinar enfocado en retos globales de contabilidad, auditoría e impacto del turismo.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->

<!-- wp:column {"className":"ficotur-card"} -->
<div class="wp-block-column ficotur-card"><!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading"><strong>60+ Publicaciones</strong></h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Artículos científicos indexados en bases de datos de alto impacto como JCR, SJR y Dialnet.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->

<!-- wp:column {"className":"ficotur-card"} -->
<div class="wp-block-column ficotur-card"><!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading"><strong>Proyectos I+D+i</strong></h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Proyectos activos y completados con financiación de entidades públicas y convenios privados.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></div>
<!-- /wp:group -->
```

5. Sal de la edición de código haciendo clic de nuevo en los tres puntos y seleccionando **Editor visual**. ¡Verás la estructura en vivo lista para editar!

---

## 4. Configuración del Repositorio de Publicaciones (Zotpress)

Dado que usas **Zotero**, el plugin **Zotpress** te ahorrará cientos de horas de carga manual de artículos. Sigue estos pasos para sincronizarlo:

### Paso A: Obtener credenciales de Zotero
1. Entra en tu cuenta en [zotero.org](https://www.zotero.org/) (o crea una cuenta gratuita si quieres que pertenezca al grupo de investigación de forma genérica).
2. Ve a **Settings > Feeds/API**.
3. Copia tu **UserID / Current Account ID** (número de varios dígitos).
4. Haz clic en **Create new private key**.
5. Escribe una descripción (ej. "Web Ficotur UCO"), mantén el acceso de lectura activado y haz clic en **Save Key**.
6. Copia y guarda la **Key** resultante (es un código alfanumérico largo; solo se muestra una vez).

### Paso B: Conectar en WordPress
1. En tu panel de WordPress, ve a **Zotpress > Accounts**.
2. Rellena los datos:
   *   **Account Nickname**: `Ficotur`
   *   **Account Type**: Selecciona `User` (si es tu biblioteca personal o la del grupo) o `Group` (si es un grupo creado en Zotero).
   *   **Zotero User/Group ID**: Pega tu UserID de Zotero.
   *   **Private Key**: Pega la clave API generada.
3. Haz clic en **Save**.
4. Ve a **Zotpress > Options > Sync** y haz clic en **Selective Sync** o **Full Sync** para importar todas tus publicaciones de Zotero a WordPress.

### Paso C: Mostrar las publicaciones en la Web
Ve a tu página de **Publicaciones** y añade un bloque de **Párrafo** o **Shortcode** con alguno de estos comandos:
*   `[zotpress user="TU_USER_ID" style="apa" limit="50"]` (Muestra las últimas 50 publicaciones formateadas en APA).
*   `[zotpress user="TU_USER_ID" style="chicago-author-date" sortby="year" order="desc"]` (Muestra las publicaciones ordenadas por año en orden descendente).
*   *Nota: Sustituye `TU_USER_ID` por tu ID numérico de Zotero.*

---

## 5. Diseño del Directorio de Equipo con ACF y CPT UI

Para tener fichas de investigadores limpias y profesionales con Schema.org enlazado, configuraremos lo siguiente en WordPress:

### Paso A: Crear el Custom Post Type (CPT UI)
1. Instala y activa **CPT UI**.
2. Ve a **CPT UI > Add/Edit Post Types**.
3. Rellena los campos:
   *   **Post Type Slug**: `investigador`
   *   **Plural Label**: `Investigadores`
   *   **Singular Label**: `Investigador`
4. Haz clic en **Add Post Type**.

### Paso B: Añadir los Campos Personalizados (ACF)
1. Instala y activa **Advanced Custom Fields** (ACF).
2. Ve a **ACF > Grupos de campos > Añadir nuevo**.
3. Nómbralo: `Datos del Investigador`.
4. Añade los siguientes campos:
   *   `cargo` (Texto) -> Ej: Catedrático, Investigadora Contratada.
   *   `orcid_url` (URL) -> Enlace al perfil de ORCID.
   *   `scholar_url` (URL) -> Enlace al perfil de Google Scholar.
   *   `scopus_url` (URL) -> Enlace al perfil de Scopus.
   *   `dialnet_url` (URL) -> Enlace al perfil de Dialnet.
   *   `lineas_investigacion` (Área de texto) -> Líneas científicas principales.
5. En la sección **Reglas de ubicación**, pon: *Mostrar este grupo de campos si Tipo de contenido es igual a Investigador*.
6. Haz clic en **Guardar cambios**.
