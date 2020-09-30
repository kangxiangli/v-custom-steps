<template>
  <div id="app">
    <div class="main">
      <!-- 基础用法传递 start -->
      <div class="title">基础用法传递 <span class="block">data</span>即可</div>
      <div class="content">
        <vCustomSteps :data="data"  style="height: 600px;"></vCustomSteps>
      </div>
      <!-- 基础用法传递 end -->
      <!-- 横竖式步骤条 start -->
      <div class="title"> 横竖式步骤条,需要指定 <span class="block">direction</span>的值,
        分别为<span class="block">horizontal</span>是水平方向，<span class="block">vertical</span>是垂直方向，默认的是垂直</div>
      <div class="contentFlex">
        <div class="contentLeft">
          <vCustomSteps :data="data" direction="horizontal"  style="height: 600px; "></vCustomSteps>
        </div>
        <div class="contentRight">
          <vCustomSteps :data="data" direction="vertical"  style="height: 600px; "></vCustomSteps>
        </div>
      </div>
      <!-- 横竖式步骤条 end -->
      <!-- theme换肤步骤条 start -->
      <div class="title">设置 <span class="block">theme='#800080'</span>来换肤 ,configStyle和theme都设置的时候优先<span class="block">configStyle</span></div>
      <div class="content">
        <vCustomSteps :data="data" theme="#1890ff"  :configStyle='config2'  direction="horizontal"  style="height: 600px; "></vCustomSteps>
      </div>
      <!-- theme换肤步骤条 end -->
      <!-- 居中的步骤条 start -->
      <div class="title">居中的步骤条 <span class="block">align-center</span>文字是否居中  只对布局为<span class="block"> direction="horizontal"</span> 时生效 </div>
      <div class="content">
        <vCustomSteps :data="data" align-center  direction="horizontal" style="height: 600px; "></vCustomSteps>
      </div>
      <!-- 居中的步骤条 end -->
      <!-- 步骤条的样式和事件 start -->
      <div class="title">步骤条的样式和事件,设置<span class="block">configStyle</span>可以对步骤条上的dom更改样式，通过<span class="block">@clickItem="testClick"</span>来处理点击事件，注意修改<span class="block"> mediumLineStyle</span>中线的宽的的时候也要相对应的改变圆的大小
      </div>
      <div class="content">
        <vCustomSteps :data="data" @clickItem="testClick"   :configStyle='config1'   direction="horizontal"  style="height: 600px; "></vCustomSteps>
      </div>

      <!-- 步骤条的样式和事件 end -->

      <!-- 步骤条错位展示 start -->
      <div class="title">步骤条错位展示,错位展示的时候主要是数据格式 <span class="block">data</span>的差别</div>
      <div class="content">
        <vCustomSteps :data="oDataAnyone" direction="horizontal"  style="height: 600px; "></vCustomSteps>
      </div>
      <!-- 步骤条错位展示 end -->

      <!-- 插槽示列 start -->
      <div class="title">插槽示列,注意多个插槽展示内容时插槽名称为 <span class="block">插槽名称+插槽位置</span>详情看示列</div>
      <div class="content">
        <vCustomSteps :data="data"  style="height: 600px;">
          <!-- 圆圈的内容 -->
          <template :slot='`step${index}`' v-for='(item,index) in data'><span :key='item'>{{index+1}}</span></template>

          <!-- key插槽的内容 -->
          <template :slot='`key${index}`' v-for='(item,index) in data'><span :key='item'>{{item.name}}</span></template>

          <!-- value插槽的内容 -->
          <template :slot='`value${index}`' v-for='(item,index) in data'><span :key='item'>{{item.value}}</span></template>

        </vCustomSteps>
      </div>
      <!-- 插槽示列 end -->

    </div>
  </div>
</template>

<script>
import data from '../mock/step.json'
import oDataAnyone from '../mock/step.json'

import vCustomSteps from '../src/lib/v-custom-steps.vue'
export default {
  name: 'app',
  components: {
    vCustomSteps
  },
  data () {
    return {
      data: data,
      oDataAnyone: oDataAnyone,
      config2: {
        circleStyle: {
          color: 'rgb(239, 13, 239)'
        }
      },
      config1: {
        // 中线的样式
        mediumLineStyle: {
          color: '#fff',
          width: '8px'
        },
        // 圆左右两边的线样式
        nodeLineStyle: {
          color: 'yellow'
        },
        // 文字的样式
        textStyle: {
          color: 'green'
        },
        // 圆的样式
        circleStyle: {
          width: '100px',
          height: '100px',
          lineHeight: '100px',
          backgroundColor: 'pink',
          boxShadow: '0px 0px 15px orange inset',
          color: 'purple'
        }
      }

    }
  },
  methods: {
    testClick (e, item, index) {
      console.log('点击操作~~', e, item, index)
    }
  }

}
</script>

<style>
html,body{
  width: 100%;
  height: 100%;
  background:rgba(1, 3, 46, 1);
}
blockquote, body, button, dd, dl, dt, fieldset, form, h1, h2, h3, h4, h5, h6, hr, input, legend, li, ol, p, pre, td, textarea, th, ul{
  margin: 0;
  padding: 0;
}
#app {
  height: 100%;
  width: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.content{
  width: 90%;
  margin: 10px auto;
  background: rgba(255,255,255,0.05)
}
.main{
  padding: 16px;
}
.title{
  height: 30px;
  line-height: 30px;
  background: rgba(255,255,255,0.05);
  font-size: 16px;
  color: #fff;
  font-weight: 600;
  border-left: 2px solid #259ee3;
  padding-left: 4px;
  margin: 16px 0;
}
.block{
  color: coral;
  background: #867f7f61;
  padding: 0 16px;
  display: inline-block;
  border-radius: 5px;
  font-weight: 500;
  margin: 0 5px;
}
.contentFlex{
  display: flex;
}
.contentLeft{
  width: 49%;
  border-right: 1px dashed darkviolet;
}
.contentLeft{
  width: 49%;
}
</style>
