import { useState, useCallback } from 'react';

export interface BusinessRecommendation {
  title: string;
  match: string;
  description: string;
  startupCost: string;
  profitMargin: string;
  timeToProfit: string;
  riskLevel: string;
  keyRequirements: string[];
  expertAdvice: string;
}

export interface FormData {
  interests: string[];
  skills: string;
  budget: number[];
  location: string;
  experience: string;
  goals: string;
}

export interface RecommendationFilters {
  category?: string;
  maxBudget?: number;
  minMatch?: number;
}

// Complete business recommendations database
const businessRecommendations: BusinessRecommendation[] = [
  {
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
  {
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
  {
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
  {
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
  {
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
  },
  {
    title: "Healthcare Consultancy",
    match: "79%",
    description:
      "Provide specialized consulting services to healthcare providers, focusing on operational efficiency, compliance, and technology integration. This business leverages expertise in healthcare systems.",
    startupCost: "₱20,000 - ₱40,000",
    profitMargin: "45-60%",
    timeToProfit: "8-12 months",
    riskLevel: "Low to Moderate",
    keyRequirements: [
      "Experience in healthcare administration or practice",
      "Knowledge of healthcare regulations and compliance",
      "Strong network of industry contacts",
      "Problem-solving and analytical skills",
    ],
    expertAdvice:
      "Build credibility through case studies and testimonials. Consider obtaining relevant certifications. Networking and relationship building are crucial for client acquisition in this industry.",
  },
  {
    title: "Food Truck",
    match: "85%",
    description:
      "A mobile food business offering specialized cuisine. Food trucks combine lower overhead than restaurants with the flexibility to test different locations and events.",
    startupCost: "₱150,000 - ₱250,000",
    profitMargin: "20-35%",
    timeToProfit: "12-18 months",
    riskLevel: "Moderate",
    keyRequirements: [
      "Culinary skills and food preparation knowledge",
      "Food truck vehicle and equipment",
      "Permits and licenses for mobile food service",
      "Knowledge of high-traffic locations and events",
    ],
    expertAdvice:
      "Develop a signature dish or concept that stands out. Build a strong social media presence to communicate your location and specials. Consider partnering with breweries or events that don't offer food services.",
  },
  {
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
  {
    title: "Personal Fitness Training",
    match: "78%",
    description:
      "Offer personalized fitness training services either online or in-person. This business can start small and scale based on client demand and your availability.",
    startupCost: "₱5,000 - ₱15,000",
    profitMargin: "70-90%",
    timeToProfit: "1-3 months",
    riskLevel: "Very Low",
    keyRequirements: [
      "Fitness knowledge and training certification",
      "Communication and motivational skills",
      "Basic fitness equipment",
      "Client management system",
    ],
    expertAdvice:
      "Consider specializing in a particular demographic or fitness goal. Creating online programs can help scale beyond one-on-one sessions. Building before-and-after case studies will help attract new clients.",
  },
  {
    title: "Sustainable Retail Store",
    match: "83%",
    description:
      "A retail business focusing on environmentally friendly and sustainable products. This business caters to the growing market of eco-conscious consumers seeking alternatives to conventional products.",
    startupCost: "₱80,000 - ₱120,000",
    profitMargin: "35-45%",
    timeToProfit: "12-18 months",
    riskLevel: "Moderate",
    keyRequirements: [
      "Knowledge of sustainable products and practices",
      "Retail space in an appropriate location",
      "Relationships with eco-friendly suppliers",
      "Strong brand identity aligned with sustainability",
    ],
    expertAdvice:
      "Educate customers about the benefits of sustainable products through in-store displays and digital content. Consider a hybrid model with both physical and online presence to reach more customers.",
  },
];

// Map of business categories to relevant business types
const categoryToBusinessMap: Record<string, string[]> = {
  "Technology": ["Computer Shop", "IT Consulting", "Tech Repair Service", "Online Education Platform"],
  "Food & Beverage": ["Coffee Shop", "Food Truck"],
  "Retail": ["Computer Shop", "Sustainable Retail Store"],
  "Professional Services": ["IT Consulting", "Healthcare Consultancy", "Digital Marketing Agency"],
  "Health & Wellness": ["Personal Fitness Training", "Healthcare Consultancy"],
  "Education": ["Online Education Platform"],
  "Entertainment": [],
  "Manufacturing": [],
  "Construction": [],
  "Transportation": [],
};

// Map of experience levels to numeric values
const experienceValues: Record<string, number> = {
  "none": 0,
  "some": 1,
  "moderate": 2,
  "experienced": 3,
};

export function useRecommendations() {
  const [recommendations, setRecommendations] = useState<BusinessRecommendation[]>([]);
  const [filters, setFilters] = useState<RecommendationFilters>({});

  const getRecommendations = useCallback((formData: FormData) => {
    // Extract budget value
    const budget = formData.budget[0];
    
    // Get all business titles that match selected categories
    const relevantBusinessTitles = new Set<string>();
    formData.interests.forEach(interest => {
      categoryToBusinessMap[interest]?.forEach(business => {
        relevantBusinessTitles.add(business);
      });
    });
    
    // Score each business
    const scoredRecommendations = businessRecommendations.map(business => {
      let score = 0;
      
      // Category match (0-40 points)
      if (relevantBusinessTitles.has(business.title)) {
        score += 40;
      }
      
      // Budget match (0-30 points)
      const costRange = business.startupCost.replace(/[₱,]/g, '').split(' - ');
      const minCost = parseInt(costRange[0]);
      const maxCost = parseInt(costRange[1]);
      
      if (budget >= minCost && (budget >= maxCost || budget >= minCost * 1.5)) {
        score += 30;
      } else if (budget >= minCost) {
        score += 20;
      } else if (budget >= minCost * 0.7) {
        score += 10;
      }
      
      // Location match (0-15 points)
      if (formData.location) {
        const lowRiskBusinesses = ["IT Consulting", "Online Education Platform", "Digital Marketing Agency", "Personal Fitness Training"];
        const onlineBusinesses = ["Online Education Platform", "Digital Marketing Agency"];
        
        if (formData.location === "Online Only" && onlineBusinesses.includes(business.title)) {
          score += 15;
        } else if (formData.location === "Urban" && business.title !== "Online Education Platform") {
          score += 15;
        } else if (formData.location === "Suburban" && !onlineBusinesses.includes(business.title)) {
          score += 10;
        } else if (formData.location === "Rural" && lowRiskBusinesses.includes(business.title)) {
          score += 5;
        }
      }
      
      // Experience match (0-15 points)
      if (formData.experience) {
        const experienceLevel = experienceValues[formData.experience];
        const riskLevels: Record<string, number> = {
          "Very Low": 0,
          "Low": 1,
          "Low to Moderate": 2,
          "Moderate": 3,
          "Moderate to High": 4,
          "High": 5,
        };
        
        const businessRisk = riskLevels[business.riskLevel] || 3;
        
        // Higher experience = more points for higher risk businesses
        if (experienceLevel >= businessRisk) {
          score += 15;
        } else if (experienceLevel + 1 >= businessRisk) {
          score += 10;
        } else {
          score += 5;
        }
      }
      
      // Convert score to match percentage (max score is 100)
      const matchPercentage = `${Math.min(Math.round(score), 98)}%`;
      
      return {
        ...business,
        match: matchPercentage,
        score: score
      };
    });
    
    // Sort by score (highest first) and remove the score property
    const sortedRecommendations = scoredRecommendations
      .sort((a, b) => (b.score || 0) - (a.score || 0))
      .map(({ score, ...rest }) => rest);
    
    // Apply any filters
    let filteredRecommendations = sortedRecommendations;
    
    if (filters.category) {
      filteredRecommendations = filteredRecommendations.filter(business => 
        categoryToBusinessMap[filters.category!]?.includes(business.title)
      );
    }
    
    if (filters.maxBudget) {
      filteredRecommendations = filteredRecommendations.filter(business => {
        const costRange = business.startupCost.replace(/[₱,]/g, '').split(' - ');
        const minCost = parseInt(costRange[0]);
        return minCost <= filters.maxBudget!;
      });
    }
    
    if (filters.minMatch) {
      filteredRecommendations = filteredRecommendations.filter(business => {
        const matchPercent = parseInt(business.match.replace('%', ''));
        return matchPercent >= filters.minMatch!;
      });
    }
    
    // Return the top recommendations
    setRecommendations(filteredRecommendations);
    return filteredRecommendations;
  }, [filters]);

  const updateFilters = useCallback((newFilters: RecommendationFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  return {
    recommendations,
    getRecommendations,
    filters,
    updateFilters
  };
} 