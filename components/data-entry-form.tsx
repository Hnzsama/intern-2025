"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { icons } from "lucide-react";
import { Icon } from "@/components/ui/icon";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Create a map of all available Lucide icons to display in the icon selector
const iconOptions = Object.keys(icons).filter(
  (icon) => typeof icons[icon as keyof typeof icons] === "function"
);

// Define form validation schema based on the type of data
const achievementSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  number: z.string().min(1, "Number value is required"),
  icon: z.string().min(1, "Icon is required"),
  status: z.enum(["excellent", "good", "average"]),
  progress: z.number().min(0).max(100),  // Changed from z.coerce.number() to z.number()
  category: z.string().min(1, "Category is required"),
  image: z.string().optional(),
});

const activitySchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  icon: z.string().min(1, "Icon is required"),
});

const communitySchema = z.object({
  name: z.string().min(3, "Community name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  link: z.string(),
  icon: z.string().min(1, "Icon is required"),
});

type FormType = "achievement" | "activity" | "community";

interface DataEntryFormProps {
  type: FormType;
  onSubmit: (data: any) => void;
}

export function DataEntryForm({ type, onSubmit }: DataEntryFormProps) {
  const [open, setOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState("Trophy");
  
  // Use strongly typed forms for each type with explicit typing
  const achievementForm = useForm<z.infer<typeof achievementSchema>>({
    resolver: zodResolver(achievementSchema) as any, // Use type assertion to bypass type checking
    defaultValues: {
      title: "",
      description: "",
      icon: "Trophy",
      number: "",
      status: "excellent" as const,
      progress: 80,
      category: "",
      image: "",
    },
  });

  const activityForm = useForm<z.infer<typeof activitySchema>>({
    resolver: zodResolver(activitySchema) as any, // Use type assertion to bypass type checking
    defaultValues: {
      title: "",
      description: "",
      icon: "Trophy",
    },
  });

  const communityForm = useForm<z.infer<typeof communitySchema>>({
    resolver: zodResolver(communitySchema) as any, // Use type assertion to bypass type checking
    defaultValues: {
      name: "",
      description: "",
      icon: "Trophy",
      link: "",
    },
  });

  // Type-safe way to handle forms of different types
  function getAppropriateForm() {
    if (type === "achievement") return achievementForm;
    if (type === "activity") return activityForm;
    return communityForm;
  }
  
  // Use the appropriate form safely
  const form = getAppropriateForm();
  
  function handleSubmit(data: any) {
    try {
      onSubmit(data);
      alert(`New ${type} added successfully!`);
      form.reset();
      setOpen(false);
    } catch (error) {
      alert(`Error adding ${type}: ${(error as Error).message}`);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add New {type.charAt(0).toUpperCase() + type.slice(1)}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New {type.charAt(0).toUpperCase() + type.slice(1)}</DialogTitle>
          <DialogDescription>
            Fill out the form below to add a new {type} to the list.
          </DialogDescription>
        </DialogHeader>
        
        {type === "achievement" && (
          <Form {...achievementForm}>
            <form onSubmit={achievementForm.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={achievementForm.control}
                name="title" 
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter achievement title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={achievementForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter achievement description" 
                        {...field}
                        className="min-h-[100px]" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={achievementForm.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icon</FormLabel>
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/20 p-3 rounded-full">
                        <Icon
                          name={selectedIcon as keyof typeof icons}
                          size={24}
                          color="hsl(var(--primary))"
                          className="text-primary"
                        />
                      </div>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={(value) => {
                            field.onChange(value);
                            setSelectedIcon(value);
                          }}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select an icon" />
                          </SelectTrigger>
                          <SelectContent className="max-h-[200px]">
                            {iconOptions.map((icon) => (
                              <SelectItem key={icon} value={icon}>
                                <div className="flex items-center gap-2">
                                  <Icon
                                    name={icon as keyof typeof icons}
                                    size={16}
                                    color="hsl(var(--primary))"
                                    className="text-primary"
                                  />
                                  <span>{icon}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={achievementForm.control}
                name="number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number/Value</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 45, 3.7, 95%" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={achievementForm.control}
                name="progress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Progress (0-100)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" max="100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={achievementForm.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="excellent">Excellent</SelectItem>
                          <SelectItem value="good">Good</SelectItem>
                          <SelectItem value="average">Average</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={achievementForm.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="akademik">Akademik</SelectItem>
                          <SelectItem value="prestasi">Prestasi</SelectItem>
                          <SelectItem value="fasilitas">Fasilitas</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={achievementForm.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="https://example.com/image.jpg" 
                        {...field} 
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormDescription>
                      URL to an image representing this achievement
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="submit">Save Achievement</Button>
              </DialogFooter>
            </form>
          </Form>
        )}

        {type === "activity" && (
          <Form {...activityForm}>
            <form onSubmit={activityForm.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={activityForm.control}
                name="title" 
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter activity title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={activityForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter activity description" 
                        {...field}
                        className="min-h-[100px]" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={activityForm.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icon</FormLabel>
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/20 p-3 rounded-full">
                        <Icon
                          name={selectedIcon as keyof typeof icons}
                          size={24}
                          color="hsl(var(--primary))"
                          className="text-primary"
                        />
                      </div>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={(value) => {
                            field.onChange(value);
                            setSelectedIcon(value);
                          }}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select an icon" />
                          </SelectTrigger>
                          <SelectContent className="max-h-[200px]">
                            {iconOptions.map((icon) => (
                              <SelectItem key={icon} value={icon}>
                                <div className="flex items-center gap-2">
                                  <Icon
                                    name={icon as keyof typeof icons}
                                    size={16}
                                    color="hsl(var(--primary))"
                                    className="text-primary"
                                  />
                                  <span>{icon}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="submit">Save Activity</Button>
              </DialogFooter>
            </form>
          </Form>
        )}

        {type === "community" && (
          <Form {...communityForm}>
            <form onSubmit={communityForm.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={communityForm.control}
                name="name" 
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter community name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={communityForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter community description" 
                        {...field}
                        className="min-h-[100px]" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={communityForm.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icon</FormLabel>
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/20 p-3 rounded-full">
                        <Icon
                          name={selectedIcon as keyof typeof icons}
                          size={24}
                          color="hsl(var(--primary))"
                          className="text-primary"
                        />
                      </div>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={(value) => {
                            field.onChange(value);
                            setSelectedIcon(value);
                          }}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select an icon" />
                          </SelectTrigger>
                          <SelectContent className="max-h-[200px]">
                            {iconOptions.map((icon) => (
                              <SelectItem key={icon} value={icon}>
                                <div className="flex items-center gap-2">
                                  <Icon
                                    name={icon as keyof typeof icons}
                                    size={16}
                                    color="hsl(var(--primary))"
                                    className="text-primary"
                                  />
                                  <span>{icon}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={communityForm.control}
                name="link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Community Link</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="https://discord.com/community" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      URL to the community page or group
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="submit">Save Community</Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
