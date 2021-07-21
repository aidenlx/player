import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';

import { ifNonEmpty } from '../../foundation/directives/index.js';
import { formatHtml5Duration, formatTime } from '../../utils/time.js';
import { timeElementStyles } from './styles.js';

export const TIME_ELEMENT_TAG_NAME = 'vds-time';

/**
 * Formats and displays a length of time given in `seconds`.
 *
 * @tagname vds-time
 * @csspart root - The component's root element (`<time>`).
 * @example
 * ```html
 * <vds-time seconds="50"></vds-time>
 * ```
 * @example
 * ```html
 * <vds-time
 *   label="Current time"
 *   seconds="3650"
 *   pad-hours
 *   always-show-hours
 * ></vds-time>
 * ```
 * @example
 * ```css
 * vds-time::part(root) {
 *   font-size: 16px;
 * }
 * ```
 */
export class TimeElement extends LitElement {
  /** @type {import('lit').CSSResultGroup} */
  static get styles() {
    return [timeElementStyles];
  }

  /** @type {string[]} */
  static get parts() {
    return ['root', 'time'];
  }

  // -------------------------------------------------------------------------------------------
  // Properties
  // -------------------------------------------------------------------------------------------

  /**
   * ♿ **ARIA:** The `aria-label` property of the time.
   *
   * @type {string | undefined}
   */
  @property()
  label;

  /**
   * The length of time in seconds.
   *
   * @type {number}
   */
  @property({ type: Number })
  seconds = 0;

  /**
   * Whether the time should always show the hours unit, even if the time is less than
   * 1 hour.
   *
   * @type {boolean}
   * @example `20:30` -> `0:20:35`
   */
  @property({ attribute: 'always-show-hours', type: Boolean })
  alwaysShowHours = false;

  /**
   * Whether the hours unit should be padded with zeroes to a length of 2.
   *
   * @type {boolean}
   * @example `1:20:03` -> `01:20:03`
   */
  @property({ attribute: 'pad-hours', type: Boolean })
  padHours = false;

  // -------------------------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------------------------

  /**
   * @protected
   * @readonly
   * @type {import('lit/directives/ref').Ref<HTMLTimeElement>}
   */
  _rootRef = createRef();

  /**
   * The component's root element.
   *
   * @type {HTMLTimeElement}
   */
  get rootElement() {
    return /** @type {HTMLTimeElement} */ (this._rootRef.value);
  }

  render() {
    return html`
      <time
        id="root"
        class=${this._getRootClassAttr()}
        part=${this._getRootPartAttr()}
        aria-label=${ifNonEmpty(this.label)}
        datetime=${this._getFormattedDuration()}
        ${ref(this._rootRef)}
      >
        ${this._renderRootChildren()}
      </time>
    `;
  }

  /**
   * @protected
   * @returns {import('lit').TemplateResult}
   */
  _renderRootChildren() {
    return html`${this._getFormattedTime()}`;
  }

  /**
   * @protected
   * @returns {string} The seconds formatted into human readable form.
   */
  _getFormattedTime() {
    return formatTime(this.seconds, this.padHours, this.alwaysShowHours);
  }

  /**
   * @protected
   * @returns {string} A valid HTML5 duration.
   * @see https://www.w3.org/TR/2014/REC-html5-20141028/infrastructure.html#valid-duration-string
   */
  _getFormattedDuration() {
    return formatHtml5Duration(this.seconds);
  }

  /**
   * Override this to modify root CSS Classes.
   *
   * @protected
   * @returns {string}
   */
  _getRootClassAttr() {
    return 'root';
  }

  /**
   * Override this to modify root CSS parts.
   *
   * @protected
   * @returns {string}
   */
  _getRootPartAttr() {
    return 'root time';
  }
}
