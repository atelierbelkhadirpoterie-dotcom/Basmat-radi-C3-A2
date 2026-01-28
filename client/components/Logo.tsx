interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "w-10 h-10",
  md: "w-14 h-14",
  lg: "w-24 h-24",
};

export default function Logo({ size = "md", className = "" }: LogoProps) {
  const sizeClass = sizeMap[size];

  return (
    <div className={`inline-flex items-center justify-center ${sizeClass} rounded-full overflow-hidden shadow-md ${className}`}>
      <img
        src="https://cdn.builder.io/api/v1/image/assets%2Fcebc20bd57884b32800f08d8a19ef8e0%2Fa86d43f3f0d3470bbe8045bf06f0e150?format=webp&width=800&height=1200"
        alt="Baby Smile Logo"
        className="w-full h-full object-cover"
      />
    </div>
  );
}
