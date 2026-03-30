import { CareerReport } from "@/types";

// Mock report returned when API keys are not configured or for testing
export function getMockReport(
  name: string = "Nilesh Sharma",
  currentRole: string = "Senior Software Engineer",
  experience: number = 8,
  currentSalary: string = "25-40 LPA",
  desiredSalary: string = "40-60 LPA",
  preferredCities: string[] = ["Bangalore", "Hyderabad"]
): CareerReport {
  return {
    profile: {
      name,
      email: "user@example.com",
      currentRole,
      currentCompany: "Tech Mahindra",
      totalExperience: experience,
      skills: [
        "Java", "Spring Boot", "React", "Node.js", "AWS", "Docker",
        "Kubernetes", "PostgreSQL", "MongoDB", "Redis", "Git",
        "Microservices", "REST APIs", "CI/CD", "Agile"
      ],
      topSkills: ["Java", "Spring Boot", "AWS", "React", "Microservices"],
      education: [
        { degree: "B.Tech Computer Science", institution: "BITS Pilani", year: "2016" }
      ],
      experience: [
        {
          title: "Senior Software Engineer",
          company: "Tech Mahindra",
          duration: "Jan 2021 - Present",
          highlights: [
            "Led a team of 4 engineers to build microservices platform",
            "Migrated legacy monolith to AWS ECS, reducing infra costs by 35%",
            "Designed and shipped high-traffic payment APIs handling 10K RPS"
          ]
        },
        {
          title: "Software Engineer",
          company: "Infosys",
          duration: "Jun 2016 - Dec 2020",
          highlights: [
            "Built full-stack features for banking client using Java + Angular",
            "Improved query performance by 60% through indexing and caching"
          ]
        }
      ],
      certifications: ["AWS Solutions Architect Associate"],
      summary: `${experience}-year software engineer with strong Java/Spring Boot and cloud experience. Proven track record of leading small teams and delivering high-scale systems. Now aiming to move into a technical leadership or engineering management role.`
    },
    positioning: {
      currentLevel: "Senior Engineer (IC4 / SDE-II equivalent)",
      marketPositioning: "Top 30% of engineers with your experience in Bangalore",
      salaryBenchmark: {
        low: 2200000,
        median: 3000000,
        high: 4500000,
        userCurrent: 3200000,
        currency: "INR"
      },
      positioningInsight: "Your Spring Boot + AWS combination is highly sought after. Your salary is slightly above median but below the top quartile, indicating room to grow by adding ML/AI or system design depth."
    },
    careerPaths: [
      {
        role: "Engineering Manager",
        fitReason: "You've led a team of 4 and shipped complex infra migrations. The cross-functional ownership experience at Tech Mahindra directly translates to EM responsibilities.",
        demandLevel: "High",
        salaryRange: { min: 4000000, max: 7000000, currency: "INR" },
        transitionDifficulty: "Moderate",
        timelineMonths: 6,
        keyRequirements: ["People management", "Roadmap planning", "Cross-team collaboration", "OKR setting"],
        readinessScore: 72
      },
      {
        role: "Staff / Principal Engineer",
        fitReason: "Your systems design work on the microservices platform and payment APIs shows the depth needed. Moving to Staff IC is a natural technical progression.",
        demandLevel: "High",
        salaryRange: { min: 4500000, max: 8000000, currency: "INR" },
        transitionDifficulty: "Hard",
        timelineMonths: 9,
        keyRequirements: ["Deep system design", "Technical vision", "Cross-org influence", "Distributed systems"],
        readinessScore: 58
      },
      {
        role: "Solutions Architect",
        fitReason: "Your AWS certification + hands-on cloud migration experience makes you a strong fit for pre-sales or customer-facing architecture roles at AWS, Google Cloud, or cloud-native ISVs.",
        demandLevel: "Medium",
        salaryRange: { min: 3500000, max: 5500000, currency: "INR" },
        transitionDifficulty: "Easy",
        timelineMonths: 3,
        keyRequirements: ["AWS Professional cert", "Client communication", "Proposal writing", "Multi-cloud knowledge"],
        readinessScore: 81
      }
    ],
    skillGaps: [
      {
        skill: "System Design (Advanced)",
        importance: "Critical",
        userLevel: "Intermediate",
        marketDemand: 84,
        recommendation: "Study Grokking the System Design Interview + build a project with consistent hashing, rate limiting, and event sourcing.",
        effortLevel: "Long-term Investment",
        impactLevel: "High"
      },
      {
        skill: "Machine Learning / AI Integration",
        importance: "Critical",
        userLevel: "Missing",
        marketDemand: 61,
        recommendation: "Complete fast.ai Practical Deep Learning for Coders (free). Build one AI-augmented feature in your next side project.",
        effortLevel: "Medium Effort",
        impactLevel: "High"
      },
      {
        skill: "Kubernetes (Advanced)",
        importance: "High",
        userLevel: "Beginner",
        marketDemand: 72,
        recommendation: "Get CKA (Certified Kubernetes Administrator). Practice on killer.sh — 2-3 hours/week for 6 weeks.",
        effortLevel: "Long-term Investment",
        impactLevel: "High"
      },
      {
        skill: "TypeScript",
        importance: "High",
        userLevel: "Missing",
        marketDemand: 67,
        recommendation: "Your JavaScript/React experience means TypeScript is a quick add. Complete the TypeScript Handbook in 1 weekend.",
        effortLevel: "Quick Win",
        impactLevel: "Medium"
      },
      {
        skill: "AWS Professional / DevOps Pro",
        importance: "High",
        userLevel: "Intermediate",
        marketDemand: 58,
        recommendation: "Upgrade your existing AWS Associate cert to Professional level. Adds ₹8-15 LPA to salary expectations.",
        effortLevel: "Medium Effort",
        impactLevel: "High"
      },
      {
        skill: "Kafka / Event Streaming",
        importance: "Medium",
        userLevel: "Missing",
        marketDemand: 44,
        recommendation: "Confluent's free Kafka fundamentals course + build a real-time notification system as a portfolio project.",
        effortLevel: "Medium Effort",
        impactLevel: "Medium"
      }
    ],
    skillMatches: [
      { skill: "Java / Spring Boot", strength: "Strong", marketDemand: 78 },
      { skill: "AWS", strength: "Strong", marketDemand: 82 },
      { skill: "Microservices", strength: "Strong", marketDemand: 71 },
      { skill: "React", strength: "Moderate", marketDemand: 69 },
      { skill: "Docker", strength: "Moderate", marketDemand: 74 },
      { skill: "PostgreSQL", strength: "Moderate", marketDemand: 55 }
    ],
    marketInsights: [
      {
        title: "AI-augmented engineering is the new baseline",
        description: "61% of senior engineer JDs in Bangalore now mention LLM integration, RAG pipelines, or AI feature development. Engineers who can ship AI-powered features command a 20-30% salary premium.",
        dataPoint: "61% of senior roles now mention AI/ML skills",
        trend: "Rising"
      },
      {
        title: "Kubernetes expertise is a major salary lever",
        description: "Roles requiring CKA or advanced K8s pay ₹8-15 LPA more than equivalent roles without it. Supply is still low relative to demand.",
        dataPoint: "72% of platform/backend JDs require Kubernetes",
        trend: "Rising"
      },
      {
        title: "Java is still king in Indian enterprise hiring",
        description: "Despite the rise of Go and Rust, Java/Spring Boot remains the dominant backend stack in Indian product and services companies. Your Java depth is a durable asset.",
        dataPoint: "78% of backend roles list Java as primary language",
        trend: "Stable"
      },
      {
        title: "Remote-first premium fading in 2025",
        description: "After 2 years of remote-first, most Bangalore product companies have returned to hybrid (3 days/week). Fully remote senior roles are down 40% since 2023.",
        dataPoint: "40% decline in fully remote senior roles since 2023",
        trend: "Declining"
      },
      {
        title: "Engineering Manager demand outpacing supply",
        description: "Product companies are promoting ICs to EM faster than ever. Companies like Flipkart, Swiggy, and Zepto are hiring EMs with only 1-2 years of people management.",
        dataPoint: "EM roles grew 35% YoY in Bangalore product companies",
        trend: "Rising"
      }
    ],
    actionPlan: [
      {
        week: "Week 1-2",
        action: "Update resume and LinkedIn to highlight leadership impact",
        category: "Application",
        priority: "High",
        details: "Quantify your team lead and infra migration impact. Add metrics like cost savings (35%), performance improvements (60%), RPS numbers. Update LinkedIn headline to 'Senior SWE → Engineering Leader'.",
        weeklyCommitment: "3-4 hours",
        expectedOutcome: "Resume and LinkedIn profile updated with quantified impact metrics"
      },
      {
        week: "Week 1-2",
        action: "Start Advanced System Design preparation",
        category: "Skill",
        priority: "High",
        details: "Buy 'Designing Data-Intensive Applications' by Martin Kleppmann. Read Chapters 1-4. Join systemdesignprimer.com. Dedicate 1 hour/day.",
        weeklyCommitment: "7 hours/week",
        expectedOutcome: "Complete reading of Chapters 1-4 of DDIA"
      },
      {
        week: "Week 3-4",
        action: "Complete TypeScript fundamentals",
        category: "Skill",
        priority: "High",
        details: "Work through the official TypeScript Handbook (typescriptlang.org/docs/handbook). Convert one of your existing React projects to TypeScript. Should take ~12 hours total.",
        weeklyCommitment: "6 hours/week",
        expectedOutcome: "Convert one React project to TypeScript, understand type system basics"
      },
      {
        week: "Week 3-4",
        action: "Register for CKA exam and begin prep",
        category: "Certification",
        priority: "High",
        details: "Register at training.linuxfoundation.org. Use Mumshad Mannambeth's CKA course on Udemy. Practice on killer.sh simulator.",
        weeklyCommitment: "10-12 hours/week",
        expectedOutcome: "Register for exam, complete first 3 modules of CKA course"
      },
      {
        week: "Week 5-6",
        action: "Build an AI-augmented project for portfolio",
        category: "Project",
        priority: "High",
        details: "Build a GitHub repository analyzer using OpenAI API that surfaces code quality insights. Demonstrates AI integration skills directly relevant to current market demand.",
        weeklyCommitment: "15-20 hours/week",
        expectedOutcome: "GitHub repo with working AI-augmented project + README documentation"
      },
      {
        week: "Week 5-6",
        action: "Apply to 5 target companies per week",
        category: "Application",
        priority: "High",
        details: "Target: Zepto, Meesho, Razorpay, PhonePe, Setu, Juspay (fintech+infra focus). Use LinkedIn Easy Apply + direct email to engineering heads. Leverage your AWS + Java stack.",
        weeklyCommitment: "5-8 hours/week",
        expectedOutcome: "10 job applications submitted to target companies"
      },
      {
        week: "Week 7-8",
        action: "Complete Kafka fundamentals course",
        category: "Skill",
        priority: "Medium",
        details: "Confluent's free Kafka Fundamentals course (6 hours). Build a real-time event pipeline as a portfolio project. Push to GitHub.",
        weeklyCommitment: "8 hours/week",
        expectedOutcome: "Complete Kafka course + build working event pipeline project"
      },
      {
        week: "Week 7-8",
        action: "Appear for CKA exam",
        category: "Certification",
        priority: "High",
        details: "Take the CKA exam after 4 weeks of prep. This certification directly unlocks ₹8-15 LPA higher offers. Schedule on a weekend morning.",
        weeklyCommitment: "20 hours/week",
        expectedOutcome: "Pass CKA exam and receive certification"
      },
      {
        week: "Week 9-10",
        action: "Start ML/AI fundamentals",
        category: "Skill",
        priority: "Medium",
        details: "Begin fast.ai Practical Deep Learning for Coders (free). Focus on Lesson 1-3 covering inference and fine-tuning. Don't go deep into theory — focus on integration patterns.",
        weeklyCommitment: "6-8 hours/week",
        expectedOutcome: "Complete Lessons 1-3 of fast.ai course"
      },
      {
        week: "Week 9-10",
        action: "Network with EMs and Staff Engineers",
        category: "Network",
        priority: "Medium",
        details: "Send 10 LinkedIn connection requests/week to EMs at Bangalore unicorns. Ask for 15-min chats. Join HasGeek, Bangalore Tech Slack, and attend JSFoo / RubyConf India events.",
        weeklyCommitment: "4-5 hours/week",
        expectedOutcome: "Establish 5-10 connections, attend 1 tech meetup"
      },
      {
        week: "Week 11-12",
        action: "Upgrade AWS certification to Professional",
        category: "Certification",
        priority: "Medium",
        details: "Study for AWS Solutions Architect Professional. Use Adrian Cantrill's SAP-C02 course. This paired with your existing Associate cert creates a compelling cloud story.",
        weeklyCommitment: "12-14 hours/week",
        expectedOutcome: "Complete SAP-C02 course, take practice exams (80%+ score)"
      },
      {
        week: "Week 11-12",
        action: "Negotiate and close offers",
        category: "Application",
        priority: "High",
        details: "By week 12, you should have 2-3 offers. Counter every offer. Reference your CKA cert + AI project. Target ₹40-50 LPA for EM/Senior roles, ₹45-60 LPA for Staff IC.",
        weeklyCommitment: "8-10 hours/week",
        expectedOutcome: "Receive and negotiate 2-3 job offers, target ₹45-50L package"
      }
    ],
    jobMatches: [
      {
        title: "Engineering Manager - Platform",
        company: "Razorpay",
        location: "Bangalore",
        salary: "₹45L - ₹70L",
        matchScore: 94,
        matchReasons: ["Java + Spring Boot matches stack", "Your payments API experience is directly relevant", "AWS infra background fits their cloud-native infra"],
        whyYouMatch: "You've already built high-throughput payment APIs handling 10K RPS, which is exactly what Razorpay's platform needs. Your 4-person team leadership experience and cross-functional work on the infra migration directly align with an EM role here.",
        whyYouMightGetRejected: "You may lack direct fintech domain knowledge in compliance/regulatory systems. Be ready to discuss how you'd ramp up on PCI-DSS, RBI reporting, and payment gateway standards.",
        applyUrl: "https://razorpay.com/jobs",
        postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        title: "Senior Software Engineer - Backend",
        company: "Zepto",
        location: "Mumbai",
        salary: "₹35L - ₹55L",
        matchScore: 91,
        matchReasons: ["High-traffic systems experience (10K RPS)", "Java/Microservices stack match", "AWS deployment expertise"],
        whyYouMatch: "Your experience shipping high-scale systems (10K RPS) directly translates to Zepto's need for handling millions of daily grocery orders. Your microservices architecture + Spring Boot expertise is their primary backend stack.",
        whyYouMightGetRejected: "You may lack specific experience with real-time inventory management systems or ML-driven supply chain optimization, which are unique to fast-commerce",
        applyUrl: "https://zepto.com/careers",
        postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        title: "Staff Engineer - Infrastructure",
        company: "PhonePe",
        location: "Bangalore",
        salary: "₹50L - ₹80L",
        matchScore: 88,
        matchReasons: ["Kubernetes + Docker background", "Microservices architecture experience", "Cloud cost optimization (35% reduction) aligns with their efficiency goals"],
        whyYouMatch: "Your Infrastructure team led a 35% cost reduction through AWS optimization—exactly what PhonePe values in Staff infra roles. Your Kubernetes + Docker depth and microservices design directly addresses their platform challenges.",
        whyYouMightGetRejected: "Staff IC roles require deeper involvement in distributed systems research/design at scale. You may need to showcase contributions to open-source or published technical writing.",
        applyUrl: "https://phonepe.com/en-in/careers",
        postedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        title: "Solutions Architect",
        company: "AWS India",
        location: "Hyderabad",
        salary: "₹40L - ₹65L",
        matchScore: 85,
        matchReasons: ["AWS Solutions Architect certification", "Client-facing architecture background", "Deep AWS services knowledge"],
        whyYouMatch: "Your AWS Solutions Architect certification + hands-on cloud migration experience (35% cost reduction) makes you a strong fit for a SA role. You can speak credibly to enterprise AWS adoption patterns.",
        whyYouMightGetRejected: "SA roles prioritize pre-sales/customer-facing skills over hands-on engineering. You may need to demonstrate comfort with PowerPoint presentations, RFP responses, and stakeholder management.",
        applyUrl: "https://amazon.jobs",
        postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        title: "Engineering Manager - Full Stack",
        company: "Meesho",
        location: "Bangalore",
        salary: "₹42L - ₹65L",
        matchScore: 83,
        matchReasons: ["React + Java full-stack profile", "Prior team lead experience", "E-commerce domain exposure"],
        whyYouMatch: "You have the full-stack chops (React + Java) and team leadership experience that Meesho EM roles need. Your shipping velocity on both backend + frontend improvements aligns with their fast-moving culture.",
        whyYouMightGetRejected: "Meesho prefers managers with explicit unit economics/growth metric exposure. Be prepared to discuss how you've driven revenue impact or improved retention metrics.",
        applyUrl: "https://meesho.com/careers",
        postedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        title: "Senior Backend Engineer - Payments",
        company: "Juspay",
        location: "Bangalore",
        salary: "₹35L - ₹50L",
        matchScore: 89,
        matchReasons: ["Payments API experience is core requirement", "Java expertise (Haskell/Java shop)", "High-throughput system design"],
        whyYouMatch: "Your 10K RPS payment API experience is exactly what Juspay's platform business needs. You've already worked in a similar domain at Tech Mahindra, reducing their learning curve.",
        whyYouMightGetRejected: "Juspay is known for its functional programming culture (Haskell backend). You may feel like an outsider if you over-index on OOP Java philosophy.",
        applyUrl: "https://juspay.in/careers",
        postedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        title: "Platform Engineering Lead",
        company: "CRED",
        location: "Bangalore",
        salary: "₹45L - ₹70L",
        matchScore: 82,
        matchReasons: ["Platform/infra background", "Docker + Kubernetes skills", "AWS + microservices architecture"],
        whyYouMatch: "Your infrastructure expertise + Docker/K8s depth directly maps to CRED's platform team needs. Your cost optimization mindset (35% AWS savings) aligns with their lean operational approach.",
        whyYouMightGetRejected: "CRED has a strong internal FinTech engineering culture. You may need to demonstrate familiarity with credit/lending product dynamics beyond payments.",
        applyUrl: "https://cred.club/careers",
        postedDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        title: "Senior SDE - Cloud Infrastructure",
        company: "Flipkart",
        location: "Bangalore",
        salary: "₹38L - ₹58L",
        matchScore: 80,
        matchReasons: ["Cloud migration experience", "AWS + containerization skills", "Large-scale systems background"],
        whyYouMatch: "Your cloud migration experience + AWS expertise directly aligns with Flipkart's ongoing platform modernization. Your microservices architecture work translates well.",
        whyYouMightGetRejected: "Flipkart's scale (100K+ RPS) requires even deeper distributed systems knowledge than your current experience. Be prepared for architecture deep dives.",
        applyUrl: "https://flipkartcareers.com",
        postedDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
      }
    ],
    wowInsight: {
      title: "Expected Salary Jump",
      description: "By following the Engineering Manager path and acquiring CKA + AWS Professional certifications over 12 months, your market value can increase by",
      metric: "₹20-30 lakhs per annum"
    },
    resumeSuggestions: [
      {
        category: "Summary",
        issue: "Generic overview without quantified impact",
        suggestion: "Replace vague description with concrete metrics and achievements",
        impact: "High",
        example: "Instead of '8-year software engineer with strong Java and cloud experience', write '8-year backend engineer: led migration to microservices reducing costs by 35%, shipped 10K RPS payment APIs, managed team of 4 engineers'"
      },
      {
        category: "Skills Section",
        issue: "Missing high-demand certifications",
        suggestion: "Add AWS Solutions Architect Associate and emphasize CKA (if you pursue it)",
        impact: "High",
        example: "Add 'Certifications: AWS Solutions Architect Associate, [CKA - in progress]' to increase visibility for cloud-focused roles"
      },
      {
        category: "Experience Highlights",
        issue: "Weak quantification of system design impact",
        suggestion: "Add scale metrics (RPS, QPS, latency improvements) to backend system descriptions",
        impact: "High",
        example: "Change 'Built microservices platform' to 'Architected microservices platform handling 10K RPS with 99.9% uptime, reducing deployment time from 30 min to 5 min'"
      },
      {
        category: "Skills Section",
        issue: "Missing AI/ML mentions despite market demand",
        suggestion: "Add 'LLM Integration' or 'AI-Augmented Features' if you have even exploratory experience",
        impact: "Medium",
        example: "Add 'AI/ML: Experimented with OpenAI API for code analysis tools' if applicable, even if not production-ready"
      },
      {
        category: "Leadership & Impact",
        issue: "Not highlighting team leadership explicitly",
        suggestion: "Create a dedicated line for team/mentoring achievements",
        impact: "Medium",
        example: "Add 'Leadership: Led team of 4 engineers, mentored 2 junior developers to IC3+ level, conducted system design interviews'"
      }
    ],
    generatedAt: new Date().toISOString()
  };
}
