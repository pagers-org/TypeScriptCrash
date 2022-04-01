import { Component } from 'covid';
import { $ } from '@/lib/utils';

export class BaseComponent implements Component {
  private readonly $container: HTMLElement;

  constructor(selector: string) {
    this.$container = $(selector) as HTMLElement;
  }

  public getContainer(): HTMLElement {
    return this.$container;
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

    try {
      this.loadAsyncPrepare && this.loadAsyncPrepare();

      await this.loadAsyncData(selectedId);
    } catch (e) {
      console.log('error', e);
      alert('데이터 요청중 오류가 발생했습니다. 잠시 후 다시 시도 해보세요.');
    } finally {
      this.loading = false;
    }
  }

  public isLoading() {
    return this.loading;
  }
}
