import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import confetti from 'canvas-confetti'

const preguntas = [
  {
    pregunta: "¿Cuántos días a la semana vienes con el uniforme completo? 👕👖",
    opciones: ["1 vez 😅", "2 veces 😐", "3 veces 🙂", "4 o más veces 😎"],
    emoji: "🏫"
  },
  {
    pregunta: "¿Por qué crees que algunos llegan tarde después del recreo? ⏰",
    opciones: ["Van al baño a última hora 🚽", "Se quedan en el kiosco 🍔", "Siguen jugando ⚽", "No oyen el timbre 🔔"],
    emoji: "🏃"
  },
  {
    pregunta: "¿Cuántas veces a la semana llegas tarde al cole? 😴",
    opciones: ["1 vez 👌", "2 veces 😬", "3 veces 😰", "Todos los días 😱"],
    emoji: "⏰"
  },
  {
    pregunta: "Cuando llegas tarde, ¿cuántos minutos te pasas? ⏱️",
    opciones: ["Menos de 5 min 🐇", "De 5 a 10 min 🚶", "De 10 a 15 min 🐢", "Más de 15 min 🐌"],
    emoji: "🕐"
  },
  {
    pregunta: "¿Qué tan bien sigues las normas en clase? 📏",
    opciones: ["Siempre 😇", "Casi siempre 🤓", "Nunca 😈", "Casi nunca 🤪"],
    emoji: "📚"
  },
  {
    pregunta: "¿Por qué algunos vienen con el pelo desarreglado? 💇",
    opciones: ["No tienen tiempo 🏃", "No les importan las normas 🤷", "Es la moda 😎", "Para molestar 😤"],
    emoji: "🧑‍🎓"
  },
  {
    pregunta: "¿Por qué crees que algunos sacan malas notas? 📉",
    opciones: ["No estudian 📚", "No les interesa 🥱", "Trabajan 💼", "No tienen tiempo ⏳"],
    emoji: "🤔"
  },
  {
    pregunta: "¿Por qué traen celulares al cole? 📱",
    opciones: ["Para hablar con amigos 💬", "Para estudiar 🤓", "Para chatear 📨", "Los padres obligan 👨‍👩‍👧‍👦"],
    emoji: "📞"
  },
  {
    pregunta: "¿Por qué algunos no cuidan su apariencia? 🧼",
    opciones: ["Falta de tiempo ⏰", "Está de moda 🕶️", "Baja autoestima 😔", "Para ser como los demás 🐑"],
    emoji: "🪞"
  },
  {
    pregunta: "¿Cómo podemos mantener el aula limpia y ordenada? 🧹",
    opciones: ["Todos ayudamos 🤝", "El comité de aula 👥", "Personal de limpieza 🧽", "Nos turnamos 🔄"],
    emoji: "🗑️"
  }
]

export default function Home() {
  const [respuestas, setRespuestas] = useState(Array(preguntas.length).fill(null))
  const [contadorRespuestas, setContadorRespuestas] = useState(0)
  const [encuestaCompletada, setEncuestaCompletada] = useState(false)
  const [resultados, setResultados] = useState(Array(preguntas.length).fill(Array(4).fill(0)))
  const [mostrarResultados, setMostrarResultados] = useState(false)
  const [preguntaActual, setPreguntaActual] = useState(0)

  useEffect(() => {
    if (encuestaCompletada) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    }
  }, [encuestaCompletada])

  const handleRespuesta = (opcionIndex) => {
    if (contadorRespuestas >= 100) return

    const nuevasRespuestas = [...respuestas]
    nuevasRespuestas[preguntaActual] = opcionIndex
    setRespuestas(nuevasRespuestas)

    if (preguntaActual < preguntas.length - 1) {
      setPreguntaActual(preguntaActual + 1)
    }
  }

  const enviarEncuesta = () => {
    if (respuestas.every(r => r !== null)) {
      setContadorRespuestas(prev => prev + 1)
      actualizarResultados(respuestas)
      if (contadorRespuestas + 1 >= 100) {
        setEncuestaCompletada(true)
      } else {
        setRespuestas(Array(preguntas.length).fill(null))
        setPreguntaActual(0)
      }
      setMostrarResultados(true)
    }
  }

  const actualizarResultados = (nuevasRespuestas) => {
    const nuevosResultados = resultados.map((preguntaResultados, preguntaIndex) => {
      const nuevaPreguntaResultados = [...preguntaResultados]
      nuevaPreguntaResultados[nuevasRespuestas[preguntaIndex]]++
      return nuevaPreguntaResultados
    })
    setResultados(nuevosResultados)
  }

  const RankingOpciones = ({ resultadosPregunta, opciones }) => {
    const opcionesOrdenadas = opciones
      .map((opcion, index) => ({ opcion, votos: resultadosPregunta[index] }))
      .sort((a, b) => b.votos - a.votos)

    return (
      <div className="mt-4">
        <h4 className="font-bold mb-2">🏆 Ranking de respuestas:</h4>
        {opcionesOrdenadas.map((item, index) => (
          <div key={index} className="flex items-center mb-1">
            <span className="mr-2">{index + 1}.</span>
            <span className="flex-grow">{item.opcion}</span>
            <span className="font-bold">{item.votos} votos</span>
          </div>
        ))}
      </div>
    )
  }

  if (encuestaCompletada) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-lg shadow-lg text-white"
      >
        <h1 className="text-4xl font-bold text-center mb-6">🎉 ¡Gracias por participar! 🎉</h1>
        <p className="text-xl text-center mb-8">La encuesta ha alcanzado el límite de 100 respuestas. ¡Eres genial! 🌟</p>
        <h2 className="text-3xl font-semibold mb-4 text-center">📊 Resultados finales:</h2>
        {preguntas.map((pregunta, index) => (
          <Card key={index} className="mb-6 bg-white text-gray-800">
            <CardContent className="p-4">
              <h3 className="text-xl font-medium mb-2 flex items-center">
                <span className="mr-2 text-2xl">{pregunta.emoji}</span>
                <span>{pregunta.pregunta}</span>
              </h3>
              {pregunta.opciones.map((opcion, opcionIndex) => (
                <div key={opcionIndex} className="mb-2">
                  <div className="flex justify-between mb-1">
                    <span>{opcion}</span>
                    <span>{resultados[index][opcionIndex]}</span>
                  </div>
                  <Progress value={(resultados[index][opcionIndex] / contadorRespuestas) * 100} className="h-2" />
                </div>
              ))}
              <RankingOpciones resultadosPregunta={resultados[index]} opciones={pregunta.opciones} />
            </CardContent>
          </Card>
        ))}
      </motion.div>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 rounded-lg shadow-lg text-white"
    >
      <h1 className="text-4xl font-bold text-center mb-6">📝 ¡Súper Encuesta Estudiantil! 🚀</h1>
      <p className="text-xl text-center mb-8">
        ¡Hola! 👋 Tu opinión es importante. Llevamos {contadorRespuestas} respuestas de 100. ¡Sé parte del cambio! 💪
      </p>
      <Card className="mb-8 bg-white text-gray-800">
        <CardContent className="p-4">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <span className="mr-2 text-3xl">{preguntas[preguntaActual].emoji}</span>
            <span>{preguntas[preguntaActual].pregunta}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {preguntas[preguntaActual].opciones.map((opcion, opcionIndex) => (
              <Button
                key={opcionIndex}
                onClick={() => handleRespuesta(opcionIndex)}
                variant={respuestas[preguntaActual] === opcionIndex ? "default" : "outline"}
                className="w-full justify-start text-left text-lg hover:scale-105 transition-transform"
              >
                {opcion}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-between items-center">
        <Button 
          onClick={() => preguntaActual > 0 && setPreguntaActual(preguntaActual - 1)}
          disabled={preguntaActual === 0}
          className="bg-yellow-500 hover:bg-yellow-600 text-white"
        >
          ⬅️ Anterior
        </Button>
        <span className="text-xl font-bold">
          {preguntaActual + 1} / {preguntas.length}
        </span>
        {preguntaActual < preguntas.length - 1 ? (
          <Button 
            onClick={() => setPreguntaActual(preguntaActual + 1)}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            Siguiente ➡️
          </Button>
        ) : (
          <Button 
            onClick={enviarEncuesta}
            className="bg-pink-500 hover:bg-pink-600 text-white"
          >
            Enviar 🚀
          </Button>
        )}
      </div>
      <div className="mt-8">
        <Progress value={(contadorRespuestas / 100) * 100} className="h-4 mb-2" />
        <p className="text-center text-lg">🎉 {contadorRespuestas} de 100 respuestas 🎉</p>
      </div>
      {mostrarResultados && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8"
        >
          <h2 className="text-3xl font-semibold mb-4 text-center">📊 Resultados actuales:</h2>
          {preguntas.map((pregunta, index) => (
            <Card key={index} className="mb-6 bg-white text-gray-800">
              <CardContent className="p-4">
                <h3 className="text-xl font-medium mb-2 flex items-center">
                  <span className="mr-2 text-2xl">{pregunta.emoji}</span>
                  <span>{pregunta.pregunta}</span>
                </h3>
                {pregunta.opciones.map((opcion, opcionIndex) => (
                  <div key={opcionIndex} className="mb-2">
                    <div className="flex justify-between mb-1">
                      <span>{opcion}</span>
                      <span>{resultados[index][opcionIndex]}</span>
                    </div>
                    <Progress value={(resultados[index][opcionIndex] / contadorRespuestas) * 100} className="h-2" />
                  </div>
                ))}
                <RankingOpciones resultadosPregunta={resultados[index]} opciones={pregunta.opciones} />
              </CardContent>
            </Card>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}
