# Gooddollar Savings Widget

A reusable web component built with [Lit](https://lit.dev/) and [Viem](https://viem.sh/), written in TypeScript.

### Usage
After building, you can use the web component in any HTML/JS project:
```html
<script type="module" src="/path/to/gooddollar-saving-widget.js"></script>
<gooddollar-saving-widget id="savingsWidget"></gooddollar-saving-widget>
<script type="module">
    customElements.whenDefined("gooddollar-saving-widget").then(() => {
        const widget = document.getElementById("savingsWidget");
        widget.web3Provider = window.ethereum;
    });
</script>
```


## License
MIT 