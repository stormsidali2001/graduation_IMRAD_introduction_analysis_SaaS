export function mockClassifier(sentence: string): { move: number; sub_move: number } {
  return { move: 0, sub_move: 0.0 };
}
export function randomBalancer<T>(instances: T[]): T | undefined {
  return instances[Math.floor(Math.random() * instances.length)];
}
export function balance<T>(instances: T[]): T | undefined {
  return randomBalancer(instances);
}

