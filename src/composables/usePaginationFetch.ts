import { computed, onMounted, onUnmounted, type Ref, ref } from "vue";
import { useRoute } from "vue-router";
import { handleError } from "@/utils/notification";
import type {
  IBasePaginationListItem,
  IPagination,
  THttpMethod,
} from "@/types/global";
import type { IBaseApiPaginationResponse } from "@/types/global/response.type.ts";
import httpClient from "@/shared/api/httpClient.ts";
import { useRefreshTrigger } from "@/composables/useRefreshTrigger.ts";

interface IProps {
  key?: string;
  url: string;
  method?: THttpMethod;
}

export default function usePaginationFetch<T extends IBasePaginationListItem>(
  props: IProps,
) {
  const { registerCallback, unregisterCallback } = useRefreshTrigger();
  const route = useRoute();

  // computed
  const pageSize = computed(() => Number(route.query.size ?? "20"));
  const currentPage = computed(() => Number(route.query.page ?? "1"));

  const loading = ref<boolean>(false);
  const data = ref<T[]>([]) as Ref<T[]>;
  const pagination = ref<IPagination>({
    page: 0,
    page_size: 0,
    total: 0,
    total_pages: 0,
  });
  const errorMessage = ref<string | null>(null);

  onMounted(async () => {
    await loadData();
    if (props.key) {
      registerCallback(props.key, loadData);
    }
  });
  onUnmounted(() => {
    if (props.key) {
      unregisterCallback(props.key);
    }
  });

  async function loadData() {
    try {
      loading.value = true;
      const response = await httpClient<IBaseApiPaginationResponse<T>>({
        url: props.url,
        params: {
          ...route.query,
          size: pageSize.value,
          page: currentPage.value - 1,
        },
      });
      data.value = response.data.content;
      pagination.value.total = response.data.totalElements;
      pagination.value.page = response.data.page + 1;
      pagination.value.page_size = response.data.size;
      pagination.value.total_pages = response.data.totalPages;
    } catch (error) {
      handleError(error);
      if (error instanceof Error) {
        errorMessage.value = error?.message ?? null;
      }
    } finally {
      loading.value = false;
    }
  }
  function updateData(id: number, item: T) {
    try {
      const index = data.value.findIndex((item: T) => item.id === id);
      if (index !== -1) {
        data.value[index] = item;
      }
    } catch (error) {
      handleError(error);
    }
  }
  function deleteData(id: number) {
    try {
      data.value = data.value.filter((item: T) => item.id !== id);
    } catch (error) {
      handleError(error);
    } finally {
      loading.value = false;
    }
  }

  return {
    loadData,
    deleteData,
    updateData,
    loading,
    data,
    pagination,
  };
}
