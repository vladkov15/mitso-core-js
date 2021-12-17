/* ************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */

/**
 * Returns the rectangle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    const r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
 function Rectangle( width, height ) {
  this.width = width;
  this.height = height;
}

Rectangle.prototype.getArea = function () {
  return this.width * this.height;
}


/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON( obj ) {
  return JSON.stringify(obj);
}

/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON( proto, json ) {
  var object = JSON.parse(json);
  object.__proto__ = proto;
  return object;
}

/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class
 * and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurrences
 *
 * All types of selectors can be combined using the combination ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy
 * and implement the functionality to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string representation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple,
 * clear and readable as possible.
 *
 * @example
 *
 *  const builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()
 *    => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()
 *    => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()
 *    => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

const cssSelectorBuilder = {
  element( value ) {
    return new CssSelector().element(value);
  },

  id( value ) {
    return new CssSelector().id(value);
  },

  class( value ) {
    return new CssSelector().class(value);
  },

  attr( value ) {
    return new CssSelector().attr(value);
  },

  pseudoClass( value ) {
    return new CssSelector().pseudoClass(value)
  },

  pseudoElement( value ) {
    return new CssSelector().pseudoElement(value);
    },

  combine( selector1, combinator, selector2 ) {
    return new CssSelector().combine(selector1, combinator, selector2);
  },
};

function CssSelector() {
        
  const tooManyPartsInsideSelectorMsg = 'Element, id and pseudo-element should not occur more then one time inside the selector';
  const wrongOrderMsg = 'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element';
  
  var _element, _id, _class, _attr, _pseudoClass, _pseudoElement;

  function checkIsNotSetted(values) {
      if (values.some(v => v !== undefined))
          throw new Error(wrongOrderMsg);
  }

  function addElementToArray(arr, elem) {
      if (arr) {
          arr.push(elem);
          return arr;
      }
      return [elem];
  }

  this.element = function (value) {
      if (this._element)
          throw new Error(tooManyPartsInsideSelectorMsg);
      checkIsNotSetted([this._id, this._class, this._attr, this._pseudoClass, this._pseudoElement]);
      this._element = value;
      return this;
  };

  this.id = function (value) {
      if (this._id)
          throw new Error(tooManyPartsInsideSelectorMsg);
      checkIsNotSetted([this._class, this._attr, this._pseudoClass, this._pseudoElement]);
      this._id = value;
      return this;
  };

  this.class = function (value) {
      checkIsNotSetted([this._attr, this._pseudoClass, this._pseudoElement]);
      this._class = addElementToArray(this._class, value);
      return this;
  };

  this.attr = function (value) {
      checkIsNotSetted([this._pseudoClass, this._pseudoElement]);
      this._attr = addElementToArray(this._attr, value);
      return this;
  };

  this.pseudoClass = function (value) {
      checkIsNotSetted([this._pseudoElement]);
      this._pseudoClass = addElementToArray(this._pseudoClass, value);
      return this;
  };

  this.pseudoElement = function (value) {
      if (this._pseudoElement)
          throw new Error(tooManyPartsInsideSelectorMsg);
      this._pseudoElement = value;
      return this;
  };

  this.stringify = function () {
      let result = '';
      if (this._element)
          result += this._element;
      if (this._id)
          result += `#${this._id}`;
      if (this._class)
          result += this._class.map(e => `.${e}`).join('');
      if (this._attr)
          result += this._attr.map(e => `[${e}]`).join('');
      if (this._pseudoClass)
          result += this._pseudoClass.map(e => `:${e}`).join('');
      if (this._pseudoElement)
          result += `::${this._pseudoElement}`;
      return result;
  };

  this.combine = function (selector1, combinator, selector2) {
      return new CssSelectorCombined(`${selector1.stringify()} ${combinator} ${selector2.stringify()}`);
  }

}

function CssSelectorCombined(selector) {
  this.stringify = function() {
      return selector;
  }
}



module.exports = {
  Rectangle,
  getJSON,
  fromJSON,
  cssSelectorBuilder,
};
