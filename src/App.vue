<template>
	<div id="app">
		<top-bar
			:isLinksBoxShow="isLinksBoxShow" @showLinksBox="isLinksBoxShow = !isLinksBoxShow"
			:isSettingsBoxShow="isSettingsBoxShow" @showSettingsBox="isSettingsBoxShow = !isSettingsBoxShow"
		/>
		<search-box />
		<transition name="fade-side-on">
			<links-box v-if="isLinksBoxShow" />
		</transition>
		<transition name="fade-side-left">
			<settings-box v-if="isSettingsBoxShow"/>
		</transition>
	</div>
</template>

<script>
import topBar from './components/topBar/topBar.vue'
import linksBox from './components/linksBox/linksBox.vue'
import searchBox from './components/searchBox/searchBox.vue'
import settingsBox from './components/settingsBox/settingsBox.vue'
export default {
	data() {
		return {
			isLinksBoxShow: false,
			isSettingsBoxShow: false
		}
	},
	components: {
		linksBox,
		searchBox,
		topBar,
		settingsBox
	},
	mounted() {
		this.isLinksBoxShow = SettingTools.getSettings().autoOpenLinksBox;
		this.$notify({
			title: '今天也是元气满满的一天呐.'
		})
	},
	methods: {
	}
}
</script>

<style lang="stylus" scoped>
#app
	width 100%
	height 100%
	background url('./common/img/full/1.jpg')
	background-size 100%
	background-repeat no-repeat
</style>
