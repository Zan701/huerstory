"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Gem, Cake, Briefcase, Calendar, CheckCircle2 } from "lucide-react";
import { startOfWeek, addDays, format, isSameDay } from "date-fns";
import CalendarModal from "./CalendarModal";

type EventType = "Wedding" | "Engagement" | "Birthday" | "Corporate";

interface DayAvailability {
  date: Date;
  status: "available" | "booked" | "no-slot";
}

const EVENTS: { id: EventType; label: string; icon: React.ElementType }[] = [
  { id: "Wedding", label: "Wedding", icon: Heart },
  { id: "Engagement", label: "Engagement", icon: Gem },
  { id: "Birthday", label: "Birthday", icon: Cake },
  { id: "Corporate", label: "Corporate", icon: Briefcase },
];

const PACKAGES = [
  { 
    id: "Essential", 
    name: "Essential", 
    price: "Rp 1.500.000", 
    features: ["4 Hours Coverage", "50 Edited Photos", "1 Min Highlight Video"]
  },
  { 
    id: "Signature", 
    name: "Signature", 
    price: "Rp 3.000.000", 
    features: ["8 Hours Coverage", "100 Edited Photos", "3 Min Cinematic Video", "Drone Footage"]
  },
  { 
    id: "Premium", 
    name: "Premium", 
    price: "Rp 5.500.000", 
    features: ["Full Day Coverage", "Unlimited Photos", "5 Min Cinematic Video", "Premium Photobook"]
  }
];

export default function Booking() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Generate current week schedule
  const today = new Date();
  const startOfCurrentWeek = startOfWeek(today, { weekStartsOn: 1 }); // Starts on Monday
  
  const weekDays: DayAvailability[] = Array.from({ length: 7 }).map((_, index) => {
    const date = addDays(startOfCurrentWeek, index);
    // Mock availability: Make weekends available, some weekdays booked
    let status: "available" | "booked" | "no-slot" = "available";
    if (index === 1 || index === 4) status = "booked"; // Tue, Fri booked
    if (index === 3) status = "no-slot"; // Thu no slot
    
    return { date, status };
  });

  return (
    <section id="booking" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16 space-y-4">
        <p className="text-brand-navy/60 font-medium tracking-wide uppercase text-sm">
          Let's capture your story
        </p>
        <h2 className="font-accent text-5xl md:text-6xl text-brand-pink">
          Your date. Your moment. Your story.
        </h2>
      </div>

      <div className="bg-white/40 backdrop-blur-sm border border-brand-pink/20 rounded-3xl p-6 md:p-10 shadow-sm max-w-3xl mx-auto space-y-12">
        
        {/* Step 1: Date Selection */}
        <div className="bg-brand-background rounded-3xl p-6 md:p-8 border border-brand-pink/10">
          <div className="text-center mb-8 space-y-2">
            <h3 className="text-brand-navy font-medium text-base md:text-lg">
              When is your moment?
            </h3>
            <p className="font-accent text-3xl md:text-4xl text-brand-pink">
              Check our weekly availability
            </p>
          </div>

          <div className="grid grid-cols-7 gap-1 md:gap-3">
            {weekDays.map((day, idx) => {
              const isSelected = selectedDate ? isSameDay(day.date, selectedDate) : false;
              const isAvailable = day.status === "available";
              
              return (
                <motion.button
                  key={idx}
                  whileHover={isAvailable ? { scale: 1.05 } : {}}
                  whileTap={isAvailable ? { scale: 0.95 } : {}}
                  onClick={() => isAvailable && setSelectedDate(day.date)}
                  disabled={!isAvailable}
                  className={`flex flex-col items-center justify-center py-3 md:py-4 rounded-xl md:rounded-2xl border transition-all duration-300 ${
                    isSelected
                      ? "border-brand-pink bg-brand-pink text-white shadow-lg"
                      : isAvailable
                      ? "border-transparent bg-white hover:border-brand-pink/30 text-brand-navy"
                      : "border-transparent bg-white/50 opacity-60 cursor-not-allowed text-brand-navy/50"
                  }`}
                >
                  <span className="text-[10px] md:text-xs font-semibold mb-1 uppercase opacity-70">
                    {format(day.date, "EEE")}
                  </span>
                  <span className="text-lg md:text-2xl font-bold mb-2">
                    {format(day.date, "d")}
                  </span>
                  
                  {/* Status Indicator */}
                  <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${
                    isSelected ? "bg-white" :
                    day.status === "available" ? "bg-emerald-400" : 
                    day.status === "booked" ? "bg-rose-400" : 
                    "bg-slate-300"
                  }`} />
                </motion.button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex justify-center items-center gap-4 md:gap-6 mt-6 text-[10px] md:text-xs font-medium text-brand-navy/60">
            <div className="flex items-center gap-1.5 md:gap-2">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-emerald-400" />
              <span>AVAILABLE</span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-rose-400" />
              <span>BOOKED</span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-slate-300" />
              <span>NO SLOT</span>
            </div>
          </div>
          
          {/* Show Calendar Button */}
          <div className="mt-8 text-center">
            <button 
              onClick={() => setIsCalendarOpen(true)}
              className="text-brand-navy/70 text-sm font-medium hover:text-brand-pink flex items-center justify-center gap-2 mx-auto transition-colors"
            >
              <Calendar className="w-4 h-4" />
              <span className="underline decoration-brand-pink/30 underline-offset-4 hover:decoration-brand-pink">
                Show full calendar
              </span>
            </button>
          </div>
          
        </div>

        {/* Step 2: Event Selection */}
        {selectedDate && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="pt-4 border-t border-brand-pink/10"
          >
            <h3 className="text-center text-lg md:text-xl font-medium text-brand-navy mb-6">
              What are we celebrating?
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {EVENTS.map((event) => {
                const Icon = event.icon;
                const isSelected = selectedEvent === event.id;
                
                return (
                  <motion.button
                    key={event.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedEvent(event.id)}
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 ${
                      isSelected 
                        ? "border-brand-pink bg-brand-pink/10 text-brand-pink shadow-md" 
                        : "border-brand-pink/30 hover:border-brand-pink/60 bg-white text-brand-navy/70 hover:text-brand-navy"
                    }`}
                  >
                    <Icon className="w-6 h-6 mb-2" strokeWidth={1.5} />
                    <span className="font-medium text-xs md:text-sm">{event.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Step 3: Package Selection */}
        <AnimatePresence>
          {selectedEvent && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="pt-4 border-t border-brand-pink/10 overflow-hidden"
            >
              <h3 className="text-center text-lg md:text-xl font-medium text-brand-navy mb-6">
                Choose your package
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {PACKAGES.map((pkg) => {
                  const isSelected = selectedPackage === pkg.id;
                  return (
                    <motion.div
                      key={pkg.id}
                      whileHover={{ y: -5 }}
                      onClick={() => setSelectedPackage(pkg.id)}
                      className={`relative cursor-pointer p-6 rounded-2xl border transition-all duration-300 ${
                        isSelected 
                          ? "border-brand-pink bg-white shadow-xl ring-2 ring-brand-pink/20" 
                          : "border-brand-pink/20 bg-white/60 hover:bg-white shadow-sm hover:shadow-md"
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-4 right-4 text-brand-pink">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                      )}
                      <h4 className="font-accent text-3xl text-brand-pink mb-1">{pkg.name}</h4>
                      <p className="font-bold text-brand-navy mb-4">{pkg.price}</p>
                      <ul className="space-y-2 text-sm text-brand-navy/80">
                        {pkg.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-brand-pink mt-0.5">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      <CalendarModal 
        isOpen={isCalendarOpen} 
        onClose={() => setIsCalendarOpen(false)} 
        selectedDate={selectedDate} 
        onSelect={setSelectedDate} 
      />
    </section>
  );
}
