import {useState} from 'react'
import {useInterval} from './useInterval'

export const useClock = () => {
  const [today, setToday] = useState(new Date()) // today는 현재 시간, setToday는 today를 수정
  useInterval(() => setToday(new Date())) // 1초마다 화살표 함수 호출
  return today
}

// useInterval 매 순간 Date 객체를 생성해서 setToday에 집어넣기
