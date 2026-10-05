import React, { useState, useEffect } from 'react';
import * as yaml from 'js-yaml';
import { useGarden } from '../context/GardenContext';
import {
  FileCode,
  Download,
  Upload,
  Copy,
  Check,
  X,
  AlertCircle,
  Save,
  RefreshCw,
} from 'lucide-react';

export const YamlManagerModal: React.FC = () => {
  const {
    isYamlModalOpen,
    setIsYamlModalOpen,
    rawYaml,
    saveYamlContent,
    downloadYamlFile,
    language,
    data,
  } = useGarden();

  const [editorText, setEditorText] = useState('');
  const [copied, setCopied] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isYamlModalOpen) {
      setEditorText(rawYaml || yaml.dump(data));
      setStatusMessage(null);
    }
  }, [isYamlModalOpen, rawYaml, data]);

  if (!isYamlModalOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(editorText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setStatusMessage(null);
    const result = await saveYamlContent(editorText);
    setIsSaving(false);

    if (result.success) {
      setStatusMessage({
        type: 'success',
        text: language === 'vi'
          ? 'Đã lưu và cập nhật tệp tin YAML thành công!'
          : 'YAML file saved and synchronized successfully!',
      });
    } else {
      setStatusMessage({
        type: 'error',
        text: result.error || 'Lỗi cú pháp YAML',
      });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setEditorText(content);
      setStatusMessage({
        type: 'success',
        text: language === 'vi'
          ? `Đã tải file "${file.name}" vào trình soạn thảo. Bấm "Lưu thay đổi" để áp dụng.`
          : `Loaded "${file.name}". Click "Save Changes" to apply.`,
      });
    };
    reader.readAsText(file);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="YAML Content Manager"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 dark:bg-black/80 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div
        className="relative w-full max-w-4xl bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 flex flex-col max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-serif text-stone-900 dark:text-stone-100">
                {language === 'vi' ? 'Quản lý Dữ liệu YAML từ Backend' : 'Backend YAML Data Manager'}
              </h3>
              <p className="text-xs text-stone-500 font-mono">
                /data/garden_content.yaml · /api/content.yaml
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={downloadYamlFile}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
              title="Tải tệp .yaml về máy tính"
            >
              <Download className="w-3.5 h-3.5 text-emerald-600" />
              <span>{language === 'vi' ? 'Tải .yaml' : 'Download'}</span>
            </button>

            <button
              onClick={() => setIsYamlModalOpen(false)}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Status Message Alert */}
        {statusMessage && (
          <div
            className={`px-6 py-2.5 text-xs flex items-center gap-2 ${
              statusMessage.type === 'success'
                ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-b border-emerald-500/20'
                : 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-b border-rose-500/20'
            }`}
          >
            {statusMessage.type === 'success' ? (
              <Check className="w-4 h-4 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0" />
            )}
            <span className="font-mono">{statusMessage.text}</span>
          </div>
        )}

        {/* Editor Area */}
        <div className="flex-1 p-4 overflow-hidden flex flex-col bg-stone-950 text-stone-100">
          <div className="flex items-center justify-between pb-2 text-xs font-mono text-stone-400 border-b border-stone-800 mb-2">
            <span>garden_content.yaml (UTF-8)</span>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1 cursor-pointer text-stone-400 hover:text-stone-200">
                <Upload className="w-3.5 h-3.5" />
                <span>{language === 'vi' ? 'Nhập file .yaml' : 'Upload file'}</span>
                <input
                  type="file"
                  accept=".yaml,.yml"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </label>
              <span>·</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-stone-400 hover:text-stone-200"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Đã chép' : 'Sao chép'}</span>
              </button>
            </div>
          </div>

          <textarea
            value={editorText}
            onChange={(e) => setEditorText(e.target.value)}
            spellCheck={false}
            className="flex-1 w-full p-2 bg-transparent text-stone-200 font-mono text-xs leading-relaxed focus:outline-hidden resize-none scrollbar-thin"
          />
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-stone-50 dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800">
          <p className="text-xs text-stone-500 hidden sm:block">
            {language === 'vi'
              ? 'Dữ liệu được nạp trực tiếp qua API backend và phản chiếu tức thì vào giao diện.'
              : 'Data loads directly via backend API and immediately reflects on the garden.'}
          </p>

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={() => setIsYamlModalOpen(false)}
              className="px-4 py-2 text-xs font-medium text-stone-600 dark:text-stone-400 hover:bg-stone-200/50 dark:hover:bg-stone-800 rounded-lg transition-colors"
            >
              {language === 'vi' ? 'Đóng' : 'Close'}
            </button>

            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors disabled:opacity-50"
            >
              {isSaving ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Save className="w-3.5 h-3.5" />
              )}
              <span>{language === 'vi' ? 'Lưu & Đồng bộ lên Backend' : 'Save & Sync Backend'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
