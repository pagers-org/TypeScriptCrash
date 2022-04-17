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

  public setHtml(html: string) {
    this.$container.innerText = html;
  }

  public clearHtml() {
    this.setHtml('');
  }
}

export abstract class AsyncComponent implements Component {
  private loading = false;

  public abstract prepareAsync?(): void;

  public abstract loadDataAsync(selectedId: string | undefined): void;

  //override
  public async loadData(selectedId: string | undefined) {
    if (!selectedId) return;

    this.loading = true;

    try {
      this.prepareAsync && this.prepareAsync();
      await this.loadDataAsync(selectedId);
    } catch (e) {
      console.log('Api 요청실패 1 초후 다시 로드');

      setTimeout(async () => {
        await this.loadData(selectedId);
      }, 1000);
    } finally {
      this.loading = false;
    }
  }

  public isLoading() {
    return this.loading;
  }
}
