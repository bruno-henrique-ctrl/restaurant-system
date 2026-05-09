type HeaderProps = {
    title: string
    subtitle: string
    pagetitle: string
}

export default function Header({ title, subtitle, pagetitle }: HeaderProps) {
    return (
        <header className="mb-8 sm:mb-10 md:mb-12">
            <div className="mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3">
                <div className="h-px flex-1 bg-stone-700" />
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em]  truncate max-w-[60%] sm:max-w-none text-center">
                    {pagetitle}
                </span>
                <div className="h-px flex-1 bg-stone-700" />
            </div>

            <h1
                className="mb-2 text-3xl sm:text-4xl md:text-5xl font-normal text-stone-100 text-center"
                style={{ letterSpacing: "-0.02em", lineHeight: 1.1 }}
            >
                {title}
            </h1>
            <p className="text-sm sm:text-base text-stone-200 italic text-center px-4 sm:px-0">
                {subtitle}
            </p>
        </header>
    )
}