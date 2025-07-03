import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({ user, onLogout, children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} onLogout={onLogout} /> {/* Pass onLogout to Navbar */}
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
