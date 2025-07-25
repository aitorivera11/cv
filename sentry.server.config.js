import * as Sentry from '@sentry/astro';

Sentry.init({
  dsn: process.env.SENTRY_DSN, 
  tracesSampleRate: 1.0,
});
globalThis["__sentryRouteInfo"] = [
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/404.astro",
    "pattern": "/404",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/404\\/?$",
    "segments": [
      [
        {
          "content": "404",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "pathname": "/404",
    "patternCaseSensitive": "/404"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/blog/[slug].astro",
    "pattern": "/blog/[slug]",
    "params": [
      "slug"
    ],
    "origin": "project",
    "patternRegex": "^\\/blog\\/([^/]+?)\\/?$",
    "segments": [
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ],
      [
        {
          "content": "slug",
          "dynamic": true,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/blog/[slug]"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/blog/index.astro",
    "pattern": "/blog",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/blog\\/?$",
    "segments": [
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "pathname": "/blog",
    "patternCaseSensitive": "/blog"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/robots.txt.ts",
    "pattern": "/robots.txt",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/robots\\.txt\\/?$",
    "segments": [
      [
        {
          "content": "robots.txt",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "endpoint",
    "pathname": "/robots.txt",
    "patternCaseSensitive": "/robots.txt"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/[locale]/blog/[slug].astro",
    "pattern": "/[locale]/blog/[slug]",
    "params": [
      "locale",
      "slug"
    ],
    "origin": "project",
    "patternRegex": "^\\/([^/]+?)\\/blog\\/([^/]+?)\\/?$",
    "segments": [
      [
        {
          "content": "locale",
          "dynamic": true,
          "spread": false
        }
      ],
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ],
      [
        {
          "content": "slug",
          "dynamic": true,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/[locale]/blog/[slug]"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/[locale]/blog/index.astro",
    "pattern": "/[locale]/blog",
    "params": [
      "locale"
    ],
    "origin": "project",
    "patternRegex": "^\\/([^/]+?)\\/blog\\/?$",
    "segments": [
      [
        {
          "content": "locale",
          "dynamic": true,
          "spread": false
        }
      ],
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/[locale]/blog"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/[locale]/index.astro",
    "pattern": "/[locale]",
    "params": [
      "locale"
    ],
    "origin": "project",
    "patternRegex": "^\\/([^/]+?)\\/?$",
    "segments": [
      [
        {
          "content": "locale",
          "dynamic": true,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/[locale]"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/index.astro",
    "pattern": "/",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/$",
    "segments": [],
    "type": "page",
    "pathname": "/",
    "patternCaseSensitive": "/"
  }
];
globalThis["__sentryRouteInfo"] = [
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/404.astro",
    "pattern": "/404",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/404\\/?$",
    "segments": [
      [
        {
          "content": "404",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "pathname": "/404",
    "patternCaseSensitive": "/404"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/blog/[slug].astro",
    "pattern": "/blog/[slug]",
    "params": [
      "slug"
    ],
    "origin": "project",
    "patternRegex": "^\\/blog\\/([^/]+?)\\/?$",
    "segments": [
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ],
      [
        {
          "content": "slug",
          "dynamic": true,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/blog/[slug]"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/blog/index.astro",
    "pattern": "/blog",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/blog\\/?$",
    "segments": [
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "pathname": "/blog",
    "patternCaseSensitive": "/blog"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/robots.txt.ts",
    "pattern": "/robots.txt",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/robots\\.txt\\/?$",
    "segments": [
      [
        {
          "content": "robots.txt",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "endpoint",
    "pathname": "/robots.txt",
    "patternCaseSensitive": "/robots.txt"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/[locale]/blog/[slug].astro",
    "pattern": "/[locale]/blog/[slug]",
    "params": [
      "locale",
      "slug"
    ],
    "origin": "project",
    "patternRegex": "^\\/([^/]+?)\\/blog\\/([^/]+?)\\/?$",
    "segments": [
      [
        {
          "content": "locale",
          "dynamic": true,
          "spread": false
        }
      ],
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ],
      [
        {
          "content": "slug",
          "dynamic": true,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/[locale]/blog/[slug]"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/[locale]/blog/index.astro",
    "pattern": "/[locale]/blog",
    "params": [
      "locale"
    ],
    "origin": "project",
    "patternRegex": "^\\/([^/]+?)\\/blog\\/?$",
    "segments": [
      [
        {
          "content": "locale",
          "dynamic": true,
          "spread": false
        }
      ],
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/[locale]/blog"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/[locale]/index.astro",
    "pattern": "/[locale]",
    "params": [
      "locale"
    ],
    "origin": "project",
    "patternRegex": "^\\/([^/]+?)\\/?$",
    "segments": [
      [
        {
          "content": "locale",
          "dynamic": true,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/[locale]"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/index.astro",
    "pattern": "/",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/$",
    "segments": [],
    "type": "page",
    "pathname": "/",
    "patternCaseSensitive": "/"
  }
];
globalThis["__sentryRouteInfo"] = [
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/404.astro",
    "pattern": "/404",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/404\\/?$",
    "segments": [
      [
        {
          "content": "404",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "pathname": "/404",
    "patternCaseSensitive": "/404"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/blog/[slug].astro",
    "pattern": "/blog/[slug]",
    "params": [
      "slug"
    ],
    "origin": "project",
    "patternRegex": "^\\/blog\\/([^/]+?)\\/?$",
    "segments": [
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ],
      [
        {
          "content": "slug",
          "dynamic": true,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/blog/[slug]"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/blog/index.astro",
    "pattern": "/blog",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/blog\\/?$",
    "segments": [
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "pathname": "/blog",
    "patternCaseSensitive": "/blog"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/robots.txt.ts",
    "pattern": "/robots.txt",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/robots\\.txt\\/?$",
    "segments": [
      [
        {
          "content": "robots.txt",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "endpoint",
    "pathname": "/robots.txt",
    "patternCaseSensitive": "/robots.txt"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/[locale]/blog/[slug].astro",
    "pattern": "/[locale]/blog/[slug]",
    "params": [
      "locale",
      "slug"
    ],
    "origin": "project",
    "patternRegex": "^\\/([^/]+?)\\/blog\\/([^/]+?)\\/?$",
    "segments": [
      [
        {
          "content": "locale",
          "dynamic": true,
          "spread": false
        }
      ],
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ],
      [
        {
          "content": "slug",
          "dynamic": true,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/[locale]/blog/[slug]"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/[locale]/blog/index.astro",
    "pattern": "/[locale]/blog",
    "params": [
      "locale"
    ],
    "origin": "project",
    "patternRegex": "^\\/([^/]+?)\\/blog\\/?$",
    "segments": [
      [
        {
          "content": "locale",
          "dynamic": true,
          "spread": false
        }
      ],
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/[locale]/blog"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/[locale]/index.astro",
    "pattern": "/[locale]",
    "params": [
      "locale"
    ],
    "origin": "project",
    "patternRegex": "^\\/([^/]+?)\\/?$",
    "segments": [
      [
        {
          "content": "locale",
          "dynamic": true,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/[locale]"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/index.astro",
    "pattern": "/",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/$",
    "segments": [],
    "type": "page",
    "pathname": "/",
    "patternCaseSensitive": "/"
  }
];
globalThis["__sentryRouteInfo"] = [
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/404.astro",
    "pattern": "/404",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/404\\/?$",
    "segments": [
      [
        {
          "content": "404",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "pathname": "/404",
    "patternCaseSensitive": "/404"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/blog/[slug].astro",
    "pattern": "/blog/[slug]",
    "params": [
      "slug"
    ],
    "origin": "project",
    "patternRegex": "^\\/blog\\/([^/]+?)\\/?$",
    "segments": [
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ],
      [
        {
          "content": "slug",
          "dynamic": true,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/blog/[slug]"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/blog/index.astro",
    "pattern": "/blog",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/blog\\/?$",
    "segments": [
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "pathname": "/blog",
    "patternCaseSensitive": "/blog"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/robots.txt.ts",
    "pattern": "/robots.txt",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/robots\\.txt\\/?$",
    "segments": [
      [
        {
          "content": "robots.txt",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "endpoint",
    "pathname": "/robots.txt",
    "patternCaseSensitive": "/robots.txt"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/[locale]/blog/[slug].astro",
    "pattern": "/[locale]/blog/[slug]",
    "params": [
      "locale",
      "slug"
    ],
    "origin": "project",
    "patternRegex": "^\\/([^/]+?)\\/blog\\/([^/]+?)\\/?$",
    "segments": [
      [
        {
          "content": "locale",
          "dynamic": true,
          "spread": false
        }
      ],
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ],
      [
        {
          "content": "slug",
          "dynamic": true,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/[locale]/blog/[slug]"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/[locale]/blog/index.astro",
    "pattern": "/[locale]/blog",
    "params": [
      "locale"
    ],
    "origin": "project",
    "patternRegex": "^\\/([^/]+?)\\/blog\\/?$",
    "segments": [
      [
        {
          "content": "locale",
          "dynamic": true,
          "spread": false
        }
      ],
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/[locale]/blog"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/[locale]/index.astro",
    "pattern": "/[locale]",
    "params": [
      "locale"
    ],
    "origin": "project",
    "patternRegex": "^\\/([^/]+?)\\/?$",
    "segments": [
      [
        {
          "content": "locale",
          "dynamic": true,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/[locale]"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/index.astro",
    "pattern": "/",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/$",
    "segments": [],
    "type": "page",
    "pathname": "/",
    "patternCaseSensitive": "/"
  }
];
globalThis["__sentryRouteInfo"] = [
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/404.astro",
    "pattern": "/404",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/404\\/?$",
    "segments": [
      [
        {
          "content": "404",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "pathname": "/404",
    "patternCaseSensitive": "/404"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/blog/[slug].astro",
    "pattern": "/blog/[slug]",
    "params": [
      "slug"
    ],
    "origin": "project",
    "patternRegex": "^\\/blog\\/([^/]+?)\\/?$",
    "segments": [
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ],
      [
        {
          "content": "slug",
          "dynamic": true,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/blog/[slug]"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/blog/index.astro",
    "pattern": "/blog",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/blog\\/?$",
    "segments": [
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "pathname": "/blog",
    "patternCaseSensitive": "/blog"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/robots.txt.ts",
    "pattern": "/robots.txt",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/robots\\.txt\\/?$",
    "segments": [
      [
        {
          "content": "robots.txt",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "endpoint",
    "pathname": "/robots.txt",
    "patternCaseSensitive": "/robots.txt"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/[locale]/blog/[slug].astro",
    "pattern": "/[locale]/blog/[slug]",
    "params": [
      "locale",
      "slug"
    ],
    "origin": "project",
    "patternRegex": "^\\/([^/]+?)\\/blog\\/([^/]+?)\\/?$",
    "segments": [
      [
        {
          "content": "locale",
          "dynamic": true,
          "spread": false
        }
      ],
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ],
      [
        {
          "content": "slug",
          "dynamic": true,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/[locale]/blog/[slug]"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/[locale]/blog/index.astro",
    "pattern": "/[locale]/blog",
    "params": [
      "locale"
    ],
    "origin": "project",
    "patternRegex": "^\\/([^/]+?)\\/blog\\/?$",
    "segments": [
      [
        {
          "content": "locale",
          "dynamic": true,
          "spread": false
        }
      ],
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/[locale]/blog"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/[locale]/index.astro",
    "pattern": "/[locale]",
    "params": [
      "locale"
    ],
    "origin": "project",
    "patternRegex": "^\\/([^/]+?)\\/?$",
    "segments": [
      [
        {
          "content": "locale",
          "dynamic": true,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/[locale]"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/index.astro",
    "pattern": "/",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/$",
    "segments": [],
    "type": "page",
    "pathname": "/",
    "patternCaseSensitive": "/"
  }
];
globalThis["__sentryRouteInfo"] = [
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/404.astro",
    "pattern": "/404",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/404\\/?$",
    "segments": [
      [
        {
          "content": "404",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "pathname": "/404",
    "patternCaseSensitive": "/404"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/blog/[slug].astro",
    "pattern": "/blog/[slug]",
    "params": [
      "slug"
    ],
    "origin": "project",
    "patternRegex": "^\\/blog\\/([^/]+?)\\/?$",
    "segments": [
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ],
      [
        {
          "content": "slug",
          "dynamic": true,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/blog/[slug]"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/blog/index.astro",
    "pattern": "/blog",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/blog\\/?$",
    "segments": [
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "pathname": "/blog",
    "patternCaseSensitive": "/blog"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/robots.txt.ts",
    "pattern": "/robots.txt",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/robots\\.txt\\/?$",
    "segments": [
      [
        {
          "content": "robots.txt",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "endpoint",
    "pathname": "/robots.txt",
    "patternCaseSensitive": "/robots.txt"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/[locale]/blog/[slug].astro",
    "pattern": "/[locale]/blog/[slug]",
    "params": [
      "locale",
      "slug"
    ],
    "origin": "project",
    "patternRegex": "^\\/([^/]+?)\\/blog\\/([^/]+?)\\/?$",
    "segments": [
      [
        {
          "content": "locale",
          "dynamic": true,
          "spread": false
        }
      ],
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ],
      [
        {
          "content": "slug",
          "dynamic": true,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/[locale]/blog/[slug]"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/[locale]/blog/index.astro",
    "pattern": "/[locale]/blog",
    "params": [
      "locale"
    ],
    "origin": "project",
    "patternRegex": "^\\/([^/]+?)\\/blog\\/?$",
    "segments": [
      [
        {
          "content": "locale",
          "dynamic": true,
          "spread": false
        }
      ],
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/[locale]/blog"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/[locale]/index.astro",
    "pattern": "/[locale]",
    "params": [
      "locale"
    ],
    "origin": "project",
    "patternRegex": "^\\/([^/]+?)\\/?$",
    "segments": [
      [
        {
          "content": "locale",
          "dynamic": true,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/[locale]"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/index.astro",
    "pattern": "/",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/$",
    "segments": [],
    "type": "page",
    "pathname": "/",
    "patternCaseSensitive": "/"
  }
];
globalThis["__sentryRouteInfo"] = [
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/404.astro",
    "pattern": "/404",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/404\\/?$",
    "segments": [
      [
        {
          "content": "404",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "pathname": "/404",
    "patternCaseSensitive": "/404"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/blog/[slug].astro",
    "pattern": "/blog/[slug]",
    "params": [
      "slug"
    ],
    "origin": "project",
    "patternRegex": "^\\/blog\\/([^/]+?)\\/?$",
    "segments": [
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ],
      [
        {
          "content": "slug",
          "dynamic": true,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/blog/[slug]"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/blog/index.astro",
    "pattern": "/blog",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/blog\\/?$",
    "segments": [
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "pathname": "/blog",
    "patternCaseSensitive": "/blog"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/robots.txt.ts",
    "pattern": "/robots.txt",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/robots\\.txt\\/?$",
    "segments": [
      [
        {
          "content": "robots.txt",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "endpoint",
    "pathname": "/robots.txt",
    "patternCaseSensitive": "/robots.txt"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/[locale]/blog/[slug].astro",
    "pattern": "/[locale]/blog/[slug]",
    "params": [
      "locale",
      "slug"
    ],
    "origin": "project",
    "patternRegex": "^\\/([^/]+?)\\/blog\\/([^/]+?)\\/?$",
    "segments": [
      [
        {
          "content": "locale",
          "dynamic": true,
          "spread": false
        }
      ],
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ],
      [
        {
          "content": "slug",
          "dynamic": true,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/[locale]/blog/[slug]"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/[locale]/blog/index.astro",
    "pattern": "/[locale]/blog",
    "params": [
      "locale"
    ],
    "origin": "project",
    "patternRegex": "^\\/([^/]+?)\\/blog\\/?$",
    "segments": [
      [
        {
          "content": "locale",
          "dynamic": true,
          "spread": false
        }
      ],
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/[locale]/blog"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/[locale]/index.astro",
    "pattern": "/[locale]",
    "params": [
      "locale"
    ],
    "origin": "project",
    "patternRegex": "^\\/([^/]+?)\\/?$",
    "segments": [
      [
        {
          "content": "locale",
          "dynamic": true,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/[locale]"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/index.astro",
    "pattern": "/",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/$",
    "segments": [],
    "type": "page",
    "pathname": "/",
    "patternCaseSensitive": "/"
  }
];
globalThis["__sentryRouteInfo"] = [
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/404.astro",
    "pattern": "/404",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/404\\/?$",
    "segments": [
      [
        {
          "content": "404",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "pathname": "/404",
    "patternCaseSensitive": "/404"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/blog/[slug].astro",
    "pattern": "/blog/[slug]",
    "params": [
      "slug"
    ],
    "origin": "project",
    "patternRegex": "^\\/blog\\/([^/]+?)\\/?$",
    "segments": [
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ],
      [
        {
          "content": "slug",
          "dynamic": true,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/blog/[slug]"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/blog/index.astro",
    "pattern": "/blog",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/blog\\/?$",
    "segments": [
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "pathname": "/blog",
    "patternCaseSensitive": "/blog"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/robots.txt.ts",
    "pattern": "/robots.txt",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/robots\\.txt\\/?$",
    "segments": [
      [
        {
          "content": "robots.txt",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "endpoint",
    "pathname": "/robots.txt",
    "patternCaseSensitive": "/robots.txt"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/[locale]/blog/[slug].astro",
    "pattern": "/[locale]/blog/[slug]",
    "params": [
      "locale",
      "slug"
    ],
    "origin": "project",
    "patternRegex": "^\\/([^/]+?)\\/blog\\/([^/]+?)\\/?$",
    "segments": [
      [
        {
          "content": "locale",
          "dynamic": true,
          "spread": false
        }
      ],
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ],
      [
        {
          "content": "slug",
          "dynamic": true,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/[locale]/blog/[slug]"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/[locale]/blog/index.astro",
    "pattern": "/[locale]/blog",
    "params": [
      "locale"
    ],
    "origin": "project",
    "patternRegex": "^\\/([^/]+?)\\/blog\\/?$",
    "segments": [
      [
        {
          "content": "locale",
          "dynamic": true,
          "spread": false
        }
      ],
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/[locale]/blog"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/[locale]/index.astro",
    "pattern": "/[locale]",
    "params": [
      "locale"
    ],
    "origin": "project",
    "patternRegex": "^\\/([^/]+?)\\/?$",
    "segments": [
      [
        {
          "content": "locale",
          "dynamic": true,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/[locale]"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/index.astro",
    "pattern": "/",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/$",
    "segments": [],
    "type": "page",
    "pathname": "/",
    "patternCaseSensitive": "/"
  }
];
globalThis["__sentryRouteInfo"] = [
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/404.astro",
    "pattern": "/404",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/404\\/?$",
    "segments": [
      [
        {
          "content": "404",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "pathname": "/404",
    "patternCaseSensitive": "/404"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/blog/[slug].astro",
    "pattern": "/blog/[slug]",
    "params": [
      "slug"
    ],
    "origin": "project",
    "patternRegex": "^\\/blog\\/([^/]+?)\\/?$",
    "segments": [
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ],
      [
        {
          "content": "slug",
          "dynamic": true,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/blog/[slug]"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/blog/index.astro",
    "pattern": "/blog",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/blog\\/?$",
    "segments": [
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "pathname": "/blog",
    "patternCaseSensitive": "/blog"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/robots.txt.ts",
    "pattern": "/robots.txt",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/robots\\.txt\\/?$",
    "segments": [
      [
        {
          "content": "robots.txt",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "endpoint",
    "pathname": "/robots.txt",
    "patternCaseSensitive": "/robots.txt"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/[locale]/blog/[slug].astro",
    "pattern": "/[locale]/blog/[slug]",
    "params": [
      "locale",
      "slug"
    ],
    "origin": "project",
    "patternRegex": "^\\/([^/]+?)\\/blog\\/([^/]+?)\\/?$",
    "segments": [
      [
        {
          "content": "locale",
          "dynamic": true,
          "spread": false
        }
      ],
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ],
      [
        {
          "content": "slug",
          "dynamic": true,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/[locale]/blog/[slug]"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/[locale]/blog/index.astro",
    "pattern": "/[locale]/blog",
    "params": [
      "locale"
    ],
    "origin": "project",
    "patternRegex": "^\\/([^/]+?)\\/blog\\/?$",
    "segments": [
      [
        {
          "content": "locale",
          "dynamic": true,
          "spread": false
        }
      ],
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/[locale]/blog"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/[locale]/index.astro",
    "pattern": "/[locale]",
    "params": [
      "locale"
    ],
    "origin": "project",
    "patternRegex": "^\\/([^/]+?)\\/?$",
    "segments": [
      [
        {
          "content": "locale",
          "dynamic": true,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/[locale]"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/index.astro",
    "pattern": "/",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/$",
    "segments": [],
    "type": "page",
    "pathname": "/",
    "patternCaseSensitive": "/"
  }
];
globalThis["__sentryRouteInfo"] = [
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/404.astro",
    "pattern": "/404",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/404\\/?$",
    "segments": [
      [
        {
          "content": "404",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "pathname": "/404",
    "patternCaseSensitive": "/404"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/blog/[slug].astro",
    "pattern": "/blog/[slug]",
    "params": [
      "slug"
    ],
    "origin": "project",
    "patternRegex": "^\\/blog\\/([^/]+?)\\/?$",
    "segments": [
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ],
      [
        {
          "content": "slug",
          "dynamic": true,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/blog/[slug]"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/blog/index.astro",
    "pattern": "/blog",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/blog\\/?$",
    "segments": [
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "pathname": "/blog",
    "patternCaseSensitive": "/blog"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/robots.txt.ts",
    "pattern": "/robots.txt",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/robots\\.txt\\/?$",
    "segments": [
      [
        {
          "content": "robots.txt",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "endpoint",
    "pathname": "/robots.txt",
    "patternCaseSensitive": "/robots.txt"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/[locale]/blog/[slug].astro",
    "pattern": "/[locale]/blog/[slug]",
    "params": [
      "locale",
      "slug"
    ],
    "origin": "project",
    "patternRegex": "^\\/([^/]+?)\\/blog\\/([^/]+?)\\/?$",
    "segments": [
      [
        {
          "content": "locale",
          "dynamic": true,
          "spread": false
        }
      ],
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ],
      [
        {
          "content": "slug",
          "dynamic": true,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/[locale]/blog/[slug]"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/[locale]/blog/index.astro",
    "pattern": "/[locale]/blog",
    "params": [
      "locale"
    ],
    "origin": "project",
    "patternRegex": "^\\/([^/]+?)\\/blog\\/?$",
    "segments": [
      [
        {
          "content": "locale",
          "dynamic": true,
          "spread": false
        }
      ],
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/[locale]/blog"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/[locale]/index.astro",
    "pattern": "/[locale]",
    "params": [
      "locale"
    ],
    "origin": "project",
    "patternRegex": "^\\/([^/]+?)\\/?$",
    "segments": [
      [
        {
          "content": "locale",
          "dynamic": true,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/[locale]"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/index.astro",
    "pattern": "/",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/$",
    "segments": [],
    "type": "page",
    "pathname": "/",
    "patternCaseSensitive": "/"
  }
];
globalThis["__sentryRouteInfo"] = [
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/404.astro",
    "pattern": "/404",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/404\\/?$",
    "segments": [
      [
        {
          "content": "404",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "pathname": "/404",
    "patternCaseSensitive": "/404"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/blog/[slug].astro",
    "pattern": "/blog/[slug]",
    "params": [
      "slug"
    ],
    "origin": "project",
    "patternRegex": "^\\/blog\\/([^/]+?)\\/?$",
    "segments": [
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ],
      [
        {
          "content": "slug",
          "dynamic": true,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/blog/[slug]"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/blog/index.astro",
    "pattern": "/blog",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/blog\\/?$",
    "segments": [
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "pathname": "/blog",
    "patternCaseSensitive": "/blog"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/robots.txt.ts",
    "pattern": "/robots.txt",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/robots\\.txt\\/?$",
    "segments": [
      [
        {
          "content": "robots.txt",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "endpoint",
    "pathname": "/robots.txt",
    "patternCaseSensitive": "/robots.txt"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/[locale]/blog/[slug].astro",
    "pattern": "/[locale]/blog/[slug]",
    "params": [
      "locale",
      "slug"
    ],
    "origin": "project",
    "patternRegex": "^\\/([^/]+?)\\/blog\\/([^/]+?)\\/?$",
    "segments": [
      [
        {
          "content": "locale",
          "dynamic": true,
          "spread": false
        }
      ],
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ],
      [
        {
          "content": "slug",
          "dynamic": true,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/[locale]/blog/[slug]"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/[locale]/blog/index.astro",
    "pattern": "/[locale]/blog",
    "params": [
      "locale"
    ],
    "origin": "project",
    "patternRegex": "^\\/([^/]+?)\\/blog\\/?$",
    "segments": [
      [
        {
          "content": "locale",
          "dynamic": true,
          "spread": false
        }
      ],
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/[locale]/blog"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/[locale]/index.astro",
    "pattern": "/[locale]",
    "params": [
      "locale"
    ],
    "origin": "project",
    "patternRegex": "^\\/([^/]+?)\\/?$",
    "segments": [
      [
        {
          "content": "locale",
          "dynamic": true,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/[locale]"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/index.astro",
    "pattern": "/",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/$",
    "segments": [],
    "type": "page",
    "pathname": "/",
    "patternCaseSensitive": "/"
  }
];
globalThis["__sentryRouteInfo"] = [
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/404.astro",
    "pattern": "/404",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/404\\/?$",
    "segments": [
      [
        {
          "content": "404",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "pathname": "/404",
    "patternCaseSensitive": "/404"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/blog/[slug].astro",
    "pattern": "/blog/[slug]",
    "params": [
      "slug"
    ],
    "origin": "project",
    "patternRegex": "^\\/blog\\/([^/]+?)\\/?$",
    "segments": [
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ],
      [
        {
          "content": "slug",
          "dynamic": true,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/blog/[slug]"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/blog/index.astro",
    "pattern": "/blog",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/blog\\/?$",
    "segments": [
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "pathname": "/blog",
    "patternCaseSensitive": "/blog"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/robots.txt.ts",
    "pattern": "/robots.txt",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/robots\\.txt\\/?$",
    "segments": [
      [
        {
          "content": "robots.txt",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "endpoint",
    "pathname": "/robots.txt",
    "patternCaseSensitive": "/robots.txt"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/[locale]/blog/[slug].astro",
    "pattern": "/[locale]/blog/[slug]",
    "params": [
      "locale",
      "slug"
    ],
    "origin": "project",
    "patternRegex": "^\\/([^/]+?)\\/blog\\/([^/]+?)\\/?$",
    "segments": [
      [
        {
          "content": "locale",
          "dynamic": true,
          "spread": false
        }
      ],
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ],
      [
        {
          "content": "slug",
          "dynamic": true,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/[locale]/blog/[slug]"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/[locale]/blog/index.astro",
    "pattern": "/[locale]/blog",
    "params": [
      "locale"
    ],
    "origin": "project",
    "patternRegex": "^\\/([^/]+?)\\/blog\\/?$",
    "segments": [
      [
        {
          "content": "locale",
          "dynamic": true,
          "spread": false
        }
      ],
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/[locale]/blog"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/[locale]/index.astro",
    "pattern": "/[locale]",
    "params": [
      "locale"
    ],
    "origin": "project",
    "patternRegex": "^\\/([^/]+?)\\/?$",
    "segments": [
      [
        {
          "content": "locale",
          "dynamic": true,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/[locale]"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/index.astro",
    "pattern": "/",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/$",
    "segments": [],
    "type": "page",
    "pathname": "/",
    "patternCaseSensitive": "/"
  }
];
globalThis["__sentryRouteInfo"] = [
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/404.astro",
    "pattern": "/404",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/404\\/?$",
    "segments": [
      [
        {
          "content": "404",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "pathname": "/404",
    "patternCaseSensitive": "/404"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/blog/[slug].astro",
    "pattern": "/blog/[slug]",
    "params": [
      "slug"
    ],
    "origin": "project",
    "patternRegex": "^\\/blog\\/([^/]+?)\\/?$",
    "segments": [
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ],
      [
        {
          "content": "slug",
          "dynamic": true,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/blog/[slug]"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/blog/index.astro",
    "pattern": "/blog",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/blog\\/?$",
    "segments": [
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "pathname": "/blog",
    "patternCaseSensitive": "/blog"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/robots.txt.ts",
    "pattern": "/robots.txt",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/robots\\.txt\\/?$",
    "segments": [
      [
        {
          "content": "robots.txt",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "endpoint",
    "pathname": "/robots.txt",
    "patternCaseSensitive": "/robots.txt"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/[locale]/blog/[slug].astro",
    "pattern": "/[locale]/blog/[slug]",
    "params": [
      "locale",
      "slug"
    ],
    "origin": "project",
    "patternRegex": "^\\/([^/]+?)\\/blog\\/([^/]+?)\\/?$",
    "segments": [
      [
        {
          "content": "locale",
          "dynamic": true,
          "spread": false
        }
      ],
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ],
      [
        {
          "content": "slug",
          "dynamic": true,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/[locale]/blog/[slug]"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/[locale]/blog/index.astro",
    "pattern": "/[locale]/blog",
    "params": [
      "locale"
    ],
    "origin": "project",
    "patternRegex": "^\\/([^/]+?)\\/blog\\/?$",
    "segments": [
      [
        {
          "content": "locale",
          "dynamic": true,
          "spread": false
        }
      ],
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/[locale]/blog"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/[locale]/index.astro",
    "pattern": "/[locale]",
    "params": [
      "locale"
    ],
    "origin": "project",
    "patternRegex": "^\\/([^/]+?)\\/?$",
    "segments": [
      [
        {
          "content": "locale",
          "dynamic": true,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/[locale]"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/index.astro",
    "pattern": "/",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/$",
    "segments": [],
    "type": "page",
    "pathname": "/",
    "patternCaseSensitive": "/"
  }
];
globalThis["__sentryRouteInfo"] = [
  {
    "isPrerendered": false,
    "entrypoint": "_server-islands.astro",
    "pattern": "/_server-islands/[name]",
    "params": [
      "name"
    ],
    "origin": "internal",
    "patternRegex": "^\\/_server-islands\\/([^/]+?)\\/?$",
    "segments": [
      [
        {
          "content": "_server-islands",
          "dynamic": false,
          "spread": false
        }
      ],
      [
        {
          "content": "name",
          "dynamic": true,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/_server-islands/[name]"
  },
  {
    "isPrerendered": false,
    "entrypoint": "node_modules/astro/dist/assets/endpoint/node.js",
    "pattern": "/_image",
    "params": [],
    "origin": "internal",
    "patternRegex": "^\\/_image\\/?$",
    "segments": [
      [
        {
          "content": "_image",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "endpoint",
    "pathname": "/_image",
    "patternCaseSensitive": "/_image"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/404.astro",
    "pattern": "/404",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/404\\/?$",
    "segments": [
      [
        {
          "content": "404",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "pathname": "/404",
    "patternCaseSensitive": "/404"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/blog/[slug].astro",
    "pattern": "/blog/[slug]",
    "params": [
      "slug"
    ],
    "origin": "project",
    "patternRegex": "^\\/blog\\/([^/]+?)\\/?$",
    "segments": [
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ],
      [
        {
          "content": "slug",
          "dynamic": true,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/blog/[slug]"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/blog/index.astro",
    "pattern": "/blog",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/blog\\/?$",
    "segments": [
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "pathname": "/blog",
    "patternCaseSensitive": "/blog"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/robots.txt.ts",
    "pattern": "/robots.txt",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/robots\\.txt\\/?$",
    "segments": [
      [
        {
          "content": "robots.txt",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "endpoint",
    "pathname": "/robots.txt",
    "patternCaseSensitive": "/robots.txt"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/[locale]/blog/[slug].astro",
    "pattern": "/[locale]/blog/[slug]",
    "params": [
      "locale",
      "slug"
    ],
    "origin": "project",
    "patternRegex": "^\\/([^/]+?)\\/blog\\/([^/]+?)\\/?$",
    "segments": [
      [
        {
          "content": "locale",
          "dynamic": true,
          "spread": false
        }
      ],
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ],
      [
        {
          "content": "slug",
          "dynamic": true,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/[locale]/blog/[slug]"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/[locale]/blog/index.astro",
    "pattern": "/[locale]/blog",
    "params": [
      "locale"
    ],
    "origin": "project",
    "patternRegex": "^\\/([^/]+?)\\/blog\\/?$",
    "segments": [
      [
        {
          "content": "locale",
          "dynamic": true,
          "spread": false
        }
      ],
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/[locale]/blog"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/[locale]/index.astro",
    "pattern": "/[locale]",
    "params": [
      "locale"
    ],
    "origin": "project",
    "patternRegex": "^\\/([^/]+?)\\/?$",
    "segments": [
      [
        {
          "content": "locale",
          "dynamic": true,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/[locale]"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/index.astro",
    "pattern": "/",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/$",
    "segments": [],
    "type": "page",
    "pathname": "/",
    "patternCaseSensitive": "/"
  }
];
globalThis["__sentryRouteInfo"] = [
  {
    "isPrerendered": false,
    "entrypoint": "_server-islands.astro",
    "pattern": "/_server-islands/[name]",
    "params": [
      "name"
    ],
    "origin": "internal",
    "patternRegex": "^\\/_server-islands\\/([^/]+?)\\/?$",
    "segments": [
      [
        {
          "content": "_server-islands",
          "dynamic": false,
          "spread": false
        }
      ],
      [
        {
          "content": "name",
          "dynamic": true,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/_server-islands/[name]"
  },
  {
    "isPrerendered": false,
    "entrypoint": "node_modules/astro/dist/assets/endpoint/node.js",
    "pattern": "/_image",
    "params": [],
    "origin": "internal",
    "patternRegex": "^\\/_image\\/?$",
    "segments": [
      [
        {
          "content": "_image",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "endpoint",
    "pathname": "/_image",
    "patternCaseSensitive": "/_image"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/404.astro",
    "pattern": "/404",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/404\\/?$",
    "segments": [
      [
        {
          "content": "404",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "pathname": "/404",
    "patternCaseSensitive": "/404"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/blog/[slug].astro",
    "pattern": "/blog/[slug]",
    "params": [
      "slug"
    ],
    "origin": "project",
    "patternRegex": "^\\/blog\\/([^/]+?)\\/?$",
    "segments": [
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ],
      [
        {
          "content": "slug",
          "dynamic": true,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/blog/[slug]"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/blog/index.astro",
    "pattern": "/blog",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/blog\\/?$",
    "segments": [
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "pathname": "/blog",
    "patternCaseSensitive": "/blog"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/robots.txt.ts",
    "pattern": "/robots.txt",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/robots\\.txt\\/?$",
    "segments": [
      [
        {
          "content": "robots.txt",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "endpoint",
    "pathname": "/robots.txt",
    "patternCaseSensitive": "/robots.txt"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/[locale]/blog/[slug].astro",
    "pattern": "/[locale]/blog/[slug]",
    "params": [
      "locale",
      "slug"
    ],
    "origin": "project",
    "patternRegex": "^\\/([^/]+?)\\/blog\\/([^/]+?)\\/?$",
    "segments": [
      [
        {
          "content": "locale",
          "dynamic": true,
          "spread": false
        }
      ],
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ],
      [
        {
          "content": "slug",
          "dynamic": true,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/[locale]/blog/[slug]"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/[locale]/blog/index.astro",
    "pattern": "/[locale]/blog",
    "params": [
      "locale"
    ],
    "origin": "project",
    "patternRegex": "^\\/([^/]+?)\\/blog\\/?$",
    "segments": [
      [
        {
          "content": "locale",
          "dynamic": true,
          "spread": false
        }
      ],
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/[locale]/blog"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/[locale]/index.astro",
    "pattern": "/[locale]",
    "params": [
      "locale"
    ],
    "origin": "project",
    "patternRegex": "^\\/([^/]+?)\\/?$",
    "segments": [
      [
        {
          "content": "locale",
          "dynamic": true,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/[locale]"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/index.astro",
    "pattern": "/",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/$",
    "segments": [],
    "type": "page",
    "pathname": "/",
    "patternCaseSensitive": "/"
  }
];
globalThis["__sentryRouteInfo"] = [
  {
    "isPrerendered": false,
    "entrypoint": "_server-islands.astro",
    "pattern": "/_server-islands/[name]",
    "params": [
      "name"
    ],
    "origin": "internal",
    "patternRegex": "^\\/_server-islands\\/([^/]+?)\\/?$",
    "segments": [
      [
        {
          "content": "_server-islands",
          "dynamic": false,
          "spread": false
        }
      ],
      [
        {
          "content": "name",
          "dynamic": true,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/_server-islands/[name]"
  },
  {
    "isPrerendered": false,
    "entrypoint": "node_modules/astro/dist/assets/endpoint/node.js",
    "pattern": "/_image",
    "params": [],
    "origin": "internal",
    "patternRegex": "^\\/_image\\/?$",
    "segments": [
      [
        {
          "content": "_image",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "endpoint",
    "pathname": "/_image",
    "patternCaseSensitive": "/_image"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/404.astro",
    "pattern": "/404",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/404\\/?$",
    "segments": [
      [
        {
          "content": "404",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "pathname": "/404",
    "patternCaseSensitive": "/404"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/blog/[slug].astro",
    "pattern": "/blog/[slug]",
    "params": [
      "slug"
    ],
    "origin": "project",
    "patternRegex": "^\\/blog\\/([^/]+?)\\/?$",
    "segments": [
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ],
      [
        {
          "content": "slug",
          "dynamic": true,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/blog/[slug]"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/blog/index.astro",
    "pattern": "/blog",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/blog\\/?$",
    "segments": [
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "pathname": "/blog",
    "patternCaseSensitive": "/blog"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/robots.txt.ts",
    "pattern": "/robots.txt",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/robots\\.txt\\/?$",
    "segments": [
      [
        {
          "content": "robots.txt",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "endpoint",
    "pathname": "/robots.txt",
    "patternCaseSensitive": "/robots.txt"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/[locale]/blog/[slug].astro",
    "pattern": "/[locale]/blog/[slug]",
    "params": [
      "locale",
      "slug"
    ],
    "origin": "project",
    "patternRegex": "^\\/([^/]+?)\\/blog\\/([^/]+?)\\/?$",
    "segments": [
      [
        {
          "content": "locale",
          "dynamic": true,
          "spread": false
        }
      ],
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ],
      [
        {
          "content": "slug",
          "dynamic": true,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/[locale]/blog/[slug]"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/[locale]/blog/index.astro",
    "pattern": "/[locale]/blog",
    "params": [
      "locale"
    ],
    "origin": "project",
    "patternRegex": "^\\/([^/]+?)\\/blog\\/?$",
    "segments": [
      [
        {
          "content": "locale",
          "dynamic": true,
          "spread": false
        }
      ],
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/[locale]/blog"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/[locale]/index.astro",
    "pattern": "/[locale]",
    "params": [
      "locale"
    ],
    "origin": "project",
    "patternRegex": "^\\/([^/]+?)\\/?$",
    "segments": [
      [
        {
          "content": "locale",
          "dynamic": true,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/[locale]"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/index.astro",
    "pattern": "/",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/$",
    "segments": [],
    "type": "page",
    "pathname": "/",
    "patternCaseSensitive": "/"
  }
];
globalThis["__sentryRouteInfo"] = [
  {
    "isPrerendered": false,
    "entrypoint": "_server-islands.astro",
    "pattern": "/_server-islands/[name]",
    "params": [
      "name"
    ],
    "origin": "internal",
    "patternRegex": "^\\/_server-islands\\/([^/]+?)\\/?$",
    "segments": [
      [
        {
          "content": "_server-islands",
          "dynamic": false,
          "spread": false
        }
      ],
      [
        {
          "content": "name",
          "dynamic": true,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/_server-islands/[name]"
  },
  {
    "isPrerendered": false,
    "entrypoint": "node_modules/astro/dist/assets/endpoint/node.js",
    "pattern": "/_image",
    "params": [],
    "origin": "internal",
    "patternRegex": "^\\/_image\\/?$",
    "segments": [
      [
        {
          "content": "_image",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "endpoint",
    "pathname": "/_image",
    "patternCaseSensitive": "/_image"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/404.astro",
    "pattern": "/404",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/404\\/?$",
    "segments": [
      [
        {
          "content": "404",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "pathname": "/404",
    "patternCaseSensitive": "/404"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/blog/[slug].astro",
    "pattern": "/blog/[slug]",
    "params": [
      "slug"
    ],
    "origin": "project",
    "patternRegex": "^\\/blog\\/([^/]+?)\\/?$",
    "segments": [
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ],
      [
        {
          "content": "slug",
          "dynamic": true,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/blog/[slug]"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/blog/index.astro",
    "pattern": "/blog",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/blog\\/?$",
    "segments": [
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "pathname": "/blog",
    "patternCaseSensitive": "/blog"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/robots.txt.ts",
    "pattern": "/robots.txt",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/robots\\.txt\\/?$",
    "segments": [
      [
        {
          "content": "robots.txt",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "endpoint",
    "pathname": "/robots.txt",
    "patternCaseSensitive": "/robots.txt"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/[locale]/blog/[slug].astro",
    "pattern": "/[locale]/blog/[slug]",
    "params": [
      "locale",
      "slug"
    ],
    "origin": "project",
    "patternRegex": "^\\/([^/]+?)\\/blog\\/([^/]+?)\\/?$",
    "segments": [
      [
        {
          "content": "locale",
          "dynamic": true,
          "spread": false
        }
      ],
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ],
      [
        {
          "content": "slug",
          "dynamic": true,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/[locale]/blog/[slug]"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/[locale]/blog/index.astro",
    "pattern": "/[locale]/blog",
    "params": [
      "locale"
    ],
    "origin": "project",
    "patternRegex": "^\\/([^/]+?)\\/blog\\/?$",
    "segments": [
      [
        {
          "content": "locale",
          "dynamic": true,
          "spread": false
        }
      ],
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/[locale]/blog"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/[locale]/index.astro",
    "pattern": "/[locale]",
    "params": [
      "locale"
    ],
    "origin": "project",
    "patternRegex": "^\\/([^/]+?)\\/?$",
    "segments": [
      [
        {
          "content": "locale",
          "dynamic": true,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/[locale]"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/index.astro",
    "pattern": "/",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/$",
    "segments": [],
    "type": "page",
    "pathname": "/",
    "patternCaseSensitive": "/"
  }
];
globalThis["__sentryRouteInfo"] = [
  {
    "isPrerendered": false,
    "entrypoint": "_server-islands.astro",
    "pattern": "/_server-islands/[name]",
    "params": [
      "name"
    ],
    "origin": "internal",
    "patternRegex": "^\\/_server-islands\\/([^/]+?)\\/?$",
    "segments": [
      [
        {
          "content": "_server-islands",
          "dynamic": false,
          "spread": false
        }
      ],
      [
        {
          "content": "name",
          "dynamic": true,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/_server-islands/[name]"
  },
  {
    "isPrerendered": false,
    "entrypoint": "node_modules/astro/dist/assets/endpoint/node.js",
    "pattern": "/_image",
    "params": [],
    "origin": "internal",
    "patternRegex": "^\\/_image\\/?$",
    "segments": [
      [
        {
          "content": "_image",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "endpoint",
    "pathname": "/_image",
    "patternCaseSensitive": "/_image"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/404.astro",
    "pattern": "/404",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/404\\/?$",
    "segments": [
      [
        {
          "content": "404",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "pathname": "/404",
    "patternCaseSensitive": "/404"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/blog/[slug].astro",
    "pattern": "/blog/[slug]",
    "params": [
      "slug"
    ],
    "origin": "project",
    "patternRegex": "^\\/blog\\/([^/]+?)\\/?$",
    "segments": [
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ],
      [
        {
          "content": "slug",
          "dynamic": true,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/blog/[slug]"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/blog/index.astro",
    "pattern": "/blog",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/blog\\/?$",
    "segments": [
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "pathname": "/blog",
    "patternCaseSensitive": "/blog"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/robots.txt.ts",
    "pattern": "/robots.txt",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/robots\\.txt\\/?$",
    "segments": [
      [
        {
          "content": "robots.txt",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "endpoint",
    "pathname": "/robots.txt",
    "patternCaseSensitive": "/robots.txt"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/[locale]/blog/[slug].astro",
    "pattern": "/[locale]/blog/[slug]",
    "params": [
      "locale",
      "slug"
    ],
    "origin": "project",
    "patternRegex": "^\\/([^/]+?)\\/blog\\/([^/]+?)\\/?$",
    "segments": [
      [
        {
          "content": "locale",
          "dynamic": true,
          "spread": false
        }
      ],
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ],
      [
        {
          "content": "slug",
          "dynamic": true,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/[locale]/blog/[slug]"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/[locale]/blog/index.astro",
    "pattern": "/[locale]/blog",
    "params": [
      "locale"
    ],
    "origin": "project",
    "patternRegex": "^\\/([^/]+?)\\/blog\\/?$",
    "segments": [
      [
        {
          "content": "locale",
          "dynamic": true,
          "spread": false
        }
      ],
      [
        {
          "content": "blog",
          "dynamic": false,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/[locale]/blog"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/[locale]/index.astro",
    "pattern": "/[locale]",
    "params": [
      "locale"
    ],
    "origin": "project",
    "patternRegex": "^\\/([^/]+?)\\/?$",
    "segments": [
      [
        {
          "content": "locale",
          "dynamic": true,
          "spread": false
        }
      ]
    ],
    "type": "page",
    "patternCaseSensitive": "/[locale]"
  },
  {
    "isPrerendered": true,
    "entrypoint": "src/pages/index.astro",
    "pattern": "/",
    "params": [],
    "origin": "project",
    "patternRegex": "^\\/$",
    "segments": [],
    "type": "page",
    "pathname": "/",
    "patternCaseSensitive": "/"
  }
];