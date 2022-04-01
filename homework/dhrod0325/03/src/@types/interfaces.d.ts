declare module 'covid' {
  export interface SetupAble {
    setup?(data: SummaryInfo): void;
  }

  export interface LoadDataAble {
    isLoading?: boolean;
    loadData?(selectedId: string | undefined): void;
  }

  export interface Component extends SetupAble, LoadDataAble {
    readonly $container?: HTMLElement;
    onLoad?(): void;
  }

  export type ClientInit = {
    url: string;
    config?: RequestInit;
    data?: object;
  };

  export interface Client {
    get({ url }: ClientInit): any;
    post({ url, data }: ClientInit): any;
    delete({ url, data }: ClientInit): any;
    put({ url, data }: ClientInit): any;
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
