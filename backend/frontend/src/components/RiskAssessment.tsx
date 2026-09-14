import { useAppSelector } from '@/store/hooks';
import type { SeverityLevel } from '@/types';
import { ShieldAlert, ShieldCheck, AlertTriangle, ShieldX, Lightbulb, ListChecks } from 'lucide-react';
import { ReactNode } from 'react';

const severityConfig: Record<
  SeverityLevel,
  { bg: string; border: string; text: string; badge: string; icon: typeof ShieldAlert; label: string }
> = {
  Critical: {
    bg: 'bg-red-50',
    border: 'border-red-300',
    text: 'text-red-800',
    badge: 'bg-red-600 text-white',
    icon: ShieldX,
    label: 'Critical',
  },
  Major: {
    bg: 'bg-orange-50',
    border: 'border-orange-300',
    text: 'text-orange-800',
    badge: 'bg-orange-500 text-white',
    icon: ShieldAlert,
    label: 'Major',
  },
  Minor: {
    bg: 'bg-amber-50',
    border: 'border-amber-300',
    text: 'text-amber-800',
    badge: 'bg-amber-400 text-white',
    icon: AlertTriangle,
    label: 'Minor',
  },
  Low: {
    bg: 'bg-slate-50',
    border: 'border-slate-200',
    text: 'text-slate-600',
    badge: 'bg-slate-400 text-white',
    icon: ShieldCheck,
    label: 'Low',
  },
};

function SectionCard({
  title,
  icon: Icon,
  children,
  accent,
}: {
  title: string;
  icon: typeof Lightbulb;
  children: ReactNode;
  accent: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 overflow-hidden">
      <div className={`flex items-center gap-2 px-4 py-2.5 ${accent}`}>
        <Icon className="w-4 h-4" />
        <span className="text-xs font-bold uppercase tracking-wide">{title}</span>
      </div>
      <div className="px-4 py-3">{children}</div>
    </div>
  );
}

export default function RiskAssessment() {
  const risk = useAppSelector((s) => s.complaint.riskAssessment);
  const formPopulated = useAppSelector(
    (s) => s.complaint.form.customerName !== ''
  );

  if (!formPopulated) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 flex flex-col items-center justify-center text-center min-h-[300px]">
        <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-3">
          <ShieldCheck className="w-7 h-7 text-slate-400" />
        </div>
        <h3 className="text-sm font-semibold text-slate-600">AI Risk Assessment</h3>
        <p className="text-xs text-slate-400 mt-1 max-w-xs">
          Extract a complaint or load mock data to generate the AI risk assessment and CAPA recommendation.
        </p>
      </div>
    );
  }

  const config = severityConfig[risk.severityLevel] ?? severityConfig.Low;
  const SeverityIcon = config.icon;

  return (
    <div className="space-y-4">
      {/* Severity Card */}
      <div className={`rounded-2xl border-2 ${config.border} ${config.bg} shadow-sm overflow-hidden`}>
        <div className="px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`flex items-center justify-center w-11 h-11 rounded-xl ${config.badge} shadow-sm`}>
              <SeverityIcon className="w-6 h-6" strokeWidth={2.2} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide">
                AI Risk Assessment
              </h3>
              <p className={`text-lg font-bold ${config.text}`}>{config.label}</p>
            </div>
          </div>
          <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${config.badge} shadow-sm`}>
            Severity: {risk.severityLevel}
          </span>
        </div>

        {risk.riskSummary && (
          <div className="px-5 pb-4">
            <p className="text-sm text-slate-700 leading-relaxed">{risk.riskSummary}</p>
          </div>
        )}
      </div>

      {/* Key Findings */}
      {risk.keyFindings.length > 0 && (
        <SectionCard title="Key Findings" icon={ListChecks} accent="bg-slate-50 text-slate-700">
          <ul className="space-y-2">
            {risk.keyFindings.map((finding, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-teal-100 text-teal-700 text-[10px] font-bold flex items-center justify-center mt-0.5">
                  {idx + 1}
                </span>
                {finding}
              </li>
            ))}
          </ul>
        </SectionCard>
      )}

      {/* CAPA Recommendation */}
      {risk.capaRecommendation && (
        <SectionCard title="CAPA Recommendation" icon={Lightbulb} accent="bg-teal-50 text-teal-700">
          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
            {risk.capaRecommendation}
          </p>
        </SectionCard>
      )}
    </div>
  );
}
