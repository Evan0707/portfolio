// ============================================================================
//  Portfolio Evan Gery -> Figma
//  Rebuilds app/page.tsx as native Figma layers, driven by the same tokens
//  as app/globals.css. Colours go through a "Portfolio" variable collection
//  with Dark / Light modes, so each artboard just pins the mode it wants.
// ============================================================================

// ---------------------------------------------------------------- primitives

function hexToRgb(hex) {
  const h = hex.replace('#', '')
  return {
    r: parseInt(h.slice(0, 2), 16) / 255,
    g: parseInt(h.slice(2, 4), 16) / 255,
    b: parseInt(h.slice(4, 6), 16) / 255,
  }
}

function decodeBase64(b64) {
  if (typeof figma.base64Decode === 'function') return figma.base64Decode(b64)
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
  const clean = b64.replace(/=+$/, '')
  const out = new Uint8Array((clean.length * 3) >> 2)
  let acc = 0, bits = 0, p = 0
  for (let i = 0; i < clean.length; i++) {
    acc = (acc << 6) | chars.indexOf(clean[i])
    bits += 6
    if (bits >= 8) { bits -= 8; out[p++] = (acc >> bits) & 0xff }
  }
  return out
}

// Approximate baseline offset inside a text box, for `items-baseline` rows.
function baselineOffset(lineHeight, size) { return (lineHeight + size * 0.72) / 2 }

// ------------------------------------------------------------------- colours

const THEMES = {
  dark: { key: 'dark', label: 'Dark', background: '#0A0A0B', foreground: '#FFFFFF', green: '#22C55E' },
  light: { key: 'light', label: 'Light', background: '#F5F5F5', foreground: '#0A0A0B', green: '#16A34A' },
}

// Every alpha step the design actually uses (text-white/40, card bg 3%, grid 2%...).
const STEPS = [100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 5, 3, 2]
const stepName = (s) => (s >= 10 ? String(s) : '0' + s)

let THEME = THEMES.dark
let COLLECTION = null
let MODES = {}
const VARS = {}
const WARNINGS = []

async function setupVariables() {
  if (!figma.variables || typeof figma.variables.createVariableCollection !== 'function') {
    WARNINGS.push('API Variables indisponible — couleurs écrites en dur.')
    return
  }
  try {
    COLLECTION = figma.variables.createVariableCollection('Portfolio - Evan Gery')
    const darkMode = COLLECTION.modes[0].modeId
    COLLECTION.renameMode(darkMode, 'Dark')
    MODES = { dark: darkMode, light: COLLECTION.addMode('Light') }

    const make = (name, darkRgba, lightRgba) => {
      let v
      try { v = figma.variables.createVariable(name, COLLECTION, 'COLOR') }
      catch (e) { v = figma.variables.createVariable(name, COLLECTION.id, 'COLOR') }
      v.setValueForMode(MODES.dark, darkRgba)
      v.setValueForMode(MODES.light, lightRgba)
      VARS[name] = v
    }
    const withAlpha = (hex, a) => {
      const c = hexToRgb(hex)
      return { r: c.r, g: c.g, b: c.b, a: a }
    }

    make('background', withAlpha(THEMES.dark.background, 1), withAlpha(THEMES.light.background, 1))
    for (const s of STEPS) {
      make(
        'foreground/' + stepName(s),
        withAlpha(THEMES.dark.foreground, s / 100),
        withAlpha(THEMES.light.foreground, s / 100)
      )
    }
    make('accent/green', withAlpha(THEMES.dark.green, 1), withAlpha(THEMES.light.green, 1))
  } catch (e) {
    COLLECTION = null
    WARNINGS.push('Collection de variables non créée (' + e.message + ') — couleurs en dur.')
  }
}

function bindPaint(name, paint) {
  const v = VARS[name]
  if (!v) return paint
  try { return figma.variables.setBoundVariableForPaint(paint, 'color', v) }
  catch (e) { return paint }
}

function bg() {
  return bindPaint('background', { type: 'SOLID', color: hexToRgb(THEME.background), opacity: 1 })
}

// foreground at N% - covers text-white/40, border-white/10, bg-white/3, ...
function fg(step) {
  const s = step == null ? 100 : step
  return bindPaint('foreground/' + stepName(s), {
    type: 'SOLID', color: hexToRgb(THEME.foreground), opacity: s / 100,
  })
}

function green() {
  return bindPaint('accent/green', { type: 'SOLID', color: hexToRgb(THEME.green), opacity: 1 })
}

function pinMode(node, themeKey) {
  if (!COLLECTION || !MODES[themeKey]) return
  try { node.setExplicitVariableModeForCollection(COLLECTION, MODES[themeKey]); return }
  catch (e) { /* older signature below */ }
  try { node.setExplicitVariableModeForCollection(COLLECTION.id, MODES[themeKey]) } catch (e) { }
}

// --------------------------------------------------------------------- fonts

const FONT_MAP = {}
const FALLBACKS = {
  'Dela Gothic One|Regular': { family: 'Inter', style: 'Black' },
  'Livvic|Light': { family: 'Inter', style: 'Light' },
  'Livvic|Regular': { family: 'Inter', style: 'Regular' },
  'Livvic|SemiBold': { family: 'Inter', style: 'Semi Bold' },
  'Livvic|Bold': { family: 'Inter', style: 'Bold' },
}

async function loadFonts() {
  const missing = []
  const keys = Object.keys(FALLBACKS)
  for (let i = 0; i < keys.length; i++) {
    const parts = keys[i].split('|')
    const wanted = { family: parts[0], style: parts[1] }
    let ok = false
    try { await figma.loadFontAsync(wanted); FONT_MAP[keys[i]] = wanted; ok = true }
    catch (e) { missing.push(parts[0] + ' ' + parts[1]) }
    if (ok) continue
    try { await figma.loadFontAsync(FALLBACKS[keys[i]]); FONT_MAP[keys[i]] = FALLBACKS[keys[i]] }
    catch (e) {
      const last = { family: 'Inter', style: 'Regular' }
      await figma.loadFontAsync(last)
      FONT_MAP[keys[i]] = last
    }
  }
  if (missing.length) {
    WARNINGS.push('Polices absentes, remplacées par Inter : ' + missing.join(', ') +
      '. Installe-les (Google Fonts) puis relance le plugin.')
  }
}

const font = (family, style) =>
  FONT_MAP[family + '|' + (style || 'Regular')] || { family: 'Inter', style: 'Regular' }

// Named type presets - also published as Figma text styles.
const TYPE = {
  'Display/Hero': { family: 'Dela Gothic One', size: 172.8, lh: 172.8, ls: -2.5 },
  'Display/Contact': { family: 'Dela Gothic One', size: 115.2, lh: 115.2, ls: -2.5 },
  'Display/Section': { family: 'Dela Gothic One', size: 57.6, lh: 57.6, ls: 2.5 },
  'Display/Skill': { family: 'Dela Gothic One', size: 60, lh: 60 },
  'Display/H3': { family: 'Dela Gothic One', size: 36, lh: 45 },
  'Display/Stat': { family: 'Dela Gothic One', size: 36, lh: 40 },
  'Body/Large': { family: 'Livvic', size: 18, lh: 29.25 },
  'Body/Base': { family: 'Livvic', size: 16, lh: 24 },
  'Body/Small': { family: 'Livvic', size: 14, lh: 20 },
  'Body/XSmall': { family: 'Livvic', size: 12, lh: 16 },
  'Link/Body': { family: 'Livvic', size: 18, lh: 28 },
  'Label/Caps': { family: 'Livvic', size: 12, lh: 16, ls: 10, upper: true },
  'Label/Button': { family: 'Livvic', size: 14, lh: 20, ls: 5, upper: true },
}

const TEXT_STYLES = {}
function createTextStyles() {
  const names = Object.keys(TYPE)
  for (let i = 0; i < names.length; i++) {
    const p = TYPE[names[i]]
    try {
      const s = figma.createTextStyle()
      s.name = names[i]
      s.fontName = font(p.family, p.style)
      s.fontSize = p.size
      s.lineHeight = { unit: 'PIXELS', value: p.lh }
      s.letterSpacing = { unit: 'PERCENT', value: p.ls || 0 }
      if (p.upper) s.textCase = 'UPPER'
      TEXT_STYLES[names[i]] = s
    } catch (e) { /* text styles are a nicety, never fatal */ }
  }
}

// --------------------------------------------------------------- node makers

function frame(name, w, h) {
  const f = figma.createFrame()
  f.name = name
  f.resize(Math.max(w, 0.01), Math.max(h, 0.01))
  f.fills = []
  f.clipsContent = false
  return f
}

function rect(name, w, h) {
  const r = figma.createRectangle()
  r.name = name
  r.resize(Math.max(w, 0.01), Math.max(h, 0.01))
  r.fills = []
  return r
}

function place(parent, node, x, y) {
  parent.appendChild(node)
  node.x = x
  node.y = y
  return node
}

function line(name, w, h, paint) {
  const r = rect(name, w, h)
  r.fills = [paint]
  return r
}

// o: { preset | family/size/lh/ls/upper, text, paint, width, align, name }
function text(o) {
  const preset = o.preset ? TYPE[o.preset] : {}
  const family = o.family || preset.family || 'Livvic'
  const style = o.style || preset.style || 'Regular'
  const size = o.size != null ? o.size : preset.size
  const lh = o.lh != null ? o.lh : (preset.lh != null ? preset.lh : size * 1.5)
  const ls = o.ls != null ? o.ls : (preset.ls || 0)
  const upper = o.upper != null ? o.upper : !!preset.upper

  const t = figma.createText()
  t.fontName = font(family, style)
  t.fontSize = size
  t.lineHeight = { unit: 'PIXELS', value: lh }
  t.letterSpacing = { unit: 'PERCENT', value: ls }
  t.characters = o.text
  t.fills = [o.paint || fg(100)]
  if (upper) t.textCase = 'UPPER'
  if (o.align) t.textAlignHorizontal = o.align

  if (o.width) {
    t.textAutoResize = 'HEIGHT'
    t.resize(o.width, t.height)
  } else {
    t.textAutoResize = 'WIDTH_AND_HEIGHT'
  }

  // Only inherit the shared style when nothing about the type was overridden.
  const untouched = o.preset && o.size == null && o.lh == null &&
    o.ls == null && o.upper == null && !o.style
  if (untouched && TEXT_STYLES[o.preset]) {
    try { t.textStyleId = TEXT_STYLES[o.preset].id } catch (e) { }
  }
  t.name = o.name || (o.text.length > 28 ? o.text.slice(0, 28) : o.text)
  return t
}

// Wrapping auto-layout row - mirrors `flex flex-wrap gap-N`.
function wrapRow(name, width, gap, align) {
  const f = frame(name, width, 1)
  f.layoutMode = 'HORIZONTAL'
  f.layoutWrap = 'WRAP'
  f.itemSpacing = gap
  f.counterAxisSpacing = gap
  f.primaryAxisSizingMode = 'FIXED'
  f.counterAxisSizingMode = 'AUTO'
  f.primaryAxisAlignItems = align || 'MIN'
  f.counterAxisAlignItems = 'CENTER'
  f.clipsContent = false
  f.resize(width, 1)
  return f
}

// Vertical auto-layout column - mirrors `space-y-N`.
function column(name, width, gap) {
  const f = frame(name, width, 1)
  f.layoutMode = 'VERTICAL'
  f.itemSpacing = gap
  f.primaryAxisSizingMode = 'AUTO'
  f.counterAxisSizingMode = 'FIXED'
  f.clipsContent = false
  f.resize(width, 1)
  return f
}

function tagChip(label, opts) {
  const o = opts || {}
  const t = frame('Tag / ' + label, 1, 1)
  t.layoutMode = 'HORIZONTAL'
  t.primaryAxisSizingMode = 'AUTO'
  t.counterAxisSizingMode = 'AUTO'
  t.paddingLeft = 16; t.paddingRight = 16
  t.paddingTop = 8; t.paddingBottom = 8
  t.strokes = [fg(10)]
  t.strokeWeight = 1
  t.fills = o.filled ? [fg(3)] : []
  t.appendChild(text({ preset: 'Body/Small', text: label, paint: fg(o.textStep || 50) }))
  return t
}

function fitHeight(f, extra) {
  let max = 0
  for (let i = 0; i < f.children.length; i++) {
    const c = f.children[i]
    max = Math.max(max, c.y + c.height)
  }
  f.resize(f.width, max + (extra || 0))
  return f
}

// --------------------------------------------------------------------- media

const IMAGE_HASHES = {}
function imageHash(key) {
  if (IMAGE_HASHES[key]) return IMAGE_HASHES[key]
  try {
    const img = figma.createImage(decodeBase64(ASSETS[key].b64))
    IMAGE_HASHES[key] = img.hash
    return img.hash
  } catch (e) {
    WARNINGS.push('Image "' + key + '" non importée (' + e.message + ').')
    return null
  }
}

function imagePaint(key, desaturate) {
  const hash = imageHash(key)
  if (!hash) return fg(5)
  const paint = { type: 'IMAGE', scaleMode: 'FILL', imageHash: hash }
  if (desaturate) paint.filters = { saturation: -1 }   // matches `grayscale`
  return paint
}

function svgIcon(name, svg, paint, size) {
  let node
  try { node = figma.createNodeFromSvg(svg) }
  catch (e) { return line(name, size, size, paint) }
  node.name = name
  const tint = (n) => {
    if ('strokes' in n && n.strokes.length) n.strokes = [paint]
    if ('fills' in n && Array.isArray(n.fills) && n.fills.length) n.fills = [paint]
    if ('children' in n) n.children.forEach(tint)
  }
  tint(node)
  node.fills = []
  if (size && node.width) node.rescale(size / node.width)
  return node
}

const ICONS = {
  menu: '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 18L1 18" stroke="white"/><path d="M21 11L6 11" stroke="white"/><path d="M19 4L3 4" stroke="white"/></svg>',
  close: '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 3L5 17" stroke="white"/><path d="M20 20L3 3" stroke="white"/></svg>',
  moon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" xmlns="http://www.w3.org/2000/svg"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
}

// -------------------------------------------------------------- layout scale

// Resolves the vw-based sizing and the md: breakpoint into concrete px.
function layoutFor(width) {
  const isMobile = width < 768
  const PAD = Math.round(width * (isMobile ? 0.05 : 0.073) * 100) / 100
  return {
    W: width,
    isMobile: isMobile,
    PAD: PAD,
    contentW: width - PAD * 2,
    // GradualSpacing carries its own pl-[7.3vw] on top of the section padding.
    headingX: PAD + width * 0.073,
    heroTitle: width * (isMobile ? 0.18 : 0.12),
    sectionTitle: width * 0.04,
    contactTitle: width * (isMobile ? 0.12 : 0.08),
    heroH: isMobile ? 844 : 900,
    sectionGap: isMobile ? 200 : 350,
    folioOverlap: isMobile ? 16 : 32,
    waveW: width * (isMobile ? 0.35 : 0.2),
    projCols: isMobile ? 1 : 3,
    projGap: isMobile ? 24 : 32,
    colCount: isMobile ? 1 : 2,
    colGap: isMobile ? 48 : 80,
    skillSize: isMobile ? 36 : 60,
    skillGap: isMobile ? 64 : 96,
    aboutGap: isMobile ? 48 : 80,
    contactTop: isMobile ? 48 : 64,
  }
}

const PROJECTS = [
  { title: 'openChantier', sub: 'SaaS — Gestion de chantier', num: '01', image: 'openchantier' },
  { title: 'SFK Project', sub: 'Branding & Web Development', num: '02', image: 'sfk' },
]

const MARQUEE_SKILLS = [
  { name: 'React', sub: 'Frontend' },
  { name: 'React Native', sub: 'Mobile' },
  { name: 'Next.js', sub: 'Framework' },
  { name: 'Supabase', sub: 'Back-end' },
  { name: 'PostgreSQL', sub: 'Base de données' },
]

const SKILL_TAGS = ['JavaScript', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Git']

const STATS = [
  { value: '3+', label: 'Ans avec React' },
  { value: '2+', label: 'Ans avec Next.js' },
  { value: '1+', label: 'An avec React Native' },
  { value: '2+', label: 'Ans avec TypeScript' },
]

const SERVICES = ['Sites web', 'Apps mobiles', 'UI/UX Design']

// ============================================================================
//  SECTIONS
// ============================================================================

function buildHero(L) {
  const f = frame('01 / Hero', L.W, L.heroH)

  // --- top bar: theme toggle left, burger right (px-PAD, pt-8) -------------
  const toggle = frame('Theme toggle', 40, 40)
  toggle.cornerRadius = 20
  toggle.strokes = [fg(10)]
  toggle.strokeWeight = 1
  place(f, toggle, L.PAD, 32)
  const moon = svgIcon('Moon', ICONS.moon, fg(70), 18)
  place(toggle, moon, (40 - 18) / 2, (40 - moon.height) / 2)

  const burger = svgIcon('Menu', ICONS.menu, fg(70), 24)
  place(f, burger, L.W - L.PAD - 24, 32)

  // --- centre block: PORT / FOLIO + wave + subtitle ------------------------
  const port = text({ preset: 'Display/Hero', size: L.heroTitle, lh: L.heroTitle, ls: -2.5, text: 'PORT', paint: fg(100) })
  const dash = text({ preset: 'Display/Hero', size: L.heroTitle, lh: L.heroTitle, ls: -2.5, text: '—', paint: fg(20), name: 'Dash' })
  const folio = text({ preset: 'Display/Hero', size: L.heroTitle, lh: L.heroTitle, ls: -2.5, text: 'FOLIO', paint: fg(100) })

  const row1W = port.width + dash.width
  const blockW = Math.max(row1W, folio.width)
  const row2Y = L.heroTitle - L.folioOverlap
  const blockH = row2Y + L.heroTitle

  const block = frame('Titre PORT-FOLIO', blockW, blockH)
  place(block, port, 0, 0)
  place(block, dash, port.width, 0)
  place(block, folio, blockW - folio.width, row2Y)   // justify-end

  // Decorative wave, centred behind the wordmark.
  const waveRatio = ASSETS.wave.h / ASSETS.wave.w
  const wave = rect('Vague (décoratif)', L.waveW, L.waveW * waveRatio)
  const wavePaint = imagePaint('wave', false)
  if (wavePaint.type === 'IMAGE') wavePaint.scaleMode = 'FIT'
  wave.fills = [wavePaint]
  wave.opacity = 0.9
  place(block, wave, (blockW - L.waveW) / 2, (blockH - L.waveW * waveRatio) / 2)
  block.insertChild(0, wave)   // behind PORT/FOLIO, like the absolute inset-0 layer

  const subtitle = text({
    preset: 'Body/Base', size: L.isMobile ? 14 : 16, lh: L.isMobile ? 20 : 24,
    ls: 20, upper: true, text: 'Evan Gery — Développeur Full Stack', paint: fg(50),
  })

  // The wordmark lives in the flex-1 band between the top bar and bottom info.
  const bandTop = 32 + 40
  const bandBottom = L.heroH - 32 - 36
  const groupH = blockH + 32 + subtitle.height
  const groupY = bandTop + (bandBottom - bandTop - groupH) / 2

  place(f, block, (L.W - blockW) / 2, groupY)
  place(f, subtitle, (L.W - subtitle.width) / 2, groupY + blockH + 32)

  // --- bottom info (px-PAD, pb-8, items-end) -------------------------------
  const roles = column('Roles', 120, 4)
  roles.appendChild(text({ preset: 'Body/XSmall', text: 'Web Designer', paint: fg(40) }))
  roles.appendChild(text({ preset: 'Body/XSmall', text: 'Web Developer', paint: fg(40) }))
  place(f, roles, L.PAD, L.heroH - 32 - 36)

  const mail = text({ preset: 'Body/XSmall', text: 'evan.gery07@gmail.com', paint: fg(40) })
  place(f, mail, L.W - L.PAD - mail.width, L.heroH - 32 - mail.height)

  // --- scroll indicator ----------------------------------------------------
  const scrollLabel = text({ preset: 'Body/XSmall', size: 10, lh: 13, ls: 10, text: 'SCROLL', paint: fg(30) })
  const scrollH = 32 + 8 + scrollLabel.height
  const scrollTop = L.heroH - 32 - scrollH
  place(f, line('Trait', 1, 32, fg(20)), L.W / 2 - 0.5, scrollTop)
  place(f, scrollLabel, (L.W - scrollLabel.width) / 2, scrollTop + 40)

  return f
}

function sectionHeading(L, label) {
  return text({
    preset: 'Display/Section', size: L.sectionTitle, lh: L.sectionTitle, ls: 2.5,
    text: label, paint: fg(100), name: 'Titre ' + label,
  })
}

function projectCard(L, colW, data) {
  const c = frame('Card / ' + data.title, colW, 1)
  const imgH = colW * 3 / 4                       // aspect-[4/3]

  const thumb = rect('Visuel', colW, imgH)
  thumb.fills = [imagePaint(data.image, true)]    // grayscale by default
  thumb.strokes = [fg(10)]
  thumb.strokeWeight = 1
  place(c, thumb, 0, 0)

  let y = imgH + 16                               // mt-4
  const title = text({ preset: 'Link/Body', text: data.title, paint: fg(100) })
  const num = text({ preset: 'Body/XSmall', text: data.num, paint: fg(30) })
  place(c, title, 0, y)
  // items-baseline between an 18px and a 12px run
  place(c, num, colW - num.width, y + baselineOffset(28, 18) - baselineOffset(16, 12))

  y += title.height + 4                           // mt-1
  const sub = text({ preset: 'Body/Small', text: data.sub, paint: fg(40) })
  place(c, sub, 0, y)

  y += sub.height + 12                            // mt-3
  const link = text({ preset: 'Body/XSmall', text: 'Voir le projet →', paint: fg(50) })
  place(c, link, 0, y)

  return fitHeight(c)
}

function buildProjects(L) {
  const f = frame('02 / Projets', L.W, 1)
  const heading = sectionHeading(L, 'PROJETS')
  place(f, heading, L.headingX, 0)

  let y = heading.height + 32                      // mb-8
  const cols = L.projCols
  const colW = (L.contentW - L.projGap * (cols - 1)) / cols

  const cards = []
  for (let i = 0; i < PROJECTS.length; i++) cards.push(projectCard(L, colW, PROJECTS[i]))

  let rowBottom = y
  let rowTop = y
  for (let i = 0; i < cards.length; i++) {
    if (i > 0 && i % cols === 0) rowTop = rowBottom + L.projGap
    place(f, cards[i], L.PAD + (i % cols) * (colW + L.projGap), rowTop)
    rowBottom = Math.max(rowBottom, rowTop + cards[i].height)
  }

  // pagination dashes
  const dashY = rowBottom + 32
  place(f, line('Actif', 24, 1, fg(50)), L.W / 2 - 30, dashY)
  place(f, line('Inactif', 24, 1, fg(20)), L.W / 2 + 6, dashY)

  return fitHeight(f)
}

function buildSkills(L) {
  const f = frame('03 / Compétences', L.W, 1)
  const heading = sectionHeading(L, 'COMPÉTENCES')
  place(f, heading, L.headingX, 0)

  // --- marquee -------------------------------------------------------------
  let y = heading.height + 64                      // mt-16
  const marquee = frame('Marquee compétences', L.W, 1)
  marquee.clipsContent = true
  let x = L.PAD
  let marqueeH = 0
  for (let i = 0; i < MARQUEE_SKILLS.length; i++) {
    const s = MARQUEE_SKILLS[i]
    const item = frame('Skill / ' + s.name, 1, 1)
    const name = text({
      preset: 'Display/Skill', size: L.skillSize, lh: L.skillSize,
      text: s.name, paint: fg(10),
    })
    const sub = text({ preset: 'Body/XSmall', ls: 30, upper: true, text: s.sub, paint: fg(30) })
    const w = Math.max(name.width, sub.width)
    item.resize(w, name.height + 8 + sub.height)
    place(item, name, (w - name.width) / 2, 0)
    place(item, sub, (w - sub.width) / 2, name.height + 8)   // mt-2, text-center
    place(marquee, item, x, 0)
    x += w + L.skillGap
    marqueeH = Math.max(marqueeH, item.height)
  }
  marquee.resize(L.W, marqueeH)

  // the CSS mask-image fade on both edges
  const fadeW = L.W * 0.1
  const fadeLeft = rect('Fade gauche', fadeW, marqueeH)
  fadeLeft.fills = [{
    type: 'GRADIENT_LINEAR', gradientTransform: [[1, 0, 0], [0, 1, 0]],
    gradientStops: [
      { position: 0, color: Object.assign({ a: 1 }, hexToRgb(THEME.background)) },
      { position: 1, color: Object.assign({ a: 0 }, hexToRgb(THEME.background)) },
    ],
  }]
  place(marquee, fadeLeft, 0, 0)
  const fadeRight = rect('Fade droite', fadeW, marqueeH)
  fadeRight.fills = [{
    type: 'GRADIENT_LINEAR', gradientTransform: [[-1, 0, 1], [0, 1, 0]],
    gradientStops: [
      { position: 0, color: Object.assign({ a: 1 }, hexToRgb(THEME.background)) },
      { position: 1, color: Object.assign({ a: 0 }, hexToRgb(THEME.background)) },
    ],
  }]
  place(marquee, fadeRight, L.W - fadeW, 0)
  place(f, marquee, 0, y)

  // --- static tags ---------------------------------------------------------
  y += marquee.height + 64                         // mt-16
  const tags = wrapRow('Tags compétences', L.contentW, 16, 'CENTER')
  for (let i = 0; i < SKILL_TAGS.length; i++) tags.appendChild(tagChip(SKILL_TAGS[i]))
  place(f, tags, L.PAD, y)

  return fitHeight(f)
}

function statCard(w, data) {
  const c = frame('Stat / ' + data.label, w, 1)
  c.layoutMode = 'VERTICAL'
  c.primaryAxisSizingMode = 'AUTO'
  c.counterAxisSizingMode = 'FIXED'
  c.itemSpacing = 8                                // mt-2
  c.paddingLeft = 24; c.paddingRight = 24          // p-6
  c.paddingTop = 24; c.paddingBottom = 24
  c.strokes = [fg(10)]
  c.strokeWeight = 1
  c.appendChild(text({ preset: 'Display/Stat', text: data.value, paint: fg(100) }))
  c.appendChild(text({ preset: 'Body/Small', text: data.label, paint: fg(40) }))
  return c
}

function buildAbout(L) {
  const f = frame('04 / À propos', L.W, 1)
  const heading = sectionHeading(L, 'À PROPOS')
  place(f, heading, L.headingX, 0)

  const top = heading.height + 48                   // mt-12
  const colW = (L.contentW - L.colGap * (L.colCount - 1)) / L.colCount

  // --- left: bio -----------------------------------------------------------
  const bio = column('Bio', colW, 24)               // space-y-6
  const h3 = text({
    preset: 'Display/H3', size: L.isMobile ? 30 : 36, lh: L.isMobile ? 37.5 : 45,
    text: 'Passionné par le code\n& le design.', paint: fg(100), width: colW, name: 'Titre bio',
  })
  const split = h3.characters.indexOf('\n') + 1
  try { h3.setRangeFills(split, h3.characters.length, [fg(40)]) } catch (e) { }
  bio.appendChild(h3)
  bio.appendChild(text({
    preset: 'Body/Large', width: colW, paint: fg(70),
    text: "Je suis Evan, développeur et designer web passionné, actuellement à la recherche d'une alternance pour progresser et contribuer à des projets ambitieux.",
  }))
  bio.appendChild(text({
    preset: 'Body/Base', lh: 26, width: colW, paint: fg(50),
    text: "En formation en développement web, je cherche une alternance où je pourrai mettre en pratique mes compétences en React, Next.js et React Native au sein d'une équipe et continuer à repousser mes limites.",
  }))
  const ctaWrap = frame('CTA', colW, 1)             // pt-4
  const cta = text({ preset: 'Label/Button', text: 'Me contacter →', paint: fg(80) })
  place(ctaWrap, cta, 0, 16)
  ctaWrap.resize(colW, 16 + cta.height)
  bio.appendChild(ctaWrap)
  place(f, bio, L.PAD, top)

  // --- right: stats + services --------------------------------------------
  const right = column('Stats & services', colW, 32)  // space-y-8
  const grid = frame('Grille stats', colW, 1)
  const statCols = 2
  const statW = (colW - 24) / statCols               // gap-6
  const statCards = []
  for (let i = 0; i < STATS.length; i++) statCards.push(statCard(statW, STATS[i]))

  // rows share the height of their tallest card, like a CSS grid row
  let gridH = 0
  let rowTop = 0
  for (let i = 0; i < statCards.length; i++) {
    if (i > 0 && i % statCols === 0) rowTop = gridH + 24
    place(grid, statCards[i], (i % statCols) * (statW + 24), rowTop)
    gridH = Math.max(gridH, rowTop + statCards[i].height)
  }
  grid.resize(colW, gridH)
  right.appendChild(grid)

  const services = column('Ce que je fais', colW, 16)  // space-y-4
  services.appendChild(text({ preset: 'Label/Caps', text: 'Ce que je fais', paint: fg(40) }))
  const serviceRow = wrapRow('Services', colW, 12, 'MIN')
  for (let i = 0; i < SERVICES.length; i++) {
    serviceRow.appendChild(tagChip(SERVICES[i], { filled: true, textStep: 60 }))
  }
  services.appendChild(serviceRow)
  right.appendChild(services)

  if (L.colCount === 1) place(f, right, L.PAD, top + bio.height + L.colGap)
  else place(f, right, L.PAD + colW + L.colGap, top)

  return fitHeight(f)
}

function formField(w, label, placeholder, boxH) {
  const field = frame('Field / ' + label, w, 1)
  const lab = text({ preset: 'Label/Caps', text: label, paint: fg(40) })
  place(field, lab, 0, 0)
  const ph = text({ preset: 'Body/Base', text: placeholder, paint: fg(30), name: 'Placeholder' })
  const top = lab.height + 8                        // mb-2
  place(field, ph, 0, top)
  const bottom = top + (boxH || ph.height) + 12     // pb-3
  place(field, line('Border bottom', w, 1, fg(20)), 0, bottom)
  return fitHeight(field)
}

function buildContact(L) {
  const f = frame('05 / Contact', L.W, 1)

  const parlons = text({
    preset: 'Display/Contact', size: L.contactTitle, lh: L.contactTitle, ls: -2.5,
    text: 'PARLONS', paint: fg(100),
  })
  const ensemble = text({
    preset: 'Display/Contact', size: L.contactTitle, lh: L.contactTitle, ls: -2.5,
    text: 'ENSEMBLE', paint: fg(20),
  })
  place(f, parlons, L.PAD, 0)
  place(f, ensemble, L.PAD, L.contactTitle - 8)     // -mt-2

  const top = L.contactTitle * 2 - 8 + L.contactTop
  const colW = (L.contentW - L.colGap * (L.colCount - 1)) / L.colCount

  // --- left: coordinates ---------------------------------------------------
  const info = column('Coordonnées', colW, 32)      // space-y-8
  const emailBlock = column('Email', colW, 8)       // mb-2
  emailBlock.appendChild(text({ preset: 'Label/Caps', text: 'Email', paint: fg(40) }))
  emailBlock.appendChild(text({ preset: 'Link/Body', text: 'evan.gery07@gmail.com', paint: fg(80) }))
  info.appendChild(emailBlock)

  const statusBlock = column('Statut', colW, 8)
  statusBlock.appendChild(text({ preset: 'Label/Caps', text: 'Statut', paint: fg(40) }))
  const statusRow = frame('Disponibilité', colW, 1)
  statusRow.layoutMode = 'HORIZONTAL'
  statusRow.primaryAxisSizingMode = 'AUTO'
  statusRow.counterAxisSizingMode = 'AUTO'
  statusRow.counterAxisAlignItems = 'CENTER'
  statusRow.itemSpacing = 8
  const dot = figma.createEllipse()
  dot.name = 'Pastille'
  dot.resize(8, 8)
  dot.fills = [green()]
  statusRow.appendChild(dot)
  statusRow.appendChild(text({ preset: 'Link/Body', text: 'Disponible en alternance', paint: fg(80) }))
  statusBlock.appendChild(statusRow)
  info.appendChild(statusBlock)
  place(f, info, L.PAD, top)

  // --- right: form ---------------------------------------------------------
  const form = column('Formulaire', colW, 24)       // space-y-6
  form.appendChild(formField(colW, 'Votre email', 'hello@exemple.com'))
  form.appendChild(formField(colW, 'Message', 'Parlez-moi de votre projet...', 128))

  const btnWrap = frame('CTA envoyer', colW, 1)     // mt-4
  const btn = frame('Bouton / Envoyer', 1, 1)
  btn.layoutMode = 'HORIZONTAL'
  btn.primaryAxisSizingMode = 'AUTO'
  btn.counterAxisSizingMode = 'AUTO'
  btn.paddingLeft = 32; btn.paddingRight = 32       // px-8
  btn.paddingTop = 12; btn.paddingBottom = 12       // py-3
  btn.strokes = [fg(30)]
  btn.strokeWeight = 1
  btn.appendChild(text({ preset: 'Label/Button', text: 'Envoyer', paint: fg(80) }))
  place(btnWrap, btn, 0, 16)
  btnWrap.resize(colW, 16 + btn.height)
  form.appendChild(btnWrap)

  if (L.colCount === 1) place(f, form, L.PAD, top + info.height + L.colGap)
  else place(f, form, L.PAD + colW + L.colGap, top)

  // --- footer --------------------------------------------------------------
  const contentBottom = Math.max(info.y + info.height, form.y + form.height)
  const footY = contentBottom + 96                  // mt-24
  place(f, line('Séparateur', L.contentW, 1, fg(10)), L.PAD, footY)
  place(f, text({ preset: 'Body/XSmall', text: '© 2026 Evan Gery', paint: fg(30) }), L.PAD, footY + 32)

  return fitHeight(f)
}

// Static wireframe grid from MouseGrid (80px, foreground @ 2%).
function gridBackground(w, h) {
  const g = frame('Grille (fond)', w, h)
  g.clipsContent = true
  for (let x = 80; x < w; x += 80) place(g, line('v', 1, h, fg(2)), x, 0)
  for (let y = 80; y < h; y += 80) place(g, line('h', w, 1, fg(2)), 0, y)
  g.locked = true
  return g
}

// ============================================================================
//  ARTBOARDS
// ============================================================================

function buildPage(themeKey, width, label) {
  THEME = THEMES[themeKey]
  const L = layoutFor(width)

  const page = frame(label, width, 1)
  page.fills = [bg()]
  page.clipsContent = true
  pinMode(page, themeKey)

  const sections = [buildHero(L), buildProjects(L), buildSkills(L), buildAbout(L), buildContact(L)]
  let y = 0
  for (let i = 0; i < sections.length; i++) {
    place(page, sections[i], 0, y)
    y += sections[i].height + L.sectionGap          // mt-[350px] / mt-[200px]
  }
  const totalH = y - L.sectionGap + 200             // mb-[200px] on the last section

  page.resize(width, totalH)
  const grid = gridBackground(width, totalH)
  page.insertChild(0, grid)                         // behind everything
  grid.x = 0
  grid.y = 0
  return page
}

function buildDesignSystem() {
  THEME = THEMES.dark
  const W = 1440
  const board = frame('Design System', W, 1)
  board.fills = [bg()]
  board.clipsContent = true
  pinMode(board, 'dark')

  const PAD = 96
  let y = 96

  place(board, text({ preset: 'Display/H3', text: 'Design System', paint: fg(100) }), PAD, y)
  y += 45 + 8
  place(board, text({
    preset: 'Body/Base', paint: fg(40), width: 700,
    text: 'Tokens, typographie et composants extraits de app/globals.css et app/page.tsx. Les couleurs sont liées à la collection de variables "Portfolio" (modes Dark / Light).',
  }), PAD, y)
  y += 72

  // --- colours -------------------------------------------------------------
  place(board, text({ preset: 'Label/Caps', text: 'Couleurs', paint: fg(40) }), PAD, y)
  y += 32

  const swatches = [{ name: 'background', paint: bg(), label: 'background' }]
  for (let i = 0; i < STEPS.length; i++) {
    swatches.push({
      name: 'foreground/' + stepName(STEPS[i]),
      paint: fg(STEPS[i]),
      label: 'fg / ' + STEPS[i] + '%',
    })
  }
  swatches.push({ name: 'accent/green', paint: green(), label: 'accent' })

  const swatchW = 96
  const swatchStep = swatchW + 24
  const perRow = Math.floor((W - PAD * 2 + 24) / swatchStep)
  const rowStep = 96 + 8 + 16 + 32
  for (let i = 0; i < swatches.length; i++) {
    const s = swatches[i]
    const sx = PAD + (i % perRow) * swatchStep
    const sy = y + Math.floor(i / perRow) * rowStep
    const sw = rect(s.name, swatchW, 96)
    sw.fills = [s.paint]
    sw.strokes = [fg(10)]
    sw.strokeWeight = 1
    place(board, sw, sx, sy)
    place(board, text({ preset: 'Body/XSmall', text: s.label, paint: fg(50) }), sx, sy + 104)
  }
  y += Math.ceil(swatches.length / perRow) * rowStep + 40

  // --- typography ----------------------------------------------------------
  place(board, text({ preset: 'Label/Caps', text: 'Typographie', paint: fg(40) }), PAD, y)
  y += 40
  const names = Object.keys(TYPE)
  for (let i = 0; i < names.length; i++) {
    const p = TYPE[names[i]]
    const meta = text({
      preset: 'Body/XSmall', paint: fg(30),
      text: names[i] + '  -  ' + p.family + ' ' + Math.round(p.size) + '/' + Math.round(p.lh) +
        (p.ls ? '  ls ' + p.ls + '%' : ''),
    })
    place(board, meta, PAD, y)
    const sample = text({
      preset: names[i], paint: fg(90),
      text: p.size >= 100 ? 'Aa' : (p.size >= 36 ? 'Portfolio' : 'Evan Gery — Développeur Full Stack'),
    })
    place(board, sample, PAD + 360, y)
    y += Math.max(sample.height, 24) + 24
  }
  y += 48

  // --- components ----------------------------------------------------------
  place(board, text({ preset: 'Label/Caps', text: 'Composants', paint: fg(40) }), PAD, y)
  y += 40

  const L = layoutFor(1440)
  const card = projectCard(L, 360, PROJECTS[0])
  card.name = 'Composant / Carte projet'
  place(board, card, PAD, y)

  const stat = statCard(280, STATS[0])
  stat.name = 'Composant / Carte stat'
  place(board, stat, PAD + 420, y)

  const chips = wrapRow('Composant / Tags', 320, 16, 'MIN')
  chips.appendChild(tagChip('TypeScript'))
  chips.appendChild(tagChip('UI/UX Design', { filled: true, textStep: 60 }))
  place(board, chips, PAD + 740, y)

  const btn = frame('Composant / Bouton', 1, 1)
  btn.layoutMode = 'HORIZONTAL'
  btn.primaryAxisSizingMode = 'AUTO'
  btn.counterAxisSizingMode = 'AUTO'
  btn.paddingLeft = 32; btn.paddingRight = 32
  btn.paddingTop = 12; btn.paddingBottom = 12
  btn.strokes = [fg(30)]
  btn.strokeWeight = 1
  btn.appendChild(text({ preset: 'Label/Button', text: 'Envoyer', paint: fg(80) }))
  place(board, btn, PAD + 740, y + 120)

  const field = formField(320, 'Votre email', 'hello@exemple.com')
  field.name = 'Composant / Champ'
  place(board, field, PAD + 740, y + 200)

  const toggle = frame('Composant / Theme toggle', 40, 40)
  toggle.cornerRadius = 20
  toggle.strokes = [fg(10)]
  toggle.strokeWeight = 1
  const moon = svgIcon('Moon', ICONS.moon, fg(70), 18)
  place(toggle, moon, 11, (40 - moon.height) / 2)
  place(board, toggle, PAD + 1120, y)

  const burger = svgIcon('Composant / Menu', ICONS.menu, fg(70), 24)
  place(board, burger, PAD + 1180, y + 8)
  const closeIcon = svgIcon('Composant / Close', ICONS.close, fg(70), 24)
  place(board, closeIcon, PAD + 1220, y + 8)

  fitHeight(board, 96)
  return board
}

// ============================================================================
//  ENTRY POINT
// ============================================================================

async function main() {
  await loadFonts()
  await setupVariables()
  createTextStyles()

  const cmd = figma.command || 'all'
  const wanted = {
    all: ['desktop-dark', 'desktop-light', 'mobile-dark', 'design-system'],
    'desktop-dark': ['desktop-dark'],
    'desktop-light': ['desktop-light'],
    'mobile-dark': ['mobile-dark'],
    'design-system': ['design-system'],
  }[cmd] || ['desktop-dark', 'desktop-light', 'mobile-dark', 'design-system']

  const made = []
  let x = 0
  for (let i = 0; i < wanted.length; i++) {
    let node
    if (wanted[i] === 'desktop-dark') node = buildPage('dark', 1440, 'Portfolio - Desktop 1440 - Dark')
    else if (wanted[i] === 'desktop-light') node = buildPage('light', 1440, 'Portfolio - Desktop 1440 - Light')
    else if (wanted[i] === 'mobile-dark') node = buildPage('dark', 390, 'Portfolio - Mobile 390 - Dark')
    else node = buildDesignSystem()

    figma.currentPage.appendChild(node)
    node.x = x
    node.y = 0
    x += node.width + 200
    made.push(node)
  }

  figma.currentPage.selection = made
  figma.viewport.scrollAndZoomIntoView(made)

  const msg = made.length + ' artboard(s) généré(s)' + (WARNINGS.length ? ' - ' + WARNINGS.join(' ') : '')
  figma.notify(msg, { timeout: WARNINGS.length ? 8000 : 3000 })
  figma.closePlugin(msg)
}

main().catch((e) => {
  figma.notify('Erreur : ' + e.message, { error: true, timeout: 8000 })
  figma.closePlugin('Erreur : ' + e.message)
})
