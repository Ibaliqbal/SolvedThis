import Link from "next/link";
import { Instagram, Github } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About SolvedThis</h3>
            <p className="text-sm text-muted-foreground mb-1">
              SolvedThis is a vibrant community where ideas flourish and
              conversations thrive. Join us in shaping the future of online
              discussions.
            </p>
            <p className="text-muted-foreground text-xs mb-2">
              Developer :{" "}
              <a
                href="https://instagram.com/muthahhary_iqbal"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Iqbal Muthahahry
              </a>
            </p>
            <ThemeToggle align="start" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/topics"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Topics
                </Link>
              </li>
              <li>
                <Link
                  href="/create-thread"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Create Thread
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Community</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/guidelines"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Community Guidelines
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://github.com/Ibaliqbal/SolvedThis"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <Github size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-sm text-muted-foreground">
            &copy; 2025 SolvedThis. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
