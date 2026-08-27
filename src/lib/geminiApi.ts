import { TemplateType } from '../types';

export interface AiGenerationInputs {
  templateType: TemplateType;
  city: string;
  country: string;
  systemSizeKw?: number;
  sqft?: number;
  targetKeyword?: string;
}

export interface AiGenerationResult {
  success: boolean;
  data?: any;
  meta?: {
    model: string;
    tokens: number;
    durationMs: number;
  };
  error?: string;
}

export interface SectionRegenerationInputs {
  sectionKey: string;
  templateType: TemplateType;
  city: string;
  country: string;
  targetKeyword?: string;
  currencySymbol?: string;
  systemSizeKw?: number;
  sqft?: number;
  currentData?: any;
}

/**
 * Calls server-side Gemini generation endpoint
 */
export async function generateAiPageContent(inputs: AiGenerationInputs): Promise<AiGenerationResult> {
  const payload = {
    templateType: inputs.templateType,
    city: inputs.city.trim(),
    country: inputs.country.trim(),
    systemSizeKw: inputs.systemSizeKw,
    sqft: inputs.sqft,
    targetKeyword: inputs.targetKeyword,
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 65000);

    const response = await fetch('/api/gemini/generate-content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const result = await response.json();
    if (!response.ok || !result.success) {
      throw new Error(result.error || 'Generation failed — please check Gemini API key or fill manually');
    }

    return result;
  } catch (err: any) {
    if (err.name === 'AbortError') {
      return {
        success: false,
        error: 'Gemini generation timed out after 60 seconds. Please try again.',
      };
    }
    return {
      success: false,
      error: err.message || 'Generation failed — please check Gemini API key or fill manually',
    };
  }
}

/**
 * Regenerates a single specific section of the page
 */
export async function regenerateAiSection(inputs: SectionRegenerationInputs): Promise<AiGenerationResult> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 50000);

    const response = await fetch('/api/gemini/regenerate-section', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const result = await response.json();
    if (!response.ok || !result.success) {
      throw new Error(result.error || 'Section regeneration failed');
    }

    return result;
  } catch (err: any) {
    return {
      success: false,
      error: err.message || 'Section regeneration failed',
    };
  }
}
