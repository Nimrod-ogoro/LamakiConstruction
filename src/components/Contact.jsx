import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useToast } from './ui/Toast';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import Button from './ui/Button';
import { CiPhone } from "react-icons/ci";
import { MdOutlineMarkEmailUnread, MdOutlineLocationOn } from "react-icons/md";
import emailjs from 'emailjs-com';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.send(
      "service_ip5x6gl",       // from EmailJS
      "template_pwdcxpf",      // from EmailJS
      formData,
      "7bQSKiVHnehsPijB7"        // from EmailJS
    ).then(() => {
      toast({
        title: 'Thank You for Contacting Us',
        description: 'We will get back to you within 24 hours to discuss your project.',
      });

      setFormData({ name: "", email: "", phone: "", message: "" });
    }).catch((error) => {
      toast({
        title: 'Error Sending Message',
        description: 'Please try again later.',
      });
      console.error("EmailJS error:", error);
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: <CiPhone className='form-icon' />,
      title: "Phone",
      content: "+254 781 190905",
      description: "Mon-Fri: 8am - 5pm",
    },
    {
      icon: <MdOutlineMarkEmailUnread className='form-icon' />,
      title: "Email",
      content: "lamakidesignsltd@gmail.com",
      description: "24/7 Support"
    },
    {
      icon: <MdOutlineLocationOn className='form-icon' />,
      title: "Office",
      content: "Nairobi, Kenya",
      description: "Ruai, Githunguri road"
    }
  ];

  return (
    <section id='contact' className='contact'>
      <h2 className='contact-h'>Ready to Start Your Project</h2>
      <p className='contact-p'>
        Get in touch with our team for a free consultation and detailed project estimate.
        We're here to bring your construction vision to life.
      </p>

      <div className='contact-content'>
        <div>
          <div className='contact-info-grid'>
            {contactInfo.map((info, index) => (
              <Card key={index} className="contact-card">
                <CardContent className="contact-card-content">
                  {info.icon}
                  <h3 className='contact-card-title'>{info.title}</h3>
                  <p className='contact-card-p'>{info.content}</p>
                  <p className='contact-card-description'>{info.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className='contact-form'>
          <Card className='contact-card-form'>
            <CardHeader className='contact-card-header-form'>
              <CardTitle className='contact-card-title-form'>
                <h2 className='contact-card-title'>Get Your Free Quote</h2>
              </CardTitle>
            </CardHeader>
            <CardContent className='contact-card-content-form'>
              <p className='contact-card-p'>
                Fill out the form below to provide us with details about your project.
                Our team will review your information and get back to you promptly.
              </p>
              <form onSubmit={handleSubmit} className='form'>
                <div className='input'>
                  <label className='form-label'>Full Name</label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className='form-input'
                    required
                  />

                  <label className='form-label'>Email Address*</label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your@gmail.com"
                    className='form-input'
                    required
                  />

                  <label className='form-label'>Phone Number*</label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(e.g., +254 781 190905)"
                    className='form-input'
                  />

                  <label className='form-label'>Project Details*</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Describe your project, requirements, and any specific details you want us to know."
                    rows={5}
                    required
                    className='form-input'
                  />

                  <Button type="submit" className='contact-btn'>Send Message</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;


