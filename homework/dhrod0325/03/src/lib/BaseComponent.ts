import { Component } from 'covid';
import { $ } from '@/lib/utils';

export class BaseComponent implements Component {
  readonly $container: HTMLElement;

  constructor(selector: string) {
    this.$container = $(selector);
  }
}
