export const metadata = {
title: 'SEO/SEA Tools — Vision Pro',
description:
'Plateforme IA & zkEVM pour booster vos stratégies SEO/SEA.',
openGraph: { images: ['/og-seosea.jpg'] },
};
export default function MarketingLayout({
children,
}: {
children: React.ReactNode;
}) {
return (
<html lang="fr" className="scroll-smooth">
<body className="font-sans antialiased text-gray-800 dark:text-gray-200">
{children}
</body>
</html>
);
}
