<!-- markdownlint-disable MD014 -->

# Demonstration of Docusaurus-OpenAPI-Docs Issue 1012

https://github.com/PaloAltoNetworks/docusaurus-openapi-docs/issues/1012

https://github.com/PaloAltoNetworks/docusaurus-openapi-docs/issues/993

I was asked to check if the latest changes in the Docusaurus-OpenAPI-Docs plugin
fixed the issue #993 that I opened.

The `develop` branch reflects the working state (for my use case) as of the
Docusaurus-OpenAPI-Docs plugin 4.1.0.

The `check-issue-993` branch reflects an upgrade to the plugin canary version
0.0.0-956.

## Issue 993

The first issue I opened #993 was about the inability to put arbitrary HTML and
MDX markup inside API description fields. The examples I gave were the `<blink>`
tag and using a custom MDX component named `<PutHeader>`.

Unfortunately, that specific use case still does not work in the new canary.
That is, the relevant tags were still emitted as escaped in the generated
`.api.mdx` files:

```mdx
<blink&gt;Blinking!</blink&gt;

import PutHeaders from "@site/content/partials/_put-headers.mdx"

&lt;PutHeaders />
```

Then the main Docusaurus build chokes on the blink tag:

```shell
Error: MDX compilation failed for file "/Users/planders/src/journyx/docusaurus-openapi-upgrade-bug-demo/content/docs/reference/update-user-item.api.mdx"
Cause: Unexpected character `&` (U+0026) in name, expected a name character such as letters, digits, `$`, or `_`; whitespace before attributes; or the end of the tag
```

In issue #993, I
[mentioned](https://github.com/PaloAltoNetworks/docusaurus-openapi-docs/issues/993#issuecomment-2448155915)
that I had a workaround of having a special post-processing step run a script
that looks for an un-escaped `RAW` blocks.

That solution still works for this use case and is demonstrated in this branch.

## Issue 1012

I also opened a separate issue #1012 about the fact that the
Docusaurus-OpenAPI-Docs version 4.2.0 broke the ability to use Docusaurus
admonitions in API descriptions. So, that's just using the built-in Docusaurus
markup and not trying to use custom MDX components or unsupported markup.

Fortunately, this use case (the one described in #1012) does work using the
fixes in canary version 0.0.0-956.
