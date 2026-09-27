import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Phone,
  MessageSquare,
  Calendar,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  UserCheck
} from 'lucide-react';
import {
  ProspectProfile,
  FollowUpOutcome,
  CommunicationChannel
} from '../../types/orchestration';
import { REASON_CODE_CATEGORIES } from '../../data/orchestrationData';

interface RecordFollowUpModalProps {
  prospect: ProspectProfile;
  isOpen: boolean;
  onClose: () => void;
  onSaveResult: (updatedProspect: ProspectProfile) => void;
  onShowToast: (msg: string) => void;
}

export const RecordFollowUpModal: React.FC<RecordFollowUpModalProps> = ({
  prospect,
  isOpen,
  onClose,
  onSaveResult,
  onShowToast
}) => {
  const [outcome, setOutcome] = useState<FollowUpOutcome>('Interested — Financing Barrier');
  const [customerResponse, setCustomerResponse] = useState<string>(
    'Tertarik sekali Mas, tapi angsuran bulanannya masih terlalu berat kalau Rp1,25 juta per bulan. Mungkin bulan depan ya.'
  );
  const [interestLevel, setInterestLevel] = useState<'HIGH' | 'MEDIUM' | 'LOW'>('HIGH');
  const [selectedCategory, setSelectedCategory] = useState<string>('financing');
  const [selectedSubReason, setSelectedSubReason] = useState<string>('Angsuran Bulanan Terlalu Berat');
  const [expectedPurchaseDate, setExpectedPurchaseDate] = useState<string>('30 Hari (Bulan Depan)');
  const [nextFollowUpDate, setNextFollowUpDate] = useState<string>('30 Sep 2026');
  const [nextAction, setNextAction] = useState<string>('Tawarkan Skema Alternatif DP Rendah & Tenor Panjang');
  const [preferredChannel, setPreferredChannel] = useState<CommunicationChannel>('WhatsApp');
  const [productInterest, setProductInterest] = useState<string>(prospect.productInterest);
  const [salesNotes, setSalesNotes] = useState<string>(
    'Konsumen antusias dengan performa CB150R. Minta rincian cicilan di bawah Rp1.100.000 dengan leasing FIF.'
  );
  const [isTemporaryRejection, setIsTemporaryRejection] = useState<boolean>(true);

  if (!isOpen) return null;

  const currentCategoryObj = REASON_CODE_CATEGORIES.find((c) => c.id === selectedCategory);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let newStatus = prospect.status;
    let isConverted = false;
    let isPurchasedOther = false;
    let isDNC = false;

    // Automated Decision Branching (Sections 7-17)
    if (outcome === 'Interested — Ready to Buy') {
      newStatus = 'Hot Prospect';
      onShowToast(`Cabang Keputusan: READY TO BUY diaktifkan untuk ${prospect.name}. Menyiapkan Test Drive & SPK.`);
    } else if (outcome === 'Interested — Need Test Drive') {
      newStatus = 'Test Drive Scheduled';
      onShowToast(`Jadwal Test Drive dibuat untuk ${prospect.name}. Unit disiapkan di dealer.`);
    } else if (outcome === 'Interested — Financing Barrier') {
      newStatus = 'Financing Barrier';
      onShowToast(`Cabang Keputusan: FINANCING BARRIER dicatat. AI menyiapkan alternatif pembiayaan.`);
    } else if (outcome === 'Interested — Purchase Later') {
      newStatus = 'Deferred';
      onShowToast(`Cabang Keputusan: DEFERRED. Memulai Nurture Journey 30 hari.`);
    } else if (outcome === 'Interested in Different Product') {
      newStatus = 'Interested';
      onShowToast(`Cabang Keputusan: SWITCH PRODUCT JOURNEY! Produk diubah ke ${productInterest}.`);
    } else if (outcome === 'Comparing Competitor') {
      newStatus = 'Considering';
      onShowToast(`Cabang Keputusan: EDUCATION JOURNEY diaktifkan untuk mengatasi perbandingan kompetitor.`);
    } else if (outcome === 'No Response') {
      newStatus = 'No Response';
      onShowToast(`Contact Policy: Percobaan kontak dicatat. Jadwal jeda otomatis diterapkan.`);
    } else if (outcome === 'Purchased at Other Branch') {
      newStatus = 'Purchased Other Branch';
      isConverted = true;
      isPurchasedOther = true;
      onShowToast(`One Customer View: Pembelian di cabang lain terdeteksi! Dikonversi ke Post-Purchase Journey.`);
    } else if (outcome === 'Do Not Contact') {
      newStatus = 'Do Not Contact';
      isDNC = true;
      onShowToast(`Privasi & Consent: Status DO NOT CONTACT diaktifkan. Seluruh penjangkauan dihentikan.`);
    } else if (outcome === 'Not Interested') {
      newStatus = isTemporaryRejection ? 'Nurture' : 'Lost — Budget';
      onShowToast(isTemporaryRejection ? 'Penolakan sementara: dialihkan ke Nurture pasif.' : 'Lead ditutup.');
    }

    const updated: ProspectProfile = {
      ...prospect,
      productInterest,
      previousProductInterest: productInterest !== prospect.productInterest ? prospect.productInterest : prospect.previousProductInterest,
      status: newStatus,
      lastOutcome: outcome,
      lastReason: currentCategoryObj?.name || 'General',
      lastSubReason: selectedSubReason,
      lastInteractionDate: '27 Sep 2026',
      lastInteractionTime: '15:30 WIB',
      nextFollowUpDate,
      customerBarrier: selectedSubReason,
      expectedPurchaseTiming: expectedPurchaseDate,
      preferredChannel,
      notes: salesNotes,
      intentLevel: interestLevel,
      isConverted,
      isPurchasedOtherBranch: isPurchasedOther,
      isDoNotContact: isDNC,
      contactAttempts: prospect.contactAttempts + 1
    };

    onSaveResult(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl border border-[#DDE3EA] shadow-2xl max-w-2xl w-full p-6 space-y-4 animate-in zoom-in-95 max-h-[92vh] overflow-y-auto font-['Plus_Jakarta_Sans',sans-serif]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#DDE3EA]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Catat Hasil Follow-Up Penjualan
              </h3>
              <p className="text-xs text-slate-500">
                Prospek: <strong>{prospect.name}</strong> ({prospect.phone}) · PIC: {prospect.assignedSales}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* 1. Customer Response */}
          <div>
            <label className="block font-bold text-slate-800 mb-1">
              Respons / Ungkapan Konsumen Saat Follow-Up <span className="text-rose-600">*</span>
            </label>
            <textarea
              rows={2}
              required
              value={customerResponse}
              onChange={(e) => setCustomerResponse(e.target.value)}
              placeholder="Ketik apa yang disampaikan konsumen secara spesifik..."
              className="w-full bg-[#F5F7FA] border border-[#DDE3EA] rounded-xl p-2.5 text-xs text-slate-900 outline-none focus:border-blue-600 focus:bg-white transition-all placeholder:text-slate-400"
            />
          </div>

          {/* 2. Main Outcome & Interest Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Hasil Interaksi (Outcome) <span className="text-rose-600">*</span>
              </label>
              <select
                value={outcome}
                onChange={(e) => setOutcome(e.target.value as FollowUpOutcome)}
                className="w-full bg-[#F5F7FA] border border-[#DDE3EA] rounded-xl p-2.5 text-xs text-slate-900 font-semibold outline-none focus:border-blue-600 focus:bg-white"
              >
                <option value="Interested — Ready to Buy">Interested — Ready to Buy</option>
                <option value="Interested — Need Test Drive">Interested — Need Test Drive</option>
                <option value="Interested — Financing Barrier">Interested — Financing Barrier</option>
                <option value="Interested — Budget Constraint">Interested — Budget Constraint</option>
                <option value="Interested — Purchase Later">Interested — Purchase Later</option>
                <option value="Considering">Considering</option>
                <option value="Comparing Competitor">Comparing Competitor</option>
                <option value="Interested in Different Product">Interested in Different Product</option>
                <option value="No Response">No Response</option>
                <option value="Not Interested">Not Interested</option>
                <option value="Purchased at Other Branch">Purchased at Other Branch</option>
                <option value="Purchased Competitor">Purchased Competitor</option>
                <option value="Do Not Contact">Do Not Contact (Opt-Out)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Tingkat Minat Beli (Intent Level)
              </label>
              <div className="flex items-center gap-1.5 pt-1">
                {(['HIGH', 'MEDIUM', 'LOW'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setInterestLevel(lvl)}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all border ${
                      interestLevel === lvl
                        ? lvl === 'HIGH'
                          ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                          : lvl === 'MEDIUM'
                          ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                          : 'bg-slate-700 text-white border-slate-700 shadow-xs'
                        : 'bg-[#F5F7FA] text-slate-600 border-[#DDE3EA] hover:bg-slate-100'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Hierarchical Reason & Sub-Reason Code System (Section 6) */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 space-y-2.5">
            <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wide flex items-center justify-between">
              <span>Alasan &amp; Hambatan Utama (Hierarchical Reason Codes)</span>
              <span className="text-[10px] text-blue-600 font-semibold">Mempengaruhi AI Next Best Action</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-slate-600 mb-1">Kategori Alasan:</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    const cat = REASON_CODE_CATEGORIES.find((c) => c.id === e.target.value);
                    if (cat && cat.subReasons.length > 0) {
                      setSelectedSubReason(cat.subReasons[0]);
                    }
                  }}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-800 font-medium outline-none focus:border-blue-600"
                >
                  {REASON_CODE_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] text-slate-600 mb-1">Rincian Sub-Alasan:</label>
                <select
                  value={selectedSubReason}
                  onChange={(e) => setSelectedSubReason(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-800 font-medium outline-none focus:border-blue-600"
                >
                  {currentCategoryObj?.subReasons.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* 4. Special Prompt for "Not Interested" */}
          {outcome === 'Not Interested' && (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 space-y-1.5">
              <div className="font-bold text-amber-900 text-xs">Apakah penolakan ini bersifat sementara?</div>
              <div className="flex gap-3 text-xs">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    checked={isTemporaryRejection}
                    onChange={() => setIsTemporaryRejection(true)}
                    className="text-amber-600"
                  />
                  <span>Ya, alihkan ke Nurture Journey jangka panjang</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    checked={!isTemporaryRejection}
                    onChange={() => setIsTemporaryRejection(false)}
                    className="text-amber-600"
                  />
                  <span>Tidak, tutup lead (Close Lead / Lost)</span>
                </label>
              </div>
            </div>
          )}

          {/* 5. Product & Timeline Specifics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1">Minat Unit Motor:</label>
              <select
                value={productInterest}
                onChange={(e) => setProductInterest(e.target.value)}
                className="w-full bg-[#F5F7FA] border border-[#DDE3EA] rounded-xl p-2.5 text-xs text-slate-900 font-medium outline-none"
              >
                <option value="Honda CB150R">Honda CB150R</option>
                <option value="Honda ADV 160">Honda ADV 160</option>
                <option value="Honda PCX 160 ABS">Honda PCX 160 ABS</option>
                <option value="Honda Vario 160 CBS">Honda Vario 160 CBS</option>
                <option value="Honda Scoopy Prestige">Honda Scoopy Prestige</option>
                <option value="Honda Stylo 160 ABS">Honda Stylo 160 ABS</option>
                <option value="Honda BeAT Deluxe">Honda BeAT Deluxe</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">Estimasi Beli:</label>
              <input
                type="text"
                value={expectedPurchaseDate}
                onChange={(e) => setExpectedPurchaseDate(e.target.value)}
                placeholder="misal: 30 Hari / Awal Bulan"
                className="w-full bg-[#F5F7FA] border border-[#DDE3EA] rounded-xl p-2.5 text-xs text-slate-900 outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">Follow-Up Berikutnya:</label>
              <input
                type="text"
                value={nextFollowUpDate}
                onChange={(e) => setNextFollowUpDate(e.target.value)}
                placeholder="misal: 30 Sep 2026"
                className="w-full bg-[#F5F7FA] border border-[#DDE3EA] rounded-xl p-2.5 text-xs text-slate-900 outline-none"
              />
            </div>
          </div>

          {/* 6. Action & Channel */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1">Langkah Tindak Lanjut:</label>
              <input
                type="text"
                value={nextAction}
                onChange={(e) => setNextAction(e.target.value)}
                placeholder="misal: Kirimkan alternatif cicilan"
                className="w-full bg-[#F5F7FA] border border-[#DDE3EA] rounded-xl p-2.5 text-xs text-slate-900 outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">Kanal Pilihan Konsumen:</label>
              <select
                value={preferredChannel}
                onChange={(e) => setPreferredChannel(e.target.value as CommunicationChannel)}
                className="w-full bg-[#F5F7FA] border border-[#DDE3EA] rounded-xl p-2.5 text-xs text-slate-900 outline-none"
              >
                <option value="WhatsApp">WhatsApp (Resmi)</option>
                <option value="Phone">Panggilan Telepon Langsung</option>
                <option value="Dealer Interaction">Kunjungan ke Dealer</option>
                <option value="Email">Email</option>
              </select>
            </div>
          </div>

          {/* 7. Sales Notes */}
          <div>
            <label className="block font-bold text-slate-800 mb-1">Catatan Tambahan Sales:</label>
            <textarea
              rows={2}
              value={salesNotes}
              onChange={(e) => setSalesNotes(e.target.value)}
              placeholder="Catatan personal untuk koordinasi supervisor / tim..."
              className="w-full bg-[#F5F7FA] border border-[#DDE3EA] rounded-xl p-2.5 text-xs text-slate-900 outline-none"
            />
          </div>

          {/* Decision Branching Preview Banner */}
          <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200 flex items-start gap-2.5 text-[11px] text-blue-900">
            <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <strong>Otomasi Alur Perjalanan (Journey Automation):</strong> Menyimpan hasil ini akan secara otomatis memperbarui status prospek, memicu journey yang relevan (Nurture, Re-Engage, atau Post-Purchase), dan menghitung ulang rekomendasi Next Best Action.
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-end gap-2.5 border-t border-[#DDE3EA]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-sm hover:shadow flex items-center gap-1.5"
            >
              <span>Simpan &amp; Perbarui Journey</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
