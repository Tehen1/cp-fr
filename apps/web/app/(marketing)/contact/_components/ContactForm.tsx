'use client';
import { useState } from 'react';
export function ContactForm() {
const [state, setState] = useState<'idle' | 'loading' | 'done'>('idle');
async function submit(e: React.FormEvent<HTMLFormElement>) {
e.preventDefault();
setState('loading');
const body = Object.fromEntries(new FormData(e.currentTarget));
const res = await fetch('/api/public/contact', {
method: 'POST',
body: JSON.stringify(body),
});
setState(res.ok ? 'done' : 'idle');
}
return (
<form onSubmit={submit} className="grid gap-4">
<input name="name" placeholder="Nom" required className="input" />
<input
name="email"
type="email"
placeholder="Email"
required
className="input"
/>
<textarea
name="message"
rows={4}
placeholder="Message…"
className="input"
/>
<button disabled={state !== 'idle'} className="btn-primary">
{state === 'loading' ? 'Envoi…' : 'Envoyer'}
</button>
{state === 'done' && (
<p className="text-green-600">Merci ! Nous revenons vers vous sous 24 h.</p>
)}
</form>
);
}
