"use client";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
}

const ICON_SIZES = { sm: 26, md: 32, lg: 44, xl: 56 };
const TEXT_SIZES = { sm: "text-lg", md: "text-xl", lg: "text-3xl", xl: "text-4xl sm:text-5xl" };
const GAPS = { sm: "gap-2", md: "gap-2.5", lg: "gap-3", xl: "gap-4" };

function LeafForkIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Leaf shape */}
      <path
        d="M24 6C14 6 6 14 6 26c0 8 4.5 14 11 17.5L20 40V28l-5-5 2.5-2.5L22 25V12h4v13l4.5-4.5L33 23l-5 5v12l3 3.5C37.5 40 42 34 42 26 42 14 34 6 24 6z"
        fill="#e59a45"
      />
      {/* Fork prongs */}
      <path
        d="M20 14v5M24 14v5M28 14v5"
        stroke="#100e0c"
        strokeWidth={2}
        strokeLinecap="round"
      />
      {/* Fork handle */}
      <path
        d="M24 19v22"
        stroke="#100e0c"
        strokeWidth={2}
        strokeLinecap="round"
      />
      {/* Fork base */}
      <path
        d="M20 19a4 4 0 0 0 8 0"
        stroke="#100e0c"
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({ size = "md" }: LogoProps) {
  return (
    <div className={`flex items-center ${GAPS[size]}`}>
      <LeafForkIcon size={ICON_SIZES[size]} />
      <span className={`${TEXT_SIZES[size]} font-bold tracking-tight text-text-primary`}>
        Meal<span className="text-brand">Craft</span>
      </span>
    </div>
  );
}
