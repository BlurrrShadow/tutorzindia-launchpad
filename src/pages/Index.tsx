import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, 
  Users, 
  Trophy, 
  BookOpen, 
  Target, 
  Star,
  ArrowRight,
  CheckCircle2,
  Play
} from "lucide-react";

const stats = [
  { icon: Users, value: "5000+", label: "Students Taught" },
  { icon: Trophy, value: "98%", label: "Success Rate" },
  { icon: GraduationCap, value: "15+", label: "Years Experience" },
  { icon: Star, value: "4.9", label: "Rating" },
];

const features = [
  {
    icon: BookOpen,
    title: "Expert Faculty",
    description: "Learn from experienced teachers with proven track records in board examinations.",
  },
  {
    icon: Target,
    title: "Personalized Attention",
    description: "Small batch sizes ensure every student receives individual guidance and support.",
  },
  {
    icon: Trophy,
    title: "Proven Results",
    description: "Consistently producing top rankers in board exams and competitive examinations.",
  },
];

const courses = [
  { name: "Class 6-8 Foundation", students: "500+", icon: "📚" },
  { name: "Class 9-10 Board Prep", students: "800+", icon: "📖" },
  { name: "Class 11-12 Science", students: "600+", icon: "🔬" },
  { name: "Class 11-12 Commerce", students: "400+", icon: "📊" },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center gradient-hero overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-primary-foreground space-y-8">
              <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
                <Star className="w-4 h-4 text-accent" />
                <span>Rated #1 Coaching Institute in the Region</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
                Unlock Your
                <span className="text-gradient block mt-2">Academic Potential</span>
              </h1>
              
              <p className="text-lg text-primary-foreground/80 max-w-xl leading-relaxed">
                Join TutorzIndia and experience personalized coaching that transforms students into achievers. 
                Our expert faculty and proven methodology ensure your success in board exams and beyond.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/inquiry">
                  <Button variant="accent" size="xl" className="group">
                    Start Your Journey
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline-light" size="xl" className="group">
                    <Play className="w-5 h-5" />
                    Watch Our Story
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-primary-foreground/20 bg-gradient-to-br from-teal to-accent"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
                <div className="text-sm">
                  <p className="font-semibold">5000+ Students</p>
                  <p className="text-primary-foreground/60">Trust TutorzIndia</p>
                </div>
              </div>
            </div>

            {/* Hero Image/Card */}
            <div className="relative hidden lg:block">
              <div className="relative bg-card/10 backdrop-blur-xl rounded-3xl p-8 border border-primary-foreground/10 shadow-elevated">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <div 
                      key={index}
                      className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-primary-foreground/15 transition-colors"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <stat.icon className="w-8 h-8 mx-auto mb-3 text-accent" />
                      <p className="text-3xl font-display font-bold text-primary-foreground">{stat.value}</p>
                      <p className="text-sm text-primary-foreground/70">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Floating Badge */}
              <div className="absolute -top-6 -right-6 bg-accent text-accent-foreground rounded-2xl px-6 py-4 shadow-elevated animate-float">
                <p className="font-display font-bold text-2xl">15+</p>
                <p className="text-sm">Years</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section (Mobile) */}
      <section className="lg:hidden bg-card py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="bg-secondary rounded-2xl p-6 text-center shadow-soft"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-accent" />
                <p className="text-2xl font-display font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block bg-secondary text-secondary-foreground text-sm font-medium px-4 py-2 rounded-full mb-4">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Education That Makes a Difference
            </h2>
            <p className="text-muted-foreground text-lg">
              We combine traditional teaching excellence with modern techniques to deliver results that matter.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group bg-card rounded-3xl p-8 shadow-soft hover:shadow-card transition-all duration-300 border border-border hover:border-accent/30"
              >
                <div className="w-14 h-14 gradient-accent rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block bg-secondary text-secondary-foreground text-sm font-medium px-4 py-2 rounded-full mb-4">
                Our Programs
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                Comprehensive Courses for Every Student
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                From foundational concepts to advanced competitive exam preparation, 
                we offer structured programs designed to help students excel at every level.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  "Regular doubt-clearing sessions",
                  "Weekly tests and assessments",
                  "Study materials and notes provided",
                  "Parent-teacher meetings",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-foreground">
                    <CheckCircle2 className="w-5 h-5 text-teal flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Link to="/inquiry">
                <Button variant="hero" size="lg">
                  Explore Programs
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {courses.map((course, index) => (
                <div
                  key={index}
                  className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-card transition-all duration-300 border border-border hover:border-teal/30 group"
                >
                  <span className="text-4xl mb-4 block">{course.icon}</span>
                  <h3 className="font-display font-semibold text-foreground mb-2 group-hover:text-teal transition-colors">
                    {course.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{course.students} Students</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-1/4 w-64 h-64 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-teal rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-primary-foreground">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
              Ready to Begin Your Success Story?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-10 max-w-xl mx-auto">
              Join thousands of successful students who started their journey with TutorzIndia. 
              Limited seats available for the upcoming batch.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/inquiry">
                <Button variant="accent" size="xl">
                  Register Now
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline-light" size="xl">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
