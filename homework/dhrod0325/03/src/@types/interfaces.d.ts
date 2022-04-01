import { SummaryWrapper } from '@/@model/SummaryWrapper';

declare module 'covid' {
  export interface SetupAble {
    setup?(data: SummaryWrapper): void;
  }

  export interface LoadDataAble {
    isLoading?(): boolean;
    loadData?(selectedId: string | undefined): void;
  }

  export interface Component extends SetupAble, LoadDataAble {
    getContainer?(): HTMLElement;
    onLoad?(): void;
  }

  export type ClientInit = {
    url: string;
    config?: RequestInit;
    data?: object;
  };

  export interface Client {
    get({ url }: ClientInit): unknown;
    post({ url, data }: ClientInit): unknown;
    delete({ url, data }: ClientInit): unknown;
    put({ url, data }: ClientInit): unknown;
  }

  export interface Container {
    container(): Element;

    clear(): void;
  }

  export interface Spinner {
    spin(callback: () => void): void;
  }

  export interface SpinnerArgs {
    spinner?: Spinner;
    callback: () => void;
  }
}
