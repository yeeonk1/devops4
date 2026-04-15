import {useRef, useEffect} from 'react'
import {Title} from '../components'

export default function InputFocusTest() {
  const inputRef = useRef<HTMLInputElement>(null) // html input 요소로 정의, null 초깃값

  useEffect(() => inputRef.current?.focus(), [])

  return (
    <section className="mt-4">
      <Title className="text-5xl font-bold text-center">InputFocusTest</Title>
      <div className="flex justify-center mt-4">
        <input
          ref={inputRef}
          className="input input-primary"
          placeholder="enter some text"
        />
      </div>
    </section>
  )
}
