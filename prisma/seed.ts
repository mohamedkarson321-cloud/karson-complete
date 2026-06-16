import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding KARSON database...");

  // ── Admin user ──────────────────────────────────────────────────────────────
  const adminPassword = await bcrypt.hash("Admin@123456", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@karson.ai" },
    update: {},
    create: {
      name: "KARSON Admin",
      email: "admin@karson.ai",
      password: adminPassword,
      role: "SUPER_ADMIN",
      status: "ACTIVE",
      emailVerified: new Date(),
    },
  });
  console.log("✅ Admin user created:", admin.email);

  // ── Demo client user ────────────────────────────────────────────────────────
  const clientPassword = await bcrypt.hash("Client@123456", 12);
  const client = await prisma.user.upsert({
    where: { email: "client@example.com" },
    update: {},
    create: {
      name: "Sarah Chen",
      email: "client@example.com",
      password: clientPassword,
      role: "CLIENT",
      status: "ACTIVE",
      company: "NexaTech Ventures",
      emailVerified: new Date(),
    },
  });
  console.log("✅ Demo client created:", client.email);

  // ── Blog categories ─────────────────────────────────────────────────────────
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: "ai-engineering" },
      update: {},
      create: { name: "AI Engineering", slug: "ai-engineering", color: "#3B82F6" },
    }),
    prisma.category.upsert({
      where: { slug: "web-development" },
      update: {},
      create: { name: "Web Development", slug: "web-development", color: "#8B5CF6" },
    }),
    prisma.category.upsert({
      where: { slug: "cloud" },
      update: {},
      create: { name: "Cloud", slug: "cloud", color: "#06B6D4" },
    }),
    prisma.category.upsert({
      where: { slug: "security" },
      update: {},
      create: { name: "Security", slug: "security", color: "#EF4444" },
    }),
  ]);
  console.log("✅ Categories created:", categories.length);

  // ── Sample blog post ────────────────────────────────────────────────────────
  await prisma.blogPost.upsert({
    where: { slug: "fine-tuning-llms-production" },
    update: {},
    create: {
      title: "Fine-Tuning LLMs for Production: A Complete Engineering Guide",
      slug: "fine-tuning-llms-production",
      excerpt: "Everything we've learned deploying 20+ fine-tuned language models in production. From dataset preparation to serving at scale with vLLM.",
      content: `# Fine-Tuning LLMs for Production\n\nThis is a comprehensive guide to fine-tuning large language models for production use cases...\n\n## Why Fine-Tune?\n\nFine-tuning allows you to adapt a pre-trained model to your specific domain...`,
      authorId: admin.id,
      categoryId: categories[0]!.id,
      tags: ["LLM", "Fine-tuning", "MLOps", "Python"],
      status: "PUBLISHED",
      readingTime: 18,
      isFeatured: true,
      publishedAt: new Date(),
      seoTitle: "Fine-Tuning LLMs for Production | KARSON Engineering Blog",
      seoDescription: "Complete guide to fine-tuning LLMs for production: dataset prep, training, serving at scale with vLLM.",
    },
  });
  console.log("✅ Sample blog post created");

  // ── Services ────────────────────────────────────────────────────────────────
  const services = [
    { name: "AI Solutions", slug: "ai-solutions", category: "AI_SOLUTIONS", tagline: "Intelligence that works in production", description: "Custom LLMs, computer vision, and AI automation.", startingPrice: 25000 },
    { name: "Web Development", slug: "web-development", category: "WEB_DEVELOPMENT", tagline: "Performant, accessible, production-ready", description: "Full-stack applications with Next.js and TypeScript.", startingPrice: 15000 },
    { name: "Cloud Solutions", slug: "cloud-solutions", category: "CLOUD_SOLUTIONS", tagline: "Infrastructure that scales before you need it", description: "AWS, GCP, Azure architecture and Kubernetes.", startingPrice: 18000 },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: {
        ...service,
        category: service.category as "AI_SOLUTIONS" | "WEB_DEVELOPMENT" | "CLOUD_SOLUTIONS",
        features: ["Custom implementation", "Full documentation", "Post-launch support"],
        technologies: ["TypeScript", "Python", "AWS"],
        deliverables: ["Source code", "Documentation", "Training"],
        isActive: true,
      },
    });
  }
  console.log("✅ Services created");

  // ── Pricing plans ───────────────────────────────────────────────────────────
  await Promise.all([
    prisma.pricingPlan.upsert({
      where: { slug: "starter" },
      update: {},
      create: {
        name: "Starter", slug: "starter", tier: "STARTER",
        monthlyPrice: 4900, annualPrice: 3900,
        features: ["1 active project", "Weekly calls", "30-day support"],
        limitations: ["No AI/ML", "No SLA"],
        sortOrder: 1,
      },
    }),
    prisma.pricingPlan.upsert({
      where: { slug: "professional" },
      update: {},
      create: {
        name: "Professional", slug: "professional", tier: "PROFESSIONAL",
        monthlyPrice: 12900, annualPrice: 9900,
        isPopular: true,
        features: ["3 concurrent projects", "Full AI/ML", "90-day support", "99.9% SLA"],
        limitations: [],
        sortOrder: 2,
      },
    }),
    prisma.pricingPlan.upsert({
      where: { slug: "enterprise" },
      update: {},
      create: {
        name: "Enterprise", slug: "enterprise", tier: "ENTERPRISE",
        monthlyPrice: null, annualPrice: null,
        features: ["Unlimited projects", "Dedicated team", "24/7 support", "99.99% SLA"],
        limitations: [],
        sortOrder: 3,
      },
    }),
  ]);
  console.log("✅ Pricing plans created");

  // ── Testimonials ────────────────────────────────────────────────────────────
  await prisma.testimonial.createMany({
    skipDuplicates: true,
    data: [
      {
        clientName: "Sarah Chen", clientTitle: "CTO", clientCompany: "NexaTech Ventures",
        content: "KARSON transformed our data infrastructure in under three months. The AI pipeline processes 10M events/day with 99.97% accuracy.",
        rating: 5, isFeatured: true, isVerified: true, isPublished: true,
      },
      {
        clientName: "Marcus Rodriguez", clientTitle: "VP of Engineering", clientCompany: "FinanceCore Global",
        content: "Fraud detection went from 67% to 94% accuracy. Delivered ahead of schedule and the code quality was exceptional.",
        rating: 5, isFeatured: true, isVerified: true, isPublished: true,
      },
    ],
  });
  console.log("✅ Testimonials created");

  // ── Demo project ────────────────────────────────────────────────────────────
  await prisma.project.upsert({
    where: { slug: "ai-fraud-detection-demo" },
    update: {},
    create: {
      name: "AI Fraud Detection Engine",
      slug: "ai-fraud-detection-demo",
      description: "ML-powered fraud detection system with 94% accuracy.",
      clientId: client.id,
      status: "IN_PROGRESS",
      priority: "HIGH",
      progress: 68,
      technologies: ["PyTorch", "FastAPI", "PostgreSQL", "Kafka"],
      budget: 85000,
      spent: 57800,
      startDate: new Date("2024-10-01"),
      endDate: new Date("2025-01-15"),
      isPublic: true,
    },
  });
  console.log("✅ Demo project created");

  // ── Demo notification ───────────────────────────────────────────────────────
  await prisma.notification.create({
    data: {
      userId: client.id,
      title: "Welcome to KARSON! 🚀",
      message: "Your client portal is ready. You can track your projects, communicate with your team, and manage billing all in one place.",
      type: "INFO",
    },
  });
  console.log("✅ Demo notification created");

  console.log("\n🎉 Database seeded successfully!");
  console.log("─────────────────────────────────────");
  console.log("Admin:  admin@karson.ai  / Admin@123456");
  console.log("Client: client@example.com / Client@123456");
  console.log("─────────────────────────────────────");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
