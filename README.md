# Next.js Project Documentation

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Content Management

### Adding Members

To add new members to the website, follow these steps:

1. **Navigate to the members directory:**
   ```
   content/member/
   ```

2. **Create a new MDX file:**
   Create a new `.mdx` file with a descriptive filename:
   ```
   content/member/john-doe.mdx
   content/member/jane-smith.mdx
   ```

3. **Add frontmatter and content:**
   Structure your member file like this:
   ```mdx
   ---
   firstName: "John"
   lastName: "Doe"
   imageUrl: "https://i.pravatar.cc/250?img=12"
   studentId: "2023002"
   nickname: "Johnny"
   position: "Wakil Ketua Kelas"
   department: "Teknik Informatika"
   semester: 5
   birthDate: "2003-05-20"
   birthPlace: "Surabaya"
   address: "Jl. Pemuda No. 45, Surabaya"
   phone: "+62813-4567-8901"
   email: "john.doe@student.univ.ac.id"
   bio: "Mahasiswa aktif yang passionate dalam bidang web development dan berkomitmen untuk mendukung kegiatan kelas."
   hobbies: ["Programming", "Gaming", "Music", "Photography"]
   skills:
     - name: "Web Development"
       level: 90
     - name: "JavaScript"
       level: 85
     - name: "React"
       level: 88
     - name: "Node.js"
       level: 80
   achievements:
     - "Juara 2 Hackathon Universitas 2023"
     - "Best Collaborative Student Award"
     - "Active Member Tech Community"
   socialNetworks:
     - name: "LinkedIn"
       url: "https://www.linkedin.com/in/johndoe/"
     - name: "Github"
       url: "https://github.com/johndoe"
     - name: "Instagram"
       url: "https://instagram.com/johndoe"
   activities:
     - title: "Membantu koordinasi tugas kelompok kelas"
       description: "Aktif membantu mengorganisir dan mendistribusikan tugas kelas"
       date: "2023-11-10"
     - title: "Mengadakan workshop JavaScript untuk kelas"
       description: "Menyelenggarakan sharing session tentang JavaScript fundamentals"
       date: "2023-10-25"
   order: 2
   isActive: true
   joinDate: "2023-09-01"
   ---

   # Tentang Saya

   Halo! Saya John Doe, Wakil Ketua Kelas Teknik Informatika. Saya passionate dalam dunia web development dan selalu siap membantu teman-teman dalam kegiatan akademik maupun organisasi kelas.

   ## Keahlian & Minat

   Saya fokus pada pengembangan web dengan teknologi modern seperti React, Next.js, dan Node.js. Selain coding, saya juga aktif dalam kegiatan organisasi dan senang berbagi knowledge dengan teman-teman.

   ## Kontribusi untuk Kelas

   - Membantu koordinasi tugas-tugas akademik
   - Mengorganisir study group untuk mata kuliah sulit
   - Menjadi liaison antara mahasiswa dan pengajar
   - Aktif dalam kegiatan sosial dan bonding kelas
   ```

4. **Member images:**
   You can use external URLs (like Pravatar) or local images:
   
   **External URLs (recommended for testing):**
   ```
   imageUrl: "https://i.pravatar.cc/250?img=58"
   ```
   
   **Local images (for production):**
   Place member photos in the `public/images/members/` directory:
   ```
   public/images/members/john-doe.jpg
   public/images/members/jane-smith.jpg
   ```
   Then reference them:
   ```
   imageUrl: "/images/members/john-doe.jpg"
   ```

### Managing Resources and Content Types

To add new resource types or modify existing content collections:

1. **Edit the Velite configuration:**
   Open `velite.config.ts` in your project root.

2. **Add new content collections:**
   ```typescript
   // Example: Adding a new blog collection
   export default defineConfig({
     collections: {
       // Existing member collection
       member: {
         name: 'Member',
         pattern: 'member/**/*.mdx',
         schema: s
           .object({
             firstName: s.string(),
             lastName: s.string(),
             imageUrl: s.string(),
             studentId: s.string(),
             nickname: s.string().optional(),
             position: s.string(),
             department: s.string(),
             semester: s.number(),
             birthDate: s.isodate(),
             birthPlace: s.string(),
             address: s.string(),
             phone: s.string(),
             email: s.string().email(),
             bio: s.string(),
             hobbies: s.array(s.string()),
             skills: s.array(s.object({
               name: s.string(),
               level: s.number()
             })),
             achievements: s.array(s.string()),
             socialNetworks: s.array(s.object({
               name: s.string(),
               url: s.string().url()
             })),
             activities: s.array(s.object({
               title: s.string(),
               description: s.string(),
               date: s.isodate()
             })),
             order: s.number(),
             isActive: s.boolean().default(true),
             joinDate: s.isodate()
           })
           .transform(computedFields),
       },
       
       // New blog collection
       blog: {
         name: 'Blog',
         pattern: 'blog/**/*.mdx',
         schema: s
           .object({
             title: s.string(),
             description: s.string(),
             date: s.isodate(),
             published: s.boolean().default(true),
             author: s.string(),
             tags: s.array(s.string()).optional(),
           })
           .transform(computedFields),
       },
       
       // New project collection
       project: {
         name: 'Project',
         pattern: 'project/**/*.mdx',
         schema: s
           .object({
             title: s.string(),
             description: s.string(),
             status: s.enum(['active', 'completed', 'archived']),
             startDate: s.isodate(),
             endDate: s.isodate().optional(),
             technologies: s.array(s.string()),
             repository: s.string().url().optional(),
             demo: s.string().url().optional(),
           })
           .transform(computedFields),
       }
     }
   })
   ```

3. **Create corresponding content directories:**
   ```
   content/
   ├── member/          # Existing
   ├── blog/           # New
   └── project/        # New
   ```

4. **Update computed fields (if needed):**
   Modify the `computedFields` function to add calculated properties:
   ```typescript
   const computedFields = <T extends { slug: string }>(data: T) => ({
     ...data,
     slug: data.slug,
     slugAsParams: data.slug.split('/').slice(1).join('/'),
     url: `/${data.slug}`,
   })
   ```

### Content Structure Examples

#### Blog Post Example
```mdx
---
title: "Getting Started with Next.js 14"
description: "Learn how to build modern web applications with Next.js 14"
date: "2024-03-15"
author: "John Doe"
tags: ["nextjs", "react", "tutorial"]
published: true
---

# Getting Started with Next.js 14

Next.js 14 introduces several exciting features...
```

#### Project Example
```mdx
---
title: "E-commerce Platform"
description: "Full-stack e-commerce solution built with Next.js"
status: "completed"
startDate: "2024-01-01"
endDate: "2024-03-01"
technologies: ["Next.js", "PostgreSQL", "Stripe", "Tailwind CSS"]
repository: "https://github.com/company/ecommerce-platform"
demo: "https://demo.ecommerce-platform.com"
---

# E-commerce Platform

A comprehensive e-commerce solution featuring...
```

## File Organization

```
project-root/
├── app/                    # Next.js app directory
├── content/               # Content collections
│   ├── member/           # Member MDX files
│   ├── blog/             # Blog posts (if added)
│   └── project/          # Projects (if added)
├── public/               # Static assets
│   └── images/
│       ├── members/      # Member photos
│       ├── blog/         # Blog images
│       └── projects/     # Project screenshots
├── velite.config.ts      # Content configuration
└── package.json
```

## Best Practices

### Content Creation
- Use descriptive filenames (kebab-case recommended)
- Include all required frontmatter fields
- Optimize images before adding them
- Use consistent naming conventions
- Add alt text for accessibility

### Image Management
- Store images in appropriate subdirectories
- Use web-optimized formats (WebP, JPEG)
- Keep file sizes reasonable (<500KB for photos)
- Use descriptive filenames

### Schema Updates
- Test schema changes thoroughly
- Consider backward compatibility
- Document new fields in this README