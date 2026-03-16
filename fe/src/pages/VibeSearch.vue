<template>
  <q-page>
    <div class="row justify-center items-center" style="padding-top: 80px">
      <PseudoBrowser :results="results" :isLoading="isLoading" @doSearch="onDoSearchEvent"
        @doNavigate="onDoNavigateEvent" :totalResults="totalCount" :searchTime="searchTime" :href="navigationBar">

        <template v-slot:logo>
          <img src="https://en.wikipedia.org/static/images/mobile/copyright/wikipedia-wordmark-en-25.svg" alt=""
            width="177">

        </template>

      </PseudoBrowser>
    </div>

    <q-page-sticky position="bottom-right" :offset="fabPos">
      <q-fab v-model="fabOpen" label="Options" external-label vertical-actions-align="left" color="purple"
        icon="keyboard_arrow_up" direction="up" v-touch-pan.prevent.mouse="moveFab">
        <q-fab-action external-label color="primary" @click.stop.capture="toggleIndex" icon="manage_search"
          :label="`Index: ${retrievalIndex}`" />
        <q-fab-action external-label color="secondary" @click.stop.capture="useHybrid = !useHybrid" icon="ssid_chart"
          :label="`Hybrid: ${useHybrid ? 'on' : 'off'}`" />
        <q-fab-action external-label color="cyan" @click.stop.capture="useReranker = !useReranker" icon="auto_mode"
          :label="`Rerank: ${useReranker ? 'on' : 'off'}`" />
      </q-fab>
    </q-page-sticky>

  </q-page>
</template>
<script setup lang="ts">
import PseudoBrowser, { SearchResult } from 'components/PseudoBrowser.vue';
import { computed, ref } from 'vue';
import { useQuasar } from 'quasar';
// import {useI18n} from 'vue-i18n';
// import {useMetaTags} from 'src/composables/useMetaTags';

// const {t, te} = useI18n({useScope: 'global'});

const fabOpen = ref(false);
const retrievalIndex = ref('disk_bbq');
const useHybrid = ref(false);
const useReranker = ref(false);
const navigationBar = ref('');
const searchQuery = ref('');

const toggleIndex = () => {
  retrievalIndex.value = retrievalIndex.value === 'disk_bbq' ? 'hnsw_int8' : 'disk_bbq';
};

const fabPos = ref([128, 128]);
const draggingFab = ref(false);
const moveFab = (ev: any) => {
  draggingFab.value = ev.isFirst !== true && ev.isFinal !== true;

  fabPos.value = [
    fabPos.value[0] - ev.delta.x,
    fabPos.value[1] - ev.delta.y
  ];
};

const t = (key: string) => key; // Placeholder translation function
const $q = useQuasar();
const adaptiveSize = computed(() => {
  switch ($q.screen.name) {
    case 'xl':
      return 'lg';
    case 'lg':
      return 'lg';
    case 'md':
      return 'md';
    case 'sm':
      return 'md';
    case 'xs':
      return 'md';
    default:
      return 'sm';
  }
});

// Mock search results data for fallback
const mockResults: SearchResult[] = [
  {
    'title': 'Jina AI - Neural Search for Everyone',
    'link': 'https://jina.ai/',
    'snippet': 'Jina AI is an open-source neural search company. We build the next generation search for unstructured data. Our mission is to enable developers to build AI-powered search applications.',
    'position': 1,
    'domain': 'Jina AI',
    tags: ['AI', 'Search', 'Open Source']
  },
  {
    'title': 'jina-ai · GitHub',
    'link': 'https://github.com/jina-ai',
    'snippet': 'jina-ai has 38 repositories available. Follow their code on GitHub.',
    'position': 2,
    'domain': 'GitHub'
  },
  {
    'title': 'Jina - Wikipedia',
    'link': 'https://en.wikipedia.org/wiki/Jina',
    'snippet': "I'm sorry, but there is no Wikipedia article about \"Jina AI\". Perhaps you meant the name \"Jina\" which is a name of Indian origin.",
    'position': 3,
    'domain': 'Wikipedia'
  },
  {
    'title': 'Jina AI - Build Neural Search Applications with Python',
    'link': 'https://www.youtube.com/watch?v=n0h3rS0K5fA',
    'snippet': 'Jina AI - Build Neural Search Applications with Python. In this video, we will build a neural search application with Jina AI.',
    'position': 4,
    'domain': 'YouTube'
  },
  {
    'title': 'Jina AI raises $30M to help developers build neural search applications',
    'link': 'https://venturebeat.com/ai/jina-ai-raises-30m-to-help-developers-build-neural-search-applications/',
    'snippet': 'Jina AI, a San Francisco-based startup, has raised $30 million in a series B funding round. The round was led by GGV Capital and saw participation from Mango Capital, SAP.iO Fund, and others. Jina AI offers an open-source neural search platform that lets developers build search applications for unstructured data.',
    'position': 5,
    'domain': 'VentureBeat'
  },
  {
    'title': 'Jina AI - Crunchbase Company Profile & Funding',
    'link': 'https://www.crunchbase.com/organization/jina-ai',
    'snippet': "Jina AI is a San Francisco-based company that offers a neural search platform for developers. The company's platform allows developers to build search applications for unstructured data.",
    'position': 6,
    'domain': 'Crunchbase'
  },
  {
    'title': 'Jina AI – Medium',
    'link': 'https://medium.com/jinaai',
    'snippet': 'Read writing from Jina AI on Medium. Every day, Jina AI and thousands of other voices read, write, and share important stories on Medium.',
    'position': 7,
    'domain': 'Medium'
  },
  {
    'title': 'Jina AI | LinkedIn',
    'link': 'https://www.linkedin.com/company/jinaai/',
    'snippet': 'Learn about working at Jina AI. Join LinkedIn today for free. See who you know at Jina AI, leverage your professional network, and get hired.',
    'position': 8,
    'domain': 'LinkedIn'
  },
  {
    'title': 'Jina - Product Hunt',
    'link': 'https://www.producthunt.com/posts/jina',
    'snippet': 'Jina is a neural search framework that empowers developers to build search applications for unstructured data.',
    'position': 9,
    'domain': 'Product Hunt'
  },
  {
    'title': 'Jina AI (@JinaAI_) / Twitter',
    'link': 'https://twitter.com/JinaAI_?lang=en',
    'snippet': 'Jina AI (@JinaAI_). We build the next generation search for unstructured data. Open source neural search. San Francisco, CA. jina.ai Joined July 2019.',
    'position': 10,
    'domain': 'Twitter'
  }
];

const results = ref<SearchResult[]>(mockResults);
const totalCount = ref(0);
const searchTime = ref(0);

const isLoading = ref(false);

const SERVER = process.env.DEBUGGING ? 'http://localhost:3001' : ''; // Replace with your actual server URL

const udcCategoriesMap = new Map();
const urlItemMap = new Map();

async function doSearch(query: string) {
  if (isLoading.value) {
    return; // Prevent multiple simultaneous searches
  }
  isLoading.value = true;
  // Simulate an API call with a delay

  try {
    const r = await fetch(`${SERVER}/textRetrieval`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query, index: retrievalIndex.value, hybrid: useHybrid.value, rerank: useReranker.value })
    });

    const d = await r.json();
    urlItemMap.clear();
    results.value = d.data.map((x: any) => {
      const tags = [];
      if (x.udcCategories?.length) {
        for (const c of x.udcCategories) {
          const key = `${c.identifier}: ${c.name}`;
          udcCategoriesMap.set(key, c);
          tags.push(key);
        }
      }

      const r = {
        title: x.name,
        link: x.url,
        snippet: (x.abstract || '').slice(0, 384) + '...', // Assuming the API returns an abstract field
        domain: `${x.lang}.wikipedia.org`,
        tags,
      };
      urlItemMap.set(x.url, x);

      return r;

    }); // Assuming the API returns results in this format
    totalCount.value = d.meta.total; // Assuming the API returns total count in this format
    searchTime.value = d.meta.took; // Assuming the API returns search time in this format
    fabOpen.value = true;
  } catch (err) {
    // send notification
    alert(`${err}`);
  }
  finally {
    isLoading.value = false;
  }
  // Here you would typically make an actual API call to fetch search results
  // For this example, we will just use the mock results
}

async function doRecommend(vector: string) {
  if (isLoading.value) {
    return; // Prevent multiple simultaneous searches
  }
  isLoading.value = true;
  // Simulate an API call with a delay


  try {
    const r = await fetch(`${SERVER}/recommend`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: vector })
    });

    const d = await r.json();
    urlItemMap.clear();

    results.value = d.data.map((x: any) => {
      const tags = [];
      if (x.udcCategories?.length) {
        for (const c of x.udcCategories) {
          udcCategoriesMap.set(c.identifier, c);
          tags.push(`${c.identifier}: ${c.name}`);
        }
      }
      const r = {
        title: x.name,
        link: x.url,
        snippet: (x.abstract || '').slice(0, 384) + '...', // Assuming the API returns an abstract field
        domain: `${x.lang}.wikipedia.org`,
        tags,
      };
      urlItemMap.set(x.url, x);

      return r;

    }); // Assuming the API returns results in this format
    totalCount.value = d.meta.total; // Assuming the API returns total count in this format
    searchTime.value = d.meta.took; // Assuming the API returns search time in this format

  } catch (err) {
    // send notification
    alert(`${err}`);
  }
  finally {
    isLoading.value = false;
  }
  // Here you would typically make an actual API call to fetch search results
  // For this example, we will just use the mock results
}

async function doCategory(vector: string) {
  if (isLoading.value) {
    return; // Prevent multiple simultaneous searches
  }
  isLoading.value = true;
  // Simulate an API call with a delay

  try {
    const r = await fetch(`${SERVER}/category`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: vector })
    });

    const d = await r.json();
    urlItemMap.clear();

    results.value = d.data?.map((x: any) => {
      const tags = [];
      if (x.udcCategories?.length) {
        for (const c of x.udcCategories) {
          udcCategoriesMap.set(c.identifier, c);
          tags.push(`${c.identifier}: ${c.name}`);
        }
      }
      const r = {
        title: x.name,
        link: x.url,
        snippet: (x.abstract || '').slice(0, 384) + '...', // Assuming the API returns an abstract field
        domain: `${x.lang}.wikipedia.org`,
        tags,
      };
      urlItemMap.set(x.url, x);

      return r;

    }); // Assuming the API returns results in this format
    totalCount.value = d.meta.total; // Assuming the API returns total count in this format
    searchTime.value = d.meta.took; // Assuming the API returns search time in this format

  } catch (err) {
    // send notification
    alert(`${err}`);
  }
  finally {
    isLoading.value = false;
  }
  // Here you would typically make an actual API call to fetch search results
  // For this example, we will just use the mock results
}


function onDoSearchEvent(query: string) {
  if (!query) {
    return;
  }
  doSearch(query);
  searchQuery.value = query;
  navigationBar.value = `[Index: ${retrievalIndex.value}][Hybrid: ${useHybrid.value ? 'Y' : 'N'}][Rerank: ${useReranker.value ? 'Y' : 'N'}] Query: ${query}`;
}

function onDoNavigateEvent(ref: SearchResult, tag?: string) {
  if (!ref) {
    return;
  }
  const item = urlItemMap.get(ref.link);
  if (!item) {
    return;
  }
  if (!tag) {
    doRecommend(item.meanMatching);
    navigationBar.value = `[Index: ${retrievalIndex.value}][Hybrid: ${useHybrid.value ? 'Y' : 'N'}][Rerank: ${useReranker.value ? 'Y' : 'N'}] Recommend: ${item.name}`;
    searchQuery.value = '';

    return;
  }

  const ctg = udcCategoriesMap.get(tag);
  if (!ctg) {
    return;
  }
  doCategory(ctg.vector);
  navigationBar.value = `[Index: ${retrievalIndex.value}][Hybrid: ${useHybrid.value ? 'Y' : 'N'}][Rerank: ${useReranker.value ? 'Y' : 'N'}] Category: ${tag}`;
  searchQuery.value = '';
}


// useMetaTags({
//   page: 'vibe_search',
//   url: 'vibe-search-demo',
// });
</script>