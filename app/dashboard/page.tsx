import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Header from '@/components/Header';
import { demoBoulderingCentres } from '@/lib/demoBoulderingCentres';

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    redirect('/');
  }

  const displayName = user.firstName ?? demoBoulderingCentres.user.name;
  const mcpUrl =
    process.env.NEXT_PUBLIC_APP_URL
      ? `${process.env.NEXT_PUBLIC_APP_URL}/mcp`
      : 'http://localhost:3000/mcp';

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

        {/* Connect AI Assistant */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Connect AI Assistant
          </h2>
          <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm">
            <p className="text-sm text-gray-700 mb-3">
              To test this in ChatGPT Developer Mode, add this MCP endpoint as a custom connector:
            </p>
            <code className="block bg-gray-100 text-gray-800 text-sm px-4 py-3 rounded-lg font-mono break-all mb-4">
              {mcpUrl}
            </code>

            <details className="mt-2">
              <summary className="text-sm font-medium text-gray-700 cursor-pointer select-none">
                How to test with ChatGPT Developer Mode
              </summary>
              <ol className="mt-3 space-y-1.5 text-sm text-gray-600 list-decimal list-inside">
                <li>Deploy this app to Vercel.</li>
                <li>Copy the deployed MCP endpoint URL above.</li>
                <li>In ChatGPT web, open Settings.</li>
                <li>Go to Connectors / Apps &amp; Connectors.</li>
                <li>Enable Developer Mode if needed.</li>
                <li>Create a new custom MCP connector.</li>
                <li>Name it: <span className="font-medium text-gray-800">Boulder MCP Demo</span></li>
                <li>Paste the MCP endpoint URL.</li>
                <li>Choose no authentication for the first prototype.</li>
                <li>Save the connector, start a new chat, and add the connector.</li>
                <li>Ask: <em>&quot;What is the best bouldering centre for Fred?&quot;</em></li>
              </ol>
            </details>
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
