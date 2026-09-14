export interface ComplaintFormState {
  customerName: string;
  customerType: string;
  productBrandName: string;
  batchNumber: string;
  mfgDate: string;
  expDate: string;
  complaintDescription: string;
}

export type SeverityLevel = 'Critical' | 'Major' | 'Minor' | 'Low';

export interface RiskAssessment {
  severityLevel: SeverityLevel;
  capaRecommendation: string;
  riskSummary: string;
  keyFindings: string[];
}

export type ExtractionStatus = 'idle' | 'loading' | 'success' | 'error';

export type MockStatus = 'idle' | 'loading' | 'success' | 'error';
