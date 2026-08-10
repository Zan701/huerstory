"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useEffect } from "react";

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | null;
  onSelect: (date: Date | undefined) => void;
}

export default function CalendarModal({ isOpen, onClose, selectedDate, onSelect }: CalendarModalProps) {
  
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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-navy/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-6 shadow-2xl relative max-w-sm w-full overflow-hidden"
            >
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-brand-background rounded-full text-brand-navy/60 hover:text-brand-pink transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="text-center mb-6 mt-2">
                <h3 className="font-accent text-4xl text-brand-pink">Select a Date</h3>
              </div>
              
              <div className="flex justify-center calendar-wrapper">
                <DayPicker
                  mode="single"
                  selected={selectedDate || undefined}
                  onSelect={(date) => {
                    onSelect(date);
                    if (date) onClose();
                  }}
                  disabled={[{ before: new Date() }]} // Disable past dates
                  modifiers={{
                    booked: [
                      // Example mocked booked dates, you can replace this logic
                      new Date(new Date().setDate(new Date().getDate() + 2)),
                      new Date(new Date().setDate(new Date().getDate() + 5)),
                    ]
                  }}
                  modifiersStyles={{
                    booked: { textDecoration: 'line-through', color: '#f87171', opacity: 0.6 }
                  }}
                  className="!m-0"
                  classNames={{
                    day_selected: "bg-brand-pink text-white hover:bg-brand-pink hover:text-white focus:bg-brand-pink focus:text-white",
                    day_today: "text-brand-navy font-bold",
                    button_reset: "text-brand-navy hover:bg-brand-pink/10 rounded-full",
                    nav_button: "hover:bg-brand-pink/20 rounded-full",
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
