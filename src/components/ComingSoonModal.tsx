import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
}

export function ComingSoonModal({ isOpen, onClose, serviceName }: ComingSoonModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-card rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-hero-gradient p-6 relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
              >
                <X className="w-5 h-5 text-primary-foreground" />
              </button>
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center">
                  <Clock className="w-8 h-8 text-secondary" />
                </div>
              </div>
              <h2 className="text-2xl font-extrabold text-primary-foreground text-center">
                Coming Soon!
              </h2>
            </div>

            {/* Content */}
            <div className="p-6 text-center">
              <p className="text-lg font-medium text-foreground mb-2">
                {serviceName}
              </p>
              <p className="text-muted-foreground mb-6">
                We're working hard to bring this service to you. Stay tuned for updates!
              </p>
              
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
                <Bell className="w-4 h-4" />
                <span>We'll notify you when it's available</span>
              </div>

              <Button onClick={onClose} className="w-full">
                Got it!
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
