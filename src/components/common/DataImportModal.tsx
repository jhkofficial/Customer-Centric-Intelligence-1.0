import React, { useState, useRef } from 'react';
import {
  Upload,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  X,
  Download,
  FileText,
  Layers,
  ArrowRight,
  Info
} from 'lucide-react';
import { parseSpreadsheetFile, exportToExcel, exportToCsv, TEMPLATES } from '../../utils/exportImportUtils';

interface DataImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  templateType: 'customer' | 'poi' | 'pasar' | 'demografi' | 'jaringan' | 'campaign';
  onDataImported: (rows: any[], mode: 'append' | 'replace') => void;
  onShowToast: (msg: string) => void;
}

export const DataImportModal: React.FC<DataImportModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  templateType,
  onDataImported,
  onShowToast
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [parsedRows, setParsedRows] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [importMode, setImportMode] = useState<'append' | 'replace'>('append');
  const [isDragOver, setIsDragOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = async (selectedFile: File) => {
    setError(null);
    setIsLoading(true);
    setFile(selectedFile);

    try {
      const rows = await parseSpreadsheetFile(selectedFile);
      if (!rows || rows.length === 0) {
        throw new Error('File tidak berisi data atau baris kosong.');
      }
      setParsedRows(rows);
      const cols = Object.keys(rows[0] || {});
      setColumns(cols);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Gagal memproses file. Pastikan format file adalah CSV atau Excel (.xlsx/.xls) yang valid.');
      setParsedRows([]);
      setColumns([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleDownloadTemplate = (format: 'xlsx' | 'csv') => {
    const templateData = TEMPLATES[templateType] || [];
    const filename = `Template_Impor_${templateType.toUpperCase()}`;
    if (format === 'xlsx') {
      exportToExcel(templateData, filename, templateType.toUpperCase());
    } else {
      exportToCsv(templateData, filename);
    }
    onShowToast(`Template ${templateType.toUpperCase()} (.${format}) berhasil diunduh.`);
  };

  const handleExecuteImport = () => {
    if (parsedRows.length === 0) {
      setError('Pilih file dengan data yang valid terlebih dahulu.');
      return;
    }
    onDataImported(parsedRows, importMode);
    onClose();
    // Reset state
    setFile(null);
    setParsedRows([]);
    setColumns([]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white border border-[#DDE3EA] rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#DDE3EA] flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#17212B]">{title}</h2>
              <p className="text-[11px] text-[#607080]">
                {subtitle || 'Unggah file berformat CSV atau Excel (.xlsx, .xls) untuk memperbarui data'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1 text-xs">
          {/* Template Download Banner */}
          <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-blue-600 shrink-0" />
              <div className="text-[11px] text-blue-900">
                <strong>Belum punya format data?</strong> Unduh template resmi agar penamaan kolom sesuai.
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => handleDownloadTemplate('xlsx')}
                className="px-2.5 py-1 bg-white hover:bg-slate-50 text-blue-700 font-semibold rounded-md border border-blue-200 text-[11px] flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                <span>Format Excel (.xlsx)</span>
              </button>
              <button
                type="button"
                onClick={() => handleDownloadTemplate('csv')}
                className="px-2.5 py-1 bg-white hover:bg-slate-50 text-blue-700 font-semibold rounded-md border border-blue-200 text-[11px] flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
              >
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span>Format CSV</span>
              </button>
            </div>
          </div>

          {/* Upload Drop Zone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
              isDragOver
                ? 'border-blue-500 bg-blue-50/60 ring-2 ring-blue-200'
                : file
                ? 'border-emerald-400 bg-emerald-50/30'
                : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.xlsx,.xls,text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileChange(e.target.files[0]);
                }
              }}
            />

            <div className="w-12 h-12 mx-auto mb-2 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500">
              {file ? (
                <FileSpreadsheet className="w-6 h-6 text-emerald-600 animate-in zoom-in-75 duration-150" />
              ) : (
                <Upload className="w-6 h-6 text-blue-600" />
              )}
            </div>

            {file ? (
              <div>
                <div className="font-bold text-slate-800 text-xs flex items-center justify-center gap-1.5">
                  <span>{file.name}</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  Ukuran: {(file.size / 1024).toFixed(1)} KB · Klik untuk mengganti file
                </div>
              </div>
            ) : (
              <div>
                <div className="font-bold text-slate-800 text-xs">
                  Tarik &amp; lepas file Excel / CSV ke sini, atau <span className="text-blue-600 underline">pilih dari perangkat</span>
                </div>
                <div className="text-[10.5px] text-slate-400 mt-1">
                  Mendukung .xlsx, .xls, dan .csv (Ukuran maksimal 15 MB)
                </div>
              </div>
            )}
          </div>

          {/* Error display */}
          {error && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-[11px] flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Data Preview Table */}
          {parsedRows.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[11px] text-slate-800 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-blue-600" />
                  Pratinjau Data ({parsedRows.length} baris terdeteksi)
                </span>
                <span className="text-[10px] text-slate-500">Menampilkan hingga 5 baris pertama</span>
              </div>

              <div className="border border-slate-200 rounded-lg overflow-x-auto max-h-48 scrollbar-thin">
                <table className="w-full text-[10.5px] text-left">
                  <thead className="bg-slate-100 text-slate-700 font-semibold sticky top-0">
                    <tr>
                      <th className="p-2 border-b border-slate-200">#</th>
                      {columns.slice(0, 7).map((col) => (
                        <th key={col} className="p-2 border-b border-slate-200 whitespace-nowrap">
                          {col}
                        </th>
                      ))}
                      {columns.length > 7 && (
                        <th className="p-2 border-b border-slate-200 text-slate-400">
                          +{columns.length - 7} kolom lainnya
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {parsedRows.slice(0, 5).map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-50">
                        <td className="p-2 text-slate-400 font-mono">{rIdx + 1}</td>
                        {columns.slice(0, 7).map((col) => (
                          <td key={col} className="p-2 max-w-[150px] truncate text-slate-700">
                            {String(row[col] ?? '')}
                          </td>
                        ))}
                        {columns.length > 7 && (
                          <td className="p-2 text-slate-400 text-[10px]">...</td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mode Selection: Append vs Replace */}
              <div className="pt-2 border-t border-slate-200">
                <label className="font-bold text-slate-800 text-[11px] block mb-1.5">
                  Metode Integrasi Data:
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <label
                    className={`p-2.5 rounded-lg border flex items-center gap-2 cursor-pointer transition-colors ${
                      importMode === 'append'
                        ? 'border-blue-500 bg-blue-50/50 text-blue-900 font-semibold'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="importMode"
                      checked={importMode === 'append'}
                      onChange={() => setImportMode('append')}
                      className="text-blue-600"
                    />
                    <div>
                      <div className="text-[11px] font-bold">Tambahkan Data (Append)</div>
                      <div className="text-[10px] text-slate-500 font-normal">
                        Gabungkan {parsedRows.length} baris baru ke data saat ini
                      </div>
                    </div>
                  </label>

                  <label
                    className={`p-2.5 rounded-lg border flex items-center gap-2 cursor-pointer transition-colors ${
                      importMode === 'replace'
                        ? 'border-rose-400 bg-rose-50/50 text-rose-900 font-semibold'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="importMode"
                      checked={importMode === 'replace'}
                      onChange={() => setImportMode('replace')}
                      className="text-rose-600"
                    />
                    <div>
                      <div className="text-[11px] font-bold">Gantikan Seluruh Data (Replace)</div>
                      <div className="text-[10px] text-slate-500 font-normal">
                        Ganti dataset eksisting dengan data dari file
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-[#DDE3EA] bg-slate-50 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 text-xs text-slate-600 hover:text-slate-800 hover:bg-slate-200 rounded-lg font-medium transition-colors"
          >
            Batal
          </button>

          <button
            type="button"
            disabled={parsedRows.length === 0 || isLoading}
            onClick={handleExecuteImport}
            className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors shadow-2xs ${
              parsedRows.length > 0 && !isLoading
                ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
                : 'bg-slate-300 text-slate-500 cursor-not-allowed'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Impor {parsedRows.length > 0 ? `${parsedRows.length} Baris Data` : 'Data'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
