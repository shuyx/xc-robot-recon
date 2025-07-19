<template>
  <div class="elevator-control-page">
    <el-row :gutter="20">
      <!-- 电梯控制面板 -->
      <el-col :span="14">
        <el-card class="control-panel">
          <template #header>
            <div class="panel-header">
              <span class="header-icon">🏢</span>
              <span class="header-title">智能梯控系统</span>
              <el-tag :type="elevatorStatus.type">{{ elevatorStatus.text }}</el-tag>
            </div>
          </template>
          
          <el-row :gutter="20">
            <!-- 电梯状态显示 -->
            <el-col :span="12">
              <div class="elevator-display">
                <div class="elevator-shaft">
                  <div class="floor-indicators">
                    <div 
                      v-for="floor in floors.slice().reverse()" 
                      :key="floor"
                      class="floor-indicator"
                      :class="{ 'current-floor': floor === currentFloor }"
                    >
                      <span class="floor-number">{{ floor }}F</span>
                      <div 
                        v-if="floor === currentFloor" 
                        class="elevator-car"
                        :class="{ 'moving': isMoving }"
                      >
                        🛗
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="elevator-info">
                  <div class="info-item">
                    <span class="info-label">当前楼层:</span>
                    <span class="info-value">{{ currentFloor }}F</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">目标楼层:</span>
                    <span class="info-value">{{ targetFloor }}F</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">运行状态:</span>
                    <el-tag :type="elevatorStatus.type" size="small">
                      {{ elevatorStatus.text }}
                    </el-tag>
                  </div>
                  <div class="info-item">
                    <span class="info-label">载重:</span>
                    <span class="info-value">{{ currentWeight }}kg / {{ maxWeight }}kg</span>
                  </div>
                </div>
              </div>
            </el-col>
            
            <!-- 楼层按钮面板 -->
            <el-col :span="12">
              <div class="floor-buttons">
                <h4>楼层选择</h4>
                <div class="button-grid">
                  <el-button
                    v-for="floor in floors"
                    :key="floor"
                    :type="getFloorButtonType(floor)"
                    :disabled="isMoving || floor === currentFloor"
                    @click="callElevator(floor)"
                    class="floor-btn"
                    size="large"
                  >
                    {{ floor }}F
                  </el-button>
                </div>
                
                <div class="emergency-controls">
                  <el-button 
                    type="danger" 
                    @click="emergencyStop"
                    :disabled="!isMoving"
                    class="emergency-btn"
                  >
                    🚨 紧急停止
                  </el-button>
                  <el-button 
                    type="warning" 
                    @click="openDoor"
                    :disabled="isMoving"
                    class="door-btn"
                  >
                    🚪 开门
                  </el-button>
                </div>
              </div>
            </el-col>
          </el-row>
          
          <!-- 智能功能区 -->
          <el-divider />
          
          <div class="smart-features">
            <h4>智能功能</h4>
            <el-row :gutter="15">
              <el-col :span="6">
                <el-button 
                  @click="voiceControl" 
                  :type="isVoiceActive ? 'success' : 'default'"
                  class="feature-btn"
                >
                  🎤 语音控制
                </el-button>
              </el-col>
              <el-col :span="6">
                <el-button 
                  @click="faceRecognition" 
                  :type="isFaceRecognitionActive ? 'success' : 'default'"
                  class="feature-btn"
                >
                  👤 人脸识别
                </el-button>
              </el-col>
              <el-col :span="6">
                <el-button 
                  @click="scheduleMode" 
                  :type="isScheduleMode ? 'success' : 'default'"
                  class="feature-btn"
                >
                  ⏰ 预约模式
                </el-button>
              </el-col>
              <el-col :span="6">
                <el-button 
                  @click="maintenanceMode" 
                  type="warning"
                  class="feature-btn"
                >
                  🔧 维护模式
                </el-button>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      
      <!-- 操作记录和系统信息 -->
      <el-col :span="10">
        <!-- 操作记录 -->
        <el-card class="operation-log" shadow="never">
          <template #header>
            <span>📝 操作记录</span>
          </template>
          
          <div class="log-list">
            <div 
              v-for="record in operationHistory" 
              :key="record.id"
              class="log-item"
            >
              <div class="log-content">
                <div class="log-action">{{ record.action }}</div>
                <div class="log-details">
                  <span>{{ record.floor }}</span>
                  <span class="log-time">{{ record.timestamp }}</span>
                </div>
              </div>
              <el-tag 
                :type="record.statusType" 
                size="small"
                class="log-status"
              >
                {{ record.status }}
              </el-tag>
            </div>
          </div>
        </el-card>
        
        <!-- 系统监控 -->
        <el-card class="system-monitor" shadow="never">
          <template #header>
            <span>📊 系统监控</span>
          </template>
          
          <div class="monitor-grid">
            <div class="monitor-item">
              <div class="monitor-label">电机状态</div>
              <el-tag type="success">正常</el-tag>
            </div>
            <div class="monitor-item">
              <div class="monitor-label">安全系统</div>
              <el-tag type="success">正常</el-tag>
            </div>
            <div class="monitor-item">
              <div class="monitor-label">门锁系统</div>
              <el-tag type="success">正常</el-tag>
            </div>
            <div class="monitor-item">
              <div class="monitor-label">通信状态</div>
              <el-tag type="success">连接正常</el-tag>
            </div>
            <div class="monitor-item">
              <div class="monitor-label">今日运行次数</div>
              <span class="monitor-value">{{ dailyRuns }}</span>
            </div>
            <div class="monitor-item">
              <div class="monitor-label">累计运行时间</div>
              <span class="monitor-value">{{ totalRuntime }}</span>
            </div>
          </div>
        </el-card>
        
        <!-- 预约排队 -->
        <el-card class="queue-card" shadow="never">
          <template #header>
            <span>⏳ 预约队列</span>
          </template>
          
          <div class="queue-list">
            <div 
              v-for="queue in elevatorQueue" 
              :key="queue.id"
              class="queue-item"
            >
              <div class="queue-info">
                <div class="queue-floor">{{ queue.floor }}F</div>
                <div class="queue-user">{{ queue.user }}</div>
              </div>
              <div class="queue-time">{{ queue.estimatedTime }}</div>
            </div>
            
            <div v-if="elevatorQueue.length === 0" class="empty-queue">
              暂无预约
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'

// 电梯基本状态
const currentFloor = ref(1)
const targetFloor = ref(1)
const isMoving = ref(false)
const currentWeight = ref(75) // kg
const maxWeight = ref(1000) // kg
const floors = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

// 电梯运行状态
const elevatorStatus = computed(() => {
  if (isMoving.value) {
    return { text: '运行中', type: 'warning' }
  } else if (currentFloor.value === targetFloor.value) {
    return { text: '停止', type: 'info' }
  } else {
    return { text: '就绪', type: 'success' }
  }
})

// 智能功能状态
const isVoiceActive = ref(false)
const isFaceRecognitionActive = ref(true)
const isScheduleMode = ref(false)

// 操作记录
const operationHistory = ref([
  {
    id: 1,
    action: '呼叫电梯',
    floor: '5F',
    timestamp: '15:30:25',
    status: '完成',
    statusType: 'success'
  },
  {
    id: 2,
    action: '到达楼层',
    floor: '3F',
    timestamp: '15:28:15',
    status: '完成',
    statusType: 'success'
  },
  {
    id: 3,
    action: '呼叫电梯',
    floor: '1F',
    timestamp: '15:25:08',
    status: '完成',
    statusType: 'success'
  },
  {
    id: 4,
    action: '维护检查',
    floor: '系统',
    timestamp: '15:20:00',
    status: '正常',
    statusType: 'info'
  }
])

// 预约队列
const elevatorQueue = ref([
  {
    id: 1,
    floor: 8,
    user: 'Kevin Yuan',
    estimatedTime: '2分钟'
  },
  {
    id: 2,
    floor: 3,
    user: '访客A',
    estimatedTime: '5分钟'
  }
])

// 系统监控数据
const dailyRuns = ref(156)
const totalRuntime = ref('8.5小时')

// 获取楼层按钮类型
const getFloorButtonType = (floor: number) => {
  if (floor === currentFloor.value) return 'success'
  if (floor === targetFloor.value && isMoving.value) return 'warning'
  return 'default'
}

// 呼叫电梯
const callElevator = async (floor: number) => {
  if (isMoving.value || floor === currentFloor.value) return
  
  targetFloor.value = floor
  isMoving.value = true
  
  ElMessage.info(`电梯正在前往 ${floor}F`)
  
  // 添加操作记录
  operationHistory.value.unshift({
    id: Date.now(),
    action: '呼叫电梯',
    floor: `${floor}F`,
    timestamp: new Date().toLocaleTimeString(),
    status: '执行中',
    statusType: 'warning'
  })
  
  // 模拟电梯运行
  const direction = floor > currentFloor.value ? 1 : -1
  const floorDifference = Math.abs(floor - currentFloor.value)
  const travelTime = floorDifference * 1000 // 每层1秒
  
  // 逐层移动
  const moveInterval = setInterval(() => {
    currentFloor.value += direction
    
    if (currentFloor.value === targetFloor.value) {
      clearInterval(moveInterval)
      isMoving.value = false
      
      ElMessage.success(`已到达 ${floor}F`)
      
      // 更新操作记录
      const lastRecord = operationHistory.value[0]
      if (lastRecord && lastRecord.status === '执行中') {
        lastRecord.status = '完成'
        lastRecord.statusType = 'success'
      }
      
      // 模拟开门
      setTimeout(() => {
        ElMessage.info('电梯门已打开')
        setTimeout(() => {
          ElMessage.info('电梯门已关闭')
        }, 3000)
      }, 500)
    }
  }, 1000)
}

// 紧急停止
const emergencyStop = () => {
  if (isMoving.value) {
    isMoving.value = false
    ElMessage.error('电梯紧急停止！')
    
    operationHistory.value.unshift({
      id: Date.now(),
      action: '紧急停止',
      floor: `${currentFloor.value}F`,
      timestamp: new Date().toLocaleTimeString(),
      status: '紧急',
      statusType: 'danger'
    })
  }
}

// 开门
const openDoor = () => {
  if (!isMoving.value) {
    ElMessage.success('电梯门已打开')
    
    operationHistory.value.unshift({
      id: Date.now(),
      action: '手动开门',
      floor: `${currentFloor.value}F`,
      timestamp: new Date().toLocaleTimeString(),
      status: '完成',
      statusType: 'success'
    })
    
    // 3秒后自动关门
    setTimeout(() => {
      ElMessage.info('电梯门已关闭')
    }, 3000)
  }
}

// 语音控制
const voiceControl = () => {
  isVoiceActive.value = !isVoiceActive.value
  
  if (isVoiceActive.value) {
    ElMessage.success('语音控制已启用')
    // 模拟语音识别
    setTimeout(() => {
      ElMessage.info('语音命令: "请到5楼"')
      if (!isMoving.value) {
        callElevator(5)
      }
    }, 2000)
  } else {
    ElMessage.info('语音控制已关闭')
  }
}

// 人脸识别
const faceRecognition = () => {
  isFaceRecognitionActive.value = !isFaceRecognitionActive.value
  
  if (isFaceRecognitionActive.value) {
    ElMessage.success('人脸识别已启用')
  } else {
    ElMessage.info('人脸识别已关闭')
  }
}

// 预约模式
const scheduleMode = () => {
  isScheduleMode.value = !isScheduleMode.value
  
  if (isScheduleMode.value) {
    ElMessage.success('预约模式已启用')
  } else {
    ElMessage.info('预约模式已关闭')
  }
}

// 维护模式
const maintenanceMode = () => {
  ElMessage.warning('进入维护模式需要管理员权限')
}
</script>

<style scoped>
.elevator-control-page {
  padding: 20px;
}

.control-panel {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.panel-header {
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

.elevator-display {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  min-height: 300px;
}

.elevator-shaft {
  background: #e9ecef;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 20px;
  min-height: 200px;
}

.floor-indicators {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.floor-indicator {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: white;
  border-radius: 6px;
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.floor-indicator.current-floor {
  border-color: #409eff;
  background: #ecf5ff;
}

.floor-number {
  font-weight: 500;
  color: #2c3e50;
}

.elevator-car {
  font-size: 20px;
  animation: none;
}

.elevator-car.moving {
  animation: elevatorMove 0.5s ease-in-out infinite alternate;
}

@keyframes elevatorMove {
  0% { transform: translateY(-2px); }
  100% { transform: translateY(2px); }
}

.elevator-info {
  background: white;
  border-radius: 6px;
  padding: 15px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.info-item:last-child {
  margin-bottom: 0;
}

.info-label {
  font-size: 13px;
  color: #606266;
}

.info-value {
  font-weight: 500;
  color: #2c3e50;
}

.floor-buttons {
  text-align: center;
}

.button-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin: 20px 0;
}

.floor-btn {
  min-height: 50px;
  font-size: 16px;
  font-weight: 600;
}

.emergency-controls {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
}

.emergency-btn, .door-btn {
  min-width: 120px;
}

.smart-features {
  margin-top: 20px;
}

.feature-btn {
  width: 100%;
  height: 50px;
  font-size: 14px;
}

.operation-log, .system-monitor, .queue-card {
  margin-bottom: 20px;
}

.log-list {
  max-height: 200px;
  overflow-y: auto;
}

.log-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ebeef5;
}

.log-item:last-child {
  border-bottom: none;
}

.log-content {
  flex: 1;
}

.log-action {
  font-weight: 500;
  color: #2c3e50;
  margin-bottom: 4px;
}

.log-details {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #909399;
}

.monitor-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

.monitor-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}

.monitor-label {
  font-size: 13px;
  color: #606266;
}

.monitor-value {
  font-weight: 500;
  color: #409eff;
}

.queue-list {
  max-height: 150px;
  overflow-y: auto;
}

.queue-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #ebeef5;
}

.queue-item:last-child {
  border-bottom: none;
}

.queue-info {
  flex: 1;
}

.queue-floor {
  font-weight: 500;
  color: #2c3e50;
}

.queue-user {
  font-size: 12px;
  color: #909399;
}

.queue-time {
  font-size: 12px;
  color: #409eff;
}

.empty-queue {
  text-align: center;
  color: #909399;
  font-size: 13px;
  padding: 20px 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .elevator-control-page {
    padding: 10px;
  }
  
  .elevator-display {
    padding: 15px;
    min-height: 250px;
  }
  
  .button-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }
  
  .floor-btn {
    min-height: 45px;
    font-size: 14px;
  }
  
  .emergency-controls {
    flex-direction: column;
    gap: 8px;
  }
  
  .emergency-btn, .door-btn {
    min-width: auto;
  }
  
  .feature-btn {
    height: 45px;
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .floor-btn {
    min-height: 40px;
    font-size: 13px;
  }
  
  .feature-btn {
    height: 40px;
    font-size: 12px;
  }
}
</style>