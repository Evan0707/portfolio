/**
 * Illustrations des quatre services, dessinées en SVG (grille 320 × 200).
 * Monochromes, à angles vifs : elles prennent la couleur du thème par les
 * classes `.ill-*` de globals.css. Seul point de couleur : le vert « actif ».
 */

const check = "m-3.2 0 2.3 2.3 4.2-4.6";

/** Applications métier : un planning, comme on en construit pour un atelier ou un chantier. */
function MetierArt() {
  const menu = ["Gestion", "Suivi", "Planning", "Reporting"];
  const days = ["LUN", "MAR", "MER", "JEU", "VEN"];

  return (
    <svg viewBox="0 0 320 200" className="ill" aria-hidden="true">
      <rect x="14" y="14" width="292" height="172" className="ill-window" />
      <rect x="27" y="27" width="6" height="6" className="ill-dim" />
      <rect x="38" y="27" width="6" height="6" className="ill-dim" />
      <rect x="49" y="27" width="6" height="6" className="ill-dim" />
      <text x="70" y="33.5" className="ill-text">
        Planning
      </text>
      <rect x="226" y="22" width="68" height="16" className="ill-card" />
      <rect x="258" y="24" width="34" height="12" className="ill-accent" />
      <rect x="14" y="46" width="292" height="1" className="ill-rule" />
      <rect x="96" y="46" width="1" height="140" className="ill-rule" />

      {menu.map((item, index) => {
        const y = 60 + index * 22;
        const active = item === "Planning";
        return (
          <g key={item}>
            {active && <rect x="22" y={y - 3} width="68" height="18" className="ill-accent" />}
            <rect x="30" y={y + 4} width="4" height="4" className={active ? "ill-on-accent" : "ill-dim"} />
            <text x="40" y={y + 9.5} className={active ? "ill-text ill-text--on-accent" : "ill-text ill-text--dim"}>
              {item}
            </text>
          </g>
        );
      })}

      {days.map((day, index) => (
        <text key={day} x={112 + index * 40} y="63" className="ill-text ill-text--tiny">
          {day}
        </text>
      ))}

      <rect x="108" y="74" width="74" height="16" className="ill-accent" />
      <rect x="114" y="80" width="4" height="4" className="ill-on-accent" />
      <rect x="144" y="100" width="96" height="16" className="ill-dim" />
      <rect x="150" y="106" width="4" height="4" className="ill-strong" />
      <rect x="188" y="126" width="62" height="16" className="ill-pop" />
      <rect x="194" y="132" width="4" height="4" className="ill-on-pop" />
      <rect x="116" y="152" width="112" height="16" className="ill-card" />
      <rect x="236" y="152" width="52" height="16" className="ill-accent" />

      <path d="M221 54V178" className="ill-today" />
      <rect x="218" y="51" width="6" height="6" className="ill-pop" />
    </svg>
  );
}

/** Applications mobiles : une liste cochée sur le terrain, même hors ligne. */
function MobileArt() {
  const rows = [
    { y: 86, width: 40, done: true },
    { y: 106, width: 32, done: true },
    { y: 126, width: 44, done: false },
    { y: 146, width: 28, done: false },
  ];

  return (
    <svg viewBox="0 0 320 200" className="ill" aria-hidden="true">
      <rect x="66" y="18" width="88" height="164" rx="10" className="ill-window" />
      <rect x="96" y="26" width="28" height="5" className="ill-dim" />
      <rect x="76" y="42" width="68" height="32" className="ill-accent" />
      <rect x="84" y="51" width="26" height="4" className="ill-on-accent" opacity=".55" />
      <rect x="84" y="61" width="42" height="6" className="ill-on-accent" />
      {rows.map((row) => (
        <g key={row.y}>
          <rect x="78" y={row.y} width="11" height="11" className={row.done ? "ill-accent" : "ill-box"} />
          {row.done && <path d={check} transform={`translate(83.5 ${row.y + 5.5})`} className="ill-tick" />}
          <rect x="96" y={row.y + 3.5} width={row.width} height="4" className="ill-dim" />
        </g>
      ))}
      <rect x="76" y="164" width="68" height="10" className="ill-strong" />

      <rect x="170" y="44" width="80" height="138" rx="10" className="ill-window" />
      <rect x="196" y="52" width="28" height="4" className="ill-dim" />
      <rect x="180" y="68" width="27" height="27" className="ill-card" />
      <rect x="213" y="68" width="27" height="27" className="ill-card" />
      <rect x="180" y="101" width="27" height="27" className="ill-card" />
      <rect x="213" y="101" width="27" height="27" className="ill-accent" />
      <rect x="180" y="138" width="60" height="4" className="ill-dim" />
      <rect x="180" y="149" width="40" height="4" className="ill-dim" />
      <rect x="180" y="162" width="60" height="12" className="ill-strong" />

      <g className="ill-badge">
        <rect x="196" y="14" width="98" height="26" className="ill-accent" />
        <path d="M211 32.5a4.6 4.6 0 0 1 6.5 0M208 29.2a9.2 9.2 0 0 1 4.3-2.4M216 26.7a9.2 9.2 0 0 1 4.5 2.5M209.5 21.5l10 12.5" className="ill-glyph" />
        <text x="228" y="31" className="ill-text ill-text--on-accent">
          Hors ligne
        </text>
      </g>
    </svg>
  );
}

/** Automatisation : les outils de l'entreprise reliés par un point central. */
function AutomatisationArt() {
  const nodes = [
    { label: "ERP", x: 18, y: 38, width: 78 },
    { label: "Compta", x: 18, y: 128, width: 78 },
    { label: "CRM", x: 224, y: 38, width: 78 },
    { label: "Facturation", x: 208, y: 128, width: 94 },
  ];

  return (
    <svg viewBox="0 0 320 200" className="ill" aria-hidden="true">
      <path d="M96 55H114V100H132" className="ill-wire" />
      <path d="M96 145H114V100H132" className="ill-wire" />
      <path d="M188 100H206V55H224" className="ill-wire" />
      <path d="M188 100H198V145H208" className="ill-wire" />

      {nodes.map((node) => (
        <g key={node.label}>
          <rect x={node.x} y={node.y} width={node.width} height="34" className="ill-window" />
          <rect x={node.x + 13} y={node.y + 14} width="6" height="6" className="ill-pop" />
          <text x={node.x + 26} y={node.y + 20.5} className="ill-text">
            {node.label}
          </text>
        </g>
      ))}

      <rect x="132" y="72" width="56" height="56" className="ill-accent" />
      <path
        d="M150 96.5a10.5 10.5 0 0 1 18.5-5.5M170 103.5a10.5 10.5 0 0 1-18.5 5.5M168.8 85.5v5.8h-5.8M151.2 114.5v-5.8h5.8"
        className="ill-hub"
      />
    </svg>
  );
}

/** Maintenance : un logiciel qui avance version après version. */
function MaintenanceArt() {
  const versions = [
    { tag: "v1.0", label: "Mise en ligne" },
    { tag: "v1.1", label: "Corrections" },
    { tag: "v1.2", label: "Nouvelles fonctions" },
    { tag: "v1.3", label: "Sécurité" },
  ];

  return (
    <svg viewBox="0 0 320 200" className="ill" aria-hidden="true">
      <path d="M62 38 26 52v26c0 25 15 42 36 50 21-8 36-25 36-50V52Z" className="ill-window" />
      <path d="m46 84 11 11 21-23" className="ill-shield" />
      <rect x="30" y="146" width="64" height="6" className="ill-dim" />
      <rect x="40" y="159" width="44" height="5" className="ill-card" />

      {versions.map((version, index) => {
        const y = 20 + index * 32;
        return (
          <g key={version.tag}>
            <rect x="120" y={y} width="184" height="26" className="ill-card" />
            <rect x="128" y={y + 6} width="32" height="14" className="ill-pill" />
            <text x="144" y={y + 16.5} textAnchor="middle" className="ill-text ill-text--tiny">
              {version.tag}
            </text>
            <text x="168" y={y + 17} className="ill-text">
              {version.label}
            </text>
            <rect x="283" y={y + 6} width="14" height="14" className="ill-accent" />
            <path d={check} transform={`translate(290 ${y + 13})`} className="ill-tick" />
          </g>
        );
      })}

      <rect x="120.5" y="148.5" width="183" height="25" className="ill-next" />
      <rect x="128" y="154" width="32" height="14" className="ill-pill" />
      <text x="144" y="164.5" textAnchor="middle" className="ill-text ill-text--tiny">
        v1.4
      </text>
      <text x="168" y="165" className="ill-text ill-text--dim">
        La suite…
      </text>
    </svg>
  );
}

const arts = {
  metier: MetierArt,
  mobile: MobileArt,
  automatisation: AutomatisationArt,
  maintenance: MaintenanceArt,
} as const;

export function ServiceArt({ id }: { id: keyof typeof arts }) {
  const Art = arts[id];
  return <Art />;
}
