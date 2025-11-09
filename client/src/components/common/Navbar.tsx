import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const items = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  {
    label: "Services",
    to: "/services",
    dropdown: [
      { label: "AI Resume Builder", to: "/ai-resume-builder" },
      { label: "Career Quiz", to: "/quiz" },
      { label: "Job Matching", to: "/jobs" },
      { label: "Interview Prep", to: "/mock-interview" },
    ],
  },
  {
    label: "Projects",
    to: "/projects",
    dropdown: [
      { label: "All Projects", to: "/projects" },
      { label: "Web Development", to: "/projects?tag=web" },
      { label: "AI & ML", to: "/projects?tag=ai" },
      { label: "Mobile Apps", to: "/projects?tag=mobile" },
    ],
  },
  { label: "Blog", to: "/blog" },
  { label: "Careers", to: "/jobs" },
  { label: "Contact", to: "/contact" },
];

// Small logo loader with fallback when the image fails to load
const LogoImg: React.FC = () => {
  const [failed, setFailed] = useState(false);
  const logoFile = 'Screenshot 2025-11-08 015759.png';
  const base = process.env.PUBLIC_URL || '';
  // Build a normalized path and encode spaces/unsafe chars
  const logoSrc = encodeURI((base + '/' + logoFile).replace(/\\/g, '/').replace(/\/\/+/g, '/'));

  if (failed) {
    return <div className="navbar-logo-fallback" aria-hidden="true">MS</div>;
  }

  return <img src={logoSrc} alt="MasterSolis" onError={() => setFailed(true)} />;
};

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        {/* Logo loader: encode URI so spaces are handled. If the image fails to load, a small text fallback shows. */}
        <LogoImg />
      </div>

      <motion.div
        className="navbar-menu"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {items.map((item, index) => {
          const hasDropdown = !!item.dropdown;

          if (hasDropdown) {
            return (
              <div key={item.label} className="navbar-item dropdown" tabIndex={0}>
                <motion.span
                  className="navbar-item-label"
                  variants={{
                    hidden: { opacity: 0, y: 30, scale: 0.9 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: {
                        duration: 0.4,
                        delay: index * 0.05,
                        ease: "easeOut",
                      },
                    },
                  }}
                  whileHover={{ scale: 1.02 }}
                >
                  {item.label}
                </motion.span>

                <div className="navbar-dropdown-menu">
                  <NavLink to={item.to}>{"All " + item.label}</NavLink>
                  {item.dropdown!.map((d) => (
                    <NavLink key={d.to} to={d.to}>
                      {d.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            );
          }

          return (
            <motion.div key={item.label} variants={{
              hidden: { opacity: 0, y: 30, scale: 0.9 },
              visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, delay: index * 0.05, ease: "easeOut" } }
            }}>
              <NavLink to={item.to} className="navbar-item">
                {item.label}
              </NavLink>
            </motion.div>
          );
        })}
      </motion.div>
    </nav>
  );
}
