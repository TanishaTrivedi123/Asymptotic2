import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-black text-textColor border-t border-white/10 py-2 px-4">

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-10">

        {/* CONTACT US */}
        <div className="space-y-2 text-center">
          <h4 className="text-sm font-inter font-semibold">Contact Us</h4>

          <ul className="text-gray-400">
            <li className="flex items-center gap-2">
              <MdEmail className="text-skyBlue" />
              <a
                href="mailto:info@asymptotic.com"
                className="hover:text-skyBlue font-roboto font-normal text-sm transition"
              >
                asymptotic.noreply@gmail.com
              </a>
            </li>
          </ul>
        </div>

        {/* FOLLOW US */}
        <div className="space-y-2 text-center">
          <h4 className="text-sm font-inter font-semibold">Follow Us</h4>

          <div className="flex gap-4 text-gray-400 text-lg">
            <Link to="https://www.facebook.com/" target="_blank" className="hover:text-skyBlue text-sm font-roboto font-normal transition">
              <FaFacebookF />
            </Link>
            <Link to="https://x.com/?lang=en-in" target="_blank" className="hover:text-skyBlue text-sm font-roboto font-normal transition">
              <FaTwitter />
            </Link>
            <Link to="https://www.instagram.com/" target="_blank" className="hover:text-skyBlue text-sm font-roboto font-normal transition">
              <FaInstagram />
            </Link>
            <Link to="https://in.linkedin.com/" target="_blank" className="hover:text-skyBlue text-sm font-roboto font-normal transition">
              <FaLinkedinIn />
            </Link>
          </div>
        </div>

      </div>

    </footer>
  )
}

export default Footer