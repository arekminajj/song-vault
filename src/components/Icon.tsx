type IconName = "search" | "star" | "insights" | "forum";

const paths: Record<IconName, string> = {
  search:
    "M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L20 21.5 21.5 20l-6-6zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z",
  star: "M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z",
  insights:
    "M3 3h2v18H3V3zm16 8h2v10h-2V11zM7 13h2v8H7v-8zm8-10h2v18h-2V3zm-4 6h2v12h-2V9z",
  forum: "M4 4h16v12H7l-3 3V4zm4 5h8v2H8V9zm0-3h12v2H8V6zm0 6h6v2H8v-2z",
};

export default function Icon({
  name,
  className,
  title,
}: {
  name: IconName;
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className ?? "h-4 w-4"}
      fill="currentColor"
      role="img"
      aria-label={title ?? name}
    >
      {title ? <title>{title}</title> : null}
      <path d={paths[name]} />
    </svg>
  );
}
