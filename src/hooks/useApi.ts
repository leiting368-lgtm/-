export async function* streamChat(
  messages: Array<{ role: 'user' | 'assistant'; content: string }>,
  config: { url: string; key: string; model: string; temperature: number }
): AsyncGenerator<string, void, unknown> {
  const isClaude = config.url.includes('claude') || config.url.includes('anthropic');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (config.key) {
    headers['Authorization'] = `Bearer ${config.key}`;
  }

  const bodyData: Record<string, any> = {
    model: config.model,
    messages: messages,
    stream: true,
    temperature: config.temperature,
  };

  const response = await fetch(config.url, {
    method: 'POST',
    headers,
    body: JSON.stringify(bodyData),
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  const reader = response.body?.getReader();
  if (!reader) {
    return;
  }

  const decoder = new TextDecoder('utf-8');
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      const cleanLine = line.trim();
      if (!cleanLine) continue;

      if (isClaude) {
        if (cleanLine.startsWith('data:')) {
          try {
            const jsonStr = cleanLine.slice(5).trim();
            if (jsonStr) {
              const data = JSON.parse(jsonStr);
              if (data.type === 'content_block_delta' && data.delta?.text) {
                yield data.delta.text;
              }
            }
          } catch (e) {
            // Ignore parse errors
          }
        }
      } else {
        if (cleanLine.startsWith('data:')) {
          const jsonStr = cleanLine.slice(5).trim();
          if (jsonStr === '[DONE]') {
            continue;
          }
          try {
            const data = JSON.parse(jsonStr);
            const content = data.choices?.[0]?.delta?.content;
            if (content) {
              yield content;
            }
          } catch (e) {
            // Ignore parse errors
          }
        }
      }
    }
  }
}
