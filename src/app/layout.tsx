import WagmiProviderWrapper from '../components/WagmiProvider';
import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your App Title',
  description: 'Your app description',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <WagmiProviderWrapper>{children}</WagmiProviderWrapper>
      </body>
    </html>
  );
}