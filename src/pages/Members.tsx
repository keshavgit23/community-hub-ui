import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import MemberCard from "@/components/cards/MemberCard";

const members = [
  {
    id: "1",
    name: "Sarah Chen",
    role: "Admin" as const,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    bio: "Community lead and platform architect. Passionate about building inclusive spaces.",
  },
  {
    id: "2",
    name: "Marcus Johnson",
    role: "Moderator" as const,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    bio: "Developer advocate and content creator. Love helping newcomers.",
  },
  {
    id: "3",
    name: "Alex Rivera",
    role: "Member" as const,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    bio: "Full-stack developer interested in community tools.",
  },
  {
    id: "4",
    name: "Emma Watson",
    role: "Member" as const,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    bio: "UX designer focused on user experience and accessibility.",
  },
  {
    id: "5",
    name: "James Wilson",
    role: "Member" as const,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    bio: "Product manager with a passion for community-driven development.",
  },
  {
    id: "6",
    name: "Lisa Park",
    role: "Moderator" as const,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    bio: "Content strategist and community engagement specialist.",
  },
  {
    id: "7",
    name: "David Kim",
    role: "Member" as const,
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
    bio: "Backend engineer working on scalable infrastructure.",
  },
  {
    id: "8",
    name: "Nina Patel",
    role: "Member" as const,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face",
    bio: "Data scientist exploring community analytics.",
  },
];

const Members = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Members</h1>
          <p className="text-muted-foreground">Browse and connect with community members</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search members..."
            className="pl-10 h-11"
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {members.map((member) => (
          <MemberCard key={member.id} {...member} />
        ))}
      </div>
    </div>
  );
};

export default Members;
