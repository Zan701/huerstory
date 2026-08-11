import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-navy text-brand-white/80">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="font-accent text-4xl text-brand-pink block">
              Huerstory
            </Link>
            <p className="text-sm leading-relaxed text-brand-white/50 max-w-xs">
              We turn your most meaningful moments into scroll-stopping content.
              Raw. Authentic. Ready to post.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-brand-pink font-medium text-sm tracking-widest uppercase">
              Navigate
            </h4>
            <nav className="flex flex-col gap-2.5">
              <Link
                href="#booking"
                className="text-sm text-brand-white/50 hover:text-brand-pink transition-colors w-fit"
              >
                Book a Date
              </Link>
              {/* 
              <Link href="#services" className="text-sm text-brand-white/50 hover:text-brand-pink transition-colors w-fit">Services</Link>
              <Link href="#portfolio" className="text-sm text-brand-white/50 hover:text-brand-pink transition-colors w-fit">Portfolio</Link>
              <Link href="#about" className="text-sm text-brand-white/50 hover:text-brand-pink transition-colors w-fit">About</Link>
              <Link href="#faq" className="text-sm text-brand-white/50 hover:text-brand-pink transition-colors w-fit">FAQ</Link>
              */}
            </nav>
          </div>

          {/* Contact / Socials */}
          <div className="space-y-4">
            <h4 className="text-brand-pink font-medium text-sm tracking-widest uppercase">
              Say Hello
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="https://instagram.com/huerstory"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm text-brand-white/50 hover:text-brand-pink transition-colors w-fit group"
              >
                <InstagramIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                @huerstory
              </a>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm text-brand-white/50 hover:text-brand-pink transition-colors w-fit group"
              >
                <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                WhatsApp
              </a>
              <a
                href="mailto:hello@huerstory.com"
                className="flex items-center gap-2.5 text-sm text-brand-white/50 hover:text-brand-pink transition-colors w-fit group"
              >
                <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                hello@huerstory.com
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-brand-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-brand-white/30">
            &copy; {currentYear} Huerstory
          </p>
          <p className="text-xs text-brand-white/30">
            Based in Kubu Raya, Kalimantan Barat
          </p>
        </div>
      </div>
    </footer>
  );
}
