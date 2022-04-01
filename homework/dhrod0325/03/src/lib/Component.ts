import { Component } from 'covid';
import { $ } from '@/lib/utils';

export class BaseComponent implements Component {
  readonly $container: HTMLElement;

  constructor(selector: string) {
    this.$container = $(selector) as HTMLElement;
  }
}

export abstract class AsyncComponent implements Component {
  private loading = false;

  public loadAsyncPrepare() {
    console.log('prepare async');
  }

  public abstract loadAsyncData(selectedId: string | undefined): void;

  //override
  public async loadData(selectedId: string | undefined) {
    this.loading = true;

    this.loadAsyncPrepare && this.loadAsyncPrepare();

    await this.loadAsyncData(selectedId);

    this.loading = false;
  }

  public isLoading() {
    return this.loading;
  }
}
