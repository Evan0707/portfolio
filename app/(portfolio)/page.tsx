import MouseGrid from '@/app/components/MouseGrid'
import StatusBar from '@/app/components/sections/StatusBar'
import Hero from '@/app/components/sections/Hero'
import Parcours from '@/app/components/sections/Parcours'
import Projets from '@/app/components/sections/Projets'
import Competences from '@/app/components/sections/Competences'
import APropos from '@/app/components/sections/APropos'
import Contact from '@/app/components/sections/Contact'

/**
 * Portfolio v2.
 *
 * Le dossier `(portfolio)` est un groupe de routes : il n'apparaît pas dans
 * l'URL, et son layout ne s'applique pas à /studio, qui a le sien.
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
