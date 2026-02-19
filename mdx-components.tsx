import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { ConfidenceIndicator } from './components/confidence-indicator';
import { StreamingDemo } from './components/streaming-demo';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ConfidenceIndicator,
    StreamingDemo,
    ...components,
  };
}
