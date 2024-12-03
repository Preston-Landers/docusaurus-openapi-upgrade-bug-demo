/**
 * The purpose of this script is to iterate over all the MDX files produced by
 * `docusaurus-plugin-openapi` and look for and process "RAW" blocks, which are
 * denoted by "# START_RAW" and "# END_RAW" markers. These are blocks of content
 * embedded inside OpenAPI descriptions that we want to interpret as "raw"
 * (non-escaped) MDX content; usually in order to import and render a custom
 * React component inside the OpenAPI description field. A typical example of this
 * would be including a standard block in a PUT request description that discusses
 * the requirement of using `If-Match` headers.
 *
 * In order to process a RAW block, the script will:
 * - Remove the "# START_RAW" and "# END_RAW" markers
 * - Dedent the content because React import statements must be at the
 *   beginning of the line.
 * - Un-escape HTML characters, to allow for React components
 *   to be processed (rendered) correctly.
 *
 * This script is run after the Redocly plugin has generated the actual OpenAPI file
 * (the `openapi-build` step in package.json) and before the main Docusaurus build
 * (the `docusaurus build` step in package.json).
 *
 */

import fs from "fs"
import path from "path"

const mdxDirectory = path.resolve("content/docs/reference")

function processMdxFiles(dir) {
  const files = fs.readdirSync(dir)

  files.forEach((file) => {
    const filePath = path.join(dir, file)
    try {
      if (fs.statSync(filePath).isDirectory()) {
        // Recursively process subdirectories
        processMdxFiles(filePath)
      } else if (filePath.endsWith(".mdx")) {
        let content = fs.readFileSync(filePath, "utf8")
        const originalContent = content

        // Process the content
        content = processContent(content)

        if (content !== originalContent) {
          console.log(`Found RAW blocks in ${filePath}`)
          fs.writeFileSync(filePath, content, "utf8")
          // console.log(`Processed ${filePath}`)
        }
      }
    } catch (error) {
      console.error(`Error processing file ${filePath}:`, error)
    }
  })
}

function processContent(content) {
  const startMarker = "# START_RAW"
  const endMarker = "# END_RAW"

  // Regular expression to find the blocks
  const regex = new RegExp(`${startMarker}([\\s\\S]*?)${endMarker}`, "g")

  // Replace each block
  content = content.replace(regex, (match, p1) => {
    // Remove the markers and extract block content
    let blockContent = p1

    // console.log(`Found raw block: ${blockContent}`)

    // Dedent the block content
    blockContent = dedent(blockContent)

    // Un-escape HTML characters
    blockContent = blockContent.replace(/&lt;/g, "<").replace(/&gt;/g, ">")

    // Ensure block starts at the beginning of the line
    return "\n" + blockContent.trim() + "\n"
  })

  return content
}

function dedent(str) {
  const lines = str.split("\n")

  // Remove any leading and trailing blank lines
  while (lines.length > 0 && lines[0].trim() === "") {
    lines.shift()
  }
  while (lines.length > 0 && lines[lines.length - 1].trim() === "") {
    lines.pop()
  }

  // Find the minimum indentation of non-empty lines
  const indentLengths = lines
    .filter((line) => line.trim().length > 0)
    .map((line) => {
      const match = line.match(/^(\s+)/)
      return match ? match[1].length : 0
    })

  const minIndent = indentLengths.length > 0 ? Math.min(...indentLengths) : 0

  // Remove the minimum indentation from each line
  const dedentedLines = lines.map((line) => line.substring(minIndent))

  return dedentedLines.join("\n")
}

// Run the script
try {
  processMdxFiles(mdxDirectory)
  console.log("MDX post-processing completed successfully.")
} catch (error) {
  console.error("An error occurred during MDX post-processing:", error)
  process.exit(1)
}
