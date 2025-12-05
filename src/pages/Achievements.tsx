import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { 
  Trophy, 
  Star,
  Medal,
  Award,
  ArrowRight,
  GraduationCap
} from "lucide-react";

interface Achievement {
  id: string;
  student_name: string;
  achievement: string;
  year: string | null;
  description: string | null;
  image_url: string | null;
}

const defaultAchievements = [
  {
    id: "1",
    student_name: "Priya Sharma",
    achievement: "CBSE Board Topper - 99.2%",
    year: "2023",
    description: "Secured highest marks in the district for Class 12 CBSE Board Examinations.",
    image_url: null
  },
  {
    id: "2",
    student_name: "Rahul Verma",
    achievement: "JEE Main AIR 156",
    year: "2023",
    description: "Cracked JEE Main with an All India Rank of 156, securing admission to IIT Delhi.",
    image_url: null
  },
  {
    id: "3",
    student_name: "Ananya Patel",
    achievement: "NEET Score 695/720",
    year: "2023",
    description: "Outstanding performance in NEET with 695 marks, now studying at AIIMS Delhi.",
    image_url: null
  },
  {
    id: "4",
    student_name: "Vikram Singh",
    achievement: "State Science Olympiad Gold",
    year: "2022",
    description: "Won gold medal in State Level Science Olympiad competition.",
    image_url: null
  },
  {
    id: "5",
    student_name: "Sneha Reddy",
    achievement: "CA Foundation - AIR 28",
    year: "2023",
    description: "Achieved All India Rank 28 in CA Foundation examination.",
    image_url: null
  },
  {
    id: "6",
    student_name: "Arjun Mehta",
    achievement: "ICSE Topper - 98.4%",
    year: "2023",
    description: "School topper with exceptional performance in all subjects.",
    image_url: null
  },
];

const stats = [
  { icon: Trophy, value: "500+", label: "90%+ Scorers" },
  { icon: Medal, value: "50+", label: "Board Toppers" },
  { icon: Star, value: "200+", label: "Competitive Exam Selections" },
  { icon: Award, value: "15+", label: "Years of Excellence" },
];

const Achievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>(defaultAchievements);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .order('created_at', { ascending: false });

      if (data && data.length > 0) {
        setAchievements(data);
      }
    } catch (error) {
      console.error('Error fetching achievements:', error);
    } finally {
      setLoading(false);
    }
  };

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
              <Trophy className="w-4 h-4 text-accent" />
              Our Pride
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-6">
              Celebrating Student Success
            </h1>
            <p className="text-lg text-primary-foreground/80 leading-relaxed">
              Our students consistently achieve remarkable results in board examinations and competitive exams. 
              Here's a glimpse of their outstanding accomplishments.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center p-6 bg-secondary/50 rounded-2xl"
              >
                <stat.icon className="w-10 h-10 mx-auto mb-3 text-accent" />
                <p className="text-3xl font-display font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block bg-secondary text-secondary-foreground text-sm font-medium px-4 py-2 rounded-full mb-4">
              Success Stories
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Our Star Performers
            </h2>
            <p className="text-muted-foreground text-lg">
              Meet some of our exceptional students who have made us proud with their achievements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <div 
                key={achievement.id}
                className="bg-card rounded-3xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 border border-border hover:border-accent/30 group"
              >
                {/* Achievement Badge */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-16 h-16 gradient-accent rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <GraduationCap className="w-8 h-8 text-accent-foreground" />
                    </div>
                    {achievement.year && (
                      <span className="bg-secondary text-secondary-foreground text-sm font-medium px-3 py-1 rounded-full">
                        {achievement.year}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-display font-bold text-foreground mb-2">
                    {achievement.student_name}
                  </h3>
                  <p className="text-accent font-semibold mb-3">
                    {achievement.achievement}
                  </p>
                  {achievement.description && (
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {achievement.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Summary */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block bg-secondary text-secondary-foreground text-sm font-medium px-4 py-2 rounded-full mb-4">
                Academic Excellence
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                Consistent Results, Year After Year
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Our track record speaks for itself. With a 98% pass rate and numerous toppers every year, 
                TutorzIndia has established itself as a premier coaching institute in the region.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between p-4 bg-card rounded-xl border border-border">
                  <span className="text-foreground font-medium">Board Exam Pass Rate</span>
                  <span className="text-accent font-bold text-xl">98%</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-card rounded-xl border border-border">
                  <span className="text-foreground font-medium">Students Scoring 90%+</span>
                  <span className="text-teal font-bold text-xl">45%</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-card rounded-xl border border-border">
                  <span className="text-foreground font-medium">Competitive Exam Selections</span>
                  <span className="text-amber font-bold text-xl">200+</span>
                </div>
              </div>

              <Link to="/inquiry">
                <Button variant="hero" size="lg">
                  Join Our Success Story
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-accent/20 to-teal/20 rounded-3xl p-8 aspect-square flex items-center justify-center">
                <div className="text-center">
                  <Trophy className="w-24 h-24 mx-auto mb-6 text-accent" />
                  <p className="text-4xl font-display font-bold text-foreground">98%</p>
                  <p className="text-lg text-muted-foreground">Success Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-primary-foreground">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Write Your Own Success Story
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-10">
              Join the ranks of our achievers. Your journey to academic excellence starts with a single step.
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

export default Achievements;
