import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, Menu, X, LogOut, Loader2 } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Logout error:", error);
        toast({
          title: "Error",
          description: "Failed to sign out. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Signed out",
          description: "You have been successfully signed out.",
        });
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error("Unexpected logout error:", error);
    } finally {
      setIsLoggingOut(false);
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-card/80 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
              <Users className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-foreground">Community</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            {user && (
              <>
                <Link to="/dashboard/events" className="text-muted-foreground hover:text-foreground transition-colors">
                  Events
                </Link>
                <Link to="/dashboard/posts" className="text-muted-foreground hover:text-foreground transition-colors">
                  Posts
                </Link>
                <Link to="/dashboard/members" className="text-muted-foreground hover:text-foreground transition-colors">
                  Members
                </Link>
              </>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            ) : user ? (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </>
                  )}
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">Get Started</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t animate-slide-down">
            <div className="flex flex-col gap-4">
              <Link 
                to="/" 
                className="text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              {user && (
                <>
                  <Link 
                    to="/dashboard/events" 
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Events
                  </Link>
                  <Link 
                    to="/dashboard/posts" 
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Posts
                  </Link>
                  <Link 
                    to="/dashboard/members" 
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Members
                  </Link>
                </>
              )}
              <div className="flex flex-col gap-2 pt-4 border-t">
                {loading ? (
                  <div className="flex justify-center py-2">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                  </div>
                ) : user ? (
                  <>
                    <Button variant="outline" asChild>
                      <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
                    </Button>
                    <Button 
                      variant="destructive" 
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                    >
                      {isLoggingOut ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign Out
                        </>
                      )}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" asChild>
                      <Link to="/login" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
                    </Button>
                    <Button asChild>
                      <Link to="/register" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;