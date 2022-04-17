import { SummaryType } from 'Covid';
import Component from '../core/Component';
import { getTotal, setInnerText } from '../utils/common';

export default class TotalConfirmed extends Component {
  setup() {
    const { data }: { data: SummaryType } = this.$props;
    const result = getTotal(data, 'TotalConfirmed');
    const total = setInnerText('TotalConfirmed', result);
    this.setState<{ total: string }>({ total });
  }

  template() {
    const { total } = this.$state;
    return total;
  }
}
