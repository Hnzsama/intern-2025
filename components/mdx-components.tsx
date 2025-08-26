import Image from "next/image"
import * as runtime from "react/jsx-runtime"
import { Button } from "./ui/button";
import Link from "next/link";
import { 
  Alert, 
  AlertDescription, 
  AlertTitle 
} from "./ui/alert";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "./ui/table";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "./ui/tabs";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "./ui/select";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Progress } from "./ui/progress";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import React from "react";

export const useMDXComponents = (code: string) => {
    const fn = new Function(code);
    return fn({ ...runtime }).default
}

// Helper function to check if element is a block-level component that shouldn't be wrapped in <p>
const isBlockElement = (children: React.ReactNode): boolean => {
  if (!React.isValidElement(children)) return false;
  
  const blockTypes = [
    'div', 'section', 'article', 'aside', 'header', 'footer', 'nav', 'main',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'ul', 'ol', 'li', 'dl', 'dt', 'dd',
    'table', 'thead', 'tbody', 'tr', 'td', 'th',
    'form', 'fieldset', 'legend',
    'blockquote', 'pre', 'hr',
    // Add component names that should be treated as block elements
    'Card', 'Alert', 'Tabs', 'Table', 'Accordion'
  ];
  
  return blockTypes.includes(children.type as string);
};

export const components = {
    // Next.js components
    Image,
    Link,
    
    // Typography components with explicit spacing
    h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mt-8 mb-6 first:mt-0" {...props}>
            {children}
        </h1>
    ),
    h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight mt-12 mb-6 first:mt-0" {...props}>
            {children}
        </h2>
    ),
    h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mt-10 mb-4" {...props}>
            {children}
        </h3>
    ),
    h4: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mt-8 mb-3" {...props}>
            {children}
        </h4>
    ),
    // Fixed p component - don't wrap if children contain block elements
    p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => {
        // If children contain block elements or components, render as div instead
        const hasBlockChildren = React.Children.toArray(children).some(child => 
            isBlockElement(child)
        );
        
        if (hasBlockChildren) {
            return (
                <div className="leading-7 mb-6 [&:not(:first-child)]:mt-6" {...props}>
                    {children}
                </div>
            );
        }
        
        return (
            <p className="leading-7 mb-6 [&:not(:first-child)]:mt-6" {...props}>
                {children}
            </p>
        );
    },
    blockquote: ({ children, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
        <blockquote className="mt-6 border-l-2 pl-6 italic mb-6" {...props}>
            {children}
        </blockquote>
    ),
    ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2 space-y-2" {...props}>
            {children}
        </ul>
    ),
    ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
        <ol className="my-6 ml-6 list-decimal [&>li]:mt-2 space-y-2" {...props}>
            {children}
        </ol>
    ),
    li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
        <li className="mt-2 leading-7" {...props}>
            {children}
        </li>
    ),
    hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => (
        <hr className="my-8 md:my-12" {...props} />
    ),
    code: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold" {...props}>
            {children}
        </code>
    ),
    pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
        <pre className="mb-6 mt-6 overflow-x-auto rounded-lg border bg-muted p-4" {...props}>
            {children}
        </pre>
    ),
    strong: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
        <strong className="font-semibold" {...props}>
            {children}
        </strong>
    ),
    em: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
        <em className="italic" {...props}>
            {children}
        </em>
    ),
    a: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
        <a 
            href={href} 
            className="font-medium text-primary underline underline-offset-4 hover:no-underline" 
            {...props}
        >
            {children}
        </a>
    ),
    
    // Remove the generic div wrapper - let components handle their own spacing
    div: ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
        <div className={className} {...props}>{children}</div>
    ),
    
    // Shadcn components with proper spacing - no additional wrappers
    Alert: ({ children, className, ...props }: React.ComponentProps<typeof Alert>) => (
        <Alert className={`my-6 ${className || ''}`} {...props}>{children}</Alert>
    ),
    Card: ({ children, className, ...props }: React.ComponentProps<typeof Card>) => (
        <Card className={`my-6 ${className || ''}`} {...props}>{children}</Card>
    ),
    Tabs: ({ children, className, ...props }: React.ComponentProps<typeof Tabs>) => (
        <Tabs className={`my-6 ${className || ''}`} {...props}>{children}</Tabs>
    ),
    Table: ({ children, className, ...props }: React.ComponentProps<typeof Table>) => (
        <div className="my-6">
            <Table className={className} {...props}>{children}</Table>
        </div>
    ),
    Accordion: ({ children, className, ...props }: React.ComponentProps<typeof Accordion>) => (
        <Accordion className={`my-6 ${className || ''}`} {...props}>{children}</Accordion>
    ),
    Progress: ({ className, ...props }: React.ComponentProps<typeof Progress>) => (
        <div className="my-4">
            <Progress className={className} {...props} />
        </div>
    ),
    Separator: ({ className, ...props }: React.ComponentProps<typeof Separator>) => (
        <div className="my-8">
            <Separator className={className} {...props} />
        </div>
    ),
    
    // Basic UI components - no modifications needed
    Button,
    Badge,
    Input,
    Label,
    Textarea,
    Checkbox,
    
    // Layout components
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    
    // Feedback components
    AlertDescription,
    AlertTitle,
    
    // Data display
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    Avatar,
    AvatarFallback,
    AvatarImage,
    
    // Navigation components
    TabsContent,
    TabsList,
    TabsTrigger,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
    
    // Form components
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    
    // Overlay components
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    TooltipProvider,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
}