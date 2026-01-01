import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Calendar, Mail, FileText, ArrowLeft } from "lucide-react";
import PostCard from "@/components/cards/PostCard";

interface Profile {
  id: string;
  name: string | null;
  email: string | null;
  avatar_url: string | null;
  bio: string | null;
  role: string | null;
  created_at: string;
}

interface Post {
  id: string;
  title: string;
  content: string | null;
  created_at: string;
}

const MemberProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchMemberData = async () => {
      if (!id) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setLoading(true);

      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (profileError || !profileData) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setProfile(profileData);

      // Fetch posts by this user
      const { data: postsData } = await supabase
        .from("posts")
        .select("id, title, content, created_at")
        .eq("author_id", id)
        .order("created_at", { ascending: false })
        .limit(5);

      setPosts(postsData || []);
      setLoading(false);
    };

    fetchMemberData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (notFound || !profile) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-2">Member Not Found</h2>
        <p className="text-muted-foreground mb-4">
          The member you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link to="/dashboard/members">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Members
          </Link>
        </Button>
      </div>
    );
  }

  const displayName = profile.name || "Anonymous";
  const initials = displayName.slice(0, 2).toUpperCase();
  const username = profile.name?.toLowerCase().replace(/\s+/g, "") || profile.email?.split("@")[0] || "user";
  const joinedDate = new Date(profile.created_at).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const getRoleBadgeStyle = (role: string | null) => {
    const normalizedRole = role?.toLowerCase();
    if (normalizedRole === "admin") return "bg-primary text-primary-foreground";
    if (normalizedRole === "moderator") return "bg-warning text-warning-foreground";
    return "bg-secondary text-secondary-foreground";
  };

  const getRoleLabel = (role: string | null) => {
    const normalizedRole = role?.toLowerCase();
    if (normalizedRole === "admin") return "Admin";
    if (normalizedRole === "moderator") return "Moderator";
    return "Member";
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" asChild>
        <Link to="/dashboard/members">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Members
        </Link>
      </Button>

      {/* Profile Header Card */}
      <Card>
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row gap-6">
            <Avatar className="h-24 w-24 ring-4 ring-primary/20">
              <AvatarImage src={profile.avatar_url || undefined} />
              <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-2xl font-bold">{displayName}</h1>
                  <Badge className={getRoleBadgeStyle(profile.role)}>
                    {getRoleLabel(profile.role)}
                  </Badge>
                </div>
                <p className="text-muted-foreground">@{username}</p>
              </div>

              {profile.bio && (
                <p className="text-muted-foreground max-w-2xl">{profile.bio}</p>
              )}

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {joinedDate}</span>
                </div>
                {profile.email && (
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    <span>{profile.email}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Posts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Recent Posts
          </CardTitle>
        </CardHeader>
        <CardContent>
          {posts.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              This member hasn't posted anything yet.
            </p>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  description={post.content || ""}
                  author={{
                    name: displayName,
                    avatar: profile.avatar_url || undefined,
                  }}
                  timestamp={new Date(post.created_at).toLocaleDateString()}
                  likes={0}
                  comments={0}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MemberProfile;
