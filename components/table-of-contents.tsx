"use client"

import { FileTextIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTableOfContents, TocItem } from "@/hooks/use-table-of-contents"

interface TableOfContentsProps {
  className?: string
}

export function TableOfContents({ className }: TableOfContentsProps) {
  const { toc, activeId } = useTableOfContents()

  if (toc.length === 0) {
    return null
  }

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100 // Account for sticky header
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const getIndentClass = (level: number) => {
    switch (level) {
      case 1:
        return 'pl-0'
      case 2:
        return 'pl-3'
      case 3:
        return 'pl-6'
      case 4:
        return 'pl-9'
      case 5:
        return 'pl-12'
      case 6:
        return 'pl-15'
      default:
        return 'pl-0'
    }
  }

  return (
    <div className={cn("bg-card/50 backdrop-blur-sm rounded-lg border p-6 shadow-sm", className)}>
      <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
        <FileTextIcon className="h-4 w-4" />
        On this page
      </div>
      
      <nav className="space-y-1">
        {toc.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToHeading(item.id)}
            className={cn(
              "block w-full text-left py-2 px-3 text-sm rounded-md transition-all duration-200 border-l-2",
              getIndentClass(item.level),
              activeId === item.id
                ? "text-primary bg-primary/10 border-primary font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50 border-transparent hover:border-primary/50"
            )}
          >
            {item.title}
          </button>
        ))}
      </nav>
    </div>
  )
}