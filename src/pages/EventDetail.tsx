import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Calendar, MapPin, Users, ArrowLeft, Check, Clock } from "lucide-react";
import { format } from "date-fns";
import JoinEventModal from "@/components/JoinEventModal";

interface Event {
  id: string;
  title: string;
  description: string | null;
  date: string | null;
  location: string | null;
  max_participants: number | null;
  created_at: string;
  organizer_id: string | null;
}

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [attendeeCount, setAttendeeCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchEventData = async () => {
      if (!id) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setLoading(true);

      // Fetch event
      const { data: eventData, error: eventError } = await supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (eventError || !eventData) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setEvent(eventData);

      // Fetch attendee count
      const { count } = await supabase
        .from("event_registrations")
        .select("*", { count: "exact", head: true })
        .eq("event_id", id);

      setAttendeeCount(count || 0);

      // Check if current user has joined
      if (user) {
        const { data: registration } = await supabase
          .from("event_registrations")
          .select("id")
          .eq("event_id", id)
          .eq("user_id", user.id)
          .maybeSingle();

        setIsJoined(!!registration);
      }

      setLoading(false);
    };

    fetchEventData();
  }, [id, user]);

  const formatEventDate = (dateString: string | null) => {
    if (!dateString) return "TBD";
    try {
      return format(new Date(dateString), "EEEE, MMMM d, yyyy");
    } catch {
      return "TBD";
    }
  };

  const formatEventTime = (dateString: string | null) => {
    if (!dateString) return "TBD";
    try {
      return format(new Date(dateString), "h:mm a");
    } catch {
      return "TBD";
    }
  };

  const isEventPast = (dateString: string | null) => {
    if (!dateString) return false;
    return new Date(dateString) < new Date();
  };

  const handleJoinClick = () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to join events.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    setIsModalOpen(true);
  };

  const handleJoinSuccess = async () => {
    setIsJoined(true);
    // Refresh attendee count
    if (id) {
      const { count } = await supabase
        .from("event_registrations")
        .select("*", { count: "exact", head: true })
        .eq("event_id", id);
      setAttendeeCount(count || 0);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (notFound || !event) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-2">Event Not Found</h2>
        <p className="text-muted-foreground mb-4">
          The event you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link to="/dashboard/events">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Events
          </Link>
        </Button>
      </div>
    );
  }

  const isPast = isEventPast(event.date);

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" asChild>
        <Link to="/dashboard/events">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Events
        </Link>
      </Button>

      {/* Event Header */}
      <Card>
        <div className="h-2 gradient-primary" />
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="space-y-4 flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <Badge variant={isPast ? "secondary" : isJoined ? "outline" : "default"}>
                  {isPast ? "Past Event" : isJoined ? "You're Attending" : "Upcoming"}
                </Badge>
                {event.max_participants && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{attendeeCount}/{event.max_participants} attendees</span>
                  </div>
                )}
              </div>

              <h1 className="text-3xl font-bold">{event.title}</h1>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span>{formatEventDate(event.date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>{formatEventTime(event.date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>{event.location || "Location TBD"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span>{attendeeCount} joined</span>
                </div>
              </div>
            </div>

            <div className="w-full md:w-auto">
              {!user ? (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground text-center md:text-right">
                    Login required to join
                  </p>
                  <Button className="w-full md:w-auto" asChild>
                    <Link to="/login">Login to Join</Link>
                  </Button>
                </div>
              ) : isPast ? (
                <Button disabled className="w-full md:w-auto">
                  Event Ended
                </Button>
              ) : isJoined ? (
                <Button disabled variant="secondary" className="w-full md:w-auto">
                  <Check className="mr-2 h-4 w-4" />
                  Already Joined
                </Button>
              ) : (
                <Button onClick={handleJoinClick} className="w-full md:w-auto">
                  Join Event
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Event Description */}
      <Card>
        <CardHeader>
          <CardTitle>About This Event</CardTitle>
        </CardHeader>
        <CardContent>
          {event.description ? (
            <p className="text-muted-foreground whitespace-pre-wrap">{event.description}</p>
          ) : (
            <p className="text-muted-foreground italic">No description provided.</p>
          )}
        </CardContent>
      </Card>

      {/* Join Event Modal */}
      {event && user && (
        <JoinEventModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          eventId={event.id}
          eventTitle={event.title}
          userEmail={user.email || ""}
          userId={user.id}
          onSuccess={handleJoinSuccess}
        />
      )}
    </div>
  );
};

export default EventDetail;
