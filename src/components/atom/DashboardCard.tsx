import React from "react";

interface DashboardCardProps {
  title: string;
  icon: React.ReactNode;

  total: number | string;
  primaryLabel?: string;

  secondaryLabel?: string;
  secondaryValue?: number | string;

  tertiaryLabel?: string;
  tertiaryValue?: number | string;

  fourthLabel?: string;
  fourthValue?: number | string;

  fifthLabel?: string;
  fifthValue?: number | string;
}

export default function DashboardCard({
  title,
  icon,
  total,
  primaryLabel = "Total",
  secondaryLabel,
  secondaryValue,
  tertiaryLabel,
  tertiaryValue,
  fourthLabel,
  fourthValue,
  fifthLabel,
  fifthValue,
}: DashboardCardProps) {
  return (
    <div className="group bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{total}</p>
        </div>

        <div className="p-3 rounded-xl bg-brand/10 text-brand group-hover:scale-105 transition">
          {icon}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-6 text-sm">
        {secondaryLabel && (
          <div>
            <p className="text-gray-400">{secondaryLabel}</p>
            <p className="font-semibold text-gray-800">{secondaryValue}</p>
          </div>
        )}

        {tertiaryLabel && (
          <div>
            <p className="text-gray-400">{tertiaryLabel}</p>
            <p className="font-semibold text-gray-800">{tertiaryValue}</p>
          </div>
        )}

        {fourthLabel && (
          <div>
            <p className="text-gray-400">{fourthLabel}</p>
            <p className="font-semibold text-gray-800">{fourthValue}</p>
          </div>
        )}

        {fifthLabel && (
          <div>
            <p className="text-gray-400">{fifthLabel}</p>
            <p className="font-semibold text-gray-800">{fifthValue}</p>
          </div>
        )}
      </div>
    </div>
  );
}
