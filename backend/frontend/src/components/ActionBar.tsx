import { Loader2, Sparkles, FileText, AlertCircle } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  setForm,
  setRiskAssessment,
  setExtractionStatus,
  setMockStatus,
  populateMockData,
  resetAll,
} from '@/store/slices/complaintSlice';
import {
  uploadPdfForExtraction,
  mockExtractionResult,
  mockRiskAssessment,
} from '@/services/api';

export default function ActionBar() {
  const dispatch = useAppDispatch();
  const rawText = useAppSelector((s) => s.complaint.rawText);
  const extractionStatus = useAppSelector((s) => s.complaint.extractionStatus);
  const mockStatus = useAppSelector((s) => s.complaint.mockStatus);
  const extractionError = useAppSelector((s) => s.complaint.extractionError);

  const isExtracting = extractionStatus === 'loading';
  const isMockLoading = mockStatus === 'loading';

  const handleExtract = async () => {
    if (!rawText.trim()) return;
    dispatch(setExtractionStatus({ status: 'loading' }));
    try {
      const result = await uploadPdfForExtraction(rawText);
      dispatch(setForm(result.form));
      dispatch(setRiskAssessment(result.riskAssessment));
      dispatch(setExtractionStatus({ status: 'success' }));
    } catch {
      dispatch(
        setExtractionStatus({
          status: 'error',
          error: 'Backend connection failed. Use the Mock button to populate with sample data.',
        })
      );
    }
  };

  const handleMock = () => {
    dispatch(setMockStatus({ status: 'loading' }));
    setTimeout(() => {
      dispatch(populateMockData());
    }, 600);
  };

  const handleReset = () => {
    dispatch(resetAll());
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <button
          onClick={handleExtract}
          disabled={isExtracting || !rawText.trim()}
          className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 text-white text-sm font-semibold shadow-md hover:from-teal-700 hover:to-cyan-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          {isExtracting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Extract & Analyze via AI Copilot
            </>
          )}
        </button>

        <button
          onClick={handleMock}
          disabled={isMockLoading}
          className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white border-2 border-slate-200 text-slate-700 text-sm font-semibold hover:border-teal-400 hover:text-teal-700 hover:bg-teal-50/50 disabled:opacity-40 transition-all"
        >
          {isMockLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Loading Mock...
            </>
          ) : (
            <>
              <FileText className="w-4 h-4" />
              Mock Backend Data
            </>
          )}
        </button>

        <button
          onClick={handleReset}
          className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-500 text-sm font-medium hover:text-slate-700 hover:bg-slate-50 transition-all"
        >
          Reset
        </button>
      </div>

      {extractionStatus === 'error' && (
        <div className="mt-3 flex items-start gap-2 px-4 py-3 rounded-xl bg-amber-50 border border-amber-200">
          <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800">{extractionError}</p>
        </div>
      )}

      {mockStatus === 'success' && (
        <div className="mt-3 flex items-start gap-2 px-4 py-3 rounded-xl bg-teal-50 border border-teal-200">
          <Sparkles className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-teal-800">
            Form populated with mock complaint data. AI Risk Assessment generated.
          </p>
        </div>
      )}

      {mockStatus === 'success' && (
        <div className="mt-2 text-xs text-slate-400 italic">
          Mock data: {mockExtractionResult.customerName} — {mockExtractionResult.productBrandName}
        </div>
      )}
    </div>
  );
}
