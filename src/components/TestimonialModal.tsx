import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Star, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface TestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TestimonialModal({ isOpen, onClose }: TestimonialModalProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rating, setRating] = useState(5);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    content: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (formData.name.length > 100) newErrors.name = "Name must be less than 100 characters";
    if (!formData.content.trim()) newErrors.content = "Testimonial is required";
    if (formData.content.length > 500) newErrors.content = "Testimonial must be less than 500 characters";
    if (formData.role.length > 100) newErrors.role = "Role must be less than 100 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("testimonials").insert({
        name: formData.name.trim(),
        role: formData.role.trim() || "Customer",
        content: formData.content.trim(),
        rating: rating,
      });

      if (error) throw error;

      toast({
        title: "Thank you!",
        description: "Your testimonial has been submitted and is pending review.",
      });

      setFormData({ name: "", role: "", content: "" });
      setRating(5);
      onClose();
    } catch (error) {
      console.error("Error submitting testimonial:", error);
      toast({
        title: "Submission failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Share Your Experience</DialogTitle>
          <DialogDescription>
            We'd love to hear about your experience with our services. Your testimonial helps others discover Lucid.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div className="space-y-2">
            <Label htmlFor="testimonial-name">Your Name *</Label>
            <Input
              id="testimonial-name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="John Doe"
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="testimonial-role">Your Role (Optional)</Label>
            <Input
              id="testimonial-role"
              value={formData.role}
              onChange={(e) => handleChange("role", e.target.value)}
              placeholder="e.g., Homeowner, Business Owner"
            />
            {errors.role && (
              <p className="text-xs text-destructive">{errors.role}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Rating</Label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <Star
                    className={`w-7 h-7 ${
                      star <= rating
                        ? "fill-secondary text-secondary"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="testimonial-content">Your Testimonial *</Label>
            <Textarea
              id="testimonial-content"
              value={formData.content}
              onChange={(e) => handleChange("content", e.target.value)}
              placeholder="Share your experience with our services..."
              rows={4}
              className={errors.content ? "border-destructive" : ""}
            />
            <p className="text-xs text-muted-foreground">
              {formData.content.length}/500 characters
            </p>
            {errors.content && (
              <p className="text-xs text-destructive">{errors.content}</p>
            )}
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
          >
            <Send className="w-4 h-4 mr-2" />
            {isSubmitting ? "Submitting..." : "Submit Testimonial"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
