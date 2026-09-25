import React, { useState } from 'react';
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  Layers,
  AlertCircle,
  Building2,
  CheckCircle2,
  UserCheck
} from 'lucide-react';
import { UserRole } from '../types';

interface LoginScreenProps {
  onLoginSuccess: (selectedRole?: UserRole) => void;
  initialRole?: UserRole;
}

const PRESET_ACCOUNTS: Array<{
  role: UserRole;
  name: string;
  email: string;
  title: string;
  badge: string;
}> = [
  {
    role: 'Administrator',
    name: 'Johanes Admin',
    email: 'johanes.admin@serveon.id',
    title: 'Super Admin',
    badge: 'Akses Penuh'
  },
  {
    role: 'Executive / Management',
    name: 'Dewi Rahmawati',
    email: 'dewi.exec@serveon.id',
    title: 'VP Regional',
    badge: 'Eksekutif'
  },
  {
    role: 'Business / Marketing',
    name: 'Rian Kusuma',
    email: 'rian.mkt@serveon.id',
    title: 'Lead Marketing',
    badge: 'Kampanye'
  },
  {
    role: 'Network Development',
    name: 'Bambang Sudiro',
    email: 'bambang.net@serveon.id',
    title: 'Expansion Strategist',
    badge: 'Lokasi & POI'
  },
  {
    role: 'Data Analyst / Data Scientist',
    name: 'Siti Nurhaliza',
    email: 'siti.data@serveon.id',
    title: 'Geospatial ML',
    badge: 'Model & AI'
  }
];

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLoginSuccess,
  initialRole = 'Administrator'
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole);
  const [email, setEmail] = useState('johanes.admin@serveon.id');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [infoMessage, setInfoMessage] = useState('');

  const currentPreset = PRESET_ACCOUNTS.find((p) => p.role === selectedRole) || PRESET_ACCOUNTS[0];

  const handleSelectRole = (preset: typeof PRESET_ACCOUNTS[0]) => {
    setSelectedRole(preset.role);
    setEmail(preset.email);
    setPassword('password123');
    setErrorMessage('');
    setInfoMessage(`Akun disiapkan: ${preset.name} (${preset.title})`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Harap masukkan alamat email dan kata sandi Anda.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setInfoMessage('');

    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(selectedRole);
    }, 400);
  };

  const handleQuickDemoAccess = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(selectedRole);
    }, 300);
  };

  return (
    <div className="min-h-screen w-full bg-[#F4F6F9] text-slate-800 flex items-center justify-center p-4 sm:p-6 relative font-['Plus_Jakarta_Sans',sans-serif] overflow-hidden">
      {/* Subtle modern, bright, professional background decorations */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-70" />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-100/70 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-slate-200/70 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-50/60 to-indigo-50/40 rounded-full blur-3xl -z-10" />
      </div>

      {/* Main Clean & Professional Login Card */}
      <div className="relative z-10 w-full max-w-[420px] bg-white border border-slate-200/90 rounded-2xl shadow-xl shadow-slate-200/60 p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Brand Header (Simplified, clean, phrase removed) */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20 mb-3">
            <Layers className="w-6 h-6 text-white" />
          </div>
          <div className="flex items-center justify-center gap-2 mb-1.5">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-['Cabinet_Grotesk',sans-serif]">
              SERVEON
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              Jawa Tengah
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Masuk ke akun untuk melanjutkan ke dashboard
          </p>
        </div>

        {/* Status Alerts */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2.5 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        {infoMessage && (
          <div className="mb-4 p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-700 flex items-center gap-2.5 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-blue-600" />
            <span>{infoMessage}</span>
          </div>
        )}

        {/* Demo Role / Persona Selector (Clean & Simple) */}
        <div className="mb-5 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-slate-600 flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-blue-600" />
              Pilih Peran:
            </span>
            <span className="text-[10px] font-semibold text-blue-700 bg-white px-2 py-0.5 rounded border border-blue-200">
              {currentPreset.role}
            </span>
          </div>

          <div className="grid grid-cols-5 gap-1">
            {PRESET_ACCOUNTS.map((preset) => {
              const isSelected = selectedRole === preset.role;
              return (
                <button
                  key={preset.role}
                  type="button"
                  onClick={() => handleSelectRole(preset)}
                  title={`${preset.name} — ${preset.title} (${preset.role})`}
                  className={`py-1.5 px-1 rounded-lg text-center text-[10.5px] transition-all border ${
                    isSelected
                      ? 'bg-blue-600 text-white font-semibold border-blue-600 shadow-sm'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="truncate">{preset.badge}</div>
                </button>
              );
            })}
          </div>

          <div className="mt-2 text-[10.5px] text-slate-500 flex items-center justify-between px-1">
            <span className="truncate font-medium text-slate-700">{currentPreset.name}</span>
            <span className="text-slate-400 font-mono text-[10px]">{currentPreset.email}</span>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Alamat Email
            </label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@serveon.id"
                required
                className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-xs text-slate-900 rounded-xl pl-10 pr-3 py-2.5 outline-none transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Kata Sandi
              </label>
              <button
                type="button"
                onClick={() => setInfoMessage('Instruksi pemulihan kata sandi telah dikirimkan ke Administrator.')}
                className="text-[11px] text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Lupa sandi?
              </button>
            </div>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-xs text-slate-900 rounded-xl pl-10 pr-10 py-2.5 outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-0.5">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600 hover:text-slate-800">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-3.5 h-3.5 rounded text-blue-600 border-slate-300 focus:ring-blue-500 cursor-pointer"
              />
              <span>Ingat kredensial di perangkat ini</span>
            </label>
          </div>

          {/* Primary Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 shadow-sm shadow-blue-500/20 hover:shadow disabled:opacity-60 cursor-pointer"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Memverifikasi Akses...
              </span>
            ) : (
              <>
                <span>Masuk ke Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Quick Demo Access (Simple & Clean) */}
        <div className="mt-3">
          <button
            type="button"
            onClick={handleQuickDemoAccess}
            className="w-full py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Building2 className="w-3.5 h-3.5 text-slate-500" />
            <span>Akses Cepat Mode Demo</span>
          </button>
        </div>

        {/* Security & Audit Footer Note */}
        <div className="mt-6 pt-4 border-t border-slate-100 text-center space-y-1">
          <div className="text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Enkripsi 256-Bit • Sesi Terlindungi ISO 27001</span>
          </div>
          <div className="text-[10px] text-slate-400">
            &copy; 2026 SERVEON • Regional Jawa Tengah
          </div>
        </div>

      </div>
    </div>
  );
};
