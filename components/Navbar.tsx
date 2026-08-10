import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-brand-white/80 backdrop-blur-md border-b border-brand-pink/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="font-accent text-4xl text-brand-pink font-bold tracking-wider hover:text-brand-navy transition-colors">
              Huerstory
            </Link>
          </div>
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="#services" className="text-brand-pink hover:text-brand-navy transition-colors">Services</Link>
            <Link href="#portfolio" className="text-brand-pink hover:text-brand-navy transition-colors">Portfolio</Link>
            <Link href="#about" className="text-brand-pink hover:text-brand-navy transition-colors">About</Link>
            <Link href="#faq" className="text-brand-pink hover:text-brand-navy transition-colors">FAQ</Link>
          </div>
          <div className="flex items-center">
            <Link 
              href="#booking"
              className="bg-brand-pink text-brand-navy px-6 py-2.5 rounded-full font-medium hover:bg-brand-pink/90 transition-colors shadow-sm"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
