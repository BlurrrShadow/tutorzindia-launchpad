import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  GraduationCap, 
  Target, 
  Heart, 
  Lightbulb, 
  Users,
  Award,
  BookOpen,
  Clock,
  ArrowRight
} from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Excellence",
    description: "We strive for excellence in everything we do, from curriculum design to student support.",
  },
  {
    icon: Heart,
    title: "Care",
    description: "Every student is unique, and we provide the individual attention they deserve.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We continuously evolve our teaching methods to stay relevant and effective.",
  },
  {
    icon: Users,
    title: "Community",
    description: "We build a supportive learning community where students thrive together.",
  },
];

const timeline = [
  { year: "2010", event: "TutorzIndia Founded", description: "Started with a vision to transform education" },
  { year: "2013", event: "First 100 Students", description: "Reached our first milestone of 100 students" },
  { year: "2016", event: "Expansion", description: "Opened new branches and expanded course offerings" },
  { year: "2019", event: "Digital Integration", description: "Launched online learning platform" },
  { year: "2023", event: "5000+ Alumni", description: "Celebrating our growing community of successful students" },
];

const team = [
  { name: "Dr. Rajesh Kumar", role: "Founder & Director", subject: "Physics" },
  { name: "Mrs. Priya Sharma", role: "Academic Head", subject: "Mathematics" },
  { name: "Mr. Amit Verma", role: "Senior Faculty", subject: "Chemistry" },
  { name: "Mrs. Sunita Patel", role: "Senior Faculty", subject: "Biology" },
];

const About = () => {
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
              <GraduationCap className="w-4 h-4 text-accent" />
              About TutorzIndia
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-6">
              Shaping Futures Through Quality Education
            </h1>
            <p className="text-lg text-primary-foreground/80 leading-relaxed">
              For over 15 years, TutorzIndia has been at the forefront of academic excellence, 
              helping thousands of students realize their potential and achieve their dreams.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block bg-secondary text-secondary-foreground text-sm font-medium px-4 py-2 rounded-full mb-4">
                Our Mission
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                Empowering Students to Excel
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                At TutorzIndia, we believe that every student has the potential to excel. 
                Our mission is to provide quality education that not only prepares students 
                for examinations but also builds their critical thinking and problem-solving abilities.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                We combine experienced faculty, comprehensive study materials, and a supportive 
                learning environment to create the perfect ecosystem for academic success.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-secondary/50 rounded-2xl p-6">
                  <Award className="w-8 h-8 text-accent mb-3" />
                  <p className="text-2xl font-display font-bold text-foreground">98%</p>
                  <p className="text-sm text-muted-foreground">Pass Rate</p>
                </div>
                <div className="bg-secondary/50 rounded-2xl p-6">
                  <Users className="w-8 h-8 text-teal mb-3" />
                  <p className="text-2xl font-display font-bold text-foreground">5000+</p>
                  <p className="text-sm text-muted-foreground">Happy Students</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-teal/20 to-accent/20 rounded-3xl p-8 aspect-square flex items-center justify-center">
                <div className="text-center">
                  <GraduationCap className="w-24 h-24 mx-auto mb-6 text-primary" />
                  <p className="text-2xl font-display font-bold text-foreground">Since 2010</p>
                  <p className="text-muted-foreground">Excellence in Education</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block bg-secondary text-secondary-foreground text-sm font-medium px-4 py-2 rounded-full mb-4">
              Our Values
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              What Drives Us Forward
            </h2>
            <p className="text-muted-foreground text-lg">
              Our core values guide everything we do at TutorzIndia.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div 
                key={index}
                className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-card transition-all duration-300 border border-border hover:border-accent/30 text-center"
              >
                <div className="w-14 h-14 gradient-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-accent-foreground" />
                </div>
                <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block bg-secondary text-secondary-foreground text-sm font-medium px-4 py-2 rounded-full mb-4">
              Our Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Milestones That Define Us
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            {timeline.map((item, index) => (
              <div key={index} className="flex gap-6 mb-8 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 gradient-teal rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                    {item.year.slice(2)}
                  </div>
                  {index < timeline.length - 1 && (
                    <div className="w-0.5 h-full bg-border mt-2" />
                  )}
                </div>
                <div className="pb-8">
                  <p className="text-sm text-teal font-medium">{item.year}</p>
                  <h3 className="text-lg font-display font-semibold text-foreground mb-1">
                    {item.event}
                  </h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block bg-secondary text-secondary-foreground text-sm font-medium px-4 py-2 rounded-full mb-4">
              Our Team
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Meet Our Expert Faculty
            </h2>
            <p className="text-muted-foreground text-lg">
              Our dedicated team of educators brings years of experience and passion for teaching.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div 
                key={index}
                className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-card transition-all duration-300 border border-border text-center group"
              >
                <div className="w-20 h-20 gradient-hero rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl font-display font-bold text-primary-foreground">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-lg font-display font-semibold text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-accent font-medium text-sm mb-1">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.subject}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-primary-foreground">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Join Our Learning Community
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-10">
              Be part of our growing family of successful students. Your journey to academic excellence starts here.
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

export default About;
