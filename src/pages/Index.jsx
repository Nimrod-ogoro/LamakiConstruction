
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Services from '../components/services'
import About from '../components/About'
import Footer from '../components/Footer'
import Chatbot from '../components/Chatbot'
import Projects from '../components/Projects'
import Contact from '../components/contact'
import Merchandise from '../components/Merchandise'


const Index = () => {
  return (
    <div className='bg-gray-100'>
      <Navbar/>
      <Hero/>
      <Services/>
      
      <Projects/>
      <About/>
      <Merchandise/>
      <Contact/>
      <Footer/>
      <Chatbot/>

    </div>
  )
}

export default Index
