import { defineStore } from 'pinia'

interface State{
    history: string[],
    visualHistory: string
}

export const useCalculatorStore = defineStore('calculator', {
  state: (): State => {
    return {
      history: [],
      visualHistory: ""
    }
  },
  getters: {
    historyData(): string[]{
        return this.history
    },
    lastHistoryEntry(): string {
        return this.history[this.history.length - 1]
    },
    visualHistoryData(): string{
        return this.visualHistory
    },
  }
})
