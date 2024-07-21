import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function mockClassifier(sentence){
  return{
    move:0,
    sub_move:0.0

  }
}
export function randomBalancer(instances){
  return instances[Math.floor(Math.random()*instances.length)]

}
export function balance(instances){
  return randomBalancer(instances)
}



