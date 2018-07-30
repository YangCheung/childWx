<template>
  <div class="page">
    <!-- <div class="swiper-tab">
      <div class="swiper-tab-item" data-current="0" @click="clickTab">全部</div>
      <div class="swiper-tab-item" data-current="1" @click="clickTab">周末酒店</div>
      <div class="swiper-tab-item" data-current="2" @click="clickTab">ibuy亲子</div>
    </div> -->
    <!-- <div class="list-container"> -->
      <div class="card" v-for="d in diys" :key="d.t" @click="goDiyContent(d.id)">
        <image class="img" :src="d.img" lazy-load="true" mode="aspectFill"/> 
        <div class="text">{{ d.t }}</div>
      </div>
    <!-- </div> -->
    <!-- <div class="userinfo" @click="binddivTap">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      <div class="userinfo-nickname">
        <card :text="userInfo.nickName"></card >
      </div>
    </div>
    <a href="/pages/webview/main" class="counter">webview</a>
    -->
  </div> 
</template>

<script>
import card from '@/components/card'
// import AV from '@/leancloud/av-weapp-min.js'
// const AV = require('@/leancloud/av-weapp.js')

export default {
  data () {
    return {
      motto: 'Hello Wosdfsdfsfdrld',
      userInfo: {},
      diys: []
    }
  },
  components: {
    card
  },
  computed: {
    // reversedMessage: function () {
    //   var robjs = []
    //   for (var i = 0; i < this.diys.length; i++) {
    //     var item = this.diys[i]
    //     var rObj = {}
    //     // rObj.id = item.get('objectId')
    //     rObj.t = item.get('title')
    //     rObj.img = item.get('backgroundImg')
    //     console.log(rObj)

    //     robjs.push(rObj)
    //   }
    //   return robjs
    //   // return this.diys.map(item => {
    //   //   var rObj = {}
    //   //   rObj.id = item.get('objectId')
    //   //   console.log(rObj)
    //   //   rObj.t = item.get('title')
    //   //   rObj.img = item.get('backgroundImg')
    //   //   return rObj
    //   // })
    // }
  },
  methods: {
    convertData: function (datas) {
      var robjs = []
      for (var i = 0; i < datas.length; i++) {
        var item = datas[i]
        var rObj = {}
        rObj.id = item.get('objectId')
        rObj.t = item.get('title')
        rObj.img = item.get('backgroundImg')
        console.log(rObj)
        robjs.push(rObj)
      }
      return robjs
    },
    clickTab (d) {
      console.log(d)
    },

    goDiyContent (id) {
      const url = '/pages/counter/main' + '?id=' + id
      // const url = '../content/main'// ?id=' + id
      wx.navigateTo({ url })
      // console.log('goDiyContent' + id)
    },

    getUserInfo () {
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    },
    getDiys () {
      var that = this
      console.log('=====')
      console.log(this.$av)
      new this.$av.Query('Diy')
        .select(['id', 'title', 'backgroundImg'])
        .limit(30)
        .descending('createdAt')
        .find()
        .then(function (data) {
          that.diys = that.convertData(data)
          wx.stopPullDownRefresh()
        })
        .catch(function (error) {
          wx.stopPullDownRefresh()
          console.error(error)
        })
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    }
  },
  onPullDownRefresh () {
    this.getDiys()
  },
  mounted () {
    // this.getDiys()
    wx.startPullDownRefresh()
  }
}
</script>

<style scoped>
.page{
  width: 100%;
  height: 100%;
}
/* .list-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap:wrap
} */
.card {
  /* width: 414px */
}
.card .img{
  width: 100%;
  height: 200px;
  background-color: black;
}
.card .text{
  font-size: 15px;
  color: #666
}

.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

.counter {
  display: inline-block;
  margin: 10px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}

/* pages/detail/detail.wxss */
.swiper-tab{
    width: 100%;
    border-bottom: 0.5rpx solid #ddd;
    text-align: center;
    height: 80rpx;
    line-height: 80rpx;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
}
.swiper-tab-item{
    width: 30%; 
    color:#434343;
}
.active{
    color:#F65959;
    border-bottom: 4rpx solid #F65959;
}
swiper{
  text-align: center;
}
</style>
