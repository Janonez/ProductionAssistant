const { chromium } = require('playwright')
const fs = require('fs')
const path = require('path')

const config = JSON.parse(fs.readFileSync(0, 'utf8').replace(/^\uFEFF/, ''))
const emit = data => process.stdout.write(`${JSON.stringify(data)}\n`)

async function findReportFrame(page) {
  const deadline = Date.now() + config.queryTimeoutSeconds * 1000
  while (Date.now() < deadline) {
    for (const frame of page.frames()) {
      if (frame !== page.mainFrame() && await frame.locator('#fr-btn-FORMSUBMIT0').count()) return frame
    }
    await page.waitForTimeout(200)
  }
  throw new Error('未找到 FineReport 报表 iframe')
}

async function loginIfNeeded(page) {
  const account = page.getByRole('textbox', { name: '请输入账号' })
  if (!config.username || !config.password || !await account.count()) return
  await account.fill(config.username)
  await page.getByRole('textbox', { name: '请输入密码' }).fill(config.password)
  await page.getByRole('button', { name: '登录' }).click()
}

async function openReport(page) {
  await page.goto(config.reportUrl, { waitUntil: 'domcontentloaded' })
  await loginIfNeeded(page)
  await page.waitForURL(url => url.hostname.toLowerCase().includes('fr.tz.com.cn'), { timeout: 10 * 60 * 1000 })
  await page.locator('.bi-basic-button.cursor-pointer.bi-node').click({ timeout: config.queryTimeoutSeconds * 1000 })
  await page.locator('div').filter({ hasText: new RegExp(`^${config.reportPath[1]}$`) }).nth(1).click({ timeout: config.queryTimeoutSeconds * 1000 })
  await page.locator('div').filter({ hasText: new RegExp(`^${config.reportPath[2]}$`) }).first().click({ timeout: config.queryTimeoutSeconds * 1000 })
  return findReportFrame(page)
}

async function authenticate() {
  const browser = await chromium.launch({ headless: true })
  try {
    const context = await browser.newContext({ locale: 'zh-CN' })
    const page = await context.newPage()
    await page.goto(config.reportUrl, { waitUntil: 'domcontentloaded' })
    await loginIfNeeded(page)
    await page.waitForURL(url => url.hostname.toLowerCase().includes('fr.tz.com.cn'), { timeout: 10 * 60 * 1000 })
    fs.mkdirSync(path.dirname(config.authStatePath), { recursive: true })
    await context.storageState({ path: config.authStatePath })
  } finally {
    await browser.close()
  }
}

async function exportDate(page, frame, reportDate, current, total) {
  let stage = '设置填报日期'
  try {
    emit({ type: 'progress', data: { stage: 'collect', current, total, message: `${reportDate} 正在设置填报日期` } })
    const dateInput = frame.getByRole('textbox').nth(2)
    await dateInput.click()
    await dateInput.press('ControlOrMeta+a')
    await dateInput.fill(reportDate)

    stage = '等待查询刷新'
    emit({ type: 'progress', data: { stage: 'collect', current, total, message: `${reportDate} 正在查询报表` } })
    const refreshPromise = page.waitForResponse(response => {
      const url = new URL(response.url())
      return url.pathname.endsWith('/view/report') && url.searchParams.get('op') === 'fr_write' && url.searchParams.get('cmd') === 'read_w_content'
    }, { timeout: config.queryTimeoutSeconds * 1000 })
    await frame.locator('#fr-btn-FORMSUBMIT0').click()
    const refresh = await refreshPromise
    if (!refresh.ok()) throw new Error(`报表刷新失败：HTTP ${refresh.status()}`)
    await refresh.finished()
    await page.waitForTimeout(1000)

    stage = '检测导出按钮'
    emit({ type: 'progress', data: { stage: 'collect', current, total, message: `${reportDate} 正在展开导出菜单` } })
    const exportButton = frame.getByText('导出', { exact: true })
    await exportButton.waitFor({ state: 'visible', timeout: 10000 })
    stage = '点击导出按钮'
    await exportButton.click()

    stage = '检测 Excel 菜单'
    const excelMenu = frame.locator('div').filter({ hasText: 'Excel' }).nth(1)
    await excelMenu.waitFor({ state: 'visible', timeout: 10000 })
    stage = '展开 Excel 菜单'
    await excelMenu.hover()

    stage = '检测分页导出菜单'
    const pageExportButton = frame.locator('div').filter({ hasText: '分页导出' }).nth(1)
    await pageExportButton.waitFor({ state: 'visible', timeout: 10000 })
    stage = '点击分页导出并等待下载'
    emit({ type: 'progress', data: { stage: 'collect', current, total, message: `${reportDate} 正在下载 Excel` } })
    const downloadPromise = page.waitForEvent('download', { timeout: config.downloadTimeoutSeconds * 1000 })
    await pageExportButton.click()
    const download = await downloadPromise

    stage = '保存下载文件'
    const [year, month] = reportDate.split('-')
    const directory = path.join(config.sourceRoot, config.rawFolder, `${year}年`, `${month}月`)
    const target = path.join(directory, `加工_${reportDate}.xlsx`)
    await download.saveAs(target)
    if (!fs.statSync(target).size) throw new Error('下载文件为空')
    emit({ type: 'progress', data: { stage: 'collect', current: current + 1, total, message: `${reportDate} 导出完成` } })
    return target
  } catch (error) {
    throw new Error(`${reportDate} ${stage}失败：${error.message}`)
  }
}

async function collect() {
  const browser = await chromium.launch({ headless: true })
  const succeeded = []
  const failures = []
  try {
    const context = await browser.newContext({ locale: 'zh-CN', storageState: config.authStatePath, acceptDownloads: true })
    const page = await context.newPage()
    emit({ type: 'progress', data: { stage: 'prepare', current: 0, total: config.reportDates.length, message: '正在进入加工日报' } })
    let frame = await openReport(page)
    for (let index = 0; index < config.reportDates.length; index++) {
      const reportDate = config.reportDates[index]
      let lastError
      for (let attempt = 1; attempt <= Math.max(1, config.retryCount); attempt++) {
        try {
          if (attempt > 1) frame = await openReport(page)
          succeeded.push({ reportDate, path: await exportDate(page, frame, reportDate, index, config.reportDates.length) })
          lastError = undefined
          break
        } catch (error) {
          lastError = error
        }
      }
      if (lastError) failures.push({ reportDate, error: lastError.message })
    }
    emit({ type: 'result', data: { succeeded, failures } })
  } finally {
    await browser.close()
  }
}

(config.mode === 'auth' ? authenticate() : collect()).catch(error => { console.error(error.message); process.exitCode = 1 })
