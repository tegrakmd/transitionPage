import type { FaqData } from "./faq.types";

export const faqData: FaqData = {
  title: "FAQs",
  categories: [
    {
      id: "general",
      label: "General",
      items: [
        {
          id: "what-is-arqe",
          question: "What is Arqé?",
          answer:
            "Arqé is a curated image library offering AI-generated, art-directed visuals made for modern creatives. Every image is crafted with intention — designed to support brands, studios, and storytellers who value originality and clarity. A growing archive of visuals that feel elevated, contemporary, and ready to use.",
        },
        {
          id: "who-is-it-for",
          question: "Who is it for and how can I use it?",
          answer:
            "Designers, art directors, brand studios, content creators, and agencies who need fresh, original visuals without compromise. Use Arqé images across websites, campaigns, decks, social content, print — anywhere you need high-quality imagery with a distinct edge.",
        },
        {
          id: "different-from-stock",
          question: "How is Arqé different from traditional stock libraries?",
          answer:
            "Stock sites give you millions of generic images and leave you to dig through the noise — and then charge you per download with complex licensing tiers on top. Arqé is built differently. Every image is art-directed, not bulk-generated. The library is curated for quality and relevance, growing every week, and one subscription gives you unlimited access to everything.",
        },
        {
          id: "image-types",
          question: "What types of images are in the library?",
          answer:
            "The library spans a range of visual territories — campaign, lifestyle, food & drink, fashion, conceptual, and many more. Everything is designed to feel cohesive and usable across brand and creative contexts, not random or generic.",
        },
        {
          id: "generate-own",
          question: "Why not just generate my own AI images?",
          answer:
            "You can. But generating high-quality, art-directed imagery takes time, skill, and iteration. Arqé gives you the finished result: refined, retouched, and ready to drop into a project. Less time prompting, more time creating.",
        },
        {
          id: "library-updates",
          question: "How often is the library updated?",
          answer:
            "New visuals are added every week. The library is constantly growing with fresh content across categories.",
        },
      ],
    },
    {
      id: "usage",
      label: "Usage",
      items: [
        {
          id: "commercial-work",
          question: "Can I use Arqé images for commercial work?",
          answer:
            "Yes. Every image on Arqé comes with a royalty-free license, so you're free to use them in commercial projects, client work, ads, and more. Check our license page for more details.",
        },
        {
          id: "usage-restrictions",
          question: "Are there any usage restrictions?",
          answer:
            "You can't resell, sublicense, or redistribute Arqé images as standalone files or as part of a competing image library. Beyond that, commercial use is fully covered. Full details are in the license agreement.",
        },
        {
          id: "team-account",
          question: "Can my team share one account?",
          answer:
            "Each subscription is for individual use only. We're working on team and agency plans — if that's something you need, reach out and we'll keep you in the loop.",
        },
        {
          id: "own-images",
          question: "Do I own the images I download?",
          answer:
            "You're licensed to use them — you don't own them. That means full commercial use across any project, but you can't resell, sublicense, or redistribute the files themselves. Full details are in the license agreement.",
        },
      ],
    },
    {
      id: "billing",
      label: "Billing",
      items: [
        {
          id: "pricing",
          question: "How does pricing work?",
          answer:
            "Arqé is subscription based, no tiers, no pay-per-image. Check our pricing page for more.",
        },
        {
          id: "monthly-yearly",
          question: "Can I switch between monthly and yearly?",
          answer:
            "Yes. You can upgrade to yearly at any time and the pricing adjusts accordingly. If you're on a yearly plan, you can switch to monthly when your annual period ends.",
        },
        {
          id: "cancel",
          question: "Can I cancel anytime and what happens to my subscription?",
          answer:
            "Yes. No lock-in. Cancel whenever you want. You keep full access until the end of your current billing period. After that, you won't be able to download new images, but anything you've already downloaded is yours to keep and use under the original license terms.",
        },
        {
          id: "free-trial",
          question: "Is there a free trial?",
          answer:
            "We don't offer a free trial. Arqé is a curated, premium library — you can browse this site to get a feel for the quality and style before subscribing. If it's not for you, you can cancel anytime.",
        },
      ],
    },
  ],
};
