export default function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-5">
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
          {title}
        </h2>
        <div className="hidden sm:block h-px flex-1 bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
      </div>

      {children}
    </section>
  );
}
