import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const joinEventSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  age: z.string().optional(),
  mobile: z.string().optional(),
  email: z.string().email("Invalid email address"),
  address: z.string().optional(),
});

type JoinEventFormValues = z.infer<typeof joinEventSchema>;

interface JoinEventModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  eventId: string;
  eventTitle: string;
  userEmail: string;
  userId: string;
  onSuccess: () => void;
}

const JoinEventModal = ({
  open,
  onOpenChange,
  eventId,
  eventTitle,
  userEmail,
  userId,
  onSuccess,
}: JoinEventModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<JoinEventFormValues>({
    resolver: zodResolver(joinEventSchema),
    defaultValues: {
      name: "",
      age: "",
      mobile: "",
      email: userEmail,
      address: "",
    },
  });

  const onSubmit = async (values: JoinEventFormValues) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("event_registrations").insert({
        event_id: eventId,
        user_id: userId,
        name: values.name,
        age: values.age ? parseInt(values.age, 10) : null,
        mobile: values.mobile || null,
        email: values.email,
        address: values.address || null,
      });

      if (error) {
        if (error.code === "23505") {
          toast({
            title: "Already Registered",
            description: "You have already joined this event.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: error.message || "Failed to join event.",
            variant: "destructive",
          });
        }
        return;
      }

      toast({
        title: "Success!",
        description: `You have successfully joined "${eventTitle}"`,
      });
      onSuccess();
      onOpenChange(false);
      form.reset();
    } catch (err) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Join Event</DialogTitle>
          <DialogDescription>
            Register for "{eventTitle}"
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="25" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 234 567 890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email *</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Your address..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Join Event
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default JoinEventModal;
