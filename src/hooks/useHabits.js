// src/hooks/useHabits.js
// ── Toda la lógica de datos va aquí ──
// Separar lógica de UI es una práctica profesional clave

import { useState, useEffect } from 'react'

// Genera un ID único para cada hábito
// Date.now() + random evita colisiones
const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2)}`

// Retorna la fecha de hoy como string 'YYYY-MM-DD'
// Usamos este formato porque es fácil de comparar y ordenar
const today = () => new Date().toISOString().split('T')[0]

export function useHabits() {

  // Inicializamos el estado leyendo localStorage
  // Si no hay nada guardado, arrancamos con array vacío
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem('habits')
    return saved ? JSON.parse(saved) : []
  })

  // Cada vez que habits cambia, lo guardamos en localStorage
  // useEffect con [habits] como dependencia = se ejecuta solo cuando habits cambia
  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits))
  }, [habits])

  // ── CREAR hábito ──
  // Recibe el nombre y color elegido por el usuario
  const addHabit = (name, color, emoji) => {
    const newHabit = {
      id: generateId(),
      name,
      color,
      emoji,
      createdAt: today(),
      completedDates: []   // array de strings 'YYYY-MM-DD'
    }
    setHabits(prev => [...prev, newHabit])
  }

  // ── ELIMINAR hábito ──
  // filter devuelve todos menos el que tiene ese id
  const deleteHabit = (id) => {
    setHabits(prev => prev.filter(h => h.id !== id))
  }

  // ── MARCAR / DESMARCAR como completado ──
  // Si ya está completado hoy → lo desmarca
  // Si no está completado → lo marca
  const toggleHabit = (id) => {
    setHabits(prev => prev.map(habit => {
      if (habit.id !== id) return habit

      const alreadyDone = habit.completedDates.includes(today())

      return {
        ...habit,
        completedDates: alreadyDone
          // si ya estaba, lo quitamos del array
          ? habit.completedDates.filter(d => d !== today())
          // si no estaba, lo agregamos
          : [...habit.completedDates, today()]
      }
    }))
  }

  // ── ESTADÍSTICAS ──
  // Calcula el % de cumplimiento de un hábito en un rango de fechas
  const getStats = (habit, days) => {
    const dates = []
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      dates.push(d.toISOString().split('T')[0])
    }
    // Para cada fecha, 1 si completó ese día, 0 si no
    const data = dates.map(date => ({
      date,
      done: habit.completedDates.includes(date)
    }))

    const completed = data.filter(d => d.done).length
    const percentage = Math.round((completed / days) * 100)

    return { data, completed, total: days, percentage }
  }

  return { habits, addHabit, deleteHabit, toggleHabit, getStats, today }
}