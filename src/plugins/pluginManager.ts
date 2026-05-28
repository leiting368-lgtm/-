import { Plugin } from './types';

let plugins: Plugin[] = [];

export function registerPlugin(plugin: Plugin): void {
  plugins.push(plugin);
  plugin.onInit?.();
}

export function unregisterPlugin(id: string): void {
  const plugin = plugins.find((p) => p.id === id);
  if (plugin) {
    plugin.onDestroy?.();
  }
  plugins = plugins.filter((p) => p.id !== id);
}

export function getPlugins(): Plugin[] {
  return plugins;
}

export function interceptMessage(context: {
  contactId: string;
  text: string;
  sender: 'user' | 'assistant';
}): string {
  let currentText = context.text;

  for (const plugin of plugins) {
    if (plugin.interceptChat) {
      plugin.interceptChat(
        { ...context, text: currentText },
        (modifiedText: string) => {
          currentText = modifiedText;
        }
      );
    }
  }

  return currentText;
}
