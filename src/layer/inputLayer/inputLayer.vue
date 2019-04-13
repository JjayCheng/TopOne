<template>
	<transition name="fade"  v-on:after-leave="afterLeave">
		<div class="input-layer-wrapper" v-show="show">
			<div class="input-layer-box">
				<h1 class="top-bar">
					<div class="close-btn" @click="close"></div>
					<div class="title">{{title}}</div>
				</h1>
				<div class="content">
					<div class="input-item" v-for="input in inputs" :key="input.infor">
						<h3 class="infor">{{input.infor}}</h3>
						<input type="text" v-model="input.inputVal" :placeholder="input.placeholder"/>
					</div>
				</div>
				<div class="btn-wrapper">
					<button class="btn cancle default"  @click="close">取消</button>
					<button class="btn confirm primary" @click="confirmClick">确认</button>
				</div>
			</div>
		</div>
	</transition>
	
</template>

<script>
	export default {
		props: ['title', 'inputs', 'confirm'],
		data() {
			return {
				show: false
			};
		},
		mounted() {
			this.show = true;
		},
		methods: {
			afterLeave() {
				this.$destroy();
				this.$el.remove();
			},
			close() {
				this.show = false;
			},
			confirmClick() {
				let inputedLength = 0;
				let inputsLength = 0;
				for(let key in this.inputs) {
					inputsLength ++;
					this.inputs[key].inputVal && inputedLength ++;
				}
				let isAllInputed = inputsLength ===  inputedLength;
				if(isAllInputed) {
					this.confirm && this.confirm(this.inputs, this.close);
				} else {
					this.$notify({
						title: '有未完成的输入框..'
					})
				}
			}
		}
	}
</script>

<style lang="stylus">
.input-layer-wrapper
	position absolute
	width 100%
	height 100%
	top 0
	left 0
	background rgba(0,0,0,0.3)
	display flex
	flex-direction column
	justify-content flex-end
	.input-layer-box
		width 400px
		background rgba(255, 255, 255, 0.8)
		margin auto
		text-align center
		border-radius 10px
		.top-bar
			padding 10px
			.title
				font-size 18px
				color #666
				font-weight 600
			.close-btn
				float right
				margin 3px
				width 13px
				height 13px
				border-radius 100%
				background rgb(90, 109, 124)
				cursor pointer
		.content
			font-size 16px
			padding 10px
			.input-item
				text-align left
				padding 10px 30px 0 20px
				.infor
					color #888
					font-size 16px
				input
					margin-top 10px
					padding-left 10px
					width 100%
					height 25px
					font-size 16px
		.btn-wrapper
			text-align right
			button
				margin 10px 30px 10px 0
</style>
