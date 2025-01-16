import Component from '../basic-components/component';
import { div } from '../basic-components/tags';

class LeftBlock extends Component {
  constructor() {
    super('div', 'left');
    this.render();
  }

  render() {
    const clicksBlock = div('clicks');
    clicksBlock.changeText('Clicks: 0');

    const timerBlock = div('timer');
    timerBlock.changeText('Time: 0');

    this.appendChildren(div('time-block', clicksBlock, timerBlock));
  }
}

export default LeftBlock;
