'use client'; 

import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <section className="bg-black border-b py-20 md:py-32 text-white text-center min-h-[calc(100vh-var(--header-height)-var(--footer-height))] flex items-center justify-center">
      <div className="container mx-auto px-4">
        <h1 className="text-6xl md:text-8xl font-bold mb-4 text-blue-600">
          404
        </h1>

        <h2 className="text-3xl md:text-5xl font-semibold mb-6">
          Page Not Found
        </h2>

        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-gray-300">
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </p>

        <div className="flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center bg-blue-600 text-white font-bold px-8 py-4 rounded-full text-xl shadow-lg hover:bg-blue-700 transition duration-300"
          >
            <Home className="w-6 h-6 mr-3" /> Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
