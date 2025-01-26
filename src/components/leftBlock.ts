import Component from '../basic-components/component';
import Label from '../basic-components/label';
import Input from '../basic-components/input';
import { div, textDiv } from '../basic-components/tags';

class LeftBlock extends Component {
  constructor(soundCallback: (e: Event) => void, themeCallback: (e: Event) => void) {
    super('div', 'left');
    this.render(soundCallback, themeCallback);
  }

  render(soundCallback: (e: Event) => void, themeCallback: (e: Event) => void) {
    const soundOnInput = new Input('', { type: 'radio', name: 'sound', id: 'sound-on', value: 'on' }, soundCallback);
    const soundOffInput = new Input('', { type: 'radio', name: 'sound', id: 'sound-off', value: 'off' }, soundCallback);
    const soundState = localStorage.getItem('sound') || 'off';
    if (soundState === 'on') {
      soundOnInput.getNode().checked = true;
    } else {
      soundOffInput.getNode().checked = true;
    }

    const darkInput = new Input('', { type: 'radio', name: 'theme', id: 'dark', value: 'dark' }, themeCallback);
    const lightInput = new Input('', { type: 'radio', name: 'theme', id: 'light', value: 'light' }, themeCallback);
    const theme = localStorage.getItem('theme') || 'light';
    if (theme === 'light') {
      lightInput.getNode().checked = true;
    } else {
      darkInput.getNode().checked = true;
    }

    this.appendChildren(
      div('time-block', textDiv('clicks', 'Clicks: 0'), textDiv('timer', 'Time: 0')),
      div(
        'sound',
        textDiv('sound__title', 'Sound'),
        div('', new Label('', 'On', { for: 'sound-on' }), soundOnInput),
        div('', new Label('', 'Off', { for: 'sound-off' }), soundOffInput)
      ),
      div(
        'themes',
        div('', new Label('', 'Light', { for: 'light' }), lightInput),
        div('', new Label('', 'Dark', { for: 'dark' }), darkInput)
      )
    );
  }
}

export default LeftBlock;
