import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { hero, site } from "@/studio/lib/site";
import { theme } from "@/studio/lib/theme";

/**
 * Image affichée quand le site est partagé (LinkedIn, WhatsApp, e-mail…).
 * Générée au build à partir du code, aux couleurs et polices du site.
 */

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Le moteur de rendu ne lit pas les .woff2 : les polices sont en .ttf dans studio/assets/fonts.
const font = (file: string) => readFile(join(process.cwd(), "studio", "assets", "fonts", file));
const [display, text] = await Promise.all([font("DelaGothicOne-Regular.ttf"), font("Livvic-Regular.ttf")]);

const LOGO = [
  "M76 67V60H62V67H69H76ZM69 47H76V43H69H62V47H69ZM13 43H6V71H13H20V43H13ZM69 71H76V67H69H62V71H69ZM41 99V106C60.33 106 76 90.33 76 71H69H62C62 82.598 52.598 92 41 92V99ZM13 71H6C6 90.33 21.67 106 41 106V99V92C29.402 92 20 82.598 20 71H13ZM41 15V8C21.67 8 6 23.67 6 43H13H20C20 31.402 29.402 22 41 22V15ZM69 43H76C76 23.67 60.33 8 41 8V15V22C52.598 22 62 31.402 62 43H69Z",
  "M48 41C48 37.134 44.866 34 41 34C37.134 34 34 37.134 34 41H41H48ZM41 47H48V41H41H34V47H41Z",
  "M66.5087 67C68.4417 67 70.0087 65.433 70.0087 63.5C70.0087 61.567 68.4417 60 66.5087 60V63.5V67ZM37.5 60H34V67H37.5V63.5V60ZM66.5087 63.5V60H37.5V63.5V67H66.5087V63.5Z",
];

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "52px 72px",
          background: theme.bg,
          color: theme.fg,
          fontFamily: "Livvic",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <svg width="36" height="50" viewBox="0 0 82 114">
              {LOGO.map((d) => (
                <path key={d.slice(0, 12)} d={d} fill={theme.fg} />
              ))}
              <path d="M41 67V71.8" fill="none" stroke={theme.fg} strokeWidth="14" strokeLinecap="round" />
            </svg>
            <div style={{ display: "flex", fontFamily: "Dela Gothic One", fontSize: 24, letterSpacing: 1 }}>
              EVAN G. STUDIO
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 22, color: theme.soft }}>
            <div style={{ display: "flex", width: 12, height: 12, borderRadius: 12, background: theme.green }} />
            {site.tagline}
          </div>
        </div>

        {/* « SUR— / MESURE », comme le héros du site. */}
        <div style={{ display: "flex", flexDirection: "column", fontFamily: "Dela Gothic One", fontSize: 188, lineHeight: 0.92 }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span>{hero.word[0]}</span>
            <div style={{ display: "flex", flex: 1, height: 26, marginLeft: 24, marginTop: 14, background: theme.faint }} />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>{hero.word[1]}</div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", fontSize: 26 }}>
          <div style={{ display: "flex", flexDirection: "column", fontFamily: "Dela Gothic One", fontSize: 30, lineHeight: 1.15 }}>
            <span>{hero.title.join(" ").toUpperCase()}</span>
            <span style={{ color: theme.soft }}>{hero.titleMuted.join(" ").toUpperCase()}</span>
          </div>
          <div style={{ display: "flex", color: theme.soft }}>{site.email}</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Dela Gothic One", data: display, weight: 400, style: "normal" },
        { name: "Livvic", data: text, weight: 400, style: "normal" },
      ],
    },
  );
}
