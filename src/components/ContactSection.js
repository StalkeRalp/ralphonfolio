'use client';
import { useState } from 'react';
import { useReveal } from './useReveal';

const socials = [
	{
		name: 'GitHub',
		href: 'https://github.com/StalkeRalp',
		icon: (
			<svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor'>
				<path d='M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.63-5.37-12-12-12z' />
			</svg>
		),
	},
	{
		name: 'LinkedIn',
		href: 'https://linkedin.com/',
		icon: (
			<svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor'>
				<path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
			</svg>
		),
	},
	{
		name: 'Email',
		href: 'mailto:nkadambatonga12@gmail.com',
		icon: (
			<svg
				width='20'
				height='20'
				viewBox='0 0 24 24'
				fill='none'
				stroke='currentColor'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			>
				<rect x='2' y='4' width='20' height='16' rx='2' />
				<path d='M22 7l-10 7L2 7' />
			</svg>
		),
	},
];

export default function ContactSection() {
	const [form, setForm] = useState({ name: '', email: '', message: '' });
	const [status, setStatus] = useState('idle'); // idle | sending | done
	const ref = useReveal();

	const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

	const handleSubmit = async (e) => {
		e.preventDefault();
		setStatus('sending');
		await new Promise((r) => setTimeout(r, 1500));
		setStatus('done');
		setForm({ name: '', email: '', message: '' });
		setTimeout(() => setStatus('idle'), 4000);
	};

	const inputStyle = {
		width: '100%',
		padding: '14px 18px',
		background: 'rgba(255,255,255,0.05)',
		border: '1px solid rgba(255,255,255,0.1)',
		borderRadius: 12,
		color: 'var(--white)',
		fontFamily: 'var(--font-sans)',
		fontSize: 15,
		outline: 'none',
		transition: 'border-color 0.3s, box-shadow 0.3s',
	};

	return (
		<section id='contact' className='section' ref={ref}>
			<div className='container'>
				<div className='label reveal' style={{ marginBottom: 16 }}>
					05 / Contact
				</div>
				<div className='divider reveal' />
				<h2 className='headline-lg reveal' style={{ marginBottom: 12 }}>
					Entrons en <span className='text-gradient'>orbite</span>
				</h2>
				<p className='body-lg reveal reveal-delay-1' style={{ maxWidth: 520, marginBottom: 64 }}>
					Un projet, une collaboration, une opportunité ? Je suis disponible pour en parler.
				</p>

				<div
					style={{
						display: 'grid',
						gridTemplateColumns: '1fr 1fr',
						gap: 'clamp(32px,5vw,80px)',
						alignItems: 'start',
					}}
					className='contact-grid'
				>
					{/* Left info */}
					<div className='reveal'>
						<div style={{ marginBottom: 40 }}>
							{[
								{ icon: '📧', label: 'Email', value: 'nkadambatonga12@gmail.com', href: 'mailto:nkadambatonga12@gmail.com' },
								{ icon: '📍', label: 'Localisation', value: 'Cameroun, Afrique Centrale', href: null },
								{ icon: '⏱️', label: 'Disponibilité', value: 'Disponible maintenant', href: null },
							].map((item) => (
								<div
									key={item.label}
									style={{
										display: 'flex',
										gap: 16,
										marginBottom: 24,
										alignItems: 'flex-start',
									}}
								>
									<div
										style={{
											width: 44,
											height: 44,
											borderRadius: 12,
											background: 'rgba(0,229,255,0.08)',
											border: '1px solid rgba(0,229,255,0.15)',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											fontSize: 20,
											flexShrink: 0,
										}}
									>
										{item.icon}
									</div>
									<div>
										<div style={{ fontSize: 12, color: 'var(--white-60)', marginBottom: 3 }}>{item.label}</div>
										{item.href ? (
											<a href={item.href} style={{ fontSize: 15, fontWeight: 500, color: 'var(--cyan)' }}>
												{item.value}
											</a>
										) : (
											<span style={{ fontSize: 15, fontWeight: 500 }}>{item.value}</span>
										)}
									</div>
								</div>
							))}
						</div>

						{/* Socials */}
						<div>
							<p style={{ fontSize: 13, color: 'var(--white-60)', marginBottom: 16 }}>Retrouvez-moi sur</p>
							<div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
								{socials.map((s) => (
									<a
										key={s.name}
										href={s.href}
										target='_blank'
										rel='noreferrer'
										title={s.name}
										style={{
											width: 44,
											height: 44,
											borderRadius: 12,
											background: 'rgba(255,255,255,0.05)',
											border: '1px solid rgba(255,255,255,0.1)',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											color: 'var(--white-60)',
											transition: 'all 0.3s',
										}}
										onMouseEnter={(e) => {
											e.currentTarget.style.background = 'rgba(0,229,255,0.1)';
											e.currentTarget.style.borderColor = 'rgba(0,229,255,0.3)';
											e.currentTarget.style.color = 'var(--cyan)';
											e.currentTarget.style.transform = 'translateY(-3px)';
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
											e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
											e.currentTarget.style.color = 'var(--white-60)';
											e.currentTarget.style.transform = 'translateY(0)';
										}}
									>
										{s.icon}
									</a>
								))}
							</div>
						</div>
					</div>

					{/* Right: Form */}
					<div className='glass-card reveal reveal-delay-2' style={{ padding: 'clamp(24px,3vw,40px)' }}>
						{status === 'done' ? (
							<div style={{ textAlign: 'center', padding: '40px 0' }}>
								<div style={{ fontSize: 48, marginBottom: 16 }}>🚀</div>
								<h3 className='headline-sm' style={{ marginBottom: 8 }}>
									Message envoyé !
								</h3>
								<p className='body-md'>Je vous réponds dans les plus brefs délais.</p>
							</div>
						) : (
							<form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
								<div>
									<label
										style={{
											fontSize: 13,
											color: 'var(--white-60)',
											display: 'block',
											marginBottom: 8,
										}}
									>
										Nom complet
									</label>
									<input
										id='contact-name'
										name='name'
										type='text'
										required
										placeholder='John Doe'
										value={form.name}
										onChange={handleChange}
										style={inputStyle}
										onFocus={(e) => {
											e.target.style.borderColor = 'rgba(0,229,255,0.4)';
											e.target.style.boxShadow = '0 0 0 3px rgba(0,229,255,0.08)';
										}}
										onBlur={(e) => {
											e.target.style.borderColor = 'rgba(255,255,255,0.1)';
											e.target.style.boxShadow = 'none';
										}}
									/>
								</div>
								<div>
									<label
										style={{
											fontSize: 13,
											color: 'var(--white-60)',
											display: 'block',
											marginBottom: 8,
										}}
									>
										Email
									</label>
									<input
										id='contact-email'
										name='email'
										type='email'
										required
										placeholder='john@example.com'
										value={form.email}
										onChange={handleChange}
										style={inputStyle}
										onFocus={(e) => {
											e.target.style.borderColor = 'rgba(0,229,255,0.4)';
											e.target.style.boxShadow = '0 0 0 3px rgba(0,229,255,0.08)';
										}}
										onBlur={(e) => {
											e.target.style.borderColor = 'rgba(255,255,255,0.1)';
											e.target.style.boxShadow = 'none';
										}}
									/>
								</div>
								<div>
									<label
										style={{
											fontSize: 13,
											color: 'var(--white-60)',
											display: 'block',
											marginBottom: 8,
										}}
									>
										Message
									</label>
									<textarea
										id='contact-message'
										name='message'
										required
										rows={5}
										placeholder='Votre message...'
										value={form.message}
										onChange={handleChange}
										style={{ ...inputStyle, resize: 'vertical', minHeight: 120 }}
										onFocus={(e) => {
											e.target.style.borderColor = 'rgba(0,229,255,0.4)';
											e.target.style.boxShadow = '0 0 0 3px rgba(0,229,255,0.08)';
										}}
										onBlur={(e) => {
											e.target.style.borderColor = 'rgba(255,255,255,0.1)';
											e.target.style.boxShadow = 'none';
										}}
									/>
								</div>
								<button
									id='contact-submit'
									type='submit'
									disabled={status === 'sending'}
									className='btn btn-primary'
									style={{
										width: '100%',
										justifyContent: 'center',
										marginTop: 4,
										opacity: status === 'sending' ? 0.7 : 1,
									}}
								>
									{status === 'sending' ? (
										<>
											<span
												style={{
													width: 16,
													height: 16,
													border: '2px solid rgba(0,0,0,0.3)',
													borderTopColor: '#000',
													borderRadius: '50%',
													animation: 'spin 0.6s linear infinite',
													display: 'inline-block',
												}}
											/>
											Envoi en cours...
										</>
									) : (
										'Envoyer le message 🚀'
									)}
								</button>
							</form>
						)}
					</div>
				</div>
			</div>
			<style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media(max-width:768px){ .contact-grid{grid-template-columns:1fr !important} }
      `}</style>
		</section>
	);
}
