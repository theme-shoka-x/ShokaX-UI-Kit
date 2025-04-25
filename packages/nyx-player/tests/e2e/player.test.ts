import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  // Go to the page served by `vite dev`
  await page.goto('/')
})

test('should load the player', async ({ page }) => {
  // 等待并断言播放器元素可见，假设播放器使用 id="player"
  const player = page.locator('#MusicPlayerRoot')
  const showBtn = page.locator('#test')
  // 等待按钮可见
  await showBtn.waitFor({ state: 'visible' })
  await showBtn.click()
  await expect(player).toBeVisible()
})

// 新增 E2E 测试：隐藏播放器
test('should hide the player when clicking hide button', async ({ page }) => {
  const player = page.locator('#MusicPlayerRoot')
  const showBtn = page.locator('#test')
  await showBtn.waitFor({ state: 'visible' })
  // 显示播放器
  await showBtn.click()
  await expect(player).toBeVisible()
  // 隐藏播放器
  await showBtn.click()
  await expect(player).toBeHidden()
})

// 新增 E2E 测试：播放/暂停 切换
test('should toggle play and pause', async ({ page }) => {
  const showBtn = page.locator('#test')
  const playBtn = page.locator('#play')
  await showBtn.waitFor({ state: 'visible' })
  await showBtn.click()
  await expect(playBtn).toHaveText('播放')
  await playBtn.waitFor({ state: 'visible' })
  await playBtn.click()
  await expect(playBtn).toHaveText('暂停')
  await playBtn.click()
  await expect(playBtn).toHaveText('播放')
})
