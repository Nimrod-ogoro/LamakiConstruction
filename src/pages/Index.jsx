
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Services from '../components/Services'
import About from '../components/About'
import Footer from '../components/Footer'
import Chatbot from '../components/Chatbot'

import Contact from '../components/Contact'
import Projects from '../components/projects'



const Index = () => {
  return (
    <div className='bg-gray-100'>
      <Navbar/>
      <Hero/>
      <Services/>
      
      <Projects/>
      <About/>
     
      <Contact/>
      <Footer/>
      <Chatbot/>

    </div>
  )
}

export default Index
