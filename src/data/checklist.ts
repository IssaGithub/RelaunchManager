export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'required' | 'recommended';
  automatable: boolean;
  automationEndpoint?: string;
  helpText?: string;
  completed: boolean;
  notes?: string;
}

export interface Phase {
  id: string;
  title: string;
  description: string;
  tasks: Task[];
}

export const checklistData: Phase[] = [
  {
    id: "preparation",
    title: "Vorbereitung",
    description: "Grundlegende Planungsschritte vor dem Relaunch",
    tasks: [
      {
        id: "prep-goals",
        title: "Ziele des Relaunchs definieren",
        description: "Klare Ziele und Erfolgskriterien festlegen",
        priority: "required",
        automatable: false,
        helpText: "Definieren Sie messbare Ziele wie erhöhte Conversion-Rate, bessere UX oder moderne Technik",
        completed: false
      },
      {
        id: "prep-personas",
        title: "Zielgruppen und Personas analysieren",
        description: "Bestehende und neue Zielgruppen identifizieren",
        priority: "required",
        automatable: false,
        helpText: "Erstellen Sie detaillierte Buyer Personas basierend auf Analytics-Daten und Marktforschung",
        completed: false
      },
      {
        id: "prep-backup",
        title: "Bestehende Website sichern (komplettes Backup)",
        description: "Vollständige Sicherung der aktuellen Website",
        priority: "required",
        automatable: false,
        helpText: "Sichern Sie Dateien, Datenbank und alle Konfigurationen. Testen Sie das Backup!",
        completed: false
      },
      {
        id: "prep-inventory",
        title: "Aktuelle Inhalte inventarisieren",
        description: "Alle bestehenden Inhalte kategorisieren und bewerten",
        priority: "required",
        automatable: false,
        helpText: "Erstellen Sie eine Inhaltsliste: behalten, überarbeiten, löschen, neu erstellen",
        completed: false
      },
      {
        id: "prep-seo-data",
        title: "SEO-Daten sichern (Ranking, Backlinks, Search Console)",
        description: "Wichtige SEO-Metriken dokumentieren",
        priority: "required",
        automatable: false,
        helpText: "Exportieren Sie Rankings, Backlink-Profile und Search Console Daten als Referenz",
        completed: false
      },
      {
        id: "prep-analytics",
        title: "Traffic-Quellen und Analytics-Daten analysieren",
        description: "Bestehende Performance-Daten auswerten",
        priority: "required",
        automatable: false,
        helpText: "Analysieren Sie mindestens 12 Monate historische Daten für Benchmarks",
        completed: false
      },
      {
        id: "prep-team",
        title: "Projektteam & Zuständigkeiten definieren",
        description: "Klare Verantwortlichkeiten festlegen",
        priority: "required",
        automatable: false,
        helpText: "Definieren Sie Rollen, Entscheidungswege und Kommunikationskanäle",
        completed: false
      },
      {
        id: "prep-timeline",
        title: "Zeitplan & Meilensteine erstellen",
        description: "Detaillierte Projektplanung mit Deadlines",
        priority: "required",
        automatable: false,
        helpText: "Planen Sie Puffer ein und definieren Sie Go/No-Go Entscheidungspunkte",
        completed: false
      }
    ]
  },
  {
    id: "concept-design",
    title: "Konzeption & Design",
    description: "UX/UI Design und Konzeptentwicklung",
    tasks: [
      {
        id: "concept-ux",
        title: "UX-/UI-Konzept erstellen (Wireframes, User-Flows)",
        description: "Benutzerfreundliches Design entwickeln",
        priority: "required",
        automatable: false,
        helpText: "Starten Sie mit Low-Fidelity Wireframes und testen Sie User-Flows früh",
        completed: false
      },
      {
        id: "concept-mobile",
        title: "Mobile-First-Ansatz berücksichtigen",
        description: "Responsive Design von Anfang an planen",
        priority: "required",
        automatable: false,
        helpText: "Über 50% der Nutzer sind mobil - designen Sie zuerst für kleine Bildschirme",
        completed: false
      },
      {
        id: "concept-accessibility",
        title: "Barrierefreiheit planen",
        description: "WCAG-Richtlinien einhalten",
        priority: "recommended",
        automatable: false,
        helpText: "Planen Sie Farbkontraste, Alt-Texte, Keyboard-Navigation und Screen-Reader Kompatibilität",
        completed: false
      },
      {
        id: "concept-branding",
        title: "CI/CD-Richtlinien einhalten",
        description: "Corporate Identity konsistent umsetzen",
        priority: "required",
        automatable: false,
        helpText: "Halten Sie sich an Markenrichtlinien für Farben, Fonts, Logos und Tonalität",
        completed: false
      },
      {
        id: "concept-navigation",
        title: "Navigation & Menüführung festlegen",
        description: "Intuitive Navigationsstruktur entwickeln",
        priority: "required",
        automatable: false,
        helpText: "Verwenden Sie Card-Sorting und Tree-Testing für optimale Informationsarchitektur",
        completed: false
      },
      {
        id: "concept-prototype",
        title: "Prototyp erstellen & testen",
        description: "Interaktiven Prototyp mit echten Nutzern testen",
        priority: "recommended",
        automatable: false,
        helpText: "Erstellen Sie klickbare Prototypen und führen Sie Usability-Tests durch",
        completed: false
      }
    ]
  },
  {
    id: "tech-development",
    title: "Technik & Entwicklung",
    description: "Technische Umsetzung und Infrastruktur",
    tasks: [
      {
        id: "tech-hosting",
        title: "Hosting-Anbieter & Domain prüfen/wechseln",
        description: "Geeignete Hosting-Lösung auswählen",
        priority: "required",
        automatable: false,
        helpText: "Berücksichtigen Sie Performance, Skalierbarkeit, Support und Backup-Services",
        completed: false
      },
      {
        id: "tech-cms",
        title: "CMS festlegen/installieren",
        description: "Content Management System auswählen und einrichten",
        priority: "required",
        automatable: false,
        helpText: "Wählen Sie basierend auf Nutzeranforderungen, Sicherheit und Erweiterbarkeit",
        completed: false
      },
      {
        id: "tech-https",
        title: "HTTPS (SSL-Zertifikat) aktivieren",
        description: "Sichere Verbindung einrichten",
        priority: "required",
        automatable: true,
        automationEndpoint: "/api/check-https",
        helpText: "HTTPS ist Pflicht für SEO, Sicherheit und Vertrauen. Prüfen Sie automatisch!",
        completed: false
      },
      {
        id: "tech-performance",
        title: "Ladezeiten & Performance optimieren",
        description: "Website-Geschwindigkeit maximieren",
        priority: "required",
        automatable: false,
        helpText: "Optimieren Sie Bilder, verwenden Sie CDN, minimieren Sie CSS/JS und aktivieren Sie Caching",
        completed: false
      },
      {
        id: "tech-responsive",
        title: "Responsives Design umsetzen & testen",
        description: "Multi-Device Kompatibilität sicherstellen",
        priority: "required",
        automatable: false,
        helpText: "Testen Sie auf verschiedenen Geräten und Browsern, nutzen Sie Entwicklertools",
        completed: false
      },
      {
        id: "tech-security",
        title: "Sicherheit beachten (z. B. Plugins, Admin-Rechte)",
        description: "Sicherheitsmaßnahmen implementieren",
        priority: "required",
        automatable: false,
        helpText: "Updates regelmäßig einspielen, sichere Passwörter, 2FA aktivieren, Plugins minimieren",
        completed: false
      },
      {
        id: "tech-gdpr",
        title: "Cookie-Banner & DSGVO-Elemente einbauen",
        description: "Datenschutz-Compliance sicherstellen",
        priority: "required",
        automatable: false,
        helpText: "Implementieren Sie rechtskonforme Cookie-Banner und Datenschutzerklärung",
        completed: false
      }
    ]
  },
  {
    id: "seo-visibility",
    title: "SEO & Sichtbarkeit",
    description: "Suchmaschinenoptimierung und Online-Sichtbarkeit",
    tasks: [
      {
        id: "seo-meta",
        title: "Meta-Titel und -Beschreibungen optimieren",
        description: "SEO-optimierte Meta-Tags erstellen",
        priority: "required",
        automatable: true,
        automationEndpoint: "/api/check-meta",
        helpText: "Titel: 50-60 Zeichen, Description: 150-160 Zeichen, relevante Keywords verwenden",
        completed: false
      },
      {
        id: "seo-alt",
        title: "ALT-Texte für alle Bilder einfügen",
        description: "Barrierefreie und SEO-optimierte Bildbeschreibungen",
        priority: "required",
        automatable: false,
        helpText: "Beschreiben Sie Bilder präzise und keyword-relevant für Accessibility und SEO",
        completed: false
      },
      {
        id: "seo-headings",
        title: "H1-H6-Struktur korrekt einsetzen",
        description: "Hierarchische Überschriftenstruktur optimieren",
        priority: "required",
        automatable: false,
        helpText: "Eine H1 pro Seite, logische Hierarchie, Keywords in Überschriften integrieren",
        completed: false
      },
      {
        id: "seo-canonical",
        title: "Canonical-Tags prüfen",
        description: "Duplicate Content vermeiden",
        priority: "recommended",
        automatable: false,
        helpText: "Setzen Sie Canonical-Tags bei ähnlichen Inhalten zur Vermeidung von Duplicate Content",
        completed: false
      },
      {
        id: "seo-robots",
        title: "robots.txt & sitemap.xml erstellen",
        description: "Crawler-Steuerung und Indexierung optimieren",
        priority: "required",
        automatable: true,
        automationEndpoint: "/api/check-robots",
        helpText: "robots.txt steuert Crawler, Sitemap hilft bei der Indexierung - automatisch prüfbar!",
        completed: false
      },
      {
        id: "seo-redirects",
        title: "301-Weiterleitungen einrichten",
        description: "Link-Power und User Experience erhalten",
        priority: "required",
        automatable: true,
        automationEndpoint: "/api/check-redirects",
        helpText: "Alle alten URLs auf neue umleiten um Rankings zu erhalten",
        completed: false
      },
      {
        id: "seo-broken-links",
        title: "Broken Links checken",
        description: "Defekte interne und externe Links finden",
        priority: "required",
        automatable: false,
        helpText: "Verwenden Sie Tools wie Screaming Frog oder Online-Checker für komplette Analyse",
        completed: false
      },
      {
        id: "seo-structured-data",
        title: "Structured Data hinzufügen",
        description: "Schema.org Markup für Rich Snippets",
        priority: "recommended",
        automatable: false,
        helpText: "JSON-LD Schema für bessere SERP-Darstellung (Breadcrumbs, Reviews, etc.)",
        completed: false
      },
      {
        id: "seo-search-console",
        title: "Google Search Console einrichten",
        description: "SEO-Monitoring und -Optimierung",
        priority: "required",
        automatable: false,
        helpText: "Verifizieren Sie die Domain und überwachen Sie Indexierung und Performance",
        completed: false
      },
      {
        id: "seo-analytics",
        title: "Analytics-Tool einbinden",
        description: "Tracking und Erfolgsmessung implementieren",
        priority: "required",
        automatable: false,
        helpText: "Google Analytics 4 oder alternative Tools für Datensammlung einrichten",
        completed: false
      }
    ]
  },
  {
    id: "testing-qa",
    title: "Testing & Qualitätssicherung",
    description: "Umfassende Tests vor dem Go-Live",
    tasks: [
      {
        id: "test-functionality",
        title: "Funktionstest aller interaktiven Elemente",
        description: "Alle Buttons, Formulare und Interaktionen testen",
        priority: "required",
        automatable: false,
        helpText: "Testen Sie alle Formulare, CTAs, Navigation und interaktive Features systematisch",
        completed: false
      },
      {
        id: "test-compatibility",
        title: "Browser- und Gerätekompatibilität prüfen",
        description: "Cross-Browser und Cross-Device Testing",
        priority: "required",
        automatable: false,
        helpText: "Testen Sie auf den wichtigsten Browsern und Geräten Ihrer Zielgruppe",
        completed: false
      },
      {
        id: "test-pagespeed",
        title: "Ladezeiten testen (z. B. PageSpeed)",
        description: "Performance-Analyse durchführen",
        priority: "required",
        automatable: false,
        helpText: "Nutzen Sie Google PageSpeed Insights, GTmetrix oder ähnliche Tools",
        completed: false
      },
      {
        id: "test-core-vitals",
        title: "Core Web Vitals analysieren",
        description: "Google's UX-Metriken optimieren",
        priority: "required",
        automatable: false,
        helpText: "LCP, FID, CLS messen und optimieren - wichtig für SEO und UX",
        completed: false
      },
      {
        id: "test-accessibility",
        title: "Barrierefreiheit checken",
        description: "WCAG-Compliance überprüfen",
        priority: "recommended",
        automatable: false,
        helpText: "Nutzen Sie Tools wie WAVE, axe oder Lighthouse für Accessibility-Audits",
        completed: false
      },
      {
        id: "test-internal-links",
        title: "Interne Verlinkungen prüfen",
        description: "Vollständige Link-Struktur kontrollieren",
        priority: "required",
        automatable: false,
        helpText: "Überprüfen Sie alle internen Links auf Funktionalität und SEO-Optimierung",
        completed: false
      },
      {
        id: "test-legal",
        title: "Datenschutz- & Impressumsprüfung",
        description: "Rechtliche Compliance sicherstellen",
        priority: "required",
        automatable: false,
        helpText: "Lassen Sie rechtliche Seiten von einem Anwalt oder Experten prüfen",
        completed: false
      }
    ]
  },
  {
    id: "go-live",
    title: "Go-Live",
    description: "Der eigentliche Launch der neuen Website",
    tasks: [
      {
        id: "live-deployment",
        title: "Live-Schaltung (DNS-Umstellung / Deployment)",
        description: "Website live schalten",
        priority: "required",
        automatable: false,
        helpText: "Planen Sie das Deployment außerhalb der Stoßzeiten und informieren Sie Ihr Team",
        completed: false
      },
      {
        id: "live-ssl",
        title: "SSL-Zertifikat prüfen",
        description: "HTTPS-Funktionalität nach Go-Live testen",
        priority: "required",
        automatable: true,
        automationEndpoint: "/api/check-https",
        helpText: "Testen Sie HTTPS-Weiterleitung und Zertifikat-Gültigkeit automatisch",
        completed: false
      },
      {
        id: "live-404",
        title: "404-Seite anpassen",
        description: "Benutzerfreundliche Fehlerseite erstellen",
        priority: "recommended",
        automatable: false,
        helpText: "Gestalten Sie eine hilfreiche 404-Seite mit Navigation zurück zur Website",
        completed: false
      },
      {
        id: "live-sitemap-submit",
        title: "Sitemap an Google senden",
        description: "Indexierung beschleunigen",
        priority: "required",
        automatable: false,
        helpText: "Reichen Sie die Sitemap in der Google Search Console ein",
        completed: false
      },
      {
        id: "live-redirects-test",
        title: "Redirects testen",
        description: "Alle Weiterleitungen nach Go-Live prüfen",
        priority: "required",
        automatable: true,
        automationEndpoint: "/api/check-redirects",
        helpText: "Testen Sie systematisch alle eingerichteten 301-Weiterleitungen",
        completed: false
      },
      {
        id: "live-monitoring",
        title: "Monitoring-Tools aktivieren",
        description: "Uptime und Performance überwachen",
        priority: "recommended",
        automatable: false,
        helpText: "Aktivieren Sie Tools wie UptimeRobot, Pingdom oder ähnliche Services",
        completed: false
      },
      {
        id: "live-team-info",
        title: "Team über Launch informieren",
        description: "Interne Kommunikation des Go-Lives",
        priority: "required",
        automatable: false,
        helpText: "Informieren Sie alle Stakeholder über den erfolgreichen Launch",
        completed: false
      }
    ]
  },
  {
    id: "post-launch",
    title: "Nachbereitung & Optimierung",
    description: "Monitoring und kontinuierliche Verbesserung",
    tasks: [
      {
        id: "post-monitoring",
        title: "Monitoring: Rankings, Performance, Fehlerseiten",
        description: "Kontinuierliche Überwachung aller KPIs",
        priority: "required",
        automatable: false,
        helpText: "Richten Sie automatisierte Reports für Rankings, Traffic und Fehler ein",
        completed: false
      },
      {
        id: "post-feedback",
        title: "Nutzerfeedback einholen",
        description: "User Experience evaluieren",
        priority: "recommended",
        automatable: false,
        helpText: "Nutzen Sie Surveys, Heatmaps oder User-Interviews für Feedback",
        completed: false
      },
      {
        id: "post-redirects-retest",
        title: "Weiterleitungen erneut testen",
        description: "Nachjustierung der Redirect-Strategie",
        priority: "recommended",
        automatable: true,
        automationEndpoint: "/api/check-redirects",
        helpText: "Überprüfen Sie Weiterleitungen regelmäßig auf Funktionalität",
        completed: false
      },
      {
        id: "post-backups",
        title: "Backups konfigurieren",
        description: "Automatisierte Sicherungsstrategie implementieren",
        priority: "required",
        automatable: false,
        helpText: "Richten Sie tägliche automatische Backups ein und testen Sie die Wiederherstellung",
        completed: false
      },
      {
        id: "post-maintenance",
        title: "Regelmäßige Wartung einplanen",
        description: "Wartungsplan für langfristige Performance",
        priority: "required",
        automatable: false,
        helpText: "Planen Sie Updates, Security-Patches und Performance-Optimierungen",
        completed: false
      },
      {
        id: "post-content-strategy",
        title: "Content-Strategie anpassen",
        description: "Kontinuierliche Content-Optimierung",
        priority: "recommended",
        automatable: false,
        helpText: "Entwickeln Sie einen Redaktionsplan basierend auf Analytics-Daten",
        completed: false
      },
      {
        id: "post-promotion",
        title: "Neue Inhalte promoten",
        description: "Marketing für den Relaunch",
        priority: "recommended",
        automatable: false,
        helpText: "Nutzen Sie Social Media, Newsletter und PR für den Launch",
        completed: false
      },
      {
        id: "post-ab-testing",
        title: "AB-Tests starten",
        description: "Kontinuierliche Optimierung durch Tests",
        priority: "recommended",
        automatable: false,
        helpText: "Testen Sie verschiedene Versionen von CTAs, Headlines und Layouts",
        completed: false
      }
    ]
  }
];

export const getTaskById = (taskId: string): Task | undefined => {
  for (const phase of checklistData) {
    const task = phase.tasks.find(t => t.id === taskId);
    if (task) return task;
  }
  return undefined;
};

export const getPhaseProgress = (phaseId: string): number => {
  const phase = checklistData.find(p => p.id === phaseId);
  if (!phase) return 0;
  
  const completedTasks = phase.tasks.filter(task => task.completed).length;
  return Math.round((completedTasks / phase.tasks.length) * 100);
};

export const getTotalProgress = (): number => {
  const allTasks = checklistData.flatMap(phase => phase.tasks);
  const completedTasks = allTasks.filter(task => task.completed).length;
  return Math.round((completedTasks / allTasks.length) * 100);
}; 