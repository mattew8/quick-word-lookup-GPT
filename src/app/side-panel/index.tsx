import ReactDOM from 'react-dom/client';
import SearchWord from '@/pages/search-word/SearchWord';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';

async function initialize() {
  const rootElement = document.getElementById('root');
  if (rootElement === null) return;

  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <Theme>
      <SearchWord />
    </Theme>,
  );
}

initialize();
