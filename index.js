var colors =['red','blue','green','pink'];
var app = new Vue({
    el:'#el',
    data:{
        notes:[
            {id:1,title:'便签1',content:'',top:40,left:120,theme:'red'},
        ],
        moveEvent:{state:false,index:null,position:{}}
    },
    methods:{
        md:function(i,e){
            this.moveEvent.index = i;
            this.moveEvent.position={
                x:e.offsetX,
                y:e.offsetY
            };
            this.moveEvent.state = true;
        },
        mv:function(e){
            if(this.moveEvent.state){
                // console.log(e.clientX,e.clientY);
                var top = e.clientY-150-this.moveEvent.position.y;
                var left = e.clientX-120-this.moveEvent.position.x;
                this.notes[this.moveEvent.index].top = top;
                this.notes[this.moveEvent.index].left = left;
                this.save();
            }

        },
        mu:function () {
            this.moveEvent.state=false;
        },
        save:function(){
            localStorage.notes = JSON.stringify(this.notes);
        },
        addNote:function (e) {
            var
                id =this.notes.length ? (this.notes[this.notes.length-1].id+1) : 1,
                top = e.clientY-170,
                left = e.clientX-200,
                title='便签'+id,
                content='',
                theme=colors[Math.floor(Math.random()*colors.length)];
                this.notes.push({id,title,content,top,left,theme});
                this.save();
        },
        deleteNote:function (){
            if(this.moveEvent.index !=null){
                this.notes.splice(this.moveEvent.index,1);
                this.save();
            }
        }
    },
    mounted:function () {
        document.onkeyup = (function (e) {
            if(e && e.keyCode === 8){
                console.log(e.target.NodeName)
                if(this.moveEvent.index !=null){
                    this.notes.splice(this.moveEvent.index,1);
                    // this.moveEvent.index = this.notes.length ? this.notes.length - 1 : null;
                    this.save();
                }
            }
        }).bind(this);
        if(localStorage.notes){
            this.notes =JSON.parse(localStorage.notes)
        }

    }

});
