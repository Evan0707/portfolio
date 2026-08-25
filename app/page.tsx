import MouseGrid from './components/MouseGrid'
import StatusBar from './components/sections/StatusBar'
import Hero from './components/sections/Hero'
import Parcours from './components/sections/Parcours'
import Projets from './components/sections/Projets'
import Competences from './components/sections/Competences'
import APropos from './components/sections/APropos'
import Contact from './components/sections/Contact'

/**
 * Portfolio v2.
 *
 * Ordre pensé pour un recruteur en alternance : disponibilité (bandeau fixe),
 * qui je suis (hero), où j'étudie et ce que j'ai déjà fait (parcours), ce que
 * je sais construire (projets), avec quoi (compétences), qui je suis vraiment
 * (à propos), comment me joindre (contact).
 */
export default function Home() {
  return (
    <>
      <StatusBar />
      <main className="overflow-hidden relative" role="main">
        <MouseGrid />
        <Hero />
        <Parcours />
        <Projets />
        <Competences />
        <APropos />
        <Contact />
      </main>
    </>
  )
}
