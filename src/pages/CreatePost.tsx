import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { ArrowLeft, Send } from "lucide-react";

const CreatePost = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Back Button */}
      <Button variant="ghost" asChild>
        <Link to="/dashboard/posts">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Posts
        </Link>
      </Button>

      {/* Form Card */}
      <Card>
        <CardHeader>
          <CardTitle>Create New Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter a compelling title for your post"
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Content</Label>
              <Textarea
                id="description"
                placeholder="Share your thoughts, ideas, or updates with the community..."
                rows={8}
                className="resize-none"
              />
            </div>

            <div className="flex gap-3 justify-end">
              <Button variant="outline" asChild>
                <Link to="/dashboard/posts">Cancel</Link>
              </Button>
              <Button type="submit">
                <Send className="mr-2 h-4 w-4" />
                Publish Post
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatePost;
