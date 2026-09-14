import type { ComplaintFormState, RiskAssessment } from '@/types';

export interface ExtractionResponse {
  form: ComplaintFormState;
  riskAssessment: RiskAssessment;
}

export const mockExtractionResult: ComplaintFormState = {
  customerName: 'St. Mary Medical Center',
  customerType: 'Hospital',
  productBrandName: 'NeuroCalm Plus 50mg',
  batchNumber: 'NC2403B-8841',
  mfgDate: '2024-03-15',
  expDate: '2026-03-14',
  complaintDescription:
    'Patient experienced severe dizziness and nausea approximately 40 minutes after administration of NeuroCalm Plus 50mg tablet from batch NC2403B-8841. Two similar reports received from the same ward within the same week. Tablets appeared discolored with slight powder degradation at edges.',
};

export const mockRiskAssessment: RiskAssessment = {
  severityLevel: 'Major',
  riskSummary:
    'Multiple adverse events from the same batch within a short timeframe indicate a potential manufacturing defect or stability issue. Patient safety impact confirmed across two reports.',
  keyFindings: [
    'Multiple adverse events linked to same batch number',
    'Tablets show physical degradation (discoloration, powder breakdown)',
    'Events clustered within a single week at one facility',
    'Onset time of 40 minutes suggests rapid-onset reaction',
  ],
  capaRecommendation:
    '1. Initiate immediate batch recall for NC2403B-8841. 2. Conduct root cause investigation into tablet stability and packaging integrity. 3. Quarantine all remaining stock from the same manufacturing run. 4. Notify regulatory authorities within 24 hours per pharmacovigilance guidelines. 5. Implement enhanced in-process stability testing for subsequent batches.',
};

export async function uploadPdfForExtraction(rawText: string): Promise<ExtractionResponse> {
  const response = await fetch('http://127.0.0.1:8000/copilot/upload-pdf', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text: rawText }),
  });

  if (!response.ok) {
    throw new Error(`Backend returned ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();
  return data as ExtractionResponse;
}
