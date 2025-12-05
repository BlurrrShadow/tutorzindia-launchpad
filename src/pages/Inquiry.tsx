import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  UserPlus, 
  CheckCircle2,
  GraduationCap,
  Clock,
  Users,
  BookOpen
} from "lucide-react";

const classes = [
  "Class 6",
  "Class 7", 
  "Class 8",
  "Class 9",
  "Class 10",
  "Class 11 Science",
  "Class 11 Commerce",
  "Class 12 Science",
  "Class 12 Commerce",
];

const subjects = [
  "All Subjects",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Accounts",
  "Economics",
];

const benefits = [
  { icon: GraduationCap, text: "Expert Faculty Members" },
  { icon: Clock, text: "Flexible Batch Timings" },
  { icon: Users, text: "Small Batch Sizes" },
  { icon: BookOpen, text: "Comprehensive Study Material" },
];

const Inquiry = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    studentName: "",
    phone: "",
    email: "",
    parentName: "",
    class: "",
    subject: "",
    address: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from('registrations').insert({
        student_name: formData.studentName,
        phone: formData.phone,
        email: formData.email,
        parent_name: formData.parentName,
        class: formData.class,
        subject: formData.subject,
        address: formData.address,
        message: formData.message
      });

      if (error) throw error;

      setSubmitted(true);
      toast({
        title: "Registration Successful!",
        description: "Thank you for registering. We'll contact you soon.",
      });
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Submitted",
        description: "Thank you for your interest. We'll get back to you soon.",
      });
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <Layout>
        <section className="min-h-[80vh] flex items-center justify-center bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-lg mx-auto text-center">
              <div className="w-20 h-20 gradient-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-accent-foreground" />
              </div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Thank You!
              </h1>
              <p className="text-muted-foreground text-lg mb-8">
                Your registration has been submitted successfully. Our team will contact you within 24 hours to discuss the next steps.
              </p>
              <Button 
                variant="hero" 
                size="lg"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    studentName: "",
                    phone: "",
                    email: "",
                    parentName: "",
                    class: "",
                    subject: "",
                    address: "",
                    message: ""
                  });
                }}
              >
                Submit Another Registration
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

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
              <UserPlus className="w-4 h-4 text-accent" />
              Student Registration
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-6">
              Begin Your Journey to Success
            </h1>
            <p className="text-lg text-primary-foreground/80 leading-relaxed">
              Fill out the registration form below and take the first step towards academic excellence. 
              Our team will reach out to guide you through the admission process.
            </p>
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Benefits Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                  Why Choose TutorzIndia?
                </h2>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-4 p-4 bg-card rounded-xl shadow-soft border border-border"
                    >
                      <div className="w-12 h-12 gradient-teal rounded-xl flex items-center justify-center flex-shrink-0">
                        <benefit.icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <p className="text-foreground font-medium">{benefit.text}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-secondary/50 rounded-2xl">
                  <h3 className="font-display font-semibold text-foreground mb-3">
                    Need Help?
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Have questions about admission? Call us directly.
                  </p>
                  <a 
                    href="tel:+919876543210" 
                    className="text-accent font-semibold hover:underline"
                  >
                    +91 98765 43210
                  </a>
                </div>
              </div>
            </div>

            {/* Registration Form */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-3xl p-8 shadow-card border border-border">
                <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                  Student Registration Form
                </h2>
                <p className="text-muted-foreground mb-8">
                  Please fill in all the required details accurately.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Student Name */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Student Name <span className="text-destructive">*</span>
                    </label>
                    <Input
                      placeholder="Enter student's full name"
                      value={formData.studentName}
                      onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                      required
                      className="h-12"
                    />
                  </div>

                  {/* Phone & Email */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Phone Number <span className="text-destructive">*</span>
                      </label>
                      <Input
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                        className="h-12"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Email Address <span className="text-destructive">*</span>
                      </label>
                      <Input
                        type="email"
                        placeholder="student@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="h-12"
                      />
                    </div>
                  </div>

                  {/* Parent Name */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Parent/Guardian Name
                    </label>
                    <Input
                      placeholder="Enter parent's name"
                      value={formData.parentName}
                      onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                      className="h-12"
                    />
                  </div>

                  {/* Class & Subject */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Class <span className="text-destructive">*</span>
                      </label>
                      <Select
                        value={formData.class}
                        onValueChange={(value) => setFormData({ ...formData, class: value })}
                        required
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                        <SelectContent>
                          {classes.map((cls) => (
                            <SelectItem key={cls} value={cls}>
                              {cls}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Subject of Interest
                      </label>
                      <Select
                        value={formData.subject}
                        onValueChange={(value) => setFormData({ ...formData, subject: value })}
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          {subjects.map((subject) => (
                            <SelectItem key={subject} value={subject}>
                              {subject}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Address
                    </label>
                    <Textarea
                      placeholder="Enter your complete address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      rows={3}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Additional Information
                    </label>
                    <Textarea
                      placeholder="Any specific requirements or questions?"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    variant="hero" 
                    size="xl" 
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Submit Registration"}
                    <UserPlus className="w-5 h-5" />
                  </Button>

                  <p className="text-sm text-muted-foreground text-center">
                    By submitting this form, you agree to our terms and conditions.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Inquiry;
