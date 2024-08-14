import r2wc from "@r2wc/react-to-web-component";
import App from "./App";
import styles from "./index.css?raw"; // This is the limitation. We could import the external css file and inject it between the style tags. See: https://css-tricks.com/styling-a-web-component/#aa-link-to-external-styles-instead

const template = document.createElement("template");
template.innerHTML = `<style id="vite-plugin-css-injected-by-js">${styles}</style>`;

class StyledHelloWC extends r2wc(App, {
  props: { name: "string" },
  shadow: "open",
}) {
  connectedCallback() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    super.connectedCallback();
    this.shadowRoot?.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("hello-wc", StyledHelloWC);
