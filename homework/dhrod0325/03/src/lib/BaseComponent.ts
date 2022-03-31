import { Component } from 'covid';
import { $ } from '@/lib/utils';

export class BaseComponent implements Component {
  readonly $container: HTMLElement;

  constructor(container: string) {
    this.$container = $(container);
  }
}
