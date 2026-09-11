/**
 * Controller layer — dependency container + context provider.
 * Wires implementations to consumers once, at the composition root.
 * (Dependency Inversion: consumers import the context, not the classes.)
 */

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { InMemorySiteContentRepository } from '../data/InMemorySiteContentRepository.js';

const SiteContext = createContext(null);

export function SiteProvider({ children, repository }) {
  const repo = repository ?? useMemo(() => new InMemorySiteContentRepository(), []);
  const [content, setContent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;
    repo
      .getSiteContent()
      .then((data) => alive && setContent(data))
      .catch((err) => alive && setError(err));
    return () => { alive = false; };
  }, [repo]);

  const value = useMemo(() => ({ content, error, repository: repo }), [content, error, repo]);

  if (error) return <div className="app-error">Não foi possível carregar o conteúdo.</div>;
  if (!content) return null; // first paint waits for the model

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

/** Hook used by views/controllers to read the model. */
export function useSiteContent() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error('useSiteContent must be used inside <SiteProvider>');
  return ctx;
}
