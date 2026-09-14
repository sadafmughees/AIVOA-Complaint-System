import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSeverity } from '@/store/slices/complaintSlice';
import type { SeverityLevel } from '@/types';

const levels: SeverityLevel[] = ['Critical', 'Major', 'Minor', 'Low'];

const levelColors: Record<SeverityLevel, string> = {
  Critical: 'bg-red-600',
  Major: 'bg-orange-500',
  Minor: 'bg-amber-400',
  Low: 'bg-slate-400',
};

export default function SeveritySelector() {
  const dispatch = useAppDispatch();
  const current = useAppSelector((s) => s.complaint.riskAssessment.severityLevel);
  const formPopulated = useAppSelector((s) => s.complaint.form.customerName !== '');

  if (!formPopulated) return null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
      <p className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-3">
        Override Severity Level
      </p>
      <div className="flex flex-wrap gap-2">
        {levels.map((lvl) => (
          <button
            key={lvl}
            onClick={() => dispatch(setSeverity(lvl))}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              current === lvl
                ? `${levelColors[lvl]} text-white shadow-sm`
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
            }`}
          >
            {lvl}
          </button>
        ))}
      </div>
    </div>
  );
}
