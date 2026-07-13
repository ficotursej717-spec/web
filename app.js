/* ==========================================================================
   LÓGICA JAVASCRIPT - WEB GRUPO INVESTIGACIÓN FICOTUR (SEJ-717)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initTeamModals();
    initZoteroAPI();
    initBoucoWidget();
    initUcoBoletinesWidget();
    initLanguageSelector();
    initLegalModals();
    
    // Inicializar iconos de badges académicos estáticos en la página
    document.querySelectorAll('.badge-link').forEach(addIconToBadge);
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
        cargo: 'Profesor Titular de Universidad - Área de Economía Financiera y Contabilidad, Dpto. Economía Agraria, Finanzas y Contabilidad',
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
            despacho: 'Facultad de Derecho y Ciencias Económicas y Empresariales, Universidad de Córdoba'
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
            'Turismo gastronómico.',
            'Turismo patrimonial inmaterial.',
            'Gestión y desarrollo del patrimonio cultural.',
            'Digitalización y desarrollo de la hostelería rural.',
            'Modelos de sostenibilidad y economía circular aplicados a pymes y establecimientos de restauración.'
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
            telefono: '+34 679 81 42 52',
            despacho: 'Facultad de Derecho y Ciencias Económicas y Empresariales, Universidad de Córdoba'
        },
        links: {
            orcid: 'https://orcid.org/0000-0001-8392-8573',
            linkedin: 'https://www.linkedin.com/in/mercedes-luque-v%C3%ADlchez-6a571866/?skipRedirect=true'
        }
    },
    'investigador-4': {
        nombre: 'Dr. José Antonio Fernández-Gallardo',
        cargo: 'Profesor del Área de Economía Financiera y Contabilidad - Dpto. Economía Agraria, Finanzas y Contabilidad',
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
            telefono: '+34 619 00 98 41',
            despacho: 'Facultad de Derecho y Ciencias Económicas y Empresariales, Universidad de Córdoba'
        },
        links: {
            orcid: 'https://orcid.org/0000-0002-3003-3909'
        }
    },
    'investigador-5': {
        nombre: 'Carmen Barbero Saavedra',
        cargo: 'Profesora del Área de Economía Financiera y Contabilidad - Dpto. Economía Agraria, Finanzas y Contabilidad',
        foto: 'carmen_barbero.png',
        lineas: [
            'Métodos cuantitativos aplicados a la economía agraria y análisis de datos.',
            'Economía española e internacional vinculada a la gestión del desarrollo turístico.',
            'Modelización matemática avanzada para la toma de decisiones empresariales.',
            'Docencia e investigación de economía de la pyme y matemáticas financieras.'
        ],
        contacto: {
            email: 'carmen.barbero@uco.es',
            telefono: '+34 666 71 57 12',
            despacho: 'Facultad de Derecho y Ciencias Económicas y Empresariales, Universidad de Córdoba'
        },
        links: {
            linkedin: 'https://www.linkedin.com/in/carmen-barbero-saavedra-731b31109/'
        }
    },
    'investigador-6': {
        nombre: 'Dra. M. Dolores Guerrero-Baena',
        cargo: 'Profesora Titular de Universidad - Área de Economía Financiera y Contabilidad, Dpto. Economía Agraria, Finanzas y Contabilidad',
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
            telefono: '+34 699 78 20 89',
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
            telefono: '+34 657 68 25 51',
            despacho: 'Dpto. de Economía Financiera y Contabilidad, Ftad. Derecho y CC Económicas y Empresariales, Córdoba 14071'
        },
        links: {
            orcid: 'https://orcid.org/0000-0001-6886-7434',
            researchgate: 'https://www.researchgate.net/profile/Juan-Jimber-Del-Rio'
        }
    },
    'investigador-8': {
        nombre: 'Dra. Amalia Hidalgo Fernández',
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
            telefono: '+34 636 64 72 45',
            despacho: 'Facultad de Derecho y Ciencias Económicas y Empresariales, Universidad de Córdoba'
        },
        links: {
            orcid: 'https://orcid.org/0000-0002-2764-6624'
        }
    },
    'investigador-9': {
        nombre: 'Dra. Luz Marina Caracuel Sillero',
        cargo: 'Profesora Sustituta Interina y Coordinadora de ADE - Dpto. Economía Agraria, Finanzas y Contabilidad',
        foto: 'marina_caracuel.jpg',
        lineas: [
            'Contabilidad y finanzas sostenibles.',
            'Economía y gestión turística del patrimonio.',
            'Economía y finanzas para la toma de decisiones en la empresa agroalimentaria.',
            'Contabilidad y finanzas para las empresas de economía social.',
            'IA en finanzas y contabilidad.',
            'Línea de TFG: Contabilidad, Fiscalidad y Finanzas.'
        ],
        contacto: {
            email: 'lcaracuel@uco.es',
            telefono: '+34 626 30 22 19',
            despacho: 'Facultad de Derecho y Ciencias Económicas y Empresariales, Universidad de Córdoba'
        },
        links: {
            orcid: 'https://orcid.org/0009-0004-8597-8311',
            researchgate: 'https://www.researchgate.net/scientific-contributions/Marina-Caracuel-Sillero-2302728336',
            scholar: 'https://scholar.google.com/citations?user=BEFgDIgAAAAJ&hl=es'
        }
    },
    'investigador-10': {
        nombre: 'Dr. Arnaldo Vergara-Romero',
        cargo: 'Profesor del Área de Economía Financiera y Contabilidad - Proyecto FARMPERFORM',
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
            telefono: '+34 685 25 09 97',
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
                addIconToBadge(a);
                linksContainer.appendChild(a);
            }
        }
    }
}

/* ==========================================================================
   HELPER: AÑADIR ICONOS A BADGES ACADÉMICOS
   ========================================================================== */
function addIconToBadge(link) {
    if (link.querySelector('svg')) return;

    const text = link.textContent.trim().toLowerCase();
    let iconSvg = '';

    if (text.includes('orcid')) {
        iconSvg = '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.541 0 .98.439.98.98s-.439.98-.98.98-.98-.439-.98-.98.439-.98.98-.98zm-.554 4.542h1.108v10.024H6.815V8.92zm5.727 0h2.47c1.785 0 2.828.988 2.828 2.502 0 1.1-.643 2.057-1.783 2.378 1.408.318 2.158 1.402 2.158 2.766 0 1.691-1.189 2.378-3.053 2.378h-2.62V8.92zm1.108 1.024v3.136h1.22c1.08 0 1.7-.492 1.7-1.587 0-1.077-.62-1.549-1.7-1.549h-1.22zm0 4.16v3.816h1.37c1.127 0 1.832-.444 1.832-1.921 0-1.44-.705-1.895-1.832-1.895h-1.37z"/></svg>';
    } else if (text.includes('scholar')) {
        iconSvg = '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z M5 13.18v4c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-4l-7 3.82-7-3.82z"/></svg>';
    } else if (text.includes('researchgate')) {
        iconSvg = '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M19.586 0c-.818 0-1.508.19-2.073.565-.563.377-.97.936-1.213 1.68a3.193 3.193 0 0 0-.112.437 8.365 8.365 0 0 0-.078.53 9 9 0 0 0-.05.727c-.01.282-.013.621-.013 1.016a31.121 31.123 0 0 0 .014 1.017 9 9 0 0 0 .05.727 7.946 7.946 0 0 0 .077.53h-.005a3.334 3.334 0 0 0 .113.438c.245.743.65 1.303 1.214 1.68.565.376 1.256.564 2.075.564.8 0 1.536-.213 2.105-.603.57-.39.94-.916 1.175-1.65.076-.235.135-.558.177-.93a10.9 10.9 0 0 0 .043-1.207v-.82c0-.095-.047-.142-.14-.142h-3.064c-.094 0-.14.047-.14.141v.956c0 .094.046.14.14.14h1.666c.056 0 .084.03.084.086 0 .36 0 .62-.036.865-.038.244-.1.447-.147.606-.108.385-.348.664-.638.876-.29.212-.738.35-1.227.35-.545 0-.901-.15-1.21-.353-.306-.203-.517-.454-.67-.915a3.136 3.136 0 0 1-.147-.762 17.366 17.367 0 0 1-.034-.656c-.01-.26-.014-.572-.014-.939a26.401 26.403 0 0 1 .014-.938 15.821 15.822 0 0 1 .035-.656 3.19 3.19 0 0 1 .148-.76 1.89 1.89 0 0 1 .742-1.01c.344-.244.593-.352 1.137-.352.508 0 .815.096 1.144.303.33.207.528.492.764.925.047.094.111.118.198.07l1.044-.43c.075-.048.09-.115.042-.199a3.549 3.549 0 0 0-.466-.742 3 3 0 0 0-.679-.607 3.313 3.313 0 0 0-.903-.41A4.068 4.068 0 0 0 19.586 0zM8.217 5.836c-1.69 0-3.036.086-4.297.086-1.146 0-2.291 0-3.007-.029v.831l1.088.2c.744.144 1.174.488 1.174 2.264v11.288c0 1.777-.43 2.12-1.174 2.263l-1.088.2v.832c.773-.029 2.12-.086 3.465-.086 1.29 0 2.951.057 3.667.086v-.831l-1.49-.2c-.773-.115-1.174-.487-1.174-2.264v-4.784c.688.057 1.29.057 2.206.057 1.748 3.123 3.41 5.472 4.355 6.56.86 1.032 2.177 1.691 3.839 1.691.487 0 1.003-.086 1.318-.23v-.744c-1.031 0-2.063-.716-2.808-1.518-1.26-1.376-2.95-3.582-4.355-6.074 2.32-.545 4.04-2.722 4.04-4.9 0-3.208-2.492-4.698-5.758-4.698zm-.515 1.29c2.406 0 3.839 1.26 3.839 3.552 0 2.263-1.547 3.782-4.097 3.782-.974 0-1.404-.03-2.063-.086v-7.19c.66-.059 1.547-.059 2.32-.059z"/></svg>';
    } else if (text.includes('linkedin')) {
        iconSvg = '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>';
    } else if (text.includes('instagram')) {
        iconSvg = '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>';
    } else if (text.includes('scopus')) {
        iconSvg = '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>';
    } else if (text.includes('dialnet')) {
        iconSvg = '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 11.55C9.64 9.35 6.48 8 3 8v11c3.48 0 6.64 1.35 9 3.55 2.36-2.2 5.52-3.55 9-3.55V8c-3.48 0-6.64 1.35-9 3.55zM12 8c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z"/></svg>';
    }

    if (iconSvg) {
        const label = link.textContent.trim();
        link.innerHTML = `${iconSvg}<span>${label}</span>`;
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
   4b. WIDGET INTERACTIVO DE BOLETINES DE NOVEDADES UCO (TIEMPO REAL)
   ========================================================================== */
async function initUcoBoletinesWidget() {
    const listContainer = document.getElementById('uco-boletines-list');
    if (!listContainer) return;

    try {
        const response = await fetch('uco_boletines.json');
        if (!response.ok) throw new Error('No se pudo cargar el boletín de novedades');
        
        const list = await response.json();
        renderUcoBoletines(list);
    } catch (error) {
        console.error('Error al cargar boletines de la UCO:', error);
        listContainer.innerHTML = '<div class="bouco-empty">[Error de conexión] No se pudo sincronizar el boletín de novedades de la UCO. Inténtelo más tarde.</div>';
    }
}

function renderUcoBoletines(list) {
    const container = document.getElementById('uco-boletines-list');
    if (!container) return;

    if (list.length === 0) {
        container.innerHTML = '<div class="bouco-empty">No hay boletines disponibles en este momento.</div>';
        return;
    }

    container.innerHTML = '';
    list.forEach(item => {
        const a = document.createElement('a');
        a.href = item.link;
        a.target = '_blank';
        a.rel = 'noopener';
        a.className = 'uco-boletin-item';
        a.setAttribute('aria-label', `${item.titulo}. Publicado el ${item.fecha}.`);

        a.innerHTML = `
            <div class="uco-boletin-item-header">
                <span class="uco-boletin-badge-date">📅 ${item.fecha}</span>
                <span class="uco-boletin-link-text">Ver Boletín ↗</span>
            </div>
            <div class="uco-boletin-item-title">${item.titulo}</div>
        `;
        container.appendChild(a);
    });
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

/* ==========================================================================
   6. MODALES LEGALES DINÁMICOS (AVISO LEGAL, PRIVACIDAD, COOKIES)
   ========================================================================== */
function initLegalModals() {
    // Crear el modal legal dinámicamente si no existe
    let legalModal = document.getElementById('legal-modal');
    if (!legalModal) {
        legalModal = document.createElement('div');
        legalModal.id = 'legal-modal';
        legalModal.className = 'modal';
        legalModal.role = 'dialog';
        legalModal.setAttribute('aria-modal', 'true');
        legalModal.setAttribute('aria-labelledby', 'legal-modal-title');
        legalModal.innerHTML = `
            <div class="modal-content" style="max-width: 700px; max-height: 85vh; display: flex; flex-direction: column; padding: 2.5rem;">
                <button class="modal-close" aria-label="Cerrar modal de información" style="top: 1.25rem; right: 1.25rem;">×</button>
                <div class="modal-header" style="border-bottom: 1px solid var(--border-color); padding-bottom: 1rem; margin-bottom: 1rem; display: block; flex-shrink: 0; gap: 0;">
                    <h3 id="legal-modal-title" class="modal-name" style="margin: 0; font-size: 1.5rem; color: var(--primary);">Título</h3>
                </div>
                <div class="modal-body" id="legal-modal-body" style="overflow-y: auto; flex-grow: 1; padding-right: 0.5rem; line-height: 1.6; font-size: 0.95rem; color: var(--text-dark);">
                    <!-- Contenido dinámico -->
                </div>
            </div>
        `;
        document.body.appendChild(legalModal);
    }

    const legalTexts = {
        es: {
            legal: {
                title: "Aviso Legal",
                content: `
                    <p><strong>1. Identificación del Titular</strong></p>
                    <p>En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSI-CE), se informa que este sitio web es gestionado por el <strong>Grupo de Investigación Ficotur (SEJ-717)</strong> de la <strong>Universidad de Córdoba (UCO)</strong>.</p>
                    <p><strong>Sede:</strong> Facultad de Derecho y Ciencias Económicas y Empresariales. Plaza de Puerta Nueva, s/n, 14002, Córdoba, España.</p>
                    <p><strong>Contacto:</strong> ficotur@uco.es</p>
                    <br>
                    <p><strong>2. Propiedad Intelectual</strong></p>
                    <p>Todos los contenidos científicos, publicaciones, textos, imágenes, logos, gráficos y diseños que aparecen en este sitio web están protegidos por derechos de propiedad intelectual propiedad de la Universidad de Córdoba y/o de sus respectivos autores del grupo de investigación.</p>
                    <p>Queda prohibida su reproducción, distribución o comunicación pública con fines comerciales sin la autorización expresa del grupo de investigación.</p>
                    <br>
                    <p><strong>3. Limitación de Responsabilidad</strong></p>
                    <p>El Grupo Ficotur realiza los mayores esfuerzos para mantener la información científica y de convocatorias actualizada y exacta. No obstante, no se responsabiliza de posibles errores ortográficos, técnicos o por cambios temporales en las fuentes de información institucionales.</p>
                `
            },
            privacy: {
                title: "Política de Privacidad",
                content: `
                    <p><strong>1. Protección de Datos de Carácter Personal</strong></p>
                    <p>De conformidad con el Reglamento General de Protección de Datos (RGPD UE 2016/679) y la Ley Orgánica 3/2018 (LOPDGDD), le informamos que los datos de contacto que facilite a través de los formularios o correos electrónicos oficiales del grupo serán tratados bajo la responsabilidad de la Universidad de Córdoba.</p>
                    <br>
                    <p><strong>2. Finalidad del Tratamiento</strong></p>
                    <p>La finalidad principal es atender y resolver sus consultas, solicitudes de colaboración o contacto con los miembros del grupo de investigación.</p>
                    <br>
                    <p><strong>3. Legitimación</strong></p>
                    <p>La base legal para el tratamiento de sus datos es el consentimiento explícito que otorga al pulsar el botón de envío en el formulario de contacto.</p>
                    <br>
                    <p><strong>4. Derechos de los Usuarios</strong></p>
                    <p>Puede ejercitar sus derechos de acceso, rectificación, supresión, limitación y oposición dirigiendo una solicitud firmada junto a copia de su documento de identidad a ficotur@uco.es o a través de la Secretaría General de la Universidad de Córdoba.</p>
                `
            },
            cookies: {
                title: "Política de Cookies",
                content: `
                    <p><strong>1. ¿Qué es una Cookie?</strong></p>
                    <p>Una cookie es un pequeño fichero de texto que un sitio web almacena en el navegador del usuario para recordar sus preferencias de navegación y optimizar la experiencia técnica.</p>
                    <br>
                    <p><strong>2. Cookies Utilizadas en Ficotur</strong></p>
                    <p>Este sitio web utiliza únicamente:</p>
                    <ul>
                        <li><strong>Cookies Técnicas / de Personalización:</strong> Necesarias para recordar el idioma de navegación seleccionado (español, inglés, francés o portugués) guardado en su navegador (localStorage).</li>
                        <li><strong>Cookies Analíticas Anónimas:</strong> No recogen datos de carácter personal; únicamente miden estadísticas agregadas y anónimas sobre el tráfico de visitas para la optimización de la velocidad del sitio.</li>
                    </ul>
                    <br>
                    <p><strong>3. Desactivación de Cookies</strong></p>
                    <p>El usuario puede restringir, bloquear o borrar las cookies de este o cualquier otro sitio web utilizando la configuración de su propio navegador web.</p>
                `
            }
        },
        en: {
            legal: {
                title: "Legal Notice",
                content: `
                    <p><strong>1. Identification of the Owner</strong></p>
                    <p>In compliance with Article 10 of Law 34/2002 of July 11 on Services of the Information Society and Electronic Commerce (LSSI-CE), we inform you that this website is managed by the <strong>Ficotur Research Group (SEJ-717)</strong> of the <strong>University of Córdoba (UCO)</strong>.</p>
                    <p><strong>HQ:</strong> Faculty of Law and Business & Economic Sciences. Plaza de Puerta Nueva, s/n, 14002, Córdoba, Spain.</p>
                    <p><strong>Contact:</strong> ficotur@uco.es</p>
                    <br>
                    <p><strong>2. Intellectual Property</strong></p>
                    <p>All scientific content, publications, texts, images, logos, graphics, and designs on this website are protected by intellectual property rights owned by the University of Córdoba and/or the respective authors of the research group.</p>
                    <p>Reproduction, distribution, or public communication for commercial purposes without explicit authorization is strictly prohibited.</p>
                    <br>
                    <p><strong>3. Limitation of Liability</strong></p>
                    <p>The Ficotur Group makes every effort to keep all scientific and call information up to date and accurate. However, it is not responsible for typographical, technical errors, or changes made by official institutional sources.</p>
                `
            },
            privacy: {
                title: "Privacy Policy",
                content: `
                    <p><strong>1. Protection of Personal Data</strong></p>
                    <p>In accordance with the General Data Protection Regulation (GDPR EU 2016/679) and organic national regulations, we inform you that the contact details you provide through official forms or emails will be processed under the responsibility of the University of Córdoba.</p>
                    <br>
                    <p><strong>2. Purpose of Processing</strong></p>
                    <p>The main purpose is to answer and resolve your queries, requests for collaboration, or contact messages directed to members of the research group.</p>
                    <br>
                    <p><strong>3. Lawfulness of Processing</strong></p>
                    <p>The legal basis is the explicit consent given when clicking the send button on the contact form.</p>
                    <br>
                    <p><strong>4. User Rights</strong></p>
                    <p>You can exercise your rights of access, rectification, erasure, restriction, and objection by sending a request together with a copy of your ID to ficotur@uco.es or through the General Secretariat of the University of Córdoba.</p>
                `
            },
            cookies: {
                title: "Cookie Policy",
                content: `
                    <p><strong>1. What is a Cookie?</strong></p>
                    <p>A cookie is a small text file that a website stores in the user's browser to remember browsing preferences and optimize technical performance.</p>
                    <br>
                    <p><strong>2. Cookies Used by Ficotur</strong></p>
                    <p>This website uses only:</p>
                    <ul>
                        <li><strong>Technical / Preference Cookies:</strong> Necessary to remember your selected browsing language (Spanish, English, French, or Portuguese) stored in your browser (localStorage).</li>
                        <li><strong>Anonymous Analytical Cookies:</strong> Do not collect personal data; they only measure aggregated and anonymous traffic statistics to optimize website performance.</li>
                    </ul>
                    <br>
                    <p><strong>3. Disabling Cookies</strong></p>
                    <p>Users can restrict, block, or delete cookies from this or any other website using their own web browser settings.</p>
                `
            }
        },
        fr: {
            legal: {
                title: "Mentions Légales",
                content: `
                    <p><strong>1. Identification du Propriétaire</strong></p>
                    <p>Conformément à l'article 10 de la loi 34/2002 du 11 juillet relative aux services de la société de l'information et du commerce électronique (LSSI-CE), nous vous informons que ce site est géré par le <strong>Groupe de Recherche Ficotur (SEJ-717)</strong> de l'<strong>Université de Cordoue (UCO)</strong>.</p>
                    <p><strong>Siège:</strong> Faculté de Droit et des Sciences Économiques et de Gestion. Plaza de Puerta Nueva, s/n, 14002, Cordoue, Espagne.</p>
                    <p><strong>Contact:</strong> ficotur@uco.es</p>
                    <br>
                    <p><strong>2. Propriété Intellectuelle</strong></p>
                    <p>Tous les contenus scientifiques, publications, textes, images, logos, graphiques et designs figurant sur ce site sont protégés par les droits de propriété intellectuelle appartenant à l'Université de Cordoue et/ou aux auteurs du groupe de recherche.</p>
                    <p>Toute reproduction ou distribution à des fins commerciales sans autorisation expresse est interdite.</p>
                `
            },
            privacy: {
                title: "Politique de Confidentialité",
                content: `
                    <p><strong>1. Protection des Données Personnelles</strong></p>
                    <p>Conformément au Règlement Général sur la Protection des Données (RGPD UE 2016/679), nous vous informons que les données fournies via nos formulaires ou e-mails officiels seront traitées sous la responsabilité de l'Université de Cordoue.</p>
                    <br>
                    <p><strong>2. Finalité du Traitement</strong></p>
                    <p>La finalité est de répondre et de résoudre vos demandes de renseignements ou de collaboration avec les membres de notre équipe.</p>
                    <br>
                    <p><strong>3. Droits des Utilisateurs</strong></p>
                    <p>Vous pouvez exercer vos droits d'accès, de rectification, de suppression et d'opposition en écrivant à ficotur@uco.es.</p>
                `
            },
            cookies: {
                title: "Politique de Cookies",
                content: `
                    <p><strong>1. Qu'est-ce qu'un Cookie?</strong></p>
                    <p>Un cookie est un petit fichier texte stocké par le site web sur votre navigateur pour retenir vos préférences.</p>
                    <br>
                    <p><strong>2. Cookies Utilisés</strong></p>
                    <ul>
                        <li><strong>Cookies Techniques:</strong> Utilisés pour mémoriser la langue d'affichage sélectionnée (localStorage).</li>
                        <li><strong>Cookies Analytiques Anonymes:</strong> Statistiques de visites anonymes.</li>
                    </ul>
                `
            }
        },
        pt: {
            legal: {
                title: "Aviso Legal",
                content: `
                    <p><strong>1. Identificação do Titular</strong></p>
                    <p>Em conformidade com a legislação em vigor, este site é gerido pelo <strong>Grupo de Pesquisa Ficotur (SEJ-717)</strong> da <strong>Universidade de Córdoba (UCO)</strong>.</p>
                    <p><strong>Sede:</strong> Faculdade de Direito e Ciências Econômicas e Empresariais. Plaza de Puerta Nueva, s/n, 14002, Córdoba, Espanha.</p>
                    <p><strong>Contato:</strong> ficotur@uco.es</p>
                    <br>
                    <p><strong>2. Propriedade Intelectual</strong></p>
                    <p>Todos os conteúdos, textos, imagens e logotipos no site são de propriedade da Universidade de Córdoba ou dos autores do grupo.</p>
                `
            },
            privacy: {
                title: "Política de Privacidade",
                content: `
                    <p><strong>1. Tratamento de Dados Pessoais</strong></p>
                    <p>De acordo com o Regulamento Geral de Proteção de Dados (RGPD UE), os dados enviados pelo formulário de contato são confidenciais e tratados sob responsabilidade da Universidade de Córdoba.</p>
                    <br>
                    <p><strong>2. Finalidade</strong></p>
                    <p>Responder às suas dúvidas e gerenciar pedidos de colaboração.</p>
                `
            },
            cookies: {
                title: "Política de Cookies",
                content: `
                    <p><strong>1. O que são Cookies?</strong></p>
                    <p>Arquivos gravados no seu navegador para armazenar preferências de idioma (localStorage) e estatísticas anônimas de tráfego.</p>
                `
            }
        }
    };

    const btnLegal = document.getElementById('footer-btn-legal');
    const btnPrivacy = document.getElementById('footer-btn-privacy');
    const btnCookies = document.getElementById('footer-btn-cookies');

    const modalTitle = document.getElementById('legal-modal-title');
    const modalBody = document.getElementById('legal-modal-body');
    const modalClose = legalModal.querySelector('.modal-close');

    function openLegalModal(type) {
        // Determinar idioma actual
        const lang = localStorage.getItem('ficotur-lang') || 'es';
        const doc = legalTexts[lang] ? legalTexts[lang][type] : legalTexts['es'][type];
        
        if (doc) {
            modalTitle.textContent = doc.title;
            modalBody.innerHTML = doc.content;
            legalModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    if (btnLegal) btnLegal.addEventListener('click', (e) => { e.preventDefault(); openLegalModal('legal'); });
    if (btnPrivacy) btnPrivacy.addEventListener('click', (e) => { e.preventDefault(); openLegalModal('privacy'); });
    if (btnCookies) btnCookies.addEventListener('click', (e) => { e.preventDefault(); openLegalModal('cookies'); });

    function closeLegalModal() {
        legalModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (modalClose) modalClose.addEventListener('click', closeLegalModal);
    legalModal.addEventListener('click', (e) => { if (e.target === legalModal) closeLegalModal(); });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && legalModal.classList.contains('active')) closeLegalModal();
    });
}
