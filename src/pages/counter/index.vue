<template>
  <div class="counter-warp">
    <div class="card" v-for="(item, index) in content" :key="index">
      <div v-if="item.isImg">
        <image class="img" :src="item.content" lazy-load="true" mode="aspectFill"/> 
      </div>
      <div v-else class="text">{{item.content}}</div>
    </div>
  </div>
</template>

<script>
// Use Vuex
import store from './store'

export default {
  data () {
    return {
      content: []
    }
  },
  computed: {
    count () {
      return store.state.count
    }
  },
  methods: {
    checkImg (item) {
      // return true
      var result = item.startsWith('https')
      console.log(item)
      console.log(result)
      return result
    },
    processData (data) {
      var result = []
      for (var i = 0; i < data.length; i++) {
        var obj = {}
        obj.content = data[i]
        obj.isImg = data[i].startsWith('https')
        result.push(obj)
      }
      this.content = result
    },
    getcontent (id) {
      var that = this
      new this.$av.Query('Diy')
        .select(['title', 'content'])
        .get(id)
        .then(function (data) {
          wx.setNavigationBarTitle({title: data.get('title')})
          var content = data.get('content')
          console.log(content)
          that.processData(content)
        })
        .catch(function (error) {
          console.error(error)
        })
    }
  },
  mounted () {
    var query = this.$root.$mp.query
    if (query && query.id) {
      this.getcontent(query.id)
    }
    console.log(this.$root.$mp.query)
  }
}
</script>

<style>
.counter-warp {
  margin-top: 30px;
  padding-bottom: 30px;
  font-size: 18px;
}
.img{
  width: 100%;
  height: 200px;
  background-color: white;
}
.home {
  display: inline-block;
  margin: 100px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
