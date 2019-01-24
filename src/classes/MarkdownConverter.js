import TurndownService from "turndown";
import Showdown from "showdown";

class MarkdownConverter {
  constructor() {
    this.turndownService = new TurndownService();

    const classMap = {
      p: "govuk-body",
      b: "govuk-!-font-weight-bold",
      a: "govuk-link",
      strong: "govuk-!-font-weight-bold",
      h1: "govuk-heading-xl",
      h2: "govuk-heading-l",
      h3: "govuk-heading-m",
      ul: "govuk-list govuk-list--bullet",
      ol: "govuk-list govuk-list--number"
    };
    const bindings = Object.keys(classMap).map(key => ({
      type: "output",
      regex: new RegExp(`<${key}>`, "g"),
      replace: `<${key} class="${classMap[key]}">`
    }));
    this.showdownConverter = new Showdown.Converter({
      extensions: [...bindings],
      noHeaderId: true
    });
  }

  toMarkdown(html) {
    return this.turndownService.turndown(html);
  }

  toHtml(markdown) {
    return this.showdownConverter.makeHtml(markdown);
  }
}

export default new MarkdownConverter();
