import { Link } from 'react-router-dom';

import { CATEGORIES } from './config';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export function Home() {
  return (
    <>
      <h1>Home</h1>
      <ConnectButton />
      <div>
        {CATEGORIES.map(({ path, label }) => (
          <article key={path}>
            <h2>{label}</h2>
            <Link to={path}>View</Link>
          </article>
        ))}
      </div>
    </>
  );
}
