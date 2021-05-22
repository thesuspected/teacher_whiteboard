<template>
    <v-app id="app">
        <v-scroll-y-transition leave-absolute hide-on-leave>
            <router-view />
        </v-scroll-y-transition>
    </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component({})
export default class App extends Vue {}
</script>

<style lang="less"></style>
