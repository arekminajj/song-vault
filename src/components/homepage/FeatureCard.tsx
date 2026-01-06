export default function FeatureCard({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:bg-white/[0.05] transition">
      <p className="text-white font-semibold">{title}</p>
      <p className="mt-2 text-sm text-gray-400 leading-relaxed">{desc}</p>
    </div>
  );
}
