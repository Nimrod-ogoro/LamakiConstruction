import React from 'react'
import Button from './ui/Button'
import { Card, CardContent } from './ui/card'
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { GrUserWorker } from "react-icons/gr";
import { TbClockHour3 } from "react-icons/tb";
import { GrAchievement } from "react-icons/gr";

const About = () => {
  const achivements = [
    {
      icon: <GrAchievement className='achivement-icon' />,
      title: "Over 10 Years of Experience",
      description: "We have been delivering quality construction services for over a decade, building trust and excellence in every project.",
    },
    {
      icon: <IoShieldCheckmarkOutline className='achivement-icon' />,
      title:"Licensed and Insured",
      description: "Our company is fully licensed and insured, ensuring peace of mind for our clients and compliance with all regulations.",
    },
    {
      icon: <GrUserWorker className='achivement-icon' />,
      title:"Expert Team",
      description: "Our team consists of skilled professionals with expertise in various aspects of construction, from project management to specialized trades.",
    },
    {
      icon: <TbClockHour3 className='achivement-icon' />,
      title:"on-time Delivery",
      description: "We pride ourselves on completing projects on time and within budget, ensuring client satisfaction and trust.",
    }
  ]
  return (
    <section id='about' className='services'>
      <div className='about-content'>
        <h2 className='about-title'>About us</h2>
        <div className="left-about-content">

        <p className='about-subtitle'>We are a leading construction company with a commitment to quality and excellence in every project we undertake.
        Our mission is to deliver exceptional construction services that meet the highest standards of quality and safety, while exceeding client expectations.
        We specialize in residential and commercial construction, offering a wide range of services to meet the diverse needs of our clients.</p>
        <p className='about-subtitle-2'>We take pride in our team of skilled professionals who bring expertise, innovation, and dedication to every stage of the construction process. From planning and design to execution and completion, we work closely with our clients to ensure each project is delivered on time, within budget, and to the highest standard. Our commitment to sustainable practices and modern construction techniques ensures lasting value for our clients and the communities we serve.</p>
   <div className='list'>
     <ul className='achivements-list'>
      <li className='text-item'>Family-owned and operated Business</li>
      <li className='text-item'>Customer Satisfaction Guaranteed</li>
      <li className='text-item'>Comprehesive warranty on all work</li>
      <li className='text-item'>Eco-friendly construction practices</li>
      <li className='text-item'>Free consultations and estimates</li>
     </ul>

     <Button className='about-btn'> Learn About Our Process</Button>
   </div>
   </div>
   <div className='right-about-content'>
    <div className='achivements-grid'>
      {achivements.map((achivement, index )=>(
        <Card
        key={index}
        className='achivement-card'>

      <CardContent
      className='achivment-card-content'>
        <div className='achivement-icon'>
          {achivement.icon}
        </div>
        <h3 className='achivement-title'>{achivement.title}</h3>
        <p className='achivement-description'>{achivement.description}</p>
      </CardContent>
      </Card>
      ))}
    </div>
    </div>
       </div>
      
        </section>
  )
}

export default About
