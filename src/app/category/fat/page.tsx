'use client';

import React from 'react';
import { ThemeToggle } from '@/components/theme-toggle';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link'

export default function FATPage() {
  return (
    <div className="min-h-screen bg-background p-8 pb-20 gap-8 sm:p-20 relative">
      <nav className="flex items-center gap-4 absolute top-2 left-4 sm:top-4 sm:left-8">
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-accent/50 transition-all duration-200"
          asChild
        >
          // Replace <a> with Link
          <Link href="/" className="your-existing-classes">
            Back to Home
          </Link>
        </Button>
        <NavigationMenu className="relative z-10 flex max-w-max flex-1 items-center justify-center ml-4">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 w-[400px]">
                  <NavigationMenuLink asChild>
                    <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground" href="/category/cat">
                      <div className="text-sm font-medium leading-none">CAT Papers</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">Find all CAT exam papers</p>
                    </a>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground" href="/category/fat">
                      <div className="text-sm font-medium leading-none">FAT Papers</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">Find all FAT exam papers</p>
                    </a>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Subjects</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 w-[400px]">
                  <NavigationMenuLink asChild>
                    <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground" href="/subject/cse">
                      <div className="text-sm font-medium leading-none">Computer Science</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">All CSE related papers</p>
                    </a>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground" href="/subject/ece">
                      <div className="text-sm font-medium leading-none">Electronics</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">All ECE related papers</p>
                    </a>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>

      <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-700">        
        <ThemeToggle />
      </div>

      <main className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-1000">Still Being Built</h1>
          <p className="text-muted-foreground animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-200">This section is currently under construction.</p>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 w-full bg-background/80 backdrop-blur-sm p-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6 order-2 sm:order-none">
            <p className="text-sm text-muted-foreground">Created by Arijit, 23BEC0215</p>
          </div>
          <div className="flex items-center gap-6 order-1 sm:order-none">
            <a
              href="https://www.linkedin.com/in/arijit-de-164b8928a"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors duration-200 hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a
              href="https://github.com/oFemto"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors duration-200 hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}