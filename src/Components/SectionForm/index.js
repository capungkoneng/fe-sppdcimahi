
export const SectionForm = ({
    children,
    column = "1",
    gap = "2",
    className = ''
}) => {
    const classGridColumnMd = `md:grid-cols-${column}`;
    const classGridColumnLg = `lg:grid-cols-${column}`;
    return (
        <section className={`grid ${classGridColumnMd} ${classGridColumnLg} gap-${gap} ${className}`}>
            {children}
        </section>
    )
}