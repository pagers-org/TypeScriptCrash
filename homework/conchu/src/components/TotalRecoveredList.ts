import { PickCountriesDetailType } from 'Covid';
import Component from '../core/Component';
import { getUnixTimestamp } from '../utils/common';

export default class TotalRecoveredList extends Component {
  setup() {
    const { data }: { data: PickCountriesDetailType[] } = this.$props;
    const sorted = data.sort(
      (a, b) => getUnixTimestamp(b.Date) - getUnixTimestamp(a.Date),
    );

    this.setState<{ data: PickCountriesDetailType[] }>({ data: sorted });
  }

  template() {
    const { data } = this.$state;
    const html = data
      .map(
        (item: PickCountriesDetailType) =>
          `<li class="list-item-b flex align-center">
             <span class="recovered">${item.Cases}</span>
             <p>${new Date(item.Date).toLocaleDateString().slice(0, -1)}</p>
           </li>`,
      )
      .join('');
    return html;
  }
}
