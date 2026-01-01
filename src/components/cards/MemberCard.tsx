import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface MemberCardProps {
  id: string;
  name: string;
  role: "Admin" | "Member" | "Moderator";
  avatar?: string;
  bio?: string;
}

const MemberCard = ({ id, name, role, avatar, bio }: MemberCardProps) => {
  const roleColors = {
    Admin: "bg-primary text-primary-foreground",
    Moderator: "bg-warning text-warning-foreground",
    Member: "bg-secondary text-secondary-foreground",
  };

  return (
    <Card className="text-center group">
      <CardContent className="p-6">
        <Avatar className="h-20 w-20 mx-auto mb-4 ring-4 ring-background shadow-lg group-hover:scale-105 transition-transform duration-300">
          <AvatarImage src={avatar} />
          <AvatarFallback className="text-xl">{name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <h3 className="font-semibold text-lg mb-1">{name}</h3>
        <Badge className={roleColors[role]}>{role}</Badge>
        {bio && (
          <p className="text-sm text-muted-foreground mt-3 line-clamp-2">{bio}</p>
        )}
        <Button variant="outline" className="mt-4 w-full" asChild>
          <Link to={`/dashboard/members/${id}`}>View Profile</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default MemberCard;
