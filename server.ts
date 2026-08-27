import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Model list prioritized as requested: 3.6-flash primary, fallback to 3.1 & modern available models
const GEMINI_MODELS_PRIORITY = [
  "gemini-3.6-flash",
  "gemini-3.1-pro-preview",
  "gemini-3.1-flash-lite",
  "gemini-3.7-flash",
  "gemini-flash-latest",
  "gemini-2.5-flash",
];

async function generateWithGemini(apiKey: string, prompt: string): Promise<{ text: string; model: string }> {
  let lastError: any = null;

  // Try standard @google/genai first
  try {
    const ai = new GoogleGenAI({ apiKey: apiKey.trim() });
    for (const mName of GEMINI_MODELS_PRIORITY) {
      try {
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error(`Timeout with model ${mName} after 60s`)), 60000)
        );

        const callPromise = ai.models.generateContent({
          model: mName,
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            temperature: 0.7,
          },
        });

        const response: any = await Promise.race([callPromise, timeoutPromise]);
        const text = response.text || (response.candidates && response.candidates[0]?.content?.parts?.[0]?.text);
        if (text && text.trim().length > 0) {
          return { text: text.trim(), model: mName };
        }
      } catch (err: any) {
        console.warn(`[@google/genai] Model ${mName} attempt failed:`, err?.message || err);
        lastError = err;
      }
    }
  } catch (sdkErr: any) {
    console.warn("Initializing @google/genai threw, falling back to @google/generative-ai:", sdkErr?.message || sdkErr);
  }

  // Fallback to @google/generative-ai
  try {
    const genAI = new GoogleGenerativeAI(apiKey.trim());
    for (const mName of GEMINI_MODELS_PRIORITY) {
      try {
        const model = genAI.getGenerativeModel({
          model: mName,
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.7,
          },
        });

        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error(`Timeout with model ${mName} after 60s`)), 60000)
        );

        const result: any = await Promise.race([
          model.generateContent(prompt),
          timeoutPromise,
        ]);

        const text = result.response.text();
        if (text && text.trim().length > 0) {
          return { text: text.trim(), model: mName };
        }
      } catch (err: any) {
        console.warn(`[@google/generative-ai] Model ${mName} attempt failed:`, err?.message || err);
        lastError = err;
      }
    }
  } catch (sdkErr2: any) {
    lastError = sdkErr2;
  }

  throw new Error(`Gemini API call failed across models: ${lastError?.message || "No response received"}`);
}

// Helper to clean & parse JSON response from Gemini
function parseGeminiJson(responseText: string): any {
  if (!responseText) throw new Error("Empty response received from Gemini API");
  
  // Strip markdown backticks
  let clean = responseText
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  try {
    return JSON.parse(clean);
  } catch (initialErr) {
    // Attempt regex extraction if there was surrounding text
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[0]);
      } catch (nestedErr) {
        throw new Error("Invalid JSON extracted from Gemini response");
      }
    }
    throw new Error("Invalid JSON from Gemini: " + (initialErr as Error).message);
  }
}

// Ensure all expected template fields exist and aliases are mapped
function normalizeSolarData(data: any, city: string, country: string, templateType: string, kwSize: number, sqftArea: number): any {
  const normalized = { ...data };

  // Pass-through & sanitize geography
  if (city) normalized.city = normalized.city || city;
  if (country) normalized.country = normalized.country || country;
  if (data.state) normalized.state = data.state;

  // Common metadata fallback
  if (!normalized.title) {
    normalized.title = normalized.metaTitle || (templateType === 'city' 
      ? `Solar Installation Cost in ${city} 2026 | Prices, Subsidies & Guide`
      : templateType === 'system_size'
      ? `${kwSize}kW Solar System Cost 2026: Global Price, Output & ROI Guide`
      : `How Much Does Solar Cost for a ${sqftArea} Sq Ft House in 2026?`);
  }
  if (!normalized.h1) normalized.h1 = normalized.metaTitle || normalized.title;
  if (!normalized.meta_title) normalized.meta_title = normalized.metaTitle || normalized.title;
  if (!normalized.meta_description) normalized.meta_description = normalized.metaDescription || "";
  if (!normalized.hero_subtitle) normalized.hero_subtitle = normalized.heroSubtitle || "";
  if (!normalized.quick_answer) normalized.quick_answer = normalized.quickAnswer || "";

  // Aliases for compatibility
  if (normalized.costBreakdownTable && !normalized.costBreakdown) {
    normalized.costBreakdown = normalized.costBreakdownTable;
  }
  if (normalized.cityComparisonData && !normalized.cityComparison) {
    normalized.cityComparison = normalized.cityComparisonData;
  }
  if (!normalized.costTrendLocalContext) {
    normalized.costTrendLocalContext = '';
  }
  if (normalized.cityWiseCostTable && !normalized.cityWiseCosts) {
    normalized.cityWiseCosts = normalized.cityWiseCostTable;
  }
  if (normalized.maintenanceCostTable && !normalized.maintenanceCosts) {
    normalized.maintenanceCosts = normalized.maintenanceCostTable;
  }
  if (normalized.seasonalIrradiance && !normalized.seasonalSolarIrradiance) {
    normalized.seasonalSolarIrradiance = normalized.seasonalIrradiance;
  }
  if (normalized.llmSummaryTable && !normalized.llmSummaryGeoTable) {
    normalized.llmSummaryGeoTable = normalized.llmSummaryTable;
  }
  if (normalized.subsidyPrograms && !normalized.subsidyContent) {
    normalized.subsidyContent = {
      headline: `Clean Energy Incentives & Subsidies in ${city || country}`,
      schemes: normalized.subsidyPrograms.map((p: any) => ({
        name: p.name || "",
        description: p.eligibility || p.authority || "",
        amount: p.maxBenefit || "",
        howToApply: p.howToApply || ""
      })),
      totalSavingsPossible: normalized.stats?.subsidyAmount ? `${normalized.currencySymbol || "$"}${Number(normalized.stats.subsidyAmount).toLocaleString()}` : undefined
    };
  }

  // System Specs mapping
  if (!normalized.systemSpecs) {
    const kw = kwSize || 5;
    const annualKwh = normalized.localCaseStudy?.annualKwhProduced || Math.round(kw * 1550);
    normalized.systemSpecs = {
      capacityKw: kw,
      panelCount: Math.ceil((kw * 1000) / 450),
      roofAreaSqFt: Math.round(kw * 65),
      annualGenerationKwh: annualKwh,
      paybackYears: normalized.stats?.paybackYears || 4.2,
      unitsPerDay: Math.round(kw * 4.3 * 10) / 10,
      unitsPerMonth: Math.round(kw * 4.3 * 30),
      co2SavedPerYear: Math.round(annualKwh * 0.72),
      treesEquivalent: Math.round(annualKwh * 0.72 / 21),
      coalAvoided: Math.round(annualKwh * 0.38)
    };
  }

  return normalized;
}

// Health check endpoint
app.get("/api/health", (_req, res) => {
  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
  const hasKey = Boolean(apiKey && apiKey !== "MY_GEMINI_API_KEY" && apiKey.trim() !== "");
  res.json({ status: "ok", geminiConfigured: hasKey });
});

// Full page AI Content Generation via Gemini API
app.post("/api/gemini/generate-content", async (req, res) => {
  const startTime = Date.now();
  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

  if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
    return res.status(400).json({
      success: false,
      error: "GEMINI_API_KEY not set in environment. Please add your Gemini API key in settings or .env file.",
    });
  }

  const {
    templateType = "city",
    city = "London",
    country = "UK",
    systemSizeKw = 5,
    sqft = 2000,
  } = req.body;

  let prompt = "";

  if (templateType === "city" || !templateType) {
    prompt = `You are a world-class solar energy market analyst and SEO content expert with access to current global solar pricing data.

Generate 100% accurate, deeply researched, city-specific solar installation cost data for: ${city}, ${country}

CRITICAL RULES & ACCURACY REQUIREMENTS:
- ACCURACY MANDATE: All costs must reflect real 2026 market rates for ${city}, ${country}. Do not use generic US averages for non-US cities.
- For Indian cities: Use PM Surya Ghar Muft Bijli Yojana subsidy amounts (up to ₹78,000 for residential). Costs must be in INR (₹).
- For US cities: Apply the 30% Federal ITC. Costs must reflect local state and utility rebates where applicable.
- For other countries: Use the actual currency, local electricity tariffs, and real subsidy/feed-in-tariff programs. If no subsidy exists, set subsidy to 0 — do NOT invent programs.
- If specific real data for a smaller city is unavailable, base figures on state/province averages and explicitly note this in the description rather than fabricating numbers.
- Return only verifiable, realistic ranges.
- Every single figure must be realistic and accurate for ${city} specifically
- Use local currency of ${country} throughout
- Monthly generation must reflect actual latitude and climate of ${city}
- Subsidy programs must be real programs that exist in ${country} right now
- City comparison must use 4 real comparable cities geographically/economically close to ${city}, not always Sydney/London/LA
- Utility companies must be the real actual companies serving ${city}
- Grid interconnection steps must match the actual regulatory process in ${country}
- Equipment recommendations must suit ${city}'s specific climate conditions
- Hidden costs must be specific to ${city}'s construction and regulatory environment
- Case study must use realistic local pricing
- FAQs must target real long-tail keywords people in ${country} actually search

Return ONLY a valid JSON object.
No markdown. No backticks. No explanation. 
No preamble. Start directly with {

Required JSON structure:
{
  "city": "${city}",
  "state": "actual state, province, or region name for ${city}",
  "country": "${country}",
  "currencySymbol": "local currency symbol",
  "metaTitle": "Solar Installation Cost in ${city} 2026 | Prices, Subsidies & Guide (max 60 chars)",
  "metaDescription": "155 chars max, includes ${city} keyword naturally, mentions cost range and key benefit",
  "heroSubtitle": "2-3 sentences. Mention actual cost range in local currency. Reference real local utility or subsidy program.",
  "quickAnswer": "2-3 sentences. Direct answer. Featured snippet optimized. Include actual cost figures in local currency.",
  "stats": {
    "avgCostMin": number (local currency, realistic for ${city}),
    "avgCostMax": number (local currency, realistic for ${city}),
    "costPerWatt": number (local currency per watt),
    "paybackYears": number (realistic for ${city} electricity rates),
    "annualSavings": number (local currency, based on real electricity tariffs),
    "subsidyAmount": number (actual government subsidy in local currency, 0 if none)
  },
  "installers": [
    {
      "name": "realistic or actual top EPC solar installer company in ${city}",
      "rating": 4.9,
      "priceRangeMin": number in local currency,
      "priceRangeMax": number in local currency,
      "experienceYears": 10
    },
    {
      "name": "second reputable solar installer in ${city}",
      "rating": 4.8,
      "priceRangeMin": number in local currency,
      "priceRangeMax": number in local currency,
      "experienceYears": 8
    }
  ],
  "costBreakdownTable": [
    {
      "item": "specific component name",
      "min": number,
      "avg": number,
      "max": number
    }
  ],
  "gridInterconnectionSteps": [
    {
      "title": "actual step name for ${country} regulatory process",
      "desc": "detailed description of this specific step in ${city}"
    }
  ],
  "seasonalIrradiance": {
    "summerPeakSunHours": number (actual for ${city} latitude),
    "winterPeakSunHours": number (actual for ${city} latitude),
    "annualIrradianceKwhM2": number (real GHI data for ${city}),
    "optimalTiltAngle": "degrees based on ${city} latitude",
    "optimalAzimuth": "direction based on ${city} hemisphere"
  },
  "recommendedEquipment": {
    "panelBrands": "brands available and suited to ${city} climate",
    "inverterBrands": "brands available in ${country} market",
    "mountingType": "type suited to typical ${city} roof construction",
    "durabilityCertification": "certifications required in ${country}"
  },
  "hiddenCostsChecklist": [
    {
      "item": "specific hidden cost for ${city}",
      "typicalCost": "cost in local currency",
      "necessity": "why this applies specifically in ${city}"
    }
  ],
  "localCaseStudy": {
    "title": "Real case study title mentioning ${city} neighborhood",
    "systemSize": "realistic system size for typical ${city} home",
    "grossCost": "cost in local currency",
    "subsidyReceived": "actual subsidy program name and amount",
    "netInvestment": "net cost after subsidy",
    "annualKwhProduced": number,
    "annualBillSavings": "savings in local currency per year",
    "realPaybackYears": number,
    "twentyFiveYearSavings": "25 year return in local currency"
  },
  "utilityCompanies": [
    "actual utility company name serving ${city}"
  ],
  "discomRegulation": "actual regulatory body and policy name in ${country}",
  "systemSizeCards": [
    {
      "kw": 1,
      "grossCost": number,
      "subsidy": number,
      "netCost": number,
      "areaNeeded": "sq ft range",
      "unitsPerMonth": number,
      "popular": false
    },
    {
      "kw": 3,
      "grossCost": number,
      "subsidy": number,
      "netCost": number,
      "areaNeeded": "sq ft range",
      "unitsPerMonth": number,
      "popular": true
    },
    {
      "kw": 5,
      "grossCost": number,
      "subsidy": number,
      "netCost": number,
      "areaNeeded": "sq ft range",
      "unitsPerMonth": number,
      "popular": false
    },
    {
      "kw": 8,
      "grossCost": number,
      "subsidy": number,
      "netCost": number,
      "areaNeeded": "sq ft range",
      "unitsPerMonth": number,
      "popular": false
    },
    {
      "kw": 10,
      "grossCost": number,
      "subsidy": number,
      "netCost": number,
      "areaNeeded": "sq ft range",
      "unitsPerMonth": number,
      "popular": false
    }
  ],
  "cityComparisonData": [
    {
      "city": "geographically or economically comparable city to ${city}",
      "country": "that city's country",
      "avgCostMin": number in that city's local currency,
      "avgCostMax": number in that city's local currency,
      "costPerWatt": number
    }
  ],
  "costTrendLocalContext": "1-2 sentences describing how solar costs have changed specifically in ${city} or ${country} over the last 3-5 years, and what is driving current pricing (e.g. local manufacturing, import duties, labor costs, recent policy changes)",
  "monthlyGenerationData": [
    {"month": "Jan", "units": number based on ${city} actual solar irradiance},
    {"month": "Feb", "units": number},
    {"month": "Mar", "units": number},
    {"month": "Apr", "units": number},
    {"month": "May", "units": number},
    {"month": "Jun", "units": number},
    {"month": "Jul", "units": number},
    {"month": "Aug", "units": number},
    {"month": "Sep", "units": number},
    {"month": "Oct", "units": number},
    {"month": "Nov", "units": number},
    {"month": "Dec", "units": number}
  ],
  "subsidyPrograms": [
    {
      "name": "real subsidy program name in ${country}",
      "authority": "actual government body",
      "maxBenefit": "amount in local currency",
      "eligibility": "actual eligibility criteria",
      "howToApply": "actual application process"
    }
  ],
  "llmSummaryTable": [
    {
      "metric": "metric name",
      "value": "value in local currency",
      "context": "context specific to ${city}"
    }
  ],
  "faqs": [
    {
      "question": "long-tail keyword question people in ${country} actually search",
      "answer": "detailed accurate answer 60-80 words"
    }
  ],
  "cityWiseCostTable": [
    {
      "city": "major global city",
      "country": "country",
      "currency": "local currency symbol",
      "costMin": number,
      "costMax": number
    }
  ],
  "environmentalImpact": {
    "co2PerYear": number,
    "treesEquivalent": number,
    "kmNotDriven": number,
    "coalAvoided": number
  },
  "maintenanceCostTable": [
    {
      "item": "maintenance item",
      "frequency": "how often",
      "avgCost": number in local currency
    }
  ]
}`;
  } else if (templateType === "system_size") {
    const kw = Number(systemSizeKw) || 5;
    prompt = `You are a world-class solar energy market analyst and SEO content expert with access to current global solar pricing data.

Generate complete solar system cost data for a ${kw}kW solar system.
Be globally accurate with realistic 2026 pricing across 10 major cities worldwide.
Return same JSON structure but replace city-specific fields with global/generic equivalents.
cityWiseCostTable must have 10 real cities with accurate local currency costs for a ${kw}kW system.

CRITICAL RULES:
- Realistic 2026 hardware and installation pricing for ${kw}kW
- Output generation must match realistic ${kw}kW daily/annual production
- cityWiseCostTable must list 10 major cities worldwide (e.g. Sydney, London, Los Angeles, Berlin, Tokyo, Delhi, Toronto, Dubai, Singapore, Johannesburg) with accurate local currencies and ranges for ${kw}kW
- FAQs must cover top long-tail queries for a ${kw}kW installation

Return ONLY a valid JSON object.
No markdown. No backticks. No explanation.
No preamble. Start directly with {

Required JSON structure:
{
  "currencySymbol": "$",
  "metaTitle": "${kw}kW Solar System Cost 2026: Prices, Output & ROI Guide",
  "metaDescription": "Complete 2026 pricing, panel specs, and generation guide for a ${kw}kW solar power system. Compare itemized costs and 25-year financial payback.",
  "heroSubtitle": "Complete 2026 pricing and technical guide for a ${kw}kW residential solar power installation. Compare itemized hardware costs, calculate annual energy generation, and review 25-year financial returns.",
  "quickAnswer": "A ${kw}kW solar power system in 2026 costs between average turnkey market benchmarks. After clean energy incentives, it delivers reliable payback and substantial utility bill offsets.",
  "stats": {
    "avgCostMin": number,
    "avgCostMax": number,
    "costPerWatt": number,
    "paybackYears": number,
    "annualSavings": number,
    "subsidyAmount": number
  },
  "costBreakdownTable": [
    { "item": "string", "min": number, "avg": number, "max": number }
  ],
  "systemSpecs": {
    "capacityKw": ${kw},
    "panelCount": number,
    "roofAreaSqFt": number,
    "annualGenerationKwh": number,
    "unitsPerDay": number,
    "unitsPerMonth": number,
    "paybackYears": number
  },
  "costBreakdown": {
    "onGrid": [ { "item": "string", "min": number, "avg": number, "max": number } ],
    "offGrid": [ { "item": "string", "min": number, "avg": number, "max": number } ],
    "hybrid": [ { "item": "string", "min": number, "avg": number, "max": number } ]
  },
  "gridInterconnectionSteps": [
    { "title": "string", "desc": "string" }
  ],
  "seasonalIrradiance": {
    "summerPeakSunHours": number,
    "winterPeakSunHours": number,
    "annualIrradianceKwhM2": number,
    "optimalTiltAngle": "string",
    "optimalAzimuth": "string"
  },
  "recommendedEquipment": {
    "panelBrands": "string",
    "inverterBrands": "string",
    "mountingType": "string",
    "durabilityCertification": "string"
  },
  "hiddenCostsChecklist": [
    { "item": "string", "typicalCost": "string", "necessity": "string" }
  ],
  "localCaseStudy": {
    "title": "Case Study: ${kw}kW Residential Rooftop Solar Array",
    "systemSize": "${kw} kW",
    "grossCost": "string",
    "subsidyReceived": "string",
    "netInvestment": "string",
    "annualKwhProduced": number,
    "annualBillSavings": "string",
    "realPaybackYears": number,
    "twentyFiveYearSavings": "string"
  },
  "utilityCompanies": ["string"],
  "discomRegulation": "string",
  "systemSizeCards": [
    { "kw": 1, "grossCost": number, "subsidy": number, "netCost": number, "areaNeeded": "string", "unitsPerMonth": number, "popular": false },
    { "kw": 3, "grossCost": number, "subsidy": number, "netCost": number, "areaNeeded": "string", "unitsPerMonth": number, "popular": true },
    { "kw": 5, "grossCost": number, "subsidy": number, "netCost": number, "areaNeeded": "string", "unitsPerMonth": number, "popular": false },
    { "kw": 8, "grossCost": number, "subsidy": number, "netCost": number, "areaNeeded": "string", "unitsPerMonth": number, "popular": false },
    { "kw": 10, "grossCost": number, "subsidy": number, "netCost": number, "areaNeeded": "string", "unitsPerMonth": number, "popular": false }
  ],
  "cityComparisonData": [
    { "city": "string", "country": "string", "avgCostMin": number, "avgCostMax": number, "costPerWatt": number }
  ],
  "cityWiseCostTable": [
    { "city": "Sydney", "country": "Australia", "currency": "A$", "costMin": number, "costMax": number },
    { "city": "London", "country": "UK", "currency": "£", "costMin": number, "costMax": number },
    { "city": "Los Angeles", "country": "USA", "currency": "$", "costMin": number, "costMax": number },
    { "city": "Berlin", "country": "Germany", "currency": "€", "costMin": number, "costMax": number },
    { "city": "Tokyo", "country": "Japan", "currency": "¥", "costMin": number, "costMax": number },
    { "city": "Delhi", "country": "India", "currency": "₹", "costMin": number, "costMax": number },
    { "city": "Toronto", "country": "Canada", "currency": "C$", "costMin": number, "costMax": number },
    { "city": "Dubai", "country": "UAE", "currency": "AED", "costMin": number, "costMax": number },
    { "city": "Singapore", "country": "Singapore", "currency": "S$", "costMin": number, "costMax": number },
    { "city": "Johannesburg", "country": "South Africa", "currency": "ZAR", "costMin": number, "costMax": number }
  ],
  "monthlyGenerationData": [
    { "month": "Jan", "units": number },
    { "month": "Feb", "units": number },
    { "month": "Mar", "units": number },
    { "month": "Apr", "units": number },
    { "month": "May", "units": number },
    { "month": "Jun", "units": number },
    { "month": "Jul", "units": number },
    { "month": "Aug", "units": number },
    { "month": "Sep", "units": number },
    { "month": "Oct", "units": number },
    { "month": "Nov", "units": number },
    { "month": "Dec", "units": number }
  ],
  "subsidyPrograms": [
    { "name": "string", "authority": "string", "maxBenefit": "string", "eligibility": "string", "howToApply": "string" }
  ],
  "llmSummaryTable": [
    { "metric": "string", "value": "string", "context": "string" }
  ],
  "environmentalImpact": {
    "co2PerYear": number,
    "treesEquivalent": number,
    "kmNotDriven": number,
    "coalAvoided": number
  },
  "maintenanceCostTable": [
    { "item": "string", "frequency": "string", "avgCost": number }
  ],
  "financingOptions": [
    { "title": "string", "headline": "string", "desc": "string" }
  ],
  "faqs": [
    { "question": "string", "answer": "string" }
  ]
}`;
  } else if (templateType === "sqft") {
    const area = Number(sqft) || 2000;
    prompt = `You are a world-class solar energy market analyst and SEO content expert with access to current global solar pricing data.

Generate complete solar cost data for a ${area} sq ft house.
Calculate the recommended system size based on typical energy consumption for that roof area.
Return billSavingsChart with 12 months of before/after bill comparison and roiTimeline with 25 years of cumulative savings data.

CRITICAL RULES:
- Calculate recommended system capacity in kW based on ${area} sq ft roof area
- Provide realistic 2026 pricing, panel counts, and energy offsets
- Return billSavingsChart with 12 months (Jan-Dec) before and after monthly electricity bills
- Return roiTimeline with cumulative savings and investment breakeven milestones up to 25 years
- FAQs must target real questions homeowners with a ${area} sq ft house ask

Return ONLY a valid JSON object.
No markdown. No backticks. No explanation.
No preamble. Start directly with {

Required JSON structure:
{
  "currencySymbol": "$",
  "metaTitle": "Solar Cost for ${area} Sq Ft House 2026 | System Size & ROI",
  "metaDescription": "How much does solar cost for a ${area} sq ft home in 2026? Recommended system size, panel count, bill savings, and payback timeline.",
  "heroSubtitle": "Complete 2026 solar cost, system capacity, and ROI breakdown for a ${area} sq ft residential home. Learn recommended system size, required panel count, and 25-year financial savings.",
  "quickAnswer": "Installing solar on a ${area} sq ft house typically costs within standard market ranges for the recommended system capacity. After tax credits and clean energy incentives, it generates substantial long-term electricity savings.",
  "stats": {
    "avgCostMin": number,
    "avgCostMax": number,
    "costPerWatt": number,
    "paybackYears": number,
    "annualSavings": number,
    "subsidyAmount": number
  },
  "recommendedSystemSize": {
    "kw": number,
    "explanation": "string"
  },
  "costBreakdownTable": [
    { "item": "string", "min": number, "avg": number, "max": number }
  ],
  "billSavingsChart": [
    { "month": "Jan", "before": number, "after": number },
    { "month": "Feb", "before": number, "after": number },
    { "month": "Mar", "before": number, "after": number },
    { "month": "Apr", "before": number, "after": number },
    { "month": "May", "before": number, "after": number },
    { "month": "Jun", "before": number, "after": number },
    { "month": "Jul", "before": number, "after": number },
    { "month": "Aug", "before": number, "after": number },
    { "month": "Sep", "before": number, "after": number },
    { "month": "Oct", "before": number, "after": number },
    { "month": "Nov", "before": number, "after": number },
    { "month": "Dec", "before": number, "after": number }
  ],
  "roiTimeline": [
    { "year": 1, "cumulativeSavings": number, "totalCost": number },
    { "year": 3, "cumulativeSavings": number, "totalCost": number },
    { "year": 5, "cumulativeSavings": number, "totalCost": number },
    { "year": 10, "cumulativeSavings": number, "totalCost": number },
    { "year": 15, "cumulativeSavings": number, "totalCost": number },
    { "year": 20, "cumulativeSavings": number, "totalCost": number },
    { "year": 25, "cumulativeSavings": number, "totalCost": number }
  ],
  "howToSteps": [
    { "step": "string", "description": "string" }
  ],
  "gridInterconnectionSteps": [
    { "title": "string", "desc": "string" }
  ],
  "seasonalIrradiance": {
    "summerPeakSunHours": number,
    "winterPeakSunHours": number,
    "annualIrradianceKwhM2": number,
    "optimalTiltAngle": "string",
    "optimalAzimuth": "string"
  },
  "recommendedEquipment": {
    "panelBrands": "string",
    "inverterBrands": "string",
    "mountingType": "string",
    "durabilityCertification": "string"
  },
  "hiddenCostsChecklist": [
    { "item": "string", "typicalCost": "string", "necessity": "string" }
  ],
  "localCaseStudy": {
    "title": "Case Study: ${area} Sq Ft Home Solar Installation",
    "systemSize": "string",
    "grossCost": "string",
    "subsidyReceived": "string",
    "netInvestment": "string",
    "annualKwhProduced": number,
    "annualBillSavings": "string",
    "realPaybackYears": number,
    "twentyFiveYearSavings": "string"
  },
  "utilityCompanies": ["string"],
  "discomRegulation": "string",
  "systemSizeCards": [
    { "kw": 1, "grossCost": number, "subsidy": number, "netCost": number, "areaNeeded": "string", "unitsPerMonth": number, "popular": false },
    { "kw": 3, "grossCost": number, "subsidy": number, "netCost": number, "areaNeeded": "string", "unitsPerMonth": number, "popular": true },
    { "kw": 5, "grossCost": number, "subsidy": number, "netCost": number, "areaNeeded": "string", "unitsPerMonth": number, "popular": false },
    { "kw": 8, "grossCost": number, "subsidy": number, "netCost": number, "areaNeeded": "string", "unitsPerMonth": number, "popular": false },
    { "kw": 10, "grossCost": number, "subsidy": number, "netCost": number, "areaNeeded": "string", "unitsPerMonth": number, "popular": false }
  ],
  "cityComparisonData": [
    { "city": "string", "country": "string", "avgCostMin": number, "avgCostMax": number, "costPerWatt": number }
  ],
  "monthlyGenerationData": [
    { "month": "Jan", "units": number },
    { "month": "Feb", "units": number },
    { "month": "Mar", "units": number },
    { "month": "Apr", "units": number },
    { "month": "May", "units": number },
    { "month": "Jun", "units": number },
    { "month": "Jul", "units": number },
    { "month": "Aug", "units": number },
    { "month": "Sep", "units": number },
    { "month": "Oct", "units": number },
    { "month": "Nov", "units": number },
    { "month": "Dec", "units": number }
  ],
  "subsidyPrograms": [
    { "name": "string", "authority": "string", "maxBenefit": "string", "eligibility": "string", "howToApply": "string" }
  ],
  "llmSummaryTable": [
    { "metric": "string", "value": "string", "context": "string" }
  ],
  "environmentalImpact": {
    "co2PerYear": number,
    "treesEquivalent": number,
    "kmNotDriven": number,
    "coalAvoided": number
  },
  "maintenanceCostTable": [
    { "item": "string", "frequency": "string", "avgCost": number }
  ],
  "faqs": [
    { "question": "string", "answer": "string" }
  ]
}`;
  }

  try {
    const { text: responseText, model: modelUsed } = await generateWithGemini(apiKey, prompt);

    const parsed = parseGeminiJson(responseText);
    const normalizedData = normalizeSolarData(
      parsed,
      city,
      country,
      templateType,
      Number(systemSizeKw) || 5,
      Number(sqft) || 2000
    );

    const durationMs = Date.now() - startTime;

    return res.json({
      success: true,
      data: normalizedData,
      meta: {
        model: modelUsed,
        tokens: Math.ceil((prompt.length + responseText.length) / 4),
        durationMs,
      },
    });
  } catch (error: any) {
    const durationMs = Date.now() - startTime;
    console.error("Gemini API generation error:", error);

    return res.status(500).json({
      success: false,
      error: error.message || "Failed to generate content via Gemini API. Please check your API key and connection.",
      durationMs,
    });
  }
});

// Single section regeneration via Gemini API
app.post("/api/gemini/regenerate-section", async (req, res) => {
  const startTime = Date.now();
  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

  if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
    return res.status(400).json({
      success: false,
      error: "GEMINI_API_KEY not set in environment.",
    });
  }

  const {
    sectionKey,
    templateType,
    city = "London",
    country = "UK",
    systemSizeKw = 5,
    sqft = 2000,
    currentData,
  } = req.body;

  try {
    const prompt = `You are a world-class solar energy market analyst and SEO content expert.
Regenerate ONLY the specific section "${sectionKey}" for a solar installation guide page.

Location: ${city}, ${country}
Template: ${templateType || "city"}
System Size: ${systemSizeKw}kW
Square Footage: ${sqft} sq ft
Current Context: ${JSON.stringify(currentData || {})}

Section to regenerate: "${sectionKey}"

Requirements:
- Return ONLY a valid JSON object containing the refreshed data for "${sectionKey}".
- Ensure numbers and text are realistic, accurate, compelling, and SEO-optimized in the local currency of ${country}.
- Return NO markdown formatting, NO backticks. Start directly with {`;

    const { text: responseText, model: modelUsed } = await generateWithGemini(apiKey, prompt);
    const parsed = parseGeminiJson(responseText);

    const durationMs = Date.now() - startTime;

    return res.json({
      success: true,
      sectionKey,
      data: parsed[sectionKey] !== undefined ? parsed[sectionKey] : parsed,
      meta: {
        model: modelUsed,
        tokens: Math.ceil((prompt.length + responseText.length) / 4),
        durationMs,
      },
    });
  } catch (error: any) {
    console.error(`Error regenerating section ${req.body?.sectionKey}:`, error);
    return res.status(500).json({
      success: false,
      sectionKey,
      error: error.message || "Failed to regenerate section via Gemini API",
    });
  }
});

// Vite middleware & Static Serving
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Solar CMS server running on http://0.0.0.0:${PORT}`);
  });
}

setupVite().catch((err) => {
  console.error("Failed to start server:", err);
});
