import {useRef, useEffect, useCallback} from 'react'
import {Title} from '../components'
import {Button} from '../theme/daisyui'

export default function InputValueTest() {
  const inputRef = useRef<HTMLInputElement>(null) // html input 요소로 정의, null 초깃값
  const getValue = useCallback(() => alert(`input value: ${inputRef.current?.value}`), [])

  useEffect(() => inputRef.current?.focus(), [])

  return (
    <section className="mt-4">
      <Title className="text-5xl font-bold text-center">InputValueTest</Title>
      <div className="flex justify-center mt-4">
        <div className="flex flex-col w-1/3 p-2">
          <input
            ref={inputRef}
            className="input input-primary"
            placeholder="enter some text"
          />
          <Button onClick={getValue} className="mt-4 btn-primary">
            GET VALUE
          </Button>
        </div>
      </div>
    </section>
  )
}
