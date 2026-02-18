import "@once-ui-system/core/css/styles.css";
import "@once-ui-system/core/css/tokens.css";
import "@/resources/custom.css";

import classNames from "classnames";
import { Meta } from "@once-ui-system/core";

import { Providers } from "@/components";
import ClientShell from "@/components/ClientShell";
import { baseURL, fonts, style, dataStyle, home } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const root = document.documentElement;

                  const config = ${JSON.stringify({
                    brand: style.brand,
                    accent: style.accent,
                    neutral: style.neutral,
                    solid: style.solid,
                    "solid-style": style.solidStyle,
                    border: style.border,
                    surface: style.surface,
                    transition: style.transition,
                    scaling: style.scaling,
                    "viz-style": dataStyle.variant,
                  })};

                  Object.entries(config).forEach(([key, value]) => {
                    root.setAttribute('data-' + key, value);
                  });

                  const resolveTheme = (themeValue) => {
                    if (!themeValue || themeValue === 'system') {
                      return window.matchMedia('(prefers-color-scheme: dark)').matches
                        ? 'dark'
                        : 'light';
                    }
                    return themeValue;
                  };

                  const savedTheme = localStorage.getItem('data-theme');
                  root.setAttribute('data-theme', resolveTheme(savedTheme));
                } catch {
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              })();
            `,
          }}
        />

        <style>{`
          html[data-theme="light"] {
            --gradient-start: rgba(120, 200, 255, 0.18);
            --gradient-end: rgba(255, 255, 255, 0);
          }

          html[data-theme="dark"] {
            --gradient-start: rgba(40, 80, 140, 0.32);
            --gradient-end: rgba(0, 0, 0, 0);
          }

          body {
            position: relative;
            background: transparent;
            overflow-x: hidden;
          }

          body::before {
            content: "";
            position: fixed;
            inset: 0;
            z-index: -1;
            pointer-events: none;

            background: linear-gradient(
              180deg,
              var(--gradient-start) 0%,
              var(--gradient-end) 55%
            );
          }
        `}</style>
      </head>

      <body
        suppressHydrationWarning
        className={classNames(
          fonts.heading.variable,
          fonts.body.variable,
          fonts.label.variable,
          fonts.code.variable
        )}
        style={{ margin: 0 }}
      >
        <Providers>
          <ClientShell>{children}</ClientShell>
        </Providers>
      </body>
    </html>
  );
}
