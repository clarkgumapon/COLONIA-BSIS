import Link from "next/link"
import { ArrowLeft, Building, CheckCircle, Download, Share2, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BusinessRecommendation } from "@/hooks/use-recommendations"
import { PdfDownloadButton } from "@/components/pdf-download-button"
import { ShareButton } from "@/components/share-button"
import { BusinessTypeTabs } from "./business-type-tabs"
import { Guide } from "@/app/api/types"

// Business type placeholders for different business types
const businessImages: Record<string, string> = {
  "Computer Shop": "/images/computer-shop-setup.svg",
  "Tech Retail Store": "/images/tech-retail-guide.svg",
  "IT Consulting": "/images/computer-repair.svg",
  "Tech Repair Service": "/images/computer-repair.svg",
  "Coffee Shop": "/images/tech-retail-guide.svg",
  "Online Education Platform": "/images/success-story.svg",
  "Healthcare Consultancy": "/images/marketing-strategy.svg",
  "Food Truck": "/images/tech-retail-guide.svg",
  "Digital Marketing Agency": "/images/marketing-strategy.svg",
  "Personal Fitness Training": "/images/success-story.svg",
  "Sustainable Retail Store": "/images/tech-retail-guide.svg",
}

// Complete business recommendations database - this would typically come from an API
const businessData: Record<string, BusinessRecommendation> = {
  "tech-retail-store": {
    title: "Tech Retail Store",
    match: "96%",
    description:
      "A tech retail store offers the latest electronics, gadgets, and accessories to consumers. This business model thrives on providing quality products with excellent customer service and technical expertise.",
    startupCost: "₱60,000 - ₱100,000",
    profitMargin: "25-35%",
    timeToProfit: "12-18 months",
    riskLevel: "Moderate",
    keyRequirements: [
      "Knowledge of consumer electronics and trends",
      "Retail space in a high-traffic location",
      "Strong supplier relationships",
      "Staff with technical knowledge and sales skills",
      "Inventory management system",
    ],
    expertAdvice:
      "Focus on creating a unique value proposition that differentiates you from big box retailers. Consider specializing in a specific niche like smart home technology, gaming, or professional equipment to create a loyal customer base.",
  },
  "computer-shop": {
    title: "Computer Shop",
    match: "95%",
    description:
      "A computer shop business involves selling computer hardware, software, accessories, and providing repair services. This business aligns well with your interests in technology and your budget range.",
    startupCost: "₱50,000 - ₱80,000",
    profitMargin: "25-30%",
    timeToProfit: "12-18 months",
    riskLevel: "Moderate",
    keyRequirements: [
      "Knowledge of computer hardware and software",
      "Retail space in a high-traffic area",
      "Relationships with suppliers and distributors",
      "Technical staff for repairs and customer support",
    ],
    expertAdvice:
      "Focus on creating a unique value proposition that differentiates you from big box retailers. Consider specializing in gaming PCs, business solutions, or repair services to create a niche.",
  },
  "it-consulting": {
    title: "IT Consulting",
    match: "88%",
    description:
      "Provide IT solutions, support, and strategic guidance to businesses. This service-based business has lower startup costs and can be scaled gradually as you acquire more clients.",
    startupCost: "₱5,000 - ₱15,000",
    profitMargin: "40-60%",
    timeToProfit: "3-6 months",
    riskLevel: "Low",
    keyRequirements: [
      "Strong IT knowledge and problem-solving skills",
      "Business and communication skills",
      "Professional certifications (recommended)",
      "Home office or small commercial space",
    ],
    expertAdvice:
      "Start by focusing on a specific industry or type of service. Building long-term relationships with clients will provide stable recurring revenue through maintenance contracts.",
  },
  "tech-repair": {
    title: "Tech Repair Service",
    match: "82%",
    description:
      "Offer repair services for computers, smartphones, tablets, and other electronic devices. This business has moderate startup costs and growing demand.",
    startupCost: "₱10,000 - ₱25,000",
    profitMargin: "30-45%",
    timeToProfit: "6-12 months",
    riskLevel: "Low to Moderate",
    keyRequirements: [
      "Technical repair skills",
      "Small retail or service location",
      "Basic tools and diagnostic equipment",
      "Inventory of common replacement parts",
    ],
    expertAdvice:
      "Consider offering mobile repair services to differentiate your business. Establishing relationships with businesses for B2B services can provide a steady stream of clients.",
  },
  "coffee-shop": {
    title: "Coffee Shop",
    match: "89%",
    description:
      "A coffee shop offers a cozy atmosphere for customers to enjoy premium coffee, teas, and light food items. This business thrives on building a loyal customer base and creating a unique ambiance.",
    startupCost: "₱100,000 - ₱150,000",
    profitMargin: "20-25%",
    timeToProfit: "18-24 months",
    riskLevel: "Moderate to High",
    keyRequirements: [
      "Prime location with good foot traffic",
      "Barista training and coffee knowledge",
      "Quality equipment and suppliers",
      "Unique atmosphere and brand identity",
    ],
    expertAdvice:
      "Focus on creating a distinctive atmosphere and consistently high-quality products. Consider offering specialty coffee options and creating a loyalty program to encourage repeat customers.",
  },
  "digital-marketing": {
    title: "Digital Marketing Agency",
    match: "91%",
    description:
      "Help businesses improve their online presence through SEO, social media management, content creation, and paid advertising campaigns. This service business has low startup costs and high demand.",
    startupCost: "₱10,000 - ₱30,000",
    profitMargin: "40-60%",
    timeToProfit: "3-6 months",
    riskLevel: "Low",
    keyRequirements: [
      "Digital marketing knowledge and strategy skills",
      "Understanding of various platforms and analytics",
      "Content creation and copywriting abilities",
      "Client management and communication skills",
    ],
    expertAdvice:
      "Specialize in a specific industry or service to differentiate yourself. Document your successes with case studies and tangible metrics. Consider a retainer model for stable monthly income.",
  },
  "online-education": {
    title: "Online Education Platform",
    match: "95%",
    description:
      "Create an educational institution or tutoring center providing specialized courses in urban areas. With a focus on in-person training enhanced by digital tools, this business model offers excellent potential for growth in educational hubs.",
    startupCost: "₱80,000 - ₱120,000",
    profitMargin: "40-60%",
    timeToProfit: "8-12 months",
    riskLevel: "Moderate",
    keyRequirements: [
      "Educational expertise in high-demand subjects",
      "Small commercial space in an accessible urban location",
      "Teaching equipment and learning materials",
      "Digital tools for hybrid learning experiences",
      "Qualified instructors or teaching staff"
    ],
    expertAdvice:
      "For an urban location with a ₱100,000 budget, focus on creating a specialized educational center that serves local community needs. Start with 2-3 in-demand subjects, invest in comfortable learning spaces, and build a hybrid model that combines in-person teaching with digital resources for maximum value and flexibility."
  }
}

// Detailed business guide sections
const businessGuides: Record<string, Record<string, string[]>> = {
  "tech-retail-store": {
    overview: [
      "# Tech Retail Store Business Guide",
      "Opening a tech retail store can be a lucrative venture in today's technology-driven market. This comprehensive guide will help you navigate the essential steps to establish and grow a successful tech retail business.",
      "## Business Model",
      "A tech retail store can offer various products and services, including:",
      "- Latest consumer electronics (smartphones, tablets, laptops)",
      "- Smart home devices and accessories",
      "- Gaming equipment and accessories",
      "- Audio and visual equipment",
      "- Technical support and setup services",
      "- Extended warranties and protection plans",
    ],
    "market-analysis": [
      "# Market Analysis",
      "Understanding the tech retail market is essential for positioning your store effectively.",
      "## Target Audience",
      "- Tech enthusiasts seeking the latest gadgets",
      "- Professionals needing reliable electronics",
      "- Students requiring educational technology",
      "- Home users looking for smart home solutions",
      "- Gamers seeking specialized equipment",
      "## Competition",
      "Analyze your competition thoroughly, including:",
      "- Big box electronics retailers",
      "- Brand-specific stores (Apple, Samsung, etc.)",
      "- Online retailers and marketplaces",
      "- Specialty tech shops",
      "- Department stores with electronics sections",
    ],
    "startup-requirements": [
      "# Startup Requirements",
      "Here's what you'll need to get your tech retail store up and running:",
      "## Legal Requirements",
      "- Business registration and permits",
      "- Tax identification numbers",
      "- Retail business license",
      "- Insurance (liability, inventory, theft)",
      "- Supplier agreements and contracts",
      "## Location",
      "- Retail space in high-traffic area (mall or shopping district)",
      "- Approximately 80-150 square meters for displays and storage",
      "- Proper security systems for high-value inventory",
      "- Visible storefront with attractive signage",
      "## Equipment",
      "- Display cases and shelving",
      "- Point-of-sale system with inventory management",
      "- Security cameras and anti-theft devices",
      "- Product demonstration stations",
      "- Storage room for additional inventory",
    ],
    "financial-plan": [
      "# Financial Plan",
      "Proper financial planning is crucial for a tech retail business.",
      "## Startup Costs Breakdown",
      "- Initial inventory: ₱40,000 - ₱70,000",
      "- Store fixtures and displays: ₱10,000 - ₱15,000",
      "- Security system: ₱5,000 - ₱8,000",
      "- Point-of-sale system: ₱3,000 - ₱6,000",
      "- Lease deposit and renovation: ₱10,000 - ₱20,000",
      "- Legal fees and permits: ₱2,000 - ₱5,000",
      "## Pricing Strategy",
      "- Hardware markup: 15-30% above wholesale",
      "- Accessories markup: 40-60%",
      "- Extended warranties: 70-80% profit margin",
      "- Setup and support services: ₱500-2,000 depending on complexity",
    ],
    "marketing-strategy": [
      "# Marketing Strategy",
      "Effective marketing is essential for attracting customers to your tech retail store.",
      "## Digital Presence",
      "- Professional website with product listings and specifications",
      "- Social media accounts featuring new arrivals and promotions",
      "- Email marketing for product launches and exclusive deals",
      "- Online advertising targeting tech enthusiasts",
      "- Search engine optimization for local visibility",
      "## In-Store Experience",
      "- Product demonstrations and interactive displays",
      "- Knowledgeable staff who can explain technical features",
      "- Regular tech workshops and events",
      "- Loyalty program with special offers for repeat customers",
      "- Excellent customer service and after-sales support",
    ],
  },
  "computer-shop": {
    overview: [
      "# Computer Shop Business Guide",
      "Starting a computer shop can be a profitable venture in today's technology-driven world. This detailed guide will walk you through the essential steps to establish and grow a successful computer shop business.",
      "## Business Model",
      "A computer shop can offer various services and products, including:",
      "- Sale of new and refurbished computers, parts, and accessories",
      "- Computer repair and maintenance services",
      "- Technical support and consulting",
      "- Custom-built computer systems",
      "- Software installation and training",
    ],
    "market-analysis": [
      "# Market Analysis",
      "Understanding your target market is crucial for positioning your computer shop effectively.",
      "## Target Audience",
      "- Individual consumers seeking personal computers and repairs",
      "- Small to medium-sized businesses needing IT support",
      "- Gamers looking for specialized gaming systems",
      "- Educational institutions requiring computer equipment",
      "- Remote workers needing reliable computer setups",
      "## Competition",
      "Analyze your local competition, including:",
      "- Big box electronics retailers",
      "- Other independent computer shops",
      "- Online retailers",
      "- Manufacturer-owned stores",
    ],
    "startup-requirements": [
      "# Startup Requirements",
      "Here's what you'll need to get your computer shop up and running:",
      "## Legal Requirements",
      "- Business registration and permits",
      "- Tax identification numbers",
      "- Insurance (liability, inventory, etc.)",
      "- Retail or service business license",
      "## Location",
      "- Commercial space in a high-traffic area",
      "- Approximately 50-100 square meters for retail and service",
      "- Proper electrical setup for testing equipment",
      "- Security systems for inventory protection",
      "## Equipment",
      "- Display shelves and counters",
      "- Repair workstations",
      "- Diagnostic tools and equipment",
      "- Point-of-sale system",
      "- Security cameras and alarm system",
    ],
    "financial-plan": [
      "# Financial Plan",
      "Financial planning is essential for long-term success.",
      "## Startup Costs Breakdown",
      "- Initial inventory: ₱30,000 - ₱50,000",
      "- Store equipment and fixtures: ₱10,000 - ₱15,000",
      "- Repair tools and diagnostic equipment: ₱5,000 - ₱10,000",
      "- Legal fees and permits: ₱3,000 - ₱5,000",
      "- Security deposit for rental space: Typically 2-3 months' rent",
      "## Pricing Strategy",
      "- Hardware markup: 15-30% above wholesale",
      "- Repair services: ₱500-1,500 depending on complexity",
      "- Maintenance packages: ₱1,500-3,000 per year",
      "- Custom builds: 25-35% markup on parts plus service fees",
    ],
    "marketing-strategy": [
      "# Marketing Strategy",
      "Effective marketing will help you build a customer base and establish your brand.",
      "## Online Presence",
      "- Professional website with services and inventory listings",
      "- Local SEO optimization for geographic targeting",
      "- Social media pages on platforms like Facebook and Instagram",
      "- Online reviews management on Google, Facebook, and Yelp",
      "## Offline Marketing",
      "- Grand opening event with special promotions",
      "- Local newspaper and radio advertisements",
      "- Partnerships with schools and businesses",
      "- Referral discount programs",
      "- Flyers and business cards at strategic locations",
    ],
  },
  "coffee-shop": {
    overview: [
      "# Coffee Shop Business Guide",
      "Opening a coffee shop can be a rewarding venture for entrepreneurs passionate about coffee and community building. This guide provides essential information to help you establish a successful coffee shop business.",
      "## Business Model",
      "A coffee shop can offer various products and experiences, including:",
      "- Specialty coffee drinks and brewing methods",
      "- Tea, smoothies, and other non-coffee beverages",
      "- Pastries, sandwiches, and light food items",
      "- Comfortable space for working, studying, or socializing",
      "- Coffee beans and brewing equipment for retail",
    ],
    "market-analysis": [
      "# Market Analysis",
      "Understanding the coffee market is essential for positioning your business effectively.",
      "## Target Audience",
      "- Young professionals seeking quality coffee and workspace",
      "- Students needing study environments",
      "- Coffee enthusiasts appreciating specialty beans and brewing methods",
      "- Local residents looking for community gathering spaces",
      "- Remote workers needing a change of environment",
      "## Competition",
      "Analyze the competitive landscape in your area:",
      "- Major coffee chains (Starbucks, etc.)",
      "- Independent coffee shops",
      "- Cafés in bookstores or other retail establishments",
      "- Bakeries and restaurants offering coffee service",
    ],
    "startup-requirements": [
      "# Startup Requirements",
      "Here's what you'll need to open your coffee shop:",
      "## Legal Requirements",
      "- Business registration and permits",
      "- Food service license",
      "- Health department certification",
      "- Insurance (liability, property, etc.)",
      "## Location",
      "- Prime retail space with good visibility and foot traffic",
      "- Approximately 100-200 square meters for seating and service",
      "- Proper plumbing for espresso equipment",
      "- Outside seating potential (if possible)",
      "## Equipment",
      "- Commercial espresso machine",
      "- Coffee grinders (espresso and filter)",
      "- Brewing equipment (pour-over, French press, etc.)",
      "- Refrigeration and food storage",
      "- POS system",
      "- Furniture and fixtures",
    ],
    "financial-plan": [
      "# Financial Plan",
      "Proper financial planning is crucial for coffee shop success.",
      "## Startup Costs Breakdown",
      "- Lease and security deposit: ₱30,000 - ₱60,000",
      "- Renovations and interior design: ₱20,000 - ₱40,000",
      "- Equipment: ₱30,000 - ₱50,000",
      "- Initial inventory: ₱5,000 - ₱10,000",
      "- Licenses and permits: ₱3,000 - ₱8,000",
      "- Marketing and branding: ₱5,000 - ₱10,000",
      "## Pricing Strategy",
      "- Basic coffee drinks: ₱80-120",
      "- Specialty coffee drinks: ₱130-180",
      "- Food items: 50% markup minimum",
      "- Retail coffee beans: 100% markup",
    ],
    "marketing-strategy": [
      "# Marketing Strategy",
      "Effective marketing will help you build a customer base in a competitive market.",
      "## Brand Development",
      "- Create a distinctive brand identity and atmosphere",
      "- Design memorable logo and packaging",
      "- Develop a story around your coffee selection and sourcing",
      "## Digital Marketing",
      "- Active social media presence featuring your drinks and space",
      "- Professional website with location, hours, and menu",
      "- Email marketing for loyal customers",
      "- Online reviews management",
      "## Community Engagement",
      "- Host events like brewing classes or coffee tastings",
      "- Partner with local businesses and organizations",
      "- Support community initiatives and causes",
      "- Create a loyalty program for repeat customers",
    ],
  },
  "digital-marketing": {
    overview: [
      "# Digital Marketing Agency Business Guide",
      "Starting a digital marketing agency allows you to help businesses improve their online presence and achieve their marketing goals. This guide provides key insights for establishing a successful agency.",
      "## Business Model",
      "A digital marketing agency can offer various services, including:",
      "- Search Engine Optimization (SEO)",
      "- Social Media Marketing and Management",
      "- Content Creation and Marketing",
      "- Pay-Per-Click (PPC) Advertising",
      "- Email Marketing Campaigns",
      "- Website Development and Optimization",
      "- Analytics and Reporting",
    ],
    "market-analysis": [
      "# Market Analysis",
      "Understanding the digital marketing landscape is essential for positioning your agency effectively.",
      "## Target Clients",
      "- Small to medium-sized businesses without in-house marketing teams",
      "- Local businesses needing online visibility",
      "- E-commerce businesses requiring traffic and conversion optimization",
      "- Professional service providers (lawyers, doctors, consultants)",
      "- Startups looking to establish market presence",
      "## Competition",
      "Analyze your competition to find your niche:",
      "- Full-service marketing agencies",
      "- Specialized digital marketing firms",
      "- Freelancers and independent contractors",
      "- In-house marketing departments",
    ],
    "startup-requirements": [
      "# Startup Requirements",
      "Here's what you'll need to establish your digital marketing agency:",
      "## Legal Requirements",
      "- Business registration",
      "- Service contracts and agreements",
      "- Client confidentiality policies",
      "- Professional liability insurance",
      "## Workspace",
      "- Home office or coworking space initially",
      "- High-speed internet connection",
      "- Video conferencing capabilities",
      "- Meeting space for client presentations",
      "## Tools and Technology",
      "- SEO tools (SEMrush, Ahrefs, Moz)",
      "- Social media management platforms",
      "- Content creation and design software",
      "- Analytics and reporting tools",
      "- Project management software",
      "- Customer relationship management (CRM) system",
    ],
    "financial-plan": [
      "# Financial Plan",
      "Financial planning for a digital marketing agency requires understanding service pricing and operational costs.",
      "## Startup Costs Breakdown",
      "- Computer equipment: ₱5,000 - ₱10,000",
      "- Software subscriptions: ₱2,000 - ₱5,000 monthly",
      "- Website and branding: ₱3,000 - ₱8,000",
      "- Legal and accounting setup: ₱1,000 - ₱3,000",
      "- Initial marketing: ₱1,000 - ₱3,000",
      "## Pricing Models",
      "- Hourly rates: ₱500-1,500 depending on service",
      "- Monthly retainers: ₱15,000-50,000 based on scope",
      "- Project-based pricing: Varies by deliverables",
      "- Performance-based fees: Base plus results-based bonuses",
    ],
    "marketing-strategy": [
      "# Marketing Strategy",
      "Your own marketing strategy is your best advertisement for potential clients.",
      "## Showcase Your Expertise",
      "- Maintain an optimized, high-performing website",
      "- Create case studies from successful client work",
      "- Publish thought leadership content on industry trends",
      "- Demonstrate expertise through your own social channels",
      "## Lead Generation",
      "- Network in business and industry groups",
      "- Offer free consultations or audits",
      "- Implement referral programs with existing clients",
      "- Speak at industry events and webinars",
      "## Positioning",
      "- Specialize in specific industries or services",
      "- Focus on measurable results and ROI",
      "- Develop a unique methodology or approach",
      "- Build partnerships with complementary service providers",
    ],
  },
  "online-education": {
    overview: [
      "# Education Center Business Guide",
      "Opening an education center in an urban location can be a profitable business that serves a vital community need. This comprehensive guide will help you establish a successful educational business with the optimal use of your ₱100,000 budget.",
      "## Business Model",
      "A modern education center can offer various services, including:",
      "- Specialized subject tutoring for students of different ages",
      "- Test preparation courses for various standardized exams",
      "- Skill development workshops for professionals",
      "- Language learning programs",
      "- Hybrid learning with in-person and digital components",
      "- Educational materials and resources"
    ],
    "market-analysis": [
      "# Market Analysis",
      "Understanding the education market in urban areas is crucial for positioning your business effectively.",
      "## Target Audience",
      "- School students needing academic support",
      "- College students preparing for exams or needing tutoring",
      "- Professionals looking to develop new skills",
      "- Parents seeking quality educational support for their children",
      "- Adults interested in continuing education",
      "## Competition",
      "Analyze your local competition thoroughly, including:",
      "- Traditional tutoring centers",
      "- Online learning platforms",
      "- Educational franchises",
      "- Individual tutors",
      "- School-based after-hours programs"
    ],
    "startup-requirements": [
      "# Startup Requirements",
      "Here's what you'll need to establish your education center within your ₱100,000 budget:",
      "## Legal Requirements",
      "- Business registration and permits",
      "- Educational accreditation (if applicable)",
      "- Insurance coverage",
      "- Tax identification numbers",
      "- Legal contracts for staff and students",
      "## Location",
      "- Commercial space in an accessible urban location (60-100 sq. meters)",
      "- Preferably near schools, colleges, or residential areas",
      "- Space for multiple classrooms or learning areas",
      "- Small reception and waiting area",
      "- Sufficient parking or public transport access",
      "## Equipment",
      "- Desks, chairs, and whiteboards",
      "- Computers/tablets for digital learning components",
      "- High-speed internet connection",
      "- Learning materials and textbooks",
      "- Classroom supplies and teaching aids"
    ],
    "financial-plan": [
      "# Financial Plan",
      "Optimize your ₱100,000 budget with this financial blueprint.",
      "## Startup Costs Breakdown",
      "- Lease deposit and initial rent: ₱30,000 - ₱40,000",
      "- Renovation and setup: ₱10,000 - ₱15,000",
      "- Furniture and equipment: ₱20,000 - ₱25,000",
      "- Teaching materials and supplies: ₱5,000 - ₱8,000",
      "- Technology and software: ₱10,000 - ₱15,000",
      "- Legal fees and permits: ₱3,000 - ₱5,000",
      "- Marketing and branding: ₱5,000 - ₱7,000",
      "## Pricing Strategy",
      "- Individual tutoring: ₱350-600 per hour",
      "- Group classes: ₱250-400 per session per student",
      "- Test preparation courses: ₱5,000-8,000 per course",
      "- Skill development workshops: ₱1,500-3,000 per workshop",
      "- Monthly membership options: ₱3,000-5,000 per month"
    ],
    "marketing-strategy": [
      "# Marketing Strategy",
      "Effective marketing is essential for attracting students to your education center.",
      "## Digital Presence",
      "- Professional website showcasing courses and instructor credentials",
      "- Social media accounts with educational content and success stories",
      "- Email marketing for course announcements and educational tips",
      "- Search engine optimization for local visibility",
      "- Online reviews and testimonials from satisfied students",
      "## Community Outreach",
      "- Partnerships with local schools and colleges",
      "- Free workshops or seminars as introductory offers",
      "- Referral programs for existing students",
      "- Participation in educational fairs and community events",
      "- Special promotions for new students or subject areas"
    ]
  }
}

// Function to convert kebab-case to title case
function titleCase(str: string): string {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Convert the business guide data to a proper Guide object
function createGuideObject(type: string, guideData: Record<string, string[]>): Guide {
  // Extract the title from the first line of the overview
  // Remove the Markdown heading syntax
  const title = guideData.overview?.[0]?.replace(/^#\s+/, '') || titleCase(type);
  
  // Join the overview content (skipping the title)
  const overview = guideData.overview?.slice(1).join('\n\n') || '';

  // Extract content between the relevant sections for market analysis
  // Find the whole sections with content
  const targetAudienceContent = extractSectionContent(guideData["market-analysis"], "Target Audience");
  const marketSizeContent = extractSectionContent(guideData["market-analysis"], "Market Size");
  const competitorsContent = extractSectionContent(guideData["market-analysis"], "Competition");
  const trendsContent = extractSectionContent(guideData["market-analysis"], "Trends");

  const marketAnalysis = {
    targetAudience: targetAudienceContent,
    marketSize: marketSizeContent,
    competitors: competitorsContent,
    trends: trendsContent,
  };

  // Parse startup requirements
  const legalContent = extractSectionContent(guideData["startup-requirements"], "Legal Requirements");
  const equipmentContent = extractSectionContent(guideData["startup-requirements"], "Equipment");
  const staffingContent = extractSectionContent(guideData["startup-requirements"], "Staffing");
  const locationContent = extractSectionContent(guideData["startup-requirements"], "Location");

  const startupRequirements = {
    legal: legalContent,
    equipment: equipmentContent,
    staffing: staffingContent,
    location: locationContent,
  };

  // Parse financial plan
  const startupCostsContent = extractSectionContent(guideData["financial-plan"], "Startup Costs");
  const monthlyExpensesContent = extractSectionContent(guideData["financial-plan"], "Monthly Expenses");
  const pricingStrategyContent = extractSectionContent(guideData["financial-plan"], "Pricing Strategy");
  const breakEvenContent = extractSectionContent(guideData["financial-plan"], "Break-Even");
  const fundingOptionsContent = extractSectionContent(guideData["financial-plan"], "Funding Options");

  const financialPlan = {
    startupCosts: startupCostsContent,
    monthlyExpenses: monthlyExpensesContent,
    pricingStrategy: pricingStrategyContent,
    breakEvenAnalysis: breakEvenContent,
    fundingOptions: fundingOptionsContent,
  };

  // Parse marketing strategy
  const brandingContent = extractSectionContent(guideData["marketing-strategy"], "Branding");
  const onlineMarketingContent = extractSectionContent(guideData["marketing-strategy"], "Online Marketing");
  const offlineMarketingContent = extractSectionContent(guideData["marketing-strategy"], "Offline Marketing");
  const customerRetentionContent = extractSectionContent(guideData["marketing-strategy"], "Customer Retention");

  const marketingStrategy = {
    branding: brandingContent,
    onlineMarketing: onlineMarketingContent,
    offlineMarketing: offlineMarketingContent,
    customerRetention: customerRetentionContent,
  };

  return {
    id: type,
    title,
    overview,
    marketAnalysis,
    startupRequirements,
    financialPlan,
    marketingStrategy,
  };
}

// Helper function to extract section content from markdown data
function extractSectionContent(data: string[] | undefined, sectionTitle: string): string {
  if (!data) return '';
  
  // Find the index of the section heading
  const headingIndex = data.findIndex(line => line.includes(sectionTitle));
  if (headingIndex === -1) return '';
  
  // Start from the next line after the heading
  let content = [];
  let currentIndex = headingIndex + 1;
  
  // Collect lines until we hit another heading or the end
  while (currentIndex < data.length && !data[currentIndex].startsWith('#')) {
    content.push(data[currentIndex]);
    currentIndex++;
  }
  
  return content.join('\n').trim();
}

export default function BusinessTypePage({ params }: { params: { type: string } }) {
  const type = params.type;
  const business = businessData[type] || null;
  const guideData = businessGuides[type] || null;
  
  // Create a proper Guide object from the guide data
  const guide = guideData ? createGuideObject(type, guideData) : null;

  if (!business) {
    return (
      <div className="container px-4 md:px-6 py-10 mx-auto text-center">
        <p>Business information not found</p>
        <Link href="/recommendations" className="text-primary hover:underline mt-4 inline-block">
          Return to recommendations
        </Link>
      </div>
    )
  }

  return (
    <div className="container px-4 md:px-6 py-10 mx-auto">
      <Link href="/recommendations" className="flex items-center text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Recommendations
          </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-2">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{business.title}</h1>
          <p className="text-xl text-muted-foreground mb-6">{business.description}</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Startup Cost</span>
              <span className="text-lg font-medium">{business.startupCost}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Profit Margin</span>
              <span className="text-lg font-medium">{business.profitMargin}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Time to Profit</span>
              <span className="text-lg font-medium">{business.timeToProfit}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Risk Level</span>
              <span className="text-lg font-medium">{business.riskLevel}</span>
            </div>
          </div>

          <div className="bg-muted/50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">Expert Advice</h2>
            <p className="italic">{business.expertAdvice}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Key Requirements</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {business.keyRequirements.map((req, i) => (
                <li key={i} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>{req}</span>
                      </li>
                    ))}
                  </ul>
          </div>
        </div>
        <div>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Business Summary</CardTitle>
              <CardDescription>Key information about starting a {business.title}</CardDescription>
                </CardHeader>
                <CardContent>
              <div className="aspect-video relative mb-6 rounded-lg overflow-hidden bg-muted">
                <div className="absolute inset-0 flex items-center justify-center bg-muted">
                  <Building className="h-16 w-16 text-muted-foreground/50" />
                </div>
                  </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Success Rate</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" />
                    <span>4.2/5</span>
                  </div>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm font-medium">Avg. Initial Investment</span>
                  <span>{business.startupCost.split(' - ')[0]}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm font-medium">Ideal Experience</span>
                  <span>{business.riskLevel === "Low" ? "Beginner" : business.riskLevel === "Moderate" ? "Intermediate" : "Advanced"}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm font-medium">Market Demand</span>
                  <span>High</span>
                </div>
              </div>

              <div className="flex space-x-2 mt-6">
                <PdfDownloadButton business={business} className="w-full" />
                <ShareButton business={business} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {guide && <BusinessTypeTabs guide={guide} businessType={type} />}
    </div>
  )
}

