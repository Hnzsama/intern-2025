import { defineConfig, defineCollection, s } from 'velite'
import rehypeSlug from 'rehype-slug'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

const computedFields = <T extends { slug: string }>(data: T) => ({
    ...data,
    slugAsParams: data.slug.split('/').slice(1).join('/'),
})

const posts = defineCollection({
    name: 'posts',
    pattern: 'blog/**/*.mdx',
    schema: s.object({
        slug: s.path(),
        title: s.string(),
        description: s.string().optional(),
        date: s.isodate(),
        published: s.boolean().default(true),
        tags: s.array(s.string()).optional(),
        body: s.mdx()
    })
    .transform(computedFields),
})

const member = defineCollection({
    name: 'member',
    pattern: 'member/**/*.mdx',
    schema: s.object({
        slug: s.path(),
        firstName: s.string(),
        lastName: s.string(),
        imageUrl: s.string(),
        studentId: s.string(), // NIM mahasiswa
        nickname: s.string().optional(), // Nama panggilan
        position: s.string().optional(), // Jabatan di kelas (Ketua Kelas, Wakil, Sekretaris, dll)
        department: s.string().optional(), // Jurusan
        semester: s.number().optional(), // Semester saat ini
        birthDate: s.string().optional(), // Tanggal lahir (YYYY-MM-DD)
        birthPlace: s.string().optional(), // Tempat lahir
        address: s.string().optional(), // Alamat
        phone: s.string().optional(), // Nomor telepon
        email: s.string().optional(), // Email
        bio: s.string().optional(), // Bio singkat
        hobbies: s.array(s.string()).optional(), // Hobi
        skills: s.array(s.object({
            name: s.string(),
            level: s.number().min(0).max(100) // Level keahlian 0-100
        })).optional(), // Keahlian dan levelnya
        achievements: s.array(s.string()).optional(), // Prestasi yang pernah diraih
        socialNetworks: s.array(s.object({
            name: s.string(),
            url: s.string()
        })).optional(), // Instagram, Twitter, dll
        activities: s.array(s.object({
            title: s.string(),
            description: s.string().optional(),
            date: s.string() // Format: YYYY-MM-DD
        })).optional(), // Aktivitas atau kegiatan
        order: s.number().optional(), // Urutan tampilan
        isActive: s.boolean().default(true), // Status aktif
        joinDate: s.string().optional(), // Tanggal bergabung dengan kelas
        body: s.mdx() // Konten detail profil
    })
    .transform(computedFields),
})

export default defineConfig({
    root: 'content',
    output: {
        data: '.velite',
        assets: 'public/static',
        base: '/static/',
        name: "[name]-[hash:6].ext",
        clean: true
    },
    collections: {
        posts,
        member
    },
    mdx: {
        rehypePlugins: [
            rehypeSlug,
            [rehypePrettyCode, {
                theme: 'github-dark',
                keepBackground: false
            }],
            [rehypeAutolinkHeadings, {
                behavior: 'wrap',
                properties: {
                    className: ['subheading-anchor'],
                    ariaLabel: 'Link to section'
                }
            }]
        ],
        remarkPlugins: []
    }
})