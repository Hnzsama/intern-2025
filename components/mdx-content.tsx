import { components, useMDXComponents } from "./mdx-components"

interface MDXProps {
    code: string
}

export function MDXContent({ code }: MDXProps) {
    const Component = useMDXComponents(code)
    return (
        <div className="mdx-content">
            <Component components={components}/>
        </div>
    )
}