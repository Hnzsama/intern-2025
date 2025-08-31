"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { icons } from "lucide-react";
import { Icon } from "@/components/ui/icon";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Create a map of all available Lucide icons to display in the icon selector
const iconOptions = Object.keys(icons).filter(
  (icon) => typeof icons[icon as keyof typeof icons] === "function"
).slice(0, 100); // Limit to first 100 icons for performance

interface SimpleEntryFormProps {
  type: "activity" | "community" | "achievement";
  onSubmit: (data: any) => void;
}

export function SimpleEntryForm({ type, onSubmit }: SimpleEntryFormProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "Activity",
    // For activities, these are all we need
    // For achievements
    number: "",
    progress: 80,
    status: "excellent",
    category: "akademik",
    image: "",
    // For communities
    name: "",
    link: ""
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let dataToSubmit;
    
    if (type === "activity") {
      const { title, description, icon } = formData;
      if (!title || !description || !icon) {
        alert("Please fill all required fields");
        return;
      }
      dataToSubmit = { title, description, icon };
    } else if (type === "achievement") {
      const { title, description, icon, number, progress, status, category, image } = formData;
      if (!title || !description || !icon || !number || !category) {
        alert("Please fill all required fields");
        return;
      }
      dataToSubmit = { title, description, icon, number, progress, status, category, image };
    } else { // community
      const { name, description, icon, link } = formData;
      if (!name || !description || !icon) {
        alert("Please fill all required fields");
        return;
      }
      dataToSubmit = { name, description, icon, link };
    }
    
    onSubmit(dataToSubmit);
    setOpen(false);
    alert(`New ${type} added successfully!`);
    
    // Reset form
    setFormData({
      title: "",
      description: "",
      icon: "Activity",
      number: "",
      progress: 80,
      status: "excellent",
      category: "akademik",
      image: "",
      name: "",
      link: ""
    });
  };

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
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Common fields */}
          {(type === "activity" || type === "achievement") && (
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">Title</label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder={`Enter ${type} title`}
              />
            </div>
          )}
          
          {type === "community" && (
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Name</label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter community name"
              />
            </div>
          )}
          
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">Description</label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder={`Enter ${type} description`}
              className="min-h-[100px]"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="icon" className="text-sm font-medium">Icon</label>
            <div className="flex items-center gap-4">
              <div className="bg-primary/20 p-3 rounded-full">
                <Icon
                  name={formData.icon as keyof typeof icons}
                  size={24}
                  color="hsl(var(--primary))"
                  className="text-primary"
                />
              </div>
              <Select 
                value={formData.icon} 
                onValueChange={(value) => handleSelectChange("icon", value)}
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
            </div>
          </div>
          
          {/* Achievement specific fields */}
          {type === "achievement" && (
            <>
              <div className="space-y-2">
                <label htmlFor="number" className="text-sm font-medium">Number/Value</label>
                <Input
                  id="number"
                  name="number"
                  value={formData.number}
                  onChange={handleInputChange}
                  placeholder="e.g. 45, 3.7, 95%"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="progress" className="text-sm font-medium">Progress (0-100)</label>
                <Input
                  id="progress"
                  name="progress"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.progress}
                  onChange={(e) => handleSelectChange("progress", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="status" className="text-sm font-medium">Status</label>
                <Select 
                  value={formData.status} 
                  onValueChange={(value) => handleSelectChange("status", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Excellent</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="average">Average</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-medium">Category</label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => handleSelectChange("category", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="akademik">Akademik</SelectItem>
                    <SelectItem value="prestasi">Prestasi</SelectItem>
                    <SelectItem value="fasilitas">Fasilitas</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="image" className="text-sm font-medium">Image URL</label>
                <Input
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                />
                <p className="text-xs text-muted-foreground">
                  URL to an image representing this achievement
                </p>
              </div>
            </>
          )}
          
          {/* Community specific fields */}
          {type === "community" && (
            <div className="space-y-2">
              <label htmlFor="link" className="text-sm font-medium">Community Link</label>
              <Input
                id="link"
                name="link"
                value={formData.link}
                onChange={handleInputChange}
                placeholder="https://discord.com/community"
              />
              <p className="text-xs text-muted-foreground">
                URL to the community page or group
              </p>
            </div>
          )}
          
          <DialogFooter>
            <Button type="submit">Save {type}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
