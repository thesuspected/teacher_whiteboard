<template>
    <v-app id="app">
        <div class="fill d-flex flex-column justify-center align-center bg-board">
            <v-scroll-y-transition leave-absolute hide-on-leave>
                <router-view />
            </v-scroll-y-transition>
        </div>
    </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component({})
export default class App extends Vue {}
</script>

<style lang="less"></style>
