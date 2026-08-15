import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Wallet,
  Zap,
  Shuffle,
  TrendingUp,
  BookOpen,
  Layers,
  ShieldCheck,
  Rocket,
  Award,
  Mail,
  Phone,
  User,
} from "lucide-react";
import logo29Tech from "@/assets/logo-29tech.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TechMarquee from "@/components/TechMarquee";
import JourneyCarousel from "@/components/JourneyCarousel";

export const SHEETS_ENDPOINT =
  "https://script.google.com/macros/s/YOUR_APPS_SCRIPT_ID/exec";

const maskWhats = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  return digits
    .replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3")
    .replace(/^(\d{2})(\d{4})(\d{4}).*/, "($1) $2-$3")
    .replace(/^(\d{2})(\d{0,5})$/, "($1) $2")
    .replace(/^(\d{0,2})$/, "$1");
};


const shortTerm = [
  {
    icon: Wallet,
    title: "Economia de Custo Fixo",
    desc: "Sem encargos, sem estrutura interna e sem custo ocioso. Você paga apenas pelas horas de desenvolvimento que usar.",
  },
  {
    icon: Zap,
    title: "Time em até 7 Dias Úteis",
    desc: "Nada de meses de recrutamento. Profissionais validados entram no seu projeto em até 7 dias úteis.",
  },
  {
    icon: Shuffle,
    title: "Flexibilidade Total",
    desc: "Aumente, reduza ou troque o perfil do time conforme a demanda muda — sem contrato engessado.",
  },
];

const midTerm = [
  {
    icon: TrendingUp,
    title: "ROI Comprovado",
    desc: "Entregas medidas em resultado de negócio: menos retrabalho, ciclos mais curtos e produto no ar mais rápido.",
  },
  {
    icon: BookOpen,
    title: "Conhecimento que Fica",
    desc: "Documentação, padrões e handover completo — o que o time aprende fica na sua empresa, não vai embora com o profissional.",
  },
  {
    icon: Layers,
    title: "Escalabilidade sem Estrutura",
    desc: "Cresça o time técnico sem montar RH, infraestrutura ou gestão de pessoas do zero.",
  },
];

const steps = [
  {
    step: "1",
    title: "Entendemos a necessidade",
    desc: "Mapeamos os desafios do cliente e as oportunidades reais de implementação de IA no negócio dele.",
  },
  {
    step: "2",
    title: "Definimos a contratação",
    desc: "Alinhamos a melhor forma de contratação: escopo fechado ou aberto, conforme a demanda e o ritmo esperado.",
  },
  {
    step: "3",
    title: "Alocamos em até 7 dias úteis",
    desc: "A operação já está ativa com especialistas em front-end, back-end, DevOps, cybersecurity e infraestrutura trabalhando no projeto.",
  },
];

const valueCards = [
  {
    icon: ShieldCheck,
    title: "Risco Zero",
    desc: "Começa pequeno, sem fidelidade longa. Se não fizer sentido, você simplesmente não renova.",
  },
  {
    icon: Rocket,
    title: "Escalabilidade",
    desc: "Some horas ou perfis conforme o projeto cresce, no mesmo modelo, sem burocracia.",
  },
  {
    icon: Award,
    title: "Qualidade",
    desc: "Profissionais validados pela 29Tech, com acompanhamento contínuo de entrega e senioridade.",
  },
];

const clientLogos = ["ClickMenos", "Campori Online", "IASD", "UNB"];

const testimonials = [
  {
    quote:
      "Apresentei minha necessidade e prontamente construíram todo um protótipo no Figma",
    name: "Rafael Tavares",
    role: "CEO, Campori Online",
  },
  {
    quote: "Metodologia muito colaborativa, com validações constantes",
    name: "Daniel Carvalho",
    role: "Diretor de Comunicação, UNB",
  },
];

const faqs = [
  {
    q: "10 horas por mês é pouco, vai render alguma coisa?",
    a: "É o ponto de entrada pra testar sem compromisso grande. A maioria dos clientes ajusta o volume já no segundo mês, conforme a real necessidade do projeto.",
  },
  {
    q: "Funciona pra qualquer stack/tecnologia?",
    a: "Sim — front-end, back-end, mobile, DevOps, dados. Você conta o contexto e validamos o especialista certo pra sua stack.",
  },
  {
    q: "E se o profissional não performar?",
    a: "Garantia de substituição sem custo em até 90 dias.",
  },
  {
    q: "Tem fidelidade ou multa de cancelamento?",
    a: "Não. Você ajusta ou encerra as horas quando quiser, sem multa.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};


const scrollToForm = () => {
  document.getElementById("captura")?.scrollIntoView({ behavior: "smooth" });
};

const LandingPage = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim() || !email.trim() || !whatsapp.replace(/\D/g, "").length) return;
    setLoading(true);
    setStatus("idle");
    try {
      await fetch(SHEETS_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
          nome: nome.trim(),
          empresa: "",
          faturamento: "",
          ia: "",
          whatsapp: whatsapp.replace(/\D/g, ""),
          email: email.trim(),
          agendamento: "Sem agendamento",
          origem: "Landing - Terceirize seu Time",
          data: new Date().toLocaleString("pt-BR"),
        }),
      });
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-primary shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
          <img
            src={logo29Tech}
            alt="29Tech"
            className={`h-10 sm:h-14 w-auto transition-all duration-300 ${
              scrolled ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
            style={{ filter: "brightness(0) invert(1)" }}
          />
          <button
            onClick={scrollToForm}
            className="hidden sm:inline-flex rounded-full border-2 border-primary-foreground px-7 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all hover:scale-105"
          >
            Quero Alocar um Especialista
          </button>
        </div>
      </header>


      {/* Hero */}
      <HeroSection onCta={scrollToForm} />

      {/* Benefícios Curto Prazo */}
      <BenefitsBlock
        eyebrow="Curto Prazo"
        title="Resultados que aparecem já nas primeiras semanas"
        items={shortTerm}
      />

      {/* Benefícios Médio Prazo */}
      <BenefitsBlock
        eyebrow="Médio Prazo"
        title="Valor que se acumula ao longo do projeto"
        items={midTerm}
        surface
      />

      {/* Prova Social */}
      <section className="py-20 sm:py-28 bg-background">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-primary">
              Prova Social
            </span>
            <h2
              className="font-light tracking-tight text-foreground mt-4 text-balance max-w-[20ch] mx-auto"
              style={{ fontSize: "clamp(26px, 4vw, 44px)" }}
            >
              Quem já terceirizou com a 29Tech
            </h2>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 mb-14">
            {clientLogos.map((name) => (
              <span
                key={name}
                className="text-sm sm:text-base font-semibold uppercase tracking-[0.15em] text-muted-foreground"
              >
                {name}
              </span>
            ))}
          </div>

          <div className="mb-14">
            <JourneyCarousel />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {testimonials.map((t, i) => (
              <motion.figure
                key={t.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="h-full flex flex-col rounded-[20px] border border-border bg-surface p-6 sm:p-8"
              >
                <blockquote className="text-base sm:text-lg font-light leading-relaxed text-foreground text-pretty">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-5 text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">{t.name}</span> — {t.role}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-20 sm:py-28 bg-surface">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-primary">
              Como Funciona
            </span>
            <h2
              className="font-light tracking-tight text-foreground mt-4 text-balance max-w-[20ch] mx-auto"
              style={{ fontSize: "clamp(26px, 4vw, 44px)" }}
            >
              Três passos até o especialista certo
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold mb-5">
                  {s.step}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed text-pretty text-balance max-w-[34ch] mx-auto">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tecnologias que dominamos */}
      <TechMarquee />


      {/* Proposta de Valor */}
      <section className="relative overflow-hidden py-20 sm:py-32 bg-foreground">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(60% 55% at 50% 0%, hsl(var(--primary) / 0.28) 0%, transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.6), transparent)",
          }}
        />
        <div className="relative max-w-5xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-14">
            <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-primary">
              Proposta de Valor
            </span>
            <h2
              className="font-light tracking-tight text-background mt-4 leading-tight text-balance max-w-[22ch] mx-auto"
              style={{ fontSize: "clamp(28px, 5vw, 54px)" }}
            >
              Comece com <span className="text-primary">R$ 2.000/mês</span> e teste o modelo sem
              risco
            </h2>
            <p className="mt-5 text-sm sm:text-base text-background/65 max-w-[56ch] mx-auto leading-relaxed text-pretty text-balance">
              Um pacote de entrada enxuto — R$ 2.000/mês, 10 horas de desenvolvimento — pra você ver
              a qualidade da entrega antes de escalar.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {valueCards.map((c, i) => (
              <motion.div
                key={c.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group h-full flex flex-col rounded-[20px] border border-background/10 bg-background/[0.04] p-6 sm:p-8 backdrop-blur-sm transition-colors hover:border-primary/40 hover:bg-background/[0.07]"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
                  <c.icon className="text-primary" size={22} strokeWidth={1.6} />
                </div>
                <h3 className="text-base font-semibold text-background mb-2">{c.title}</h3>
                <p className="text-sm text-background/65 leading-relaxed text-pretty">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-28 bg-surface">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-primary">
              Perguntas Frequentes
            </span>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`faq-${i}`}>
                <AccordionTrigger className="text-left text-base font-medium text-foreground">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed text-pretty">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Final */}
      <section id="captura" className="py-20 sm:py-28 bg-surface">
        <div className="max-w-2xl mx-auto px-5 sm:px-8 text-center">
          <h2
            className="font-light tracking-tight text-foreground leading-tight text-balance max-w-[18ch] mx-auto"
            style={{ fontSize: "clamp(28px, 5vw, 52px)" }}
          >
            Receba contato da 29Tech
          </h2>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-[48ch] mx-auto text-pretty text-balance">
            Deixe seu e-mail e WhatsApp. Nosso time vai entrar em contato para conversar sobre como implementar tecnologia no seu time.
          </p>

          <div className="mt-10 text-left">
            {status === "success" ? (
              <div className="rounded-[24px] border border-primary/20 bg-primary/10 p-6 sm:p-8 text-center">
                <p className="text-base font-semibold text-foreground">
                  Obrigado, {nome.trim().split(" ")[0]}!
                </p>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Nosso time vai entrar em contato com você em breve pelo WhatsApp.
                </p>
              </div>
            ) : (
              <form
                onSubmit={submit}
                className="rounded-[24px] border border-border bg-background p-6 sm:p-8 flex flex-col gap-4"
              >
                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <input
                    type="text"
                    required
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Seu nome"
                    maxLength={100}
                    className="w-full rounded-full border border-border bg-surface pl-11 pr-5 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    maxLength={255}
                    className="w-full rounded-full border border-border bg-surface pl-11 pr-5 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>
                <div className="relative">
                  <Phone
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <input
                    type="tel"
                    required
                    value={maskWhats(whatsapp)}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="(11) 99999-9999"
                    maxLength={15}
                    className="w-full rounded-full border border-border bg-surface pl-11 pr-5 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading || whatsapp.replace(/\D/g, "").length < 10}
                  className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Enviando..." : "Quero Receber Contato"}
                </button>
              </form>
            )}

            {status === "error" && (
              <p className="mt-4 text-sm font-medium text-destructive text-center">
                Ocorreu um erro no envio. Tente novamente em instantes.
              </p>
            )}
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-background py-8">
        <p className="text-center text-xs text-muted-foreground">
          © 2026 29Tech. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
};

const HeroSection = ({ onCta }: { onCta: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };
    section.addEventListener("mousemove", handleMouse);
    section.addEventListener("mouseleave", handleLeave);

    const spacing = 24;
    const attractRadius = 200;
    const attractStrength = 15;
    const springFactor = 0.06;

    interface Dot {
      baseX: number; baseY: number; cx: number; cy: number;
      vx: number; vy: number; phase: number; speed: number;
    }

    let dots: Dot[] = [];
    const buildDots = () => {
      dots = [];
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      for (let x = spacing; x < w; x += spacing) {
        for (let y = spacing; y < h; y += spacing) {
          dots.push({
            baseX: x, baseY: y, cx: x, cy: y,
            vx: 0, vy: 0,
            phase: Math.random() * Math.PI * 2,
            speed: 0.3 + Math.random() * 0.4,
          });
        }
      }
    };
    buildDots();
    window.addEventListener("resize", buildDots);

    let animId = 0;
    let time = 0;
    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      time += 0.016;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const dot of dots) {
        const driftX = reduced ? 0 : Math.sin(time * dot.speed * 2 + dot.phase) * 18 + Math.cos(time * 0.6 + dot.baseY * 0.03) * 12;
        const driftY = reduced ? 0 : Math.cos(time * dot.speed * 1.5 + dot.phase) * 18 + Math.sin(time * 0.8 + dot.baseX * 0.03) * 12;

        const targetX = dot.baseX + driftX;
        const targetY = dot.baseY + driftY;

        const dx = dot.cx - mx;
        const dy = dot.cy - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let attractX = 0;
        let attractY = 0;
        if (dist < attractRadius && dist > 0 && !reduced) {
          const force = (1 - dist / attractRadius) * attractStrength;
          attractX = -(dx / dist) * force;
          attractY = -(dy / dist) * force;
        }

        dot.vx += (targetX + attractX - dot.cx) * springFactor;
        dot.vy += (targetY + attractY - dot.cy) * springFactor;
        dot.vx *= 0.85;
        dot.vy *= 0.85;
        dot.cx += dot.vx;
        dot.cy += dot.vy;

        const distFromMouse = Math.sqrt((dot.cx - mx) ** 2 + (dot.cy - my) ** 2);
        const proximity = Math.max(0, 1 - distFromMouse / attractRadius);
        const size = 2 + proximity * 5;

        ctx.beginPath();
        ctx.arc(dot.cx, dot.cy, size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 229, 213, 0.25)";
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("resize", buildDots);
      section.removeEventListener("mousemove", handleMouse);
      section.removeEventListener("mouseleave", handleLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 px-4"
      style={{ background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(13 78% 50%) 100%)" }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-[1] block"
        style={{ display: "block" }}
      />

      <div className="relative z-[2] max-w-4xl mx-auto px-4 sm:px-6 text-center pointer-events-none">
        <motion.img
          src={logo29Tech}
          alt="29Tech"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="mx-auto h-12 sm:h-16 w-auto mb-6"
          style={{ filter: "brightness(0) invert(1)" }}
        />
        <motion.span
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-primary-foreground/80 mb-6"
        >
          Outsourcing de Desenvolvimento
        </motion.span>
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-light leading-[1.05] tracking-tight text-primary-foreground mb-6 text-balance max-w-[18ch] mx-auto"
          style={{ fontSize: "clamp(36px, 8vw, 80px)" }}
        >
          Seu time de desenvolvimento, sem montar um
        </motion.h1>
        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm sm:text-base md:text-lg text-primary-foreground/80 max-w-[52ch] mx-auto mb-8 leading-relaxed text-pretty text-balance"
        >
          Especialistas validados pela 29Tech dentro do seu projeto em até 7 dias úteis — sem custo
          fixo, sem estrutura interna e sem contratos longos.
        </motion.p>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center pointer-events-auto mt-2 sm:mt-4"
        >
          <button
            onClick={onCta}
            className="inline-flex items-center gap-2 rounded-full bg-primary-foreground px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-medium text-primary hover:opacity-90 transition-all hover:scale-105"
          >
            Quero Alocar um Especialista <ArrowRight size={18} />
          </button>
        </motion.div>
      </div>
    </section>
  );
};


interface BenefitItem {
  icon: LucideIcon;
  title: string;
  desc: string;
}

const BenefitsBlock = ({
  eyebrow,
  title,
  items,
  surface = false,
}: {
  eyebrow: string;
  title: string;
  items: BenefitItem[];
  surface?: boolean;
}) => (
  <section className={`py-20 sm:py-28 ${surface ? "bg-surface" : "bg-background"}`}>
    <div className="max-w-5xl mx-auto px-5 sm:px-8">
      <div className="text-center mb-14">
        <span className="text-xs font-semibold tracking-[0.25em] uppercase text-primary">
          {eyebrow}
        </span>
        <h2
          className="font-light tracking-tight text-foreground mt-4 leading-tight text-balance max-w-[20ch] mx-auto"
          style={{ fontSize: "clamp(26px, 4vw, 44px)" }}
        >
          {title}
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="rounded-[20px] border border-border bg-background p-6 sm:p-7 h-full"
          >
            <item.icon className="text-primary mb-4" size={26} strokeWidth={1.6} />
            <h3 className="text-base font-semibold text-foreground mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed text-pretty">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default LandingPage;
