"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format, isAfter, isBefore } from "date-fns";
import { 
  Dialog, 
  DialogClose, 
  DialogContent, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateStage, useUpdateStage, Stage } from "@/hooks/use-stages";
import { Tournament } from "@/hooks/use-tournaments";
import { toast } from "sonner";

// Define props for the dialog component
interface StageDialogProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'edit';
  tournament: Tournament;
  stage?: Stage;
}

export default function StageDialog({ 
  isOpen, 
  onClose, 
  mode, 
  tournament,
  stage 
}: StageDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [forceRender, setForceRender] = useState(0);
  
  const createMutation = useCreateStage();
  const updateMutation = useUpdateStage(stage?.id || "", tournament.id);

  // Define tournament date boundaries for validation
  const tournamentStartDate = new Date(tournament.startDate);
  const tournamentEndDate = new Date(tournament.endDate);
  
  // Convert to date strings for form default values
  const tournamentStartDateString = format(tournamentStartDate, 'yyyy-MM-dd\'T\'HH:mm');
  const tournamentEndDateString = format(tournamentEndDate, 'yyyy-MM-dd\'T\'HH:mm');
  
  // Dynamic schema validation to ensure stage dates are within tournament dates
  const stageFormSchema = z.object({
    name: z.string()
      .min(2, { message: "Stage name must be at least 2 characters" })
      .max(100, { message: "Stage name cannot exceed 100 characters" }),
    type: z.enum(["SWISS", "PLAYOFF", "FINAL"], {
      required_error: "You must select a stage type",
    }),
    startDate: z.string().refine((date) => {
      try {
        const parsedDate = new Date(date);
        return !isNaN(parsedDate.getTime()) && 
               !isBefore(parsedDate, tournamentStartDate) && 
               !isAfter(parsedDate, tournamentEndDate);
      } catch {
        return false;
      }
    }, { 
      message: `Start date must be within tournament dates (${format(tournamentStartDate, 'PPP')} - ${format(tournamentEndDate, 'PPP')})` 
    }),
    endDate: z.string().refine((date) => {
      try {
        const parsedDate = new Date(date);
        return !isNaN(parsedDate.getTime()) && 
               !isBefore(parsedDate, tournamentStartDate) && 
               !isAfter(parsedDate, tournamentEndDate);
      } catch {
        return false;
      }
    }, { 
      message: `End date must be within tournament dates (${format(tournamentStartDate, 'PPP')} - ${format(tournamentEndDate, 'PPP')})` 
    }),
  }).refine((data) => {
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);
    return !isAfter(startDate, endDate);
  }, {
    message: "End date must be after or equal to start date",
    path: ["endDate"],
  });

  // Get form default values based on mode and stage data
  const getFormDefaults = () => ({
    name: stage?.name || '',
    type: stage?.type || "SWISS",
    startDate: stage?.startDate
      ? format(new Date(stage.startDate), 'yyyy-MM-dd\'T\'HH:mm')
      : tournamentStartDateString,
    endDate: stage?.endDate
      ? format(new Date(stage.endDate), 'yyyy-MM-dd\'T\'HH:mm')
      : tournamentEndDateString,
  });

  // Initialize the form
  const form = useForm<z.infer<typeof stageFormSchema>>({
    resolver: zodResolver(stageFormSchema),
    defaultValues: getFormDefaults(),
  });

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof stageFormSchema>) => {
    setIsSubmitting(true);
    
    try {
      // Format dates properly as ISO strings
      const formattedValues = {
        ...values,
        startDate: new Date(values.startDate).toISOString(),
        endDate: new Date(values.endDate).toISOString(),
      };

      if (mode === 'create') {
        await createMutation.mutateAsync({
          ...formattedValues,
          tournamentId: tournament.id
        });
      } else if (stage) {
        await updateMutation.mutateAsync(formattedValues);
      }
      
      // Reset to default values before closing
      form.reset({
        name: '',
        type: 'SWISS',
        startDate: tournamentStartDateString,
        endDate: tournamentEndDateString,
      });
      
      setForceRender(prev => prev + 1);
      onClose(); // Close dialog on success
    } catch (error) {
      console.error(`Error saving stage:`, error);
      toast.error(`Failed to ${mode} stage. Please check your inputs and try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog 
      key={`stage-dialog-${forceRender}`} 
      open={isOpen} 
      onOpenChange={(open) => {
        if (!open) {
          // Reset form when dialog closes
          setTimeout(() => {
            form.reset(getFormDefaults());
          }, 100);
          onClose();
        }
      }}
    >
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Create Stage' : 'Edit Stage'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'create' 
              ? `Add a new stage to "${tournament.name}"` 
              : `Edit stage for "${tournament.name}"`}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Stage name (e.g., Qualification Rounds)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select stage type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="SWISS">SWISS</SelectItem>
                      <SelectItem value="PLAYOFF">PLAYOFF</SelectItem>
                      <SelectItem value="FINAL">FINAL</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date & Time</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date & Time</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="text-xs text-muted-foreground">
              Note: Stage dates must be within tournament dates: {format(tournamentStartDate, 'PPP p')} - {format(tournamentEndDate, 'PPP p')}
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <Button 
                type="submit" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin mr-2">⋆</span>
                    {mode === 'create' ? 'Creating...' : 'Updating...'}
                  </>
                ) : (
                  mode === 'create' ? 'Create Stage' : 'Update Stage'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}