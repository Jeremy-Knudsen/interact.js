import _ from 'lodash';

import { createScope } from '@interactjs/core/scope';
import * as utils from '@interactjs/utils';
import Signals from '@interactjs/utils/Signals';
import Eventable from '@interactjs/core/Eventable';
import { doc } from './domator';

let counter = 0;

export function unique () {
  return (counter++);
}

export function uniqueProps (obj) {
  for (const prop in obj) {
    if (!obj.hasOwnProperty(prop)) { continue; }

    if (_.isObject(obj)) {
      uniqueProps(obj[obj]);
    }
    else {
      obj[prop] = (counter++);
    }
  }
}

export function newCoordsSet (n = 0) {
  return {
    start: {
      page     : { x: n++, y: n++ },
      client   : { x: n++, y: n++ },
      timeStamp: n++,
    },
    cur: {
      page     : { x: n++, y: n++ },
      client   : { x: n++, y: n++ },
      timeStamp: n++,
    },
    prev: {
      page     : { x: n++, y: n++ },
      client   : { x: n++, y: n++ },
      timeStamp: n++,
    },
    delta: {
      page     : { x: n++, y: n++ },
      client   : { x: n++, y: n++ },
      timeStamp: n++,
    },
    velocity: {
      page     : { x: n++, y: n++ },
      client   : { x: n++, y: n++ },
      timeStamp: n++,
    },
  };
}

export function newPointer (n = 50) {
  return {
    pointerId: n++,
    pageX: n++,
    pageY: n++,
    clientX: n++,
    clientY: n++,
  };
}

export function mockScope (options = {}) {
  const document = options.document || doc;
  const window = document.defaultView;

  const scope = createScope().init(window);

  Object.assign(scope, {
    actions: {
      names: [],
      methodDict: {},
      eventTypes: [],
    },
    interactions: {
      signals: new Signals(),
      list: [],
    },
  }, options);

  return scope;
}

export function mockSignals () {
  return {
    on () {},
    off () {},
    fire () {},
  };
}

export function mockInteractable (props) {
  return Object.assign(
    {
      _signals: new Signals(),
      _actions: {
        names: [],
        methodDict: {},
      },
      options: {
        deltaSource: 'page',
      },
      target: {},
      events: new Eventable(),
      getRect () {
        return this.element
          ? utils.dom.getClientRect(this.element)
          : { left: 0, top: 0, right: 0, bottom: 0 };
      },
      fire (event) {
        this.events.fire(event);
      },
    },
    props);
}

export { _ };
