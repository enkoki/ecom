type SectionTitleProps = {
  eyebrow: string
  title: string
}

function SectionTitle({ eyebrow, title }: SectionTitleProps) {
  return (
    <div>
      <p className="mb-3 flex items-center gap-3 text-sm font-semibold text-violet-brand">
        <span className="h-8 w-2.5 rounded-sm bg-violet-brand" />{eyebrow}
      </p>
      <h1 className="text-3xl font-semibold tracking-wide">{title}</h1>
    </div>
  )
}

export default SectionTitle
