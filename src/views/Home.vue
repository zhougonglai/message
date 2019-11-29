<template>
	<v-container class="home">
		<v-card v-if="playList.list.length" id="player">
			<v-list-item>
				<v-list-item-avatar>
					<v-img
						:aspect-ratio="1"
						:src="playList.active.avatar"
						lazy-src="@/assets/pice.png"
						:alt="playList.active.nickname"
						:key="playList.active.user_id"
					>
						<template v-slot:placeholder>
							<v-row class="fill-height ma-0" align="center" justify="center">
								<v-progress-circular indeterminate color="blue" />
							</v-row>
						</template>
					</v-img>
				</v-list-item-avatar>
				<v-list-item-content>
					<v-list-item-title>{{ playList.active.nickname }}</v-list-item-title>
					<v-list-item-subtitle>{{
						playList.active.label
					}}</v-list-item-subtitle>
				</v-list-item-content>
				<v-list-item-action>
					<v-btn icon large @click="activePlayer(playList.active)">
						<v-icon v-if="playList.play">stop</v-icon>
						<v-icon v-else>play_circle_filled</v-icon>
					</v-btn>
				</v-list-item-action>
			</v-list-item>
		</v-card>
		<v-row>
			<template v-if="players.length">
				<v-col
					xl="2"
					lg="3"
					md="4"
					sm="6"
					xs="12"
					class="flex-grow-1"
					v-for="player of players"
					:key="player.user_id"
				>
					<v-card shaped>
						<v-img
							:aspect-ratio="1"
							:src="player.avatar"
							lazy-src="@/assets/pice.png"
							min-width="225"
							:alt="player.nickname"
							class="align-end mx-auto pointer"
							@click="chartWith(player)"
						>
							<template v-slot:placeholder>
								<v-row class="fill-height ma-0" align="center" justify="center">
									<v-progress-circular indeterminate color="blue" />
								</v-row>
							</template>
							<div class="white--text avatar-info">
								<div class="ml-2">
									<svg v-if="player.gender" class="icon" aria-hidden="true">
										<use xlink:href="#icon-Man" />
									</svg>
									<svg v-else class="icon" aria-hidden="true">
										<use xlink:href="#icon-woman" />
									</svg>

									{{ player.age }}
								</div>

								<div class="ml-2">
									<svg class="icon" aria-hidden="true">
										<use xlink:href="#icon-Geo-fence" />
									</svg>

									{{ player.adress }}
								</div>
							</div>
						</v-img>
						<v-card-title class="pointer" @click="chartWith(player)">
							{{ player.nickname }}
						</v-card-title>
						<v-card-subtitle
							class="pb-0 pointer"
							v-text="player.label"
							@click="chartWith(player)"
						/>
						<v-card-text class="py-0" @click="chartWith(player)">
							<v-chip-group>
								<v-chip small v-for="(server, i) of player.service" :key="i">
									{{ server.game }}
								</v-chip>
							</v-chip-group>
						</v-card-text>
						<v-card-actions>
							<div class="price text-danger bold unselect">
								{{ player.price }}<small>/每小时</small>
							</div>
							<v-spacer />
							<v-chip
								close
								small
								color="primary"
								close-icon="play_circle_filled"
								@click:close.capture="activePlayer(player)"
							>
								{{ player.audio.duation }}s
							</v-chip>
						</v-card-actions>
					</v-card>
				</v-col>
			</template>
			<template v-else>
				<v-col
					cols
					xl="2"
					lg="3"
					md="4"
					sm="6"
					xs="12"
					v-for="i of 12"
					class="flex-grow-1"
					:key="i"
				>
					<v-skeleton-loader
						loading
						class="mx-auto"
						type="card"
						min-width="225"
					/>
				</v-col>
			</template>
		</v-row>
	</v-container>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex';
export default {
	name: 'Home',
	computed: {
		...mapState('player', ['players', 'playList']),
	},
	methods: {
		...mapActions('player', ['getPlayer']),
		...mapMutations('player', ['activePlayer']),
		...mapMutations('message', ['createMessageBox']),
		chartWith(player) {
			this.createMessageBox(player.user_id);
			this.$router.push({ path: '/detail/' + player.user_id });
		},
	},
	mounted() {
		this.getPlayer();
	},
};
</script>
<style lang="scss" scoped>
.home {
	padding: 12px 12px 0 12px;
	.avatar-info {
		display: flex;
		padding: 8px 12px;
		background-image: linear-gradient(
			180deg,
			rgba(0, 0, 0, 0.01),
			rgba(0, 0, 0, 0.66)
		);
	}
}
</style>
