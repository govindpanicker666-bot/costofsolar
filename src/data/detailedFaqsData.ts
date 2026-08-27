import { FaqRecord } from '../types';

export const CITY_IN_DEPTH_FAQS: Record<string, { question: string; answer: string }[]> = {
  'Los Angeles': [
    {
      question: 'How much does solar panel installation cost in Los Angeles in 2026?',
      answer: 'In Los Angeles, CA, the average gross cost to install a residential solar system in 2026 is between $2.65 and $3.10 per watt. For a standard 6kW residential system, the gross installation price ranges from $15,900 to $18,600. After claiming the 30% Federal Residential Clean Energy Tax Credit (Section 25D), your net out-of-pocket investment drops to $11,130 – $13,020. Homes pairing solar with battery storage (such as a 10kWh Enphase or Tesla Powerwall) typically invest an additional $8,500 to $11,000 before federal tax credits.'
    },
    {
      question: 'How does California NEM 3.0 (Solar Billing Plan) impact solar savings in Los Angeles?',
      answer: 'Under the California Public Utilities Commission (CPUC) NEM 3.0 rules enacted for IOU utilities (like Southern California Edison / SCE), export compensation for excess solar energy sent back to the grid was reduced by approximately 75% compared to NEM 2.0 (averaging ~5¢ to 8¢ per kWh instead of ~30¢+). For LADWP municipal utility customers, standard net metering remains more favorable. For SCE customers in Greater LA, pairing solar panels with a battery storage system is now strongly recommended to store daytime generation and avoid high 4 PM–9 PM peak utility time-of-use (TOU) rates.'
    },
    {
      question: 'What solar incentives and tax rebates apply in Los Angeles in 2026?',
      answer: 'Los Angeles homeowners qualify for three major incentive mechanisms: (1) The uncapped 30% Federal Investment Tax Credit (ITC) applicable to both solar and energy storage; (2) California Self-Generation Incentive Program (SGIP) battery storage rebates, which provide $150 to $1,000/kWh for eligible equity/resilience territories; and (3) LADWP or SCE Solar Interconnection programs and property tax exemptions that prevent solar additions from triggering property re-assessments.'
    },
    {
      question: 'What is the realistic payback period for solar in Los Angeles?',
      answer: 'Given Los Angeles’s exceptional solar insolation (over 3,200 sunshine hours annually) and California’s elevated electricity rates (ranging from $0.28 to $0.44 per kWh), the estimated payback period for a standalone solar system in LA is 4.8 to 5.6 years. For solar-plus-storage systems under NEM 3.0, the payback period averages 6.2 to 7.1 years, after which homeowners enjoy 18+ years of virtually zero-cost self-generated electricity.'
    },
    {
      question: 'How many solar panels are needed to power an average Los Angeles home?',
      answer: 'An average 1,800 to 2,400 sq ft single-family home in Los Angeles consumes roughly 700 to 950 kWh of electricity per month (higher if running central HVAC in the San Fernando Valley or charging an electric vehicle). This requires a 6kW to 8kW solar array, which translates to 14 to 18 high-efficiency 430W–450W monocrystalline panels, requiring approximately 300 to 420 square feet of unobstructed, south- or west-facing roof area.'
    },
    {
      question: 'Do I need a main electrical panel upgrade (MPU) for solar in Los Angeles?',
      answer: 'Many older Los Angeles homes (built prior to 1980 in areas like Pasadena, Silver Lake, or the Valley) have 100-amp electrical panels. Installing a 6kW+ solar array or adding Level 2 EV chargers often requires upgrading to a 200-amp main service panel (costing $2,000 to $3,500). Fortunately, panel upgrades completed concurrently with solar qualify for the 30% federal tax credit under the Inflation Reduction Act.'
    },
    {
      question: 'What permitting and inspection steps are required in the City of Los Angeles?',
      answer: 'Solar installations in LA require permitting through the Los Angeles Department of Building and Safety (LADBS) or local county jurisdiction, followed by LADWP or SCE interconnection approval (Permission to Operate / PTO). Most LADBS residential permits utilize the automated SolarAPP+ platform, enabling same-day permit issuance, with physical installation taking 1–2 days and final utility PTO taking 2 to 4 weeks.'
    }
  ],

  'Toronto': [
    {
      question: 'How much does solar panel installation cost in Toronto in 2026?',
      answer: 'In Toronto and the Greater Toronto Area (GTA), a standard 6kW to 8kW residential solar installation in 2026 costs between C$12,900 and C$17,800 gross (approximately C$2.10 to C$2.45 per watt). After utilizing federal interest-free clean energy financing and municipal energy loan programs, homeowners can finance their system at C$0 down with monthly energy savings that exceed their loan repayments.'
    },
    {
      question: 'What solar incentives and 0% interest loans are available in Toronto and Ontario?',
      answer: 'Toronto homeowners can access three key incentive and financing programs: (1) The Canada Greener Homes 0% Interest Loan, offering up to C$40,000 interest-free over a 10-year repayment term through CMHC; (2) The City of Toronto Home Energy Loan Program (HELP), providing low-interest financing attached to property taxes; and (3) Toronto Hydro & Hydro One Net Metering with 1:1 kilowatt-hour billing credits.'
    },
    {
      question: 'How does Net Metering work with Toronto Hydro and Hydro One?',
      answer: 'Under Ontario Energy Board (OEB) Net Metering regulations, Toronto Hydro installs a bi-directional electricity meter at your property. During sunny summer months, your surplus generation is fed into the Ontario grid, creating dollar credits on your electricity bill that carry forward for up to 12 months to offset higher winter heating and lighting bills.'
    },
    {
      question: 'How do Toronto winters, freezing temperatures, and heavy snow affect solar panels?',
      answer: 'Solar panels in Toronto are installed at an optimal steep tilt (32° to 38°) facing south. Dark anti-reflective solar glass naturally absorbs heat, causing snow to melt and slide off rapidly during sunny winter days. Furthermore, photovoltaic cells operate with higher electrical efficiency in cold temperatures (yielding a ~0.3% power boost per degree below 25°C), generating clean power whenever daylight is present.'
    },
    {
      question: 'What electrical and structural permits are required in Ontario?',
      answer: 'All residential solar installations in Toronto require an Electrical Safety Authority (ESA) Plan Review and Certificate of Inspection. Your certified installer will also conduct an engineering roof load assessment to ensure compliance with Ontario Building Code (OBC) snow and ice drift standards, followed by Toronto Hydro Form C connection sign-off.'
    },
    {
      question: 'What is the estimated payback period for solar in the Greater Toronto Area?',
      answer: 'With rising Ontario Time-of-Use (TOU) and Ultra-Low Overnight (ULO) electricity rates, a 6.5kW solar array in Toronto saves between C$1,450 and C$1,850 per year on electricity bills, delivering a full capital payback period of 6.5 to 7.8 years with 25+ years of subsequent free power.'
    }
  ],

  'London': [
    {
      question: 'How much does solar panel installation cost in London in 2026?',
      answer: 'In Greater London and South East England, a standard 4kW to 5kW residential solar installation in 2026 costs between £5,800 and £7,900 gross (approximately £1.35 to £1.75 per watt). Because domestic solar and battery storage systems currently benefit from 0% VAT in the UK until 2027, homeowners save roughly £1,200 to £1,600 immediately at invoice compared to standard VAT rates. Adding a 5.2kWh to 9.5kWh GivEnergy or Tesla Powerwall battery adds £3,500 to £6,000 to the total installation.'
    },
    {
      question: 'How does the UK Smart Export Guarantee (SEG) work for London homeowners?',
      answer: 'Under the Smart Export Guarantee (SEG), licensed electricity suppliers with over 150,000 customers are legally required to pay homeowners for every kilowatt-hour (kWh) of clean solar power exported back to the grid. In London, top SEG export tariffs (such as Octopus Outgoing or OVO) pay between 12p and 16.5p per kWh for exported power, yielding an extra £180 to £340 annually in export revenue.'
    },
    {
      question: 'Is London sunny enough to make solar panels financially viable?',
      answer: 'Yes. London receives approximately 1,650 hours of sunlight per year, delivering an annual yield of 1,020 to 1,080 kWh per installed kilowatt-peak (kWp). A 4kW array produces roughly 4,100 to 4,300 kWh annually. Because UK grid retail electricity prices remain between 24p and 29p/kWh, replacing imported grid units with self-generated solar generates £850 to £1,250 in annual bill savings.'
    },
    {
      question: 'What is the estimated payback period for solar in London?',
      answer: 'A residential solar installation in London delivers a payback period of 5.8 to 6.9 years without a battery, and 7.2 to 8.5 years with battery storage. Over a 25-year system lifespan, a London homeowner will save an estimated £22,000 to £34,000 in cumulative electricity bills, delivering an internal rate of return (IRR) exceeding 12%.'
    },
    {
      question: 'Do I need planning permission for solar panels on a London home?',
      answer: 'For most London properties, rooftop solar installations are classified as Permitted Development and do not require full planning permission. However, if your home is a Grade I or II Listed Building, sits in a Conservation Area (common in Kensington, Westminster, Islington, or Richmond) where panels face a highway, or involves flat roof raised mounts, prior approval or Listed Building Consent from your local London borough council is required.'
    },
    {
      question: 'What is the importance of MCS Certification and DNO approval in London?',
      answer: 'To qualify for SEG export tariffs and home insurance protection, your system must be installed by an MCS (Microgeneration Certification Scheme) certified engineer. Additionally, your installer must submit a G98 notification (for systems ≤3.68kW single-phase) or G99 prior-application (for larger systems or batteries) to the local Distribution Network Operator (UK Power Networks in London).'
    }
  ],

  'Sydney': [
    {
      question: 'How much does solar panel installation cost in Sydney in 2026?',
      answer: 'Sydney enjoys some of the most competitive solar installation prices globally due to a highly developed EPC supply chain and federal subsidies. In 2026, a quality 6.6kW residential solar system costs between A$5,200 and A$7,800 out-of-pocket (after factoring in A$2,400 to A$3,200 in federal STC rebate discounts). Systems utilizing premium European inverters (Fronius/SMA) or microinverters (Enphase) range from A$7,200 to A$9,500.'
    },
    {
      question: 'How does the Australian Federal STC solar rebate work in Sydney?',
      answer: 'The Small-scale Renewable Energy Scheme (SRES) creates Small-scale Technology Certificates (STCs) based on the expected clean energy production of your system over its deeming period. In Sydney (Zone 3 rating), a 6.6kW system generates approximately 70–80 STCs, translating to an immediate point-of-sale invoice reduction of A$2,400 to A$3,200, which your Clean Energy Council (CEC) accredited installer applies directly to your quote.'
    },
    {
      question: 'What is the solar feed-in tariff (FiT) in New South Wales?',
      answer: 'In NSW, electricity retailers (Origin, AGL, EnergyAustralia, Amber) offer solar feed-in tariffs typically between 5¢ and 12¢ per kWh for exported electricity. Because retail electricity purchase rates range from 28¢ to 38¢/kWh, Sydney households maximize financial ROI by maximizing daytime self-consumption (running pool pumps, air conditioners, and EV chargers during peak solar hours).'
    },
    {
      question: 'What is the payback period for a 6.6kW solar system in Sydney?',
      answer: 'Due to high solar irradiance (over 2,650 sunshine hours annually) and low net equipment costs, Sydney solar systems deliver the fastest payback in the developed world: typically 3.2 to 4.2 years. A typical Sydney family saves A$1,400 to A$2,200 annually on electricity bills.'
    },
    {
      question: 'Should I install a solar battery in Sydney in 2026?',
      answer: 'With the NSW Peak Demand Reduction Scheme (PDRS) battery incentives and the Federal battery programs offering up to A$1,600 to A$2,400 in battery rebates, adding a 10kWh battery (costing A$8,500–A$12,000 net) has become increasingly attractive. Batteries enable 85%+ energy self-sufficiency and protect against grid blackouts during storm seasons.'
    },
    {
      question: 'What approvals are needed to connect solar to the Ausgrid or Endeavour Energy grid?',
      answer: 'Your installer must secure grid connection approval from your local Sydney network distributor (Ausgrid for Eastern suburbs, CBD, and North Shore; Endeavour Energy for Western Sydney; or Essential Energy for regional fringes). Systems up to 5kW single-phase export qualify for fast-track automatic connection.'
    }
  ],

  'Berlin': [
    {
      question: 'Wie viel kostet eine Photovoltaikanlage in Berlin im Jahr 2026? (Cost in Berlin)',
      answer: 'In Berlin and Brandenburg, a turnkey 6kWp to 8kWp residential rooftop PV system in 2026 costs between €7,200 and €10,800 gross (approximately €1.20 to €1.55 per watt-peak). Thanks to the nationwide 0% Mehrwertsteuer (Zero VAT) on residential photovoltaic components and storage systems under the German Annual Tax Act (JStG § 12 Abs. 3 UStG), homeowners save 19% upfront.'
    },
    {
      question: 'Welche Förderungen gibt es in Berlin (SolarPlus & EEG Einspeisevergütung)?',
      answer: 'Berlin homeowners can access multiple incentives: (1) 0% VAT on hardware and installation; (2) The Berlin state subsidy program "SolarPlus" through IBB, which offers grants of up to €15,300 for electrical storage systems paired with new PV; and (3) The guaranteed 20-year EEG (Erneuerbare-Energien-Gesetz) feed-in tariff of ~8.11 ct/kWh for partial feeding systems up to 10kWp.'
    },
    {
      question: 'Wie hoch ist die Amortisationszeit für Solaranlagen in Berlin?',
      answer: 'Given German household electricity prices of 36 to 42 ct/kWh and Berlin’s annual yield of 1,020 to 1,080 kWh/kWp, a typical residential system achieves full financial payback within 6.2 to 7.4 years. With battery storage (achieving 70–80% Eigenverbrauch / self-consumption), annual bill savings exceed €1,400 to €1,900.'
    },
    {
      question: 'Welche Anforderungen gelten für die Netzanmeldung bei Stromnetz Berlin?',
      answer: 'All PV installations in Berlin must be registered with the federal registry (Marktstammdatenregister der Bundesnetzagentur / MaStR) and approved by the local grid operator (Stromnetz Berlin). The installation must be executed and signed off by a certified electrical master craftsman (eingetragener Elektroinstallateur / Meisterbetrieb).'
    },
    {
      question: 'Müssen Solaranlagen in Berlin auf denkmalgeschützten Gebäuden genehmigt werden?',
      answer: 'Under Berlin’s Solargesetz and reformed heritage protection laws (Denkmalschutzgesetz), solar panels are strongly favored and generally approved on historic roofs as long as visual harmony and non-reflective all-black modules are utilized.'
    },
    {
      question: 'Welche Solarmodule und Wechselrichter sind für das Berliner Klima optimal?',
      answer: 'High-efficiency bifacial glass-glass modules (such as Meyer Burger, Viessmann, or Luxor) with high diffuse light sensitivity perform exceptionally well during overcast Central European autumn and winter months, paired with SMA Sunny Boy or Fronius GEN24 hybrid inverters.'
    }
  ],

  'Dubai': [
    {
      question: 'How much does rooftop solar installation cost in Dubai in 2026?',
      answer: 'In Dubai, UAE, residential villa solar installations in 2026 range from AED 21,500 to AED 32,000 for a standard 6kW to 8kW system (approximately AED 3.60 to AED 4.20 per watt / $0.98 to $1.15 USD/W). Due to extreme desert temperatures, Tier-1 bifacial panels with low temperature coefficients (-0.29%/°C) and IP65+ dust-resistant inverters are standard.'
    },
    {
      question: 'How does the DEWA Shams Dubai Net Metering Initiative operate?',
      answer: 'Under the Dubai Electricity and Water Authority (DEWA) Shams Dubai program, residential villa owners connect their rooftop solar system directly to DEWA’s grid. Surplus kilowatt-hours generated during daytime are exported to the grid and credited 1:1 against your monthly DEWA electricity consumption bill. Unused credits rollover indefinitely to subsequent billing cycles.'
    },
    {
      question: 'What is the return on investment (ROI) for villa solar in Dubai?',
      answer: 'With over 3,500 hours of high solar radiation annually and typical villa summer air conditioning bills reaching AED 2,500 to AED 4,500/month (DEWA tariff slabs of 23 to 38 fils/kWh), rooftop solar systems in Dubai achieve rapid payback within 3.8 to 4.5 years, generating over AED 6,500 to AED 9,500 in annual utility bill reductions.'
    },
    {
      question: 'What permits and approvals are required by DEWA for Shams Dubai?',
      answer: 'Solar installations must be completed by a DEWA-certified Solar PV Consultant and Contractor. The process involves: (1) DEWA No Objection Certificate (NOC); (2) Design Approval; (3) Site Installation; (4) DEWA Physical Inspection & Meter Replacement with a Smart Bi-directional Meter; and (5) Final Grid Connection Certification.'
    },
    {
      question: 'How do extreme desert heat and dust storms affect solar performance in Dubai?',
      answer: 'During summer when rooftop ambient temperatures exceed 48°C, panels with superior N-Type TOPCon or Heterojunction (HJT) cells suffer significantly less thermal derating. Hydrophobic anti-soiling coatings and automated cleaning sprinkler systems help mitigate desert dust accumulation and maintain peak 1,780 kWh/kW annual yields.'
    },
    {
      question: 'Can solar power completely eliminate my DEWA electricity bill in a luxury villa?',
      answer: 'A custom 10kW to 15kW rooftop solar array on a 4 to 6-bedroom villa in communities like Arabian Ranches, Palm Jumeirah, Emirates Hills, or Dubai Hills can offset 75% to 90% of your total DEWA electricity consumption, yielding tens of thousands of dirhams in long-term savings.'
    }
  ],

  'Tokyo': [
    {
      question: 'What is the cost of solar panel installation in Tokyo in 2026? (東京都 太陽光発電費用)',
      answer: 'In the Tokyo Metropolitan area, a standard 4kW to 5kW residential solar installation in 2026 costs between ¥1,450,000 and ¥2,100,000 (approximately ¥290,000 to ¥380,000 per kW). Tokyo’s mandatory solar mandate for new single-family homes has expanded installer competition, while generous Tokyo Metropolitan Government (TMG) subsidies significantly reduce net costs.'
    },
    {
      question: 'What subsidies are provided by the Tokyo Metropolitan Government (TMG)?',
      answer: 'Tokyo offers some of Japan’s most generous green subsidies through the "Cool Net Tokyo" initiative: (1) Direct municipal grants of ¥100,000 to ¥120,000 per kW for solar panels (up to ¥360,000–¥450,000); (2) Additional storage battery subsidies of up to ¥120,000/kWh (capped at ¥600,000); and (3) National FIT/FIP export tariffs of ~15 to 16 JPY/kWh.'
    },
    {
      question: 'How does Tokyo’s earthquake and typhoon building code affect solar installation?',
      answer: 'Tokyo building regulations mandate earthquake-rated seismic roof fixings and high wind-load ratings (able to withstand typhoons with gusts exceeding 50 m/s). Systems must include dedicated emergency power sockets (自立運転機能) allowing homeowners to draw up to 1,500W directly from their solar panels during disaster-related power outages.'
    },
    {
      question: 'How does grid interconnection work with TEPCO Power Grid in Tokyo?',
      answer: 'Your JET-certified installer submits a grid interconnection application to TEPCO (Tokyo Electric Power Company). TEPCO installs a bi-directional smart meter and issues a grid agreement for selling surplus electricity under Japan’s Feed-in Tariff (FIT) scheme.'
    },
    {
      question: 'What is the payback period for residential solar in Tokyo?',
      answer: 'Given high Japanese household electricity rates (¥31 to ¥38 per kWh) and TMG Cool Net subsidies reducing upfront costs by up to 40%, a residential solar system in Tokyo delivers an attractive payback period of 5.4 to 6.2 years.'
    },
    {
      question: 'Can solar panels be installed on narrow urban Tokyo houses (狭小住宅)?',
      answer: 'Yes. Specialized high-density panels from Panasonic, Sharp, or SunPower are custom-designed for compact Tokyo hip and gable roofs, maximizing watt-density in footprints as small as 18 to 25 square meters.'
    }
  ],

  'Singapore': [
    {
      question: 'What is the cost of installing solar panels on a landed property in Singapore?',
      answer: 'In Singapore, rooftop solar systems for landed residential properties (inter-terrace, semi-detached, detached bungalows) range from S$11,500 to S$18,500 for a 6kWp to 10kWp system (approx. S$1.85 to S$2.20 per watt-peak). Landed home owners can offset up to 70% to 90% of their monthly SP Group electricity bills.'
    },
    {
      question: 'How does the SP Group Simplified Credit Treatment (SCT) scheme work?',
      answer: 'Under the Energy Market Authority (EMA) and SP Group Simplified Credit Treatment (SCT) scheme for systems below 1MWac, exported solar energy is credited directly against your monthly utilities bill at the prevailing Wholesale Electricity Price (USEP) minus a tiny network settlement fee.'
    },
    {
      question: 'What regulatory approvals are needed from EMA and BCA in Singapore?',
      answer: 'Solar installations require a Licensed Electrical Worker (LEW) to submit single-line diagrams, obtain Building and Construction Authority (BCA) structural clearance if required, and complete SP Services testing for bi-directional smart meter commissioning.'
    },
    {
      question: 'How does Singapore’s tropical climate and cloud cover affect solar yield?',
      answer: 'Singapore experiences high solar irradiance year-round, averaging 1,350 to 1,450 kWh per installed kWp annually. Even during afternoon monsoon showers, modern half-cut monocrystalline modules capture high levels of diffuse daylight.'
    },
    {
      question: 'What is the payback period for landed home solar in Singapore?',
      answer: 'With SP Group residential tariffs averaging 29 to 33 cents/kWh, a landed home solar system delivers payback in 4.8 to 5.8 years, generating S$2,200 to S$3,500 in annual power savings over a 25-year lifespan.'
    },
    {
      question: 'Are there maintenance requirements for solar panels in Singapore?',
      answer: 'Due to Singapore’s frequent tropical rainfall, panels are naturally self-cleaned. An annual inspection by a licensed technician to check DC isolators, invertor heatsinks, and cable integrity ensures optimum safety and performance.'
    }
  ],

  'Cape Town': [
    {
      question: 'How much does residential solar installation cost in Cape Town in 2026?',
      answer: 'In Cape Town, South Africa, a turnkey 5kW to 8kW hybrid solar system with lithium battery storage costs between R 88,000 and R 145,000 (approximately R 14.50 to R 18.50 per watt installed). Hybrid inverter systems (Deye, Sunsynk, or Victron) paired with 5kWh to 10kWh LiFePO4 batteries are the standard setup to provide total load-shedding immunity.'
    },
    {
      question: 'How does Cape Town’s "Cash for Power" SSEG Feed-In scheme work?',
      answer: 'The City of Cape Town is the first municipality in South Africa to pay cash directly to residential and commercial customers for feeding excess solar power into the municipal grid under its Small Scale Embedded Generation (SSEG) program, offering a municipal feed-in tariff plus a cash incentive per kilowatt-hour exported.'
    },
    {
      question: 'What certifications are required for solar in Cape Town?',
      answer: 'All systems must be registered as an SSEG with the City of Cape Town, signed off by a Professional Engineer (Pr.Eng) or registered Technologist, and issued an official Electrical Certificate of Compliance (CoC) and SANS 10142-1 adherence.'
    },
    {
      question: 'How does solar protect homeowners against Eskom load shedding?',
      answer: 'Hybrid solar systems with lithium batteries feature ultra-fast 10-millisecond automatic transfer switches. When Eskom or municipal grid power drops, your home transitions seamlessly to solar and battery backup with zero interruption to appliances, lights, or Wi-Fi.'
    },
    {
      question: 'What is the financial payback period for solar in Cape Town?',
      answer: 'Given municipal electricity tariff hikes and high solar insolation (over 3,100 hours of sunshine annually), a hybrid solar system in Cape Town pays for itself in 3.6 to 4.5 years, providing financial freedom from rising municipal energy bills.'
    },
    {
      question: 'What tax deductions are available in South Africa under Section 12BA?',
      answer: 'South African property owners and businesses can take advantage of enhanced renewable energy tax incentives under Section 12BA of the Income Tax Act, allowing up to 125% upfront tax deduction on clean power equipment in year one.'
    }
  ],

  'New York': [
    {
      question: 'How much does solar panel installation cost in New York in 2026?',
      answer: 'In New York City and New York State, a standard 6kW residential solar system costs between $17,500 and $20,800 gross ($2.90 to $3.45 per watt). However, New York offers some of the highest combined incentives in the United States, reducing net costs by up to 60% to 70%!'
    },
    {
      question: 'What state, federal, and NYC solar tax credits are available?',
      answer: 'New York homeowners benefit from a powerful stack of incentives: (1) 30% Federal Clean Energy Tax Credit (Section 25D); (2) 25% New York State Solar Tax Credit (capped at $5,000); (3) NY-Sun Megawatt Block direct installer rebate; and (4) NYC Property Tax Abatement (PTA) offering up to 30% property tax reduction spread over 4 years.'
    },
    {
      question: 'How does Con Edison Net Metering (VDER) work in New York?',
      answer: 'Con Edison customers participate in Net Energy Metering or the Value of Distributed Energy Resources (VDER) program. Excess kilowatt-hours exported to Con Edison generate dollar credits on your utility bill that roll over indefinitely from month to month.'
    },
    {
      question: 'What are the FDNY roof setback and DOB permitting rules in NYC?',
      answer: 'The Fire Department of New York (FDNY) mandates strict 6-foot clear perimeter paths and 3-foot access pathways on flat rooftops for fire ventilation. Installations require Department of Buildings (DOB) approval and professional architectural PE drawings.'
    },
    {
      question: 'What is the payback period for solar panels in New York?',
      answer: 'Because Con Edison electricity rates are among the highest in the US ($0.26 to $0.34/kWh) and combined tax incentives reduce upfront costs dramatically, payback in New York is typically achieved in just 4.2 to 5.4 years.'
    },
    {
      question: 'Can solar panels be installed on NYC flat roofs and brownstones?',
      answer: 'Yes! Non-penetrating ballasted racking systems or custom dunnage canopy structures are specifically engineered for NYC flat roofs, brownstones, and pre-war residential buildings without piercing the roof waterproofing membrane.'
    }
  ],

  'Phoenix': [
    {
      question: 'How much does solar panel installation cost in Phoenix, Arizona in 2026?',
      answer: 'In Phoenix and the Valley of the Sun, residential solar systems cost between $2.45 and $2.85 per watt. A typical 8kW to 10kW system (sized for heavy summer air conditioning) costs $19,600 to $24,500 gross. After the 30% Federal Tax Credit and Arizona’s $1,000 State Solar Tax Credit, net cost is $12,720 to $16,150.'
    },
    {
      question: 'How do APS and SRP solar billing export plans work in Phoenix?',
      answer: 'APS uses the Resource Comparison Proxy (RCP) export tariff (~7.6¢/kWh credit for exported power), while SRP utilizes Time-of-Use solar price plans (like Customer Generation or Solar Choice) with demand rates. Pairing solar with battery storage allows homeowners to shift energy and completely avoid steep on-peak summer rates.'
    },
    {
      question: 'Why does Phoenix have the highest solar generation potential in the US?',
      answer: 'Phoenix enjoys over 3,850 hours of bright sunshine per year (over 300 clear sunny days) with global horizontal irradiance exceeding 6.0 kWh/m²/day. An 8kW system in Phoenix produces over 14,500 kWh of clean energy annually.'
    },
    {
      question: 'How do high summer ambient temperatures (115°F+) affect solar equipment?',
      answer: 'High heat degrades standard panels faster. Phoenix installations require premium N-Type TOPCon or bifacial panels with low temperature coefficients (-0.29%/°C), high-ventilation racking to allow airflow under panels, and shaded inverter placement.'
    },
    {
      question: 'What is the payback period for solar in Phoenix?',
      answer: 'With huge summer electricity bills ($350 to $650/month) driven by HVAC cooling, solar systems in Phoenix deliver rapid financial payback in 5.1 to 6.2 years.'
    },
    {
      question: 'Are there property tax exemptions for solar additions in Arizona?',
      answer: 'Yes. Arizona law provides 100% property tax exemption on the added value of solar systems, and residential solar equipment is completely exempt from Arizona state sales tax.'
    }
  ],

  'Madrid': [
    {
      question: '¿Cuánto cuesta instalar paneles solares en Madrid en 2026? (Cost in Madrid)',
      answer: 'In Madrid, Spain, a turnkey 4kWp to 6kWp residential solar installation in 2026 costs between €5,800 and €8,400 gross (approximately €1.20 to €1.45 per watt-peak). After claiming regional subsidies and municipal tax rebates, net cost drops to €3,900 – €5,800.'
    },
    {
      question: '¿Qué subvenciones y deducciones IRPF existen en la Comunidad de Madrid?',
      answer: 'Madrid residents benefit from: (1) IRPF Income Tax Deductions of up to 40% to 60% for improving home energy efficiency; (2) IBI (Impuesto sobre Bienes Inmuebles) property tax discounts of up to 50% for 3 to 5 years from the Ayuntamiento de Madrid; and (3) 95% ICIO construction tax reduction.'
    },
    {
      question: '¿Cómo funciona la compensación de excedentes con Iberdrola y Endesa?',
      answer: 'Under Royal Decree 244/2019, excess solar electricity exported to the distribution network (i-DE / e-distribución) is compensated on your monthly bill at the negotiated pool price (~5 to 9 c€/kWh) or through "batería virtual" (virtual battery) accounts that allow you to roll over credits to €0 bills.'
    },
    {
      question: '¿Cuál es el periodo de amortización de las placas solares en Madrid?',
      answer: 'With over 2,900 hours of sunshine annually and electricity rates between 0.18€ and 0.28€/kWh, solar systems in Madrid achieve full payback in 4.2 to 5.2 years.'
    },
    {
      question: '¿Qué trámites y permisos se requieren para legalizar la instalación?',
      answer: 'Installers handle the Declaración Responsable de Obras with the local Ayuntamiento, CIE electrical bulletin submission to the Comunidad de Madrid Industry registry, and distributor activation.'
    },
    {
      question: '¿Cuántos paneles solares necesito para un chalet en Madrid?',
      answer: 'An average single-family chalet consuming 400 to 600 kWh/month requires 8 to 12 monocrystalline panels (4kW to 5.5kW), requiring approximately 20 to 28 square meters of roof area.'
    }
  ],

  'Paris': [
    {
      question: 'Quel est le coût d’une installation de panneaux solaires à Paris en 2026? (Cost in Paris)',
      answer: 'In Paris and the Île-de-France region, a standard 3kWp to 6kWp residential solar installation in 2026 costs between €7,600 and €10,800 gross (approximately €1.45 to €1.75 per watt-peak). After applying state grants and reduced VAT, net cost drops to €6,200 – €8,900.'
    },
    {
      question: 'Quelles sont les aides de l’État (Prime à l’autoconsommation & EDF OA)?',
      answer: 'French homeowners qualify for: (1) La Prime à l’Autoconsommation, a direct investment grant of ~€350/kWp for systems ≤3kWp; (2) Reduced VAT (TVA à taux réduit de 10%); and (3) A 20-year guaranteed feed-in tariff contract with EDF Obligation d’Achat (EDF OA) paying ~13 ct€/kWh for surplus electricity.'
    },
    {
      question: 'Quelles autorisations sont requises en Île-de-France (Mairie & Consuel)?',
      answer: 'Installation requires a Déclaration Préalable de Travaux (DP) approved by your local Mairie (or Architectes des Bâtiments de France / ABF if near historical monuments), an electrical compliance certificate from Consuel, and Enedis grid connection (Raccordement).'
    },
    {
      question: 'Quel est le temps de retour sur investissement à Paris?',
      answer: 'Given French regulated retail electricity tariffs (Tarif Bleu EDF) and state feed-in guarantees, residential solar systems in the Paris metropolitan region achieve full financial payback within 6.8 to 8.2 years.'
    },
    {
      question: 'Peut-on installer des panneaux solaires sur les toits en zinc de Paris?',
      answer: 'Yes. Specialized standing seam clamp mounting systems (sans perforation) allow non-invasive panel installation on traditional Parisian zinc and slate roofs without compromising watertight integrity.'
    },
    {
      question: 'Quelle est la production annuelle d’une installation solaire en Île-de-France?',
      answer: 'A standard 3kWp system produces approximately 3,100 to 3,400 kWh per year, covering 50% to 70% of electricity needs for a standard family household.'
    }
  ],

  'Rome': [
    {
      question: 'Quanto costa un impianto fotovoltaico a Roma nel 2026? (Cost in Rome)',
      answer: 'In Rome and the Lazio region, a turnkey 4kWp to 6kWp residential photovoltaic system in 2026 costs between €6,200 and €8,900 gross (approx. €1.30 to €1.55 per watt-peak). With Italian tax deductions, net cost drops to €3,100 – €4,450.'
    },
    {
      question: 'Quali sono le detrazioni fiscali e incentivi statali disponibili (Bonus Casa 50%)?',
      answer: 'Italian homeowners can access: (1) Detrazione Fiscale 50% (Bonus Ristrutturazioni / Ecobonus) deducted directly from IRPEF personal income taxes over 10 years; (2) Reduced VAT at 10% (IVA agevolata); and (3) GSE (Gestore Servizi Energetici) Scambio sul Posto / Ritiro Dedicato contracts for energy export.'
    },
    {
      question: 'Come funziona la convenzione con il GSE e Areti per l’immissione in rete?',
      answer: 'Your qualified installer submits the Modello Unico to the local distributor (Areti in Rome) and GSE. Areti installs a bi-directional production/exchange meter, and GSE reimburses you for exported energy directly to your bank account.'
    },
    {
      question: 'Qual è il tempo di ammortamento a Roma?',
      answer: 'With over 2,700 hours of Mediterranean sunshine per year and Italian power costs of €0.25 to €0.34/kWh, a residential solar installation in Rome pays for itself in just 4.5 to 5.5 years.'
    },
    {
      question: 'Ci sono vincoli paesaggistici per il centro storico di Roma?',
      answer: 'In historical zones (Zone A / vincolo paesaggistico), approval from the Soprintendenza ai Beni Culturali is required, often necessitating architecturally integrated red-tile solar panels or non-visible flat roof configurations.'
    },
    {
      question: 'Quanto spazio occupa un impianto da 6kW sul tetto a Roma?',
      answer: 'A 6kW system requires 12 to 14 high-efficiency panels (430W–450W each), occupying approximately 24 to 28 square meters of roof area.'
    }
  ],

  'Melbourne': [
    {
      question: 'How much does solar panel installation cost in Melbourne in 2026?',
      answer: 'In Melbourne and Victoria, a 6.6kW residential solar system costs between A$5,200 and A$7,600 net (after Australian Federal STC discounts). Homeowners can also access the Victorian Solar Homes Program for additional state rebates.'
    },
    {
      question: 'What rebates does the Victorian Solar Homes Program offer?',
      answer: 'Eligible Victorian homeowners can receive: (1) A state rebate of up to A$1,400; (2) An interest-free loan matching the rebate amount repaid over 4 years; and (3) Federal STC rebates worth ~A$2,400 to A$3,000 at point of sale.'
    },
    {
      question: 'What is the solar feed-in tariff (FiT) in Victoria?',
      answer: 'The Essential Services Commission (ESC) sets minimum feed-in tariffs in Victoria (typically 4.9¢ to 8.5¢/kWh). Retailers such as Amber, Origin, and AGL offer competitive export buy-backs.'
    },
    {
      question: 'How does Melbourne’s variable weather affect solar production?',
      answer: 'Melbourne’s four-seasons-in-one-day climate produces approximately 1,350 to 1,450 kWh per kWp annually. Monocrystalline N-Type TOPCon panels operate with high performance across cloud cover and diffuse daylight.'
    },
    {
      question: 'What is the payback period for solar in Melbourne?',
      answer: 'Combining federal STCs, Solar Victoria rebates, and retail electricity savings, a 6.6kW solar array in Melbourne achieves full capital payback in just 3.5 to 4.5 years.'
    },
    {
      question: 'What grid approval is required from Victorian distributors (CitiPower/Powercor/Jemena)?',
      answer: 'Your CEC-accredited installer submits a pre-approval connection request to your local distribution network service provider (CitiPower, Powercor, Jemena, AusNet, or United Energy) before physical commissioning.'
    }
  ],

  'Brisbane': [
    {
      question: 'How much does solar panel installation cost in Brisbane in 2026?',
      answer: 'In Brisbane and South East Queensland, a 6.6kW solar system costs between A$4,900 and A$7,200 out-of-pocket after federal STC rebate deductions, making Queensland one of the world’s most cost-effective solar markets.'
    },
    {
      question: 'Why is Brisbane called the "Sunshine State" solar capital?',
      answer: 'Brisbane receives over 2,900 hours of bright sunshine per year (over 300 sunny days). A 6.6kW system produces an enormous 10,200 to 10,800 kWh of clean energy annually, eliminating $1,800 to $2,600 from annual electricity bills.'
    },
    {
      question: 'How does Energex grid interconnection work in Brisbane?',
      answer: 'Energex allows streamlined single-phase export connections up to 5kW inverter capacity (or up to 10kW with dynamic export limits), providing fast online approvals.'
    },
    {
      question: 'What is the payback period for solar in Brisbane?',
      answer: 'Due to exceptional solar irradiance and low equipment costs, payback in Brisbane is achieved in an astonishing 2.8 to 3.6 years.'
    },
    {
      question: 'Are solar panels resilient against Queensland summer storms and cyclones?',
      answer: 'Installations in Queensland must meet Australian Standard AS/NZS 1170.2 wind load engineering requirements, using high-tensile cyclone-rated roof clamps and tempered glass panels rated to resist 25mm hail.'
    },
    {
      question: 'Should Brisbane homeowners add battery storage in 2026?',
      answer: 'With Queensland Battery Booster rebates and declining battery prices, adding a 10kWh battery allows Brisbane families to store daytime solar energy and run air conditioning completely free overnight.'
    }
  ],

  'Amsterdam': [
    {
      question: 'Wat kosten zonnepanelen in Amsterdam in 2026? (Cost in Amsterdam)',
      answer: 'In Amsterdam and North Holland, a turnkey 4kWp to 6kWp residential solar system in 2026 costs between €6,300 and €8,800 gross (approx. €1.25 to €1.50 per watt-peak). Because domestic solar panel purchases in the Netherlands have 0% BTW (Zero VAT), homeowners save 21% instantly.'
    },
    {
      question: 'Hoe werkt de Salderingsregeling en terugleververgoeding in Nederland?',
      answer: 'Under the national Salderingsregeling (netting scheme), all solar electricity you export to the grid is netted 1:1 against your grid electricity consumption on your annual energy invoice. Energy suppliers (Vattenfall, Eneco, Essent) pay a reasonable feed-in compensation for net surplus.'
    },
    {
      question: 'Wat is de terugverdientijd van zonnepanelen in Amsterdam?',
      answer: 'Given high Dutch retail electricity tariffs (averaging €0.30 to €0.38 per kWh) and 0% BTW, residential solar systems in Amsterdam achieve full financial payback within 5.2 to 6.4 years, generating over €1,200 to €1,600 in annual savings.'
    },
    {
      question: 'Welke regels gelden voor zonnepanelen op monumentale Amsterdamse grachtenpanden?',
      answer: 'For historical canal houses (Rijksmonumenten or Gemeentelijk monument) in Amsterdam, an omgevingsvergunning is required from the Gemeente Amsterdam, ensuring panels are not visibly prominent from public canals.'
    },
    {
      question: 'Hoe zit het met de aanmelding bij netbeheerder Liander?',
      answer: 'Your installer registers your solar system on energieleveren.nl for grid operator Liander, which inspects your connection and installs a smart bi-directional meter free of charge if needed.'
    },
    {
      question: 'Welke panelen zijn geschikt voor platte daken in Amsterdam?',
      answer: 'Flat roofs in Amsterdam use East-West or South ballasted aerodynamic mounting systems (such as FlatFix Fusion or ValkPro+), which require no roof penetrations and distribute weight evenly.'
    }
  ],

  'Seoul': [
    {
      question: 'What is the cost of solar panel installation in Seoul in 2026? (서울 태양광 설치 비용)',
      answer: 'In the Seoul Metropolitan area, a standard 3kW to 5kW residential rooftop solar system in 2026 costs between ₩6,500,000 and ₩9,800,000 gross. With government subsidies from the Korea Energy Agency (KEA) and Seoul Metropolitan Government, out-of-pocket costs drop to ₩3,500,000 – ₩5,500,000.'
    },
    {
      question: 'What subsidies are provided by KEA and the Seoul Metropolitan Government?',
      answer: 'South Korea’s Housing Support Project (주택지원사업) managed by the Korea Energy Agency (KEA) provides direct subsidies covering up to 40% to 50% of residential solar installation costs, supplemented by additional district municipal grants in Seoul.'
    },
    {
      question: 'How does KEPCO net metering (상계거래) operate in South Korea?',
      answer: 'Korea Electric Power Corporation (KEPCO) provides net metering (상계거래) where generated solar electricity offsets progressive residential electricity tariff tiers, preventing steep tier-3 electricity bills.'
    },
    {
      question: 'How do Seoul winters and yellow dust (미세먼지) affect solar panels?',
      answer: 'Anti-static and self-cleaning glass coatings prevent yellow dust accumulation, while heavy snow-load certified frames withstand winter conditions, maintaining an annual yield of 1,250 kWh/kWp.'
    },
    {
      question: 'What is the payback period for rooftop solar in Seoul?',
      answer: 'Due to progressive KEPCO residential electricity pricing (where high consumption triggers rates of over ₩300/kWh), a 3kW solar system achieves full financial payback in 4.8 to 5.8 years.'
    },
    {
      question: 'What approvals are required for solar in Seoul?',
      answer: 'Installers must be KEA-certified renewable energy contractors, submitting safety verifications to the local Gu office (구청) and KEPCO branch for grid interconnection.'
    }
  ],

  'São Paulo': [
    {
      question: 'Quanto custa instalar energia solar em São Paulo em 2026? (Cost in São Paulo)',
      answer: 'In São Paulo, Brazil, a turnkey 5kWp to 7kWp residential solar system in 2026 costs between R$ 21,000 and R$ 29,500 gross (approximately R$ 3.80 to R$ 4.50 per watt-peak / $0.85 to $0.98 USD/W). Homeowners can offset up to 85% of their monthly Enel SP electricity bill.'
    },
    {
      question: 'Como funciona o Marco Legal da Geração Distribuída (Lei 14.300)?',
      answer: 'Under Brazil’s Federal Law 14.300/2022, solar systems maintain access to the energy compensation system (Sistema de Compensação de Energia Elétrica), where generated solar credits offset grid consumption with a gradual transition on distribution grid components (Fio B).'
    },
    {
      question: 'Qual é o tempo de retorno (payback) da energia solar em São Paulo?',
      answer: 'With high local electricity tariffs (averaging R$ 0.85 to R$ 1.05 per kWh) and robust solar irradiance (averaging 4.3 kWh/m²/day), a residential solar installation in São Paulo achieves financial payback within 3.6 to 4.4 years.'
    },
    {
      question: 'Quais são as regras de homologação junto à Enel Distribuição São Paulo?',
      answer: 'The technical project must be signed by an engineer registered with CREA-SP (ART) and submitted to Enel SP through their digital portal. Enel performs a technical inspection and installs the bi-directional meter within 15 to 30 days.'
    },
    {
      question: 'Existe isenção de impostos (ICMS e IPTU) para energia solar em SP?',
      answer: 'Yes! Under Convênio ICMS 16/15, energy injected into the grid is exempt from ICMS state tax in São Paulo. Furthermore, कई municipalities in Greater São Paulo offer "IPTU Verde" property tax discounts for solar-equipped homes.'
    },
    {
      question: 'Quantos painéis solares são necessários para uma residência em São Paulo?',
      answer: 'A typical family home consuming 450 to 600 kWh/month requires 10 to 14 monocrystalline panels (5kWp to 7kWp), occupying approximately 22 to 30 square meters of roof area.'
    }
  ],

  'Mexico City': [
    {
      question: '¿Cuánto cuesta instalar paneles solares en Ciudad de México en 2026? (Cost in CDMX)',
      answer: 'In Mexico City (CDMX) and the metropolitan area, a residential solar installation (3kWp to 5kWp) costs between $95,000 and $145,000 MXN gross (approx. $1.10 to $1.35 USD per watt). Systems generate significant savings for households in high-consumption domestic tariffs (Tarifa DAC).'
    },
    {
      question: '¿Cómo funciona el contrato de Medición Neta (Net Metering) con CFE?',
      answer: 'Under the Comisión Federal de Electricidad (CFE) Net Metering contract (Medición Neta), your bidirectional meter tracks imported and exported energy. Excess solar kilowatt-hours are credited 1:1 on your bimonthly CFE electricity bill.'
    },
    {
      question: '¿Por qué la energía solar es tan rentable para usuarios de Tarifa DAC en México?',
      answer: 'CFE Tarifa DAC (Doméstica de Alto Consumo) removes government subsidies, driving electricity rates to over $6.50 – $7.50 MXN per kWh. Installing solar immediately drops households out of Tarifa DAC into subsidized lower tiers, delivering financial payback in just 2.4 to 3.2 years!'
    },
    {
      question: '¿Qué beneficios fiscales ofrece el SAT para paneles solares?',
      answer: 'Under Article 34, section XIII of the Ley del Impuesto Sobre la Renta (LISR), 100% of the investment in renewable energy machinery and equipment is 100% tax-deductible in a single fiscal year.'
    },
    {
      question: '¿Qué trámites y permisos se requieren para la interconexión con CFE?',
      answer: 'Your certified installer handles the Solicitud de Interconexión, UVIE electrical verification if applicable, single-line diagram endorsement, and CFE bidirectional meter installation.'
    },
    {
      question: '¿Cómo afecta la altitud y radiación solar de CDMX a la producción?',
      answer: 'CDMX’s high elevation (2,240 meters above sea level) provides exceptional solar radiation with less atmospheric interference, yielding over 1,650 kWh per installed kWp annually.'
    }
  ],

  'Auckland': [
    {
      question: 'How much does solar panel installation cost in Auckland in 2026?',
      answer: 'In Auckland and the North Island of New Zealand, a standard 5kW to 7kW residential solar installation in 2026 costs between NZ$ 9,800 and NZ$ 14,800 gross (approx. NZ$ 1.85 to NZ$ 2.25 per watt). Quality 5kW grid-tied systems save homeowners NZ$ 1,600 to NZ$ 2,400 annually.'
    },
    {
      question: 'What bank green loans and solar export tariffs are available in NZ?',
      answer: 'Major New Zealand banks (ANZ, ASB, Westpac, BNZ) offer 0% to 1% green home loan top-ups up to NZ$ 50,000 over 3 to 5 years for solar installations. Electricity retailers (Genesis, Mercury, Contact) pay export buy-back rates between 8¢ and 14¢ per kWh.'
    },
    {
      question: 'What grid connection approvals are required with Vector in Auckland?',
      answer: 'Your SEANZ-accredited installer will submit a distributed generation (DG) application to Vector (Auckland’s electricity lines company), arrange an independent electrical inspector sign-off, and install an import/export smart meter.'
    },
    {
      question: 'What is the payback period for solar in Auckland?',
      answer: 'With retail electricity prices in Auckland averaging 30¢ to 38¢ per kWh, a residential solar installation pays for itself in 6.2 to 7.4 years, delivering an internal rate of return exceeding 11%.'
    },
    {
      question: 'How do marine coastal winds in Auckland affect solar mounting?',
      answer: 'Auckland installations require marine-grade anodized aluminum rails and 316 stainless steel roof fasteners rated for Extra High wind zones (NZS 3604) to resist coastal salt spray and high gusts.'
    },
    {
      question: 'How much power does a 5kW solar system generate in Auckland?',
      answer: 'A 5kW system generates approximately 6,800 to 7,300 kWh per year, covering 70% to 90% of an average Kiwi family’s electricity usage.'
    }
  ],

  'Mumbai': [
    {
      question: 'What is the cost of 3kW and 5kW solar installation in Mumbai in 2026?',
      answer: 'In Mumbai, a 3kW on-grid rooftop solar plant in 2026 costs between ₹1,55,000 and ₹1,85,000 gross. Under the PM Surya Ghar Muft Bijli Yojana central subsidy, you receive a direct bank transfer (DBT) subsidy of ₹78,000, reducing the net out-of-pocket price to just ₹77,000 to ₹1,07,000. A 5kW system costs ₹2,60,000 – ₹2,95,000 gross (net ₹1,82,000 – ₹2,17,000 after the ₹78,000 subsidy).'
    },
    {
      question: 'Which electricity distribution companies (DISCOMs) provide solar net metering in Mumbai?',
      answer: 'MSEDCL (Mahavitaran), Tata Power, Adani Electricity Mumbai Limited (AEML), and BEST Undertaking all support rooftop solar net metering across Greater Mumbai and MMR under Maharashtra Electricity Regulatory Commission (MERC) net metering regulations.'
    },
    {
      question: 'How much electricity bill savings can a Mumbai homeowner expect?',
      answer: 'Mumbai electricity tariffs feature steep slab pricing ranging from ₹7.50 to ₹14.50 per unit (kWh). A 3kW system produces approximately 360 to 400 units per month, delivering monthly bill savings of ₹4,200 to ₹5,800, or over ₹50,000 to ₹68,000 annually. Full financial payback is achieved in just 2.8 to 3.4 years.'
    },
    {
      question: 'Are cooperative housing societies (CHSs) in Mumbai eligible for solar subsidies?',
      answer: 'Yes. Under PM Surya Ghar guidelines, Group Housing Societies (GHS) and Resident Welfare Associations (RWAs) in Mumbai are eligible for central subsidies of ₹18,000 per kW (up to 500 kW total capacity) for common area lighting, lifts, water pumps, and electric vehicle charging infrastructure.'
    },
    {
      question: 'How do Mumbai’s monsoon rains and coastal humidity impact solar panels?',
      answer: 'High coastal salinity and heavy monsoons require Tier-1 modules with IP68 junction boxes and salt-mist corrosion resistance (IEC 61701 certified). Mounting frames must be Hot-Dip Galvanized (HDG) with an 80-micron zinc coating and rated for 150 km/h coastal wind gusts.'
    },
    {
      question: 'How long does the PM Surya Ghar net meter installation take in Mumbai?',
      answer: 'Through the national portal and MSEDCL/Tata Power/AEML single-window portals, technical feasibility is granted within 7 days, installation takes 2–3 days, and net meter synchronization with subsidy DBT release takes 20 to 30 days.'
    }
  ],

  'Delhi': [
    {
      question: 'What is the cost of solar rooftop installation in Delhi NCR in 2026?',
      answer: 'In Delhi NCR, a 3kW on-grid rooftop solar system in 2026 costs between ₹1,45,000 and ₹1,75,000 gross. After deducting the ₹78,000 PM Surya Ghar central subsidy, net cost is only ₹67,000 to ₹97,000. For a 5kW system, gross cost is ₹2,40,000 to ₹2,80,000 (net ₹1,62,000 to ₹2,02,000).'
    },
    {
      question: 'What additional incentives does the Delhi Solar Policy 2024–2027 offer?',
      answer: 'In addition to the central ₹78,000 DBT subsidy, the Delhi Government Solar Policy provides a Generation Based Incentive (GBI) of ₹3.00 per unit (kWh) generated for residential consumers for a period of 5 years, paid directly into your electricity bill, plus zero net-metering fees and property tax rebates for solar-equipped homes.'
    },
    {
      question: 'How long does net metering connection take under BSES Rajdhani/Yamuna & TPDDL?',
      answer: 'Delhi DISCOMs (BSES Rajdhani Power Limited, BSES Yamuna, and Tata Power Delhi Distribution Limited) feature automated single-window solar portals. Net meter feasibility inspection and bi-directional meter synchronization are completed within 15 to 21 working days of EPC application submission.'
    },
    {
      question: 'How does winter fog and air pollution (AQI) in Delhi affect solar output?',
      answer: 'During peak winter smog (December–January), daily solar generation can decrease by 20% to 30%. However, Delhi receives over 2,850 hours of bright sunshine during the remaining 10 months, resulting in an annual average yield of 4.2 to 4.5 units per kW per day.'
    },
    {
      question: 'What is the payback period for rooftop solar in Delhi?',
      answer: 'With high summer power consumption due to air conditioners and the ₹3.00/unit Delhi GBI incentive on top of bill savings, payback is achieved in an ultra-fast 2.4 to 2.9 years.'
    },
    {
      question: 'Can solar panels be installed on builder floors and DDA flats in Delhi?',
      answer: 'Yes! Top floor owners with designated roof rights or collective Residents Welfare Associations (RWAs) can install rooftop solar under BSES/TPDDL group net metering and virtual net metering frameworks.'
    }
  ],

  'Ahmedabad': [
    {
      question: 'How much does solar panel installation cost in Ahmedabad in 2026?',
      answer: 'Ahmedabad and Gujarat offer the lowest solar EPC rates in India due to massive local manufacturing ecosystems (Waaree, Adani, Goldi). A 3kW system in 2026 costs ₹1,30,000 to ₹1,60,000 gross. With the ₹78,000 central DBT subsidy, net out-of-pocket expenditure is just ₹52,000 to ₹82,000.'
    },
    {
      question: 'How does net metering work with Torrent Power & UGVCL/DGVCL in Ahmedabad?',
      answer: 'Gujarat Energy Development Agency (GEDA) and local DISCOMs (Torrent Power, UGVCL, DGVCL) operate the fastest solar net meter approvals in the country. Surplus solar units are banked monthly and compensated at the average power purchase cost (APPC) tariff at the end of the financial year.'
    },
    {
      question: 'What is the payback period for solar in Ahmedabad?',
      answer: 'With over 300 clear sunny days annually (solar insolation > 5.4 kWh/m²/day), a 3kW system in Ahmedabad generates over 4,600 units per year. Payback is reached in an incredible 2.4 to 2.9 years.'
    },
    {
      question: 'What structure height is recommended for terrace use in Ahmedabad?',
      answer: 'Elevated galvanized iron (GI) structures (8 to 10 feet high) are popular in Ahmedabad, allowing homeowners to retain full usable terrace space for recreational gatherings and kite flying (Uttarayan).'
    },
    {
      question: 'How to claim the ₹78,000 PM Surya Ghar subsidy in Gujarat?',
      answer: 'Register on pmsuryaghar.gov.in, select Torrent Power or GUVNL DISCOM, choose a registered EPC vendor, complete installation, and receive the ₹78,000 direct bank transfer within 30 days of net meter commissioning.'
    }
  ],

  'Pune': [
    {
      question: 'What is the cost of solar installation in Pune in 2026?',
      answer: 'In Pune and PCMC, a 3kW residential solar installation costs between ₹1,50,000 and ₹1,80,000 gross. With the ₹78,000 PM Surya Ghar DBT subsidy, the net cost drops to ₹72,000 to ₹1,02,000. A 5kW system costs ₹2,55,000 – ₹2,90,000 gross.'
    },
    {
      question: 'How to apply for MSEDCL net metering and PM Surya Ghar subsidy in Pune?',
      answer: 'Apply online through the national portal (pmsuryaghar.gov.in) choosing MSEDCL (Mahavitaran) as the DISCOM. Your empanelled EPC contractor handles technical feasibility, installation, and joint inspection, with the ₹78,000 subsidy credited directly to your bank account within 30 days of net meter commissioning.'
    },
    {
      question: 'What property tax rebates does Pune Municipal Corporation (PMC) offer for solar?',
      answer: 'PMC offers a 5% to 10% rebate on general property tax for residential societies and individual homeowners who install rooftop solar water heaters and grid-tied photovoltaic plants.'
    },
    {
      question: 'What is the payback period for residential solar in Pune?',
      answer: 'Given MSEDCL residential electricity tariff slabs ranging from ₹7.50 to ₹14.00/unit, a 3kW solar system saves ₹45,000 to ₹55,000 annually, paying for itself in 3.0 to 3.5 years.'
    },
    {
      question: 'How do Pune housing societies benefit from solar net metering?',
      answer: 'Housing societies in Baner, Wakad, Kothrud, and Hadapsar install 10kW to 50kW solar plants for common amenities (water pumps, clubhouse, lifts, and street lighting), slashing society maintenance charges by up to 80%.'
    }
  ],

  'Bangalore': [
    {
      question: 'What is the cost of rooftop solar in Bangalore (Bengaluru) in 2026?',
      answer: 'In Bangalore, a 3kW residential on-grid solar plant in 2026 costs between ₹1,52,000 and ₹1,82,000 gross (net ₹74,000 to ₹1,04,000 after the ₹78,000 PM Surya Ghar subsidy). A 5kW system costs ₹2,60,000 to ₹2,95,000 gross.'
    },
    {
      question: 'How does BESCOM net metering and surplus export compensation work?',
      answer: 'Under Karnataka Electricity Regulatory Commission (KERC) norms, BESCOM provides 1:1 net metering for domestic consumers up to sanctioned load. Surplus units exported to BESCOM at the end of billing cycles are credited against your bill or settled at KERC determined feed-in rates.'
    },
    {
      question: 'What is the payback period for a Bangalore residence?',
      answer: 'With Bangalore BESCOM slab tariffs reaching ₹8.50 to ₹9.50/unit, a 3kW solar system generates ~360 units per month, saving ₹3,200 to ₹4,000 monthly (₹40,000+ per year), yielding a payback period of 3.1 to 3.6 years.'
    },
    {
      question: 'Can solar panels run water pumps and EV chargers in Bangalore villas?',
      answer: 'Yes! A 5kW to 8kW solar system on villas in Whitefield, Sarjapur, or Hebbal generates sufficient power to run borewell water pumps, home lighting, and EV chargers completely off clean solar energy.'
    },
    {
      question: 'What permits and approvals are needed from BESCOM and KREDL?',
      answer: 'Your installer submits an online application on the BESCOM rooftop solar portal. Feasibility is approved in 7 days, followed by installation, safety inspection, and bi-directional smart meter installation.'
    }
  ],

  'Hyderabad': [
    {
      question: 'What is the cost of solar panel installation in Hyderabad in 2026?',
      answer: 'In Hyderabad and Telangana, a 3kW on-grid solar system in 2026 costs ₹1,48,000 to ₹1,78,000 gross (net ₹70,000 to ₹1,00,000 after ₹78,000 central DBT subsidy). A 5kW system costs ₹2,50,000 to ₹2,85,000 gross.'
    },
    {
      question: 'How does TSSPDCL handle solar net metering approvals in Hyderabad?',
      answer: 'Telangana State Southern Power Distribution Company Limited (TSSPDCL) processes rooftop solar applications through its online portal. Connection feasibility is issued within 7 days, with meter replacement and synchronisation completed within 15 days of installation.'
    },
    {
      question: 'What is the annual solar energy generation in Hyderabad?',
      answer: 'Hyderabad receives high solar insolation averaging 5.2 kWh/m²/day (over 2,900 sunshine hours/year). A 3kW system produces approximately 4,400 to 4,600 kWh annually, offsetting over 85% of standard household power consumption.'
    },
    {
      question: 'What is the payback period for rooftop solar in Hyderabad?',
      answer: 'With TSSPDCL electricity rates and ₹78,000 PM Surya Ghar subsidy, a 3kW residential system delivers full return on investment in 2.9 to 3.4 years.'
    },
    {
      question: 'Are elevated solar structures suitable for Hyderabad independent houses?',
      answer: 'Yes, elevated 9-foot HDG solar pergolas are widely installed across Banjara Hills, Jubilee Hills, Gachibowli, and Kukatpally, creating shaded rooftop garden terraces while generating free power.'
    }
  ],

  'Chennai': [
    {
      question: 'What is the cost of rooftop solar in Chennai in 2026?',
      answer: 'In Chennai and Tamil Nadu, a 3kW on-grid rooftop solar plant costs between ₹1,50,000 and ₹1,80,000 gross (net ₹72,000 to ₹1,02,000 after ₹78,000 central DBT subsidy). A 5kW system costs ₹2,55,000 to ₹2,90,000 gross.'
    },
    {
      question: 'How does TANGEDCO solar network tariff and net metering operate?',
      answer: 'TANGEDCO provides net feed-in metering for domestic LT consumers under TNERC regulations. Exported units are adjusted against consumption, and net exported units are compensated at the TNERC approved solar feed-in tariff.'
    },
    {
      question: 'What structural precautions are required for Chennai coastal weather?',
      answer: 'Due to Bay of Bengal cyclonic winds and humid coastal salt air, Chennai solar installations require hot-dip galvanized mounting structures (minimum 80 microns), SS304/SS316 stainless steel fasteners, and micro-crack resistant monocrystalline panels rated for 160 km/h wind gusts.'
    },
    {
      question: 'What is the payback period for solar in Chennai?',
      answer: 'With year-round tropical sunshine and heavy air conditioning demand in Chennai summers, a 3kW system delivers payback in 3.1 to 3.6 years.'
    },
    {
      question: 'How does the PM Surya Ghar subsidy process work in Tamil Nadu?',
      answer: 'Register on pmsuryaghar.gov.in selecting TANGEDCO. Your empanelled vendor manages feasibility, safety testing, and meter synchronization, with ₹78,000 DBT credited to your bank account.'
    }
  ],

  'Jaipur': [
    {
      question: 'What is the cost of solar panel installation in Jaipur in 2026?',
      answer: 'In Jaipur and Rajasthan, a 3kW on-grid solar system in 2026 costs between ₹1,40,000 and ₹1,70,000 gross. With the ₹78,000 PM Surya Ghar DBT subsidy, the net out-of-pocket price is only ₹62,000 to ₹92,000.'
    },
    {
      question: 'Why does Jaipur have one of the highest solar ROI rates in India?',
      answer: 'Rajasthan possesses the highest solar radiation in India, receiving over 325 sunny days per year and solar insolation exceeding 5.7 kWh/m²/day. A 3kW plant in Jaipur generates 4,800+ units annually, achieving full capital payback in just 2.5 to 2.9 years.'
    },
    {
      question: 'How to get JVVNL net metering connection in Jaipur?',
      answer: 'Jaipur Vidyut Vitran Nigam Limited (JVVNL) and Rajasthan Renewable Energy Corporation Limited (RRECL) provide streamlined single-window net metering clearances with online tracking through the national PM Surya Ghar portal.'
    },
    {
      question: 'How do solar panels withstand Jaipur summer heatwaves (45°C+)?',
      answer: 'Modern monocrystalline PERC and N-Type TOPCon panels with low temperature coefficients are engineered for extreme desert heat, maintaining high generation even during peak Rajasthan summer heatwaves.'
    },
    {
      question: 'What is the lifetime savings of a 3kW solar system in Jaipur?',
      answer: 'Over its 25-year operational life, a 3kW solar system in Jaipur generates over ₹12,00,000 in cumulative electricity bill savings against an initial investment of under ₹75,000 net.'
    }
  ],

  'Kolkata': [
    {
      question: 'What is the cost of solar installation in Kolkata in 2026?',
      answer: 'In Kolkata and West Bengal, a 3kW on-grid rooftop solar plant costs between ₹1,44,000 and ₹1,74,000 gross (net ₹66,000 to ₹96,000 after ₹78,000 central DBT subsidy). A 5kW system costs ₹2,45,000 to ₹2,80,000 gross.'
    },
    {
      question: 'How do CESC and WBSEDCL handle net metering in Kolkata?',
      answer: 'CESC (in Kolkata/Howrah) and WBSEDCL (in surrounding districts) support rooftop net metering under WBERC regulations. The minimum sanctioned load requirement for domestic net metering has been relaxed to 1kW to encourage widespread adoption.'
    },
    {
      question: 'What is the payback period for solar in Kolkata?',
      answer: 'With CESC electricity slab rates among the highest in East India (reaching ₹8.90 to ₹10.20 per unit), a 3kW solar system saves ₹3,400 to ₹4,300 monthly, delivering a rapid payback period of 3.0 to 3.5 years.'
    },
    {
      question: 'How do solar structures withstand nor’wester storms (Kalbaisakhi) in Kolkata?',
      answer: 'Rooftop mounting frames must be fabricated using heavy-duty HDG steel with anchor chemical bolting to withstand severe pre-monsoon Kalbaisakhi storms with wind gusts up to 130 km/h.'
    }
  ],

  'Surat': [
    {
      question: 'What is the cost of solar installation in Surat in 2026?',
      answer: 'Surat is recognized as India’s "Solar Rooftop Capital". In 2026, a 3kW rooftop system costs between ₹1,28,000 and ₹1,58,000 gross (net ₹50,000 to ₹80,000 after the ₹78,000 PM Surya Ghar subsidy).'
    },
    {
      question: 'How does DGVCL & Torrent Power net metering operate in Surat?',
      answer: 'DGVCL and Torrent Power Surat offer rapid net meter synchronization within 10 to 14 days, supported by local Surat Municipal Corporation (SMC) fast-track green building clearances.'
    },
    {
      question: 'What is the return on investment for textile and residential roofs in Surat?',
      answer: 'With exceptional sun hours and high industrial/residential power demand, solar plants in Surat achieve payback in 2.3 to 2.7 years, delivering over 22 years of free electricity.'
    }
  ],

  'Lucknow': [
    {
      question: 'What is the cost of solar installation in Lucknow in 2026?',
      answer: 'In Lucknow, a 3kW on-grid solar plant in 2026 costs between ₹1,42,000 and ₹1,72,000 gross. With the combined central PM Surya Ghar subsidy (₹78,000) and Uttar Pradesh State Government top-up subsidy (up to ₹30,000), total subsidy reaches up to ₹1,08,000, bringing net cost down to just ₹34,000 to ₹64,000!'
    },
    {
      question: 'What is the Uttar Pradesh State Solar Subsidy policy through UPNEDA?',
      answer: 'The UP Solar Energy Policy provides an additional state subsidy of ₹15,000 per kW (capped at ₹30,000 for 2kW+) over and above the central MNRE subsidy for domestic consumers under MVVNL/UPPCL.'
    },
    {
      question: 'What is the payback period for a Lucknow home?',
      answer: 'With combined state and central subsidies reducing upfront cost by over 55%, the effective payback period in Lucknow is an astounding 1.8 to 2.4 years.'
    }
  ],

  'Chandigarh': [
    {
      question: 'What is the cost of solar rooftop installation in Chandigarh in 2026?',
      answer: 'In Chandigarh UT, a 3kW on-grid solar system in 2026 costs between ₹1,46,000 and ₹1,76,000 gross (net ₹68,000 to ₹98,000 after ₹78,000 central DBT subsidy). A 5kW system costs ₹2,50,000 to ₹2,85,000 gross.'
    },
    {
      question: 'Is rooftop solar mandatory in Chandigarh?',
      answer: 'Yes. Under Chandigarh Renewable Energy and Science & Technology Promotion Society (CREST) regulations, rooftop solar installation is mandatory for all residential plots measuring 500 square yards and above, as well as commercial buildings.'
    },
    {
      question: 'How does CREST single-window approval work in Chandigarh?',
      answer: 'CREST and the Chandigarh Electricity Department operate an integrated online portal (solar.chd.gov.in) with zero manual paperwork, granting virtual net metering feasibility in under 5 working days.'
    }
  ]
};

export const SYSTEM_SIZE_IN_DEPTH_FAQS: Record<number, { question: string; answer: string }[]> = {
  1: [
    {
      question: 'What can a 1kW solar system power in a home?',
      answer: 'A 1kW solar power system generates approximately 4.0 to 4.5 units (kWh) of electricity per day (1,450–1,650 kWh annually). It is ideal for powering base residential daytime loads including 1 refrigerator, 4–6 LED lights, 2 ceiling fans, laptop/phone chargers, and Wi-Fi routers. It is commonly installed for tiny homes, rural cottages, security outposts, or urban apartments with restricted balcony/terrace space.'
    },
    {
      question: 'How many panels and how much roof space does a 1kW system require?',
      answer: 'A 1kW system requires only 2 to 3 modern high-efficiency panels (using 400W–540W monocrystalline modules) and occupies approximately 50 to 75 square feet (4.6 to 7.0 square meters) of shadow-free rooftop or balcony space.'
    },
    {
      question: 'How much does a 1kW solar system cost in 2026?',
      answer: 'In 2026, a turnkey 1kW on-grid solar system costs between $1,200 and $1,650 in the US, £1,400–£1,900 in the UK, A$1,500–A$2,200 in Australia, and ₹55,000–₹70,000 in India. In India under PM Surya Ghar, a 1kW system qualifies for a central DBT subsidy of ₹30,000, bringing the net cost down to ₹25,000–₹40,000.'
    },
    {
      question: 'Can a 1kW solar system run a 1-ton or 1.5-ton Air Conditioner?',
      answer: 'No, a 1kW system cannot reliably support the starting inrush current and continuous load of a 1.5-ton split AC (which requires ~1.5kW to 1.8kW continuous power). For running air conditioning alongside regular household loads, a minimum 3kW or 5kW solar system is strongly recommended.'
    },
    {
      question: 'What type of inverter is used for a 1kW solar array?',
      answer: 'A 1kW system uses a 1kW to 1.5kW single-phase microinverter (such as Enphase) or a compact high-efficiency string inverter with integrated MPPT (Maximum Power Point Tracking) and Wi-Fi performance monitoring.'
    },
    {
      question: 'What is the payback period for a 1kW solar setup?',
      answer: 'Depending on local electricity tariffs and solar insolation, a 1kW solar system delivers full capital payback within 3.5 to 5.5 years, generating clean solar electricity with minimal maintenance for over 25 years.'
    }
  ],
  2: [
    {
      question: 'How much electricity does a 2kW solar system generate daily and monthly?',
      answer: 'A 2kW solar system produces an average of 8 to 9.5 units (kWh) per day, resulting in roughly 240 to 285 kWh per month and 3,000 to 3,400 kWh annually under standard test conditions (STC) with 4.5 peak sun hours per day.'
    },
    {
      question: 'What household appliances can run on a 2kW solar system?',
      answer: 'A 2kW solar array easily supports a double-door refrigerator, a 1-ton 5-star inverter AC during peak daytime sunshine, television, washing machine, LED lights, computer workstations, and small water booster pumps.'
    },
    {
      question: 'How much does a 2kW solar system cost after subsidies in 2026?',
      answer: 'In India, a 2kW on-grid system costs ₹1,15,000 to ₹1,35,000 gross (net ₹55,000 to ₹75,000 after ₹60,000 PM Surya Ghar subsidy). In the US, it costs $4,800–$6,200 ($3,360–$4,340 after 30% ITC); in the UK, £2,800–£3,700 (with 0% VAT); in Australia, A$2,400–A$3,400 net.'
    },
    {
      question: 'What roof area is required for a 2kW solar array?',
      answer: 'A 2kW array requires 4 to 5 high-wattage monocrystalline modules (450W–540W each), requiring approximately 120 to 160 square feet (11 to 15 square meters) of unobstructed south-facing roof area.'
    },
    {
      question: 'Is a 2kW system suitable for battery storage addition?',
      answer: 'Yes. A 2kW array can be connected to a 3kWh to 5kWh lithium battery storage bank via a hybrid inverter to store excess daytime power for evening use and blackout protection.'
    },
    {
      question: 'What is the estimated financial return of a 2kW solar system over 25 years?',
      answer: 'Over its 25-year operational lifespan, a 2kW solar system generates between 75,000 and 85,000 kWh of clean power, yielding over $15,000 to $22,000 (or ₹5,00,000 to ₹7,50,000) in avoided grid electricity purchases.'
    }
  ],
  3: [
    {
      question: 'Why is a 3kW solar system the most popular residential capacity?',
      answer: 'A 3kW system is the sweet spot for standard 2 to 4-bedroom households. It produces 12 to 14 kWh per day (360–420 kWh monthly), which perfectly offsets the typical monthly electricity consumption of an average urban family running 1–2 air conditioners, refrigerators, and home electronics.'
    },
    {
      question: 'What is the maximum government subsidy available for a 3kW solar system in 2026?',
      answer: 'In India, 3kW qualifies for the maximum individual residential subsidy under PM Surya Ghar: a fixed ₹78,000 direct bank transfer. In the US, the 30% Federal ITC provides ~$2,400 to $3,200 in tax credits; in Australia, federal STCs discount the invoice by ~A$1,400; in the UK, 0% VAT saves ~£900.'
    },
    {
      question: 'What is the payback period for a 3kW solar power system?',
      answer: 'Due to maximum subsidy utilization and high consumption offset, a 3kW system delivers the fastest payback: 2.8 to 3.5 years in India and Australia, and 4.8 to 5.8 years in the US and Europe. Over its 25-year lifetime, total electricity savings exceed 6 to 9 times the initial capital investment.'
    },
    {
      question: 'How many panels and square feet are needed for 3kW?',
      answer: 'A 3kW system uses 6 to 7 Tier-1 450W–540W panels, requiring 180 to 220 square feet (17 to 20 square meters) of shadow-free rooftop space.'
    },
    {
      question: 'Can a 3kW solar system support an Electric Vehicle (EV)?',
      answer: 'Yes, a 3kW system generates enough surplus power during sunny midday hours to provide approximately 40 to 60 km of daily driving range for a commuter EV using a Level 1 or standard Level 2 home charger.'
    },
    {
      question: 'What maintenance is required for a 3kW residential rooftop system?',
      answer: 'Solar panels have no moving parts and require minimal maintenance. Rinsing dust or pollen off panels every 2 to 3 weeks and checking inverter display logs periodically maintains optimum generation.'
    }
  ],
  4: [
    {
      question: 'How much energy does a 4kW solar system produce?',
      answer: 'A 4kW system generates 16 to 18.5 kWh of clean electricity daily (480–550 kWh/month, 5,800–6,500 kWh/year). This covers high-consumption households running multiple ACs, home theater systems, microwave ovens, and electric geysers.'
    },
    {
      question: 'What is the cost of a 4kW solar installation in 2026?',
      answer: 'In the US, a 4kW system averages $10,500–$13,200 gross ($7,350–$9,240 net after 30% ITC). In the UK, it costs £5,400–£6,900 with 0% VAT. In Australia, it costs A$4,200–A$5,800 net. In India, it costs ₹2,10,000–₹2,45,000 gross (net ₹1,32,000–₹1,67,000 after the ₹78,000 central subsidy).'
    },
    {
      question: 'What roof dimensions are required for a 4kW system?',
      answer: 'You need approximately 240 to 300 square feet (22 to 28 square meters) of unobstructed roof space to install 8 to 10 monocrystalline solar modules.'
    },
    {
      question: 'What inverter configuration is best for a 4kW setup?',
      answer: 'A 3.6kW to 4.0kW dual MPPT string inverter (or 8–10 microinverters) allows splitting the solar array across two different roof orientations (e.g., East and West) to provide balanced morning and afternoon solar generation.'
    },
    {
      question: 'What is the expected payback period for a 4kW solar array?',
      answer: 'A 4kW system achieves full financial return within 3.2 to 5.2 years depending on your local utility tariff structure, delivering 20+ subsequent years of virtually free clean energy.'
    },
    {
      question: 'Will a 4kW system increase my property value?',
      answer: 'Yes. Multiple real estate studies demonstrate that homes with owned rooftop solar systems sell 3% to 5% faster and command higher property valuations due to permanently lower utility operating costs.'
    }
  ],
  5: [
    {
      question: 'How much power does a 5kW solar system produce daily and annually?',
      answer: 'A 5kW system produces an impressive 20 to 24 kWh per day (600–720 kWh per month, and 7,300–8,700 kWh per year), depending on local geographic insolation and azimuth orientation.'
    },
    {
      question: 'Can a 5kW solar system run a 2-ton AC and charge an Electric Vehicle (EV)?',
      answer: 'Yes. A 5kW system generates enough surplus daytime energy to run multiple split ACs simultaneously and add approximately 80 to 120 km of driving range per day to an EV using a Level 2 home wallbox charger.'
    },
    {
      question: 'What is the cost breakdown and payback period for a 5kW system in 2026?',
      answer: 'Gross turnkey cost is $13,500–$16,800 in the US ($9,450–$11,760 net), £6,500–£8,200 in the UK, A$4,800–A$6,900 in Australia, and ₹2,55,000–₹2,95,000 in India (net ₹1,77,000–₹2,17,000). Payback is achieved in 3.2 to 5.2 years.'
    },
    {
      question: 'How many panels are in a 5kW system and what roof space is needed?',
      answer: 'A 5kW system consists of 10 to 12 panels (using 450W–540W half-cut monocrystalline modules) and requires 320 to 400 square feet (30 to 37 square meters) of roof area.'
    },
    {
      question: 'Is a 5kW system eligible for net metering with local utilities?',
      answer: 'Yes. In virtually every major global grid jurisdiction (US, Canada, UK, Australia, Europe, India, UAE), 5kW falls comfortably within standard residential fast-track grid interconnection limits.'
    },
    {
      question: 'What battery size pairs best with a 5kW solar installation?',
      answer: 'A 5kWh to 10kWh lithium battery storage unit (such as Enphase IQ Battery, Tesla Powerwall, or BYD Battery-Box) pairs perfectly with a 5kW array, capturing daytime surplus to power evening household loads.'
    }
  ],
  6: [
    {
      question: 'Is a 6kW solar system suitable for modern all-electric smart homes?',
      answer: 'Yes. A 6kW system generates 24 to 28.5 kWh daily (720–850 kWh monthly), making it ideal for modern 3 to 5-bedroom homes with heat pump heating, central HVAC, induction cooking, and smart home automation.'
    },
    {
      question: 'What is the gross and net cost of a 6kW system in 2026?',
      answer: 'In the US, 6kW costs $15,900–$19,200 ($11,130–$13,440 net after 30% ITC). In the UK, it costs £7,600–£9,500. In Australia, it costs A$5,400–A$7,600 net. In India, it costs ₹3,00,000–₹3,45,000 gross (net ₹2,22,000–₹2,67,000).'
    },
    {
      question: 'What inverter configuration works best for a 6kW system?',
      answer: 'For unshaded roofs, a 5kW to 6kW string inverter with dual MPPT trackers (SMA, Fronius, Sungrow, Growatt) offers exceptional efficiency. For complex roofs with multiple orientations or dormer shadows, Enphase IQ8+ microinverters or SolarEdge DC optimizers maximize total harvest.'
    },
    {
      question: 'How much roof area does a 6kW solar array need?',
      answer: 'A 6kW system utilizes 12 to 14 panels (450W–540W each) and requires approximately 380 to 460 square feet (35 to 43 square meters) of roof space.'
    },
    {
      question: 'What is the 25-year cumulative savings of a 6kW solar plant?',
      answer: 'A 6kW system generates approximately 200,000+ kWh of power over 25 years, saving homeowners between $45,000 and $75,000 (or ₹18,00,000 to ₹28,00,000) in avoided utility bills.'
    },
    {
      question: 'Do I need a single-phase or three-phase connection for a 6kW system?',
      answer: 'Most single-phase residential grids allow up to 5kW or 6kW inverter capacity. In regions requiring 3-phase connections above 5kW (such as parts of Australia or Germany), a 3-phase hybrid inverter balances export across all three active lines.'
    }
  ],
  8: [
    {
      question: 'What is the daily power yield and capacity of an 8kW solar system?',
      answer: 'An 8kW solar system generates 32 to 38 kWh per day (960–1,150 kWh/month, 11,600–13,800 kWh/year), capable of completely powering large luxury villas, farmhouses, and homes with heated swimming pools or dual EV chargers.'
    },
    {
      question: 'What is the cost of an 8kW solar installation in 2026?',
      answer: 'In the US, an 8kW array costs $20,500–$24,800 gross ($14,350–$17,360 net). In the UK, £9,800–£12,200. In Australia, A$7,200–A$9,800 net. In India, ₹3,90,000–₹4,40,000 gross (net ₹3,12,000–₹3,62,000).'
    },
    {
      question: 'How much roof space is required for an 8kW solar system?',
      answer: 'An 8kW system uses 16 to 18 panels (450W–540W each) and requires 500 to 620 square feet (46 to 58 square meters) of unobstructed roof space.'
    },
    {
      question: 'Can an 8kW system power a heat pump and heated swimming pool?',
      answer: 'Yes! An 8kW array provides ample continuous capacity during spring, summer, and autumn to run pool filtration pumps, heat pumps, and dual split-system air conditioning simultaneously.'
    },
    {
      question: 'What electrical panel capacity is needed for an 8kW solar installation?',
      answer: 'An 8kW system requires a minimum 200-amp main electrical service panel to support the 40-amp dedicated solar backfeed circuit breaker required by the National Electrical Code (NEC) 120% rule.'
    },
    {
      question: 'What is the payback period for an 8kW residential system?',
      answer: 'With large homes incurring heavy monthly utility bills ($300 to $600/month), an 8kW system eliminates the highest electricity billing tiers, achieving complete payback in 4.0 to 5.5 years.'
    }
  ],
  10: [
    {
      question: 'What scale of home or commercial building needs a 10kW solar system?',
      answer: 'A 10kW system generates 40 to 48 kWh per day (1,200–1,450 kWh monthly, 14,500–17,500 kWh annually). It is designed for multi-story luxury residences, commercial offices, schools, small hotels, and estates with high 3-phase electricity consumption.'
    },
    {
      question: 'Do I need a 3-phase electrical connection for a 10kW solar system?',
      answer: 'Yes, in most electrical jurisdictions (including Australia, UK, Europe, and India), solar systems exceeding 5kW to 7kW export capacity require a 3-phase grid connection to prevent phase imbalance and grid voltage spikes.'
    },
    {
      question: 'What is the cost and lifetime financial return of a 10kW system in 2026?',
      answer: 'A 10kW system costs $24,500–$29,500 in the US ($17,150–$20,650 net), £11,500–£14,500 in the UK, A$8,500–A$11,800 in Australia, and ₹4,80,000–₹5,40,000 in India. Over 25 years, it generates between $65,000 and $120,000 (₹28,00,000 to ₹45,00,000) in avoided grid power expenses.'
    },
    {
      question: 'How many solar panels make up a 10kW solar array?',
      answer: 'A 10kW system requires 20 to 24 high-output monocrystalline modules (450W–540W each) and requires 650 to 800 square feet (60 to 75 square meters) of unobstructed roof space.'
    },
    {
      question: 'What commercial tax benefits or depreciation applies to 10kW solar systems?',
      answer: 'Businesses and commercial property owners can leverage Accelerated Depreciation (MACRS in the US, Section 32 in India offering 40% initial year depreciation) to substantially lower corporate tax liability.'
    },
    {
      question: 'Can a 10kW solar system achieve complete off-grid independence?',
      answer: 'When paired with a 15kWh to 30kWh lithium energy storage system and automatic generator integration, a 10kW system can provide 100% off-grid power security for rural estates, farmhouses, and eco-resorts.'
    }
  ]
};

export const SQFT_IN_DEPTH_FAQS: Record<number, { question: string; answer: string }[]> = {
  800: [
    {
      question: 'What solar system size is recommended for an 800 sq ft house?',
      answer: 'For an 800 sq ft house (typically a 1–2 bedroom compact home or cottage), a 2kW to 3kW solar power system is ideal. It generates 8 to 13 kWh per day, offsetting 80% to 100% of standard household power consumption.'
    },
    {
      question: 'How much usable roof space does an 800 sq ft house have for solar panels?',
      answer: 'A single-story 800 sq ft home typically has ~600 to 750 sq ft of total roof area, with approximately 250 to 350 sq ft of south- or west-facing usable area after accounting for setbacks, vents, and roof ridge lines. This easily fits 6 to 8 solar panels (2.5kW to 3.5kW).'
    },
    {
      question: 'How much does solar cost for an 800 sq ft home in 2026?',
      answer: 'In 2026, a 3kW system for an 800 sq ft home costs $7,500–$9,500 gross ($5,250–$6,650 net after 30% ITC in the US), £4,200–£5,400 in the UK, and ₹1,45,000–₹1,75,000 gross in India (net ₹67,000–₹97,000 after PM Surya Ghar subsidy).'
    },
    {
      question: 'What appliances in an 800 sq ft home can be powered by solar?',
      answer: 'A 2.5kW to 3kW system easily powers the refrigerator, LED lighting, ceiling fans, induction cooktop, washing machine, television, and a 1-ton inverter split air conditioner.'
    },
    {
      question: 'What is the estimated monthly electricity bill reduction for an 800 sq ft home?',
      answer: 'Homeowners can expect an 80% to 95% reduction in their monthly electricity bills, saving $80 to $140 (or ₹2,500 to ₹4,000) every month.'
    },
    {
      question: 'What is the payback period for an 800 sq ft home solar setup?',
      answer: 'Payback is typically achieved in 3.2 to 4.8 years, after which the system generates free clean energy for over two decades.'
    }
  ],
  1000: [
    {
      question: 'What capacity solar system is best for a 1,000 sq ft home?',
      answer: 'For a 1,000 sq ft 2 to 3-bedroom house, a 3kW to 4kW solar system is the optimal configuration, generating 12 to 18 kWh per day (360–540 kWh per month).'
    },
    {
      question: 'How many panels fit on a 1,000 sq ft rooftop?',
      answer: 'Accounting for roof pitch, chimney/plumbing vents, and fire safety setbacks, a 1,000 sq ft roof typically accommodates 8 to 12 solar panels (3.5kW to 5kW capacity), occupying 250 to 380 square feet of roof space.'
    },
    {
      question: 'What is the turnkey cost for a 1,000 sq ft home solar installation in 2026?',
      answer: 'A 3.5kW system costs $9,200–$11,500 gross in the US ($6,440–$8,050 net after 30% ITC), £4,800–£6,200 in the UK, A$3,800–A$5,200 in Australia, and ₹1,65,000–₹1,95,000 in India (net ₹87,000–₹1,17,000).'
    },
    {
      question: 'Can a 1,000 sq ft home achieve net-zero electricity bills?',
      answer: 'Yes! With a 3.5kW or 4kW solar array and utility net metering, an energy-efficient 1,000 sq ft home can generate 100% of its annual electricity needs on-site.'
    },
    {
      question: 'What is the payback period for a 1,000 sq ft home?',
      answer: 'Payback is achieved in 3.0 to 4.5 years, generating $1,200 to $1,800 (₹40,000 to ₹60,000) in annual electricity savings.'
    },
    {
      question: 'Does installing solar affect the roof structure of a 1,000 sq ft home?',
      answer: 'Modern solar panels and aluminum racking add only 2.5 to 3.5 lbs per square foot, well within standard residential roof structural load limits for tile, metal, or asphalt shingle roofs.'
    }
  ],
  1500: [
    {
      question: 'What solar system size is recommended for a 1,500 sq ft house?',
      answer: 'A 1,500 sq ft home (standard 3-bedroom family residence) typically requires a 4kW to 6kW solar system, generating 16 to 26 kWh of electricity per day (480–780 kWh per month).'
    },
    {
      question: 'How much roof space is needed for a 1,500 sq ft house solar installation?',
      answer: 'A 5kW solar system requires 10 to 12 monocrystalline panels, occupying 320 to 400 square feet of unobstructed south- or west-facing roof area.'
    },
    {
      question: 'What is the cost of solar for a 1,500 sq ft home in 2026?',
      answer: 'Gross cost is $13,500–$16,500 in the US ($9,450–$11,550 net), £6,500–£8,200 in the UK, A$4,800–A$6,800 in Australia, and ₹2,50,000–₹2,90,000 in India (net ₹1,72,000–₹2,12,000).'
    },
    {
      question: 'Can a 5kW system on a 1,500 sq ft house support an EV charger and heat pump?',
      answer: 'Yes! A 5kW system produces enough daily excess energy to power an energy-efficient heat pump HVAC system and provide 60 to 90 km of EV commuting range daily.'
    },
    {
      question: 'What is the 25-year return on investment for a 1,500 sq ft home?',
      answer: 'A 5kW system generates over $35,000 to $55,000 (or ₹15,00,000 to ₹22,00,000) in cumulative power savings over its 25-year warranty period.'
    },
    {
      question: 'What is the estimated payback period?',
      answer: 'Full financial payback is achieved in 3.4 to 5.1 years.'
    }
  ],
  2000: [
    {
      question: 'What size solar system is needed for a 2,000 sq ft house?',
      answer: 'A 2,000 sq ft house (typically a 3–4 bedroom family home with multiple air conditioners and entertainment systems) requires a 6kW to 8kW solar system, generating 24 to 36 kWh per day (720–1,100 kWh monthly).'
    },
    {
      question: 'How much roof space is required on a 2,000 sq ft home?',
      answer: 'A 6.5kW to 8kW array uses 14 to 18 panels and requires 420 to 580 square feet of roof space. A 2,000 sq ft house typically has 1,400 to 1,800 sq ft of total roof area, leaving plenty of room for ideal panel placement.'
    },
    {
      question: 'How much does solar panel installation cost for a 2,000 sq ft home in 2026?',
      answer: 'A standard 6.5kW system costs $16,500–$19,800 gross in the US ($11,550–$13,860 net after 30% ITC), £7,800–£9,800 in the UK, A$5,600–A$7,800 in Australia, and ₹3,10,000–₹3,60,000 in India (net ₹2,32,000–₹2,82,000).'
    },
    {
      question: 'How much can a 2,000 sq ft household save on annual electricity bills?',
      answer: 'Homeowners save between $1,800 and $2,800 (or ₹65,000 to ₹95,000) per year by replacing grid electricity with self-generated rooftop solar power.'
    },
    {
      question: 'Should I install battery backup for a 2,000 sq ft home?',
      answer: 'Installing a 10kWh to 13.5kWh battery (such as a Tesla Powerwall 3 or Enphase 5P) provides seamless whole-home backup during storm outages and avoids high peak utility time-of-use rates.'
    },
    {
      question: 'What is the payback period for a 2,000 sq ft home?',
      answer: 'Payback is reached in 3.8 to 5.4 years.'
    }
  ],
  2500: [
    {
      question: 'What solar system size is recommended for a 2,500 sq ft home?',
      answer: 'A 2,500 sq ft home (4–5 bedrooms, central AC, swimming pool, or EV charging) requires a 7kW to 9kW solar system, generating 28 to 42 kWh daily (840–1,250 kWh monthly).'
    },
    {
      question: 'How many panels fit on a 2,500 sq ft roof?',
      answer: 'You can comfortably fit 16 to 22 solar panels (7.5kW to 10kW capacity), occupying 500 to 700 square feet of roof space.'
    },
    {
      question: 'What is the cost of solar for a 2,500 sq ft home in 2026?',
      answer: 'An 8kW system costs $19,800–$24,200 gross in the US ($13,860–$16,940 net), £9,200–£11,800 in the UK, A$6,800–A$9,200 in Australia, and ₹3,80,000–₹4,30,000 in India (net ₹3,02,000–₹3,52,000).'
    },
    {
      question: 'What is the expected monthly bill savings for a 2,500 sq ft home?',
      answer: 'A 2,500 sq ft home will see monthly utility bills drop by $200 to $350 (or ₹7,500 to ₹12,000), saving $2,400 to $4,200 annually.'
    },
    {
      question: 'Can solar power support central heating and air conditioning in a 2,500 sq ft house?',
      answer: 'Yes! An 8kW system provides abundant capacity to run central 4-ton or 5-ton heat pumps, pool pumps, and heavy domestic appliances simultaneously.'
    },
    {
      question: 'What is the payback period for a 2,500 sq ft home solar system?',
      answer: 'Payback is typically achieved in 4.0 to 5.6 years.'
    }
  ],
  3000: [
    {
      question: 'What solar capacity is needed for a 3,000 sq ft luxury home or villa?',
      answer: 'A 3,000 sq ft property requires an 8kW to 12kW solar array, producing 36 to 55 kWh per day (1,100–1,650 kWh monthly, 13,000–19,500 kWh annually).'
    },
    {
      question: 'How much roof space is required for a 10kW system on a 3,000 sq ft house?',
      answer: 'A 10kW system uses 20 to 24 high-efficiency 450W–540W panels, occupying 650 to 800 square feet of roof area.'
    },
    {
      question: 'How much does a 10kW solar system cost for a 3,000 sq ft home in 2026?',
      answer: 'In 2026, a 10kW system costs $24,500–$29,500 gross in the US ($17,150–$20,650 net after 30% ITC), £11,500–£14,500 in the UK, A$8,200–A$11,500 in Australia, and ₹4,60,000–₹5,20,000 in India (net ₹3,82,000–₹4,42,000).'
    },
    {
      question: 'Can a 3,000 sq ft home run multiple air conditioners, a heated pool, and two EVs?',
      answer: 'Yes! A 10kW to 12kW system produces sufficient clean energy to power all luxury home amenities, heated pools, and provide 150+ km of daily EV range.'
    },
    {
      question: 'What is the 25-year lifetime savings of solar on a 3,000 sq ft home?',
      answer: 'Homeowners will save between $65,000 and $110,000 (or ₹25,00,000 to ₹40,00,000) in avoided utility bills over 25 years.'
    },
    {
      question: 'What is the payback period for a 3,000 sq ft home solar system?',
      answer: 'Due to huge utility bill offsets and tier-skipping savings, payback is achieved in 3.8 to 5.2 years.'
    }
  ]
};
