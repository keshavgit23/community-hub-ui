import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { Edit, Calendar, FileText, Mail, MapPin } from "lucide-react";
import PostCard from "@/components/cards/PostCard";

const userPosts = [
  {
    id: "1",
    title: "My Journey Building Community Tools",
    description: "Sharing my experience over the past year building tools for community managers.",
    author: { name: "John Doe", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
    timestamp: "1 week ago",
    likes: 34,
    comments: 8,
  },
  {
    id: "2",
    title: "Tips for Effective Community Moderation",
    description: "Key lessons learned from moderating a community of 10,000+ members.",
    author: { name: "John Doe", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
    timestamp: "2 weeks ago",
    likes: 56,
    comments: 15,
  },
];

const Profile = () => {
  return (
    <div className="space-y-6">
      {/* Profile Header Card */}
      <Card>
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row gap-6">
            <Avatar className="h-24 w-24 ring-4 ring-primary/20">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face" />
              <AvatarFallback className="text-2xl">JD</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold">John Doe</h1>
                    <Badge>Admin</Badge>
                  </div>
                  <p className="text-muted-foreground">@johndoe</p>
                </div>
                <Button variant="outline" asChild>
                  <Link to="/dashboard/settings">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Link>
                </Button>
              </div>
              
              <p className="text-muted-foreground max-w-2xl">
                Community builder and software engineer. Passionate about creating inclusive online spaces and helping communities thrive. Currently leading community initiatives at TechCorp.
              </p>
              
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Joined January 2023</span>
                </div>
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  <span>john@example.com</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">24</p>
            <p className="text-sm text-muted-foreground">Posts</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">12</p>
            <p className="text-sm text-muted-foreground">Events Hosted</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">348</p>
            <p className="text-sm text-muted-foreground">Likes Received</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">89</p>
            <p className="text-sm text-muted-foreground">Comments</p>
          </CardContent>
        </Card>
      </div>

      {/* User Posts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Recent Posts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {userPosts.map((post) => (
              <PostCard key={post.id} {...post} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
