"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { ChevronDown, Eye, Download } from "lucide-react";
import { PDFPreviewModal } from "@/components/ui/pdf-preview-modal";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const PaperSkeleton = () => (
  <div className="p-6 border rounded-lg animate-pulse">
    <div className="flex justify-between items-start">
      <div className="space-y-2">
        <div className="h-6 w-48 bg-muted rounded" />
        <div className="h-4 w-32 bg-muted rounded" />
      </div>
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 bg-muted rounded" />
        <div className="h-8 w-8 bg-muted rounded" />
        <div className="h-6 w-16 bg-muted rounded-full" />
      </div>
    </div>
  </div>
);

export default function Home() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [error, setError] = React.useState('');
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const [papers, setPapers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const controller = new AbortController();
    async function fetchPapers() {
      try {
        setLoading(true);
        setError('');
        const response = await fetch('/api/papers', { signal: controller.signal });
        if (!response.ok) throw new Error('Failed to fetch papers');
        const data = await response.json();
        setPapers(data);
      } catch (error) {
        if (error.name === 'AbortError') return;
        console.error('Error fetching papers:', error);
        setError('Failed to load papers. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    fetchPapers();
    return () => controller.abort();
  }, []);

  const filteredPapers = React.useMemo(() => {
    if (!searchTerm.trim()) return papers;
    const searchLower = searchTerm.toLowerCase();
    return papers.filter((paper) => 
      paper.subjectCode?.toLowerCase().includes(searchLower) ||
      paper.title?.toLowerCase().includes(searchLower)
    );
  }, [papers, searchTerm]);

  const [selectedPaper, setSelectedPaper] = React.useState<{ url: string } | null>(null);

  return (
    <div className="min-h-screen bg-background p-8 pb-20 gap-8 sm:p-20 relative">
      <nav className="flex items-center gap-4 absolute top-2 left-4 sm:top-4 sm:left-8">
        <NavigationMenu className="relative z-10 flex max-w-max flex-1 items-center justify-center ml-4">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 w-[400px]">
                  <NavigationMenuLink asChild>
                    <Link 
                      href="/category/cat" 
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div className="text-sm font-medium leading-none">CAT Papers</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">Find all CAT exam papers</p>
                    </Link>
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
          <h1 className="text-4xl font-bold tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-1000">VIT BACKLOG PAPERS</h1>
          <p className="text-muted-foreground animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-200">Find and share exam papers easily</p>
        </div>

        <div className="flex gap-4 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
          <Input 
            placeholder="Search by subject code or name..."
            className="flex-1 transition-all hover:ring-2 hover:ring-ring"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button 
            variant="outline" 
            className="transition-all hover:scale-105"
            onClick={() => setSearchTerm('')}
          >
            {searchTerm ? 'Clear' : 'Search'}
          </Button>
          <Button variant="default" className="transition-all hover:scale-105" asChild>
            <a href="/upload">Upload Paper</a>
          </Button>
        </div>

        <div className="grid gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
          <div className="flex justify-between items-center">
            <div className="relative" ref={dropdownRef}>
              <Button 
                variant="ghost" 
                size="sm" 
                className="transition-all hover:scale-105 flex items-center gap-2"
                onClick={() => setIsOpen(!isOpen)}
              >
                Sort by
                <ChevronDown className="h-4 w-4" />
              </Button>
              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-popover border animate-in fade-in-0 zoom-in-95">
                  <div className="py-1">
                    <button 
                      className="w-full px-4 py-2 text-sm text-left hover:bg-accent/50 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Most viewed
                    </button>
                    <button 
                      className="w-full px-4 py-2 text-sm text-left hover:bg-accent/50 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Random
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid gap-4">
            {error ? (
              <div className="text-center text-red-500">{error}</div>
            ) : loading ? (
              <>
                <PaperSkeleton />
                <PaperSkeleton />
                <PaperSkeleton />
              </>
            ) : filteredPapers.length === 0 ? (
              <div className="text-center text-muted-foreground">
                {papers.length === 0 ? 'No papers found' : 'No matching papers found'}
              </div>
            ) : (
              filteredPapers.map((paper) => (
                <div key={paper.id} className="p-6 border rounded-lg hover:bg-accent/50 transition-all duration-300 cursor-pointer hover:scale-[1.02] hover:shadow-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{paper.subjectCode} - {paper.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{paper.examType} - {paper.semester} {paper.year}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-accent/50"
                        onClick={() => setSelectedPaper({ url: paper.filePath })}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <a href={paper.filePath} target="_blank" rel="noopener noreferrer">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:bg-accent/50"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </a>
                      <p className="text-sm text-muted-foreground bg-muted/30 px-3 py-1 rounded-full">{paper.views} views</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="grid gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold tracking-tight">Frequently Asked Questions</h2>
          </div>

          <Accordion type="single" collapsible className="w-full transition-all duration-200">
            <AccordionItem value="item-1">
              <AccordionTrigger className="hover:no-underline transition-all duration-200 hover:bg-accent/50 px-4 rounded-lg">Is it only for backlog papers?</AccordionTrigger>
              <AccordionContent className="px-4 pt-2">
                Yes, it is only for back papers. If you want non-backlog papers, you can check out VIT codechef's page.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="hover:no-underline transition-all duration-200 hover:bg-accent/50 px-4 rounded-lg">Will this page be updated with newer papers?</AccordionTrigger>
              <AccordionContent className="px-4 pt-2">
                Yes, I will do my best to add newer papers and new functionalities to this website.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="hover:no-underline transition-all duration-200 hover:bg-accent/50 px-4 rounded-lg">Can anyone upload papers to this site?</AccordionTrigger>
              <AccordionContent className="px-4 pt-2">
                Yes, even you can upload directly and contribute!
              </AccordionContent>
            </AccordionItem>
          </Accordion>
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
            <a
              href="https://x.com/aristr0L"
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
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/arijit.xo/"
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
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>
      </footer>

      <PDFPreviewModal
        isOpen={!!selectedPaper}
        onClose={() => setSelectedPaper(null)}
        paperUrl={selectedPaper?.url ?? ''}
        onDownload={() => window.open(selectedPaper?.url, '_blank')}
      />
    </div>
  );
}
