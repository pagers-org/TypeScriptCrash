import { SummaryType } from 'Covid';
import Component from '../core/Component';
import { getTotal, setInnerText } from '../utils/common';

export default class TotalDeaths extends Component {
  setup() {
    const { data }: { data: SummaryType } = this.$props;
    const result = getTotal(data, 'TotalDeaths');
    const total = setInnerText('TotalDeaths', result);
    this.setState<{ total: string }>({ total });
  }

  template() {
    const { total } = this.$state;
    return total;
  }
}
