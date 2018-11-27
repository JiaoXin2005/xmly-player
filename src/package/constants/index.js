export const PlayMode = {
  LIST: 'list', // 列表循环
  LOOP: 'loop', // 单曲循环
  RANDOM: 'random' // 随机顺序
}

export const PlayState = {
  READY: 'ready', // 已设置好声音数据,处于可播放状态  
  LOADING: 'loading', // 加载中, 1.执行play后，进入PLAYING之前，2.执行seek后，进入PLAYING之前，3.播放过程中，网络原因引起的数据加载
  PLAYING: 'playing', // 播放中
  PAUSED: 'paused', // 暂停状态，1.执行pause后
  STOPPED: 'stopped', // 停止状态, 1.初始化完成后，2.播放完成后，3.执行stop后
  ERROR: 'error' // 错误状态， 1.发生错误时
}
