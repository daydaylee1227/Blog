<template>
  <div class="singer" ref="singer">
    <list-view @select="selectSinger" :data="singers" ref="list"></list-view>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import ListView from 'base/listview/listview'
import { getSingerList } from "api/singer";
import { ERR_OK } from "api/config";
import Singer from "common/js/singer";
const HOT_NAME = "热门";
const HOT_SINGER_LEN = 10;
export default {
  data() {
    return {
      singers: [],
    };
  },
  created() {
    this._getSingerList();
  },
  methods: {
    select(){
      
    },
    // 获取数据,调用对应api接口数据
    _getSingerList() {
      getSingerList().then((res) => {
        this.singers = this._normalizeSinger(res.data.list);
        // console.log(JSON.stringify(res.data))
        // console.log(this._normalizeSinger(res.data.list));
      });
    },

    // 对数据经行处理,获取我们想要的数据结构
    _normalizeSinger(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: [],
        },
      };
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(
            new Singer({
              name: item.Fsinger_name,
              id: item.Fsinger_mid,
            })
          );
        }

        // 获取每一个list中的key-->比如A,B,C
        const key = item.Findex;
        if (!map[key]) {
          map[key] = {
            title: key,
            items: [],
          };
        }
        // 把数据放入items中
        map[key].items.push(
          new Singer({
            name: item.Fsinger_name,
            id: item.Fsinger_mid,
          })
        );
      });
      // 数据合并排序
      let hot = [],
        ret = [];
      for (let key in map) {
        let val = map[key];
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val);
        } else if (val.title === HOT_NAME) {
          hot.push(val);
        }
      }
      // 对ret字段排序，完成A,B,C,D升序
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      });
      return hot.concat(ret);
    },
    selectSinger(singer){
      // console.log(singer.id)
        this.$router.push({
          path: `/singer/${singer.id}`
        })
    }
  },
  components : {
    ListView,
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.singer {
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
}
</style>
