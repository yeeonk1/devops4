import UseOrCreateTest from './pages/UseOrCreateTest'
import Memo from './pages/Memo'
import Callback from './pages/Callback'
import HighOrderCallback from './pages/HighOrderCallback'

export default function App() {
  return (
    <div>
      <HighOrderCallback></HighOrderCallback>
      <Callback></Callback>
      <Memo></Memo>
      <UseOrCreateTest></UseOrCreateTest>
    </div>
  )
}
