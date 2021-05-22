<template>
    <v-card class="mx-auto" max-width="344">
        <v-card-text>
            <p class="display-1">
                {{ id }}
            </p>
        </v-card-text>
        <v-card-actions>
            <v-btn text color="deep-purple accent-4">
                Learn More
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import App from '@/App.vue'
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { act } from '../store/ref/actions'

@Component({})
export default class Home extends App {
    protected id = '1'
    protected created() {
        this.sockets.subscribe('USER_CONNECTED', (id: string) => {
            console.log(id, '2')
            this.id = id
        })
    }
}
</script>

<style lang="less"></style>
