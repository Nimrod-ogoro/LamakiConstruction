import React from "react";
import { FaWhatsapp } from "react-icons/fa"; // ✅ WhatsApp icon

const WhatsAppButton = () => {
  const phoneNumber = "2547XXXXXXXX"; // ✅ Replace with Lamaki's WhatsApp number
  const message = "Hello, I’m interested in your products."; // Optional preset message
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappURL}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
    >
      <FaWhatsapp size={40} />
    </a>
  );
};

export default WhatsAppButton;
