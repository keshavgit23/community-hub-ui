import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Users, 
  FileText, 
  Calendar, 
  TrendingUp,
  ArrowRight,
  Plus
} from "lucide-react";
import PostCard from "@/components/cards/PostCard";
import EventCard from "@/components/cards/EventCard";

const stats = [
  { label: "Total Members", value: "1,234", icon: Users, change: "+12%" },
  { label: "Active Posts", value: "456", icon: FileText, change: "+8%" },
  { label: "Upcoming Events", value: "23", icon: Calendar, change: "+5%" },
  { label: "Engagement Rate", value: "67%", icon: TrendingUp, change: "+15%" },
];

const recentPosts = [
  {
    id: "1",
    title: "Tips for Remote Collaboration",
    description: "Discover the best practices for working effectively with distributed teams.",
    author: { name: "Alex Rivera", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face" },
    timestamp: "1 hour ago",
    likes: 24,
    comments: 6,
  },
  {
    id: "2",
    title: "Community Guidelines Update",
    description: "We've updated our community guidelines to ensure a safe and inclusive environment.",
    author: { name: "Emma Watson", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" },
    timestamp: "3 hours ago",
    likes: 45,
    comments: 12,
  },
];

const upcomingEvents = [
  {
    title: "Weekly Standup",
    date: "Tomorrow, 10:00 AM",
    location: "Google Meet",
    description: "Regular weekly standup to sync on progress and blockers.",
  },
];

const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, John! 👋</h1>
          <p className="text-muted-foreground">Here's what's happening in your community today.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" asChild>
            <Link to="/dashboard/events/create">
              <Calendar className="mr-2 h-4 w-4" />
              Create Event
            </Link>
          </Button>
          <Button asChild>
            <Link to="/dashboard/posts/create">
              <Plus className="mr-2 h-4 w-4" />
              New Post
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-xs font-medium text-success">{stat.change}</span>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Posts */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recent Posts</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/dashboard/posts">
                View All
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="space-y-4">
            {recentPosts.map((post) => (
              <PostCard key={post.id} {...post} />
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Upcoming Events</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/dashboard/events">
                View All
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <EventCard key={event.title} {...event} attendees={12} maxAttendees={20} />
            ))}
          </div>
          
          {/* Quick Actions Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/dashboard/members">
                  <Users className="mr-2 h-4 w-4" />
                  View Members
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/dashboard/posts/create">
                  <FileText className="mr-2 h-4 w-4" />
                  Write a Post
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/dashboard/events/create">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Event
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
