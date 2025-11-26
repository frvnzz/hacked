import { describe, it, expect } from 'vitest'
import { createDeck, shuffleDeck, formatTime } from './gameUtils'

describe('gameUtils', () => {
  describe('createDeck', () => {
    it('should create a deck with 16 cards', () => {
      const deck = createDeck()
      expect(deck).toHaveLength(16)
    })

    it('should create pairs of matching cards', () => {
      const deck = createDeck()
      const matchIds = deck.map(card => card.matchId)
      
      // Count occurrences of each matchId
      const matchIdCounts = matchIds.reduce((acc, id) => {
        acc[id] = (acc[id] || 0) + 1
        return acc
      }, {} as Record<number, number>)
      
      // Each matchId should appear exactly twice
      Object.values(matchIdCounts).forEach(count => {
        expect(count).toBe(2)
      })
    })

    it('should assign unique ids to each card', () => {
      const deck = createDeck()
      const ids = deck.map(card => card.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(deck.length)
    })

    it('should assign icons to all cards', () => {
      const deck = createDeck()
      deck.forEach(card => {
        expect(card.icon).toBeDefined()
        expect(typeof card.icon).toBe('object')
      })
    })
  })

  describe('shuffleDeck', () => {
    it('should return a deck with the same length', () => {
      const deck = createDeck()
      const shuffled = shuffleDeck(deck)
      expect(shuffled).toHaveLength(deck.length)
    })

    it('should not modify the original deck', () => {
      const deck = createDeck()
      const originalIds = deck.map(card => card.id)
      shuffleDeck(deck)
      const afterShuffleIds = deck.map(card => card.id)
      expect(afterShuffleIds).toEqual(originalIds)
    })

    it('should contain all the same cards', () => {
      const deck = createDeck()
      const originalIds = deck.map(card => card.id).sort()
      const shuffled = shuffleDeck(deck)
      const shuffledIds = shuffled.map(card => card.id).sort()
      expect(shuffledIds).toEqual(originalIds)
    })
  })

  describe('formatTime', () => {
    it('should format seconds correctly', () => {
      expect(formatTime(0)).toBe('0:00')
      expect(formatTime(5)).toBe('0:05')
      expect(formatTime(59)).toBe('0:59')
    })

    it('should format minutes and seconds correctly', () => {
      expect(formatTime(60)).toBe('1:00')
      expect(formatTime(65)).toBe('1:05')
      expect(formatTime(125)).toBe('2:05')
    })

    it('should pad seconds with leading zero', () => {
      expect(formatTime(61)).toBe('1:01')
      expect(formatTime(609)).toBe('10:09')
    })

    it('should handle large time values', () => {
      expect(formatTime(3599)).toBe('59:59')
      expect(formatTime(3600)).toBe('60:00')
    })
  })
})
