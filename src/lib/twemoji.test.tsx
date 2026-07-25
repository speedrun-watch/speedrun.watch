// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Twemoji } from "./twemoji";

describe("Twemoji", () => {
  it("leaves plain text untouched (no images)", () => {
    const { container } = render(<Twemoji text="World Record" />);
    expect(container.textContent).toBe("World Record");
    expect(container.querySelectorAll("img")).toHaveLength(0);
  });

  it("replaces a regional-indicator flag with a twemoji <img>", () => {
    const { container } = render(<Twemoji text="🇯🇵 Japan" />);
    const imgs = container.querySelectorAll("img");
    expect(imgs).toHaveLength(1);
    // 🇯🇵 = U+1F1EF U+1F1F5 → codepoint filename 1f1ef-1f1f5.svg
    expect(imgs[0].getAttribute("src")).toContain("1f1ef-1f1f5.svg");
    expect(imgs[0].getAttribute("alt")).toBe("🇯🇵");
    // Surrounding text is preserved around the image.
    expect(container.textContent).toContain("Japan");
  });

  it("handles multiple flags in one string", () => {
    const { container } = render(<Twemoji text="🇺🇸 vs 🇬🇧" />);
    expect(container.querySelectorAll("img")).toHaveLength(2);
    expect(container.textContent).toContain("vs");
  });
});
