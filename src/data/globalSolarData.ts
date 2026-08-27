import { PageRecord, FaqRecord, InstallerRecord } from '../types';
import { CITY_IN_DEPTH_FAQS, SYSTEM_SIZE_IN_DEPTH_FAQS, SQFT_IN_DEPTH_FAQS } from './detailedFaqsData';

export interface GlobalCityData {
  city: string;
  country: string;
  continent: string;
  currency: string;
  currencySymbol: string;
  avgCostMinUSD: number;
  avgCostMaxUSD: number;
  costPerWattUSD: number;
  localCostRange: string;
  paybackYears: number;
  annualSavingsUSD: number;
  sunshineHoursPerYear: number;
  annualYieldKwhPerKw: number;
  slug: string;
  subsidyName: string;
  subsidySummary: string;
  subsidyPercentage: number;
  subsidyDetails: {
    program: string;
    authority: string;
    incentiveType: string;
    maxBenefit: string;
    eligibility: string;
  };
  breakdown: {
    panels: { name: string; cost: number; share: number };
    inverter: { name: string; cost: number; share: number };
    racking: { name: string; cost: number; share: number };
    electrical: { name: string; cost: number; share: number };
    permitsLabor: { name: string; cost: number; share: number };
  };
  peerCities: {
    city: string;
    country: string;
    costPerWattUSD: number;
    color: string;
    isCurrent?: boolean;
  }[];
}

export const GLOBAL_CITIES: GlobalCityData[] = [
  {
    city: 'Los Angeles',
    country: 'United States',
    continent: 'North America',
    currency: 'USD',
    currencySymbol: '$',
    avgCostMinUSD: 14500,
    avgCostMaxUSD: 19800,
    costPerWattUSD: 2.85,
    localCostRange: '$14,500 - $19,800',
    paybackYears: 5.2,
    annualSavingsUSD: 2350,
    sunshineHoursPerYear: 3200,
    annualYieldKwhPerKw: 1650,
    slug: 'solar-installation-cost-in-los-angeles',
    subsidyName: 'Federal ITC 30% Tax Credit & NEM 3.0',
    subsidySummary: '30% uncapped residential clean energy tax credit under the US Inflation Reduction Act, plus LADWP Net Energy Metering.',
    subsidyPercentage: 30,
    subsidyDetails: {
      program: 'Federal Residential Clean Energy Credit (Section 25D)',
      authority: 'IRS & California Public Utilities Commission (CPUC)',
      incentiveType: '30% Dollar-for-dollar Federal Tax Credit',
      maxBenefit: '$5,000 - $8,000+ Average Reduction',
      eligibility: 'All homeowner-owned rooftop installations with tax liability',
    },
    breakdown: {
      panels: { name: 'Tier-1 Mono PERC / N-Type 400W+ Modules', cost: 6800, share: 40 },
      inverter: { name: 'Enphase IQ8+ Microinverters or SolarEdge HD-Wave', cost: 3400, share: 20 },
      racking: { name: 'IronRidge / Unirac Wind-Rated Roof Mounting', cost: 1870, share: 11 },
      electrical: { name: 'AC/DC Disconnects, Conduit & Main Panel Upgrade', cost: 2210, share: 13 },
      permitsLabor: { name: 'City Permitting, Interconnection & Licensed Labor', cost: 2720, share: 16 },
    },
    peerCities: [
      { city: 'Los Angeles', country: 'USA', costPerWattUSD: 2.85, color: '#2563eb', isCurrent: true },
      { city: 'San Diego', country: 'USA', costPerWattUSD: 2.95, color: '#94a3b8' },
      { city: 'Phoenix', country: 'USA', costPerWattUSD: 2.65, color: '#94a3b8' },
      { city: 'San Francisco', country: 'USA', costPerWattUSD: 3.10, color: '#94a3b8' },
    ],
  },
  {
    city: 'London',
    country: 'United Kingdom',
    continent: 'Europe',
    currency: 'GBP',
    currencySymbol: '£',
    avgCostMinUSD: 7200,
    avgCostMaxUSD: 9800,
    costPerWattUSD: 1.65,
    localCostRange: '£5,800 - £7,900',
    paybackYears: 6.4,
    annualSavingsUSD: 1250,
    sunshineHoursPerYear: 1650,
    annualYieldKwhPerKw: 1050,
    slug: 'solar-installation-cost-in-london',
    subsidyName: '0% VAT Rate & Smart Export Guarantee (SEG)',
    subsidySummary: '0% Value Added Tax on domestic solar & batteries until 2027, plus guaranteed SEG export payments for surplus clean energy.',
    subsidyPercentage: 20,
    subsidyDetails: {
      program: 'UK Clean Energy 0% VAT & Smart Export Guarantee (SEG)',
      authority: 'Ofgem & Department for Energy Security and Net Zero',
      incentiveType: '0% VAT Exemption + ~15p/kWh Export Tariff',
      maxBenefit: '£1,200+ Immediate VAT Savings',
      eligibility: 'All MCS-certified residential installations across England & Wales',
    },
    breakdown: {
      panels: { name: 'JA Solar / Trina 430W Black Frame Panels', cost: 3200, share: 38 },
      inverter: { name: 'GivEnergy / Solis Hybrid Inverter', cost: 1850, share: 22 },
      racking: { name: 'K2 Systems / Renusol Tile Hook Mounting', cost: 950, share: 11 },
      electrical: { name: 'Solar AC Isolators, Surge Protection & DC Cabling', cost: 1000, share: 12 },
      permitsLabor: { name: 'MCS Registration, DNO G98/G99 Approval & Labor', cost: 1400, share: 17 },
    },
    peerCities: [
      { city: 'London', country: 'UK', costPerWattUSD: 1.65, color: '#2563eb', isCurrent: true },
      { city: 'Manchester', country: 'UK', costPerWattUSD: 1.58, color: '#94a3b8' },
      { city: 'Birmingham', country: 'UK', costPerWattUSD: 1.60, color: '#94a3b8' },
      { city: 'Bristol', country: 'UK', costPerWattUSD: 1.62, color: '#94a3b8' },
    ],
  },
  {
    city: 'Sydney',
    country: 'Australia',
    continent: 'Oceania',
    currency: 'AUD',
    currencySymbol: 'A$',
    avgCostMinUSD: 5200,
    avgCostMaxUSD: 7500,
    costPerWattUSD: 0.98,
    localCostRange: 'A$5,400 - A$7,800',
    paybackYears: 3.6,
    annualSavingsUSD: 1850,
    sunshineHoursPerYear: 2650,
    annualYieldKwhPerKw: 1550,
    slug: 'solar-installation-cost-in-sydney',
    subsidyName: 'Federal STC Solar Rebate & NSW Peak Demand Reduction',
    subsidySummary: 'Small-scale Technology Certificates (STCs) reduce upfront solar invoice by ~A$2,200 to A$3,500 automatically at point of sale.',
    subsidyPercentage: 35,
    subsidyDetails: {
      program: 'Small-scale Renewable Energy Scheme (SRES STCs)',
      authority: 'Clean Energy Regulator (CER) & NSW Climate Change Fund',
      incentiveType: 'Direct Upfront Point-of-Sale Rebate Discount',
      maxBenefit: 'A$2,400 - A$3,600 Instant Discount',
      eligibility: 'CEC-approved solar panels and inverters installed by CEC accredited designer',
    },
    breakdown: {
      panels: { name: 'Tier-1 LONGi / SunPower Maxeon All-Black', cost: 2300, share: 36 },
      inverter: { name: 'Fronius Primo / Sungrow 5kW Inverter', cost: 1500, share: 24 },
      racking: { name: 'Clenergy / Radiant Tin/Tile Mounting', cost: 700, share: 11 },
      electrical: { name: 'DC Isolators, Switchboard Protection & Metering', cost: 800, share: 13 },
      permitsLabor: { name: 'CEC Accredited Electrician Installation & Ausgrid Grid Connect', cost: 1000, share: 16 },
    },
    peerCities: [
      { city: 'Sydney', country: 'Australia', costPerWattUSD: 0.98, color: '#2563eb', isCurrent: true },
      { city: 'Melbourne', country: 'Australia', costPerWattUSD: 1.05, color: '#94a3b8' },
      { city: 'Brisbane', country: 'Australia', costPerWattUSD: 0.92, color: '#94a3b8' },
      { city: 'Perth', country: 'Australia', costPerWattUSD: 0.88, color: '#94a3b8' },
    ],
  },
  {
    city: 'Berlin',
    country: 'Germany',
    continent: 'Europe',
    currency: 'EUR',
    currencySymbol: '€',
    avgCostMinUSD: 7800,
    avgCostMaxUSD: 10500,
    costPerWattUSD: 1.48,
    localCostRange: '€7,200 - €9,800',
    paybackYears: 6.8,
    annualSavingsUSD: 1450,
    sunshineHoursPerYear: 1750,
    annualYieldKwhPerKw: 1080,
    slug: 'solar-installation-cost-in-berlin',
    subsidyName: '0% Mehrwertsteuer (0% VAT) & EEG Feed-In Tariff',
    subsidySummary: '0% VAT on photovoltaic purchases, KfW 270 low-interest financing, and guaranteed 20-year EEG feed-in tariffs for grid export.',
    subsidyPercentage: 19,
    subsidyDetails: {
      program: 'German Renewable Energy Act (EEG 2024/2026) & SolarPlus Berlin',
      authority: 'Bundesnetzagentur (Federal Network Agency) & IBB',
      incentiveType: '0% VAT Exemption + 8.11 ct/kWh Feed-In Guarantee',
      maxBenefit: '€1,500+ VAT exemption + up to €15,300 battery bonus in Berlin',
      eligibility: 'Residential systems under 30kWp on single & multi-family dwellings',
    },
    breakdown: {
      panels: { name: 'Meyer Burger / Viessmann 420W Glass-Glass Modules', cost: 3600, share: 39 },
      inverter: { name: 'SMA Sunny Boy / Kostal Plenticore Plus', cost: 2000, share: 22 },
      racking: { name: 'Schletter Roof Fastening Systems', cost: 1000, share: 11 },
      electrical: { name: 'Zählerschrank (Meter Cabinet), Surge Protection & Smart Meter', cost: 1100, share: 12 },
      permitsLabor: { name: 'Meisterbetrieb Installation, Grid Registration & TÜV Certification', cost: 1500, share: 16 },
    },
    peerCities: [
      { city: 'Berlin', country: 'Germany', costPerWattUSD: 1.48, color: '#2563eb', isCurrent: true },
      { city: 'Munich', country: 'Germany', costPerWattUSD: 1.55, color: '#94a3b8' },
      { city: 'Hamburg', country: 'Germany', costPerWattUSD: 1.50, color: '#94a3b8' },
      { city: 'Frankfurt', country: 'Germany', costPerWattUSD: 1.52, color: '#94a3b8' },
    ],
  },
  {
    city: 'Dubai',
    country: 'United Arab Emirates',
    continent: 'Middle East',
    currency: 'AED',
    currencySymbol: 'AED ',
    avgCostMinUSD: 5900,
    avgCostMaxUSD: 8200,
    costPerWattUSD: 1.12,
    localCostRange: 'AED 21,500 - AED 30,000',
    paybackYears: 4.1,
    annualSavingsUSD: 1780,
    sunshineHoursPerYear: 3500,
    annualYieldKwhPerKw: 1780,
    slug: 'solar-installation-cost-in-dubai',
    subsidyName: 'DEWA Shams Dubai Net Metering Initiative',
    subsidySummary: 'Connect solar directly to DEWA electrical network with 1:1 bill credit rollover for exported kilowatt-hours.',
    subsidyPercentage: 25,
    subsidyDetails: {
      program: 'DEWA Shams Dubai Smart Solar Initiative',
      authority: 'Dubai Electricity and Water Authority (DEWA)',
      incentiveType: '1:1 Net Metering Offset & Zero Grid Connection Fee',
      maxBenefit: 'Up to 90% Annual Utility Bill Reduction',
      eligibility: 'Residential villas and commercial roofs certified by DEWA solar contractors',
    },
    breakdown: {
      panels: { name: 'Canadian Solar / JinkoSolar 550W High-Heat Resistant', cost: 2600, share: 37 },
      inverter: { name: 'ABB / Huawei SUN2000 IP65 Desert Rated', cost: 1550, share: 22 },
      racking: { name: 'Anodized Heat-Dissipating Aluminum Roof Mounts', cost: 800, share: 11 },
      electrical: { name: 'UV-stabilized cabling, DC combiner & surge protectors', cost: 900, share: 13 },
      permitsLabor: { name: 'DEWA NOC, Inspection & Smart Bi-directional Metering', cost: 1200, share: 17 },
    },
    peerCities: [
      { city: 'Dubai', country: 'UAE', costPerWattUSD: 1.12, color: '#2563eb', isCurrent: true },
      { city: 'Abu Dhabi', country: 'UAE', costPerWattUSD: 1.15, color: '#94a3b8' },
      { city: 'Riyadh', country: 'Saudi Arabia', costPerWattUSD: 1.08, color: '#94a3b8' },
      { city: 'Doha', country: 'Qatar', costPerWattUSD: 1.18, color: '#94a3b8' },
    ],
  },
  {
    city: 'Tokyo',
    country: 'Japan',
    continent: 'Asia',
    currency: 'JPY',
    currencySymbol: '¥',
    avgCostMinUSD: 10200,
    avgCostMaxUSD: 13800,
    costPerWattUSD: 2.15,
    localCostRange: '¥1,550,000 - ¥2,100,000',
    paybackYears: 6.2,
    annualSavingsUSD: 1950,
    sunshineHoursPerYear: 1900,
    annualYieldKwhPerKw: 1180,
    slug: 'solar-installation-cost-in-tokyo',
    subsidyName: 'Tokyo Metropolitan Solar Mandate & TMG Subsidies',
    subsidySummary: 'TMG subsidy grants up to ¥120,000/kW for residential solar installations, plus additional battery storage grants.',
    subsidyPercentage: 30,
    subsidyDetails: {
      program: 'Tokyo Cool Net Zero Emission Home Subsidy',
      authority: 'Tokyo Metropolitan Government (TMG) & TEPCO',
      incentiveType: 'Direct Municipal Grant + FIT 16 JPY/kWh',
      maxBenefit: 'Up to ¥450,000 Solar + ¥600,000 Battery Grant',
      eligibility: 'New and existing residential houses in Tokyo Prefecture',
    },
    breakdown: {
      panels: { name: 'Panasonic HIT / Sharp Blacksolar 410W Modules', cost: 4800, share: 40 },
      inverter: { name: 'Omron / Panasonic Indoor/Outdoor Power Conditioner', cost: 2400, share: 20 },
      racking: { name: 'Earthquake-rated Japanese Roof Tile Fixing Systems', cost: 1400, share: 12 },
      electrical: { name: 'Seismic-protected switchboards & emergency back-up sockets', cost: 1400, share: 12 },
      permitsLabor: { name: 'JET certification, TEPCO Grid Connect & Registered Electricians', cost: 1900, share: 16 },
    },
    peerCities: [
      { city: 'Tokyo', country: 'Japan', costPerWattUSD: 2.15, color: '#2563eb', isCurrent: true },
      { city: 'Osaka', country: 'Japan', costPerWattUSD: 2.05, color: '#94a3b8' },
      { city: 'Nagoya', country: 'Japan', costPerWattUSD: 2.10, color: '#94a3b8' },
      { city: 'Fukuoka', country: 'Japan', costPerWattUSD: 1.98, color: '#94a3b8' },
    ],
  },
  {
    city: 'Toronto',
    country: 'Canada',
    continent: 'North America',
    currency: 'CAD',
    currencySymbol: 'C$',
    avgCostMinUSD: 9500,
    avgCostMaxUSD: 13200,
    costPerWattUSD: 2.05,
    localCostRange: 'C$12,900 - C$17,800',
    paybackYears: 6.9,
    annualSavingsUSD: 1650,
    sunshineHoursPerYear: 2050,
    annualYieldKwhPerKw: 1190,
    slug: 'solar-installation-cost-in-toronto',
    subsidyName: 'Canada Greener Homes Loan (0% Interest) & Toronto HELP',
    subsidySummary: 'Interest-free financing up to C$40,000 over 10 years via Canada Greener Homes, paired with Toronto Home Energy Loan Program (HELP).',
    subsidyPercentage: 25,
    subsidyDetails: {
      program: 'Canada Greener Homes Loan & City of Toronto HELP Program',
      authority: 'Natural Resources Canada (NRCan) & Toronto Hydro',
      incentiveType: '0% Interest 10-Year Loan + Property Tax Financed Retrofits',
      maxBenefit: 'Up to C$40,000 0% Interest Financing + Net Metering Credit',
      eligibility: 'All primary homeowners completing EnerGuide energy assessment',
    },
    breakdown: {
      panels: { name: 'Heliene / Silfab Canadian Snow-Load Rated 440W Modules', cost: 4400, share: 39 },
      inverter: { name: 'APsystems / SolarEdge Cold-Climate Inverters', cost: 2300, share: 20 },
      racking: { name: 'KB Racking Heavy Snow & Ice Wind-Rated Railing', cost: 1400, share: 12 },
      electrical: { name: 'ESA Certified Electrical Disconnects & Winterized Cabling', cost: 1400, share: 12 },
      permitsLabor: { name: 'Electrical Safety Authority (ESA) Permit & Hydro Interconnection', cost: 1900, share: 17 },
    },
    peerCities: [
      { city: 'Toronto', country: 'Canada', costPerWattUSD: 2.05, color: '#2563eb', isCurrent: true },
      { city: 'Vancouver', country: 'Canada', costPerWattUSD: 2.15, color: '#94a3b8' },
      { city: 'Calgary', country: 'Canada', costPerWattUSD: 1.85, color: '#94a3b8' },
      { city: 'Montreal', country: 'Canada', costPerWattUSD: 2.20, color: '#94a3b8' },
    ],
  },
  {
    city: 'Singapore',
    country: 'Singapore',
    continent: 'Asia',
    currency: 'SGD',
    currencySymbol: 'S$',
    avgCostMinUSD: 8500,
    avgCostMaxUSD: 11900,
    costPerWattUSD: 1.75,
    localCostRange: 'S$11,500 - S$16,000',
    paybackYears: 5.5,
    annualSavingsUSD: 1900,
    sunshineHoursPerYear: 2400,
    annualYieldKwhPerKw: 1350,
    slug: 'solar-installation-cost-in-singapore',
    subsidyName: 'SP Services Simplified Credit Scheme & BCA Green Mark',
    subsidySummary: 'SP Group net settlement export offset, EMA streamlined grid interconnection, and BCA Green Mark energy credits.',
    subsidyPercentage: 20,
    subsidyDetails: {
      program: 'EMA Simplified Credit Treatment (SCT) Scheme',
      authority: 'Energy Market Authority (EMA) & SP Group',
      incentiveType: 'Export Solar Energy at Wholesale Electricity Price (USEP)',
      maxBenefit: 'Up to 80% Monthly Bill Offset for Landed Properties',
      eligibility: 'Landed residential properties & commercial rooftops in Singapore',
    },
    breakdown: {
      panels: { name: 'REC Group TwinPeak / Alpha Pure 430W Modules', cost: 4100, share: 40 },
      inverter: { name: 'SMA / Huawei Solar Tropical Moisture-Rated Inverters', cost: 2100, share: 20 },
      racking: { name: 'Aerodynamic Corrosive-Resistant Marine Aluminum Mounts', cost: 1100, share: 11 },
      electrical: { name: 'SP Group compliant dual-pole isolators, surge protective devices', cost: 1300, share: 13 },
      permitsLabor: { name: 'Licensed Electrical Worker (LEW) Turnkey Endorsement & EMA Filing', cost: 1600, share: 16 },
    },
    peerCities: [
      { city: 'Singapore', country: 'Singapore', costPerWattUSD: 1.75, color: '#2563eb', isCurrent: true },
      { city: 'Kuala Lumpur', country: 'Malaysia', costPerWattUSD: 1.25, color: '#94a3b8' },
      { city: 'Bangkok', country: 'Thailand', costPerWattUSD: 1.20, color: '#94a3b8' },
      { city: 'Jakarta', country: 'Indonesia', costPerWattUSD: 1.30, color: '#94a3b8' },
    ],
  },
  {
    city: 'Cape Town',
    country: 'South Africa',
    continent: 'Africa',
    currency: 'ZAR',
    currencySymbol: 'R ',
    avgCostMinUSD: 4800,
    avgCostMaxUSD: 6900,
    costPerWattUSD: 0.95,
    localCostRange: 'R 88,000 - R 128,000',
    paybackYears: 3.8,
    annualSavingsUSD: 1550,
    sunshineHoursPerYear: 3100,
    annualYieldKwhPerKw: 1720,
    slug: 'solar-installation-cost-in-cape-town',
    subsidyName: 'City of Cape Town Cash for Power Feed-In Tariff',
    subsidySummary: 'City of Cape Town pays residents for feeding excess clean solar power into the municipal grid, plus exemption from load shedding.',
    subsidyPercentage: 25,
    subsidyDetails: {
      program: 'Cape Town SSEG Feed-In Tariff & Section 12BA Tax Benefit',
      authority: 'City of Cape Town Municipality & SARS',
      incentiveType: 'Cash payment per kWh exported + 125% Tax Deduction',
      maxBenefit: 'Direct municipal electricity bill credits & cash payouts',
      eligibility: 'SSEG-registered grid-tied and hybrid residential solar installations',
    },
    breakdown: {
      panels: { name: 'Canadian Solar / JA Solar 545W Mono PERC Panels', cost: 2100, share: 36 },
      inverter: { name: 'Deye / Sunsynk 5kW / 8kW Hybrid Inverter with Battery Port', cost: 1450, share: 25 },
      racking: { name: 'Renusol IBR / Corrugated Coastal Rust-Proof Mounting', cost: 650, share: 11 },
      electrical: { name: 'SANS compliant AC/DC distribution boards with changeover switches', cost: 750, share: 13 },
      permitsLabor: { name: 'SSEG Application, Pr.Eng Sign-Off & Certificate of Compliance (CoC)', cost: 850, share: 15 },
    },
    peerCities: [
      { city: 'Cape Town', country: 'South Africa', costPerWattUSD: 0.95, color: '#2563eb', isCurrent: true },
      { city: 'Johannesburg', country: 'South Africa', costPerWattUSD: 0.92, color: '#94a3b8' },
      { city: 'Durban', country: 'South Africa', costPerWattUSD: 0.98, color: '#94a3b8' },
      { city: 'Pretoria', country: 'South Africa', costPerWattUSD: 0.94, color: '#94a3b8' },
    ],
  },
  {
    city: 'Mumbai',
    country: 'India',
    continent: 'Asia',
    currency: 'INR',
    currencySymbol: '₹',
    avgCostMinUSD: 1980,
    avgCostMaxUSD: 2450,
    costPerWattUSD: 0.65,
    localCostRange: '₹1,55,000 - ₹1,95,000 (3kW)',
    paybackYears: 3.2,
    annualSavingsUSD: 680,
    sunshineHoursPerYear: 2900,
    annualYieldKwhPerKw: 1520,
    slug: 'solar-installation-cost-in-mumbai',
    subsidyName: 'PM Surya Ghar Muft Bijli Yojana Central Subsidy',
    subsidySummary: 'Direct Benefit Transfer (DBT) subsidy of ₹78,000 directly to bank accounts for 3kW+ rooftop systems under MNRE guidelines.',
    subsidyPercentage: 45,
    subsidyDetails: {
      program: 'PM Surya Ghar Muft Bijli Yojana',
      authority: 'MNRE, MSEDCL & Tata Power / Adani Electricity',
      incentiveType: 'Direct DBT Bank Transfer up to ₹78,000',
      maxBenefit: '₹78,000 Fixed Central Subsidy',
      eligibility: 'Residential rooftops with sanctioned domestic electricity connection',
    },
    breakdown: {
      panels: { name: 'Tata Power / Waaree 540W Mono PERC Modules', cost: 74000, share: 42 },
      inverter: { name: 'Growatt / Solis 3.3kW Grid-Tied Inverter', cost: 36000, share: 20 },
      racking: { name: 'Galvanized HDG 80 Micron Wind-Rated Structure', cost: 22000, share: 12 },
      electrical: { name: 'Polycab DC Solar Cables, SPD, Earthing & AC/DC DB', cost: 21000, share: 12 },
      permitsLabor: { name: 'DISCOM Net Metering approvals, testing & EPC labor', cost: 25000, share: 14 },
    },
    peerCities: [
      { city: 'Mumbai', country: 'India', costPerWattUSD: 0.65, color: '#2563eb', isCurrent: true },
      { city: 'Delhi', country: 'India', costPerWattUSD: 0.60, color: '#94a3b8' },
      { city: 'Bangalore', country: 'India', costPerWattUSD: 0.64, color: '#94a3b8' },
      { city: 'Hyderabad', country: 'India', costPerWattUSD: 0.62, color: '#94a3b8' },
    ],
  },
  {
    city: 'Delhi',
    country: 'India',
    continent: 'Asia',
    currency: 'INR',
    currencySymbol: '₹',
    avgCostMinUSD: 1850,
    avgCostMaxUSD: 2320,
    costPerWattUSD: 0.60,
    localCostRange: '₹1,45,000 - ₹1,85,000 (3kW)',
    paybackYears: 2.9,
    annualSavingsUSD: 720,
    sunshineHoursPerYear: 2850,
    annualYieldKwhPerKw: 1540,
    slug: 'solar-installation-cost-in-delhi',
    subsidyName: 'PM Surya Ghar Central Subsidy + Delhi Solar Policy GBI',
    subsidySummary: '₹78,000 central DBT subsidy plus ₹3.00/kWh Generation Based Incentive (GBI) paid directly by Delhi Government for 5 years.',
    subsidyPercentage: 48,
    subsidyDetails: {
      program: 'PM Surya Ghar + Delhi Solar Policy GBI Incentive',
      authority: 'MNRE, DERC, BSES Rajdhani/Yamuna & Tata Power-DDL',
      incentiveType: '₹78,000 Central DBT + ₹3.00/unit State Solar GBI',
      maxBenefit: '₹78,000 Direct Bank Transfer + ₹12,000/yr GBI Credits',
      eligibility: 'All domestic residential DISCOM consumers in NCT of Delhi',
    },
    breakdown: {
      panels: { name: 'Tata Power / Waaree / Adani 540W Mono PERC Modules', cost: 70000, share: 42 },
      inverter: { name: 'Growatt / Solis / Havells 3.3kW On-Grid Inverter', cost: 34000, share: 20 },
      racking: { name: 'Elevated Galvanized Iron (GI) Structure with Walkway', cost: 21000, share: 12 },
      electrical: { name: 'Polycab DC Solar Cables, SPD, Copper Earthing & AC/DC DB', cost: 19000, share: 12 },
      permitsLabor: { name: 'BSES/TPDDL Net Metering, CEIG Inspection & Turnkey Installation', cost: 22000, share: 14 },
    },
    peerCities: [
      { city: 'Delhi', country: 'India', costPerWattUSD: 0.60, color: '#2563eb', isCurrent: true },
      { city: 'Mumbai', country: 'India', costPerWattUSD: 0.65, color: '#94a3b8' },
      { city: 'Jaipur', country: 'India', costPerWattUSD: 0.58, color: '#94a3b8' },
      { city: 'Chandigarh', country: 'India', costPerWattUSD: 0.61, color: '#94a3b8' },
    ],
  },
  {
    city: 'Ahmedabad',
    country: 'India',
    continent: 'Asia',
    currency: 'INR',
    currencySymbol: '₹',
    avgCostMinUSD: 1650,
    avgCostMaxUSD: 2150,
    costPerWattUSD: 0.55,
    localCostRange: '₹1,30,000 - ₹1,70,000 (3kW)',
    paybackYears: 2.8,
    annualSavingsUSD: 740,
    sunshineHoursPerYear: 3100,
    annualYieldKwhPerKw: 1580,
    slug: 'solar-installation-cost-in-ahmedabad',
    subsidyName: 'PM Surya Ghar Central Subsidy + Gujarat Surya Urja Rooftop Policy',
    subsidySummary: '₹78,000 central DBT subsidy directly credited within 30 days under Torrent Power & UGVCL/DGVCL net metering.',
    subsidyPercentage: 50,
    subsidyDetails: {
      program: 'PM Surya Ghar Muft Bijli Yojana & Gujarat Solar Rooftop Policy',
      authority: 'MNRE, GUVNL, Torrent Power & UGVCL/DGVCL',
      incentiveType: 'Direct DBT Bank Transfer up to ₹78,000',
      maxBenefit: '₹78,000 Direct Bank Transfer + Fast-track 15-day Net Metering',
      eligibility: 'Residential rooftops across Ahmedabad with domestic electricity connection',
    },
    breakdown: {
      panels: { name: 'Waaree / Adani Solar 540W Mono PERC Panels', cost: 64000, share: 42 },
      inverter: { name: 'Growatt / Solis 3.3kW Grid-Tie Inverter', cost: 30000, share: 20 },
      racking: { name: 'Hot-Dip Galvanized 80-Micron Elevated Structure', cost: 18000, share: 12 },
      electrical: { name: 'Polycab DC Solar Cables, SPD, Dual Earthing & AC/DC DB', cost: 18000, share: 12 },
      permitsLabor: { name: 'Torrent Power / UGVCL Net Metering Approvals & Turnkey Labor', cost: 20000, share: 14 },
    },
    peerCities: [
      { city: 'Ahmedabad', country: 'India', costPerWattUSD: 0.55, color: '#2563eb', isCurrent: true },
      { city: 'Surat', country: 'India', costPerWattUSD: 0.54, color: '#94a3b8' },
      { city: 'Mumbai', country: 'India', costPerWattUSD: 0.65, color: '#94a3b8' },
      { city: 'Jaipur', country: 'India', costPerWattUSD: 0.58, color: '#94a3b8' },
    ],
  },
  {
    city: 'Pune',
    country: 'India',
    continent: 'Asia',
    currency: 'INR',
    currencySymbol: '₹',
    avgCostMinUSD: 1900,
    avgCostMaxUSD: 2380,
    costPerWattUSD: 0.63,
    localCostRange: '₹1,50,000 - ₹1,88,000 (3kW)',
    paybackYears: 3.1,
    annualSavingsUSD: 660,
    sunshineHoursPerYear: 2850,
    annualYieldKwhPerKw: 1510,
    slug: 'solar-installation-cost-in-pune',
    subsidyName: 'PM Surya Ghar Central Subsidy & MSEDCL Net Metering',
    subsidySummary: 'Direct DBT subsidy of ₹78,000 directly to bank accounts with MSEDCL net metering and PMC green building benefits.',
    subsidyPercentage: 46,
    subsidyDetails: {
      program: 'PM Surya Ghar Muft Bijli Yojana & MEDA Rooftop Incentives',
      authority: 'MNRE, MSEDCL (Mahavitaran) & MEDA',
      incentiveType: 'Direct DBT Bank Transfer up to ₹78,000',
      maxBenefit: '₹78,000 Direct Central Subsidy',
      eligibility: 'Residential bungalows, societies and row houses in Pune & PCMC',
    },
    breakdown: {
      panels: { name: 'Tata Power / Goldi Solar 540W Mono PERC Modules', cost: 72000, share: 42 },
      inverter: { name: 'Growatt / Havells 3.3kW On-Grid Inverter', cost: 35000, share: 20 },
      racking: { name: 'Wind-Rated HDG Elevated Rooftop Structure', cost: 21000, share: 12 },
      electrical: { name: 'Polycab DC Cables, SPD, Chemical Earthing & AC/DC DB', cost: 20000, share: 12 },
      permitsLabor: { name: 'MSEDCL Online Portal Net Metering Approvals & Installation', cost: 24000, share: 14 },
    },
    peerCities: [
      { city: 'Pune', country: 'India', costPerWattUSD: 0.63, color: '#2563eb', isCurrent: true },
      { city: 'Mumbai', country: 'India', costPerWattUSD: 0.65, color: '#94a3b8' },
      { city: 'Bangalore', country: 'India', costPerWattUSD: 0.64, color: '#94a3b8' },
      { city: 'Hyderabad', country: 'India', costPerWattUSD: 0.62, color: '#94a3b8' },
    ],
  },
  {
    city: 'Bangalore',
    country: 'India',
    continent: 'Asia',
    currency: 'INR',
    currencySymbol: '₹',
    avgCostMinUSD: 1920,
    avgCostMaxUSD: 2400,
    costPerWattUSD: 0.64,
    localCostRange: '₹1,52,000 - ₹1,90,000 (3kW)',
    paybackYears: 3.3,
    annualSavingsUSD: 650,
    sunshineHoursPerYear: 2650,
    annualYieldKwhPerKw: 1490,
    slug: 'solar-installation-cost-in-bangalore',
    subsidyName: 'PM Surya Ghar Central Subsidy & BESCOM Net Metering',
    subsidySummary: '₹78,000 direct bank transfer subsidy for residential consumers under BESCOM and KERC rooftop regulations.',
    subsidyPercentage: 45,
    subsidyDetails: {
      program: 'PM Surya Ghar Muft Bijli Yojana & Karnataka Solar Policy',
      authority: 'MNRE, KREDL & BESCOM (Bangalore Electricity Supply Co.)',
      incentiveType: 'Direct DBT Bank Transfer up to ₹78,000',
      maxBenefit: '₹78,000 Central Subsidy + BESCOM Surplus Export Credits',
      eligibility: 'All domestic consumers with BESCOM LT connection in Greater Bengaluru',
    },
    breakdown: {
      panels: { name: 'Tata Power / Premier Energies 545W Mono PERC', cost: 73000, share: 42 },
      inverter: { name: 'Solis / Growatt 3.3kW High Efficiency Inverter', cost: 35000, share: 20 },
      racking: { name: 'Elevated HDG Structure with Non-penetrating Clamps', cost: 21000, share: 12 },
      electrical: { name: 'Finolex/Polycab DC Solar Cables, AC/DC DB & Earthing', cost: 20000, share: 12 },
      permitsLabor: { name: 'BESCOM Net Meter Synchronization & Master Electrician Labor', cost: 24000, share: 14 },
    },
    peerCities: [
      { city: 'Bangalore', country: 'India', costPerWattUSD: 0.64, color: '#2563eb', isCurrent: true },
      { city: 'Hyderabad', country: 'India', costPerWattUSD: 0.62, color: '#94a3b8' },
      { city: 'Chennai', country: 'India', costPerWattUSD: 0.63, color: '#94a3b8' },
      { city: 'Pune', country: 'India', costPerWattUSD: 0.63, color: '#94a3b8' },
    ],
  },
  {
    city: 'Hyderabad',
    country: 'India',
    continent: 'Asia',
    currency: 'INR',
    currencySymbol: '₹',
    avgCostMinUSD: 1880,
    avgCostMaxUSD: 2350,
    costPerWattUSD: 0.62,
    localCostRange: '₹1,48,000 - ₹1,86,000 (3kW)',
    paybackYears: 3.1,
    annualSavingsUSD: 690,
    sunshineHoursPerYear: 2900,
    annualYieldKwhPerKw: 1530,
    slug: 'solar-installation-cost-in-hyderabad',
    subsidyName: 'PM Surya Ghar Subsidy & TSSPDCL Net Metering',
    subsidySummary: '₹78,000 central DBT subsidy credited directly to bank account with TSSPDCL online solar portal approval.',
    subsidyPercentage: 46,
    subsidyDetails: {
      program: 'PM Surya Ghar Muft Bijli Yojana & Telangana Solar Policy',
      authority: 'MNRE, TSREDCO & TSSPDCL/TSNPDCL',
      incentiveType: 'Direct DBT Bank Transfer up to ₹78,000',
      maxBenefit: '₹78,000 Central Subsidy',
      eligibility: 'Domestic consumers in Hyderabad, Secunderabad and Cyberabad',
    },
    breakdown: {
      panels: { name: 'Premier Energies / Waaree 540W Mono PERC Modules', cost: 71000, share: 42 },
      inverter: { name: 'Growatt / Solis 3.3kW On-Grid Inverter', cost: 34000, share: 20 },
      racking: { name: 'Galvanized Iron elevated rooftop frame structure', cost: 20000, share: 12 },
      electrical: { name: 'Polycab DC Solar Wiring, Double SPD & Chemical Earthing', cost: 19000, share: 12 },
      permitsLabor: { name: 'TSSPDCL Net Meter Inspection & Certified EPC Labor', cost: 23000, share: 14 },
    },
    peerCities: [
      { city: 'Hyderabad', country: 'India', costPerWattUSD: 0.62, color: '#2563eb', isCurrent: true },
      { city: 'Bangalore', country: 'India', costPerWattUSD: 0.64, color: '#94a3b8' },
      { city: 'Chennai', country: 'India', costPerWattUSD: 0.63, color: '#94a3b8' },
      { city: 'Mumbai', country: 'India', costPerWattUSD: 0.65, color: '#94a3b8' },
    ],
  },
  {
    city: 'Chennai',
    country: 'India',
    continent: 'Asia',
    currency: 'INR',
    currencySymbol: '₹',
    avgCostMinUSD: 1890,
    avgCostMaxUSD: 2370,
    costPerWattUSD: 0.63,
    localCostRange: '₹1,50,000 - ₹1,88,000 (3kW)',
    paybackYears: 3.2,
    annualSavingsUSD: 670,
    sunshineHoursPerYear: 2950,
    annualYieldKwhPerKw: 1540,
    slug: 'solar-installation-cost-in-chennai',
    subsidyName: 'PM Surya Ghar Central Subsidy & TANGEDCO Net Metering',
    subsidySummary: 'Direct ₹78,000 central subsidy under TANGEDCO solar network tariff with corrosion-resistant coastal mounting.',
    subsidyPercentage: 46,
    subsidyDetails: {
      program: 'PM Surya Ghar Muft Bijli Yojana & Tamil Nadu Solar Energy Policy',
      authority: 'MNRE, TEDA & TANGEDCO',
      incentiveType: 'Direct DBT Bank Transfer up to ₹78,000',
      maxBenefit: '₹78,000 Central DBT Subsidy',
      eligibility: 'All domestic residential service connections in Chennai & MMR',
    },
    breakdown: {
      panels: { name: 'Vikram Solar / Waaree 540W Salt-Mist Resistant Modules', cost: 72000, share: 42 },
      inverter: { name: 'Solis / Havells 3.3kW Grid-Tie Inverter', cost: 35000, share: 20 },
      racking: { name: 'Heavy-Duty 80-Micron Galvanized Coastal Roof Structure', cost: 21000, share: 12 },
      electrical: { name: 'UV-Grade Polycab DC Cables, Dual SPD & Pure Copper Earthing', cost: 20000, share: 12 },
      permitsLabor: { name: 'TANGEDCO Net Meter Testing & Turnkey Commissioning', cost: 24000, share: 14 },
    },
    peerCities: [
      { city: 'Chennai', country: 'India', costPerWattUSD: 0.63, color: '#2563eb', isCurrent: true },
      { city: 'Bangalore', country: 'India', costPerWattUSD: 0.64, color: '#94a3b8' },
      { city: 'Hyderabad', country: 'India', costPerWattUSD: 0.62, color: '#94a3b8' },
      { city: 'Mumbai', country: 'India', costPerWattUSD: 0.65, color: '#94a3b8' },
    ],
  },
  {
    city: 'Jaipur',
    country: 'India',
    continent: 'Asia',
    currency: 'INR',
    currencySymbol: '₹',
    avgCostMinUSD: 1780,
    avgCostMaxUSD: 2240,
    costPerWattUSD: 0.58,
    localCostRange: '₹1,40,000 - ₹1,78,000 (3kW)',
    paybackYears: 2.9,
    annualSavingsUSD: 730,
    sunshineHoursPerYear: 3150,
    annualYieldKwhPerKw: 1600,
    slug: 'solar-installation-cost-in-jaipur',
    subsidyName: 'PM Surya Ghar Central Subsidy & JVVNL Net Metering',
    subsidySummary: 'Highest solar radiation in India (300+ sunny days) with ₹78,000 central DBT subsidy through JVVNL.',
    subsidyPercentage: 48,
    subsidyDetails: {
      program: 'PM Surya Ghar Muft Bijli Yojana & Rajasthan Solar Policy',
      authority: 'MNRE, RRECL & JVVNL (Jaipur Vidyut Vitran Nigam)',
      incentiveType: 'Direct DBT Bank Transfer up to ₹78,000',
      maxBenefit: '₹78,000 Direct Central Subsidy',
      eligibility: 'Residential properties in Jaipur and Rajasthan DISCOM jurisdiction',
    },
    breakdown: {
      panels: { name: 'Waaree / Insolation Energy 540W Mono PERC Modules', cost: 68000, share: 42 },
      inverter: { name: 'Growatt / Solis 3.3kW High Temperature Inverter', cost: 32000, share: 20 },
      racking: { name: 'Elevated GI Rooftop Structure with Walkway & Water Piping', cost: 19000, share: 12 },
      electrical: { name: 'Polycab DC Solar Cables, SPD, Earthing Rods & AC/DC DB', cost: 19000, share: 12 },
      permitsLabor: { name: 'JVVNL Net Metering Inspection & Certified Installation', cost: 22000, share: 14 },
    },
    peerCities: [
      { city: 'Jaipur', country: 'India', costPerWattUSD: 0.58, color: '#2563eb', isCurrent: true },
      { city: 'Ahmedabad', country: 'India', costPerWattUSD: 0.55, color: '#94a3b8' },
      { city: 'Delhi', country: 'India', costPerWattUSD: 0.60, color: '#94a3b8' },
      { city: 'Chandigarh', country: 'India', costPerWattUSD: 0.61, color: '#94a3b8' },
    ],
  },
  {
    city: 'Kolkata',
    country: 'India',
    continent: 'Asia',
    currency: 'INR',
    currencySymbol: '₹',
    avgCostMinUSD: 1820,
    avgCostMaxUSD: 2300,
    costPerWattUSD: 0.61,
    localCostRange: '₹1,44,000 - ₹1,82,000 (3kW)',
    paybackYears: 3.3,
    annualSavingsUSD: 640,
    sunshineHoursPerYear: 2500,
    annualYieldKwhPerKw: 1470,
    slug: 'solar-installation-cost-in-kolkata',
    subsidyName: 'PM Surya Ghar Central Subsidy & CESC / WBSEDCL Net Metering',
    subsidySummary: '₹78,000 central DBT subsidy credited within 30 days under CESC and WBSEDCL rooftop solar guidelines.',
    subsidyPercentage: 47,
    subsidyDetails: {
      program: 'PM Surya Ghar Muft Bijli Yojana & WBREDA Rooftop Program',
      authority: 'MNRE, WBREDA, CESC & WBSEDCL',
      incentiveType: 'Direct DBT Bank Transfer up to ₹78,000',
      maxBenefit: '₹78,000 Direct Central Subsidy',
      eligibility: 'All domestic grid-connected consumers in Kolkata & West Bengal',
    },
    breakdown: {
      panels: { name: 'Vikram Solar / Waaree 540W Mono PERC Modules', cost: 69000, share: 42 },
      inverter: { name: 'Growatt / Havells 3.3kW Grid-Tied Inverter', cost: 33000, share: 20 },
      racking: { name: 'Corrosion-Proof Heavy-Duty HDG Rooftop Structure', cost: 20000, share: 12 },
      electrical: { name: 'Polycab DC Cables, Surge Protection & Chemical Earthing', cost: 19000, share: 12 },
      permitsLabor: { name: 'CESC/WBSEDCL Net Meter Testing & Commissioning', cost: 23000, share: 14 },
    },
    peerCities: [
      { city: 'Kolkata', country: 'India', costPerWattUSD: 0.61, color: '#2563eb', isCurrent: true },
      { city: 'Delhi', country: 'India', costPerWattUSD: 0.60, color: '#94a3b8' },
      { city: 'Mumbai', country: 'India', costPerWattUSD: 0.65, color: '#94a3b8' },
      { city: 'Chennai', country: 'India', costPerWattUSD: 0.63, color: '#94a3b8' },
    ],
  },
  {
    city: 'Surat',
    country: 'India',
    continent: 'Asia',
    currency: 'INR',
    currencySymbol: '₹',
    avgCostMinUSD: 1620,
    avgCostMaxUSD: 2120,
    costPerWattUSD: 0.54,
    localCostRange: '₹1,28,000 - ₹1,68,000 (3kW)',
    paybackYears: 2.7,
    annualSavingsUSD: 760,
    sunshineHoursPerYear: 3100,
    annualYieldKwhPerKw: 1590,
    slug: 'solar-installation-cost-in-surat',
    subsidyName: 'PM Surya Ghar Central Subsidy & DGVCL / Torrent Solar Scheme',
    subsidySummary: 'Surat is a leading solar city in India with ₹78,000 DBT subsidy and high industrial/residential adoption.',
    subsidyPercentage: 51,
    subsidyDetails: {
      program: 'PM Surya Ghar Muft Bijli Yojana & Surat Smart Solar City Scheme',
      authority: 'MNRE, DGVCL, Torrent Power & SMC',
      incentiveType: 'Direct DBT Bank Transfer up to ₹78,000',
      maxBenefit: '₹78,000 Direct Bank Transfer',
      eligibility: 'Residential bungalows, societies and row houses across Surat district',
    },
    breakdown: {
      panels: { name: 'Goldi Solar / Waaree 540W Mono PERC Modules', cost: 63000, share: 42 },
      inverter: { name: 'Growatt / Solis 3.3kW On-Grid Inverter', cost: 29000, share: 20 },
      racking: { name: 'Hot-Dip Galvanized Elevated Terrace Mounting Frame', cost: 18000, share: 12 },
      electrical: { name: 'Polycab DC Solar Cables, SPD, Dual Earthing & AC/DC DB', cost: 18000, share: 12 },
      permitsLabor: { name: 'DGVCL / Torrent Power Net Metering Approvals & Labor', cost: 20000, share: 14 },
    },
    peerCities: [
      { city: 'Surat', country: 'India', costPerWattUSD: 0.54, color: '#2563eb', isCurrent: true },
      { city: 'Ahmedabad', country: 'India', costPerWattUSD: 0.55, color: '#94a3b8' },
      { city: 'Mumbai', country: 'India', costPerWattUSD: 0.65, color: '#94a3b8' },
      { city: 'Pune', country: 'India', costPerWattUSD: 0.63, color: '#94a3b8' },
    ],
  },
  {
    city: 'Lucknow',
    country: 'India',
    continent: 'Asia',
    currency: 'INR',
    currencySymbol: '₹',
    avgCostMinUSD: 1800,
    avgCostMaxUSD: 2280,
    costPerWattUSD: 0.59,
    localCostRange: '₹1,42,000 - ₹1,80,000 (3kW)',
    paybackYears: 3.0,
    annualSavingsUSD: 700,
    sunshineHoursPerYear: 2800,
    annualYieldKwhPerKw: 1520,
    slug: 'solar-installation-cost-in-lucknow',
    subsidyName: 'PM Surya Ghar Central Subsidy + UP State Solar Subsidy (₹30,000)',
    subsidySummary: 'Dual subsidy: Up to ₹78,000 central DBT + additional ₹30,000 Uttar Pradesh state government subsidy.',
    subsidyPercentage: 55,
    subsidyDetails: {
      program: 'PM Surya Ghar + UP Solar Rooftop Policy Additional Subsidy',
      authority: 'MNRE, UPNEDA & UPPCL (MVVNL)',
      incentiveType: '₹78,000 Central DBT + Up to ₹30,000 UP State Subsidy',
      maxBenefit: 'Up to ₹1,08,000 Combined Central + State Subsidy',
      eligibility: 'All domestic consumers with active UPPCL connection in Uttar Pradesh',
    },
    breakdown: {
      panels: { name: 'Tata Power / Waaree 540W Mono PERC Panels', cost: 68000, share: 42 },
      inverter: { name: 'Growatt / Havells 3.3kW On-Grid Inverter', cost: 33000, share: 20 },
      racking: { name: 'Elevated GI Structure with Walkway Platform', cost: 20000, share: 12 },
      electrical: { name: 'Polycab DC Solar Cables, SPD, Dual Earthing & AC/DC DB', cost: 19000, share: 12 },
      permitsLabor: { name: 'UPNEDA / UPPCL Net Metering Approvals & Installation', cost: 22000, share: 14 },
    },
    peerCities: [
      { city: 'Lucknow', country: 'India', costPerWattUSD: 0.59, color: '#2563eb', isCurrent: true },
      { city: 'Delhi', country: 'India', costPerWattUSD: 0.60, color: '#94a3b8' },
      { city: 'Jaipur', country: 'India', costPerWattUSD: 0.58, color: '#94a3b8' },
      { city: 'Kolkata', country: 'India', costPerWattUSD: 0.61, color: '#94a3b8' },
    ],
  },
  {
    city: 'Chandigarh',
    country: 'India',
    continent: 'Asia',
    currency: 'INR',
    currencySymbol: '₹',
    avgCostMinUSD: 1860,
    avgCostMaxUSD: 2340,
    costPerWattUSD: 0.61,
    localCostRange: '₹1,46,000 - ₹1,84,000 (3kW)',
    paybackYears: 3.1,
    annualSavingsUSD: 690,
    sunshineHoursPerYear: 2850,
    annualYieldKwhPerKw: 1530,
    slug: 'solar-installation-cost-in-chandigarh',
    subsidyName: 'PM Surya Ghar Central Subsidy & CREST Solar Mandate',
    subsidySummary: '₹78,000 central DBT subsidy with CREST online single-window clearance and mandatory rooftop solar provisions.',
    subsidyPercentage: 47,
    subsidyDetails: {
      program: 'PM Surya Ghar Muft Bijli Yojana & CREST Chandigarh Solar Policy',
      authority: 'MNRE, CREST & Chandigarh Electricity Department',
      incentiveType: 'Direct DBT Bank Transfer up to ₹78,000',
      maxBenefit: '₹78,000 Central DBT Subsidy',
      eligibility: 'Residential plots (500 sq yd+) and all domestic electricity connections',
    },
    breakdown: {
      panels: { name: 'Tata Power / Waaree 540W Mono PERC Modules', cost: 70000, share: 42 },
      inverter: { name: 'Solis / Growatt 3.3kW On-Grid Inverter', cost: 34000, share: 20 },
      racking: { name: '80-Micron Hot-Dip Galvanized Rooftop Structure', cost: 20000, share: 12 },
      electrical: { name: 'Polycab DC Solar Cables, SPD, Chemical Earthing & AC/DC DB', cost: 19000, share: 12 },
      permitsLabor: { name: 'CREST Single Window Net Metering Inspection & Labor', cost: 23000, share: 14 },
    },
    peerCities: [
      { city: 'Chandigarh', country: 'India', costPerWattUSD: 0.61, color: '#2563eb', isCurrent: true },
      { city: 'Delhi', country: 'India', costPerWattUSD: 0.60, color: '#94a3b8' },
      { city: 'Jaipur', country: 'India', costPerWattUSD: 0.58, color: '#94a3b8' },
      { city: 'Lucknow', country: 'India', costPerWattUSD: 0.59, color: '#94a3b8' },
    ],
  },
  {
    city: 'São Paulo',
    country: 'Brazil',
    continent: 'South America',
    currency: 'BRL',
    currencySymbol: 'R$ ',
    avgCostMinUSD: 4100,
    avgCostMaxUSD: 5800,
    costPerWattUSD: 0.88,
    localCostRange: 'R$ 21,000 - R$ 29,500',
    paybackYears: 3.9,
    annualSavingsUSD: 1350,
    sunshineHoursPerYear: 2300,
    annualYieldKwhPerKw: 1480,
    slug: 'solar-installation-cost-in-sao-paulo',
    subsidyName: 'Marco Legal da Micro e Minigeração (Lei 14.300) & ICMS Exemption',
    subsidySummary: 'State ICMS tariff discounts, net metering energy compensation, and Finame low-rate green financing.',
    subsidyPercentage: 25,
    subsidyDetails: {
      program: 'Marco Legal da Geração Distribuída (Lei 14.300/22)',
      authority: 'ANEEL & Enel Distribuição São Paulo',
      incentiveType: 'ICMS Tax Exemption + Energy Compensation Credits',
      maxBenefit: 'Up to 85% Savings on Monthly Electric Bill',
      eligibility: 'Residential and commercial consumer units with active grid connection',
    },
    breakdown: {
      panels: { name: 'Canadian Solar / BYD 550W Tier-1 Photovoltaic Panels', cost: 1800, share: 37 },
      inverter: { name: 'Sungrow / Growatt Microinverter / String Inverter', cost: 1100, share: 22 },
      racking: { name: 'Romagnole Aluminum Roof Clamping System', cost: 550, share: 11 },
      electrical: { name: 'Proauto solar string box, DPS protection, cabling', cost: 650, share: 13 },
      permitsLabor: { name: 'Enel Interconnection Project, CREA ART registration & Labor', cost: 850, share: 17 },
    },
    peerCities: [
      { city: 'São Paulo', country: 'Brazil', costPerWattUSD: 0.88, color: '#2563eb', isCurrent: true },
      { city: 'Rio de Janeiro', country: 'Brazil', costPerWattUSD: 0.92, color: '#94a3b8' },
      { city: 'Belo Horizonte', country: 'Brazil', costPerWattUSD: 0.86, color: '#94a3b8' },
      { city: 'Curitiba', country: 'Brazil', costPerWattUSD: 0.90, color: '#94a3b8' },
    ],
  },
  {
    city: 'Paris',
    country: 'France',
    continent: 'Europe',
    currency: 'EUR',
    currencySymbol: '€',
    avgCostMinUSD: 8200,
    avgCostMaxUSD: 11200,
    costPerWattUSD: 1.55,
    localCostRange: '€7,600 - €10,400',
    paybackYears: 7.2,
    annualSavingsUSD: 1380,
    sunshineHoursPerYear: 1850,
    annualYieldKwhPerKw: 1120,
    slug: 'solar-installation-cost-in-paris',
    subsidyName: "Prime à l'Autoconsommation & EDF OA Feed-in Rate",
    subsidySummary: 'State investment grant paid over first 5 years (Prime à l’autoconsommation), reduced 10% VAT, and 20-year guaranteed EDF feed-in.',
    subsidyPercentage: 22,
    subsidyDetails: {
      program: "Prime à l'Autoconsommation Photovoltaïque (Arrêté Tarifaire)",
      authority: "Ministère de la Transition Écologique & EDF Obligation d'Achat",
      incentiveType: 'Direct Capital Grant + 13 ct€/kWh Surplus Feed-in',
      maxBenefit: 'Up to €1,500 Direct State Grant for 3kWp Systems',
      eligibility: 'RGE-certified installer systems mounted parallel to roof slope',
    },
    breakdown: {
      panels: { name: 'DualSun / SunPower 425W All-Black Modules', cost: 3800, share: 40 },
      inverter: { name: 'Enphase Energy IQ8M Microinverters', cost: 2100, share: 22 },
      racking: { name: 'K2 Systems French Zinc/Slate Tile Mounting', cost: 1000, share: 11 },
      electrical: { name: 'Coffret AC/DC parafoudre, sectionneur différentiel', cost: 1150, share: 12 },
      permitsLabor: { name: 'Déclaration préalable de travaux (Mairie), Consuel & Enedis', cost: 1450, share: 15 },
    },
    peerCities: [
      { city: 'Paris', country: 'France', costPerWattUSD: 1.55, color: '#2563eb', isCurrent: true },
      { city: 'Marseille', country: 'France', costPerWattUSD: 1.45, color: '#94a3b8' },
      { city: 'Lyon', country: 'France', costPerWattUSD: 1.52, color: '#94a3b8' },
      { city: 'Bordeaux', country: 'France', costPerWattUSD: 1.48, color: '#94a3b8' },
    ],
  },
  {
    city: 'Amsterdam',
    country: 'Netherlands',
    continent: 'Europe',
    currency: 'EUR',
    currencySymbol: '€',
    avgCostMinUSD: 6800,
    avgCostMaxUSD: 9200,
    costPerWattUSD: 1.35,
    localCostRange: '€6,300 - €8,500',
    paybackYears: 5.9,
    annualSavingsUSD: 1420,
    sunshineHoursPerYear: 1700,
    annualYieldKwhPerKw: 1020,
    slug: 'solar-installation-cost-in-amsterdam',
    subsidyName: '0% BTW (Zero VAT) & Salderingsregeling Net Metering',
    subsidySummary: '0% VAT on home solar panels, national Salderingsregeling 1:1 net metering, and municipal sustainability loans.',
    subsidyPercentage: 21,
    subsidyDetails: {
      program: 'Salderingsregeling & 0% BTW op Zonnepanelen',
      authority: 'Belastingdienst & Rijksdienst voor Ondernemend Nederland (RVO)',
      incentiveType: '0% VAT Exemption + 1:1 Full Grid Netting',
      maxBenefit: '€1,300+ Immediate VAT Exemption + Grid Credit',
      eligibility: 'All small consumer grid connections (kleinverbruikersaansluiting)',
    },
    breakdown: {
      panels: { name: 'DMEGC / Trina Solar 440W All-Black N-Type', cost: 3100, share: 39 },
      inverter: { name: 'SolarEdge HD-Wave with Power Optimizers', cost: 1750, share: 22 },
      racking: { name: 'Van der Valk Solar Systems Flat/Tile Roof Mounts', cost: 850, share: 11 },
      electrical: { name: 'Meterkast update, aardlekschakelaars & DC wiring', cost: 950, share: 12 },
      permitsLabor: { name: 'InstallQ Certified installation, Liander/Stedin registration', cost: 1250, share: 16 },
    },
    peerCities: [
      { city: 'Amsterdam', country: 'Netherlands', costPerWattUSD: 1.35, color: '#2563eb', isCurrent: true },
      { city: 'Rotterdam', country: 'Netherlands', costPerWattUSD: 1.32, color: '#94a3b8' },
      { city: 'Utrecht', country: 'Netherlands', costPerWattUSD: 1.34, color: '#94a3b8' },
      { city: 'Eindhoven', country: 'Netherlands', costPerWattUSD: 1.30, color: '#94a3b8' },
    ],
  },
  {
    city: 'Auckland',
    country: 'New Zealand',
    continent: 'Oceania',
    currency: 'NZD',
    currencySymbol: 'NZ$ ',
    avgCostMinUSD: 6200,
    avgCostMaxUSD: 8900,
    costPerWattUSD: 1.25,
    localCostRange: 'NZ$ 9,800 - NZ$ 14,200',
    paybackYears: 5.4,
    annualSavingsUSD: 1620,
    sunshineHoursPerYear: 2100,
    annualYieldKwhPerKw: 1420,
    slug: 'solar-installation-cost-in-auckland',
    subsidyName: 'EECA Warmer Kiwi Homes & Bank 0% Green Clean Energy Loans',
    subsidySummary: '0% to 1% green home loan top-ups from major NZ banks (ANZ, ASB, Westpac), plus Vector solar export tariffs.',
    subsidyPercentage: 20,
    subsidyDetails: {
      program: 'NZ Green Clean Energy Loan Initiatives & SEANZ Certification',
      authority: 'EECA (Energy Efficiency and Conservation Authority) & Vector',
      incentiveType: '0% Interest 3-5 Year Green Loans up to NZ$50,000 + Export Netting',
      maxBenefit: 'NZ$3,500+ Interest Savings + ~8-13c/kWh Export Credits',
      eligibility: 'Homeowners installing through SEANZ-accredited solar specialists',
    },
    breakdown: {
      panels: { name: 'Hyundai / LONGi 430W High-Efficiency Monocrystalline', cost: 2900, share: 38 },
      inverter: { name: 'Enphase / Fronius 5kW Inverter System', cost: 1700, share: 22 },
      racking: { name: 'Terrasmart / Clenergy High-Wind Rated Cyclone Clamps', cost: 850, share: 11 },
      electrical: { name: 'Weather-rated isolators, fire switch & Vector import/export meter', cost: 950, share: 12 },
      permitsLabor: { name: 'SEANZ Master Electrician Installation & Vector Connection Sign-Off', cost: 1300, share: 17 },
    },
    peerCities: [
      { city: 'Auckland', country: 'New Zealand', costPerWattUSD: 1.25, color: '#2563eb', isCurrent: true },
      { city: 'Wellington', country: 'New Zealand', costPerWattUSD: 1.30, color: '#94a3b8' },
      { city: 'Christchurch', country: 'New Zealand', costPerWattUSD: 1.28, color: '#94a3b8' },
      { city: 'Hamilton', country: 'New Zealand', costPerWattUSD: 1.22, color: '#94a3b8' },
    ],
  },
];

// Top Global Installers Dataset (Empty by default unless verified genuine records exist)
export const GLOBAL_INSTALLERS: Record<string, InstallerRecord[]> = {};

// Global Home FAQs
export const GLOBAL_HOME_FAQS: FaqRecord[] = [
  {
    id: 'faq-g-1',
    page_id: 'home',
    question: 'How much does solar installation cost on average worldwide in 2026?',
    answer: 'In 2026, the average global residential solar installation cost ranges between $1.00 and $2.85 per Watt DC ($1,000 to $2,850 per kW) depending on region, labor rates, and local permitting. With standard national tax credits (such as the US 30% ITC or European 0% VAT), average payback periods have dropped to 3.5 – 6.5 years globally.',
    display_order: 1,
  },
  {
    id: 'faq-g-2',
    page_id: 'home',
    question: 'How much roof space do I need for a residential solar system?',
    answer: 'Modern high-efficiency solar modules (400W–550W) require approximately 55 to 65 square feet (5.1 to 6.0 square meters) of unshaded roof space per kilowatt (kW). A standard 5kW residential system typically requires around 275 to 325 sq ft (25 to 30 sq m) of roof area.',
    display_order: 2,
  },
  {
    id: 'faq-g-3',
    page_id: 'home',
    question: 'What are the main government subsidies and solar incentives available in 2026?',
    answer: 'Top global incentives include the 30% Federal ITC Tax Credit in the United States, 0% VAT on residential photovoltaic equipment in the UK, Germany, and Netherlands, Small-scale Technology Certificates (STC point-of-sale rebates) in Australia, and direct net metering schemes across Europe, the Middle East, and Asia.',
    display_order: 3,
  },
  {
    id: 'faq-g-4',
    page_id: 'home',
    question: 'What is the lifespan and warranty of tier-1 solar panel systems?',
    answer: 'Tier-1 monocrystalline panels feature 25 to 30-year linear power performance warranties (guaranteeing 85%+ output at year 25) and 12 to 25-year product workmanship warranties. Quality string and microinverters typically carry 10 to 25-year manufacturer warranties.',
    display_order: 4,
  },
  {
    id: 'faq-g-5',
    page_id: 'home',
    question: 'How do solar battery storage systems affect overall cost and ROI?',
    answer: 'Adding a 5kWh to 15kWh lithium-ion battery system typically adds $4,500 to $9,500 to the total installation. While batteries lengthen the initial payback period by 1 to 2 years, they provide complete power resilience during grid outages and allow 90%+ self-consumption in time-of-use tariff zones.',
    display_order: 5,
  },
];

// Helper to convert global cities into PageRecords
export function getStaticPages(): PageRecord[] {
  const pages: PageRecord[] = [];

  // 14 City Pages
  GLOBAL_CITIES.forEach((c, idx) => {
    pages.push({
      id: `city-${c.city.toLowerCase().replace(/\s+/g, '-')}`,
      title: `Solar Installation Cost in ${c.city} (2026 Complete Guide)`,
      slug: c.slug,
      template_type: 'city',
      city: c.city,
      state: c.country,
      avg_cost_min: c.avgCostMinUSD,
      avg_cost_max: c.avgCostMaxUSD,
      cost_per_watt: c.costPerWattUSD,
      payback_years: c.paybackYears,
      savings_per_year: c.annualSavingsUSD,
      subsidy_amount: 0,
      section_order: [
        'hero',
        'quick_stats',
        'cost_breakdown',
        'calculator',
        'system_comparison',
        'city_comparison_chart',
        'subsidy',
        'installers',
        'faq',
        'cta',
      ],
      status: 'published',
      meta_title: `Solar Installation Cost in ${c.city} 2026 | Prices, Subsidies & Top Installers`,
      meta_description: `Find accurate 2026 solar installation costs in ${c.city}, ${c.country}. Explore 1kW-10kW pricing (${c.localCostRange}), ${c.subsidyName}, and top-rated local installers.`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
  });

  // System Size Pages (1kW to 10kW)
  const sizes = [1, 2, 3, 4, 5, 6, 8, 10];
  sizes.forEach((kw) => {
    const minUSD = kw * 1250;
    const maxUSD = kw * 1750;
    const avgSavings = Math.round(kw * 380);
    const subsidy = Math.round(minUSD * 0.25);
    pages.push({
      id: `size-${kw}kw`,
      title: `${kw}kW Solar System Cost 2026 (Global Price & Output Guide)`,
      slug: `${kw}kw-solar-system-cost`,
      template_type: 'system_size',
      system_size_kw: kw,
      avg_cost_min: minUSD,
      avg_cost_max: maxUSD,
      cost_per_watt: 1.45,
      payback_years: 4.8,
      savings_per_year: avgSavings,
      subsidy_amount: subsidy,
      section_order: ['hero', 'specs_card', 'calculator', 'system_comparison', 'city_size_table', 'faq', 'cta'],
      status: 'published',
      meta_title: `${kw}kW Solar System Cost 2026 | Global Price, Production & ROI Guide`,
      meta_description: `Complete 2026 cost guide for a ${kw}kW residential solar power system. Compare gross prices ($${minUSD.toLocaleString()} - $${maxUSD.toLocaleString()}), daily kWh generation, and payback period.`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    // Also support the legacy slug for existing links
    if (kw === 3 || kw === 5 || kw === 10 || kw === 2) {
      pages.push({
        id: `size-${kw}kw-alias`,
        title: `${kw}kW Solar System Installation Cost 2026`,
        slug: `${kw}kw-solar-system-cost-in-india`,
        template_type: 'system_size',
        system_size_kw: kw,
        avg_cost_min: minUSD,
        avg_cost_max: maxUSD,
        cost_per_watt: 1.45,
        payback_years: 4.8,
        savings_per_year: avgSavings,
        subsidy_amount: subsidy,
        section_order: ['hero', 'specs_card', 'calculator', 'system_comparison', 'city_size_table', 'faq', 'cta'],
        status: 'published',
        meta_title: `${kw}kW Solar System Cost 2026 | Global Price, Production & ROI Guide`,
        meta_description: `Complete 2026 cost guide for a ${kw}kW residential solar power system. Compare prices, daily kWh generation, and payback period.`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    }
  });

  // Roof Area Pages
  const roofSizes = [800, 1000, 1200, 1500, 2000, 3000];
  roofSizes.forEach((sqft) => {
    const recommendedKw = Math.max(2, Math.round((sqft * 0.45) / 90));
    const minUSD = recommendedKw * 1280;
    const maxUSD = recommendedKw * 1720;
    const avgSavings = Math.round(recommendedKw * 390);
    const subsidy = Math.round(minUSD * 0.25);
    pages.push({
      id: `sqft-${sqft}`,
      title: `Solar Installation Cost for ${sqft} Sq Ft House (2026 Guide)`,
      slug: `solar-installation-cost-for-${sqft}-sqft-house`,
      template_type: 'sqft',
      sqft: sqft,
      system_size_kw: recommendedKw,
      avg_cost_min: minUSD,
      avg_cost_max: maxUSD,
      cost_per_watt: 1.42,
      payback_years: 4.9,
      savings_per_year: avgSavings,
      subsidy_amount: subsidy,
      section_order: ['hero', 'specs_card', 'savings_chart', 'roi_chart', 'calculator', 'faq', 'cta'],
      status: 'published',
      meta_title: `Solar Installation Cost for ${sqft} Sq Ft House 2026 | System Size & ROI`,
      meta_description: `How much does solar cost for a ${sqft} sq ft house in 2026? Find recommended capacity (${recommendedKw}kW), required panel count, bill savings, and estimated payback.`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
  });

  return pages;
}

export function getStaticPageBySlug(slug: string): PageRecord | undefined {
  const all = getStaticPages();
  return all.find((p) => p.slug === slug);
}

export function getStaticFaqsByPageId(pageId: string, city?: string): FaqRecord[] {
  if (pageId === 'home') return GLOBAL_HOME_FAQS;

  const normalize = (str: string) =>
    str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, ' ')
      .trim();

  const cleanCity = city ? normalize(city) : '';
  const cleanPageId = normalize(pageId);

  // 1. Direct or fuzzy match in CITY_IN_DEPTH_FAQS
  if (city && CITY_IN_DEPTH_FAQS[city]) {
    return CITY_IN_DEPTH_FAQS[city].map((f, idx) => ({
      id: `faq-${pageId}-${idx + 1}`,
      page_id: pageId,
      question: f.question,
      answer: f.answer,
      display_order: idx + 1,
    }));
  }

  for (const [cityNameKey, faqList] of Object.entries(CITY_IN_DEPTH_FAQS)) {
    const normKey = normalize(cityNameKey);
    const keyWords = normKey.split(' ').filter(Boolean);
    const cityMatches = cleanCity && (cleanCity === normKey || keyWords.some((w) => cleanCity.includes(w)) || normKey.includes(cleanCity));
    const pageMatches = keyWords.every((w) => cleanPageId.includes(w));

    if (cityMatches || pageMatches) {
      return faqList.map((f, idx) => ({
        id: `faq-${pageId}-${idx + 1}`,
        page_id: pageId,
        question: f.question,
        answer: f.answer,
        display_order: idx + 1,
      }));
    }
  }

  // 2. Check if it's a system size page (e.g. 'size-5kw' or 'page-3kw' or '5kw-solar-system')
  const sizeMatch = pageId.match(/(\d+)\s*kw/i);
  if (sizeMatch) {
    const kwNum = parseInt(sizeMatch[1], 10);
    if (SYSTEM_SIZE_IN_DEPTH_FAQS[kwNum]) {
      return SYSTEM_SIZE_IN_DEPTH_FAQS[kwNum].map((f, idx) => ({
        id: `faq-${pageId}-${idx + 1}`,
        page_id: pageId,
        question: f.question,
        answer: f.answer,
        display_order: idx + 1,
      }));
    }
  }

  // 3. Check if it's a sqft page (e.g. 'sqft-2000' or 'page-2000sqft')
  const sqftMatch = pageId.match(/(\d+)\s*sqft|sqft[-_](\d+)/i);
  if (sqftMatch) {
    const sqftNum = parseInt(sqftMatch[1] || sqftMatch[2], 10);
    if (SQFT_IN_DEPTH_FAQS[sqftNum]) {
      return SQFT_IN_DEPTH_FAQS[sqftNum].map((f, idx) => ({
        id: `faq-${pageId}-${idx + 1}`,
        page_id: pageId,
        question: f.question,
        answer: f.answer,
        display_order: idx + 1,
      }));
    }
  }

  // 4. Synthesize micro-localized FAQs based on CityRecord if found
  const cityRec = GLOBAL_CITIES.find((c) => {
    const normC = normalize(c.city);
    return (
      (cleanCity && (cleanCity === normC || cleanCity.includes(normC))) ||
      cleanPageId.includes(normC) ||
      cleanPageId.includes(normalize(c.slug))
    );
  });

  if (cityRec) {
    return [
      {
        id: `faq-${pageId}-1`,
        page_id: pageId,
        question: `How much does rooftop solar installation cost in ${cityRec.city}, ${cityRec.country} in 2026?`,
        answer: `In 2026, residential solar installations in ${cityRec.city} average ${cityRec.localCostRange}. Factoring in available local subsidies and clean energy incentives (${cityRec.subsidyName}), the net out-of-pocket cost is significantly reduced, yielding an estimated payback period of ${cityRec.paybackYears} years.`,
        display_order: 1,
      },
      {
        id: `faq-${pageId}-2`,
        page_id: pageId,
        question: `What clean energy subsidies and rebates apply in ${cityRec.city}?`,
        answer: `${cityRec.subsidySummary} Administered through ${cityRec.subsidyDetails.authority || 'local authorities'}, homeowners can claim ${cityRec.subsidyDetails.maxBenefit || 'significant incentive credits'} under the ${cityRec.subsidyDetails.program || cityRec.subsidyName}.`,
        display_order: 2,
      },
      {
        id: `faq-${pageId}-3`,
        page_id: pageId,
        question: `How much solar electricity will a system in ${cityRec.city} generate?`,
        answer: `${cityRec.city} receives approximately ${cityRec.sunshineHoursPerYear.toLocaleString()} sunshine hours annually, delivering an average yield of ${cityRec.annualYieldKwhPerKw.toLocaleString()} kWh per installed kWp. A standard 6kW residential array generates over ${(cityRec.annualYieldKwhPerKw * 6).toLocaleString()} kWh of clean electricity per year.`,
        display_order: 3,
      },
      {
        id: `faq-${pageId}-4`,
        page_id: pageId,
        question: `What is the estimated financial payback period for solar in ${cityRec.city}?`,
        answer: `With local electricity retail tariffs and incentives, homeowners in ${cityRec.city} recover their complete capital investment within ${cityRec.paybackYears} years, generating an estimated $${cityRec.annualSavingsUSD.toLocaleString()} / year in utility bill reductions over a 25-year panel warranty life.`,
        display_order: 4,
      },
      {
        id: `faq-${pageId}-5`,
        page_id: pageId,
        question: `What grid interconnection protocols apply in ${cityRec.city}?`,
        answer: `Installations in ${cityRec.city} require compliance with local grid codes, bi-directional net metering or feed-in export metering with local network operators, and sign-off by licensed electrical engineers.`,
        display_order: 5,
      },
      {
        id: `faq-${pageId}-6`,
        page_id: pageId,
        question: `What equipment and weather engineering is needed in ${cityRec.city}?`,
        answer: `Installations in ${cityRec.city} utilize ${cityRec.breakdown.panels.name} paired with ${cityRec.breakdown.inverter.name} and ${cityRec.breakdown.racking.name} to withstand local weather conditions and maximize generation.`,
        display_order: 6,
      }
    ];
  }

  const fallbackCity = city || 'this location';
  return [
    {
      id: `faq-${pageId}-1`,
      page_id: pageId,
      question: `How much does rooftop solar installation cost in ${fallbackCity} in 2026?`,
      answer: `In 2026, an average 5kW to 6kW residential solar power installation in ${fallbackCity} typically costs between $6,500 and $18,000 gross before local subsidies and clean energy tax credits. After applying available government rebates, net out-of-pocket costs are reduced by 20% to 35%.`,
      display_order: 1,
    },
    {
      id: `faq-${pageId}-2`,
      page_id: pageId,
      question: `What subsidies, tax credits, and rebates apply in ${fallbackCity}?`,
      answer: `Homeowners in ${fallbackCity} can benefit from dedicated clean energy tax incentives, zero or reduced VAT on solar hardware, and local utility net metering or export feed-in tariffs that credit your account for surplus electricity sent back to the grid.`,
      display_order: 2,
    },
    {
      id: `faq-${pageId}-3`,
      page_id: pageId,
      question: `What is the estimated solar payback period in ${fallbackCity}?`,
      answer: `With strong local sunlight hours and electricity tariffs, residential solar installations in ${fallbackCity} achieve a full return on investment (ROI payback) within 3.5 to 6.8 years, delivering 20+ subsequent years of virtually free solar power.`,
      display_order: 3,
    },
    {
      id: `faq-${pageId}-4`,
      page_id: pageId,
      question: `How many solar panels do I need for my home in ${fallbackCity}?`,
      answer: `Most residential properties in ${fallbackCity} install 10 to 18 high-efficiency monocrystalline panels (400W–550W each), requiring between 250 and 450 square feet (23–42 square meters) of unobstructed, unshaded roof space.`,
      display_order: 4,
    },
  ];
}

export function getStaticInstallers(city?: string): InstallerRecord[] {
  if (!city) return [];
  if (GLOBAL_INSTALLERS[city]) return GLOBAL_INSTALLERS[city];
  return [];
}
