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
      <section className="relative left-1/2 right-1/2 -mx-[50vw] -mt-12 flex min-h-[calc(100vh-5rem)] w-screen items-end justify-center overflow-hidden bg-black px-4 pb-16 sm:px-6 lg:px-8">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/media/hero-brand.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label="GPU cloud brand animation"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 flex flex-col items-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="min-w-44">
            <Link to="/gpus">Browse GPUs</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="min-w-44 bg-black/30 backdrop-blur"
          >
            <Link to="/contact">Talk to us</Link>
          </Button>
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
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {feature.description}
                  </p>
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
            <p key={item} className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
              <CheckCircle className="h-5 w-5 text-green-600" />
              {item}
            </p>
          ))}
        </div>
        <Card>
          <CardContent className="space-y-4 p-6">
            <MessageSquare className="h-8 w-8 text-brand-600" />
            <h2 className="text-2xl font-semibold">Ready to discuss your workload?</h2>
            <p className="text-slate-600 dark:text-slate-300">
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
