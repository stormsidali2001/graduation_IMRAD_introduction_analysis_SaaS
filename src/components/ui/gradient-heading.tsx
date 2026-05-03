interface GradientHeadingProps {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}

export function GradientHeading({
  children,
  className = "",
  as: Tag = "h1",
}: GradientHeadingProps) {
  return (
    <Tag
      className={`font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-500 ${className}`}
    >
      {children}
    </Tag>
  );
}
