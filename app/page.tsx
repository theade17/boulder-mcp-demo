import { Show } from '@clerk/nextjs';
import { SignInButton } from '@clerk/nextjs';
import Link from 'next/link';
import Header from '@/components/Header';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="max-w-lg w-full text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Boulder MCP Demo
          </h1>
          <p className="text-lg text-gray-600 mb-10">
            Test app for connecting a bouldering centre finder service to AI assistants through MCP.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors">
                  Sign in
                </button>
              </SignInButton>
            </Show>
            <Show when="signed-in">
              <Link
                href="/dashboard"
                className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
              >
                Go to dashboard
              </Link>
            </Show>
          </div>
        </div>
      </main>
    </div>
  );
}
