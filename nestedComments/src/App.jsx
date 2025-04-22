import './App.css'
import NestedComment from './components/nested-comment'
import commentsData from './data/data.json'

const App = () => {
  return (
    <div>
      <h1>Nested Comments Component</h1>
      <NestedComment
        comments={commentsData}
        onSubmit={() => { }}
        onEdit={() => { }}
        onDelete={() => { }}
        onUpvote={() => { }}
        onDownvote={() => { }}
      />
    </div>
  )
}

export default App