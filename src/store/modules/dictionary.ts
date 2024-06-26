import { defineStore } from 'pinia';
import { GetDictionaryDetailByDictionaryName } from '/@/api/sys/dictionaryDetail';
import { DefaultOptionType } from 'ant-design-vue/lib/select';
import { ref } from 'vue';
import { DICT_INFO_KEY } from '/@/enums/cacheEnum';

interface DictionaryData {
  data: DefaultOptionType[];
}

const requestCache = new Map<
  string,
  { promise: Promise<DictionaryData | null>; timestamp: number }
>();

const CACHE_TIME = 500; // 500ms

export const useDictionaryStore = defineStore({
  id: 'app-dictionary',
  state: () => {
    return {
      data: JSON.stringify(Array.from(new Map<string, DictionaryData>())),
    };
  },
  actions: {
    // Get dictionary info
    async getDictionary(name: string, isCache = true) {
      let mapData: Map<string, DictionaryData> = new Map(JSON.parse(this.data));

      if (isCache && mapData.has(name)) {
        return mapData.get(name);
      } else {
        const cacheEntry = requestCache.get(name);

        // Check if we should use the cache and if the request is recent (within 500ms)
        if (cacheEntry && Date.now() - cacheEntry.timestamp < CACHE_TIME) {
          return cacheEntry.promise;
        }

        // If the request is not cached or isCache is false, perform the request
        const request = this.fetchDictionaryData(name);

        // Cache the new request promise with a timestamp
        requestCache.set(name, { promise: request, timestamp: Date.now() });

        // After 500ms, clear the request cache entry
        setTimeout(() => {
          requestCache.delete(name);
        }, 500);

        return request;
      }
    },
    async fetchDictionaryData(name: string) {
      let mapData: Map<string, DictionaryData> = new Map(JSON.parse(this.data));
      const result = await GetDictionaryDetailByDictionaryName({ name });
      if (result.code === 0) {
        const dataConv = ref<DefaultOptionType[]>([]);

        for (let i = 0; i < result.data.total; i++) {
          dataConv.value.push({
            label: result.data.data[i].title,
            value: result.data.data[i].value,
          });
        }

        const dictData: DictionaryData = { data: dataConv.value };
        mapData.set(name, dictData);
        this.data = JSON.stringify(Array.from(mapData.entries()));
        return dictData;
      } else {
        return null;
      }
    },

    // remove the dictionary in storage
    removeDictionary(name: string) {
      let mapData = new Map(JSON.parse(this.data));
      if (mapData.has(name)) {
        mapData.delete(name);
      }
      this.data = JSON.stringify(Array.from(mapData.entries()));
    },

    // remove all the dictionary in storage
    clear() {
      let mapData = new Map();
      this.data = JSON.stringify(Array.from(mapData.entries()));
    },
  },
  persist: {
    storage: sessionStorage,
    key: DICT_INFO_KEY,
  },
});
