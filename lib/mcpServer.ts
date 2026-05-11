import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { demoBoulderingCentres } from './demoBoulderingCentres';

export function createMcpServer(): McpServer {
  const server = new McpServer({
    name: 'Boulder MCP Demo',
    version: '1.0.0',
  });

  server.registerTool(
    'get_best_centre',
    {
      description: 'Returns the top-ranked bouldering centre for Fred.',
    },
    () => {
      const centre = demoBoulderingCentres.centres[0];
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              name: centre.name,
              location: centre.location,
              score: centre.score,
              reason: centre.reason,
              bestFor: centre.bestFor,
            }),
          },
        ],
      };
    }
  );

  server.registerTool(
    'get_second_best_centre',
    {
      description: 'Returns the second-ranked bouldering centre for Fred.',
    },
    () => {
      const centre = demoBoulderingCentres.centres[1];
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              name: centre.name,
              location: centre.location,
              score: centre.score,
              reason: centre.reason,
              bestFor: centre.bestFor,
            }),
          },
        ],
      };
    }
  );

  server.registerTool(
    'list_recommended_centres',
    {
      description: 'Returns all recommended bouldering centres in ranked order.',
    },
    () => {
      const centres = demoBoulderingCentres.centres.map((c) => ({
        rank: c.rank,
        name: c.name,
        location: c.location,
        score: c.score,
      }));
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({ centres }),
          },
        ],
      };
    }
  );

  return server;
}
