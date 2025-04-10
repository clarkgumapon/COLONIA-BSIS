"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useRecommendations, FormData as RecommendationFormData, BusinessRecommendation } from "@/hooks/use-recommendations"
import Link from "next/link"

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

// Business categories
const businessCategories = [
  "Technology",
  "Food & Beverage",
  "Retail",
  "Professional Services",
  "Health & Wellness",
  "Education",
  "Entertainment",
  "Manufacturing",
  "Construction",
  "Transportation",
]

// Locations
const locations = ["Urban", "Suburban", "Rural", "Online Only"]

// Function to convert title to kebab-case
const titleToKebabCase = (title: string): string => {
  return title.toLowerCase().replace(/\s+/g, '-');
};

export default function RecommendationPage() {
  const [step, setStep] = useState(1)
  const [showResults, setShowResults] = useState(false)
  const [formData, setFormData] = useState<RecommendationFormData>({
    interests: [],
    skills: "",
    budget: [50000],
    location: "",
    experience: "",
    goals: "",
  })
  const [recommendationResults, setRecommendationResults] = useState<BusinessRecommendation[]>([])
  
  const { getRecommendations } = useRecommendations()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Generate recommendations based on form data
    const recommendations = getRecommendations(formData)
    setRecommendationResults(recommendations)
    
    setShowResults(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleBudgetChange = (value: number[]) => {
    setFormData({ ...formData, budget: value })
  }

  const nextStep = () => {
    setStep(step + 1)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const prevStep = () => {
    setStep(step - 1)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="container px-4 md:px-6 py-10 mx-auto">
      {!showResults ? (
        <motion.div initial="hidden" animate="visible" variants={fadeIn} className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <Badge variant="outline" className="mb-4">
              Find Your Perfect Business
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Business Recommendation Finder</h1>
            <p className="text-muted-foreground">
              Answer a few questions to get personalized business recommendations tailored to your interests, skills,
              and budget.
            </p>
          </div>

          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {[1, 2, 3].map((stepNumber) => (
                <div
                  key={stepNumber}
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    step === stepNumber
                      ? "border-primary bg-primary text-primary-foreground"
                      : step > stepNumber
                        ? "border-primary bg-primary/20 text-primary"
                        : "border-muted bg-muted/50 text-muted-foreground"
                  }`}
                >
                  {step > stepNumber ? <CheckCircle2 className="h-5 w-5" /> : stepNumber}
                </div>
              ))}
            </div>
            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-1 bg-muted rounded-full">
                  <div
                    className="h-1 bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${((step - 1) / 2) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className={step >= 1 ? "text-primary font-medium" : "text-muted-foreground"}>
                Interests & Skills
              </span>
              <span className={step >= 2 ? "text-primary font-medium" : "text-muted-foreground"}>
                Budget & Location
              </span>
              <span className={step >= 3 ? "text-primary font-medium" : "text-muted-foreground"}>
                Experience & Goals
              </span>
            </div>
          </div>

          <Card className="border-border/40 shadow-sm">
            <CardHeader>
              <CardTitle>
                {step === 1 && "Tell us about your interests and skills"}
                {step === 2 && "What's your budget and preferred location?"}
                {step === 3 && "Share your experience and business goals"}
              </CardTitle>
              <CardDescription>
                {step === 1 && "This helps us understand what type of business would be a good fit for you"}
                {step === 2 &&
                  "We'll recommend businesses that match your financial resources and location preferences"}
                {step === 3 && "Your experience level and goals help us tailor our recommendations"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="interests" className="text-base">
                        Which business categories interest you the most?
                      </Label>
                      <div className="mt-3 grid grid-cols-2 gap-3">
                        {businessCategories.map((category) => (
                          <div key={category} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={category}
                              className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                              onChange={(e) => {
                                const isChecked = e.target.checked
                                setFormData({
                                  ...formData,
                                  interests: isChecked
                                    ? [...formData.interests, category]
                                    : formData.interests.filter((item) => item !== category),
                                })
                              }}
                              checked={formData.interests.includes(category)}
                            />
                            <Label htmlFor={category} className="text-sm font-normal">
                              {category}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="skills" className="text-base">
                        What skills and expertise do you have?
                      </Label>
                      <Textarea
                        id="skills"
                        placeholder="E.g., technical knowledge, customer service, management experience, etc."
                        className="mt-2"
                        rows={4}
                        value={formData.skills}
                        onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button 
                        type="button" 
                        onClick={nextStep} 
                        className="group"
                        disabled={formData.interests.length === 0}
                      >
                        Next Step
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="budget" className="text-base mb-6 block">
                        What's your budget for starting a business?
                      </Label>
                      <div className="px-3">
                        <Slider
                          defaultValue={formData.budget}
                          max={200000}
                          step={5000}
                          onValueChange={handleBudgetChange}
                        />
                        <div className="mt-2 flex justify-between text-sm text-muted-foreground">
                          <span>₱0</span>
                          <span>₱100,000</span>
                          <span>₱200,000+</span>
                        </div>
                        <p className="mt-4 text-center font-medium">₱{formData.budget[0].toLocaleString()}</p>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="location" className="text-base">
                        Preferred business location type
                      </Label>
                      <RadioGroup
                        id="location"
                        className="mt-3 grid grid-cols-2 gap-3"
                        value={formData.location}
                        onValueChange={(value) => setFormData({ ...formData, location: value })}
                      >
                        {locations.map((location) => (
                          <div key={location} className="flex items-center space-x-2">
                            <RadioGroupItem value={location} id={location} />
                            <Label htmlFor={location} className="text-sm font-normal">
                              {location}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                    <div className="flex justify-between">
                      <Button type="button" variant="outline" onClick={prevStep}>
                        Previous
                      </Button>
                      <Button 
                        type="button" 
                        onClick={nextStep} 
                        className="group"
                        disabled={!formData.location}
                      >
                        Next Step
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="experience" className="text-base">
                        What's your level of business experience?
                      </Label>
                      <Select
                        value={formData.experience}
                        onValueChange={(value) => setFormData({ ...formData, experience: value })}
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select your experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">No prior business experience</SelectItem>
                          <SelectItem value="some">Some experience (worked in business)</SelectItem>
                          <SelectItem value="moderate">Moderate (managed teams/departments)</SelectItem>
                          <SelectItem value="experienced">Experienced (previously owned a business)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="goals" className="text-base">
                        What are your primary goals for starting a business?
                      </Label>
                      <Textarea
                        id="goals"
                        placeholder="E.g., financial independence, pursuing a passion, creating jobs in your community, etc."
                        className="mt-2"
                        rows={4}
                        value={formData.goals}
                        onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                      />
                    </div>
                    <div className="flex justify-between">
                      <Button type="button" variant="outline" onClick={prevStep}>
                        Previous
                      </Button>
                      <Button 
                        type="submit" 
                        className="group"
                        disabled={!formData.experience}
                      >
                        Get Recommendations
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          <div className="mb-8 text-center">
            <Badge variant="outline" className="mb-4">
              Personalized For You
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Your Personalized Business Recommendations</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Based on your interests, skills, budget, and goals, we've identified these business opportunities that
              would be a great fit for you.
            </p>
          </div>

          <div className="space-y-8">
            {recommendationResults.map((result, index) => (
              <Card
                key={index}
                className="overflow-hidden border-border/40 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/4 bg-muted/50 p-6 flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="text-2xl font-bold">{result.title}</h2>
                      <Badge variant="secondary">{result.match} Match</Badge>
                    </div>
                    <div className="text-3xl font-bold text-primary mb-4">{result.match} Match</div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Startup Cost</p>
                        <p className="font-medium">{result.startupCost}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Profit Margin</p>
                        <p className="font-medium">{result.profitMargin}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Time to Profit</p>
                        <p className="font-medium">{result.timeToProfit}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Risk Level</p>
                        <p className="font-medium">{result.riskLevel}</p>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-3/4 p-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold mb-2">Business Overview</h3>
                      <p>{result.description}</p>
                    </div>
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold mb-2">Key Requirements</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {result.keyRequirements.map((req, i) => (
                          <li key={i}>{req}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Expert Advice</h3>
                      <p className="italic">{result.expertAdvice}</p>
                    </div>
                    <div className="mt-6">
                      <Link href={`/recommendations/${titleToKebabCase(result.title)}`}>
                        <Button className="group">
                          View Detailed Guide
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button variant="outline" onClick={() => setShowResults(false)}>
              Refine Your Preferences
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  )
}

