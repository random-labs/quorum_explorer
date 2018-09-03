import { GluonElement, html } from '../../node_modules/@gluon/gluon/gluon.js';
import { getStellarCoreData } from '../lib/stellar-core-data.js'

class OrganizationLink extends GluonElement {
  fetchData() {
    return getStellarCoreData().then((data) => this.data = data)
  }

  get organization() {
      const id = this.getAttribute('id')
      return this.data.organizations[id]
  }

  get linkTemplate() {
    return this.fetchData().then( () => {
      return html`
        <a href$="/organizations/${this.organization.id}">
        ${this.organization.name}
          (<span class="trustIndex>">${this.organization.displayTrustIndex}</span>)
        </a>
      `
    })
  }

  get template() {
    return html`<style>
      a {
        text-decoration: none;
        font-weight: 300;
        text-transform: uppercase;
      }

      a, a:link, a:visited {
          color: blue;
      }

      a:hover {
          color: red;
      }
    </style>
    ${ this.linkTemplate }
    `
  }
}

customElements.define(OrganizationLink.is, OrganizationLink);
