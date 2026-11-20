// Tests must never reach the network. A change that bypasses the `fetch` setting fails here
// instead of calling the real API.
globalThis.fetch = async (input) => {
  throw new Error(`Unexpected network request in a test: ${String(input)}`);
};
