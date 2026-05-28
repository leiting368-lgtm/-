import { Plugin, ILLocalBackend } from '../types';

export const mcpPlugin: Plugin = {
  id: 'mcp-plugin',
  name: 'MCP服务插件',
  onInit: () => {},
  onDestroy: () => {},
  interceptChat: (context, next) => {
    next(context.text);
  },
};

export const backend: ILLocalBackend = {
  connect: async () => {
    throw new Error('Not implemented');
  },
  sendMessage: async () => {
    throw new Error('Not implemented');
  },
  disconnect: async () => {
    throw new Error('Not implemented');
  },
};
