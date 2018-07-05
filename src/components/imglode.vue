<template>
	<div>
		<div class="image-list ">
			<div class="list-default-img" v-show="isPhoto">
				<img  @click.stop="addPic" src="/static/img/game_icon_tianjiatupian@2x.png" />
				<input type="file" accept="image/gif, image/jpeg" multiple @change="onFileChange" ref="inputl" style="display: none">
			</div>
			<ul class="list-ul clearfix" v-show="!isPhoto">
				<li class="list-li " v-for="(iu, index) in imgUrls">
					<a class="list-link" @click='previewImage(iu)'>
						<img :src="iu">
					</a>
					<span class="list-img-close" @click='delImage(index)'>&times;</span>
				</li>
				<li class="list-li-add">
					<span class="add-img" @click.stop="addPic"></span>
				</li>
			</ul>
		</div>
	    <div class="add-preview" v-show="isPreview" @touchmove.prevent @click="closePreview">
	    	<span><img :src="previewImg"></span>
		</div>
	</div>
	
</template>

<script>
import { MessageBox, Toast } from 'mint-ui';
import lrz from 'lrz'
export default {
	data: function () {
		return {
			imgUrls: [],
			urlArr: [],
			isPhoto: true,
			btnTitle: '',
			isModify: false,
			previewImg:'',
			isPreview: false
		}
	},
	watch: {
		imgUrls: 'toggleAddPic'
	},
	methods: {
		toggleAddPic() {
			let vm = this;
			if(vm.imgUrls.length >= 1) {
				vm.isPhoto = false;
			} else {
				vm.isPhoto = true;
			}
		},
		addPic(e) {
			this.$refs.inputl.click()
			return false;
		},
		onFileChange(e) {
			var files = e.target.files || e.dataTransfer.files;
			if(!files.length) return;
			this.createImage(files, e);
		},
		encode(unencoded) {
			return encodeURIComponent(unencoded).replace(/'/g,"%27").replace(/"/g,"%22");	
		},
		createImage(file, e) {			
			for( let i in file){
				lrz(file[i], { width: 800 }).then((rst)=> {
					this.imgUrls.push(rst.base64);
					let data = this.encode(rst.base64);
					this.$axios.post('/',{method:'note.uploadimg.uploadBase64',data:data,type:'note',filename:file[i].name}).then((res)=>{
						if(res.data.status == 0){
							this.$emit('getImg', {id: res.data.data.id, url: res.data.data.url})
						}else Toast(res.data.msg)
					})
				}).always(function() {
				// 清空文件上传控件的值
					e.target.value = null;
				});
				
			}
			
		},
		delImage(index) {
			MessageBox.confirm('确定执行此操作?').then(action => {
				this.imgUrls.splice(index, 1);
			});
		},
		previewImage(url){
			let vm = this;
			vm.isPreview = true;
			vm.previewImg = url;
		},
		closePreview(){
			let vm = this;
			vm.isPreview = false;
			vm.previewImg = "";
		},
		saveImage(){
			let vm = this;
			let urlArr = [],
			imgUrls = this.imgUrls;

			for(let i = 0; i < imgUrls.length; i++) {
				if(imgUrls[i].indexOf('file') == -1) {
					urlArr.push(imgUrls[i].split(',')[1]);
				} else {
					urlArr.push(imgUrls[i]);
				}
			}			
		}
	}
}
	
</script>
<style lang="scss">
.list-default-img img{
	width: 0.9rem;
}
.list-ul{
	li{
		float: left; position: relative;
		width: 0.85rem;max-height: 1.5rem;
		overflow: hidden;
		margin-right: 0.15rem;
		margin-top: 0.15rem;
		img{
			width: 0.85rem;border-radius: 5px;
		}
		.list-img-close{
			position: absolute;
			right: 0px;top: 0px;
			width: 15px;height: 15px;
			background-color: red;
			border-radius: 50%;
			text-align: center;
			line-height: 15px;
			color: #fff;
		}
	}
	.list-li-add span{
		display: block;
		width: 0.9rem; height: 0.9rem;
		background-image: url(/static/img/game_icon_tianjiatupian@2x.png);
		background-size: 100%;
	}
}
.add-preview{
	height: 100%;
	width: 100%;
	position: fixed;
	z-index: 2000;
	top: 0;left: 0;
	background-color: rgba(0,0,0,.6);
	display: table;
	text-align: center;
	span{
		display: table-cell; vertical-align: middle;
	}
	img{
		width: 100%;
		display: inline-block; 
		vertical-align: middle;
	}
}
</style>