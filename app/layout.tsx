import './globals.css';
import SiteNav from '@/components/SiteNav';
export const metadata = { title: 'AsskFans Preview', description: 'Ass King + Rosie playable build' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteNav />
        <div style={{paddingTop:48}}>{children}</div>
      </body>
    </html>
  );
}
