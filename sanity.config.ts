import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schema";

export default defineConfig({
  name: "shibi-karun-studio",
  title: "Shibi Karun Studio",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Projects")
              .child(S.documentTypeList("project")),
            S.listItem()
              .title("Photography")
              .child(S.documentTypeList("photography")),
            S.listItem()
              .title("Stories")
              .child(S.documentTypeList("story")),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  basePath: "/studio",
});
