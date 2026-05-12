import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Header from '@/components/Header';
import ClaudeConnector from '@/components/ClaudeConnector';
import { demoBoulderingCentres } from '@/lib/demoBoulderingCentres';

function getMcpUrl() {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return `${process.env.NEXT_PUBLIC_APP_URL}/mcp`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}/mcp`;
  }
  return 'http://localhost:3000/mcp';
}

const AI_CONNECTORS = [
  {
    name: 'ChatGPT',
    icon: '🤖',
    steps: [
      'Open ChatGPT and go to Settings.',
      'Go to Connectors / Apps & Connectors.',
      'Enable Developer Mode if not already on.',
      'Click "Add custom connector" and paste the MCP URL above.',
      'Choose No authentication.',
      'Save, start a new chat, and enable the Boulder MCP Demo connector.',
      'Ask: "What is the best bouldering centre for Fred?"',
    ],
    docsUrl: 'https://help.openai.com/en/articles/10148136',
    docsLabel: 'ChatGPT connector docs',
  },
  {
    name: 'Claude',
    icon: '✦',
    steps: [
      'Open Claude.ai and go to Settings.',
      'Go to Integrations.',
      'Click "Add integration" and paste the MCP URL above.',
      'Give it a name like "Boulder MCP Demo".',
      'Save and start a new conversation.',
      'Ask: "What is the best bouldering centre for Fred?"',
    ],
    docsUrl: 'https://support.anthropic.com/en/articles/11175166-about-custom-integrations-using-remote-mcp',
    docsLabel: 'Claude integrations docs',
  },
  {
    name: 'Cursor',
    icon: '⌥',
    steps: [
      'Open Cursor and go to Settings → MCP.',
      'Click "Add new MCP server".',
      'Set the URL to the MCP endpoint above.',
      'Save and restart Cursor if prompted.',
      'Open a chat and ask about bouldering centres.',
    ],
    docsUrl: 'https://docs.cursor.com/context/model-context-protocol',
    docsLabel: 'Cursor MCP docs',
  },
];

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    redirect('/');
  }

  const displayName = user.firstName ?? demoBoulderingCentres.user.name;
  const mcpUrl = getMcpUrl();

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

        {/* Claude connector */}
        <section className="mb-6">
          <ClaudeConnector />
        </section>

        {/* Connect AI Assistant */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-1">
            Connect an AI Assistant
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Add this MCP endpoint to your AI assistant of choice:
          </p>

          <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-6">
            <code className="text-sm font-mono text-gray-800 break-all flex-1">
              {mcpUrl}
            </code>
            <button
              className="text-xs text-gray-500 hover:text-gray-800 shrink-0 border border-gray-200 rounded px-2 py-1 transition-colors"
              onClick={undefined}
              aria-label="Copy MCP URL"
            >
              Copy
            </button>
          </div>

          <div className="space-y-4">
            {AI_CONNECTORS.map((connector) => (
              <details
                key={connector.name}
                className="border border-gray-200 rounded-xl bg-white shadow-sm group"
              >
                <summary className="flex items-center gap-3 px-5 py-4 cursor-pointer select-none list-none">
                  <span className="text-lg">{connector.icon}</span>
                  <span className="font-medium text-gray-900">{connector.name}</span>
                  <span className="ml-auto text-gray-400 text-sm group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <div className="px-5 pb-5 border-t border-gray-100 pt-4">
                  <ol className="space-y-1.5 text-sm text-gray-600 list-decimal list-inside mb-4">
                    {connector.steps.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                  <a
                    href={connector.docsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline"
                  >
                    {connector.docsLabel} →
                  </a>
                </div>
              </details>
            ))}
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
