import {themes as prismThemes} from "prism-react-renderer"
import type {Config} from "@docusaurus/types"
import type * as Preset from "@docusaurus/preset-classic"

// The type declaration below using OpenApiPlugin.Options isn't working
// It gives this with `yarn tsc`:
//   node_modules/docusaurus-plugin-openapi-docs/src/types.ts:23:8 -
//      error TS2307: Cannot find module '@docusaurus/plugin-content-docs-types'
//       or its corresponding type declarations.
// 23 } from "@docusaurus/plugin-content-docs-types";
//
// import type * as OpenApiPlugin from "docusaurus-plugin-openapi-docs"

// import type * as Redocusaurus from "redocusaurus"

const config: Config = {
  title: "Journyx Dev Docs",
  tagline: "Development made fun",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://docs.journyx.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  // organizationName: "facebook", // Usually your GitHub org/user name.
  // projectName: "docusaurus", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          path: "content/docs",
          sidebarPath: "./sidebars.ts",

          docItemComponent: "@theme/ApiItem", // Derived from docusaurus-theme-openapi
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],
  plugins: [
    [
      "docusaurus-plugin-openapi-docs",
      {
        id: "api", // plugin id
        docsPluginId: "classic", // configured for preset-classic
        config: {
          journyx: {
            specPath: "content/openapi/journyx_openapi.yaml",
            outputDir: "content/docs/reference",
            showSchemas: true,
          },
        },
      },
    ],
    [
      "@docusaurus/plugin-client-redirects",
      {
        // WARNING: this only works on the production build, not the dev server!
        redirects: [
          {
            to: "/docs/reference/journyx-rest-api",
            from: ["/docs/api", "/api", "/reference"],
          },
        ],
      },
    ],
  ],
  themes: [
    "docusaurus-theme-openapi-docs",
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      {
        // ... Your options.
        // `hashed` is recommended as long-term-cache of index file is possible.
        hashed: true,
        // For Docs using Chinese, The `language` is recommended to set to:
        // language: ["en", "zh"],
        language: ["en"],

        docsDir: "content/docs",
        blogDir: "content/blog",

        // These are actually "routes" (not files) to ignore
        // and regexes seem to work the best.
        // https://github.com/easyops-cn/docusaurus-search-local/issues/403#issuecomment-2072141485
        // We're ignoring the "access" page because that's only intended to be
        // shown when going to the authentication-required staging site.
        ignoreFiles: [/docs\/access/],

        // docsRouteBasePath: "/docs",
        // Other available options listed here:
        // https://github.com/easyops-cn/docusaurus-search-local?tab=readme-ov-file#theme-options
      },
    ],
  ],
  themeConfig: {
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "Journyx API",
      logo: {
        alt: "My Site Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "devGuideSidebar",
          position: "left",
          label: "Developer Guide",
        },
        {
          to: "/docs/reference/journyx-rest-api",
          // docId: "api-reference",
          position: "left",
          label: "API Reference",
        },
        // {to: "/blog", label: "Blog", position: "left"},
        {
          href: "https://bitbucket.org/jxint/jx-api-docs/",
          label: "BitBucket (Private)",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Developer Guide",
              to: "/docs/intro",
            },
            {
              label: "API Reference",
              to: "/docs/reference/journyx-rest-api",
              // to: "/docs/reference",
            },
          ],
        },
        // TODO: all this needs to be updated
        {
          title: "Community",
          items: [
            {
              label: "Stack Overflow",
              href: "https://stackoverflow.com/questions/tagged/docusaurus",
            },
            {
              label: "Discord",
              href: "https://discordapp.com/invite/docusaurus",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/docusaurus",
            },
          ],
        },
        {
          title: "More",
          items: [],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Journyx, Inc. Built with Docusaurus and Redocly.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,

  stylesheets: [
    // For the math stuff, it's loading from a CDN, but if we need to load it locally, we can do this:
    // https://docusaurus.io/docs/markdown-features/math-equations#self-hosting-katex-assets
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
      crossorigin: "anonymous",
    },
  ],
}

export default config
