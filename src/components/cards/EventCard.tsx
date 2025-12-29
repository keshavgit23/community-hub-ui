import { forwardRef } from "react";
import { Calendar, MapPin, Users } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface EventCardProps {
  title: string;
  date: string;
  location: string;
  description: string;
  attendees?: number;
  maxAttendees?: number;
  isPast?: boolean;
}

const EventCard = forwardRef<HTMLDivElement, EventCardProps>(
  ({ title, date, location, description, attendees = 0, maxAttendees, isPast = false }, ref) => {
    return (
      <Card ref={ref} className="overflow-hidden group">
        <div className="h-2 gradient-primary" />
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <Badge variant={isPast ? "secondary" : "default"}>
              {isPast ? "Past Event" : "Upcoming"}
            </Badge>
            {maxAttendees && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{attendees}/{maxAttendees}</span>
              </div>
            )}
          </div>
          <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {description}
          </p>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{location}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="px-6 pb-6">
          <Button className="w-full" disabled={isPast}>
            {isPast ? "Event Ended" : "Join Event"}
          </Button>
        </CardFooter>
      </Card>
    );
  }
);

EventCard.displayName = "EventCard";

export default EventCard;
