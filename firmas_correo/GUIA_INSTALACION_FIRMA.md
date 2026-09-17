# Guía de Instalación y Uso: Firma Oficial de Correo FICOTUR (SEJ-717)

Esta guía explica cómo configurar la firma oficial de correo institucional del **Grupo de Investigación FICOTUR (SEJ-717)** de la **Universidad de Córdoba (UCO)** en los principales clientes de correo electrónico (**Microsoft Outlook**, **Outlook Web / UCO**, **Gmail**, **Thunderbird** y **Apple Mail**).

---

## 📁 Archivos Disponibles en esta Carpeta

1. **`generador_firmas.html` (Recomendado)**: Herramienta interactiva visual. Al abrirla con cualquier navegador (Chrome, Edge, Firefox, Safari) te permite seleccionar tu perfil de investigador o escribir tus datos, ver cómo queda en tiempo real y copiar la firma con formato con un solo clic.
2. **`firma_ficotur_estandar.html`**: Plantilla HTML completa (diseño a 2 columnas con logos a la izquierda, línea corporativa verde FICOTUR, datos de contacto, perfiles académicos y aviso RGPD/medioambiental).
3. **`firma_ficotur_compacta.html`**: Versión ligera y horizontal reducida, ideal para respuestas rápidas o hilos largos de conversación.
4. **Logotipos incluidos**: `logo_ficotur.png`, `logo_uco.png`, optimizados para pantallas estándar y pantallas Retina de alta densidad (Hi-DPI).

---

## 🚀 Método Rápido (Recomendado para todos los miembros)

1. Abre el archivo **`generador_firmas.html`** haciendo doble clic sobre él (se abrirá en tu navegador web habitual).
2. En el desplegable superior, selecciona tu nombre si ya está precargado (ej. *Dra. Amalia Hidalgo*, *Dr. Ricardo Hernández*, *Dra. Mercedes Luque*, *Leonardo Gallardo*, *Carmen Barbero*) o escribe tus datos personales.
3. Elige el diseño que prefieras: **Estándar** (completa) o **Compacta**.
4. Haz clic en el botón verde:  
   👉 **`Copiar Firma con Formato (1 Clic para Outlook / Gmail)`**
5. Abre tu cliente de correo (Outlook, Gmail, etc.), entra en la configuración de firmas y presiona **`Ctrl + V`** (en Mac: **`Cmd + V`**). ¡Listo!

---

## ⚙️ Configuración Paso a Paso según tu Cliente de Correo

### 1. Microsoft Outlook (Aplicación de Escritorio en Windows)

1. En Outlook, haz clic en **Archivo** (esquina superior izquierda) > **Opciones**.
2. En la ventana emergente, selecciona la categoría **Correo** en la columna izquierda.
3. Haz clic en el botón **Firmas...** (hacia la mitad de la ventana).
4. En la pestaña *Firma de correo electrónico*, haz clic en **Nueva** y ponle un nombre (ej. *Ficotur Oficial*).
5. Haz clic dentro del recuadro inferior de edición de texto y presiona **`Ctrl + V`** para pegar la firma que copiaste desde el generador.
6. En la esquina superior derecha (*Elegir firma predeterminada*):
   - **Mensajes nuevos**: Selecciona *Ficotur Oficial*.
   - **Respuestas o reenvíos**: Selecciona *Ficotur Oficial* (o la versión *Ficotur Compacta* si prefieres una firma más discreta en respuestas).
7. Haz clic en **Aceptar** para guardar los cambios.

---

### 2. Outlook Web / Office 365 (Webmail Universidad de Córdoba)

1. Entra a tu correo UCO en el navegador web ([correo.uco.es](https://correo.uco.es) o [outlook.office.com](https://outlook.office.com)).
2. Haz clic en el icono de **Configuración** (rueda dentada ⚙️) en la esquina superior derecha.
3. En el buscador de ajustes escribe **Firma** o ve a **Correo** > **Redactar y responder**.
4. En la sección **Firma de correo electrónico**, haz clic en **+ Nueva firma**.
5. Nómbrala (ej. *Ficotur*).
6. Haz clic en el cuadro de edición y pulsa **`Ctrl + V`** (pegar).
7. Marca las casillas:
   - *Incluir mi firma en los mensajes nuevos que redacte*.
   - *Incluir mi firma en los mensajes que reenvíe o a los que responda*.
8. Haz clic en **Guardar** en la parte inferior.

---

### 3. Gmail / Google Workspace

1. En Gmail, haz clic en el icono de **Configuración** (rueda dentada ⚙️) > **Ver todos los ajustes**.
2. En la pestaña **General**, baja con el cursor hasta encontrar el apartado **Firma**.
3. Haz clic en el botón **+ Crear nueva** y ponle un nombre (ej. *FICOTUR*).
4. En el recuadro blanco que aparece a la derecha, haz clic y pulsa **`Ctrl + V`** para pegar la firma copiada.
5. Justo debajo, en **Valores predeterminados de la firma**:
   - *Para correos nuevos:* Selecciona *FICOTUR*.
   - *Para respuestas/reenvíos:* Selecciona *FICOTUR*.
6. Baja hasta el final de la página y haz clic en **Guardar cambios**.

---

### 4. Mozilla Thunderbird

1. En Thunderbird, ve a **Herramientas** (o menú de 3 rayas) > **Configuración de las cuentas**.
2. Haz clic sobre el nombre de tu cuenta de correo UCO en la columna izquierda.
3. En el panel principal verás la sección **Texto de la firma**.
4. Puedes marcar la casilla **Usar HTML** y pegar directamente la firma generada o indicar la ruta del archivo `firma_ficotur_estandar.html`.

---

### 5. Apple Mail (macOS)

1. Abre la app **Mail** en Mac y ve a **Mail** > **Ajustes** (o *Preferencias*) > pestaña **Firmas**.
2. Selecciona tu cuenta UCO y haz clic en el botón **`+`** para crear una nueva firma.
3. Desmarca la casilla *"Usar siempre mi tipo de letra por omisión"*.
4. Haz clic en el recuadro derecho de la firma, borra cualquier texto previo y pulsa **`Cmd + V`**.
5. Cierra la ventana para aplicar los cambios.

---

## 💡 Preguntas Frecuentes y Buenas Prácticas

### ¿Por qué los logotipos están alojados en un servidor web seguro (HTTPS)?
Si insertas imágenes como archivos adjuntos o rutas de tu disco duro `C:\...`, muchos servidores de destino bloquean las imágenes o el receptor ve molestos archivos adjuntos tipo `image001.png`. Al usar enlaces HTTPS públicos directos del repositorio oficial de FICOTUR:
- El correo pesa mucho menos y se envía de forma instantánea.
- Los clientes de correo modernos cargan los logotipos de forma transparente sin adjuntos.
- Si se actualiza el logotipo del grupo o de la UCO en el repositorio, la firma se actualiza automáticamente.

### ¿Qué normativas legales y ambientales cumple esta firma?
1. **Reglamento General de Protección de Datos (RGPD UE 2016/679)** y **LOPDGDD 3/2018**: Incorpora la cláusula de deber de secreto, confidencialidad en comunicaciones universitarias y ejercicio de derechos ARSULIPO ante la Universidad de Córdoba.
2. **Sostenibilidad y Medio Ambiente**: Siguiendo el compromiso ético y las líneas de investigación del grupo en factores ASG (Ambiental, Social y Gobernanza), incluye el recordatorio de concienciación de ahorro de papel e impresión responsable.

### ¿Puedo cambiar mis enlaces de ORCID, Scholar o teléfono en cualquier momento?
Sí, simplemente abre `generador_firmas.html`, modifica el campo correspondiente, pulsa *Copiar Firma con Formato* y vuelve a pegarla en la configuración de tu correo.
