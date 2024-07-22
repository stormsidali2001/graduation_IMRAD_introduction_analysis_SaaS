"use client"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RegisterUserSchema , type RegisterUserInput } from "@/schema/validation/register-user.schema"
import {  useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import {useAction} from 'next-safe-action/hooks'
import { registerUserAction } from "@/server/actions/register-user"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react"
import {useSession} from 'next-auth/react'


export default function FormWrapper() {
  const form = useForm<RegisterUserInput>({
    resolver: zodResolver(RegisterUserSchema),
    defaultValues:{

    }
  });

  const {executeAsync,isExecuting,hasErrored,result,reset} = useAction(registerUserAction)

  const onSubmit = async (data: RegisterUserInput) => {
    if(isExecuting) return;
    alert(JSON.stringify(data))
    await executeAsync(data)
    form.reset({
      name:"",
      email:"",
      password:"",
      passwordConfirmation:""
    })
    

  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-primary">
            Sign up for our AI tool
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Experience the power of our cutting-edge AI technology.
          </p>
        </div>
        
        {
hasErrored?(
   <Alert variant="destructive">
      <Terminal className="h-4 w-4" />
      <AlertTitle>Something went wrong</AlertTitle>
      <AlertDescription>
       {result?.fetchError || result?.serverError} 
      </AlertDescription>
    </Alert>

):null
        }
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            {/** Name */}

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel >
                   Name 
                  </FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="name"
                      {...field}
                      placeholder="You Name"
                    />
                  </FormControl>
                  <FormDescription>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/** Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel >
                    Email address
                  </FormLabel>
                  <FormControl>
                    <Input

                      autoComplete="email"
                      {...field}
                      placeholder="Email address"
                    />
                  </FormControl>
                  <FormDescription>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/** Password */}

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel >
                   Password 
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"

                      autoComplete="new-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/**Password confirmation */}

            <FormField
              control={form.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel >
                   Password Confirmation 
                  </FormLabel>
                  <FormControl>
                    <Input

                      autoComplete="new-password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

       
       
            <div>
              <Button type="submit" className="w-full">
                Sign up
              </Button>
            </div>
          </form>
        </Form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-muted" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-background px-2 text-muted-foreground">
              Or sign up with
            </span>
          </div>
        </div>
        <div>
          <Button variant="outline" className="w-full">
            <ChromeIcon className="mr-2 h-5 w-5" />
            Sign up with Google
          </Button>
        </div>
      </div>
    </div>
  );
}

function ChromeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}