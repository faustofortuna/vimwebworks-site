import { type ReactNode, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { SiteLayout } from '@/components/site-components';
import {
  AboutPage,
  ConsultationPage,
  HomePage,
  LegalPage,
  ProcessPage,
  ServicesPage,
  WorkPage,
} from '@/pages/site-pages';
import { AlderSamplePage, MesaSamplePage, NorthlineSamplePage } from '@/pages/sample-pages';
import { pageMeta } from '@/data/site-data';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

function Metadata() {
  const [location] = useLocation();
  useEffect(() => {
    const meta = pageMeta[location] ?? pageMeta['/'];
    document.title = meta.title;
    const description = document.querySelector('meta[name="description"]') ?? document.createElement('meta');
    description.setAttribute('name', 'description');
    description.setAttribute('content', meta.description);
    if (!description.parentNode) document.head.appendChild(description);
    const robots = document.querySelector('meta[name="robots"]') ?? document.createElement('meta');
    robots.setAttribute('name', 'robots');
    robots.setAttribute('content', 'noindex, nofollow');
    if (!robots.parentNode) document.head.appendChild(robots);
    const canonical = document.querySelector('link[rel="canonical"]') ?? document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', 'https://example.com' + location);
    if (!canonical.parentNode) document.head.appendChild(canonical);
  }, [location]);
  return null;
}

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/work" component={WorkPage} />
        <Route path="/samples/northline-home-services" component={NorthlineSamplePage} />
        <Route path="/samples/mesa-table-kitchen" component={MesaSamplePage} />
        <Route path="/samples/alder-finch-advisory" component={AlderSamplePage} />
        <Route path="/services" component={ServicesPage} />
        <Route path="/process" component={ProcessPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/consultation" component={ConsultationPage} />
        <Route path="/privacy"><LegalPage kind="privacy" /></Route>
        <Route path="/terms"><LegalPage kind="terms" /></Route>
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function AppContent() {
  const [location] = useLocation();
  const isSampleRoute = location.startsWith('/samples/');
  return (
    isSampleRoute ? <Router /> : <SiteLayout><Router /></SiteLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Metadata />
          <AppContent />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
