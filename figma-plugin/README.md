# Portfolio → Figma

Deux façons de régénérer le design du portfolio dans Figma.

## 1. Le fichier Figma (déjà généré)

https://www.figma.com/design/Gb8wAWWXp5B18GVr5qtpuD

Contient : `Desktop 1440 · Dark`, `Desktop 1440 · Light`, `Mobile 390 · Dark`, un board `Design System`, et une section `Composants (sources)`.

## 2. Ce plugin local (fallback / régénération hors ligne)

Utile pour repartir de zéro dans un autre fichier Figma, sans passer par le MCP.

```bash
node figma-plugin/build.mjs        # ré-encode les images et écrit code.js
```

Puis dans **Figma Desktop** : `Plugins → Development → Import plugin from manifest…` et choisir
`figma-plugin/manifest.json`. Le plugin apparaît ensuite sous `Plugins → Development → Portfolio Evan Gery`,
avec un menu :

| Commande | Résultat |
|---|---|
| Tout générer | les 4 artboards |
| Desktop 1440 — Dark / Light | une seule page |
| Mobile 390 — Dark | version mobile |
| Design System | tokens, typo, composants |

### Ce qu'il construit

- Une collection de variables **Portfolio** avec les modes *Dark* / *Light*, reprise de `:root` et
  `[data-theme="light"]` dans [app/globals.css](../app/globals.css). Chaque artboard épingle son mode,
  donc la bascule de thème est native.
- 13 styles de texte (`Display/*`, `Body/*`, `Label/*`) dérivés des classes Tailwind de
  [app/page.tsx](../app/page.tsx).
- Les sections dans l'ordre de la page : hero PORT—FOLIO, projets, compétences, à propos, contact.

### Fichiers

```
manifest.json     déclaration du plugin
build.mjs         encode public/*.png|jpg en base64 → src/assets.js, puis concatène en code.js
src/main.js       le constructeur (source à éditer)
src/assets.js     généré — ne pas éditer
code.js           généré — le bundle que Figma charge
```

### Notes

- Les polices **Dela Gothic One** et **Livvic** doivent être disponibles dans Figma. Si elles manquent,
  le plugin retombe sur Inter et le signale au lieu d'échouer.
- Le dégradé de fondu du marquee (`mask-image` en CSS) n'est pas repris : en statique, la piste est
  simplement rognée par son cadre.
