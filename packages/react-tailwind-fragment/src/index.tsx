import r2wc from "@r2wc/react-to-web-component";
import App from "./App";

class StyledHelloWC extends r2wc(App, {
  props: { name: "string" },
  shadow: "open",
}) {
  connectedCallback() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    super.connectedCallback();
    // window.__styles is injected by vite-plugin-css-injected-by-js
    if (window.__styles["react-tailwind-fragment"]) {
      const template = document.createElement("template");
      template.innerHTML = `<style id="vite-plugin-css-injected-by-js">${window.__styles["react-tailwind-fragment"]}</style>`;
      this.shadowRoot?.appendChild(template.content.cloneNode(true));
    }
  }
}

customElements.define("hello-tailwind-wc", StyledHelloWC);
