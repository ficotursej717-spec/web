/* ==========================================================================
   LÓGICA JAVASCRIPT - WEB GRUPO INVESTIGACIÓN FICOTUR (SEJ-717)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initTeamModals();
    initZoteroAPI();
    initBoucoWidget();
    initLanguageSelector();
});

/* ==========================================================================
   1. MENÚ MÓVIL RESPONSIVE
   ========================================================================== */
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
        });

        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && e.target !== navToggle) {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

/* ==========================================================================
   2. MODALES DINÁMICOS DE INVESTIGADORES (PÁGINA EQUIPO)
   ========================================================================== */
// Datos reales de los investigadores de Ficotur
const investigadoresData = {
    'investigador-1': {
        nombre: 'Dr. Ricardo Hernández Rojas',
        cargo: 'Director de Ficotur - Área de Economía Financiera y Contabilidad, Dpto. Economía Agraria, Finanzas y Contabilidad',
        foto: 'ricardo.jpg',
        lineas: [
            'Gestión turística del patrimonio.',
            'Gestión empresarial de la gastronomía tradicional.',
            'Coordinador del Congreso Internacional de Gestión Turística del Patrimonio (CIGESTUR).',
            'Director de la Cátedra de Turismo Patrimonial y Cultural UCO.',
            'Proyecto Actual (IP2): DGP_PIDI_2024_00107. OLIVE-VAR: Realidad virtual y aumentada aplicadas a la promoción del oleoturismo (Convocatoria Junta de Andalucía - Consejería de Universidad, Investigación e Innovación. Importe: 50.000 €).'
        ],
        contacto: {
            email: 'ricardo.hernandez@uco.es',
            telefono: '+34 957 21 12 50',
            despacho: 'Facultad de Ciencias del Trabajo, Universidad de Córdoba'
        },
        links: {
            orcid: 'https://orcid.org/0000-0002-3055-2151',
            scholar: 'https://scholar.google.es/citations?user=Y70n6oMAAAAJ',
            dialnet: 'https://dialnet.unirioja.es/servlet/autor?codigo=2666579',
            researchgate: 'https://www.researchgate.net/profile/Ricardo-David-Hernandez-Rojas',
            linkedin: 'https://www.linkedin.com/in/ricardohernandezrojas',
            instagram: 'https://www.instagram.com/ricardohdezrojas/'
        }
    },
    'investigador-2': {
        nombre: 'Leonardo A. Gallardo Apolo',
        cargo: 'Investigador Predoctoral - Programa de Doctorado en Ciencias Sociales y Jurídicas',
        foto: 'leo_gallardo.png',
        lineas: [
            'Turismo gastronómico y gestión del patrimonio cultural.',
            'Herramientas de digitalización y desarrollo de la hostelería rural.',
            'Doctorando en Ciencias Sociales y Jurídicas (Universidad de Córdoba).',
            'Miembro de la Cátedra de Turismo Patrimonial y Cultural de la UCO.',
            'Proyecto (Contrato): Rescate Histórico Noor (PAMOGA Gastro S.L. - Desde 01/02/2026).',
            'Proyecto (Contrato): Puesta en marcha del Observatorio de la Restauración de la Provincia de Córdoba (Diputación de Córdoba).',
            'Coautor del libro "Patrimonio y Turismo: Experiencias, Territorios y Transformaciones" (Editorial Aranzadi, 2026).'
        ],
        contacto: {
            email: 'z42gaapl@uco.es',
            telefono: '+34613661016',
            despacho: 'Cátedra de Turismo Patrimonial y Cultural, Facultad de Derecho y Ciencias Económicas y Empresariales'
        },
        links: {
            orcid: 'https://orcid.org/0009-0008-9384-5729',
            scholar: 'https://scholar.google.es/citations?user=H2JP8uwAAAAJ&hl=es',
            linkedin: 'https://www.linkedin.com/in/leonardo-gallardo-apolo-16ab78355/'
        }
    },
    'investigador-3': {
        nombre: 'Dra. Mercedes Luque-Vílchez',
        cargo: 'Profesora Titular de Universidad - Dpto. Economía Agraria, Finanzas y Contabilidad',
        foto: 'mercedes.jpg',
        lineas: [
            'Contabilidad social y medioambiental. Información no financiera e información de sostenibilidad.',
            'Regulación y gobernanza del reporting corporativo. Aseguramiento de la información de sostenibilidad.',
            'Contabilidad para la transición ecológica. Sostenibilidad en pymes y organizaciones públicas.',
            'Compra pública sostenible. Gobernanza empresarial y Responsabilidad Social Corporativa (RSC).',
            'Proyecto Actual (IP): Análisis de la información de planes de transición de empresas españolas/europeas (ICAC-ASEPUC 2026 - Financiación: 3.500 €).',
            'Proyecto Actual: Información de sostenibilidad transformativa (Ministerio de Ciencia e Innovación, PID2024-156135OB-I00, 2025-2028 - Presupuesto: 112.500 €).',
            'Proyecto Actual: Contabilidad socio-ecológica y stewardship empresarial (Junta de Castilla y León, BU029P23, 2023-2027 - Presupuesto: 180.000 €).',
            'Consultoría: Contrato internacional en contabilidad para la sostenibilidad para la Contaduría General de la Nación de Colombia (Banco Interamericano de Desarrollo - BID, 2025-2026).'
        ],
        contacto: {
            email: 'mercedes.luque@uco.es',
            telefono: '+34 957 21 XX XX',
            despacho: 'Facultad de Derecho y Ciencias Económicas y Empresariales, Universidad de Córdoba'
        },
        links: {
            orcid: 'https://orcid.org/0000-0001-8392-8573',
            linkedin: 'https://www.linkedin.com/in/mercedes-luque-v%C3%ADlchez-6a571866/?skipRedirect=true'
        }
    },
    'investigador-4': {
        nombre: 'Dr. José Antonio Fernández-Gallardo',
        cargo: 'Profesor del Dpto. de Economía Agraria, Finanzas y Contabilidad - Área de Economía Financiera y Contabilidad',
        foto: 'jose_antonio.png',
        lineas: [
            'Economía financiera, contabilidad de gestión y valoración corporativa.',
            'Análisis de costes y viabilidad económica de la vivienda turística (VFT).',
            'Dirección de simuladores de gestión y estrategia empresarial (Global Management Challenge).',
            'Responsable y organizador de la Olimpiada de Economía en la Universidad de Córdoba (UCO).',
            'Mentor y formador especializado en emprendimiento y modelos de negocio en #EmprendeUCO.'
        ],
        contacto: {
            email: 'jose.fernandez@uco.es',
            telefono: '+34 957 21 XX XX',
            despacho: 'Facultad de Derecho y Ciencias Económicas y Empresariales, Universidad de Córdoba'
        },
        links: {
            orcid: 'https://orcid.org/0000-0002-3003-3909'
        }
    },
    'investigador-5': {
        nombre: 'Carmen Barbero Saavedra',
        cargo: 'Docente e Investigadora - Área de Métodos Cuantitativos y Economía Española',
        foto: 'carmen_barbero.png',
        lineas: [
            'Métodos cuantitativos aplicados a la economía agraria y análisis de datos.',
            'Economía española e internacional vinculada a la gestión del desarrollo turístico.',
            'Modelización matemática avanzada para la toma de decisiones empresariales.',
            'Docencia e investigación de economía de la pyme y matemáticas financieras.'
        ],
        contacto: {
            email: 'carmen.barbero@uco.es',
            telefono: '+34 957 21 XX XX',
            despacho: 'Facultad de Derecho y Ciencias Económicas y Empresariales, Universidad de Córdoba'
        },
        links: {
            linkedin: 'https://www.linkedin.com/in/carmen-barbero-saavedra-731b31109/'
        }
    },
    'investigador-6': {
        nombre: 'Dra. M. Dolores Guerrero-Baena',
        cargo: 'Profesora e Investigadora - Área de Economía Financiera y Contabilidad, Dpto. Economía Agraria, Finanzas y Contabilidad',
        foto: 'lola_guerrero.png',
        lineas: [
            'Valoración de inversiones corporativas y capital intelectual.',
            'Análisis multicriterio aplicado a la toma de decisiones financieras y de inversión.',
            'Contabilidad de gestión y economía financiera de la empresa.',
            'Premio Extraordinario de Doctorado (Macroárea Ciencias Sociales y Jurídicas, UCO, 2015).',
            'Tesis Doctoral: "La valoración de inversiones corporativas desde la perspectiva del capital intelectual: una aproximación multicriterio" (2013/2014).'
        ],
        contacto: {
            email: 'dolores.guerrero@uco.es',
            telefono: '+34 957 21 XX XX',
            despacho: 'Facultad de Derecho y Ciencias Económicas y Empresariales, Universidad de Córdoba'
        },
        links: {
            orcid: 'https://orcid.org/0000-0003-4042-3094'
        }
    },
    'investigador-7': {
        nombre: 'Dr. Juan Antonio Jimber del Río',
        cargo: 'Profesor del Área de Economía Financiera y Contabilidad - Dpto. Economía Financiera y Contabilidad',
        foto: 'juan_jimber.png',
        lineas: [
            'Economía financiera y contabilidad: análisis de riesgo de crédito y valoración.',
            'Turismo y desarrollo sostenible: lealtad turística, gestión de destinos y análisis econométrico.',
            'Análisis de cadenas de valor agroalimentarias e impacto económico sectorial.',
            'Economía agraria y análisis de mercados: investigación aplicada a entornos rurales y turísticos.',
            'Director de tesis doctorales en turismo sostenible y desarrollo territorial.'
        ],
        contacto: {
            email: 'jjimber@uco.es',
            telefono: '+34 957 21 88 84',
            despacho: 'Dpto. de Economía Financiera y Contabilidad, Ftad. Derecho y CC Económicas y Empresariales, Córdoba 14071'
        },
        links: {
            orcid: 'https://orcid.org/0000-0001-6886-7434',
            researchgate: 'https://www.researchgate.net/profile/Juan-Jimber-Del-Rio'
        }
    },
    'investigador-8': {
        nombre: 'Amalia Hidalgo Fernández',
        cargo: 'Profesora Titular de Universidad - Dpto. Economía Agraria, Finanzas y Contabilidad',
        foto: 'amalia_hidalgo.png',
        lineas: [
            'Contabilidad y finanzas para la economía social y cooperativas.',
            'Economía del turismo.',
            'Contabilidad analítica de empresas.',
            'Análisis del impacto y gestión de los factores ASG (Ambiental, Social y Gobernanza) en la conservación y sostenibilidad integral del patrimonio de la Mezquita-Catedral de Córdoba y sus grupos de interés.'
        ],
        contacto: {
            email: 'ahidalgo@uco.es',
            telefono: '+34 957 21 26 51',
            despacho: 'Facultad de Derecho y Ciencias Económicas y Empresariales, Universidad de Córdoba'
        },
        links: {
            orcid: 'https://orcid.org/0000-0002-2764-6624'
        }
    },
    'investigador-9': {
        nombre: 'Dra. Luz Marina Caracuel Sillero',
        cargo: 'Investigadora - Área de Economía Financiera y Contabilidad, Dpto. Economía Agraria, Finanzas y Contabilidad',
        foto: 'marina_caracuel.jpg',
        lineas: [
            'Contabilidad de gestión: influencia de la información contable en la competitividad de cooperativas oleícolas.',
            'Cooperativismo agrario: tendencias en innovación, sostenibilidad y gobernanza en España (análisis bibliométrico).',
            'Patrimonio cultural y turismo: gestión del patrimonio religioso y su relación con el turismo local en Córdoba.',
            'Coordinadora de grado en el Área de Administración y Dirección de Empresas (ADE), UCO.',
            'Capítulo: "Patrimonio religioso en Córdoba: el caso de las ermitas" — Turismo y patrimonio: enfoques para la gestión (2023).'
        ],
        contacto: {
            email: 'marina.caracuel@uco.es',
            telefono: '+34 957 21 XX XX',
            despacho: 'Facultad de Derecho y Ciencias Económicas y Empresariales, Universidad de Córdoba'
        },
        links: {
            orcid: 'https://orcid.org/0000-0001-7889-8066',
            researchgate: 'https://www.researchgate.net/scientific-contributions/Marina-Caracuel-Sillero-2302728336',
            scholar: 'https://scholar.google.com/citations?user=BEFgDIgAAAAJ&hl=es'
        }
    },
    'investigador-10': {
        nombre: 'Dr. Arnaldo Vergara-Romero',
        cargo: 'Investigador - Área de Economía Financiera y Contabilidad, Proyecto FARMPERFORM',
        foto: 'arnaldo_vergara.png',
        lineas: [
            'Métodos matemáticos y cuantitativos aplicados a la economía (JEL: C).',
            'Economía del desarrollo: análisis de contextos agrarios y sostenibilidad (JEL: O).',
            'Economía aplicada y sectorial: estudios de impacto microeconómico en agricultura (JEL: R, L).',
            'Proyecto FARMPERFORM: "Transición ecológica de la agricultura — Análisis microeconómico para la toma de decisiones políticas" (desde 2024).',
            'Experiencia investigadora previa en el Centro de Estudios para el Desarrollo Sostenible (Ecuador) y docencia universitaria en Universidad Ecotec.'
        ],
        contacto: {
            email: 'z82veroa@uco.es',
            telefono: '+34 685 250 09 87',
            despacho: 'Facultad de Derecho y Ciencias Económicas y Empresariales, Universidad de Córdoba'
        },
        links: {
            orcid: 'https://orcid.org/0000-0001-8503-3685'
        }
    }
};

function initTeamModals() {
    const members = document.querySelectorAll('.team-card[data-id]');
    const modal = document.getElementById('team-modal');
    
    if (!modal) return;

    const modalClose = modal.querySelector('.modal-close');

    members.forEach(member => {
        member.addEventListener('click', (e) => {
            // Evitar abrir modal si hacen clic directo en los enlaces de badges
            if (e.target.classList.contains('badge-link')) return;

            const id = member.getAttribute('data-id');
            const data = investigadoresData[id];
            if (data) {
                fillModal(data);
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Bloquear scroll de fondo
            }
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function fillModal(data) {
    const modal = document.getElementById('team-modal');
    modal.querySelector('.modal-img').src = data.foto;
    modal.querySelector('.modal-img').alt = `Retrato de ${data.nombre}`;
    modal.querySelector('.modal-name').textContent = data.nombre;
    modal.querySelector('.modal-role').textContent = data.cargo;
    
    // Rellenar Líneas de Investigación
    const lineasList = modal.querySelector('.modal-lines');
    lineasList.innerHTML = '';
    data.lineas.forEach(linea => {
        const li = document.createElement('li');
        li.textContent = linea;
        lineasList.appendChild(li);
    });

    // Contacto
    modal.querySelector('.modal-email').textContent = data.contacto.email;
    modal.querySelector('.modal-email').href = `mailto:${data.contacto.email}`;
    modal.querySelector('.modal-phone').textContent = data.contacto.telefono;
    modal.querySelector('.modal-office').textContent = data.contacto.despacho;

    // Enlaces Académicos y Redes Profesionales de forma dinámica
    const linksContainer = modal.querySelector('.modal-academic-links');
    if (linksContainer) {
        linksContainer.innerHTML = '';
        
        const linkKeys = {
            orcid: { label: 'ORCID ID', class: 'badge-link' },
            scholar: { label: 'Google Scholar', class: 'badge-link' },
            researchgate: { label: 'ResearchGate', class: 'badge-link' },
            linkedin: { label: 'LinkedIn', class: 'badge-link' },
            instagram: { label: 'Instagram', class: 'badge-link' },
            scopus: { label: 'Scopus ID', class: 'badge-link' },
            dialnet: { label: 'Dialnet', class: 'badge-link' }
        };
        
        for (const [key, info] of Object.entries(linkKeys)) {
            if (data.links && data.links[key]) {
                const a = document.createElement('a');
                a.href = data.links[key];
                a.target = '_blank';
                a.rel = 'noopener';
                a.className = info.class;
                a.textContent = info.label;
                linksContainer.appendChild(a);
            }
        }
    }
}

/* ==========================================================================
   3. API DE ZOTERO Y RENDERIZADO DE PUBLICACIONES
   ========================================================================== */
// Configuración de la API de Zotero para el Grupo
// Cambiar estos valores cuando tengan la ID del grupo oficial de Zotero
const ZOTERO_CONFIG = {
    userId: '11956667', // Reemplazar con ID de Zotero del grupo
    isGroup: false,      // Cambiar a true si es un grupo en lugar de usuario
    limit: 100
};

// Publicaciones estáticas de respaldo (Fallback) en caso de fallo de red o API no configurada
const publicacionesFallback = [
    {
        title: "El impacto de la sostenibilidad en la gestión de costes de las cadenas hoteleras en Andalucía",
        authors: "Solier, L., Pérez Gómez, J.",
        year: 2025,
        type: "artículo",
        source: "Revista de Contabilidad y Dirección de Empresas, Vol. 45, N. 2, pp. 112-130",
        doi: "https://doi.org/10.1016/j.rcyde.2025.02.001",
        pdf: "#"
    },
    {
        title: "Reporting financiero y gobernanza en los patronatos de turismo provinciales",
        authors: "Pérez Gómez, J., López Roldán, M.",
        year: 2024,
        type: "artículo",
        source: "European Journal of Tourism Research, Vol. 22, pp. 45-59",
        doi: "https://doi.org/10.54055/ejtr.v22i.2024",
        pdf: "#"
    },
    {
        title: "Nuevas tendencias de control estratégico en las empresas de alojamiento del sur de España",
        authors: "Solier, L., López Roldán, M., Pérez Gómez, J.",
        year: 2024,
        type: "libro",
        source: "Editorial Aranzadi, ISBN: 978-84-1122-111-2",
        doi: "",
        pdf: ""
    },
    {
        title: "Análisis empírico del reporting ESG y su relación con la rentabilidad en el sector del turismo de golf",
        authors: "López Roldán, M.",
        year: 2023,
        type: "tesis",
        source: "Tesis Doctoral, Universidad de Córdoba",
        doi: "https://helvia.uco.es/xmlui/handle/10396/12345",
        pdf: "#"
    }
];

let publicacionesList = []; // Aquí guardaremos las publicaciones en memoria para buscar y filtrar

async function initZoteroAPI() {
    const pubContainer = document.getElementById('publicaciones-container');
    if (!pubContainer) return;

    pubContainer.innerHTML = '<div style="text-align: center; padding: 2rem; font-family: var(--font-headings); font-weight: 500;">Cargando repositorio científico...</div>';

    try {
        const entityType = ZOTERO_CONFIG.isGroup ? 'groups' : 'users';
        const url = `https://api.zotero.org/${entityType}/${ZOTERO_CONFIG.userId}/items?format=json&limit=${ZOTERO_CONFIG.limit}&direction=desc&sort=date`;
        
        const response = await fetch(url);
        if (!response.ok) throw new Error('Error al conectar con la API de Zotero');
        
        const rawData = await response.json();
        
        // Mapear y limpiar los datos de Zotero
        publicacionesList = rawData
            .filter(item => item.data.itemType === 'journalArticle' || item.data.itemType === 'book' || item.data.itemType === 'bookSection' || item.data.itemType === 'thesis')
            .map(item => {
                const authors = item.data.creators 
                    ? item.data.creators.map(c => `${c.lastName || ''}, ${c.firstName || ''}`).join('; ') 
                    : 'Autores no definidos';
                
                let type = 'artículo';
                if (item.data.itemType === 'book') type = 'libro';
                if (item.data.itemType === 'bookSection') type = 'capítulo';
                if (item.data.itemType === 'thesis') type = 'tesis';

                let year = '';
                if (item.data.date) {
                    const match = item.data.date.match(/\d{4}/);
                    if (match) year = parseInt(match[0]);
                }

                return {
                    title: item.data.title || 'Sin título',
                    authors: authors,
                    year: year || 'N/D',
                    type: type,
                    source: item.data.publicationTitle || item.data.publisher || item.data.university || 'Edición científica',
                    doi: item.data.DOI ? `https://doi.org/${item.data.DOI}` : '',
                    pdf: item.data.url || ''
                };
            });

        if (publicacionesList.length === 0) {
            // Si la API conecta pero la colección está vacía, usamos fallback
            publicacionesList = [...publicacionesFallback];
        }

    } catch (error) {
        console.warn('API de Zotero inaccesible, cargando datos de respaldo locales:', error);
        publicacionesList = [...publicacionesFallback];
    }

    renderPublicaciones(publicacionesList);
    setupSearchFilters();
}

function renderPublicaciones(list) {
    const container = document.getElementById('publicaciones-container');
    if (!container) return;

    if (list.length === 0) {
        container.innerHTML = '<div style="text-align: center; padding: 2rem; color: var(--text-muted);">No se encontraron publicaciones con los criterios de búsqueda.</div>';
        return;
    }

    container.innerHTML = '';
    list.forEach(pub => {
        const item = document.createElement('article');
        item.className = 'pub-item';
        
        let typeBadge = `<span class="pub-meta">${pub.type}  |  ${pub.year}</span>`;
        
        let doiBtn = pub.doi ? `<a href="${pub.doi}" target="_blank" rel="noopener" class="pub-btn">🌐 DOI</a>` : '';
        let pdfBtn = pub.pdf ? `<a href="${pub.pdf}" target="_blank" rel="noopener" class="pub-btn">📄 Enlace / PDF</a>` : '';

        item.innerHTML = `
            ${typeBadge}
            <h3 class="pub-title">${pub.title}</h3>
            <p class="pub-authors"><strong>Autores:</strong> ${pub.authors}</p>
            <p class="pub-source"><strong>Publicado en:</strong> ${pub.source}</p>
            <div class="pub-links">
                ${doiBtn}
                ${pdfBtn}
            </div>
        `;
        container.appendChild(item);
    });
}

function setupSearchFilters() {
    const searchInput = document.getElementById('pub-search');
    const typeFilter = document.getElementById('pub-type-filter');
    const yearFilter = document.getElementById('pub-year-filter');

    if (!searchInput || !typeFilter || !yearFilter) return;

    // Rellenar filtro de años dinámicamente según datos
    const years = [...new Set(publicacionesList.map(p => p.year))].sort((a, b) => b - a);
    yearFilter.innerHTML = '<option value="">Todos los años</option>';
    years.forEach(year => {
        if (year && year !== 'N/D') {
            const opt = document.createElement('option');
            opt.value = year;
            opt.textContent = year;
            yearFilter.appendChild(opt);
        }
    });

    // Escuchar eventos
    searchInput.addEventListener('input', filterAndRender);
    typeFilter.addEventListener('change', filterAndRender);
    yearFilter.addEventListener('change', filterAndRender);

    function filterAndRender() {
        const query = searchInput.value.toLowerCase().trim();
        const selectedType = typeFilter.value;
        const selectedYear = yearFilter.value;

        const filtered = publicacionesList.filter(pub => {
            const matchQuery = pub.title.toLowerCase().includes(query) || 
                               pub.authors.toLowerCase().includes(query) || 
                               pub.source.toLowerCase().includes(query);
            const matchType = selectedType === '' || pub.type === selectedType;
            const matchYear = selectedYear === '' || pub.year.toString() === selectedYear;

            return matchQuery && matchType && matchYear;
        });

        renderPublicaciones(filtered);
    }
}

/* ==========================================================================
   4. WIDGET INTERACTIVO BOUCO LIVE (CONVOCATORIAS EN TIEMPO REAL)
   ========================================================================== */
let convocatoriasList = [];

async function initBoucoWidget() {
    const listContainer = document.getElementById('bouco-list-container');
    if (!listContainer) return;

    try {
        const response = await fetch('bouco_convocatorias.json');
        if (!response.ok) throw new Error('No se pudo cargar el boletín de convocatorias');
        
        convocatoriasList = await response.json();
        renderConvocatorias(convocatoriasList);
        setupBoucoFilters();
    } catch (error) {
        console.error('Error al cargar convocatorias del BOUCO:', error);
        listContainer.innerHTML = '<div class="bouco-empty">[Error de conexión] No se pudo sincronizar el tablón de anuncios de la UCO. Inténtelo más tarde.</div>';
    }
}

const boucoTranslations = {
    en: {
        "Empleo": "Job",
        "Licitación": "Tender",
        "Plazas": "Positions",
        "Resolución": "Resolution",
        "Convocatoria": "Call",
        "Abierto": "Open",
        "Cerrado": "Closed",
        "Ver Boletín UCO ↗": "View Official Gazette ↗",
        "Publicado:": "Published:"
    },
    fr: {
        "Empleo": "Emploi",
        "Licitación": "Appel d'offres",
        "Plazas": "Postes",
        "Resolución": "Résolution",
        "Convocatoria": "Appel",
        "Abierto": "Ouvert",
        "Cerrado": "Fermé",
        "Ver Boletín UCO ↗": "Voir le bulletin UCO ↗",
        "Publicado:": "Publié:"
    },
    pt: {
        "Empleo": "Vagas",
        "Licitación": "Licitação",
        "Plazas": "Vagas",
        "Resolución": "Resolução",
        "Convocatoria": "Edital",
        "Abierto": "Aberto",
        "Cerrado": "Fechado",
        "Ver Boletín UCO ↗": "Ver Boletim UCO ↗",
        "Publicado:": "Publicado:"
    }
};

function renderConvocatorias(lista) {
    const container = document.getElementById('bouco-list-container');
    if (!container) return;

    if (lista.length === 0) {
        // Traducir el mensaje vacío si corresponde
        const currentLang = localStorage.getItem('ficotur-lang') || 'es';
        let emptyMsg = "No se encontraron convocatorias coincidentes con la búsqueda.";
        if (currentLang === 'en') emptyMsg = "No announcements matching the search query were found.";
        if (currentLang === 'fr') emptyMsg = "Aucune annonce correspondant à la recherche n'a été trouvée.";
        if (currentLang === 'pt') emptyMsg = "Nenhum edital correspondente à busca foi encontrado.";
        
        container.innerHTML = `<div class="bouco-empty">${emptyMsg}</div>`;
        return;
    }

    const currentLang = localStorage.getItem('ficotur-lang') || 'es';

    container.innerHTML = '';
    lista.forEach(conv => {
        const item = document.createElement('a');
        item.href = conv.link;
        item.target = '_blank';
        item.rel = 'noopener';
        item.className = 'bouco-item';
        
        let tipoTraducido = conv.tipo;
        let estadoTraducido = conv.estado;
        let verBoletinText = "Ver Boletín UCO ↗";
        let publicadoText = "Publicado:";
        
        if (currentLang !== 'es' && boucoTranslations[currentLang]) {
            tipoTraducido = boucoTranslations[currentLang][conv.tipo] || conv.tipo;
            estadoTraducido = boucoTranslations[currentLang][conv.estado] || conv.estado;
            verBoletinText = boucoTranslations[currentLang]["Ver Boletín UCO ↗"] || verBoletinText;
            publicadoText = boucoTranslations[currentLang]["Publicado:"] || publicadoText;
        }

        item.setAttribute('aria-label', `Convocatoria: ${conv.titulo}. ${publicadoText} ${conv.fecha}. ${estadoTraducido}.`);

        const stateClass = conv.estado.toLowerCase();
        
        item.innerHTML = `
            <div class="bouco-item-header">
                <span class="bouco-badge-tipo">${tipoTraducido}</span>
                <span class="bouco-badge-state ${stateClass}">${estadoTraducido}</span>
            </div>
            <div class="bouco-item-title">${conv.titulo}</div>
            <div class="bouco-item-meta">
                <span>${publicadoText} ${conv.fecha}</span>
                <span>${verBoletinText}</span>
            </div>
        `;
        container.appendChild(item);
    });
}

function setupBoucoFilters() {
    const searchInput = document.getElementById('bouco-search');
    const filterBtns = document.querySelectorAll('.bouco-filter-btn');

    if (!searchInput || filterBtns.length === 0) return;

    let activeFilter = 'Todos';

    searchInput.addEventListener('input', filterAndRender);

    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeFilter = btn.getAttribute('data-filter');
            filterAndRender();
        });
    });

    function filterAndRender() {
        const query = searchInput.value.toLowerCase().trim();

        const filtered = convocatoriasList.filter(conv => {
            const matchesQuery = conv.titulo.toLowerCase().includes(query) || 
                                 conv.tipo.toLowerCase().includes(query);
            
            let matchesFilter = true;
            if (activeFilter === 'Empleo') {
                matchesFilter = conv.tipo === 'Empleo';
            } else if (activeFilter === 'Proyectos') {
                matchesFilter = conv.tipo === 'Proyectos' || conv.tipo === 'Licitación';
            } else if (activeFilter === 'Abierto') {
                matchesFilter = conv.estado === 'Abierto';
            }

            return matchesQuery && matchesFilter;
        });

        renderConvocatorias(filtered);
    }
}

/* ==========================================================================
   5. SISTEMA DE TRADUCCIÓN MULTILINGÜE
   ========================================================================== */
function initLanguageSelector() {
    const langSelect = document.getElementById('lang-select');
    if (!langSelect) return;

    // Obtener idioma preferido
    let savedLang = localStorage.getItem('ficotur-lang');
    if (!savedLang) {
        savedLang = 'es';
        localStorage.setItem('ficotur-lang', savedLang);
    }

    langSelect.value = savedLang;
    translatePage(savedLang);

    langSelect.addEventListener('change', (e) => {
        const newLang = e.target.value;
        localStorage.setItem('ficotur-lang', newLang);
        translatePage(newLang);
        
        // Si hay una lista de convocatorias de BOUCO activa, volver a renderizarla para aplicar traducción en caliente
        if (convocatoriasList.length > 0) {
            // Disparar la lógica de filtrado de nuevo para refrescar el render
            const searchInput = document.getElementById('bouco-search');
            if (searchInput) {
                searchInput.dispatchEvent(new Event('input'));
            } else {
                renderConvocatorias(convocatoriasList);
            }
        }
    });
}

function translatePage(lang) {
    if (typeof dictionary === 'undefined') {
        console.warn('Diccionario de traducción no cargado.');
        return;
    }

    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(el => {
        const key = el.getAttribute('data-translate');
        if (dictionary[lang] && dictionary[lang][key]) {
            const translation = dictionary[lang][key];
            
            // Si el elemento es un input o textarea con placeholder
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translation;
            } else {
                // Para textos, mantener el HTML si es necesario
                el.innerHTML = translation;
            }
        }
    });
    
    // Cambiar el atributo lang en la etiqueta html para SEO y accesibilidad
    document.documentElement.lang = lang;
}
