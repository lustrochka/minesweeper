import Component from '../basic-components/component';
import { ol, li } from '../basic-components/tags';

class ScoreTable extends Component {
  constructor() {
    super('div', 'modal');
    this.render();
  }

  render() {
    let scoreList;
    const scoreStr = localStorage.getItem('score');
    if (scoreStr) {
      scoreList = JSON.parse(scoreStr);
    } else {
      scoreList = new Array(10);
      scoreList.fill({ seconds: 0, clicks: 0 });
    }

    const list = ol('score');
    for (let i = 0; i < scoreList.length; i++) {
      const scoreItem = li('score__item', `${scoreList[i]['seconds']}s; ${scoreList[i]['clicks']} clicks`);
      list.appendChildren(scoreItem);
    }
    this.appendChildren(list);
  }
}

export default ScoreTable;
