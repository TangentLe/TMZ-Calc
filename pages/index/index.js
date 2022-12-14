//index.js

var ismeter=1;//身高米/厘米自动切换

Page({
  data: {
    showUploadTip: false,
    haveCreateCollection: false,
    showView: true,
    //----//
    htext : false,//结果框是否显示身高输入
    wtext : false,//结果框是否显示体重输入
    resulttext : true,//体表、剂量是否显示
    heightunit: "cm",
    ircolorh: "#112D4E",//输入值警告色
  },

//输入框blur后  检查是否为正常值/判断输入值是否超阈值（显示“输入错误”,修改输入框颜色） 输入错误后改正时恢复样式/ 
  BlurCheckHeight: function (e) {
    var h=e.detail.value;
    if(h==""){
        this.setData({
            htext : true,
            ircolorh: "#112D4E",
            inputValueh : "请输入身高",
            resulttext : 3,
        })
    }else if(h>200){
        this.setData({
            input1: "#FFA07A",
            htext : true,
            ircolorh: "#112D4E",
            inputValueh : "输入错误",
            resulttext : false,
        })
    }else if(h>0&&h<3){
        this.setData({
            heightunit: "m",
            ircolorh: "#112D4E",
            input1: "#DBE2EF",
            htext : true,
        })
    }else if(h>3&&h<140){
        this.setData({
            ircolorh: "#FF0000",
            input1: "#DBE2EF",
            htext : true,
        })
    }else{
        this.setData({
            ircolorh: "#112D4E",
            input1: "#DBE2EF",
            htext : true,
        })
    }
  },
  BlurCheckWeight: function (e) {
    var w=e.detail.value;
    if(w==""){
        this.setData({
            wtext : true,
            inputValuew : "请输入体重",
            resulttext : 3,
        })
    }else if(w> 300){
        this.setData({
            input2: "#FFA07A",
            wtext : true,
            inputValuew : "输入错误",
            resulttext : false,
        })
    }
    else{
        this.setData({
            input2: "#DBE2EF",
            wtext : true,
        })
    }
  },

//输入值时在结果框同步显示（身高值+单位）/计算完成后修改值将重置thebsa、thedrug
  inputcheckHeight: function (e){
    let h=e.detail.value
    ismeter=1;
    if(h<200 && h>=3){
        this.setData({
            heightunit: "cm",
            inputValueh: "身高："+h+" cm",
            input1: "#DBE2EF",
            resulttext :true,
            thebsa : "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&ensp;请计算",
            thedrug : "请计算",
        })
    }else if(h>0&&h<3){
        ismeter=100;
        this.setData({
            heightunit: "m",
            inputValueh: "身高："+(h*ismeter)+" cm",
            input1: "#DBE2EF",
        })
    }else if(h>200){
        this.setData({
            heightunit: "cm",
            input1: "#FFA07A",
        })
    }
  },
  inputcheckWeight: function (e){
    if(e.detail.value<300){
        this.setData({
            inputValuew: "体重："+e.detail.value+" kg",
            input2: "#DBE2EF",
            resulttext : true,
            thebsa : "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&ensp;请计算",
            thedrug : "请计算",
        })
    }else{
        this.setData({
            input2: "#FFA07A",
        })
    }
  },


//体表面积、口服剂量计算，
  Mosteller: function(data) {
    var h1 = data.detail.value.height*ismeter,
        w1 = data.detail.value.weight;
    if(h1<200 && h1>10){
        if(w1>1 && w1<300){
            let bsa = Math.sqrt(((h1 * w1)/3600));
            let drug = bsa * 75;
            //console.log("体表面积(BSA)值为：",bsa.toFixed(4),"m²");console.log("每日口服剂量为：",drug.toFixed(2),"mg");
            this.setData({
                thebsa : bsa.toFixed(3)+" m²",
                thedrug : drug.toFixed(2)+ " mg",
            });
        }
    }
  },


  onShareAppMessage: function (options) {//分享
    return {
        title: this.data.pageData.name,
        path: `packageA/pages/bossDet/bossDet?id=${this.data.id}`,
        success: function (res) {
            console.log(res,'成功')
            console.info(res + '成功');
            wx.showToast({
                title: '分享成功',
            })// 转发成功
        },
        fail: function (res) {
            console.log(res + '失败');// 转发失败
        },
        complete: function (res) {// 不管成功失败都会执行
            console.log(res,'成功或失败')
            wx.showToast({
                title: '成功或失败',
            })
        }
    }
  },

});
