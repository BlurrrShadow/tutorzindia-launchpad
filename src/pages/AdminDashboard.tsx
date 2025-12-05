import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Session } from "@supabase/supabase-js";
import { 
  GraduationCap, 
  LogOut, 
  Users, 
  Image, 
  Settings,
  Trophy,
  Plus,
  Trash2,
  Download,
  Calendar
} from "lucide-react";

interface Registration {
  id: string;
  student_name: string;
  email: string;
  phone: string;
  class: string;
  created_at: string;
}

interface GalleryImage {
  id: string;
  title: string;
  image_url: string;
  category: string | null;
}

interface Achievement {
  id: string;
  student_name: string;
  achievement: string;
  year: string | null;
  description: string | null;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  
  const [contactInfo, setContactInfo] = useState({
    phone: "",
    email: "",
    address: "",
    whatsapp: ""
  });

  const [newImage, setNewImage] = useState({ title: "", url: "", category: "general" });
  const [newAchievement, setNewAchievement] = useState({
    student_name: "",
    achievement: "",
    year: "",
    description: ""
  });

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (!session) {
          navigate('/admin');
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (!session) {
        navigate('/admin');
      } else {
        setLoading(false);
        fetchData();
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchData = async () => {
    // Fetch registrations
    const { data: regs } = await supabase
      .from('registrations')
      .select('*')
      .order('created_at', { ascending: false });
    if (regs) setRegistrations(regs);

    // Fetch gallery
    const { data: images } = await supabase
      .from('gallery_images')
      .select('*')
      .order('created_at', { ascending: false });
    if (images) setGalleryImages(images);

    // Fetch achievements
    const { data: achs } = await supabase
      .from('achievements')
      .select('*')
      .order('created_at', { ascending: false });
    if (achs) setAchievements(achs);

    // Fetch contact info
    const { data: contact } = await supabase
      .from('contact_info')
      .select('*')
      .limit(1)
      .maybeSingle();
    if (contact) {
      setContactInfo({
        phone: contact.phone || "",
        email: contact.email || "",
        address: contact.address || "",
        whatsapp: contact.whatsapp || ""
      });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin');
  };

  const handleAddImage = async () => {
    if (!newImage.title || !newImage.url) {
      toast({ title: "Error", description: "Please fill all fields", variant: "destructive" });
      return;
    }

    const { error } = await supabase.from('gallery_images').insert({
      title: newImage.title,
      image_url: newImage.url,
      category: newImage.category
    });

    if (error) {
      toast({ title: "Error", description: "Failed to add image. You may need admin privileges.", variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Image added to gallery" });
      setNewImage({ title: "", url: "", category: "general" });
      fetchData();
    }
  };

  const handleAddAchievement = async () => {
    if (!newAchievement.student_name || !newAchievement.achievement) {
      toast({ title: "Error", description: "Please fill required fields", variant: "destructive" });
      return;
    }

    const { error } = await supabase.from('achievements').insert(newAchievement);

    if (error) {
      toast({ title: "Error", description: "Failed to add achievement. You may need admin privileges.", variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Achievement added" });
      setNewAchievement({ student_name: "", achievement: "", year: "", description: "" });
      fetchData();
    }
  };

  const handleUpdateContact = async () => {
    const { error } = await supabase
      .from('contact_info')
      .update(contactInfo)
      .eq('id', (await supabase.from('contact_info').select('id').limit(1).single()).data?.id);

    if (error) {
      toast({ title: "Error", description: "Failed to update contact info. You may need admin privileges.", variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Contact information updated" });
    }
  };

  const exportToCSV = () => {
    const headers = ["Student Name", "Email", "Phone", "Class", "Registration Date"];
    const csvContent = [
      headers.join(","),
      ...registrations.map(r => 
        [r.student_name, r.email, r.phone, r.class, new Date(r.created_at).toLocaleDateString()].join(",")
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `registrations_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen gradient-hero flex items-center justify-center">
        <div className="text-primary-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 gradient-hero rounded-xl flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <span className="font-display font-bold text-foreground">Admin Dashboard</span>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="registrations" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="registrations" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Registrations</span>
            </TabsTrigger>
            <TabsTrigger value="gallery" className="flex items-center gap-2">
              <Image className="w-4 h-4" />
              <span className="hidden sm:inline">Gallery</span>
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              <span className="hidden sm:inline">Achievements</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          {/* Registrations Tab */}
          <TabsContent value="registrations">
            <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-display font-bold text-foreground">Student Registrations</h2>
                <Button variant="teal" size="sm" onClick={exportToCSV}>
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </div>

              {registrations.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Student</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Contact</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Class</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {registrations.map((reg) => (
                        <tr key={reg.id} className="border-b border-border hover:bg-muted/50">
                          <td className="py-3 px-4">
                            <p className="font-medium text-foreground">{reg.student_name}</p>
                          </td>
                          <td className="py-3 px-4">
                            <p className="text-sm text-foreground">{reg.email}</p>
                            <p className="text-sm text-muted-foreground">{reg.phone}</p>
                          </td>
                          <td className="py-3 px-4">
                            <span className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded">
                              {reg.class}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">
                            {new Date(reg.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No registrations yet</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery">
            <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
              <h2 className="text-xl font-display font-bold text-foreground mb-6">Gallery Management</h2>
              
              {/* Add New Image */}
              <div className="bg-muted/50 rounded-xl p-4 mb-6">
                <h3 className="font-medium text-foreground mb-4">Add New Image</h3>
                <div className="grid md:grid-cols-4 gap-4">
                  <Input
                    placeholder="Image Title"
                    value={newImage.title}
                    onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
                  />
                  <Input
                    placeholder="Image URL"
                    value={newImage.url}
                    onChange={(e) => setNewImage({ ...newImage, url: e.target.value })}
                  />
                  <Input
                    placeholder="Category (e.g., events, classroom)"
                    value={newImage.category}
                    onChange={(e) => setNewImage({ ...newImage, category: e.target.value })}
                  />
                  <Button variant="hero" onClick={handleAddImage}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Image
                  </Button>
                </div>
              </div>

              {/* Image Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {galleryImages.map((img) => (
                  <div key={img.id} className="relative group aspect-square bg-muted rounded-xl overflow-hidden">
                    <img src={img.image_url} alt={img.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-foreground/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <p className="text-primary-foreground text-sm text-center px-2">{img.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements">
            <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
              <h2 className="text-xl font-display font-bold text-foreground mb-6">Achievements Management</h2>
              
              {/* Add New Achievement */}
              <div className="bg-muted/50 rounded-xl p-4 mb-6">
                <h3 className="font-medium text-foreground mb-4">Add New Achievement</h3>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <Input
                    placeholder="Student Name *"
                    value={newAchievement.student_name}
                    onChange={(e) => setNewAchievement({ ...newAchievement, student_name: e.target.value })}
                  />
                  <Input
                    placeholder="Achievement Title *"
                    value={newAchievement.achievement}
                    onChange={(e) => setNewAchievement({ ...newAchievement, achievement: e.target.value })}
                  />
                  <Input
                    placeholder="Year (e.g., 2023)"
                    value={newAchievement.year}
                    onChange={(e) => setNewAchievement({ ...newAchievement, year: e.target.value })}
                  />
                  <Input
                    placeholder="Description"
                    value={newAchievement.description}
                    onChange={(e) => setNewAchievement({ ...newAchievement, description: e.target.value })}
                  />
                </div>
                <Button variant="hero" onClick={handleAddAchievement}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Achievement
                </Button>
              </div>

              {/* Achievements List */}
              <div className="space-y-3">
                {achievements.map((ach) => (
                  <div key={ach.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                    <div>
                      <p className="font-medium text-foreground">{ach.student_name}</p>
                      <p className="text-sm text-accent">{ach.achievement}</p>
                      {ach.year && <p className="text-xs text-muted-foreground">{ach.year}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
              <h2 className="text-xl font-display font-bold text-foreground mb-6">Contact Information</h2>
              
              <div className="space-y-4 max-w-xl">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Phone Number</label>
                  <Input
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Email Address</label>
                  <Input
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                    placeholder="info@tutorzindia.org"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">WhatsApp Number</label>
                  <Input
                    value={contactInfo.whatsapp}
                    onChange={(e) => setContactInfo({ ...contactInfo, whatsapp: e.target.value })}
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Address</label>
                  <Textarea
                    value={contactInfo.address}
                    onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
                    placeholder="Full address"
                    rows={3}
                  />
                </div>
                <Button variant="hero" onClick={handleUpdateContact}>
                  Save Changes
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
