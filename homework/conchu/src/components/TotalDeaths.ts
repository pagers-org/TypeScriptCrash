import { SummaryType } from 'Covid';
import Component from '../core/Component';
import { getTotal } from '../utils/common';

export default class TotalDeaths extends Component {
  setup() {
    const { data }: { data: SummaryType } = this.$props;
    const total = getTotal(data, 'TotalDeaths');
    this.setState<{ total: string }>({ total });
  }

  template() {
    const { total } = this.$state;
    return total;
  }
}
