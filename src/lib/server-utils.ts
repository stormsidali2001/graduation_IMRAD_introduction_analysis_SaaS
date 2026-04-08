
  import * as bcrypt from 'bcrypt';
export function mockClassifier(sentence: string): { move: number; sub_move: number } {
  return { move: 0, sub_move: 0.0 };
}
export function randomBalancer<T>(instances: T[]): T | undefined {
  return instances[Math.floor(Math.random() * instances.length)];
}
export function balance<T>(instances: T[]): T | undefined {
  return randomBalancer(instances);
}




export async function  hashPassword(password:string){
  return bcrypt.hash(password,10)
}
export async function comparePassword(hash:string, password:string){
  return bcrypt.compare(password,hash)
}