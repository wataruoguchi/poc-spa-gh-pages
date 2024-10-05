import r2wc from "@r2wc/react-to-web-component";
import App from "./App";
import "./wc-index.css";

window.__styles = window.__styles ?? {};

class StyledWebComponent extends r2wc(App, {
  props: { name: "string" },
  shadow: "open",
}) {
  connectedCallback() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    super.connectedCallback();

    // window.__styles["react-fragment"] is added at the end of the file by vite-plugin-css-injected-by-js
    queueMicrotask(() => {
      const css = window.__styles["react-fragment"];
      if (css) {
        const template = document.createElement("template");
        template.innerHTML = `<style>${css}</style>`;
        this.shadowRoot?.appendChild(template.content.cloneNode(true));
      }
    });
  }
}

customElements.define("hello-wc", StyledWebComponent);
