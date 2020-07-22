// https://autumnfish.cn/search      搜索地址     keywords
// https://autumnfish.cn/song/url    歌曲url地址  id
// https://autumnfish.cn/song/detail 歌曲详情     ids
// https://autumnfish.cn/comment/hot?type=0   热门评论   id   （type固定为0）

var a = new  Vue({
    el:"#player",
    data:{
        search:"",
        msg:[],
        songId:"",
        audioUrl:"",
        imgUrl:"",
        hotComments:[],
    },
    created(){
        if(this.search==""){
            axios.get("https://autumnfish.cn/search?keywords=张国荣")
            .then(res=>{this.msg=res.data.result.songs;});

            axios.get("https://autumnfish.cn/comment/hot?type=0&id=186436")
            .then((response)=>this.hotComments = response.data.hotComments);

            this.audioUrl="http://m8.music.126.net/20200722021723/85686ce16992c6a905189d5039cfafdb/ymusic/5873/b48d/d14e/17a10cdcf43c5f428432591e2239a6ac.mp3";
            this.imgUrl="https://p2.music.126.net/2YIpNoCzXfYgz4zIw3s0Vg==/73667279073787.jpg";
        };

    },
    methods:{
        // 歌曲搜索
        searchMusic:function(){
            console.log(this.search);
            var that = this;
            axios.get("https://autumnfish.cn/search?keywords="+this.search)
            .then(function(response){
                console.log(response)
                that.msg=response.data.result.songs;
            }).catch(function(err){
                console.log(err);
            });
           
        },

        // 播放
        playMusic:function(id){
            console.log(id);
            var that = this;
            //获取音频地址
            axios.get("https://autumnfish.cn/song/url/?id="+id)
            .then(function(response){
                console.log(response);
                that.audioUrl=response.data.data[0].url;
                // console.log(that.audioUrl)
            }).catch(function(err){
                    console.log(err)
                });
            // 获取封面照片
            axios.get("https://autumnfish.cn/song/detail/?ids="+id)
            .then(function(response){
                console.log(response);
                that.imgUrl = response.data.songs[0].al.picUrl;
                // console.log(that.imgUrl);
                // box.style.backgroundImage = "url("+that.imgUrl+")"; 
                // body.style.backgroundImage = "url("+that.imgUrl+")";

            }).catch(function(err){
                    console.log(err)
                });
            //获取热评
            axios.get("https://autumnfish.cn/comment/hot?type=0&id="+id)
            .then(
                /* function(response){
                console.log(response);
                that.hotComments = response.data.hotComments;
                console.log(that.hotComments);
            } */
            // 使用箭头函数 ()=>{} 可以获取上一层的this
            (response)=>{
                console.log(response);
                this.hotComments = response.data.hotComments;
                console.log(this.hotComments);
            }
            ).catch(function(err){
                    console.log(err)
                });
            
        },
    }
})