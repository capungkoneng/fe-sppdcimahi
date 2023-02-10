export const WrapperForm = ({children, title}) => {
    return (
        <section>
            <h2 className="subtitle">{title}</h2>

            <div className="mt-4  mx-2 md:mx-10 lg:mx-10">
                {children}
            </div>
        </section>
    )
}