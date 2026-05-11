import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js';
import { createMcpServer } from '@/lib/mcpServer';

// TODO: In a production version, validate the user/session or OAuth token here.

export async function POST(req: Request) {
  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: undefined, // stateless mode
  });

  const server = createMcpServer();
  await server.connect(transport);

  return transport.handleRequest(req);
}

export async function GET(req: Request) {
  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
  });

  const server = createMcpServer();
  await server.connect(transport);

  return transport.handleRequest(req);
}

export async function DELETE(req: Request) {
  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
  });

  const server = createMcpServer();
  await server.connect(transport);

  return transport.handleRequest(req);
}
