import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setRawText } from '@/store/slices/complaintSlice';

export default function ComplaintInput() {
  const dispatch = useAppDispatch();
  const rawText = useAppSelector((s) => s.complaint.rawText);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100">
        <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
          Raw Complaint Input
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Paste the customer complaint email or text below
        </p>
      </div>
      <div className="p-5">
        <textarea
          value={rawText}
          onChange={(e) => dispatch(setRawText(e.target.value))}
          placeholder="Example: Dear Support Team, we are writing to report an issue with NeuroCalm Plus 50mg, batch NC2403B-8841. A patient at our facility experienced severe dizziness and nausea after administration..."
          className="w-full h-48 px-4 py-3 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-xl resize-y focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500 transition-all placeholder:text-slate-400"
        />
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-slate-400">{rawText.length} characters</span>
        </div>
      </div>
    </div>
  );
}
