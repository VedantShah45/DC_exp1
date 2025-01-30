"use client";
import { Dispatch, SetStateAction, useState} from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";

export type authForm = {
  fullname?: string;
  email: string;
  password: string;
};

const AuthModal = ({ setShowModal } : { setShowModal : Dispatch<SetStateAction<boolean>>}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState<authForm>({ email: "", password: "" });

  const handleSubmit = async (e:React.FormEvent) => {
    try {
      e.preventDefault();
      toast.success("Form filled!")
      setShowModal(false)
    } catch (error) {
      toast.error(error as string);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Dialog>
      <DialogTrigger
        className="px-6 py-7 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md text-lg transition"
        asChild
      >
        <Button variant="default">Get Started</Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm p-6 rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            {isLogin ? "Welcome Back!" : "Create an Account"}
          </DialogTitle>
        </DialogHeader>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <Label htmlFor="fullname">Full Name</Label>
              <Input
                name="fullname"
                value={form?.fullname || ""}
                onChange={handleChange}
                id="fullname"
                type="text"
                placeholder="John Doe"
                required
              />
            </div>
          )}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              id="email"
              type="email"
              placeholder="example@email.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="relative">
            <Label htmlFor="password">Password</Label>
            <Input
              name="password"
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-8 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
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
