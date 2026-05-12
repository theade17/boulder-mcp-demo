import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Header from '@/components/Header';
import ClaudeConnector from '@/components/ClaudeConnector';
import ChatGPTConnector from '@/components/ChatGPTConnector';
import { demoBoulderingCentres } from '@/lib/demoBoulderingCentres';

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    redirect('/');
  }

  const displayName = user.firstName ?? demoBoulderingCentres.user.name;
  const top = demoBoulderingCentres.centres[0];
  const second = demoBoulderingCentres.centres[1];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Welcome, {displayName}
        </h1>

        {/* Recommended Centres */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Recommended Centres
          </h2>
          <div className="space-y-4">
            {[top, second].map((centre) => (
              <div
                key={centre.rank}
                className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    #{centre.rank}
                  </span>
                  <span className="text-sm font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                    Score: {centre.score}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {centre.name}
                </h3>
                <p className="text-sm text-gray-500 mb-2">{centre.location}</p>
                <p className="text-sm text-gray-700 mb-3">{centre.reason}</p>
                <div className="flex flex-wrap gap-2">
                  {centre.bestFor.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* AI Connectors */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Connect an AI Assistant
          </h2>
          <div className="space-y-4">
            <ClaudeConnector />
            <ChatGPTConnector />
          </div>
        </section>

        {/* Warning */}
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Demo only. Read-only tools. No real bookings, payments, or personal data.
        </div>
      </main>
    </div>
  );
}
