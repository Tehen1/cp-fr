import Link from 'next/link';

export default function Landing() {

return (

<>

{/* Hero */}

<section className="relative isolate overflow-hidden py-24">

<div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary to-secondary opacity-20" />

<div className="container mx-auto px-6 text-center max-w-3xl">

<h1 className="text-4xl md:text-5xl font-extrabold mb-4">

Vision Pro Marketing Intelligence

</h1>

<p className="mb-8 text-lg">

Plateforme alimentée par <strong>IA Perplexity</strong> et la

<strong> blockchain zkEVM</strong>.

</p>

<div className="flex flex-col sm:flex-row gap-4 justify-center">

<Link href="/handler/sign-up" className="btn-primary">

Commencer Gratuitement

</Link>

<a href="#features" className="btn-secondary">

Voir la Démo

</a>

</div>

</div>

</section>

{/* Features */}

<section id="features" className="py-24 bg-gray-50 dark:bg-dark">

{/* …réutilisez le tableau features du plan précédent … */}

</section>

{/* Pricing */}

<section id="pricing" className="py-24">

{/* …réutilisez le tableau pricing du plan précédent … */}

</section>

{/* CTA */}

<section className="py-20 bg-primary text-white text-center">

<h2 className="text-3xl font-bold mb-4">

Prêt à Révolutionner Votre Marketing ?

</h2>

<Link href="/handler/sign-up" className="btn-cta-white">

Commencer Maintenant

</Link>

</section>

</>

);

}
