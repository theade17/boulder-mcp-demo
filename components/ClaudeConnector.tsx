'use client';

import { useState } from 'react';

export default function ClaudeConnector() {
  const [copied, setCopied] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const mcpUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/mcp`
    : '/mcp';

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(mcpUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // fallback: select the input text
    }
  };

  const handleConnect = async () => {
    await copyToClipboard();
    setConfirmed(true);
    setTimeout(() => setConfirmed(false), 6000);
    window.open('https://claude.ai/settings/integrations', '_blank');
  };

  const handleExperimentalConnect = async () => {
    await copyToClipboard();
    setConfirmed(true);
    setTimeout(() => setConfirmed(false), 6000);
    window.open(
      `https://claude.ai/settings/integrations?mcp_url=${encodeURIComponent(mcpUrl)}`,
      '_blank'
    );
  };

  return (
    <div className="border border-purple-200 rounded-xl bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-purple-50 px-5 py-4 border-b border-purple-100">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
          <span>✦</span> Connect to Claude
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          Claude does not yet provide a universally reliable one-click MCP installation flow for custom integrations.
          This helper copies your MCP URL and opens Claude&apos;s integration settings to make setup faster.
        </p>
      </div>

      <div className="px-5 py-5 space-y-5">
        {/* MCP URL */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">
            MCP Endpoint
          </label>
          <div className="flex items-center gap-2">
            <input
              readOnly
              value={mcpUrl}
              className="flex-1 text-sm font-mono bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-800 focus:outline-none"
            />
            <button
              onClick={copyToClipboard}
              className={`text-xs px-3 py-2 rounded-lg border transition-colors shrink-0 ${
                copied
                  ? 'bg-green-50 border-green-200 text-green-700'
                  : 'bg-white border-gray-200 text-gray-600 hover:text-gray-900'
              }`}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Primary connect button */}
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={handleConnect}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
          >
            Connect to Claude
          </button>
          <button
            onClick={handleExperimentalConnect}
            className="flex-1 border border-purple-300 text-purple-700 hover:bg-purple-50 text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
          >
            Try experimental one-click setup
          </button>
        </div>

        {/* Confirmation message */}
        {confirmed && (
          <div className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-2.5">
            MCP URL copied. Claude has opened in a new tab. Paste the URL into &quot;Add integration&quot;.
          </div>
        )}

        {/* Manual instructions */}
        <details className="group">
          <summary className="text-sm font-medium text-gray-700 cursor-pointer select-none list-none flex items-center gap-1">
            <span className="group-open:rotate-90 transition-transform inline-block">▶</span>
            How to connect manually
          </summary>
          <ol className="mt-3 space-y-1 text-sm text-gray-600 list-decimal list-inside pl-1">
            <li>Open Claude Settings</li>
            <li>Go to Integrations</li>
            <li>Click &quot;Add integration&quot;</li>
            <li>Paste the MCP URL above</li>
            <li>Save and start a new conversation</li>
          </ol>
        </details>
      </div>
    </div>
  );
}
