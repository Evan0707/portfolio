/**
 * Écrans d'OpenChantier redessinés en HTML/CSS.
 *
 * Ils habillent les emplacements d'image tant que les vraies captures ne sont
 * pas déposées dans public/images/. Ce sont des illustrations : libellés repris
 * de l'application, données d'exemple fictives (celles de la fiche Google Play).
 * Tout est dimensionné en `em` à partir de la largeur de l'écran (unité cqw) :
 * la maquette garde ses proportions quelle que soit la taille du cadre.
 */

import type { CSSProperties, ReactNode } from "react";
import { OpenChantierMark } from "./brand";

const progress = (value: number) => ({ "--p": `${value}%` }) as CSSProperties;

function Glyph({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

const glyphs = {
  home: <path d="M4 11.5 12 5l8 6.5V19a1 1 0 0 1-1 1h-4.5v-5.5h-5V20H5a1 1 0 0 1-1-1v-7.5Z" />,
  briefcase: (
    <>
      <rect x="3.5" y="7.5" width="17" height="12" rx="2" />
      <path d="M9 7.5V6a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 6v1.5M3.5 12.5h17" />
    </>
  ),
  timer: (
    <>
      <circle cx="12" cy="13.5" r="7" />
      <path d="M12 13.5V10M10 3.5h4" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8.5" r="3.5" />
      <path d="M5 20c.8-3.3 3.5-5 7-5s6.2 1.7 7 5" />
    </>
  ),
  bell: <path d="M6.5 16.5V11a5.5 5.5 0 0 1 11 0v5.5l1.5 2h-14l1.5-2ZM10 20.5h4" />,
  camera: (
    <>
      <path d="M4 8.5h3l1.5-2.5h7L17 8.5h3a1 1 0 0 1 1 1V18a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5a1 1 0 0 1 1-1Z" />
      <circle cx="12" cy="13.5" r="3.2" />
    </>
  ),
  cloud: <path d="M7.5 18a4 4 0 0 1-.6-7.95 5.5 5.5 0 0 1 10.6 1.45A3.3 3.3 0 0 1 17 18H7.5Z" />,
  back: <path d="m14.5 6-6 6 6 6" />,
  down: <path d="m6.5 9.5 5.5 5.5 5.5-5.5" />,
};

const tabs = [
  { label: "Accueil", glyph: glyphs.home },
  { label: "Chantiers", glyph: glyphs.briefcase },
  { label: "Chrono", glyph: glyphs.timer },
  { label: "Profil", glyph: glyphs.user },
];

function Shell({ active, children }: { active: string; children: ReactNode }) {
  return (
    <div className="app">
      <div className="app__status">
        <span>8:15</span>
        <span className="app__signal">
          <i />
          <i />
          <i />
        </span>
      </div>
      <div className="app__body">{children}</div>
      <div className="app-tabs">
        {tabs.map((tab) => (
          <span className={tab.label === active ? "app-tab is-on" : "app-tab"} key={tab.label}>
            <Glyph>{tab.glyph}</Glyph>
            {tab.label}
          </span>
        ))}
      </div>
    </div>
  );
}

const week = [
  { day: "Lun", num: "15", dot: true },
  { day: "Mar", num: "16", dot: true },
  { day: "Mer", num: "17", dot: true, on: true },
  { day: "Jeu", num: "18" },
  { day: "Ven", num: "19", dot: true },
  { day: "Sam", num: "20" },
  { day: "Dim", num: "21" },
];

const projects = [
  { name: "Rénovation cuisine — Dupont", address: "12 rue de la Paix, Lyon 3e", done: 72 },
  { name: "Salle de bain — Martin", address: "8 av. Berthelot, Lyon 7e", done: 45 },
  { name: "Extension garage — Bonnet", address: "3 chemin des Vignes, Bron", done: 18 },
];

/** Accueil : la journée, la semaine, les chantiers en cours. */
export function AppHomeMock() {
  return (
    <Shell active="Accueil">
      <div className="app-head">
        <span className="app-avatar">JM</span>
        <span className="app-hello">
          <small>Bonjour</small>
          <b>Julien</b>
        </span>
        <span className="app-bell">
          <Glyph>{glyphs.bell}</Glyph>
          <em>3</em>
        </span>
      </div>

      <p className="app-h">Ma semaine</p>
      <p className="app-sub">15 – 21 sept. · 18 h pointées · 6 h prévues</p>

      <div className="app-week">
        {week.map((cell) => (
          <span className={cell.on ? "app-day is-on" : "app-day"} key={cell.num}>
            <small>{cell.day}</small>
            <b>{cell.num}</b>
            {cell.dot && <i />}
          </span>
        ))}
      </div>

      <div className="app-slot">
        <span className="app-slot__time">
          08:00
          <br />
          12:00
        </span>
        <span className="app-slot__text">
          <b>Rénovation cuisine — Dupont</b>
          <small>12 rue de la Paix, Lyon 3e</small>
        </span>
      </div>
      <div className="app-slot">
        <span className="app-slot__time">
          14:00
          <br />
          17:00
        </span>
        <span className="app-slot__text">
          <b>Salle de bain — Martin</b>
          <small>8 av. Berthelot, Lyon 7e</small>
        </span>
      </div>

      <div className="app-line">
        <p className="app-h">Chantiers en cours</p>
        <span className="app-more">Voir tout</span>
      </div>

      {projects.map((project) => (
        <div className="app-proj" key={project.name}>
          <span className="app-proj__text">
            <b>{project.name}</b>
            <small>{project.address}</small>
          </span>
          <span className="app-proj__done">
            <small>{project.done}&nbsp;%</small>
            <i style={progress(project.done)} />
          </span>
        </div>
      ))}

      <span className="app-fab">
        <Glyph>{glyphs.camera}</Glyph>
      </span>
    </Shell>
  );
}

const photoTones = ["a", "b", "c", "d", "e", "f", "g"];

/** Un chantier, onglet Photos, téléphone hors ligne. */
export function AppPhotosMock() {
  return (
    <Shell active="Chantiers">
      <div className="app-offline">
        <Glyph>{glyphs.cloud}</Glyph>
        Hors ligne — 3 actions en attente
      </div>

      <div className="app-title">
        <Glyph>{glyphs.back}</Glyph>
        <b>Rénovation cuisine — Dupont</b>
      </div>

      <div className="app-subtabs">
        <span>Aperçu</span>
        <span className="is-on">Photos</span>
        <span>Messages</span>
        <span>Notes</span>
        <span>Tâches</span>
      </div>

      <div className="app-photos">
        {photoTones.map((tone, index) => (
          <span className={`app-photo app-photo--${tone}`} key={tone}>
            {index < 2 && (
              <em>
                <Glyph>{glyphs.cloud}</Glyph>
              </em>
            )}
          </span>
        ))}
      </div>

      <span className="app-fab">
        <Glyph>{glyphs.camera}</Glyph>
      </span>
    </Shell>
  );
}

const lastEntries = [
  { date: "16/09/2026", hours: "7.5 h" },
  { date: "15/09/2026", hours: "8 h" },
  { date: "12/09/2026", hours: "6.5 h" },
];

/** Le chrono de pointage, en marche. */
export function AppChronoMock() {
  return (
    <Shell active="Chrono">
      <p className="app-page">Pointage</p>

      <div className="app-select">
        <span>
          <small>Choisir un chantier</small>
          <b>Rénovation cuisine — Dupont</b>
        </span>
        <Glyph>{glyphs.down}</Glyph>
      </div>

      <p className="app-clock">02:14:36</p>
      <p className="app-state">
        <i />
        En cours
      </p>

      <div className="app-actions">
        <span className="app-btn app-btn--line">Pause</span>
        <span className="app-btn app-btn--stop">Arrêter</span>
      </div>

      <p className="app-label">Derniers pointages</p>
      <div className="app-list">
        {lastEntries.map((entry) => (
          <span key={entry.date}>
            {entry.date}
            <b>{entry.hours}</b>
          </span>
        ))}
      </div>
    </Shell>
  );
}

const webNav = ["Tableau de bord", "Chantiers", "Clients", "Devis & factures", "Planning", "Fournisseurs", "Stock", "Rapports"];

const webStats = [
  { label: "Chantiers en cours", value: "4" },
  { label: "Heures cette semaine", value: "18 h" },
  { label: "Devis en attente", value: "2" },
  { label: "Factures en retard", value: "1" },
];

const webRows = [
  { name: "Rénovation cuisine", client: "Dupont", done: 72, status: "En cours", tone: "ok" },
  { name: "Extension véranda", client: "Martin", done: 45, status: "En cours", tone: "ok" },
  { name: "Isolation combles", client: "Lefèvre", done: 90, status: "En pause", tone: "wait" },
  { name: "Terrasse bois", client: "Bonnet", done: 100, status: "Terminé", tone: "done" },
];

/** Le tableau de bord web. */
export function WebDashboardMock() {
  return (
    <div className="web">
      <div className="web__side">
        <p className="web__brand">
          <OpenChantierMark className="web__logo" />
          OpenChantier
        </p>
        {webNav.map((item, index) => (
          <span className={index === 0 ? "web__nav is-on" : "web__nav"} key={item}>
            <i />
            {item}
          </span>
        ))}
      </div>

      <div className="web__main">
        <div className="web__top">
          <p className="web__title">Tableau de bord</p>
          <span className="web__cta">Nouveau chantier</span>
        </div>

        <div className="web__stats">
          {webStats.map((stat) => (
            <span className="web__stat" key={stat.label}>
              <small>{stat.label}</small>
              <b>{stat.value}</b>
            </span>
          ))}
        </div>

        <div className="web__table">
          <span className="web__row web__row--head">
            <span>Chantier</span>
            <span>Client</span>
            <span>Avancement</span>
            <span>Statut</span>
          </span>
          {webRows.map((row) => (
            <span className="web__row" key={row.name}>
              <b>{row.name}</b>
              <span>{row.client}</span>
              <span className="web__done">
                <i style={progress(row.done)} />
                {row.done}&nbsp;%
              </span>
              <span>
                <span className={`web__badge web__badge--${row.tone}`}>
                  <i />
                  {row.status}
                </span>
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
