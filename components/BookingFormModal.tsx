"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Mail } from "lucide-react";
import { format } from "date-fns";
import { useState, useEffect } from "react";

interface BookingFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: {
    date: Date | null;
    event: string | null;
    packageId: string | null;
  };
}

export default function BookingFormModal({ isOpen, onClose, bookingData }: BookingFormModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    venue: "",
    notes: ""
  });

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateMessage = () => {
    const formattedDate = bookingData.date ? format(bookingData.date, "EEEE, dd MMMM yyyy") : "";
    return `Hello Huerstory! I would like to book your services.

*Booking Details:*
- Event: ${bookingData.event}
- Date: ${formattedDate}
- Package: ${bookingData.packageId}

*Client Info:*
- Name: ${formData.name}
- Phone: ${formData.phone}
- Venue: ${formData.venue}

*Additional Notes:*
${formData.notes || "None"}

Looking forward to hearing from you!`;
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(generateMessage());
    const whatsappNumber = "6281234567890"; // Ganti dengan nomor asli nanti
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(`Booking Inquiry - ${bookingData.event} - ${formData.name}`);
    const body = encodeURIComponent(generateMessage());
    const emailAddress = "hello@huerstory.com"; // Ganti dengan email asli
    window.open(`mailto:${emailAddress}?subject=${subject}&body=${body}`, "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-navy/40 backdrop-blur-sm"
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="sticky top-0 bg-white/80 backdrop-blur-md z-10 px-6 py-4 border-b border-brand-pink/20 flex justify-between items-center">
              <div>
                <h3 className="font-accent text-3xl text-brand-pink">Complete Your Booking</h3>
                <p className="text-sm text-brand-navy/60 font-medium mt-1">
                  Almost there! Just a few more details.
                </p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 bg-brand-background rounded-full text-brand-navy/60 hover:text-brand-pink hover:bg-brand-pink/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto custom-scrollbar">
              {/* Summary Box */}
              <div className="bg-brand-background p-4 rounded-2xl mb-6 border border-brand-pink/20">
                <h4 className="text-xs font-bold text-brand-navy/50 uppercase tracking-wider mb-3">Booking Summary</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="block text-brand-navy/60 text-xs">Event</span>
                    <span className="font-medium text-brand-navy">{bookingData.event}</span>
                  </div>
                  <div>
                    <span className="block text-brand-navy/60 text-xs">Date</span>
                    <span className="font-medium text-brand-navy">
                      {bookingData.date ? format(bookingData.date, "dd MMM yyyy") : "-"}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="block text-brand-navy/60 text-xs">Package</span>
                    <span className="font-medium text-brand-navy">{bookingData.packageId}</span>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-brand-navy mb-1.5">Full Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-pink/30 focus:outline-none focus:ring-2 focus:ring-brand-pink focus:border-transparent transition-all bg-white text-brand-navy"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-navy mb-1.5">WhatsApp Number</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-pink/30 focus:outline-none focus:ring-2 focus:ring-brand-pink focus:border-transparent transition-all bg-white text-brand-navy"
                    placeholder="+62 812..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-navy mb-1.5">Venue / Location</label>
                  <input 
                    type="text" 
                    name="venue"
                    value={formData.venue}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-pink/30 focus:outline-none focus:ring-2 focus:ring-brand-pink focus:border-transparent transition-all bg-white text-brand-navy"
                    placeholder="Hotel Name / Address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-navy mb-1.5">Additional Notes (Optional)</label>
                  <textarea 
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-pink/30 focus:outline-none focus:ring-2 focus:ring-brand-pink focus:border-transparent transition-all bg-white text-brand-navy resize-none"
                    placeholder="Tell us more about your event..."
                  />
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t border-brand-pink/20 p-6 flex flex-col sm:flex-row gap-3">
              <button 
                onClick={handleWhatsApp}
                disabled={!formData.name || !formData.phone}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-500/50 disabled:cursor-not-allowed text-white px-3 py-2.5 text-sm rounded-xl font-medium transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                WhatsApp
              </button>
              <button 
                onClick={handleEmail}
                disabled={!formData.name}
                className="flex-1 bg-brand-navy hover:bg-brand-navy/90 disabled:bg-brand-navy/50 disabled:cursor-not-allowed text-brand-white px-3 py-2.5 text-sm rounded-xl font-medium transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Mail className="w-3.5 h-3.5" />
                Email Us
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
