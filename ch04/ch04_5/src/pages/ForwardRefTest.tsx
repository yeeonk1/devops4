import {useRef, useEffect} from 'react'
import {Title} from '../components'
import {Input, Button} from '../theme/daisyui'

export default function ForwardRefTest() {
  const inputRef = useRef<HTMLInputElement>(null) // html input 요소로 정의, null 초깃값

  useEffect(() => inputRef.current?.focus(), [])

  return (
    <section className="mt-4">
      <Title className="text-5xl font-bold text-center">ForwardRefTest</Title>
      <div className="flex justify-center mt-4">
        <Input
          ref={inputRef}
          className="input input-primary"
          placeholder="enter some text"
        />
      </div>
    </section>
  )
}
