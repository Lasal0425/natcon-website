import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 py-6 relative z-50">
      <div className="mx-auto flex items-center justify-center gap-6">
        {/* Instagram */}
        <a
          href="https://www.instagram.com/aiesecinsrilanka/"
          aria-label="Instagram"
          target="_blank"
          rel="noopener noreferrer"
          className="text-natcon-red hover:text-natcon-green transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-5 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5zM18 6.2a1 1 0 1 1-1 1 1 1 0 0 1 1-1z" />
          </svg>
        </a>

        {/* Facebook */}
        <a
          href="https://web.facebook.com/events/3252500944898839/"
          aria-label="Facebook"
          target="_blank"
          rel="noopener noreferrer"
          className="text-natcon-red hover:text-natcon-green transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2c0-2 1.2-3.1 3-3.1.9 0 1.8.2 1.8.2v2h-1c-1 0-1.3.6-1.3 1.2v1.7h2.3l-.4 3h-1.9v7A10 10 0 0 0 22 12z" />
          </svg>
        </a>

        {/* TikTok */}
        <a
          href="https://www.tiktok.com/@aiesecinsrilanka?is_from_webapp=1&sender_device=pc"
          aria-label="TikTok"
          target="_blank"
          rel="noopener noreferrer"
          className="text-natcon-red hover:text-natcon-green transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2h3c.1 1.5.7 2.9 1.7 4 1 1 2.5 1.6 4 1.7v3c-1.7 0-3.4-.5-4.7-1.5V14a6 6 0 1 1-6-6h1v3h-1a3 3 0 1 0 3 3V2z" />
          </svg>
        </a>

        {/* Twitter (X) */}
        <a
          href="https://x.com/AIESEClk"
          aria-label="X (Twitter)"
          target="_blank"
          rel="noopener noreferrer"
          className="text-natcon-red hover:text-natcon-green transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.6 3H17.8L12.9 9.1 8.6 3H3.4l7 10-6.9 8H6.3l4.9-6.1L15.4 21h5.2l-7.1-10L20.6 3z" />
          </svg>
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/company/aieseclk/posts/?feedView=all"
          aria-label="LinkedIn"
          target="_blank"
          rel="noopener noreferrer"
          className="text-natcon-red hover:text-natcon-green transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4.98 3.5A2.5 2.5 0 1 1 2.5 6a2.5 2.5 0 0 1 2.48-2.5zM3 8h4v13H3zM9 8h3.8v1.8h.05C13.6 8.9 15 8 17 8c3.2 0 3.8 2.1 3.8 4.9V21h-4v-6c0-1.5 0-3.3-2-3.3s-2.3 1.6-2.3 3.2V21H9z" />
          </svg>
        </a>
      </div>
    </footer>
  )
}

export default Footer
