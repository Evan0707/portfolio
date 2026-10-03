/**
 * Sépare un texte de son dernier mot, pour l'empêcher de se couper en fin de
 * ligne (« sur-mesure. » ne doit pas se briser après le trait d'union).
 */
export function splitLastWord(text: string): [head: string, last: string] {
  const index = text.lastIndexOf(" ");
  return index === -1 ? ["", text] : [text.slice(0, index + 1), text.slice(index + 1)];
}
