# 🚀 Website Relaunch Manager

Ein interaktives Web-Tool für erfolgreiche Website-Relaunches mit automatischen Prüfungen, Checklisten und Hilfestellungen.

## ✨ Features

- **📋 Interaktive Checkliste** mit 7 Phasen und über 50 Aufgaben
- **🔧 Automatische Prüfungen** für HTTPS, SEO-Dateien, Meta-Tags und Redirects
- **💡 Hilfestellungen** und Best Practices für jede Aufgabe
- **📊 Fortschrittsverfolgung** mit visuellen Indikatoren
- **🔍 Filter- und Suchfunktionen** für bessere Übersicht
- **💾 Lokale Speicherung** Ihres Fortschritts
- **📤 Export/Import** von Checklisten-Daten
- **📱 Responsive Design** für alle Geräte

## 🎯 Zielgruppe

- **Webagenturen** und Freelancer
- **Projektmanager** für Website-Projekte
- **Website-Betreiber** ohne technische Expertise
- **SEO-Spezialisten** und Webentwickler

## 🛠️ Technologie-Stack

- **Framework**: [Astro.js](https://astro.build/) 4.16+
- **UI**: React 18 mit TypeScript
- **Styling**: Tailwind CSS
- **API**: Astro API-Routes für automatische Prüfungen

## 🚦 Schnellstart

### Voraussetzungen

- Node.js 18+ 
- npm oder yarn

### Installation

```bash
# Repository klonen
git clone https://github.com/ihr-username/relaunch-manager.git
cd relaunch-manager

# Dependencies installieren
npm install

# Entwicklungsserver starten
npm run dev
```

Die Anwendung ist dann unter `http://localhost:4321` verfügbar.

## 📖 Verwendung

### 1. Neue Checkliste starten
- Öffnen Sie die Anwendung
- Folgen Sie den 7 Phasen von der Vorbereitung bis zur Nachbereitung

### 2. Automatische Prüfungen nutzen
- Klicken Sie auf "🔧 Automatische Prüfungen" 
- Geben Sie Ihre Website-URL ein
- Lassen Sie HTTPS, SEO-Dateien und Meta-Tags automatisch prüfen

### 3. Fortschritt verwalten
- **Filter verwenden**: Zeigen Sie nur offene, erledigte oder Pflichtaufgaben
- **Notizen hinzufügen**: Dokumentieren Sie Ihren Fortschritt
- **Exportieren**: Sichern Sie Ihren aktuellen Status
- **Importieren**: Laden Sie gespeicherte Checklisten

## 🏗️ Projekt-Struktur

```
src/
├── components/          # React-Komponenten
│   ├── RelaunchManager.tsx    # Haupt-App-Komponente
│   ├── PhaseCard.tsx          # Phasen-Darstellung
│   ├── TaskItem.tsx           # Einzelne Aufgaben
│   ├── ProgressBar.tsx        # Fortschrittsbalken
│   ├── FilterControls.tsx     # Filter & Suche
│   └── AutomationPanel.tsx    # Automatische Prüfungen
├── data/
│   └── checklist.ts           # Checkliste-Daten
├── layouts/
│   └── Layout.astro           # Basis-Layout
├── pages/
│   ├── index.astro           # Startseite
│   └── api/                  # API-Endpunkte
│       ├── check-https.ts    # HTTPS-Prüfung
│       ├── check-robots.ts   # robots.txt/sitemap
│       ├── check-meta.ts     # Meta-Tags
│       └── check-redirects.ts # Weiterleitungen
└── utils/                    # Hilfsfunktionen
```

## 🔧 API-Endpunkte

### POST /api/check-https
Prüft SSL-Zertifikat und HTTPS-Weiterleitung

### POST /api/check-robots  
Überprüft robots.txt und sitemap.xml

### POST /api/check-meta
Analysiert Meta-Tags, Titel und Beschreibungen

### POST /api/check-redirects
Testet 301-Redirects und URL-Struktur

**Request Format:**
```json
{
  "url": "https://example.com"
}
```

## 📋 Checkliste-Phasen

1. **📋 Vorbereitung** - Planung und Backup
2. **🎨 Konzeption & Design** - UX/UI und Prototyping  
3. **⚙️ Technik & Entwicklung** - Implementation und Sicherheit
4. **🔍 SEO & Sichtbarkeit** - Optimierung für Suchmaschinen
5. **🧪 Testing & QA** - Qualitätssicherung und Tests
6. **🚀 Go-Live** - Launch und erste Prüfungen
7. **📈 Nachbereitung** - Monitoring und Optimierung

## 🤝 Beitragen

Beiträge sind willkommen! Bitte:

1. Forken Sie das Repository
2. Erstellen Sie einen Feature-Branch (`git checkout -b feature/AmazingFeature`)
3. Committen Sie Ihre Änderungen (`git commit -m 'Add some AmazingFeature'`)
4. Pushen Sie zum Branch (`git push origin feature/AmazingFeature`)
5. Öffnen Sie einen Pull Request

## 📝 Skripte

```bash
npm run dev          # Entwicklungsserver
npm run build        # Production Build
npm run preview      # Preview des Builds
npm run astro        # Astro CLI
```

## 📄 Lizenz

Dieses Projekt steht unter der MIT-Lizenz. Siehe [LICENSE](LICENSE) für Details.

## 🙏 Danksagungen

- [Astro.js](https://astro.build/) - Modernes Web-Framework
- [React](https://reactjs.org/) - UI-Bibliothek
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- Inspiration aus der Web-Community

## 📞 Support

Bei Fragen oder Problemen:
- Öffnen Sie ein [Issue](https://github.com/ihr-username/relaunch-manager/issues)
- Kontaktieren Sie uns über [E-Mail](mailto:support@relaunch-manager.com)

---

**Entwickelt für erfolgreiche Website-Relaunches** 🎉 