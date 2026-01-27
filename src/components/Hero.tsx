import { Button } from "@/components/ui/button";
import { CheckCircle, Mail, Shield, Zap } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  // const telegramBotUrl = "https://t.me/VoidBouncebot";

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-6xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 mb-8 animate-glow-pulse">
          <div className="w-2 h-2 bg-electric rounded-full animate-pulse"></div>
          <span className="text-sm text-muted-foreground">
            Professional Email Validation API
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-float">
          Validate emails <span className="gradient-text">instantly</span>
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed animate-float">
          Reduce bounce rates by 95% with our real-time email verification
          service. Clean your lists, improve deliverability, and protect your
          sender reputation.
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            { icon: Zap, text: "Real-time validation" },
            { icon: Shield, text: "99.9% accuracy" },
            { icon: Mail, text: "Bulk processing" },
            { icon: CheckCircle, text: "API integration" },
          ].map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2"
            >
              <feature.icon className="w-4 h-4 text-primary" />
              <span className="text-sm">{feature.text}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link href="/auth/register">
            <Button variant="hero" size="xl" className="glow-on-hover">
              Get Started Now
            </Button>
          </Link>

          <Button
            variant="outline"
            size="xl"
            onClick={() => (window.location.href = "/validate")}
            className="border-border hover:bg-card"
          >
            Try Validation
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Trusted by developers worldwide
          </p>
          <div className="flex justify-center items-center gap-8 opacity-60">
            <div className="text-xs font-mono">99.9% Uptime</div>
            <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
            <div className="text-xs font-mono">10M+ Emails Validated</div>
            <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
            <div className="text-xs font-mono">Real-time API</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
