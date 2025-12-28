import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plus, Filter } from "lucide-react";
import PostCard from "@/components/cards/PostCard";

const posts = [
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
  {
    id: "3",
    title: "Tips for Remote Collaboration",
    description: "Discover the best practices for working effectively with distributed teams. Communication tools, async workflows, and more.",
    author: { name: "Alex Rivera", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face" },
    timestamp: "1 day ago",
    likes: 67,
    comments: 23,
  },
  {
    id: "4",
    title: "Introducing Our New Member Spotlight Series",
    description: "Each month, we'll feature outstanding community members who are making a difference. Nominations are now open!",
    author: { name: "Emma Watson", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" },
    timestamp: "2 days ago",
    likes: 89,
    comments: 31,
  },
  {
    id: "5",
    title: "Community Guidelines Update",
    description: "We've updated our community guidelines to ensure a safe and inclusive environment for all members.",
    author: { name: "James Wilson", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
    timestamp: "3 days ago",
    likes: 56,
    comments: 14,
  },
];

const Posts = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Posts</h1>
          <p className="text-muted-foreground">Browse and engage with community discussions</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button asChild>
            <Link to="/dashboard/posts/create">
              <Plus className="mr-2 h-4 w-4" />
              Create Post
            </Link>
          </Button>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
};

export default Posts;
