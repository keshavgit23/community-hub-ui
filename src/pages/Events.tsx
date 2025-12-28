import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plus, Filter } from "lucide-react";
import EventCard from "@/components/cards/EventCard";

const events = [
  {
    title: "Community Kickoff 2024",
    date: "January 15, 2024",
    location: "Virtual Event",
    description: "Join us for our annual community kickoff where we'll share our roadmap and goals for the year.",
    attendees: 45,
    maxAttendees: 100,
  },
  {
    title: "Developer Workshop",
    date: "January 22, 2024",
    location: "San Francisco, CA",
    description: "Hands-on workshop covering best practices for building scalable community platforms.",
    attendees: 28,
    maxAttendees: 30,
  },
  {
    title: "Monthly AMA Session",
    date: "January 30, 2024",
    location: "Discord",
    description: "Open Q&A session with our team. Bring your questions and feedback!",
    attendees: 67,
    maxAttendees: 200,
  },
  {
    title: "Design Systems Workshop",
    date: "February 5, 2024",
    location: "Virtual Event",
    description: "Learn how to build and maintain a design system for your community platform.",
    attendees: 12,
    maxAttendees: 50,
  },
  {
    title: "Community Leaders Meetup",
    date: "February 15, 2024",
    location: "New York, NY",
    description: "Connect with other community leaders and share experiences, challenges, and wins.",
    attendees: 18,
    maxAttendees: 25,
  },
  {
    title: "Winter Hackathon",
    date: "February 20-22, 2024",
    location: "Virtual Event",
    description: "48-hour hackathon to build innovative community tools. Prizes for winners!",
    attendees: 89,
    maxAttendees: 150,
  },
];

const Events = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Events</h1>
          <p className="text-muted-foreground">Discover and join community events</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button asChild>
            <Link to="/dashboard/events/create">
              <Plus className="mr-2 h-4 w-4" />
              Create Event
            </Link>
          </Button>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event.title} {...event} />
        ))}
      </div>
    </div>
  );
};

export default Events;
