import ProjectForm from '@/components/ProjectForm'
import { reindex } from './actions'

export default function Test() {
  return (
    <main>
      {process.env.NODE_ENV == "development" ? (<>
        <ProjectForm />
        <form action={reindex}><button type="submit">Rebuild search index</button></form>
      </>) : <div>Not allowed.</div>}
    </main>
  )
}
