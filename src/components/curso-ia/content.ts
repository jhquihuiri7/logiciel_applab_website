/**
 * Contenido editable de la landing /curso-ia.
 *
 * Fuente del programa: kit docente «Taller virtual IA administrativa — 5 días,
 * Google Meet» (versión del 14 de octubre de 2026).
 */

export type CourseImage = {
  /** Ruta dentro de /public, p. ej. "/images/curso-ia/hero.webp". */
  src: string;
  alt: string;
};

/** Un día del programa de capacitación. */
export type CourseModule = {
  /** Identificador para el enlace #temario-<slug>. */
  slug: string;
  day: string;
  /** Día de la semana, p. ej. "Lunes". */
  focus: string;
  title: string;
  duration: string;
  /** Foto de la tarjeta (apaisada 1.38:1, con la esquina superior izquierda libre para la etiqueta "Día"). */
  image: CourseImage;
  /** Contenidos del día; su número se calcula a partir de esta lista. */
  syllabus: string[];
  workshop: string;
  product: string;
};
type Step = { title: string; minutes: number; share: number; text: string };
type FooterLink = { label: string; href: string };
/** Dato clave del hero; con `href` se puede pulsar. */
type Fact = { value: string; label: string; href?: string };
type Faq = { question: string; answer: string };
type ExamplePrompt = { label: string; title: string; text: string; slug: string };
/** `logo`: ícono oficial dentro de /public; `href`: sitio oficial de la herramienta. */
type Tool = { name: string; text: string; logo: string; href: string };
type TeamMember = { name: string; initials: string; role: string; bio: string; topics: string[] };
type LegalDoc = { title: string; updated: string; sections: { heading: string; body: string }[] };

/** Nombre provisional de la marca del curso. */
export const BRAND = "LogicielAi";

export const COURSE = {
  name: "Taller virtual de IA aplicada a la gestión administrativa y la ofimática",
  audience: "Personal administrativo, técnico y directivo con experiencia digital básica.",
  days: 5,
  hours: 10,
  dailyHours: 2,
  practice: 70,
  prompts: 30,
  /** Precio del curso completo; déjalo en null para pedir que consulten. */
  price: "$50" as string | null,
  objective:
    "Elaborar, analizar y verificar productos administrativos con apoyo de la inteligencia artificial: informes, oficios, correos, actas desde audio, indicadores en hojas de cálculo y presentaciones, con un uso responsable y seguro de estas herramientas.",
} as const;

/** Colores de acento: se aplican como variables CSS (--ia-accent, --ia-accent-soft). */
export const THEME = {
  accent: "#9E06E4",
  accentSoft: "#C16BFF",
} as const;

/** Canales de contacto: los mismos del sitio principal de Logiciel AppLab. */
export const CHANNELS = {
  /** Número en formato internacional, sin "+" ni espacios. */
  whatsapp: "593997613568",
  /** Cómo se muestra el número en la página. */
  whatsappLabel: "+593 99 761 3568",
  email: "contacto@logicielapplab.com",
} as const;

export const whatsappUrl = (text: string) =>
  `https://wa.me/${CHANNELS.whatsapp}?text=${encodeURIComponent(text)}`;

export const mailtoUrl = (subject: string, body?: string) =>
  `mailto:${CHANNELS.email}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ""}`;

/**
 * Anclas que abren ventanas emergentes (ver dialogs.tsx). Funcionan desde
 * cualquier enlace de la página y también al compartir la URL: /curso-ia#inscripcion.
 */
export const DIALOG = {
  enroll: "inscripcion",
  syllabus: "temario",
  pricing: "inversion",
  faq: "preguntas-frecuentes",
} as const;

export const LINKS = {
  enroll: `#${DIALOG.enroll}`,
  syllabus: `#${DIALOG.syllabus}`,
  pricing: `#${DIALOG.pricing}`,
  faq: `#${DIALOG.faq}`,
  team: "#equipo",
  prompts: "#prompts",
  tools: "#herramientas",
} as const;

export const syllabusHref = (slug: string) => `#${DIALOG.syllabus}-${slug}`;
export const contentsLabel = (item: CourseModule) => `${item.syllabus.length} contenidos`;

/** Fotos del hero y de la sección de metodología. */
export const IMAGES: { hero: CourseImage; mentor: CourseImage } = {
  hero: {
    src: "/images/curso-ia/hero.webp",
    alt: "Profesional sonriente sosteniendo una tableta sobre fondo lavanda",
  },
  mentor: {
    src: "/images/curso-ia/instructor.webp",
    alt: "Clase en vivo: una persona explica el tema frente a su portátil",
  },
};

export const NAV_SECTIONS: FooterLink[] = [
  { label: "Programa", href: "#modulos" },
  { label: "Metodología", href: "#metodologia" },
  { label: "Equipo docente", href: LINKS.team },
  { label: "Ejemplos de prompts", href: LINKS.prompts },
  { label: "Herramientas", href: LINKS.tools },
  { label: "Inversión", href: LINKS.pricing },
  { label: "Preguntas frecuentes", href: LINKS.faq },
  { label: "Contacto", href: "#contacto" },
];

export const HERO: {
  badge: string;
  badgeText: string;
  title: [string, string];
  description: string;
  primaryCta: string;
  /** Botón con ícono de reproducir: abre el programa completo. */
  secondaryCta: string;
  secondaryHref: string;
  facts: Fact[];
} = {
  badge: "Nuevo",
  badgeText: "Inscripciones abiertas",
  title: ["Domina la IA", "Optimiza tu gestión"],
  description:
    "Taller virtual en vivo por Google Meet: aprende a usar ChatGPT, Gemini, Claude, Qwen y DeepSeek junto con Google Docs, Sheets y Slides para redactar documentos, convertir audios en actas, analizar datos y presentar resultados verificables.",
  primaryCta: "Inscríbete",
  secondaryCta: "Ver programa",
  secondaryHref: LINKS.syllabus,
  facts: [
    { value: `${COURSE.days} días`, label: "Lunes a viernes" },
    { value: `${COURSE.hours} horas`, label: `${COURSE.dailyHours} horas al día` },
    { value: `${COURSE.practice} %`, label: "Práctica guiada" },
    ...(COURSE.price ? [{ value: COURSE.price, label: "Curso completo", href: LINKS.pricing }] : []),
  ],
};

export const MODULES: {
  title: string[];
  objectiveLabel: string;
  description: string;
  audienceLabel: string;
  audience: string;
  cta: string;
  ctaHref: string;
  workshopLabel: string;
  productLabel: string;
  items: CourseModule[];
} = {
  title: ["Programa de capacitación:", "5 días, un producto por día."],
  objectiveLabel: "Objetivo general",
  description: COURSE.objective,
  audienceLabel: "Dirigido a",
  audience: COURSE.audience,
  cta: "Ver programa completo",
  ctaHref: LINKS.syllabus,
  workshopLabel: "Taller práctico",
  productLabel: "Producto",
  items: [
    {
      slug: "fundamentos",
      day: "01",
      focus: "Lunes",
      title: "Primeros pasos con IA, acceso a herramientas y prompts",
      duration: "2 horas",
      image: {
        src: "/images/curso-ia/dia-01.webp",
        alt: "Profesional escribiendo en su portátil junto a un cuaderno de notas",
      },
      syllabus: [
        "Qué es la IA generativa y cómo usarla con responsabilidad.",
        "Ingreso guiado a ChatGPT, Gemini, Claude, Qwen y DeepSeek desde el navegador.",
        "Construcción del prompt con la fórmula R-O-C-I-F-V: rol, objetivo, contexto, insumos, formato y verificación.",
        "Mejora iterativa: de una consigna vaga a un prompt estructurado.",
        "Práctica supervisada de redacción, detección de vacíos y extracción de hechos.",
        "Comparación crítica de respuestas entre asistentes de IA.",
      ],
      workshop:
        "Aplicar los prompts de redacción, detección de vacíos y extracción sobre antecedentes ficticios, resaltar los datos que la IA no pudo comprobar y comparar dos respuestas.",
      product: "5 prompts reutilizables y una comparación sustentada entre dos respuestas.",
    },
    {
      slug: "redaccion",
      day: "02",
      focus: "Martes",
      title: "Informes, memorandos, oficios y correos institucionales",
      duration: "2 horas",
      image: {
        src: "/images/curso-ia/dia-02.webp",
        alt: "Profesional corrigiendo un documento impreso junto a su portátil",
      },
      syllabus: [
        "Lectura crítica del caso: qué está confirmado y qué queda [POR CONFIRMAR].",
        "Informe de seguimiento con antecedentes, resultados y evidencias.",
        "Oficio y memorando: estructura y diferencias de uso.",
        "Correo institucional breve, específico y verificable.",
        "Revisión y resumen de documentos extensos con Claude.",
        "Edición y formato del documento en Google Docs o Word.",
        "Control de calidad cruzado del borrador.",
      ],
      workshop:
        "Convertir los antecedentes del caso ficticio de la Institución Alfa en un informe, un oficio o memorando y un correo, sin inventar números, firmas ni normas.",
      product: "Expediente con informe, oficio o memorando y correo revisados.",
    },
    {
      slug: "actas",
      day: "03",
      focus: "Miércoles",
      title: "De audio a transcripción, acta y matriz de compromisos",
      duration: "2 horas",
      image: {
        src: "/images/curso-ia/dia-03.webp",
        alt: "Profesional con audífonos transcribiendo un audio en su portátil",
      },
      syllabus: [
        "Consentimiento y reglas: audio simulado frente a grabaciones reales.",
        "Escucha de la reunión e identificación de acuerdos y temas no aprobados.",
        "Carga del audio en Gemini y transcripción, con respaldo en texto.",
        "Revisión de la transcripción: nombres, fechas y negaciones.",
        "Elaboración del borrador de acta.",
        "Matriz de compromisos con responsables y plazos.",
        "Correo de seguimiento y auditoría del acta.",
      ],
      workshop:
        "Transcribir el audio de una reunión simulada de unos cinco minutos y elaborar el acta, la matriz de cuatro compromisos y el correo de seguimiento, sin registrar como aprobado lo que solo se propuso.",
      product: "Transcripción cotejada, borrador de acta, matriz de 4 compromisos y correo de seguimiento.",
    },
    {
      slug: "excel",
      day: "04",
      focus: "Jueves",
      title: "Excel, Sheets, datos, indicadores, gráficos y formularios",
      duration: "2 horas",
      image: {
        src: "/images/curso-ia/dia-04.webp",
        alt: "Profesional señalando una hoja de cálculo con gráficos en su portátil",
      },
      syllabus: [
        "Importación de una base de 30 registros a Google Sheets.",
        "Revisión de la calidad de los datos sin borrar registros.",
        "Fórmulas de avance protegidas contra división por cero.",
        "Indicadores, tabla resumen y gráfico por isla.",
        "Interpretación ejecutiva de los resultados.",
        "Formulario de seguimiento en Google Forms.",
      ],
      workshop:
        "Trabajar con una base ficticia de 30 actividades en tres islas: calcular el avance global (suma de ejecutado sobre suma de metas), crear el gráfico por isla y un formulario de 8 preguntas.",
      product: "Hoja con indicadores, gráfico por isla y formulario de seguimiento.",
    },
    {
      slug: "presentaciones",
      day: "05",
      focus: "Viernes",
      title: "Presentaciones y expediente administrativo integrador",
      duration: "2 horas",
      image: {
        src: "/images/curso-ia/dia-05.webp",
        alt: "Profesional presentando un gráfico de barras en una pantalla",
      },
      syllabus: [
        "Planificación del proyecto final por dependencias.",
        "Acta, compromisos y comunicaciones consistentes entre sí.",
        "Indicadores rastreables en el informe.",
        "Presentación ejecutiva de 5 diapositivas en Google Slides.",
        "Microexposiciones de 90 segundos.",
        "Evaluación con rúbrica y prueba final.",
      ],
      workshop:
        "Integrar en un solo expediente los productos de la semana, basados en los mismos hechos y sin contradicciones, y presentarlos en una exposición breve.",
      product: "Expediente integrado (acta, matriz, informe, oficio o correo) y presentación ejecutiva de 5 diapositivas.",
    },
  ],
};

/** Distribución metodológica de cada sesión de 2 horas. */
export const METHODOLOGY: { title: string; cta: string; note: string; steps: Step[] } = {
  title: "Así es cada sesión de 2 horas en Google Meet",
  cta: "Inscríbete",
  note: "Distribución referencial; puede ajustarse según la complejidad de cada taller.",
  steps: [
    {
      title: "Explicación y demostración",
      minutes: 24,
      share: 20,
      text: "El equipo docente comparte pantalla y demuestra la herramienta y los prompts del día con el caso ficticio.",
    },
    {
      title: "Ejercicios guiados",
      minutes: 84,
      share: 70,
      text: "Replicas cada paso en tu navegador y resuelves el taller del día, con apoyo por chat o por voz durante toda la práctica.",
    },
    {
      title: "Retroalimentación y evaluación",
      minutes: 12,
      share: 10,
      text: "Verificas los resultados, recibes retroalimentación y guardas el producto del día en tu carpeta de Drive.",
    },
  ],
};

/**
 * Equipo docente (sección #equipo). Las biografías son PROVISIONALES:
 * reemplázalas por la experiencia real de cada docente antes de publicar.
 */
export const TEAM: { eyebrow: string; title: string[]; description: string; members: TeamMember[] } = {
  eyebrow: "Equipo docente",
  title: ["Quiénes guían", "el taller"],
  description:
    "Acompañan cada sesión en vivo, resuelven dudas durante la práctica y revisan los productos de la semana.",
  members: [
    {
      name: "Jhonatan Quihuiri",
      initials: "JQ",
      role: "IA aplicada y automatización de procesos",
      bio: "Desarrolla soluciones digitales y automatizaciones para equipos administrativos. En el taller guía el trabajo con prompts, la redacción de documentos institucionales y el uso responsable de la IA.",
      topics: ["Prompts", "Documentos institucionales", "Uso responsable"],
    },
    {
      name: "Jackson Bautista",
      initials: "JB",
      role: "Ofimática y análisis de datos",
      bio: "Acompaña a equipos administrativos en la organización de su información con Google Workspace y hojas de cálculo. En el taller guía las actas desde audio, los indicadores y las presentaciones.",
      topics: ["Actas desde audio", "Indicadores en Sheets", "Presentaciones"],
    },
  ],
};

/** Ejemplos de instrucciones (sección #prompts), tomados del banco de 30 prompts del curso. */
export const PROMPTS: {
  eyebrow: string;
  title: string[];
  description: string;
  copy: string;
  copied: string;
  copyError: string;
  dayLink: string;
  items: ExamplePrompt[];
} = {
  eyebrow: "Ejemplos de instrucciones",
  title: ["Prompts que aprenderás", "a utilizar"],
  description: `Tres de los ${COURSE.prompts} prompts del cuaderno del participante. Cópialos y pruébalos, siempre con datos ficticios.`,
  copy: "Copiar prompt",
  copied: "¡Copiado!",
  copyError: "No se pudo copiar",
  dayLink: "Se practica el día",
  items: [
    {
      label: "P07",
      title: "Informe técnico",
      slug: "redaccion",
      text: "Actúa como analista administrativo. Usando exclusivamente el caso ficticio adjunto y el archivo de registros, redacta un informe de seguimiento con antecedentes, objetivo, metodología, actividades, resultados, conclusiones, recomendaciones y anexos. Cada cifra debe poder calcularse desde la matriz. Para campos ausentes escribe [POR CONFIRMAR].",
    },
    {
      label: "P15",
      title: "Acta de reunión",
      slug: "actas",
      text: "Elabora un BORRADOR de acta de reunión con fecha, modalidad, asistentes, orden del día, desarrollo resumido, acuerdos, compromisos, observaciones y cierre. Utiliza únicamente la transcripción adjunta. Lo no identificado debe figurar [POR CONFIRMAR]. Incluye una alerta si se confunde propuesta con acuerdo.",
    },
    {
      label: "P22",
      title: "Indicadores de la matriz",
      slug: "excel",
      text: "Con la matriz de 30 registros, calcula número de actividades por isla, porcentaje de avance global (suma de ejecutado / suma de meta), gasto total y distribución por estado. Muestra explícitamente numeradores, denominadores y filtros; no promedies porcentajes individuales si no representan el indicador requerido.",
    },
  ],
};

/** Herramientas que utilizarán los participantes (sección #herramientas). */
export const TOOLS: {
  eyebrow: string;
  title: string[];
  description: string;
  assistantsTitle: string;
  assistants: Tool[];
  workspaceTitle: string;
  workspace: Tool[];
  note: string;
} = {
  eyebrow: "Herramientas",
  title: ["Herramientas que", "utilizarás"],
  description: "Todo se usa desde el navegador, en los sitios oficiales de cada herramienta: no necesitas instalar programas.",
  assistantsTitle: "Asistentes de IA",
  assistants: [
    {
      name: "ChatGPT",
      logo: "/images/curso-ia/herramientas/chatgpt.svg",
      href: "https://chatgpt.com/",
      text: "Redacción y mejora de documentos con prompts estructurados.",
    },
    {
      name: "Gemini",
      logo: "/images/curso-ia/herramientas/gemini.svg",
      href: "https://gemini.google.com/",
      text: "Transcripción del audio de la reunión simulada, cuando la cuenta permite cargar archivos.",
    },
    {
      name: "Claude",
      logo: "/images/curso-ia/herramientas/claude.svg",
      href: "https://claude.ai/",
      text: "Revisión y resumen de documentos extensos, y redacción con instrucciones detalladas.",
    },
    {
      name: "Qwen",
      logo: "/images/curso-ia/herramientas/qwen.svg",
      href: "https://chat.qwen.ai/",
      text: "Comparación crítica de respuestas frente a otros asistentes.",
    },
    {
      name: "DeepSeek",
      logo: "/images/curso-ia/herramientas/deepseek.svg",
      href: "https://chat.deepseek.com/",
      text: "Comparación de fidelidad, claridad y datos inventados en las respuestas.",
    },
  ],
  workspaceTitle: "Google Workspace",
  workspace: [
    {
      name: "Google Meet",
      logo: "/images/curso-ia/herramientas/meet.svg",
      href: "https://meet.google.com/",
      text: "Clases en vivo.",
    },
    {
      name: "Google Drive",
      logo: "/images/curso-ia/herramientas/drive.svg",
      href: "https://drive.google.com/",
      text: "Carpeta del curso por día.",
    },
    {
      name: "Google Docs",
      logo: "/images/curso-ia/herramientas/docs.svg",
      href: "https://docs.google.com/",
      text: "Informes, oficios y actas.",
    },
    {
      name: "Google Sheets",
      logo: "/images/curso-ia/herramientas/sheets.svg",
      href: "https://sheets.google.com/",
      text: "Indicadores y gráficos.",
    },
    {
      name: "Google Slides",
      logo: "/images/curso-ia/herramientas/slides.svg",
      href: "https://slides.google.com/",
      text: "Presentación final.",
    },
    {
      name: "Google Forms",
      logo: "/images/curso-ia/herramientas/forms.svg",
      href: "https://forms.google.com/",
      text: "Formulario de seguimiento.",
    },
  ],
  note: "No necesitas comprar suscripciones. Algunas funciones dependen del plan de cada cuenta, como subir audio a un asistente; cuando no estén disponibles, harás el mismo ejercicio con la transcripción de respaldo.",
};

export const CONTACT: {
  title: string[];
  whatsappCta: string;
  whatsappText: string;
  description: string;
  copyrightYear: number;
  linksTitle: string;
  links: FooterLink[];
  channelsTitle: string;
  channels: FooterLink[];
  legal: FooterLink[];
} = {
  title: ["Habla con", "el equipo docente"],
  whatsappCta: "Escríbenos por WhatsApp",
  whatsappText: `Hola, quiero información sobre el taller de IA de ${BRAND}.`,
  description: `${BRAND} es un taller virtual de inteligencia artificial aplicada a la gestión administrativa y la ofimática.`,
  copyrightYear: 2026,
  linksTitle: "El curso",
  links: [
    { label: "Programa", href: "#modulos" },
    { label: "Metodología", href: "#metodologia" },
    { label: "Equipo docente", href: LINKS.team },
    { label: "Herramientas", href: LINKS.tools },
    { label: "Inversión", href: LINKS.pricing },
    { label: "Preguntas frecuentes", href: LINKS.faq },
  ],
  channelsTitle: "Contacto",
  channels: [
    {
      label: `WhatsApp ${CHANNELS.whatsappLabel}`,
      href: whatsappUrl(`Hola, tengo una consulta sobre el taller de IA de ${BRAND}.`),
    },
    { label: CHANNELS.email, href: mailtoUrl(`Consulta sobre el taller de IA de ${BRAND}`) },
  ],
  legal: [
    { label: "Términos y condiciones", href: "#terminos" },
    { label: "Política de privacidad", href: "#privacidad" },
  ],
};

/** Formulario de inscripción: prepara un mensaje que el visitante envía por WhatsApp o correo. */
export const FORMS = {
  eyebrow: "Inscripción",
  title: "Reserva tu cupo",
  description: "Déjanos tus datos y te enviamos las fechas, el horario y las formas de pago de la próxima edición.",
  subject: `Inscripción al taller de IA de ${BRAND}`,
  greeting: `Hola, quiero inscribirme en el ${COURSE.name} de ${BRAND}.`,
  labels: {
    name: "Nombre y apellido",
    email: "Correo electrónico",
    phone: "WhatsApp (opcional)",
    message: "Mensaje (opcional)",
  },
  submitWhatsapp: "Enviar por WhatsApp",
  submitEmail: "Enviar por correo",
  privacyNote: "Usaremos tus datos solo para responder tu solicitud.",
  successTitle: "¡Gracias",
  successWhatsapp: "Abrimos WhatsApp con tu mensaje listo. Solo pulsa enviar y te responderemos lo antes posible.",
  successEmail: "Abrimos tu aplicación de correo con el mensaje listo. Solo pulsa enviar y te responderemos lo antes posible.",
  notOpened: "¿No se abrió?",
  retry: "Inténtalo de nuevo",
  close: "Volver al curso",
};

/** Preguntas frecuentes (ventana #preguntas-frecuentes). */
export const FAQ: { title: string; description: string; items: Faq[] } = {
  title: "Preguntas frecuentes",
  description: "Si tu duda no está aquí, escríbenos y te respondemos personalmente.",
  items: [
    {
      question: "¿A quién está dirigido?",
      answer: COURSE.audience,
    },
    {
      question: "¿Cómo son las sesiones?",
      answer: `Son ${COURSE.days} sesiones en vivo de ${COURSE.dailyHours} horas por Google Meet, de lunes a viernes. El equipo docente comparte pantalla y tú replicas cada paso en tu navegador: 20 % explicación y demostración, 70 % ejercicios guiados y 10 % retroalimentación y evaluación.`,
    },
    {
      question: "¿Qué necesito para participar?",
      answer:
        "Una computadora con navegador actualizado, una cuenta Google, audífonos y una conexión estable. No necesitas instalar programas: todas las herramientas se usan desde sus sitios oficiales.",
    },
    {
      question: "¿Tengo que pagar alguna suscripción de IA?",
      answer:
        "No. El taller se puede seguir con cuentas gratuitas. Algunas funciones dependen del plan de cada cuenta, como subir audio a ChatGPT; en esos casos usarás Gemini o la transcripción de respaldo para hacer el mismo ejercicio.",
    },
    {
      question: "¿Necesito conocimientos previos de IA?",
      answer:
        "No. El primer día empieza desde lo básico: qué es la IA generativa, cómo ingresar a cada asistente y cómo escribir prompts con la fórmula R-O-C-I-F-V.",
    },
    {
      question: "¿Qué herramientas vamos a usar?",
      answer: "ChatGPT, Gemini, Claude, Qwen y DeepSeek, junto con Google Meet, Drive, Docs, Sheets, Slides y Forms.",
    },
    {
      question: "¿Qué materiales recibo?",
      answer: `El cuaderno del participante con el banco de ${COURSE.prompts} prompts, un caso administrativo ficticio, el audio de una reunión simulada con su transcripción de respaldo y una base de datos de 30 registros en Excel y CSV.`,
    },
    {
      question: "¿Qué obtengo al terminar?",
      answer:
        "Un producto por día: 5 prompts reutilizables; un expediente con informe, oficio o memorando y correo; un acta con su matriz de compromisos; una hoja con indicadores, gráfico y formulario; y un expediente integrado con presentación ejecutiva de 5 diapositivas.",
    },
    {
      question: "¿Cómo se evalúa?",
      answer:
        "Con una rúbrica de 100 puntos: prompts y veracidad (20), documentos (20), acta y audio (20), datos y presentación (30), y privacidad y proceso (10). La aprobación sugerida es de 70/100 con 80 % de asistencia, y se aplica una prueba de 10 preguntas al inicio y al final.",
    },
    {
      question: "¿Qué pasa con la información confidencial de mi oficina?",
      answer:
        "Todas las prácticas usan un caso, un audio y datos ficticios. Aprendes a no cargar documentos reales, datos personales ni grabaciones sin autorización, y a tratar cada respuesta de la IA como un borrador que debe verificarse.",
    },
    {
      question: "¿Puedo inscribir a mi equipo o institución?",
      answer:
        "Sí. Escríbenos por WhatsApp o correo con el número de participantes y coordinamos un grupo para tu equipo.",
    },
    {
      question: "¿Cómo me inscribo?",
      answer:
        "Completa el formulario de inscripción y envíalo por WhatsApp o correo. Te respondemos con las fechas de la próxima edición, el horario y las formas de pago.",
    },
  ],
};

/** Ventana #inversion. El precio se define en COURSE.price. */
export const PRICING: {
  title: string;
  description: string;
  price: string | null;
  priceLabel: string;
  /** Se muestra bajo el precio. */
  paymentNote: string;
  /** Se muestra en lugar del precio cuando `price` es null. */
  priceNote: string;
  includesTitle: string;
  includes: string[];
  whatsappCta: string;
  whatsappText: string;
} = {
  title: "Inversión",
  description: `${COURSE.days} días · ${COURSE.hours} horas en vivo por Google Meet.`,
  price: COURSE.price,
  priceLabel: "Curso completo",
  paymentNote: "Consulta las formas de pago y las opciones para equipos.",
  priceNote: "Consulta el valor vigente, las formas de pago y las opciones para equipos.",
  includesTitle: "Incluye",
  includes: [
    `${COURSE.days} sesiones en vivo de ${COURSE.dailyHours} horas por Google Meet`,
    `${COURSE.practice} % de práctica con 5 talleres guiados`,
    `Cuaderno del participante con ${COURSE.prompts} prompts listos para copiar`,
    "Caso, audio y base de datos ficticios para practicar",
    "Evaluación con rúbrica de 100 puntos",
  ],
  whatsappCta: "Consultar por WhatsApp",
  whatsappText: `Hola, me interesa el taller de IA de ${BRAND} y quiero conocer las formas de pago.`,
};

/**
 * Textos legales (#terminos, #privacidad).
 * Son BORRADORES generales: revísalos con tu asesor legal antes de publicar.
 */
export const LEGAL: Record<"terminos" | "privacidad", LegalDoc> = {
  terminos: {
    title: "Términos y condiciones",
    updated: "Octubre de 2026",
    sections: [
      {
        heading: "Sobre el curso",
        body: `El ${COURSE.name} (${BRAND}) es ofrecido por Logiciel AppLab. Al inscribirte aceptas estos términos.`,
      },
      {
        heading: "Inscripción",
        body: "Tu inscripción queda confirmada cuando te la confirmamos por escrito (por correo o WhatsApp) y, cuando corresponda, se completa el pago acordado. Las fechas, el valor y las formas de pago se informan antes de confirmar.",
      },
      {
        heading: "Acceso y uso del contenido",
        body: "El acceso a las clases y materiales es personal e intransferible. Puedes usar las plantillas y prompts en tu trabajo, pero no revenderlos, publicarlos ni compartir las grabaciones sin autorización.",
      },
      {
        heading: "Cambios en el programa",
        body: "Podemos ajustar fechas, horarios o contenidos para mejorar el curso. Si un cambio te afecta, te avisaremos con anticipación.",
      },
    ],
  },
  privacidad: {
    title: "Política de privacidad",
    updated: "Octubre de 2026",
    sections: [
      {
        heading: "Qué datos recogemos",
        body: "Solo los que nos envías en los formularios: nombre, correo, número de WhatsApp (opcional) y tu mensaje. Los formularios de esta página no guardan información en nuestros servidores: preparan un mensaje que tú decides enviar por WhatsApp o por correo.",
      },
      {
        heading: "Para qué los usamos",
        body: "Para responder tu consulta, gestionar tu inscripción y enviarte la información del curso que solicitaste.",
      },
      {
        heading: "Con quién los compartimos",
        body: "No vendemos ni cedemos tus datos a terceros. WhatsApp y tu proveedor de correo procesan los mensajes según sus propias políticas.",
      },
      {
        heading: "Tus derechos",
        body: `Puedes pedirnos en cualquier momento que te mostremos, corrijamos o eliminemos tus datos escribiendo a ${CHANNELS.email}.`,
      },
    ],
  },
};

export type LegalKey = keyof typeof LEGAL;
