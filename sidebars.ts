import type {SidebarsConfig} from "@docusaurus/plugin-content-docs"

const sidebars: SidebarsConfig = {
  devGuideSidebar: [
    "intro",
    {
      type: "category",
      label: "API Reference",
      items: [
        {
          label: "Introduction",
          type: "doc",
          id: "reference/journyx-rest-api",
        },
        {
          type: "category",
          label: "Users",
          items: [
            "reference/list-users",
            "reference/create-user",
            "reference/get-user-item",
            "reference/update-user-item",
            "reference/delete-user-item",
          ],
        },
      ],
    },
  ],
}

export default sidebars
