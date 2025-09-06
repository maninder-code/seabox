import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Hero from './sections/Hero.jsx'
import IntroBand from './sections/IntroBand.jsx'
import Services from './sections/Services.jsx'
import Contact from './sections/Contact.jsx'

export default function App(){
  return (
    <div className="app-shell">
      <Header />
      <main>
        <Hero />
        <IntroBand />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
