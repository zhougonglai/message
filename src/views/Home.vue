<template>
	<v-container fluid class="home">
		<v-row>
			<template v-if="players.length">
				<v-col
					xl="2"
					lg="3"
					md="4"
					sm="6"
					xs="12"
					v-for="player of players"
					:key="player.user_id"
				>
					<v-card shaped>
						<v-img
							:aspect-ratio="1"
							:src="player.avatar"
							lazy-src="@/assets/pice.png"
							:alt="player.nickname"
							class="align-end"
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
						<v-card-title>
							{{ player.nickname }}
						</v-card-title>
						<v-card-subtitle class="pb-0" v-text="player.label" />
						<v-card-text :class="player.service.length > 3 ? 'pa-0' : 'py-0'">
							<v-chip-group>
								<v-chip v-for="(server, i) of player.service" :key="i">
									{{ server.game }}
								</v-chip>
							</v-chip-group>
						</v-card-text>
						<v-card-actions>
							<div class="price text-danger bold">
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
				<v-col xl="2" lg="3" md="4" sm="6" xs="12" v-for="i of 12" :key="i">
					<v-skeleton-loader loading class="mx-auto" type="card" />
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
		...mapState('player', ['players']),
	},
	methods: {
		...mapActions('player', ['getPlayer']),
		...mapMutations('player', ['activePlayer']),
	},
	mounted() {
		this.getPlayer();
	},
};
</script>
<style lang="scss" scoped>
.home {
	padding: 0 12px;
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
