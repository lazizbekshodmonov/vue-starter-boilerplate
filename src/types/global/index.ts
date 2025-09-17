import type { Component, VNode } from "vue";
import type { TGuaranteeStatus } from "@/types/ui/guarantees.ts";

export interface IPagination {
  page: number;
  page_size: number;
  total: number;
  total_pages: number;
}

interface IMenuProps {
  danger: boolean;
}

interface ITableAction<T> {
  label: string;
  icon?: Component;
  className?: string;
  menuProps?: IMenuProps;
  callback: (record: T) => void;
}

export interface IBaseTableColumn<T = unknown> {
  title?: string;
  dataIndex: string;
  key: string;
  width?: number;
  customRender?: (params: {
    text: string | number | object;
    record: T;
    index: number;
  }) => VNode | string | number | null | undefined;
  actions?: ITableAction<T>[];
}

export interface ICustomRowConfig {
  onClick?: (event: MouseEvent) => void;
  onDblclick?: (event: MouseEvent) => void;
  onContextmenu?: (event: MouseEvent) => void;
  onMouseenter?: (event: MouseEvent) => void;
  onMouseleave?: (event: MouseEvent) => void;
  style?: Record<string, string>;
  class?: string;
  props?: Record<string, unknown>;
}

export interface ICustomHeaderRowConfig {
  onClick?: (event: MouseEvent) => void;
  onDblclick?: (event: MouseEvent) => void;
  style?: Record<string, string>;
  class?: string;
  props?: Record<string, unknown>;
}

export interface IFormItemRule {
  required: boolean;
  message: string;
  trigger: "blur" | "change";
}

export interface IBasePaginationListItem {
  id: number;
}

export interface ILocalizedStrings {
  uz: string;
  ru: string;
}

export interface IBaseResponse {
  id: number;
}

export type THttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export type TStatus = TGuaranteeStatus;
