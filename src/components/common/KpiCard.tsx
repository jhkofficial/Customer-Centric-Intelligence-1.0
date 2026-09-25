import React from 'react';
import { TrendingUp, TrendingDown, Minus, Info } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral' | 'warning';
  sparklineData?: number[];
  tooltip?: string;
  subtitle?: string;
  onClick?: () => void;
  className?: string;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  change,
  changeType = 'neutral',
  sparklineData = [35, 42, 38, 50, 48, 62],
  tooltip,
  subtitle,
  onClick,
  className = ''
}) => {
  const getChangeStyles = () => {
    switch (changeType) {
      case 'positive':
        return 'text-[#14804A] bg-emerald-50';
      case 'negative':
      case 'warning':
        return 'text-[#C73E3A] bg-rose-50';
      case 'neutral':
      default:
        return 'text-[#607080] bg-slate-100';
    }
  };

  const getTrendIcon = () => {
    switch (changeType) {
      case 'positive':
        return <TrendingUp className="w-3 h-3 text-[#14804A]" />;
      case 'negative':
      case 'warning':
        return <TrendingDown className="w-3 h-3 text-[#C73E3A]" />;
      default:
        return <Minus className="w-3 h-3 text-[#607080]" />;
    }
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white border border-[#DDE3EA] rounded-xl p-4 transition-all hover:border-slate-300 relative ${
        onClick ? 'cursor-pointer hover:shadow-sm' : ''
      } ${className}`}
    >
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <span className="text-xs font-semibold text-[#607080] truncate">{title}</span>
        {tooltip && (
          <div className="group relative" title={tooltip}>
            <Info className="w-3.5 h-3.5 text-[#607080] hover:text-[#17212B]" />
          </div>
        )}
      </div>

      <div className="flex items-baseline justify-between gap-3">
        <div className="text-2xl font-bold tracking-tight text-[#17212B] tabular-nums">
          {value}
        </div>

        {/* Small SVG Sparkline */}
        {sparklineData && sparklineData.length > 0 && (
          <div className="w-16 h-7 shrink-0">
            <svg viewBox="0 0 60 24" className="w-full h-full overflow-visible">
              <polyline
                fill="none"
                stroke={changeType === 'warning' || changeType === 'negative' ? '#C73E3A' : '#2563EB'}
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={sparklineData
                  .map((val, idx) => {
                    const x = (idx / (sparklineData.length - 1)) * 60;
                    const max = Math.max(...sparklineData);
                    const min = Math.min(...sparklineData);
                    const range = max - min || 1;
                    const y = 20 - ((val - min) / range) * 16;
                    return `${x},${y}`;
                  })
                  .join(' ')}
              />
            </svg>
          </div>
        )}
      </div>

      {(change || subtitle) && (
        <div className="mt-2 flex items-center justify-between text-[11px]">
          {change && (
            <div className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-medium ${getChangeStyles()}`}>
              {getTrendIcon()}
              <span>{change}</span>
            </div>
          )}
          {subtitle && (
            <span className="text-[#607080] truncate ml-auto">{subtitle}</span>
          )}
        </div>
      )}
    </div>
  );
};
