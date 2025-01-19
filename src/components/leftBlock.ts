import Component from '../basic-components/component';
import Label from '../basic-components/label';
import Input from '../basic-components/input';
import { div, textDiv } from '../basic-components/tags';

class LeftBlock extends Component {
  constructor(callback: (e: Event) => void) {
    super('div', 'left');
    this.render(callback);
  }

  render(callback: (e: Event) => void) {
    const soundOnInput = new Input('', { type: 'radio', name: 'sound', id: 'sound-on', value: 'on' }, callback);
    const soundOffInput = new Input('', { type: 'radio', name: 'sound', id: 'sound-off', value: 'off' }, callback);
    const soundState = localStorage.getItem('sound') || 'off';
    if (soundState === 'on') {
      soundOnInput.getNode().checked = true;
    } else {
      soundOffInput.getNode().checked = true;
    }

    this.appendChildren(
      div('time-block', textDiv('clicks', 'Clicks: 0'), textDiv('timer', 'Time: 0')),
      div(
        'sound',
        textDiv('sound__title', 'Sound'),
        div('', new Label('', 'On', { for: 'sound-on' }), soundOnInput),
        div('', new Label('', 'Off', { for: 'sound-off' }), soundOffInput)
      )
    );
  }
}

export default LeftBlock;
