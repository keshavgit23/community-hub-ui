import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  FileText, 
  Calendar, 
  Shield, 
  ArrowRight,
  Sparkles
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FeatureCard from "@/components/cards/FeatureCard";
import EventCard from "@/components/cards/EventCard";
import PostCard from "@/components/cards/PostCard";

const features = [
  {
    icon: FileText,
    title: "Community Posts",
    description: "Share updates, ideas, and discussions with your community members in real-time.",
  },
  {
    icon: Calendar,
    title: "Events & Meetups",
    description: "Organize and manage community events, workshops, and virtual meetups effortlessly.",
  },
  {
    icon: Users,
    title: "Member Profiles",
    description: "Rich member profiles with bios, activity history, and engagement metrics.",
  },
  {
    icon: Shield,
    title: "Admin Moderation",
    description: "Powerful moderation tools to keep your community safe and welcoming.",
  },
];

const upcomingEvents = [
  {
    title: "Community Kickoff 2024",
    date: "January 15, 2024",
    location: "Virtual Event",
    description: "Join us for our annual community kickoff where we'll share our roadmap and goals for the year.",
  },
  {
    title: "Developer Workshop",
    date: "January 22, 2024",
    location: "San Francisco, CA",
    description: "Hands-on workshop covering best practices for building scalable community platforms.",
  },
  {
    title: "Monthly AMA Session",
    date: "January 30, 2024",
    location: "Discord",
    description: "Open Q&A session with our team. Bring your questions and feedback!",
  },
];

const latestPosts = [
  {
    id: "1",
    title: "Welcome to Our New Community Platform!",
    description: "We're excited to launch our brand new community platform. Here's everything you need to know to get started and make the most of your experience.",
    author: { name: "Sarah Chen", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" },
    timestamp: "2 hours ago",
    likes: 42,
    comments: 12,
  },
  {
    id: "2",
    title: "Best Practices for Community Engagement",
    description: "Learn the top strategies for building an engaged and active community. From content planning to member recognition programs.",
    author: { name: "Marcus Johnson", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
    timestamp: "5 hours ago",
    likes: 38,
    comments: 8,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden gradient-hero">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(221_83%_53%/0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(250_83%_60%/0.08),transparent_50%)]" />
        
        <div className="container mx-auto relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
              <Sparkles className="h-4 w-4" />
              <span>The Modern Community Platform</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              Build, Manage & Grow
              <span className="block text-primary">Your Community</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              A powerful platform for community collaboration and engagement. 
              Connect members, organize events, and foster meaningful discussions.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <Button variant="hero" size="xl" asChild>
                <Link to="/register">
                  Join Community
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="xl" asChild>
                <Link to="/dashboard/events">Explore Events</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              All the tools to build a thriving community in one place
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={feature.title} 
                className="animate-slide-up" 
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <FeatureCard {...feature} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                Upcoming Events
              </h2>
              <p className="text-muted-foreground">
                Join our community events and connect with members
              </p>
            </div>
            <Button variant="outline" asChild className="hidden md:inline-flex">
              <Link to="/dashboard/events">
                View All Events
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <div 
                key={event.title} 
                className="animate-slide-up" 
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <EventCard {...event} attendees={Math.floor(Math.random() * 30) + 10} maxAttendees={50} />
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Button variant="outline" asChild>
              <Link to="/dashboard/events">
                View All Events
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                Latest Posts
              </h2>
              <p className="text-muted-foreground">
                Stay updated with community discussions
              </p>
            </div>
            <Button variant="outline" asChild className="hidden md:inline-flex">
              <Link to="/dashboard/posts">
                View All Posts
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {latestPosts.map((post, index) => (
              <div 
                key={post.id} 
                className="animate-slide-up" 
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <PostCard {...post} />
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Button variant="outline" asChild>
              <Link to="/dashboard/posts">
                View All Posts
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="relative rounded-3xl gradient-primary p-12 md:p-16 text-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(0_0%_100%/0.1),transparent_50%)]" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Ready to Build Your Community?
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                Join thousands of community leaders who are already using our platform to connect and engage with their members.
              </p>
              <Button 
                size="xl" 
                className="bg-card text-foreground hover:bg-card/90"
                asChild
              >
                <Link to="/register">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
