import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { createPortal } from "react-dom";

import {
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";


const WEEKDAYS = [
  "一",
  "二",
  "三",
  "四",
  "五",
  "六",
  "日",
];

const MONTHS = Array.from(
  { length: 12 },
  (_, index) => `${index + 1}月`,
);


type PickerMode =
  | "day"
  | "month"
  | "year";


interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  disabled?: boolean;
}


interface PopoverPosition {
  top: number;
  left: number;
}


function parseDateValue(
  value: string,
): Date | null {
  if (!value) {
    return null;
  }

  const [
    year,
    month,
    day,
  ] = value
    .split("-")
    .map(Number);

  if (
    !year ||
    !month ||
    !day
  ) {
    return null;
  }

  return new Date(
    year,
    month - 1,
    day,
  );
}


function formatStorageDate(
  date: Date,
) {
  const year =
    date.getFullYear();

  const month =
    String(
      date.getMonth() + 1,
    ).padStart(
      2,
      "0",
    );

  const day =
    String(
      date.getDate(),
    ).padStart(
      2,
      "0",
    );

  return `${year}-${month}-${day}`;
}


function formatDisplayDate(
  date: Date,
) {
  const year =
    date.getFullYear();

  const month =
    String(
      date.getMonth() + 1,
    ).padStart(
      2,
      "0",
    );

  const day =
    String(
      date.getDate(),
    ).padStart(
      2,
      "0",
    );

  return `${year}/${month}/${day}`;
}


function getFirstWeekday(
  year: number,
  month: number,
) {
  const day =
    new Date(
      year,
      month,
      1,
    ).getDay();

  return day === 0
    ? 6
    : day - 1;
}


function getDaysInMonth(
  year: number,
  month: number,
) {
  return new Date(
    year,
    month + 1,
    0,
  ).getDate();
}


function isSameDay(
  left: Date,
  right: Date,
) {
  return (
    left.getFullYear() ===
      right.getFullYear() &&
    left.getMonth() ===
      right.getMonth() &&
    left.getDate() ===
      right.getDate()
  );
}


function getYearRangeStart(
  year: number,
) {
  return (
    Math.floor(
      year / 12,
    ) * 12
  );
}


export default function DatePicker({
  value,
  onChange,
  label,
  disabled = false,
}: DatePickerProps) {
  const selectedDate =
    useMemo(
      () =>
        parseDateValue(
          value,
        ),
      [value],
    );


  const [
    open,
    setOpen,
  ] =
    useState(false);


  const [
    mode,
    setMode,
  ] =
    useState<PickerMode>(
      "day",
    );


  const [
    viewDate,
    setViewDate,
  ] =
    useState<Date>(
      selectedDate ??
        new Date(),
    );


  const [
    popoverPosition,
    setPopoverPosition,
  ] =
    useState<PopoverPosition>({
      top: 0,
      left: 0,
    });

const [placement, setPlacement] =
  useState<"top" | "bottom">("bottom");

  const triggerRef =
    useRef<HTMLButtonElement>(
      null,
    );


  const wrapperRef =
    useRef<HTMLDivElement>(
      null,
    );


  const popoverRef =
    useRef<HTMLDivElement>(
      null,
    );


  useEffect(() => {
    if (
      selectedDate
    ) {
      setViewDate(
        selectedDate,
      );
    }
  }, [value]);


function updatePopoverPosition() {
  const trigger = triggerRef.current;
  const popover = popoverRef.current;

  if (!trigger || !popover) {
    return;
  }

  const triggerRect =
    trigger.getBoundingClientRect();

  const popoverRect =
    popover.getBoundingClientRect();

  const panelWidth =
    popoverRect.width;

  const panelHeight =
    popoverRect.height;

  const gap = 8;
  const viewportPadding = 12;

  const spaceBelow =
    window.innerHeight -
    triggerRect.bottom -
    viewportPadding;

  const spaceAbove =
    triggerRect.top -
    viewportPadding;

  /*
   * 默认向下。
   *
   * 只有：
   * 1. 下方确实放不下
   * 2. 上方空间又比下方更充足
   *
   * 才向上翻转。
   */
  const shouldFlip =
    panelHeight > spaceBelow &&
    spaceAbove > spaceBelow;

  const nextPlacement:
    | "top"
    | "bottom" =
    shouldFlip
      ? "top"
      : "bottom";

  let top =
    shouldFlip
      ? triggerRect.top -
        panelHeight -
        gap
      : triggerRect.bottom +
        gap;

  /*
   * 极端情况下，上下都放不下，
   * 至少保证弹层不要跑出 viewport。
   */
  if (
    top <
    viewportPadding
  ) {
    top =
      viewportPadding;
  }

  if (
    top +
      panelHeight >
    window.innerHeight -
      viewportPadding
  ) {
    top =
      Math.max(
        viewportPadding,
        window.innerHeight -
          panelHeight -
          viewportPadding,
      );
  }

  let left =
    triggerRect.left;

  if (
    left +
      panelWidth >
    window.innerWidth -
      viewportPadding
  ) {
    left =
      window.innerWidth -
      panelWidth -
      viewportPadding;
  }

  if (
    left <
    viewportPadding
  ) {
    left =
      viewportPadding;
  }

  setPlacement(
    nextPlacement,
  );

  setPopoverPosition({
    top,
    left,
  });
}


/*
 * Portal 完成真实 DOM 渲染后，
 * 在浏览器绘制之前读取真实尺寸并定位。
 */
useLayoutEffect(() => {
  if (!open) {
    return;
  }

  updatePopoverPosition();
}, [
  open,
  mode,
]);


/*
 * 弹层打开期间：
 * 浏览器尺寸改变或者任何父级滚动，
 * 都重新根据真实位置计算。
 */
useEffect(() => {
  if (!open) {
    return;
  }

  function handleWindowChange() {
    updatePopoverPosition();
  }

  window.addEventListener(
    "resize",
    handleWindowChange,
  );

  window.addEventListener(
    "scroll",
    handleWindowChange,
    true,
  );

  return () => {
    window.removeEventListener(
      "resize",
      handleWindowChange,
    );

    window.removeEventListener(
      "scroll",
      handleWindowChange,
      true,
    );
  };
}, [
  open,
  mode,
]);


  useEffect(() => {
    function handleOutsideClick(
      event: MouseEvent,
    ) {
      const target =
        event.target as Node;

      const clickedTriggerArea =
        wrapperRef.current?.contains(
          target,
        );

      const clickedPopover =
        popoverRef.current?.contains(
          target,
        );

      if (
        !clickedTriggerArea &&
        !clickedPopover
      ) {
        setOpen(false);
        setMode("day");
      }
    }

    function handleKeyDown(
      event: KeyboardEvent,
    ) {
      if (
        event.key ===
        "Escape"
      ) {
        setOpen(false);
        setMode("day");
      }
    }

    document.addEventListener(
      "mousedown",
      handleOutsideClick,
    );

    document.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick,
      );

      document.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, []);


  const year =
    viewDate.getFullYear();

  const month =
    viewDate.getMonth();

  const daysInMonth =
    getDaysInMonth(
      year,
      month,
    );

  const firstWeekday =
    getFirstWeekday(
      year,
      month,
    );

  const yearRangeStart =
    getYearRangeStart(
      year,
    );

  const yearRange =
    Array.from(
      { length: 12 },
      (_, index) =>
        yearRangeStart +
        index,
    );

  const cells:
    Array<number | null> =
    [];

  for (
    let i = 0;
    i < firstWeekday;
    i += 1
  ) {
    cells.push(null);
  }

  for (
    let day = 1;
    day <=
    daysInMonth;
    day += 1
  ) {
    cells.push(day);
  }


  function handlePrev() {
    if (
      mode === "day"
    ) {
      setViewDate(
        new Date(
          year,
          month - 1,
          1,
        ),
      );
      return;
    }

    if (
      mode === "month"
    ) {
      setViewDate(
        new Date(
          year - 1,
          month,
          1,
        ),
      );
      return;
    }

    setViewDate(
      new Date(
        year - 12,
        month,
        1,
      ),
    );
  }


  function handleNext() {
    if (
      mode === "day"
    ) {
      setViewDate(
        new Date(
          year,
          month + 1,
          1,
        ),
      );
      return;
    }

    if (
      mode === "month"
    ) {
      setViewDate(
        new Date(
          year + 1,
          month,
          1,
        ),
      );
      return;
    }

    setViewDate(
      new Date(
        year + 12,
        month,
        1,
      ),
    );
  }


  function handleTitleClick() {
    if (
      mode === "day"
    ) {
      setMode("month");
      return;
    }

    if (
      mode === "month"
    ) {
      setMode("year");
      return;
    }

    setMode("day");
  }


  function selectDate(
    day: number,
  ) {
    const nextDate =
      new Date(
        year,
        month,
        day,
      );

    onChange(
      formatStorageDate(
        nextDate,
      ),
    );

    setOpen(false);
    setMode("day");
  }


  function selectMonth(
    nextMonth: number,
  ) {
    setViewDate(
      new Date(
        year,
        nextMonth,
        1,
      ),
    );

    setMode("day");
  }


  function selectYear(
    nextYear: number,
  ) {
    setViewDate(
      new Date(
        nextYear,
        month,
        1,
      ),
    );

    setMode("month");
  }


  function selectToday() {
    const today =
      new Date();

    setViewDate(today);
    onChange(
      formatStorageDate(
        today,
      ),
    );

    setMode("day");
    setOpen(false);
  }


  function getTitleText() {
    if (
      mode === "day"
    ) {
      return `${year}年 ${month + 1}月`;
    }

    if (
      mode === "month"
    ) {
      return `${year}年`;
    }

    return `${yearRangeStart} - ${yearRangeStart + 11}`;
  }


  const popover =
    open ? (
<div
  ref={popoverRef}
  className={`date-picker-popover date-picker-popover-${placement}`}
  style={{
    top: popoverPosition.top,
    left: popoverPosition.left,
  }}
>
        <div className="date-picker-header">
          <button
            type="button"
            className="date-picker-nav-button"
            onClick={
              handlePrev
            }
            aria-label="上一页"
          >
            <ChevronLeft
              size={17}
              strokeWidth={1.7}
            />
          </button>

          <button
            type="button"
            className="date-picker-title-button"
            onClick={
              handleTitleClick
            }
          >
            {getTitleText()}
          </button>

          <button
            type="button"
            className="date-picker-nav-button"
            onClick={
              handleNext
            }
            aria-label="下一页"
          >
            <ChevronRight
              size={17}
              strokeWidth={1.7}
            />
          </button>
        </div>


        {mode ===
          "day" && (
          <>
            <div className="date-picker-weekdays">
              {WEEKDAYS.map(
                (
                  weekday,
                ) => (
                  <div
                    key={
                      weekday
                    }
                  >
                    {weekday}
                  </div>
                ),
              )}
            </div>

            <div className="date-picker-grid">
              {cells.map(
                (
                  day,
                  index,
                ) => {
                  if (
                    day === null
                  ) {
                    return (
                      <div
                        key={`empty-${index}`}
                      />
                    );
                  }

                  const cellDate =
                    new Date(
                      year,
                      month,
                      day,
                    );

                  const selected =
                    selectedDate
                      ? isSameDay(
                          cellDate,
                          selectedDate,
                        )
                      : false;

                  const today =
                    isSameDay(
                      cellDate,
                      new Date(),
                    );

                  return (
                    <button
                      key={`${year}-${month}-${day}`}
                      type="button"
                      className={[
                        "date-picker-day",
                        selected
                          ? "date-picker-day-selected"
                          : "",
                        today &&
                        !selected
                          ? "date-picker-day-today"
                          : "",
                      ]
                        .filter(
                          Boolean,
                        )
                        .join(
                          " ",
                        )}
                      onClick={() =>
                        selectDate(
                          day,
                        )
                      }
                    >
                      {day}
                    </button>
                  );
                },
              )}
            </div>
          </>
        )}


        {mode ===
          "month" && (
          <div className="date-picker-month-grid">
            {MONTHS.map(
              (
                monthLabel,
                index,
              ) => {
                const selected =
                  selectedDate &&
                  selectedDate.getFullYear() ===
                    year &&
                  selectedDate.getMonth() ===
                    index;

                const current =
                  new Date().getFullYear() ===
                    year &&
                  new Date().getMonth() ===
                    index;

                return (
                  <button
                    key={
                      monthLabel
                    }
                    type="button"
                    className={[
                      "date-picker-month-item",
                      selected
                        ? "date-picker-month-item-selected"
                        : "",
                      current &&
                      !selected
                        ? "date-picker-month-item-current"
                        : "",
                    ]
                      .filter(
                        Boolean,
                      )
                      .join(
                        " ",
                      )}
                    onClick={() =>
                      selectMonth(
                        index,
                      )
                    }
                  >
                    {
                      monthLabel
                    }
                  </button>
                );
              },
            )}
          </div>
        )}


        {mode ===
          "year" && (
          <div className="date-picker-year-grid">
            {yearRange.map(
              (
                itemYear,
              ) => {
                const selected =
                  selectedDate &&
                  selectedDate.getFullYear() ===
                    itemYear;

                const current =
                  new Date().getFullYear() ===
                  itemYear;

                return (
                  <button
                    key={
                      itemYear
                    }
                    type="button"
                    className={[
                      "date-picker-year-item",
                      selected
                        ? "date-picker-year-item-selected"
                        : "",
                      current &&
                      !selected
                        ? "date-picker-year-item-current"
                        : "",
                    ]
                      .filter(
                        Boolean,
                      )
                      .join(
                        " ",
                      )}
                    onClick={() =>
                      selectYear(
                        itemYear,
                      )
                    }
                  >
                    {itemYear}
                  </button>
                );
              },
            )}
          </div>
        )}


        <div className="date-picker-footer">
          <button
            type="button"
            className="date-picker-today-button"
            onClick={
              selectToday
            }
          >
            回到今天
          </button>
        </div>
      </div>
    ) : null;


  return (
    <>
      <div
        ref={
          wrapperRef
        }
        className="date-picker"
      >
        {label && (
          <label className="date-picker-label">
            {label}
          </label>
        )}

        <button
          ref={
            triggerRef
          }
          type="button"
          disabled={disabled}
          className={`date-picker-trigger ${
            open
              ? "date-picker-trigger-open"
              : ""
          }`}
onClick={() => {
  if (disabled) return;
  setOpen(
    (previous) =>
      !previous,
  );
}}
          aria-expanded={
            open
          }
        >
          <span
            className={
              selectedDate
                ? ""
                : "date-picker-placeholder"
            }
          >
            {selectedDate
              ? formatDisplayDate(
                  selectedDate,
                )
              : "选择日期"}
          </span>

          <Calendar
            className="date-picker-calendar-icon"
            size={16}
            strokeWidth={1.7}
          />
        </button>
      </div>

      {popover &&
        createPortal(
          popover,
          document.body,
        )}
    </>
  );
}
