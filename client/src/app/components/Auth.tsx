"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const AuthModal = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Dialog>
      <DialogTrigger className="px-6 py-7 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md text-lg transition" asChild>
        <Button variant="default">Get Started</Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm p-6 rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            {isLogin ? "Welcome Back!" : "Create an Account"}
          </DialogTitle>
        </DialogHeader>

        {/* Form */}
        <form className="space-y-4">
          {!isLogin && (
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" type="text" placeholder="John Doe" required />
            </div>
          )}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="example@email.com" required />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" required />
          </div>

          <Button type="submit" className="w-full">
            {isLogin ? "Login" : "Sign Up"}
          </Button>
        </form>

        {/* Toggle between Login & Signup */}
        <p className="text-sm text-center text-gray-500">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:underline"
          >
            {isLogin ? "Sign up" : "Login"}
          </button>
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
