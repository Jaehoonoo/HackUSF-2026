"use client";

import * as React from "react";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { useServerInsertedHTML } from "next/navigation";

export default function ThemeRegistry({ children }) {
  const [cache] = React.useState(() => {
    const nextCache = createCache({ key: "css", prepend: true });
    nextCache.compat = true;
    return nextCache;
  });

  useServerInsertedHTML(() => {
    const entries = Object.entries(cache.inserted);
    if (entries.length === 0) {
      return null;
    }

    const names = entries.map(([name]) => name).join(" ");
    const styles = entries.map(([, style]) => style).join(" ");

    return (
      <style
        data-emotion={`${cache.key} ${names}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
