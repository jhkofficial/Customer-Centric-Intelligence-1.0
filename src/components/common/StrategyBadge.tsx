import React from 'react';
import { Shield, ShieldAlert, Target } from 'lucide-react';
import { StrategyType } from '../../types';

interface StrategyBadgeProps {
  strategy: StrategyType;
  score?: number;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const StrategyBadge: React.FC<StrategyBadgeProps> = ({
  strategy,
  score,
  size = 'md',
  showIcon = true
}) => {
  const getDetails = () => {
    switch (strategy) {
      case 'DEFEND':
        return {
          label: 'DEFEND',
          fullName: 'Pertahankan',
          bgColor: 'bg-red-50 text-[#C73E3A] border-red-200',
          icon: Shield
        };
      case 'RETAIN':
        return {
          label: 'RETAIN',
          fullName: 'Retensi',
          bgColor: 'bg-amber-50 text-[#D97706] border-amber-200',
          icon: ShieldAlert
        };
      case 'ACQUIRE':
      default:
        return {
          label: 'ACQUIRE',
          fullName: 'Akuisisi',
          bgColor: 'bg-teal-50 text-[#0F7C7B] border-teal-200',
          icon: Target
        };
    }
  };

  const { label, fullName, bgColor, icon: Icon } = getDetails();

  const sizeClasses = {
    sm: 'text-[10px] px-1.5 py-0.5 gap-1',
    md: 'text-xs px-2 py-0.5 gap-1.5',
    lg: 'text-sm px-2.5 py-1 gap-2'
  }[size];

  return (
    <span
      className={`inline-flex items-center font-semibold rounded-md border ${bgColor} ${sizeClasses}`}
      title={`Strategi: ${fullName} (${label})`}
    >
      {showIcon && <Icon className="w-3 h-3 shrink-0" />}
      <span>{label}</span>
      {score !== undefined && (
        <>
          <span className="opacity-40">·</span>
          <span className="tabular-nums font-bold">{score}</span>
        </>
      )}
    </span>
  );
};
