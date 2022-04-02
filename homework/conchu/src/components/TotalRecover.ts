import { SummaryType } from 'Covid';
import Component from '../core/Component';
import { getTotal, setInnerText } from '../utils/common';

export default class TotalRecovered extends Component {
  setup() {
    const { data }: { data: SummaryType } = this.$props;
    const result = getTotal(data, 'TotalRecovered');
    const total = setInnerText('TotalRecovered', result);
    this.setState<{ total: string }>({ total });
  }

  template() {
    const { total } = this.$state;
    return total;
  }
}
