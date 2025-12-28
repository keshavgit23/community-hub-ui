import { Heart, MessageCircle, Clock } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

interface PostCardProps {
  id: string;
  title: string;
  description: string;
  author: {
    name: string;
    avatar?: string;
  };
  timestamp: string;
  likes: number;
  comments: number;
}

const PostCard = ({ 
  id,
  title, 
  description, 
  author, 
  timestamp, 
  likes, 
  comments 
}: PostCardProps) => {
  return (
    <Card className="group">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={author.avatar} />
            <AvatarFallback>{author.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-sm">{author.name}</p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{timestamp}</span>
            </div>
          </div>
        </div>
        <Link to={`/dashboard/posts/${id}`}>
          <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {description}
        </p>
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-0">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
            <Heart className="h-4 w-4" />
            <span>{likes}</span>
          </button>
          <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
            <MessageCircle className="h-4 w-4" />
            <span>{comments}</span>
          </button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
