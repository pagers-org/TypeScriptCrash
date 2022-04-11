import Component from '../core/Component';

export default class UpdateTimeStamp extends Component {
  setup() {
    const { data } = this.$props;
    const result = new Date(data.Date).toLocaleString();
    this.setState<{ total: string }>({ total: result });
  }

  template() {
    const { total } = this.$state;
    return total;
  }
}
