import { Link } from 'react-router-dom';
import { CheckCircle, Cpu, KeyRound, MessageSquare, ShieldCheck } from 'lucide-react';
import { Button, Card, CardContent, CardHeader, SectionHeader } from '@/components/ui/index.js';

const features = [
  {
    title: 'Curated GPU Rentals',
    description: 'Compare practical GPU packages by VRAM, CPU, RAM, storage, price, and region.',
    icon: Cpu,
  },
  {
    title: 'Human Reviewed Access',
    description: 'Submit your project requirements and receive the right setup after admin review.',
    icon: ShieldCheck,
  },
  {
    title: 'Credentials In Dashboard',
    description: 'Approved customers can later access issued credentials from their account area.',
    icon: KeyRound,
  },
];

const steps = [
  'Browse GPU packages',
  'Submit an enquiry',
  'Team reviews the request',
  'Receive access credentials',
];

export function HomePage() {
  return (
    <div className="space-y-16">
      <section className="relative left-1/2 -ml-[50vw] -mt-12 flex min-h-[calc(100vh-5rem)] w-screen max-w-[100vw] items-center overflow-hidden bg-black px-4 py-16 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 opacity-55">
          {Array.from({ length: 24 }).map((_, index) => (
            <span key={index} className="hero-star" />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute left-6 top-12 h-28 w-28 rounded-full border border-white/10" />
          <div className="absolute bottom-16 right-10 h-40 w-40 rounded-full border border-brand-500/25" />
          <div className="absolute left-1/2 top-1/2 h-px w-[70vw] -translate-x-1/2 bg-white/10" />
          <div className="absolute left-1/3 top-24 h-[55vh] w-px bg-white/10" />
        </div>

        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[0.76fr_1.24fr]">
          <div className="relative z-10 max-w-xl space-y-6 text-center lg:text-left">
            <p className="mx-auto inline-flex rounded-full border border-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-[#A6B0CF] lg:mx-0">
              EternityVerse
            </p>
            <div className="space-y-4">
              <h1 className="text-4xl font-black leading-[0.95] tracking-normal text-white sm:text-5xl lg:text-6xl">
                Production GPU capacity, presented with clarity.
              </h1>
              <p className="mx-auto max-w-lg text-base leading-7 text-[#A6B0CF] lg:mx-0">
                Browse vetted machines, describe your workload, and let the operations team match
                you with access that fits.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 text-left">
              {['Manual review', 'SSH handoff', 'Admin managed'].map((item) => (
                <div
                  key={item}
                  className="rounded-card border border-white/10 bg-white/[0.035] p-3"
                >
                  <p className="text-xs font-semibold text-white">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 [perspective:1400px]">
            <div className="relative mx-auto max-w-4xl origin-center rotate-x-[7deg] rotate-y-[-12deg] rounded-[28px] border border-white/15 bg-[#050505] p-3 shadow-[0_34px_120px_rgba(0,0,0,0.72)] transition duration-500 hover:rotate-x-[4deg] hover:rotate-y-[-7deg]">
              <div className="relative overflow-hidden rounded-[20px] border border-white/10 bg-black">
                <video
                  className="aspect-video h-full w-full object-cover"
                  src="/media/hero-brand.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  aria-label="GPU cloud brand animation"
                />
                <div className="pointer-events-none absolute inset-0 border border-white/10" />
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="absolute bottom-4 right-4 min-w-40 bg-black/55 backdrop-blur-xl"
                >
                  <Link to="/gpus">Browse GPUs</Link>
                </Button>
              </div>
              <div className="mx-auto mt-3 h-2 w-1/2 rounded-full bg-white/10" />
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeader
          title="Features"
          description="A marketplace foundation designed for practical GPU rental workflows."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card key={feature.title}>
                <CardHeader
                  title={feature.title}
                  action={<Icon className="h-5 w-5 text-brand-600" />}
                />
                <CardContent>
                  <p className="text-sm text-[#A6B0CF]">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeader title="How It Works" description="A simple enquiry-first rental journey." />
        <div className="grid gap-3 md:grid-cols-4">
          {steps.map((step, index) => (
            <Card key={step}>
              <CardContent className="p-5">
                <p className="mb-3 text-sm font-semibold text-brand-600">Step {index + 1}</p>
                <p className="font-medium">{step}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <SectionHeader title="Why Choose Us" description="Built for careful workload matching." />
          {[
            'Transparent package specs',
            'Manual review for fit',
            'Credential handoff workflow',
          ].map((item) => (
            <p key={item} className="flex items-center gap-2 text-[#DDE4FF]">
              <CheckCircle className="h-5 w-5 text-green-600" />
              {item}
            </p>
          ))}
        </div>
        <Card>
          <CardContent className="space-y-4 p-6">
            <MessageSquare className="h-8 w-8 text-brand-600" />
            <h2 className="text-2xl font-semibold">Ready to discuss your workload?</h2>
            <p className="text-[#A6B0CF]">
              Start with the marketplace and submit an enquiry from the package that best matches
              your requirements.
            </p>
            <Button asChild>
              <Link to="/gpus">Find a GPU package</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
