import dayjs from "dayjs";

import { html, css, LitElement } from "lit";
import { classMap } from "lit/directives/class-map.js";
import { customElement, property } from "lit/decorators.js";

import { live } from "lit/directives/live.js";

import "./style.css";

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class VHSimple extends LitElement {
  static get styles() {
    return css`
      :host {
        --orange: var(--brand, #ff3c00);
      }

      ::slotted(*) {
        padding: 1rem;
      }
    `;
  }

  constructor() {
    super();
    this.text = "";
  }

  static get properties() {
    return {
      name: {
        type: String,
        // reflect: true
      },
      _submitEnabled: false,
    };
  }

  get _input() {
    return this.renderRoot?.querySelector("input") ?? null;
  }

  _inputChanged(e) {
    this._submitEnabled = !!e.target.value;
  }

  _updateName() {
    this.name = this._input.value;
    this._input.value = "";
    this._submitEnabled = false;
  }

  render() {
    return html`
      <div class="wrapper">
	  	  <slot></slot>
        <form>
          ${this.name
            ? html`<img height="50" width="50" src="https://github.com/${this.name}.png" />${this.name}</p>`
            : null}

          <input @input=${this._inputChanged} />
          <button
            @click=${this._updateName}
            .disabled=${!this._submitEnabled}
          >
            Submit
          </button>
        </form>
      </div>
    `;
  }
}

customElements.define("vh-simple", VHSimple);
