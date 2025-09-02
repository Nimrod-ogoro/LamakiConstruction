import React from 'react'
import { LuHouse } from "react-icons/lu";
import { FaScrewdriverWrench } from "react-icons/fa6";
import { CiDeliveryTruck } from "react-icons/ci";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import Button from './ui/Button';
import { Link } from 'react-router';


const Services = () => {
   const services = [
    {
      icon: <LuHouse className='service-icon' />,
      title: "Residential Construction",
      description: "Expert construction services for homes, ensuring quality and durability.",
      features: ["Custom home design", "Room additions", "Renovations and extensions", "Energy-efficient solutions"],
      link: <Link to='/Residential'>Learn More</Link>

    },
    {
      icon: <img src="comercial.png" className='commercial-icon' alt="comercial-img"/>,
      title: "Commercial Construction",
      description: "Comprehensive construction solutions for commercial properties.",
      features: ["Office buildings", "Retail spaces", "Warehouses", "Industrial facilities"],
       link: <Link to='/Commercial'>Learn More</Link>
    },
    {
      icon: <CiDeliveryTruck className='service-icon' />,
      title: "Project Management",
      description: "End-to-end project management services to ensure timely and on-budget delivery.",
      features: ["Planning and scheduling", "Budget management", "Quality control", "Risk management"],
       link: <Link to='/ProjectManagemnet'>Learn More</Link>
    },
    {
      icon: <FaScrewdriverWrench className='service-icon' />,
      title: "Renovation and Remodeling",
      description: "Transforming existing spaces with modern designs and functionality.",
      features: ["Kitchen remodeling", "Bathroom renovations", "Interior design", "Exterior upgrades"],
       link: <Link to='/Renovations'>Learn More</Link>
    }
   ]
  return (
    <section id='services' className='services'>
<div className='services-content'>
        <h2 className='services-title'>Our Construction Services</h2>
        <p className='services-subtitle'> We provide comprehensive construction services for residential and commercial projects,<br/>
            delivering quality craftsmanship and exceptional results</p>
</div>
   <div className='services-list'>
      {services.map((service, index) => (
        <Card
          key={index}
          className='service-card'>
          <CardHeader>
            <div className='service-icon-container'>
              {service.icon}
            </div>
            <CardTitle className='service-title'>{service.title}</CardTitle>
            
            </CardHeader>
          <CardContent>
            <CardDescription className='service-description'>{service.description}</CardDescription>
            <ul className='service-features'>
              {service.features.map((feature, featureIndex) => (
                <li key={featureIndex} className='service-feature'>{feature}</li>
              ))}
            </ul>
          </CardContent>
          <Button className='service-btn'>{service.link}</Button>
          </Card>))}
          </div>

        </section>
  )
}

export default Services
