import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateFormField } from '@/store/slices/complaintSlice';
import type { ComplaintFormState } from '@/types';
import { User, Building2, Pill, Hash, CalendarDays, FileText } from 'lucide-react';

const fieldConfig: {
  field: keyof ComplaintFormState;
  label: string;
  type: 'text' | 'date' | 'textarea';
  icon: typeof User;
  placeholder: string;
  colSpan: string;
}[] = [
  { field: 'customerName', label: 'Customer Name', type: 'text', icon: User, placeholder: 'e.g. St. Mary Medical Center', colSpan: 'sm:col-span-6' },
  { field: 'customerType', label: 'Customer Type', type: 'text', icon: Building2, placeholder: 'e.g. Hospital, Pharmacy, Distributor', colSpan: 'sm:col-span-6' },
  { field: 'productBrandName', label: 'Product Brand Name', type: 'text', icon: Pill, placeholder: 'e.g. NeuroCalm Plus 50mg', colSpan: 'sm:col-span-6' },
  { field: 'batchNumber', label: 'Batch Number', type: 'text', icon: Hash, placeholder: 'e.g. NC2403B-8841', colSpan: 'sm:col-span-6' },
  { field: 'mfgDate', label: 'Mfg Date', type: 'date', icon: CalendarDays, placeholder: '', colSpan: 'sm:col-span-3' },
  { field: 'expDate', label: 'Exp Date', type: 'date', icon: CalendarDays, placeholder: '', colSpan: 'sm:col-span-3' },
  { field: 'complaintDescription', label: 'Complaint Description', type: 'textarea', icon: FileText, placeholder: 'Detailed description of the complaint...', colSpan: 'sm:col-span-12' },
];

const customerTypeOptions = ['', 'Hospital', 'Pharmacy', 'Distributor', 'Clinic', 'Individual Patient', 'Retail Chain'];

export default function ComplaintForm() {
  const dispatch = useAppDispatch();
  const form = useAppSelector((s) => s.complaint.form);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
            Log Customer Complaint
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Auto-populated by AI Copilot — editable
          </p>
        </div>
        <div className="px-2.5 py-1 rounded-lg bg-slate-100 text-xs font-semibold text-slate-500">
          Form
        </div>
      </div>
      <div className="p-5">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          {fieldConfig.map(({ field, label, type, icon: Icon, placeholder, colSpan }) => {
            const value = form[field];
            const isSelect = field === 'customerType';

            return (
              <div key={field} className={colSpan}>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  {label}
                </label>
                <div className="relative">
                  <Icon className="absolute left-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                  {isSelect ? (
                    <select
                      value={value as string}
                      onChange={(e) =>
                        dispatch(updateFormField({ field, value: e.target.value as ComplaintFormState[typeof field] }))
                      }
                      className="w-full pl-9 pr-3 py-2.5 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500 transition-all appearance-none"
                    >
                      {customerTypeOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt || '— Select —'}
                        </option>
                      ))}
                    </select>
                  ) : type === 'textarea' ? (
                    <textarea
                      value={value as string}
                      onChange={(e) =>
                        dispatch(updateFormField({ field, value: e.target.value as ComplaintFormState[typeof field] }))
                      }
                      placeholder={placeholder}
                      rows={4}
                      className="w-full pl-9 pr-3 py-2.5 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500 transition-all placeholder:text-slate-400"
                    />
                  ) : (
                    <input
                      type={type}
                      value={value as string}
                      onChange={(e) =>
                        dispatch(updateFormField({ field, value: e.target.value as ComplaintFormState[typeof field] }))
                      }
                      placeholder={placeholder}
                      className="w-full pl-9 pr-3 py-2.5 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500 transition-all placeholder:text-slate-400"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
