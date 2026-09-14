import Header from '@/components/Header';
import ComplaintInput from '@/components/ComplaintInput';
import ActionBar from '@/components/ActionBar';
import ComplaintForm from '@/components/ComplaintForm';
import RiskAssessment from '@/components/RiskAssessment';
import SeveritySelector from '@/components/SeveritySelector';

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page intro */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Complaint Intake & Analysis</h2>
          <p className="text-sm text-slate-500 mt-1">
            Paste a raw complaint, then extract and analyze it with the AI Copilot — or load mock data to preview the workflow.
          </p>
        </div>

        {/* Top section: input + action bar */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
          <div className="lg:col-span-3">
            <ComplaintInput />
          </div>
          <div className="lg:col-span-2 flex flex-col gap-4">
            <ActionBar />
            <SeveritySelector />
          </div>
        </div>

        {/* Bottom section: form + risk assessment */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <ComplaintForm />
          </div>
          <div className="lg:col-span-2">
            <RiskAssessment />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-10 pt-6 border-t border-slate-200">
          <p className="text-xs text-slate-400 text-center">
            AIVOA — AI-powered Pharmacovigilance Complaint Management. For research and demonstration purposes.
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;
