// src/components/Footer.jsx
import React from "react";

function Footer() {
  return (
    <footer className="bg-[#415a77] text-[#e0e1dd] text-center py-4">
      <p>&copy; {new Date().getFullYear()} ElectroCart. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
