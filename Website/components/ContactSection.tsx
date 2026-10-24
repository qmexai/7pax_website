'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { enquirySchema, type Enquiry } from '@/lib/validation';

export default function ContactSection() {
  const [status, setStatus] = useState('');
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Enquiry>({ resolver: zodResolver(enquirySchema) });

  const submit = async (data: Enquiry) => {
    setStatus('Sending your enquiry...');
    const response = await fetch('/api/enquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    const result = await response.json();
    setStatus(result.message || 'Please check the form and try again.');
    if (response.ok) reset();
  };

  return (
    <section id="contact" className="section bg-slate-50">
      <div className="container-x grid md:grid-cols-[.8fr_1.2fr] gap-12">
        <div>
          <div className="eyebrow">Travel enquiry</div>
          <h2 className="section-title mt-4">Tell us what kind of journey you are looking for.</h2>
          <p className="text-slate-600 mt-6">Share your ideas, preferences or questions. Our team will get back to you with thoughtful next steps.</p>
          {status && <p className="mt-5 text-sm font-semibold text-[#081325]" role="status">{status}</p>}
        </div>
        <form className="contact-form grid grid-cols-1 md:grid-cols-2 gap-4 card p-6" onSubmit={handleSubmit(submit)}>
          <label className="text-xs tracking-widest">FULL NAME<input className="field mt-2 normal-case tracking-normal" type="text" placeholder="Your name" {...register('fullName')} />{errors.fullName && <span className="block text-red-700 mt-1 normal-case tracking-normal">{errors.fullName.message}</span>}</label>
          <label className="text-xs tracking-widest">PHONE / WHATSAPP<input className="field mt-2 normal-case tracking-normal" type="tel" placeholder="Your contact number" {...register('phone')} />{errors.phone && <span className="block text-red-700 mt-1 normal-case tracking-normal">{errors.phone.message}</span>}</label>
          <label className="md:col-span-2 text-xs tracking-widest">EMAIL ADDRESS<input className="field mt-2 normal-case tracking-normal" type="email" placeholder="you@example.com" {...register('email')} />{errors.email && <span className="block text-red-700 mt-1 normal-case tracking-normal">{errors.email.message}</span>}</label>
          <label className="md:col-span-2 text-xs tracking-widest">YOUR ENQUIRY<textarea className="field mt-2 normal-case tracking-normal min-h-40" placeholder="Tell us where you would like to go, when you would like to travel, or what you need help planning..." {...register('message')} />{errors.message && <span className="block text-red-700 mt-1 normal-case tracking-normal">{errors.message.message}</span>}</label>
          <button className="btn btn-primary md:col-span-2" type="submit">SEND ENQUIRY ↗</button>
        </form>
      </div>
    </section>
  );
}
