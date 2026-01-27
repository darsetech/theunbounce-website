import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Zap,
  Mail,
  Shield,
  Users,
  Globe,
  Database,
  Briefcase,
  Server,
  ArrowRight,
  Sparkles
} from "lucide-react";
import Link from "next/link";

const ProductShowcase = () => {
  const headerRef = useRef(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.1 }
    );

    const header = headerRef.current;
    if (header) observer.observe(header);

    const cards = cardsRef.current;

    cards.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      if (header) observer.unobserve(header);
      cards.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  const products = [
    {
      id: "voidbounce",
      title: "VoidBounce",
      subtitle: "Email Validation API",
      description: "Professional email verification service that helps you reduce bounce rates by 95%. Validate emails instantly with our real-time API designed for developers and businesses.",
      icon: Server,
      color: "primary", // electric/cyan
      features: [
        { icon: Zap, text: "Sub-second validation" },
        { icon: Shield, text: "99.9% accuracy" },
        { icon: Globe, text: "Global coverage" },
        { icon: Database, text: "Bulk processing" }
      ],
      cta: {
        text: "Get Started with API",
        href: "/apiDocs",
        variant: "glow" as const
      },
      gradients: "from-cyan-500/20 to-blue-500/20",
      borderColor: "border-cyan-500/50"
    },
    {
      id: "voidmail",
      title: "Void Mail Manager",
      subtitle: "All-in-One Email Client",
      description: "Manage multiple email accounts in one secure interface. Connect through browser login, access unlimited accounts, and enjoy seamless email management without storing passwords.",
      icon: Mail,
      color: "electric", // electric
      features: [
        { icon: Users, text: "Multi-account support" },
        { icon: Shield, text: "Browser-secure auth" },
        { icon: Briefcase, text: "Unified profiles" },
        { icon: Sparkles, text: "Offline sync" }
      ],
      cta: {
        text: "Learn More",
        href: "/void-mail-manager",
        variant: "electric" as const
      },
      gradients: "from-cyan-400/20 to-purple-500/20",
      borderColor: "border-cyan-400/50"
    }
  ];

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500 from-10% to-blue-500 to-10% rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500 from-10% to-cyan-400 to-10% rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 fade-in-up animate-float">
          <div className="inline-flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 mb-8 slide-in-top animate-glow-pulse">
            <Sparkles className="w-4 h-4 text-electric animate-pulse" />
            <span className="text-sm text-muted-foreground">VoidBounce Ecosystem</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 stagger-1 fade-in-up.animate">
            Empower Your <span className="gradient-text">Business</span> with Email Solutions
          </h2>
          <p className="text-md lg:text-lg xl:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed stagger-2 fade-in-up.animate">
            From validation APIs to unified mail management, explore our comprehensive email suite
            designed to optimize communication, reduce risks, and streamline operations.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              className={`fade-in-up stagger-${index + 3}`}
            >
            <Card
              className={`group relative p-8 bg-gradient-to-br ${product.gradients} border ${product.borderColor} hover:border-${product.color}/70 transition-all duration-500 glow-on-hover overflow-hidden`}
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-transparent via-transparent to-white/5"></div>

              {/* Floating particles effect */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-electric/30 rounded-full animate-bounce delay-300 group-hover:animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-primary/40 rounded-full animate-bounce delay-700"></div>

              <div className="relative z-10">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-gradient-primary rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <product.icon className="w-8 h-8 text-primary-foreground" />
                </div>

                {/* Title */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2 hover:text-primary transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-electric font-medium mb-3">{product.subtitle}</p>
                  <p className="text-sm md:text-md text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <div className="grid grid-cols-2 gap-4">
                    {product.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center gap-3 p-3 bg-card/50 rounded-lg border border-border/50 hover:border-border transition-colors group/feature"
                      >
                        <feature.icon className="w-4 h-4 text-primary group-hover/feature:text-electric transition-colors" />
                        <span className="text-xs sm:text-sm font-medium">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="flex justify-between items-center">
                  <Link href={product.cta.href}>
                    <Button
                      variant={product.cta.variant}
                      className="group-hover:scale-105 transition-transform duration-300"
                    >
                      {product.cta.text}
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>

                  {/* Trust badge */}
                  <div className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                    Secure & Reliable
                  </div>
                </div>
              </div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </Card>
            </div>
          ))}
        </div>

        {/* Bottom Call-to-Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 bg-card border border-border rounded-full px-6 py-3 group cursor-pointer hover:bg-card/80 transition-colors">
            <div className="w-3 h-3 bg-electric rounded-full animate-pulse"></div>
            <span className="text-sm text-muted-foreground">
              Ready to transform your email workflow?
            </span>
            <Link href="/packages" className="text-primary hover:text-electric transition-colors font-medium">
              Explore Packages →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
