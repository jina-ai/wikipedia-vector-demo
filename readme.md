
# Wikipedia Vector Search Demo

A demo project showcasing Jina models and Elasticsearch's semantic/vector search capabilities on a full Wikipedia dataset.

This project puts `jina-embeddings-v5-text-small` and `jina-reranker-v3` to work, delivering a comprehensive search experience with semantic search, article recommendation, and zero-shot classification.

The scale of the dataset — 7.1M articles, ~60B tokens, 299GB indexed — also demonstrates the scalability and efficiency of Elasticsearch as a vector search and integrated Search AI solution.

## Features
- Multilingual semantic search via `semantic_text` (asymmetric retrieval — query in any major language)
- Article recommendation via dense vector search (text matching)
- Zero-shot article classification via dense vector search (0-shot classification)
- Result reranking with `jina-reranker-v3`

## Dataset
A dump of English Wikipedia: ~7.1 million articles, 144GB compressed, 299GB indexed, ~60B tokens.

## Ingestion
- Download data dump from the Wikipedia Enterprise API
- Convert HTML to Markdown with Jina Reader
- Recursively chunk on Markdown separator boundaries
- Index with `jina-embeddings-v5-text-small`
- 1 `semantic_text` + `disk_bbq` field + 6 dense vector fields (mean-normalized across all chunk vectors)

## Search
- `semantic_text` field for semantic search (asymmetric retrieval)
- Dense vector fields for recommendation and classification
- Optional reranking with `jina-reranker-v3`

## Agent Builder
The Agent Builder can automatically leverage the `semantic_text` field for retrieval and export MCP tools for external use.

## Using the UI
![alt text](<screenshot.png>)
When opened without parameters, the UI generates a random search query from a curated list of topic prompts. Clicking the **Refresh** button generates a new random query. You can also type your own query in the search bar.

**Article title** — opens the corresponding Wikipedia page.

**Article abstract** — runs a text-matching query using the mean-normalized dense vector of the article's chunks. This finds semantically similar articles and demonstrates the recommendation capability.

**Category tags** — runs a zero-shot classification query by matching the article's mean-normalized dense vector against the normalized dense vectors of the category labels.

**Floating action button** — toggles several options:
- **Classification system**: Dewey Decimal Classification (DDC) or Universal Decimal Classification (UDC)
- **Rerank**: enable `jina-reranker-v3` for result reranking
- **Hybrid**: combine the `semantic_text` relevance score with standard text search on article title and abstract
- **Index**: `semantic_text` field (disk_bbq) or the retrieval-optimized mean-normalized `dense_vector` field (hnsw_int8)

## Similar Projects

Semantic search over Wikipedia is a popular demo for model providers and vector databases alike:

- https://lancedb-demos.vercel.app/demo/wikipedia-search — `all-MiniLM-L6-v2` + LanceDB
- https://wikipedia-semantic-search.vercel.app/ — `BGE-M3` + Upstash
- https://developers.openai.com/cookbook/examples/embedding_wikipedia_articles_for_search — OpenAI `text-embedding-3-small` cookbook
- https://docs.cohere.com/page/wikipedia-search-with-weaviate — Cohere + Weaviate
