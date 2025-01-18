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
    this.appendChildren(
      div('time-block', textDiv('clicks', 'Clicks: 0'), textDiv('timer', 'Time: 0')),
      div(
        'sound',
        textDiv('sound__title', 'Sound'),
        div(
          '',
          new Label('', 'On', { for: 'sound-on' }),
          new Input('', { type: 'radio', name: 'sound', id: 'sound-on', value: 'on' }, callback)
        ),
        div(
          '',
          new Label('', 'Off', { for: 'sound-off' }),
          new Input('', { type: 'radio', name: 'sound', id: 'sound-off', value: 'off' }, callback)
        )
      )
    );
  }
}

export default LeftBlock;
