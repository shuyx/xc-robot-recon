<template>
  <div class="face-recognition-page">
    <el-card class="main-card">
      <template #header>
        <div class="card-header">
          <span class="header-icon">👤</span>
          <span class="header-title">人脸识别系统</span>
          <div class="header-actions">
            <el-button 
              :type="isRecognizing ? 'danger' : 'primary'" 
              @click="toggleRecognition"
              :icon="isRecognizing ? 'VideoPause' : 'VideoPlay'"
            >
              {{ isRecognizing ? '停止识别' : '开始识别' }}
            </el-button>
          </div>
        </div>
      </template>
      
      <el-row :gutter="20">
        <!-- 摄像头预览区域 -->
        <el-col :span="14">
          <el-card class="camera-section" shadow="never">
            <template #header>
              <span>📷 实时预览</span>
            </template>
            
            <div class="camera-container">
              <div class="video-wrapper">
                <!-- Mock摄像头画面 -->
                <div class="mock-camera" :class="{ 'recognition-active': isRecognizing }">
                  <div v-if="!isRecognizing" class="camera-placeholder">
                    <el-icon class="placeholder-icon"><VideoCamera /></el-icon>
                    <p>点击"开始识别"启动摄像头</p>
                  </div>
                  
                  <!-- Mock人脸检测框 -->
                  <div v-if="isRecognizing && detectedFaces.length > 0" class="detection-overlay">
                    <div 
                      v-for="face in detectedFaces" 
                      :key="face.id"
                      class="face-box"
                      :style="{ 
                        left: face.x + '%', 
                        top: face.y + '%',
                        width: face.width + '%',
                        height: face.height + '%'
                      }"
                    >
                      <div class="face-label">
                        {{ face.name }}
                        <span class="confidence">{{ face.confidence }}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Mock实时画面效果 -->
                  <div v-if="isRecognizing" class="live-indicator">
                    <div class="live-dot"></div>
                    <span>LIVE</span>
                  </div>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
        
        <!-- 识别结果区域 -->
        <el-col :span="10">
          <el-card class="results-section" shadow="never">
            <template #header>
              <span>📊 识别结果</span>
            </template>
            
            <div class="recognition-stats">
              <div class="stat-item">
                <div class="stat-value">{{ totalRecognitions }}</div>
                <div class="stat-label">总识别次数</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">{{ uniquePersons }}</div>
                <div class="stat-label">识别人数</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">{{ averageConfidence }}%</div>
                <div class="stat-label">平均置信度</div>
              </div>
            </div>
            
            <el-divider />
            
            <div class="results-list">
              <h4>最近识别记录</h4>
              <div class="result-item" v-for="result in recentResults" :key="result.id">
                <div class="result-avatar">
                  <el-avatar :size="40">{{ result.name.charAt(0) }}</el-avatar>
                </div>
                <div class="result-info">
                  <div class="result-name">{{ result.name }}</div>
                  <div class="result-time">{{ result.timestamp }}</div>
                </div>
                <div class="result-confidence">
                  <el-tag :type="getConfidenceType(result.confidence)">
                    {{ result.confidence }}%
                  </el-tag>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      
      <!-- 控制面板 -->
      <el-row :gutter="20" class="control-panel">
        <el-col :span="24">
          <el-card shadow="never">
            <template #header>
              <span>⚙️ 系统控制</span>
            </template>
            
            <el-row :gutter="20">
              <el-col :span="6">
                <div class="control-item">
                  <label>识别阈值</label>
                  <el-slider v-model="recognitionThreshold" :min="50" :max="99" show-input />
                </div>
              </el-col>
              <el-col :span="6">
                <div class="control-item">
                  <label>检测频率 (fps)</label>
                  <el-select v-model="detectionFps" placeholder="选择检测频率">
                    <el-option label="5 FPS" :value="5" />
                    <el-option label="10 FPS" :value="10" />
                    <el-option label="15 FPS" :value="15" />
                    <el-option label="30 FPS" :value="30" />
                  </el-select>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="control-item">
                  <label>摄像头选择</label>
                  <el-select v-model="selectedCamera" placeholder="选择摄像头">
                    <el-option label="TOF相机" value="tof_camera" />
                    <el-option label="2D相机1" value="2d_camera_1" />
                    <el-option label="鱼眼相机" value="fisheye_camera" />
                  </el-select>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="control-item">
                  <label>操作</label>
                  <div class="control-buttons">
                    <el-button size="small" @click="saveSnapshot">保存截图</el-button>
                    <el-button size="small" @click="exportResults">导出记录</el-button>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ElMessage } from 'element-plus'
import { VideoCamera } from '@element-plus/icons-vue'

// 识别状态
const isRecognizing = ref(false)
const recognitionThreshold = ref(85)
const detectionFps = ref(15)
const selectedCamera = ref('tof_camera')

// Mock检测到的人脸数据
const detectedFaces = ref<Array<{
  id: number
  name: string
  confidence: number
  x: number
  y: number
  width: number
  height: number
}>>([])

// Mock识别记录
const recentResults = ref([
  {
    id: 1,
    name: 'Kevin Yuan',
    confidence: 95,
    timestamp: '2025-07-19 15:30:25'
  },
  {
    id: 2,
    name: '访客',
    confidence: 78,
    timestamp: '2025-07-19 15:28:15'
  },
  {
    id: 3,
    name: 'Kevin Yuan',
    confidence: 92,
    timestamp: '2025-07-19 15:25:08'
  },
  {
    id: 4,
    name: '未知人员',
    confidence: 65,
    timestamp: '2025-07-19 15:22:30'
  }
])

// 统计数据
const totalRecognitions = computed(() => recentResults.value.length)
const uniquePersons = computed(() => {
  const uniqueNames = new Set(recentResults.value.map(r => r.name))
  return uniqueNames.size
})
const averageConfidence = computed(() => {
  const sum = recentResults.value.reduce((acc, result) => acc + result.confidence, 0)
  return Math.round(sum / recentResults.value.length)
})

let recognitionInterval: number | null = null

// 切换识别状态
const toggleRecognition = () => {
  isRecognizing.value = !isRecognizing.value
  
  if (isRecognizing.value) {
    startMockRecognition()
    ElMessage.success('人脸识别已启动')
  } else {
    stopMockRecognition()
    ElMessage.info('人脸识别已停止')
  }
}

// 启动Mock识别
const startMockRecognition = () => {
  // 模拟检测到人脸
  const mockFaces = [
    {
      id: 1,
      name: 'Kevin Yuan',
      confidence: 95,
      x: 25,
      y: 20,
      width: 30,
      height: 40
    }
  ]
  
  detectedFaces.value = mockFaces
  
  // 模拟实时识别结果更新
  recognitionInterval = setInterval(() => {
    // 随机更新置信度
    detectedFaces.value.forEach(face => {
      face.confidence = Math.floor(Math.random() * 15) + 85 // 85-99%
    })
  }, 1000)
}

// 停止Mock识别
const stopMockRecognition = () => {
  detectedFaces.value = []
  if (recognitionInterval) {
    clearInterval(recognitionInterval)
    recognitionInterval = null
  }
}

// 获取置信度标签类型
const getConfidenceType = (confidence: number) => {
  if (confidence >= 90) return 'success'
  if (confidence >= 75) return 'warning'
  return 'danger'
}

// 保存截图
const saveSnapshot = () => {
  ElMessage.success('截图已保存到本地')
}

// 导出识别记录
const exportResults = () => {
  ElMessage.success('识别记录已导出为CSV文件')
}

onMounted(() => {
  console.log('人脸识别页面已加载')
})

onUnmounted(() => {
  if (recognitionInterval) {
    clearInterval(recognitionInterval)
  }
})
</script>

<style scoped>
.face-recognition-page {
  padding: 20px;
}

.main-card {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-icon {
  font-size: 24px;
}

.header-title {
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  flex: 1;
}

.camera-section, .results-section {
  height: 400px;
  margin-bottom: 20px;
}

.camera-container {
  height: 320px;
  background: #f5f7fa;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}

.video-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}

.mock-camera {
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #f0f2f5, #e4e7ed);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.3s ease;
}

.mock-camera.recognition-active {
  background: linear-gradient(45deg, #e6f7ff, #d6f7da);
}

.camera-placeholder {
  text-align: center;
  color: #909399;
}

.placeholder-icon {
  font-size: 48px;
  margin-bottom: 10px;
}

.detection-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.face-box {
  position: absolute;
  border: 2px solid #67c23a;
  border-radius: 4px;
  box-shadow: 0 0 8px rgba(103, 194, 58, 0.3);
}

.face-label {
  position: absolute;
  top: -30px;
  left: 0;
  background: #67c23a;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
}

.confidence {
  margin-left: 5px;
  opacity: 0.9;
}

.live-indicator {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(245, 108, 108, 0.9);
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
}

.live-dot {
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.recognition-stats {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #409eff;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 12px;
  color: #909399;
}

.results-list {
  max-height: 200px;
  overflow-y: auto;
}

.result-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid #ebeef5;
}

.result-item:last-child {
  border-bottom: none;
}

.result-info {
  flex: 1;
}

.result-name {
  font-weight: 500;
  color: #2c3e50;
}

.result-time {
  font-size: 12px;
  color: #909399;
  margin-top: 2px;
}

.control-panel {
  margin-top: 20px;
}

.control-item {
  margin-bottom: 15px;
}

.control-item label {
  display: block;
  font-size: 13px;
  color: #606266;
  margin-bottom: 8px;
}

.control-buttons {
  display: flex;
  gap: 8px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .face-recognition-page {
    padding: 10px;
  }
  
  .camera-section, .results-section {
    height: auto;
    min-height: 300px;
  }
  
  .recognition-stats {
    flex-direction: column;
    gap: 15px;
  }
  
  .stat-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .stat-value {
    font-size: 20px;
  }
}
</style>