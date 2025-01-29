"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white h-[8vh] dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white transition-all hover:text-blue-600">
              Report Card
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-all">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-all">
              About
            </Link>
            <Link href="/services" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-all">
              Services
            </Link>
            <Link href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-all">
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="link"
                  className="text-gray-700 dark:text-white focus:outline-none"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {isOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-xs mx-auto space-y-4 px-6 py-4 bg-white rounded-lg shadow-lg dark:bg-gray-900">
                <DialogTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                  Navigation
                </DialogTitle>
                <DialogDescription>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        href="/"
                        className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-all"
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/about"
                        className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-all"
                      >
                        About
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/services"
                        className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-all"
                      >
                        Services
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/contact"
                        className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-all"
                      >
                        Contact
                      </Link>
                    </li>
                  </ul>
                </DialogDescription>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
