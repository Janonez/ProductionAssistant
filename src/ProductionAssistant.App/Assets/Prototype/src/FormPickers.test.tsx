import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ChoicePicker, ReportDatePicker, TimePicker } from "./FormPickers";

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
let container: HTMLDivElement;
afterEach(() => container?.remove());

function render(value: React.ReactNode) {
  container = document.createElement("div");
  document.body.append(container);
  act(() => createRoot(container).render(value));
}

describe("daily report pickers", () => {
  it("uses styled React popovers instead of native form pickers", () => {
    render(<><ChoicePicker value="" placeholder="选择数据库" options={[{ value: "db", label: "日报数据库" }]} onChange={() => undefined} /><TimePicker value="17:30" onChange={() => undefined} /><ReportDatePicker value="2026-08-13" onChange={() => undefined} /></>);
    expect(container.querySelector("select,input[type=time],input[type=date]")).toBeNull();
  });

  it("returns the selected database value", () => {
    const changed = vi.fn();
    render(<ChoicePicker value="" placeholder="选择数据库" options={[{ value: "db", label: "日报数据库" }]} onChange={changed} />);
    act(() => (container.querySelector(".picker-trigger") as HTMLButtonElement).click());
    act(() => (container.querySelector('[role="option"]') as HTMLButtonElement).click());
    expect(changed).toHaveBeenCalledWith("db");
  });
});
