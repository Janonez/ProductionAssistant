import type { ReactNode } from "react";
import { invoke } from "./bridge";
import { DailyReportTaskEditor } from "./DailyReportPage";
import { NotionFillTaskEditor } from "./NotionFillPage";
import { DailyReportCreateWizard } from "./DailyReportCreateWizard";
import { NotionFillCreateWizard } from "./NotionFillCreateWizard";
import type { DailyRun, NotionFillRun } from "./types";

export type AutomationTaskEditorProps = {
  id: string;
  section: string;
  navigate: (section: string) => void;
  changed: () => void;
};

export type AutomationTaskCreateProps = {
  onCreated: (result: { id: string }) => Promise<void>;
  onBack: () => void;
  onCancel: () => void;
};

export type AutomationRunView = {
  id: string;
  time: string;
  source: string;
  status: string;
  title: string;
  details: string[];
  error?: string;
};

export type AutomationTaskTypeDefinition = {
  taskType: string;
  name: string;
  description: string;
  renderCreate: (props: AutomationTaskCreateProps) => ReactNode;
  taskTabs: Array<{ id: string; label: string }>;
  resolveSection: (missingStep: string) => string;
  issueTitle: (missingStep: string) => string;
  renderEditor: (props: AutomationTaskEditorProps) => ReactNode;
  loadRuns: (id: string) => Promise<AutomationRunView[]>;
};

export const automationTaskTypes: AutomationTaskTypeDefinition[] = [
  {
    taskType: "daily_report",
    name: "日报推送",
    description: "查询日报数据、生成消息并发送钉钉。",
    renderCreate: (props) => <DailyReportCreateWizard {...props} />,
    taskTabs: [{ id: "configuration", label: "任务配置" }, { id: "execution", label: "运行与测试" }],
    resolveSection: (missingStep) => missingStep === "basics" ? "basics" : missingStep === "template" ? "configuration" : "execution",
    issueTitle: (missingStep) => missingStep === "notification" ? "通知渠道未就绪" : missingStep === "template" ? "日报配置尚未验证" : "基本信息不完整",
    renderEditor: (props) => <DailyReportTaskEditor {...props} />,
    loadRuns: (id) => invoke<{ runs: DailyRun[] }>("daily.runs", { id }).then(({ runs }) => runs.map(run => ({
      id: run.id,
      time: run.time,
      source: run.source,
      status: run.status,
      title: run.textSummary || `业务日期 ${run.businessDate || "—"}`,
      details: [`业务日期：${run.businessDate || "—"}`, `阶段：${run.stage}`, `尝试：${run.attempts}`],
      error: run.error,
    }))),
  },
  {
    taskType: "notion_fill",
    name: "Notion 自动填报",
    description: "读取 93 系统前一天入库数据并新增到 Notion。",
    renderCreate: (props) => <NotionFillCreateWizard {...props} />,
    taskTabs: [{ id: "configuration", label: "任务配置" }, { id: "execution", label: "运行与测试" }],
    resolveSection: (missingStep) => missingStep === "basics" ? "basics" : missingStep === "test" ? "execution" : "configuration",
    issueTitle: (missingStep) => missingStep === "connection" ? "93 系统连接未就绪" : missingStep === "target" ? "Notion 填报目标未就绪" : missingStep === "test" ? "任务尚未完成只读测试" : "基本信息不完整",
    renderEditor: (props) => <NotionFillTaskEditor {...props} />,
    loadRuns: (id) => invoke<{ runs: NotionFillRun[] }>("notionFill.runs", { id }).then(({ runs }) => runs.map(run => ({
      id: run.id,
      time: run.time,
      source: run.source === "source-test" ? "93读取测试" : run.source === "test" ? "只读测试" : run.source === "manual" ? "手动执行" : "自动执行",
      status: run.status === "created" ? "已新增" : run.status === "checked" ? "已检查" : "失败",
      title: `${run.businessDate} · 板材 ${run.plateWeight.toLocaleString("zh-CN", { maximumFractionDigits: 3 })} 吨 · 型材 ${run.sectionWeight.toLocaleString("zh-CN", { maximumFractionDigits: 3 })} 吨`,
      details: [run.message].filter(Boolean),
      error: run.error,
    }))),
  },
];

export function findAutomationTaskType(taskType: string) {
  return automationTaskTypes.find((item) => item.taskType === taskType);
}
