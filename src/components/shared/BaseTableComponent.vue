<script setup lang="ts" generic="T">
import type {
  IBaseTableColumn,
  ICustomHeaderRowConfig,
  ICustomRowConfig,
  IPagination,
} from "@/types/global";
import { useRoute, useRouter } from "vue-router";
import { nextTick, useSlots } from "vue";
import BaseButton from "@/components/shared/BaseButton.vue";
import IconHorizontalDot from "@/components/icons/IconHorizontalDot.vue";

interface Props {
  title?: string;
  loading?: boolean;
  columns: Array<IBaseTableColumn<T>>;
  dataSource: Array<T>;
  pagination?: IPagination;
  scroll?: { x?: number; y?: number };
  customRow?: (record: T, index: number) => ICustomRowConfig;
  customHeaderRow?: (
    columns: Array<IBaseTableColumn<T>>,
    index: number,
  ) => ICustomHeaderRowConfig;
}
interface IEmits {
  changePage: [];
  changeSize: [];
}
interface ISlot {
  column: IBaseTableColumn<T>;
  record: T;
}
interface IExpandedSlot {
  record: T;
}

withDefaults(defineProps<Props>(), {
  scroll: () => ({ x: undefined, y: undefined }),
});

const emits = defineEmits<IEmits>();
const route = useRoute();
const router = useRouter();
const slots = useSlots();

async function handleChangePage(page: number) {
  await router.push({
    query: { ...route.query, page },
  });
  await nextTick();
  emits("changePage");
}
async function handleChangeSize(current: number, size: number) {
  await router.push({
    query: { ...route.query, size, page: current },
  });
  await nextTick();
  emits("changeSize");
}
</script>

<template>
  <div class="base-table-component h-full">
    <a-table
      :columns="columns"
      :data-source="dataSource"
      :loading="loading"
      :pagination="false"
      :scroll="{
        y: scroll?.y ? scroll.y - 105 : null,
        x: scroll.x ? scroll.x - 500 : null,
      }"
      :custom-row="customRow"
      :custom-header-row="customHeaderRow"
      row-key="id"
      class="base-table-component"
    >
      <template #bodyCell="{ column, record }: ISlot">
        <template v-if="column.dataIndex === 'actions'">
          <div class="flex justify-end">
            <a-dropdown trigger="click">
              <base-button
                type="text"
                class="hover:bg-gray_color_100 text-gray_color_500"
              >
                <template #icon>
                  <icon-horizontal-dot />
                </template>
              </base-button>
              <template #overlay>
                <a-menu>
                  <a-menu-item
                    v-for="menu in column.actions"
                    :danger="menu?.menuProps?.danger"
                    @click="menu.callback(record)"
                  >
                    <div class="flex items-center gap-2">
                      <component :is="menu.icon" />
                      <span>{{ menu.label }}</span>
                    </div>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
        </template>
      </template>
      <template
        v-if="slots?.expandedRowRender"
        #expandedRowRender="{ record }: IExpandedSlot"
      >
        <slot name="expandedRowRender" :record="record" />
      </template>
      <template v-if="slots?.expandColumnTitle" #expandColumnTitle>
        <slot name="expandColumnTitle" />
      </template>
    </a-table>
    <div class="flex justify-between pt-4" v-if="pagination">
      <div></div>
      <a-pagination
        :current="pagination.page"
        :page-size="pagination.page_size"
        :total="pagination.total"
        :show-size-changer="false"
        @show-size-change="handleChangeSize"
        @change="handleChangePage"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.base-table-component {
  &:deep(.ant-card-body) {
    @apply px-0 py-4;
    .ant-table-cell {
      @apply max-w-max;
      &:before {
        @apply hidden;
      }
    }
  }
}
</style>
