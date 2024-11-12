let sidebar = null; // 侧边栏元素
let isOpen = false; // 侧边栏是否打开的状态

// 创建并注入侧边栏
function createSidebar() {
  console.log('Creating sidebar...'); // 调试日志
  sidebar = document.createElement('div'); // 创建一个新的div元素
  sidebar.id = 'ai-sidebar'; // 设置侧边栏的ID
  // 设置侧边栏的HTML内容
  sidebar.innerHTML = `
    <!-- 侧边栏头部 -->
    <div class="sidebar-header">
      <!-- 侧边栏标题 -->
      <div class="sidebar-title">
        <!-- AI助手图标 -->
        <img src="${chrome.runtime.getURL('icons/icon16.png')}" alt="AI Assistant" />
        <!-- 侧边栏标题文本 -->
        AI Web Assistant
      </div>
      <!-- 侧边栏控制按钮 -->
      <div class="sidebar-controls">
        <!-- 设置按钮 -->
        <button class="sidebar-button" id="settings-button">⚙️</button>
        <!-- 关闭按钮 -->
        <button class="sidebar-button" id="close-button">✕</button>
      </div>
    </div>
    <!-- 侧边栏内容 -->
    <div class="sidebar-content">
      <!-- 加载动画 -->
      <div class="loading">
        <!-- 加载动画图标 -->
        <div class="loading-spinner"></div>
      </div>
    </div>
  `;
  document.body.appendChild(sidebar); // 将侧边栏添加到文档的body中
  
  console.log('Sidebar created and added to the document.');
  
  // 添加事件监听器
  document.getElementById('close-button').addEventListener('click', toggleSidebar); // 关闭按钮点击事件
  document.getElementById('settings-button').addEventListener('click', openSettings); // 设置按钮点击事件
}

// 切换侧边栏的可见性
function toggleSidebar() {
  console.log('Toggling sidebar visibility...'); // 调试日志
  if (!sidebar) {
    createSidebar(); // 如果侧边栏不存在，则创建
  }
  
  isOpen = !isOpen; // 切换侧边栏的状态
  sidebar.style.display = isOpen ? 'block' : 'none'; // 根据状态显示或隐藏侧边栏
  
  console.log(`Sidebar is now ${isOpen ? 'open' : 'closed'}.`);
  
  if (isOpen) {
    analyzeContent(); // 如果侧边栏打开，则分析页面内容
  }
}

// 打开设置模态框
function openSettings() {
  // TODO: 实现API配置的设置模态框
  alert('Settings functionality will be implemented here'); // 提示功能未实现
}

// 分析页面内容
async function analyzeContent() {
  console.log('Analyzing page content...'); // 调试日志
  const content = document.body.innerText; // 获取页面的文本内容
  const sidebarContent = document.querySelector('.sidebar-content'); // 获取侧边栏内容区域
  
  try {
    // TODO: 替换为实际的API调用
    const response = await mockApiCall(content); // 模拟API调用获取响应
    
    sidebarContent.innerHTML = `
      <div class="ai-response">${response}</div>
    `; // 将响应结果显示在侧边栏中
    console.log('Content analyzed successfully.'); // 调试日志
  } catch (error) {
    console.error('Error analyzing content:', error); // 错误日志
    sidebarContent.innerHTML = `
      <div class="ai-response">Error: Could not analyze content. Please check your API settings.</div>
    `; // 如果出错，显示错误信息
  }
}

// 模拟API调用（需要替换为实际的API实现）
async function mockApiCall(content) {
  // 模拟API延迟
  await new Promise(resolve => setTimeout(resolve, 1000));
  return "This is a placeholder for the AI response. Replace this with actual API integration."; // 返回模拟的AI响应
}

// 监听来自后台脚本的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Received message:', request); // 调试日志
  if (request.action === 'toggle') {
    toggleSidebar(); // 如果接收到的消息是'toggle'，则切换侧边栏
  }
  return true;
});