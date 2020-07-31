const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const durationForHuman = duration => {
  let minutes = parseInt(duration / 60);
  let seconds = duration % 10;
  console.log(duration, minutes, seconds);
  if (minutes.length === 0) {
    minutes = '0' + minutes;
  }
  if (seconds.length === 0) {
    seconds = '0' + seconds;
  }
  return minutes + ':' + seconds;
}

const loginCheck = () => {
  if (!wx.getStorageSync('access_token')) {
    wx.navigateTo({
      url: '/pages/auth/login',
    })
  }
}

const go = (page, auth = false) => {
  if (auth && !wx.getStorageSync('access_token')) {
    wx.navigateTo({
      url: '/pages/auth/login?redirect=' + encodeURIComponent(page),
    })
    return
  }

  wx.navigateTo({
    url: page,
  })
}

module.exports = {
  formatTime: formatTime,
  durationForHuman: durationForHuman,
  loginCheck: loginCheck,
  go: go
}