
export const SectionForm = ({
    children,
    column = "1",
    gap = "2",
    className = ''
}) => {
    let classGridColumnMd = 'md:grid-cols-'+column;
    let classGridColumnLg = 'lg:grid-cols-'+column;
    return (
        <section className={`grid ${classGridColumnMd} ${classGridColumnLg} gap-${gap} ${className}`}>
            {children}
        </section>
    )
}