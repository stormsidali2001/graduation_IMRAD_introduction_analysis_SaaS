import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import  bcrypt from 'bcrypt'

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




export async function  hashPassword(password:string){
  return bcrypt.hash(password,10)
}
export async function comparePassword(hash:string, password:string){
  return bcrypt.compare(password,hash)
}