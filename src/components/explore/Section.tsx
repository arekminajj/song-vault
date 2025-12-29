export default function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      {children}
    </section>
  );
}
