import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  MessageCircle
} from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    phone: "+91 9876543210",
    email: "info@tutorzindia.org",
    address: "123 Education Street, Knowledge City, India",
    whatsapp: "+91 9876543210"
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    const { data, error } = await supabase
      .from('contact_info')
      .select('*')
      .limit(1)
      .maybeSingle();
    
    if (data) {
      setContactInfo({
        phone: data.phone || "+91 9876543210",
        email: data.email || "info@tutorzindia.org",
        address: data.address || "123 Education Street, Knowledge City, India",
        whatsapp: data.whatsapp || "+91 9876543210"
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // For contact form, we can store in registrations or handle separately
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const contactDetails = [
    {
      icon: Phone,
      title: "Phone",
      value: contactInfo.phone,
      action: `tel:${contactInfo.phone}`,
    },
    {
      icon: Mail,
      title: "Email",
      value: contactInfo.email,
      action: `mailto:${contactInfo.email}`,
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      value: contactInfo.whatsapp,
      action: `https://wa.me/${contactInfo.whatsapp?.replace(/[^0-9]/g, '')}`,
    },
    {
      icon: MapPin,
      title: "Address",
      value: contactInfo.address,
      action: null,
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 gradient-hero overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-primary-foreground mb-6">
              <Phone className="w-4 h-4 text-accent" />
              Get In Touch
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-6">
              Contact Us
            </h1>
            <p className="text-lg text-primary-foreground/80 leading-relaxed">
              Have questions about our courses or want to learn more? We're here to help. 
              Reach out to us and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-8">
                Reach Out To Us
              </h2>

              <div className="space-y-6 mb-10">
                {contactDetails.map((detail, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-4 p-4 bg-card rounded-xl shadow-soft border border-border hover:border-accent/30 transition-colors"
                  >
                    <div className="w-12 h-12 gradient-teal rounded-xl flex items-center justify-center flex-shrink-0">
                      <detail.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{detail.title}</p>
                      {detail.action ? (
                        <a 
                          href={detail.action}
                          target={detail.action.startsWith('http') ? '_blank' : undefined}
                          rel={detail.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-foreground font-medium hover:text-accent transition-colors"
                        >
                          {detail.value}
                        </a>
                      ) : (
                        <p className="text-foreground font-medium">{detail.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Office Hours */}
              <div className="bg-secondary/50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-accent" />
                  <h3 className="text-lg font-display font-semibold text-foreground">Office Hours</h3>
                </div>
                <div className="space-y-2 text-muted-foreground">
                  <p><span className="text-foreground font-medium">Monday - Friday:</span> 8:00 AM - 8:00 PM</p>
                  <p><span className="text-foreground font-medium">Saturday:</span> 9:00 AM - 6:00 PM</p>
                  <p><span className="text-foreground font-medium">Sunday:</span> 10:00 AM - 2:00 PM</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card rounded-3xl p-8 shadow-card border border-border">
              <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                Send Us a Message
              </h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form below and we'll get back to you shortly.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Your Name
                  </label>
                  <Input
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="h-12"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="h-12"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Phone Number
                    </label>
                    <Input
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="h-12"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Your Message
                  </label>
                  <Textarea
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                  />
                </div>

                <Button 
                  type="submit" 
                  variant="hero" 
                  size="lg" 
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Message"}
                  <Send className="w-5 h-5" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="bg-card rounded-3xl overflow-hidden shadow-card border border-border">
            <div className="aspect-video bg-gradient-to-br from-teal/20 to-accent/20 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 mx-auto mb-4 text-primary" />
                <p className="text-lg font-display font-semibold text-foreground">Our Location</p>
                <p className="text-muted-foreground">{contactInfo.address}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
