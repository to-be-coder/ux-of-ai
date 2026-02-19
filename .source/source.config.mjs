// source.config.ts
import { defineDocs, defineConfig, remarkInclude } from "fumadocs-mdx/config";
var docs = defineDocs({
  dir: "content/docs"
});
var source_config_default = defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkInclude]
  }
});
export {
  source_config_default as default,
  docs
};
