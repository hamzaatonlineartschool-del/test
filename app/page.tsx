import { HomeAbout } from "@/components/home/home-about";
import { HomeImpact } from "@/components/home/home-impact";
import { Newsletter } from "@/components/home/newsletter";
import { ProcessSteps } from "@/components/home/process-steps";
import { Testimonials } from "@/components/home/testimonials";
import { WhyChoose } from "@/components/home/why-choose";
import { WorkTeaser } from "@/components/home/work-teaser";
import { StoryApproach } from "@/components/story/story-approach";
import { StoryCapabilities } from "@/components/story/story-capabilities";
import { StoryDualServices } from "@/components/story/story-dual-services";
import { StoryHero } from "@/components/story/story-hero";
import { StoryInsights } from "@/components/story/story-insights";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="relative">
        <StoryHero />
        <HomeAbout />
        <WhyChoose />
        <HomeImpact />
        <WorkTeaser />
        <Testimonials />
        <ProcessSteps />
        <StoryDualServices />
        <StoryApproach />
        <StoryCapabilities />
        <StoryInsights />
        <Newsletter />
      </main>
      <SiteFooter />
    </>
  );
}
