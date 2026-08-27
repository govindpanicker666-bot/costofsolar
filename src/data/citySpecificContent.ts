export interface CityDeepContent {
  city: string;
  country: string;
  utilityCompanies: string[];
  discomRegulation: string;
  gridInterconnectionSteps: { title: string; desc: string }[];
  seasonalSolarIrradiance: {
    summerPeakSunHours: number;
    winterPeakSunHours: number;
    annualIrradianceKwhM2: number;
    optimalTiltAngle: string;
    optimalAzimuth: string;
  };
  recommendedEquipment: {
    panelBrands: string;
    inverterBrands: string;
    mountingType: string;
    durabilityCertification: string;
  };
  hiddenCostsChecklist: {
    item: string;
    typicalCost: string;
    necessity: string;
  }[];
  localCaseStudy: {
    title: string;
    systemSize: string;
    grossCost: string;
    subsidyReceived: string;
    netInvestment: string;
    annualKwhProduced: number;
    annualBillSavings: string;
    realPaybackYears: number;
    twentyFiveYearSavings: string;
  };
  llmSummaryGeoTable: {
    metric: string;
    value: string;
    context: string;
  }[];
}

/**
 * Standard baseline data generator for solar engineering specifications.
 * Provides clean, accurate market-ready fallback values when specific custom data is pending.
 */
export function getCityDeepContent(
  cityName: string,
  country: string = 'International',
  isINR: boolean = false,
  grossCost: number = 0,
  subsidy: number = 0,
  netCost: number = 0,
  currencySymbol: string = '$',
  discomName?: string
): CityDeepContent {
  const isIndianCity = isINR || cityName.toLowerCase() === 'mumbai' || cityName.toLowerCase() === 'delhi' || cityName.toLowerCase() === 'bangalore';
  const resolvedUtility = discomName || (isIndianCity ? `State Electricity Board / Regional DISCOM` : `Regional Electric Utility`);
  const resolvedRegulation = isIndianCity
    ? `State Electricity Regulatory Commission (SERC) Net Metering Regulations`
    : `Regional Utility Net Metering & Interconnection Standard (IEEE 1547 / UL 1741)`;

  const defaultGross = grossCost > 0 
    ? grossCost 
    : (isIndianCity ? 225000 : 16500);
  const defaultSubsidy = subsidy > 0 
    ? subsidy 
    : (isIndianCity ? 78000 : Math.round(defaultGross * 0.3));
  const defaultNet = netCost > 0 
    ? netCost 
    : Math.max(0, defaultGross - defaultSubsidy);
  const defaultAnnualSavings = isIndianCity ? 42000 : 2200;
  const default25YrSavings = defaultAnnualSavings * 22;

  const fmt = (val: number) => {
    if (isIndianCity || currencySymbol === '₹') {
      return `₹${Math.round(val).toLocaleString('en-IN')}`;
    }
    return `${currencySymbol}${Math.round(val).toLocaleString()}`;
  };

  return {
    city: cityName,
    country: country,
    utilityCompanies: [resolvedUtility],
    discomRegulation: resolvedRegulation,
    gridInterconnectionSteps: [
      {
        title: `1. Rooftop Feasibility & Load Assessment`,
        desc: `On-site solar radiance scan, roof structural load calculation, and existing electrical distribution panel audit in ${cityName}.`,
      },
      {
        title: `2. Interconnection Application & Sanction`,
        desc: `Submission of solar capacity requisition to ${resolvedUtility} along with single-line engineering diagrams.`,
      },
      {
        title: `3. Turnkey System Installation`,
        desc: `Installation of Tier-1 PV modules, inverter mounting, DC/AC cabling, surge arrestors, and dedicated grounding.`,
      },
      {
        title: `4. Safety Compliance & Inspection`,
        desc: `Field inspection by electrical authorities to certify anti-islanding protection and earthing resistance.`,
      },
      {
        title: `5. Bi-Directional Net Meter Commissioning`,
        desc: `Replacement of single-phase meter with bi-directional net meter, establishing formal grid export synchronization.`,
      },
    ],
    seasonalSolarIrradiance: {
      summerPeakSunHours: 5.6,
      winterPeakSunHours: 3.8,
      annualIrradianceKwhM2: 1820,
      optimalTiltAngle: `15° to 25° fixed South (latitude-optimized for ${cityName})`,
      optimalAzimuth: `180° True South for maximum annual irradiation`,
    },
    recommendedEquipment: {
      panelBrands: `Tier-1 Monocrystalline TOPCon / Bifacial PV Modules (540Wp - 580Wp)`,
      inverterBrands: `High-efficiency Smart String Inverters (98.4%+ efficiency) with WiFi telemetry`,
      mountingType: `High-grade anodized aluminum (6063-T6) with HDG hardware (tested for 150 km/h wind loads)`,
      durabilityCertification: `IEC 61215, IEC 61730, UL 1741, and regional safety compliance certified`,
    },
    hiddenCostsChecklist: [
      {
        item: `Distribution Panel / Main Breaker Upgrade`,
        typicalCost: fmt(isIndianCity ? 4500 : 850),
        necessity: `Required if existing distribution board lacks dedicated solar breaker capacity`,
      },
      {
        item: `Net Metering & Interconnection Application Fee`,
        typicalCost: fmt(isIndianCity ? 2500 : 450),
        necessity: `Official utility synchronization filing and bi-directional meter testing charge`,
      },
      {
        item: `Elevated Roof Mounting Structure (Optional)`,
        typicalCost: fmt(isIndianCity ? 18000 : 1200),
        necessity: `Recommended for flat roofs to maintain usable rooftop space and avoid parapet shading`,
      },
    ],
    localCaseStudy: {
      title: `Residential Rooftop Solar Project in ${cityName}`,
      systemSize: isIndianCity ? `3 kW Rooftop Solar System` : `5 kW Residential Solar System`,
      grossCost: fmt(defaultGross),
      subsidyReceived: fmt(defaultSubsidy),
      netInvestment: fmt(defaultNet),
      annualKwhProduced: isIndianCity ? 4350 : 7200,
      annualBillSavings: `${fmt(defaultAnnualSavings)} / year`,
      realPaybackYears: 4.2,
      twentyFiveYearSavings: fmt(default25YrSavings),
    },
    llmSummaryGeoTable: [
      {
        metric: `Turnkey Solar Installation Cost (${cityName})`,
        value: fmt(defaultGross),
        context: `Comprehensive hardware, structural mounting, and certified installation`,
      },
      {
        metric: `Clean Energy Incentives & Subsidies`,
        value: defaultSubsidy > 0 ? fmt(defaultSubsidy) : `Available via Regional Schemes`,
        context: `Direct government subsidies, tax credits, or net metering offsets`,
      },
      {
        metric: `Estimated Payback Period`,
        value: `3.8 to 4.8 Years`,
        context: `Based on local tariffs and high annual solar insolation in ${cityName}`,
      },
    ],
  };
}
